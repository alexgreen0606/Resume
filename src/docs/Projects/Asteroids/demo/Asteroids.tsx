import { useState, useEffect, useRef } from 'react';
import Ship from './images/ship.png';
import Explosion from './images/explosion.png';
import Asteroid from './images/asteroid.png';
import Rubble from './images/rubble.png';
import PowerUp from './images/powerUp.png';
import './asteroids.css'
import { IconButton } from '@mui/material';
import { PauseFilled, PlayFilledAlt } from '@carbon/icons-react';
import { checkRectCollision, generateAsteroidFallKeyframes, generateRandomZIndex, generateUniqueId, handleAnimationEnd } from './utils';

// All constants below control the game behavior
const SHIP_WIDTH_PERCENTAGE = 4 // the percentage of the container's width the ship takes up
const SHIP_SPEED = 2
const ASTEROID_SIZE_INTERVALS = { // measured in percentages of the container's width
  xSmall: 5,
  small: 9,
  medium: 13,
  large: 20
}
const POWERUP_WIDTH_PERCENTAGE = 2
const POWERUP_SCORE_INTERVAL = 100; // every time the score reaches a multiple of this, a powerup ball is generated
const LASER_STRENGTH = 7
const DEFAULT_LASER_FIRING_INTERVAL = 500
const POWERUP_STRENGTH = 2 / 5
const POWERUP_DURATION = 5000
const EXPLOSION_ANIMATION_TIME = 200

export interface AnimatedType {
  id: string;
}

interface LaserType extends AnimatedType {
  x: number
  zIndex: number
  color: string
}

interface AsteroidType extends AnimatedType {
  x: number
  width: number
  destroyed?: boolean
  rotation: number
  hitpoints: number
  zIndex: number
  animation: string
}

interface PowerupType extends AnimatedType {
  x: number
}

interface AsteroidsProps {
  gameWidth?: string,
  gameHeight?: string,
  pauseGame?: boolean
}

/**
 * Renders an asteroids game, with all measurements based on the container dimensions. The ship is a fixed width of the container, along with the asteroids and
 * powerup balls.
 * 
 * The game involves moving a spaceship left and right with the arrow keys. Asteroids fall from the top of the screen to the bottom. The ship may destroy the asteroids
 * with its laser to earn points, or dodge the asteroids. If the ship collides with an asteroid, the game is over. Once the score reaches a multiple of the powerup interval,
 * a powerup ball will fall from the top of the screen, allowing the ship to absorb it and increase its firing speed.
 */
const Asteroids: React.FC<AsteroidsProps> = ({ gameWidth = '100vw', gameHeight = '100vh', pauseGame = false }) => {

  // all refs are used for calculating collisions between game elements
  const shipRef = useRef<HTMLImageElement>(null);
  const shipPositionRef = useRef<number>(0);
  const laserRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const asteroidRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const powerUpRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null)

  const [shipCenterXPosition, setShipCenterXPosition] = useState(50);

  const [lasers, setLasers] = useState<LaserType[]>([]);
  const [asteroids, setAsteroids] = useState<AsteroidType[]>([]);
  const [powerUps, setPowerUps] = useState<PowerupType[]>([]);

  // stores the timeout used to reset the ship's firing speed
  const [powerUpTimeout, setPowerUpTimeout] = useState<number | null>(null);

  // Gameplay variables
  const [gameActive, setGameActive] = useState(!pauseGame)
  const [gameOver, setGameOver] = useState(false);
  const [nextPowerupScore, setNextPowerupScore] = useState(POWERUP_SCORE_INTERVAL)
  const [score, setScore] = useState(0);
  const [laserFiringInterval, setLaserFiringInterval] = useState(DEFAULT_LASER_FIRING_INTERVAL)
  const [shipDestroyed, setShipDestroyed] = useState(false)
  const [showTips, setShowTips] = useState(false)

  /**
   * Moves the ship left or right based on the keyboard click event.
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setShipCenterXPosition((prevPos) => Math.max(SHIP_WIDTH_PERCENTAGE / 2, prevPos - SHIP_SPEED)); // Move left (bounded)
    } else if (event.key === 'ArrowRight') {
      setShipCenterXPosition((prevPos) => Math.min(100 - (SHIP_WIDTH_PERCENTAGE / 2), prevPos + SHIP_SPEED)); // Move right (bounded)
    }
  };

  /**
   * Resets all gameplay variables to their default state.
   */
  const restartGame = () => {
    setGameOver(false)
    setGameActive(true)
    setShipDestroyed(false)
    setShipCenterXPosition(50)
    setScore(0)
    setLaserFiringInterval(500)
    setLasers([])
    setAsteroids([])
    setPowerUps([])
  }

  /**
   * Triggers the destruction animation of the given asteroid, and generates small asteroids when large ones are destroyed.
   * 
   * @param asteroid - the asteroid to destroy
   */
  const handleAsteroidDestruction = (asteroid: AsteroidType) => {
    const newAsteroids: AsteroidType[] = [];

    if (asteroid.width >= ASTEROID_SIZE_INTERVALS.small && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width
      const containerHeight = containerRect.height

      let numSplits = 2; // Default to 2 splits
      if (asteroid.width <= ASTEROID_SIZE_INTERVALS.medium) {
        numSplits = 3;
      } else if (asteroid.width > ASTEROID_SIZE_INTERVALS.medium) {
        numSplits = 4;
      }

      const newWidth = Math.floor(asteroid.width / numSplits);

      const asteroidElement = asteroidRefs.current[asteroid.id]
      if (asteroidElement) {

        // Get the asteroid's bounding box and calculate its center
        const asteroidRect = asteroidElement.getBoundingClientRect();
        const centerXPercent = (((asteroidRect.left - containerRect.left) + asteroidRect.width / 2) / containerWidth) * 100;
        const centerYPercent = (((asteroidRect.top - containerRect.top) + asteroidRect.height / 2) / containerHeight) * 100;

        for (let i = 0; i < numSplits; i++) {

          const newKeyframes = generateAsteroidFallKeyframes(centerYPercent, i);
          document.styleSheets[0].insertRule(newKeyframes, 0);

          // Set each new asteroid to start at the center of the destroyed asteroid
          const newAsteroid = {
            id: `${asteroid.id}-${i}`,
            x: centerXPercent,
            width: newWidth,
            rotation: Math.floor(Math.random() * 365),
            hitpoints: newWidth,
            zIndex: generateRandomZIndex(),
            animation: `fallFrom_${centerYPercent.toFixed(0)}_number_${i} 3s linear forwards`
          }

          newAsteroids.push(newAsteroid);
        }
      }

    }

    setScore(currScore => currScore + asteroid.width)

    // Add new asteroids and mark the asteroid as destroyed
    setAsteroids(prevAsteroids => [
      ...prevAsteroids.map(a =>
        a.id === asteroid.id ?
          {
            ...a,
            destroyed: true,
            animation: a.animation + `, scaleUpFadeOut ${EXPLOSION_ANIMATION_TIME / 1000}s ease-out forwards`
          } :
          a
      ),
      ...newAsteroids
    ]);

    // Remove the destroyed asteroid after a short delay
    setTimeout(() => {
      setAsteroids(prevAsteroids =>
        prevAsteroids.filter((a: AsteroidType) => a.id !== asteroid.id)
      );
    }, EXPLOSION_ANIMATION_TIME);
  };

  /**
   * Loops over asteroids, checking for any collisions with lasers or the ship. Handles collisions if any occur.
   */
  const checkAsteroidCollisions = () => {

    asteroids.forEach((asteroid: AsteroidType) => {

      const asteroidElement = asteroidRefs.current[asteroid.id]
      if (!asteroid.destroyed && asteroidElement) {

        const asteroidBoundingRect = asteroidElement.getBoundingClientRect();

        // Check for ship-asteroid collision
        const shipRect = shipRef.current?.getBoundingClientRect();
        if (shipRect &&
          checkRectCollision(
            shipRect.left,
            shipRect.top,
            shipRect.width,
            shipRect.height,
            asteroidBoundingRect.left,
            asteroidBoundingRect.top,
            asteroidBoundingRect.width,
            asteroidBoundingRect.height,
            .8
          )
        ) {
          setGameOver(true)
          setTimeout(() => {
            setShipDestroyed(true)
          }, EXPLOSION_ANIMATION_TIME * 2)
        }

        // Check for laser-asteroid collisions
        lasers.forEach((laser) => {
          const laserElement = laserRefs.current[laser.id]
          if (laserElement) {

            const laserBoundingRect = laserElement.getBoundingClientRect();

            if (checkRectCollision(
              laserBoundingRect.left,
              laserBoundingRect.top,
              laserBoundingRect.width,
              laserBoundingRect.height,
              asteroidBoundingRect.left,
              asteroidBoundingRect.top + asteroidBoundingRect.height / 3,
              asteroidBoundingRect.width,
              asteroidBoundingRect.height / 3,
              0.7
            )) {
              const newHitpoints = asteroid.hitpoints - LASER_STRENGTH;

              if (newHitpoints <= 0) { // the asteroid was destroyed
                handleAsteroidDestruction(asteroid)
              } else { // the asteroid was damaged
                setAsteroids((prevAsteroids: AsteroidType[]) => prevAsteroids.map((prevAsteroid: AsteroidType) => (
                  prevAsteroid.id === asteroid.id ? { ...prevAsteroid, hitpoints: newHitpoints } : prevAsteroid
                )))
              }

              setLasers((prevLasers) => prevLasers.filter((prevLaser) => prevLaser.id !== laser.id))
            }
          }

        })
      }
    })
  }

  /**
   * Loops over the powerups, checking for any collisions between them and the ship. If so, the ship's laser is powered up.
   */
  const checkPowerUpCollisions = () => {

    const shipElement = shipRef.current
    if (shipElement) {
      const shipRect = shipElement.getBoundingClientRect()

      powerUps.forEach((powerUp) => {

        const powerUpElement = powerUpRefs.current[powerUp.id]
        if (powerUpRefs.current[powerUp.id] && powerUpElement) {
          const powerUpRect = powerUpElement.getBoundingClientRect();

          if (checkRectCollision(
            shipRect.left,
            shipRect.top,
            shipRect.width,
            shipRect.height,
            powerUpRect.left,
            powerUpRect.top,
            powerUpRect.width,
            powerUpRect.height,
            0
          )) {
            setPowerUps((currentPowerUps) => currentPowerUps.filter((item) => item.id !== powerUp.id))
            setLaserFiringInterval(DEFAULT_LASER_FIRING_INTERVAL * POWERUP_STRENGTH);

            if (powerUpTimeout) {
              clearTimeout(powerUpTimeout);
            }

            // Set a new timeout to reset laser interval after 5 seconds
            setPowerUpTimeout(setTimeout(() => {
              setLaserFiringInterval(DEFAULT_LASER_FIRING_INTERVAL);
            }, POWERUP_DURATION));
          }
        }
      })
    }
  }

  /**
   * Displays the game instructions once the game begins.
   */
  useEffect(() => {
    if (!gameOver && gameActive) {
      setShowTips(true)
      setTimeout(() => {
        setShowTips(false)
      }, 7000)
    }
  }, [gameOver, gameActive])

  /**
   * Links the game's active state to the inherited pause variable.
   */
  useEffect(() => {
    setGameActive(!pauseGame)
  }, [pauseGame])

  /**
   * Handles user input.
   */
  useEffect(() => {
    if (!gameOver && gameActive) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver, gameActive]);

  /**
   * Keeps the ship's position reference up to date. Needed for laser spawning.
   */
  useEffect(() => {
    shipPositionRef.current = shipCenterXPosition
  }, [shipCenterXPosition])

  /**
   * Handles laser generation from the ship.
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!gameOver && gameActive) {
        const color = laserFiringInterval === 500 ? '#9fff80' : '#e6b3ff';
        const newLaser = {
          id: generateUniqueId(),
          x: shipPositionRef.current,
          zIndex: generateRandomZIndex(),
          color
        };
        setLasers((prevLasers) => [...prevLasers, newLaser]);
      }
    }, laserFiringInterval);

    return () => clearInterval(intervalId);
  }, [gameOver, laserFiringInterval, gameActive]);

  /**
   * Handles asteroid generation.
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!gameOver && gameActive) {
        const asteroidSize = Math.floor(Math.random() * (ASTEROID_SIZE_INTERVALS.large - ASTEROID_SIZE_INTERVALS.xSmall + 1)) + ASTEROID_SIZE_INTERVALS.xSmall;
        const newAsteroid = {
          id: generateUniqueId(),
          x: Math.floor(Math.random() * ((100 - asteroidSize / 2) - asteroidSize / 2) + asteroidSize / 2),
          width: asteroidSize,
          rotation: Math.floor(Math.random() * 365),
          hitpoints: asteroidSize,
          animation: 'fall 7s linear forwards',
          zIndex: generateRandomZIndex()
        };
        setAsteroids((prevAsteroids) => [...prevAsteroids, newAsteroid]);
      }
    }, 1500);

    return () => clearInterval(intervalId);
  }, [gameOver, gameActive]);

  /**
   * Handles powerup generation.
   */
  useEffect(() => {

    // Check if we crossed a multiple of the powerup interval
    if (score >= nextPowerupScore) {
      const randomX = Math.floor(Math.random() * (100 - POWERUP_WIDTH_PERCENTAGE) + POWERUP_WIDTH_PERCENTAGE / 2)

      setPowerUps((currentPowerUps) => [
        ...currentPowerUps,
        { id: generateUniqueId(), x: randomX },
      ]);
      setNextPowerupScore(nextPowerupScore + POWERUP_SCORE_INTERVAL)
    }
  }, [score, nextPowerupScore]);

  /**
   * Handles all collision tracking.
   */
  useEffect(() => {
    const asteroidCollisionCheck = setInterval(checkAsteroidCollisions, 16);
    const powerUpCollisionCheck = setInterval(checkPowerUpCollisions, 16);

    return () => {
      clearInterval(asteroidCollisionCheck)
      clearInterval(powerUpCollisionCheck)
    };
  }, [asteroids, lasers]);

  return (
    <div ref={containerRef} className='asteroids' style={{ width: gameWidth, height: gameHeight }}>
      {!gameOver && (
        <>
          {/* Scoreboard */}
          <div className="scoreboard">
            <span style={{ fontSize: '2vw' }}>score: {score}</span>
          </div>
          {/* Pause and Play Buttons */}
          <div className='pause-play'>
            {gameActive ? (
              <IconButton onClick={() => setGameActive(false)}>
                <PauseFilled color='yellow' size='2vw' />
              </IconButton>
            ) : (
              <IconButton onClick={() => setGameActive(true)}>
                <PlayFilledAlt color='yellow' size='2vw' />
              </IconButton>
            )}
          </div>
          {showTips && (
            <div className='tips'>
              Use the arrow keys to dodge asteroids, or destroy them for points!
            </div>
          )}
        </>
      )}
      {/* Shaceship */}
      {
        !shipDestroyed && (
          <img
            src={gameOver ? Explosion : Ship}
            alt="Spaceship"
            className='spaceship'
            style={{
              left: `${shipCenterXPosition - (SHIP_WIDTH_PERCENTAGE / 2)}%`,
              animation: gameOver ? `scaleUpFadeOut ${EXPLOSION_ANIMATION_TIME * 2 / 1000}s ease-out forwards` : undefined
            }}
            ref={shipRef}
          />
        )
      }
      {/* Lasers */}
      {
        lasers.map((laser) => (
          <div
            key={laser.id}
            id={laser.id}
            ref={(el) => (laserRefs.current[laser.id] = el)}
            className="laser"
            style={{
              left: `${laser.x}%`,
              backgroundColor: laser.color,
              zIndex: laser.zIndex,
              animationPlayState: !gameActive ? 'paused' : undefined
            }}
            onAnimationEnd={(e) => handleAnimationEnd(e, setLasers)}
          />
        ))
      }
      {/* Asteroids */}
      {
        asteroids.map((asteroid) => (
          <img
            key={asteroid.id}
            id={asteroid.id}
            src={asteroid.destroyed ? Rubble : Asteroid}
            alt="Asteroid"
            className='asteroid'
            ref={(el) => (asteroidRefs.current[asteroid.id] = el)}
            style={{
              left: `${asteroid.x}%`,
              width: `${asteroid.width}%`,
              transform: `rotate(${asteroid.rotation}deg) translate(-${asteroid.width / 2}%, -${asteroid.width / 2}%)`,
              animation: asteroid.animation,
              animationPlayState: !gameActive ? 'paused' : asteroid.destroyed ? 'paused, running' : undefined,
              zIndex: asteroid.destroyed ? 50 : asteroid.zIndex,
            }}
            onAnimationEnd={(e) => handleAnimationEnd(e, setAsteroids)}
          />
        ))
      }
      {/* Power Ups */}
      {
        powerUps.map((powerUp) => (
          <img
            key={powerUp.id}
            id={powerUp.id}
            ref={(el) => (powerUpRefs.current[powerUp.id] = el)}
            src={PowerUp}
            alt="Power Up"
            className="power-up"
            style={{
              left: `${powerUp.x}%`,
              transform: `translateX(-${POWERUP_WIDTH_PERCENTAGE / 2}%)`,
              animationPlayState: !gameActive ? 'paused' : undefined
            }}
            onAnimationEnd={(e) => handleAnimationEnd(e, setPowerUps)}
          />
        ))
      }
      {/* Game Over Popup */}
      {
        gameOver && (
          <div
            className="game-over"
          >
            <h1 style={{ color: 'red', textAlign: 'center' }}>Game Over</h1>
            <div style={{ color: 'yellow', margin: '10px' }}>
              Score: {score}
            </div>
            <button
              className='try-again-button'
              onClick={restartGame}
            >
              <b>Try Again</b>
            </button>
          </div>
        )
      }
    </div >
  );
}

export default Asteroids;
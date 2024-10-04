import { AnimatedType } from "./Asteroids";

export const generateUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// Generates a random zIndex from 1 to 3
export const generateRandomZIndex = () => {
    return Math.floor(Math.random() * 3) + 1;
};

// Checks if the two rectangles are colliding.
export function checkRectCollision(
    rect1X: number,
    rect1Y: number,
    rect1Width: number,
    rect1Height: number,
    rect2X: number,
    rect2Y: number,
    rect2Width: number,
    rect2Height: number,
    centerProximityFactor: number = 0.7 // Factor determining how close to center the collision must be
): boolean {
    // Calculate center coordinates for both rectangles
    const rect1CenterX = rect1X + rect1Width / 2;
    const rect1CenterY = rect1Y + rect1Height / 2;
    const rect2CenterX = rect2X + rect2Width / 2;
    const rect2CenterY = rect2Y + rect2Height / 2;

    // Apply the center constraint
    if (centerProximityFactor > 0) {
        const centerDistance = Math.sqrt(
            Math.pow(rect1CenterX - rect2CenterX, 2) + Math.pow(rect1CenterY - rect2CenterY, 2)
        );
        const maxAllowedCenterDistance = (rect2Width + rect2Height) / 4 * centerProximityFactor;

        if (centerDistance > maxAllowedCenterDistance) {
            return false;
        }
    }

    // Check if the boxes overlap, and return the result
    return (
        rect1X < rect2X + rect2Width &&
        rect1X + rect1Width > rect2X &&
        rect1Y < rect2Y + rect2Height &&
        rect1Y + rect1Height > rect2Y
    );
}

// Generates keyframe movement of broken asteroid pieces
export const generateAsteroidFallKeyframes = (startY: number, index: number) => {
    let randomX, randomY;

    // Randomly choose X or Y to keep within screen bounds and generate the other coordinate off-screen
    if (Math.random() < 0.5) {
        // Keep random X within screen bounds
        randomX = Math.random() * 100;

        // Choose random Y to be above or below the screen
        randomY = Math.random() < 0.5
            ? -100 // Above the screen
            : 200; // Below the screen
    } else {
        // Keep random Y within screen bounds
        randomY = Math.random() * 100;

        // Choose random X to be to the left or right of the screen
        randomX = Math.random() < 0.5
            ? -100 // Left of the screen
            : 200; // Right of the screen
    }

    const fixedRandomY = randomY.toFixed(2);
    const fixedRandomX = randomX.toFixed(2);
    const fixedStartY = startY.toFixed(2);

    return `
      @keyframes fallFrom_${startY.toFixed(0)}_number_${index} {
        0% { top: ${fixedStartY}%; } 
        100% { top: ${fixedRandomY}%; left: ${fixedRandomX}%; transform: rotate(0deg); }
      }
    `
}

/**
 * Calls the state update function to remove the given element from the list.
 * 
 * @param e - the event signifying the end of the animation
 * @param setItems - the state update function
 */
export const handleAnimationEnd = <T extends AnimatedType>(
    e: React.AnimationEvent,
    setItems: React.Dispatch<React.SetStateAction<T[]>>
) => {
    setItems((currentItems) =>
        currentItems.filter((item) => item.id !== (e.target as HTMLElement).id)
    )
}
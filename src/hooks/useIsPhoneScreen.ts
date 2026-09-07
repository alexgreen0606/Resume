import { useState, useEffect } from 'react';

const useIsPhoneScreen = (checkWidthAndHeight: boolean) => {
    const [isPhoneScreen, setIsPhoneScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsPhoneScreen((window.innerWidth <= 600) || (checkWidthAndHeight && (window.innerHeight <= 600)));
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isPhoneScreen;
};

export default useIsPhoneScreen;
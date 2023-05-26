import { useState, useEffect } from 'react';



export const useReadingTime = (content: string) => {
    const [readingTime, setReadingTime] = useState<number>(0);

    useEffect(() => {
        const calculateReadingTime = () => {
            const wordsPerMinute = 100; // Adjust this value according to your preference
            const words = content.split(' ').length;
            const time = Math.ceil(words / wordsPerMinute);

            setReadingTime(time);
        };

        calculateReadingTime();
    }, [content]);

    return readingTime;
};

export default useReadingTime;

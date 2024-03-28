import { useState, useEffect } from 'react';

export default function useScrollDetection(threshold:number=50) {
    
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isScrolled;
}

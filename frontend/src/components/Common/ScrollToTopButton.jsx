import { useEffect } from "react";
import { useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function ScrollToTopButton () {
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!showScrollButton) {
        return null;
    }

    return (
        <div className="fixed bottom-24 right-14 z-10">
            <button 
                className="border border-gray-200 rounded-lg h-16 w-16 flex justify-center items-center bg-gray-200 hover:text-black transition group cursor-pointer"
                onClick={scrollToTop}
            >
                <ArrowUpIcon className="w-6 h-6 text-gray-700 group-hover:text-black"/>
            </button>
        </div>
    );
}
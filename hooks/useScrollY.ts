import { useEffect, useState } from 'react';

export const useScrollY = (): number => {
	const [scrollY, setScrollY] = useState<number>(0);

	useEffect(() => {
		if(typeof window !== 'undefined') {
			const handleScroll = () => {
				setScrollY(window.scrollY);
			};

			window.addEventListener('scroll', handleScroll, { passive: true });
			return () => window.removeEventListener('scroll', handleScroll);
		}		
	}, []);

	return scrollY;
};
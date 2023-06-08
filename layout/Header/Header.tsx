import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import Logo from '../logo.svg';
import cn from 'classnames';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { Sidebar } from '../Sidebar/Sidebar';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const router = useRouter();
	useEffect(() => {
		setIsOpened(false);
	}, [router]);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: { stiffness: 50 }
		},
		closed: {
			opacity: 0,
			x: '100%'
		}
	};

	return (
		<header className={cn(className, styles.header)}  {...props}>
			<Logo />
			<ButtonIcon icon={'menu'} appearance={'white'} onClick={() => setIsOpened(true)} />
			<motion.div className={styles.menuMobile} variants={variants} animate={isOpened ? 'opened' : 'closed'}>
				<Sidebar />
				<ButtonIcon className={styles.close} icon={'close'} appearance={'white'} onClick={() => setIsOpened(false)} />
			</motion.div>

		</header>
	);
};
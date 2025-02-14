import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import React, { FunctionComponent, useState, KeyboardEvent, useRef } from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components/Up/Up';


export const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [isSkiplinkDisplayed, setIsSkiplinkDisplayed] = useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);
	const skipLinkOpened = (key: KeyboardEvent) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkiplinkDisplayed(false);
	};
	return (
		<div className={styles.wrapper}>
			<a
				href="#mainContent"
				onKeyDown={skipLinkOpened}
				onFocus={() => setIsSkiplinkDisplayed(true)}
				tabIndex={0}
				className={cn(styles.skipLink, {
					[styles.displayed]: isSkiplinkDisplayed
				})}
			>Сразу к содержанию</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main
				id="mainContent"
				tabIndex={0}
				ref={bodyRef}
				className={styles.body}
				role="main"
			>
				{children}
			</main>
			<Footer className={styles.footer} />
			<Up />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};
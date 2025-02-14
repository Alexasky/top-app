import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { useState, KeyboardEvent } from 'react';
import { Button } from '../Button/Button';
import GlassIcon from './glass.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();
	const goToSearch = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		});
	};
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			goToSearch();
		}
	};
	return (
		<form className={cn(className, styles.search)} {...props} role="search" >
			<Input
				className={cn(className, styles.input)}
				placeholder="Поиск..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance='primary'
				className={styles.button}
				onClick={goToSearch}
				aria-label='Искать по сайту'
			>
				<GlassIcon />
			</Button>
		</form>
	);
};
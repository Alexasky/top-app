import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './sort.svg';
import { KeyboardEvent } from 'react';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
	const handleSort = (key: KeyboardEvent, sort: SortEnum) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			if (sort == SortEnum.Rating) {
				setSort(SortEnum.Rating);
			}
			if (sort == SortEnum.Price) {
				setSort(SortEnum.Price);
			}
		}
	};
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div id='sort' className={styles.sortName}>Сортировка</div>
			<div
				role="listbox"
				aria-labelledby="sort"
				className={styles.sortOptions}
				tabIndex={0}
			>
				<span
					id='rating'
					onClick={() => setSort(SortEnum.Rating)}
					className={cn({
						[styles.active]: sort == SortEnum.Rating
					})}
					tabIndex={0}
					onKeyDown={(e: KeyboardEvent) => handleSort(e, SortEnum.Rating)}
					role="option"
					aria-selected={sort == SortEnum.Rating}
					aria-labelledby='sort rating'
				>
					<SortIcon className={styles.sortIcon} /> По рейтингу
				</span>
				<span
					id='price'
					onClick={() => setSort(SortEnum.Price)}
					className={cn({
						[styles.active]: sort == SortEnum.Price
					})}
					tabIndex={0}
					onKeyDown={(e: KeyboardEvent) => handleSort(e, SortEnum.Price)}
					role="option"
					aria-selected={sort == SortEnum.Price}
					aria-labelledby='sort price'
				>
					<SortIcon className={styles.sortIcon} /> По цене
				</span>
			</div>
		</div>
	);
};
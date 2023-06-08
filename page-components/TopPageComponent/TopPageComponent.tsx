import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { HhData, Htag, Product, Sort, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { Advantage } from '../../components/Advantages/Advantages';
import { sortReducer } from './sort.reducer';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};
	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: products });
	}, [products]);
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag={'h1'}>{page.title}</Htag>
				{products && <Tag color='grey' size='middle' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div role='list'>
				{sortedProducts && sortedProducts.map(p => (<Product role='listitem' layout key={p._id} product={p} />))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag={'h2'}>Вакансии - {page.category}</Htag>
				<Tag color='red' size='middle'>hh.ru</Tag>
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && < HhData {...page.hh} />}
			<div className={styles.advantages}>
				{page.advantages && page.advantages.length > 0 && (
					<>
						<Htag tag={'h2'}>Преимущества</Htag>
						<Advantage advantages={page.advantages} />
					</>
				)}
				{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
				<Htag tag={'h2'}>Получаемые навыки</Htag>
				{page.tags && page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
			</div>

		</div>
	);
};

// function useReduser(sortReducer: (state: import("./sort.reducer").SortReducerState, action: import("./sort.reducer").SortAction) => import("./sort.reducer").SortReducerState, arg1: { products: import("../../interfaces/product.interface").ProductModel[]; sortEnum: typeof sortEnum; "": any; }): [{ products: any; sort: any; }, any] {
// 	throw new Error('Function not implemented.');
// }

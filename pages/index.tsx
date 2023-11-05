import React from 'react';
import { Product } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { API } from '../helpers/api';
import { ProductModel } from '../interfaces/product.interface';

function Home({ products }: HomeProps): JSX.Element {

	return (
		<>
			<div role='list'>
				{products && products.map(p => (<Product role='listitem' layout key={p._id} product={p} />))}
			</div>

		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory
	});
	const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
		category: 'Финансовая аналитика',
		limit: 10
	});

	return {
		props: {
			menu,
			firstCategory,
			products
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
	products: ProductModel[];
}
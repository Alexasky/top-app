import React from 'react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import Link from 'next/link';
import { Htag, Tag } from '../../components';

function Type({ menu, firstCategory }: TypeProps): JSX.Element {
	return (
		<>
			{menu.map(m => 
				<div key={m._id.secondCategory}>
					<Htag tag={'h2'}>{m._id.secondCategory}</Htag>
					{m.pages.map(p => 
						<Tag key={p._id} color='primary' size='middle'><Link href={`/${firstLevelMenu[firstCategory].route}/${p.alias}`} className='categoryLink'>{p.title}</Link></Tag>
					)}
				</div>
			)}
		</>
	);
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(m => '/' + m.route),
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	}
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory: firstCategoryItem.id
	});

	return {
		props: {
			menu,
			firstCategory: firstCategoryItem.id,
			key: firstCategoryItem.id
		},
		revalidate: 60,
	};
};

interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}

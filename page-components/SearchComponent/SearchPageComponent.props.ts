import { TopPageModel } from '../../interfaces/page.interface';

export interface SearchPageComponentProps {
	searchResults: TopPageModel[],
	loading: boolean,
	q: string | string[] | undefined
}
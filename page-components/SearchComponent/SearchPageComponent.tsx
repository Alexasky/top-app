import Link from 'next/link';
import { SearchPageComponentProps } from './SearchPageComponent.props';
import { firstLevelMenu } from '../../helpers/helpers';
import styles from './SearchPageComponent.module.css';

export const SearchPageComponent = ({ searchResults, loading, q }: SearchPageComponentProps): JSX.Element => {
	return (
    <div>
      <h1>Результат поиска по {q}</h1>
      {loading ? (
        <p>Поиск...</p>
      ) : searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result._id}>
              <h2 className={styles.title}>
								{ firstLevelMenu[result.firstCategory] ?
									(<Link href={`/${firstLevelMenu[result.firstCategory].route}/${result.alias}`}>								
										{result.title}
									</Link>) :
									<span>{result.title}</span>
								}								
							</h2>
              <p>{result.metaDescription}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет найденных результатов для {q}.</p>
      )}
    </div>
  );
};

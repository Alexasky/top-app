import { ParagraphProps } from './Paragraph.props';
import styles from './Paragraph.module.css';
import cn from 'classnames';

export const Paragraph = ({ size = 'middle', children, className, ...props }: ParagraphProps): JSX.Element => {
	return (
		<p
			className={cn(styles.paragraph, className, {
				[styles.small]: size == 'small',
				[styles.middle]: size == 'middle',
				[styles.large]: size == 'large',

			})} {...props}
		>
			{children}
		</p>
	);
};
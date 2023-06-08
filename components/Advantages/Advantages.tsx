import styles from './Advantages.module.css';
import { AdvantagesProps } from './Advantages.props';
import CheckIcon from './check.svg';

export const Advantage = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages && advantages.map(a => (
				a.title || a.description != '' && (
					<div key={a._id} className={styles.advantage}>
						<CheckIcon />
						<div className={styles.title}>{a.title}</div>
						<hr className={styles.vline} />
						<div>{a.description}</div>
					</div>
				)
			))}
		</>
	);
};
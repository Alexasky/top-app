import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, extractValidHttpLink, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';
import React from 'react';

// eslint-disable-next-line react/display-name
export const Product = motion(React.memo(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const variants = {
		visible: {
			opacity: 1,
			height: 'auto'
		},
		hidden: {
			opacity: 0,
			height: 0
		}
	};
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);
	const scrollToReview = useCallback(() => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus();
	},[]);

	const toggleReviews = useCallback(() => setIsReviewOpened(prev => !prev), []);

	const categories = useMemo(
		() => product.categories.map(c => <Tag className={styles.category} key={c} color='ghost'>{c}</Tag>),
		[product.categories]
	);

	const characteristics = useMemo(
		() => product.characteristics.map(c => (
			<div className={styles.characteristics} key={c.name}>
				<span className={styles.characteristicsName}>{c.name}</span>
				<span className={styles.characteristicsDots}></span>
				<span className={styles.characteristicsValue}>{c.value}</span>
			</div>
		)),
		[product.characteristics]
	);

	const reviews = useMemo(
		() => product.reviews.map(r => (
			<div key={r._id}>
				<Review review={r} />
				<Divider />
			</div>
		)),
		[product.reviews]
	);

	return (
		<div className={className} {...props} ref={ref}>
			<Card className={styles.product} >
				<div className={styles.logo}>
					<img
						src={extractValidHttpLink(product.image)}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					<span className='visualyHidden'>Цена</span>
					{priceRu(product.price)}
					{product.oldPrice &&
						<Tag className={styles.oldPrice} color='green'>
							<span className='visualyHidden'>Скидка</span>
							{priceRu(product.price - product.oldPrice)}
						</Tag>}
				</div>
				<div className={styles.credit}>
					<span className='visualyHidden'>Кредит</span>
					{priceRu(product.credit)}/ <span className={styles.month}>мес</span>
				</div>
				<div 
					className={styles.rating}
					role="radiogroup"
					aria-labelledby="ratingLabel"
				>
					<span id="ratingLabel" className='visualyHidden'>{'Рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>
				<div className={styles.tags}>{categories}</div>
				<div className={styles.priceTitle} aria-hidden='true'>цена</div>
				<div className={styles.creditTitle} aria-hidden='true'>кредит</div>
				<div className={styles.rateTitle}><a href='#ref' onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>{characteristics}</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>}
					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>}
				</div>
				<Divider className={cn(className, styles.hr, styles.hr2)} />
				<div className={styles.action}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						className={styles.reviewButton}
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						onClick={toggleReviews}
						aria-expanded={isReviewOpened ? true : false}
					>Читать отзывы</Button>
				</div>
			</Card>
			<motion.div className={styles.reviewsWrapper} animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial='hidden'>
				<Card color='blue' className={styles.reviews} ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}>
					{reviews}
					<ReviewForm productId={product._id} isOpened={isReviewOpened} />
				</Card>
			</motion.div>
		</div>
	);
})));
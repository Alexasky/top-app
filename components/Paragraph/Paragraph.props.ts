import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	size?: 'small' | 'middle' | 'large';
	children: ReactNode;
}
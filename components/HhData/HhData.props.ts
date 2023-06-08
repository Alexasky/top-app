import { ReactNode } from 'react';
import { HdData } from '../../interfaces/page.interface';

export interface HhDataProps extends HdData {
	color?: 'white' | 'blue';
}
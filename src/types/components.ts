import { ReactNode } from "react";

export interface BaseHeadingProps {
	id?: string;
	children: ReactNode;
	className?: string;
}

export interface LinkProps {
	href?: string;
	children: ReactNode;
	className?: string;
}

export interface ImageProps {
	src: string;
	alt?: string;
	width?: number;
	height?: number;
	caption?: string;
	className?: string;
}

export interface ImagePairProps {
	src1: string;
	src2: string;
	alt1?: string;
	alt2?: string;
	caption?: string;
	className?: string;
}

export interface BlockProps {
	children: ReactNode;
	className?: string;
}

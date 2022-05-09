export interface ProjectSingle {
	img: {
		src: string,
		alt: string
	};
	title: string;
	desc: string;
	links: {
		github?: string;
		demo?: string;
	};
	technologies: string[];
	activeIndex?: number;
	first?: boolean;
	last?: boolean;
}

export interface ProjectInfo {
	[key: string]: ProjectSingle
}
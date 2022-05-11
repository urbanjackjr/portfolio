<template>
	<main class="main projects" ref="scrollElement">
		<h1 class="main__title projects__title">Projects</h1>
		<ProjectFilter @onFilter="(filter) => filterProjectsByTechnology(filter)" :filterArray="allTechnologies()" />
		<ul class="projects__list" ref="listElement">
			<Project
				v-for="(project, key, index) in filteredProjects"
				:id="key"
				:img="project.img"
				:title="project.title"
				:desc="project.desc"
				:links="project.links"
				:technologies="project.technologies"
				:first="index === 0"
				:last="index === Object.keys(filteredProjects).length - 1"
				:class="[index === 0 && 'project--first']"
				:key="key"
			/>
		</ul>
		<ProjectsNav :navLinks="projectInfo" :projectElement="listElement" :scrollElement="scrollElement" />
		<BackToTop :show="showBackToTopButton" @click="scrollElement && scrollToTop(scrollElement)" />
	</main>
</template>
<script setup lang="ts">
import Project from "@/components/Project.vue";
import ProjectFilter from "@/components/helpers/ProjectFilter.vue";
import ProjectsNav from "@/components/helpers/ProjectsNav.vue";
import BackToTop from "@/components/helpers/BackToTop.vue";

import { scrollToTop } from "@/utils/utils";

import type { ProjectInfo } from "@/utils/types";

definePageMeta({
	title: "Projects",
});

const scrollElement = ref<HTMLElement | null>(null);

const listElement = ref<HTMLElement | null>(null);

const projectInfo = reactive<ProjectInfo>({
	periodic: {
		img: {
			src: "/images/periodic-table.jpg",
			alt: "",
		},
		title: "Periodic Table",
		desc: "A webapp of a Periodic Table of chemical elements. The features present are, among others: list of elements' properties, a visualization of their electron configurations, as well as JSmol visualization of elements' valence orbitals. A user can also create compounds and see their properties as well as view their 3D molecular structures.",
		links: {
			github: "https://github.com/urbanjackjr/periodic-table",
			demo: "https://urbanjackjr.github.io/",
		},
		technologies: ["Vue 3", "Vuex", "Vite", "REST API", "Sass", "PostCSS"],
	},
	portfolio: {
		img: {
			src: "/images/portfolio.jpg",
			alt: "",
		},
		title: "Personal Portfolio",
		desc: "Personal portfolio website build using technologies such as: Nuxt 3 together with TypeScript, Sass and NodeJS with NodeMailer. The application is rendered using Server Side Rendering.",
		links: {
			github: "https://github.com/urbanjackjr/portfolio",
			demo: "/",
		},
		technologies: ["Nuxt", "Typescript", "NodeJS", "REST API", "Sass", "PostCSS"],
	},
	tableOfContents: {
		img: {
			src: "/images/table-of-contents.jpg",
			alt: "",
		},
		title: "Table of Contents",
		desc: "A wordpress block plugin to be used in the new Block Editor. It automatically detects <code>h2</code> headers and creates a list of them in a chosen place in an article, or a page.",
		links: {
			github: "https://github.com/urbanjackjr/table-of-contents",
			demo: "https://ibmf.pl/dlaczego-social-media-manager-to-zawod-przyszlosci/",
		},
		technologies: ["Wordpress Block Editor", "React", "PostCSS"],
	},
	learnLanguageTextbox: {
		img: {
			src: "/images/textbox.jpg",
			alt: "",
		},
		title: "Language Learning Textbox",
		desc: "Learn Language Textbox is a plugin that helps to learn languages through short text and stories. User can hover over a certain word and see its translation, as well as saving this word to go back to it later.",
		links: {
			github: "https://github.com/urbanjackjr/ll-textbox",
		},
		technologies: ["Wordpress", "PHP", "REST API", "JavaScript", "jQuery"],
	},
	bullsBears: {
		img: {
			src: "/images/bullsbears.jpg",
			alt: "",
		},
		title: "BullsBears",
		desc: "Wordpress financial news site. Every stock, bond, future, currency has its own site with charts and articles connected to it. Theme and plugins created by me.",
		links: {
			demo: "https://bullsbears.pl/",
		},
		technologies: ["Wordpress", "PHP", "Sass", "jQuery"],
	},
	wigraGeodezja: {
		img: {
			src: "/images/wigra-geodezja.jpg",
			alt: "",
		},
		title: "Wigra Geodezja",
		desc: "Client's surveying services website build using Wordpress. Website has a custom theme created entirely by me.",
		links: {
			demo: "https://wigra-geodezja.pl/",
		},
		technologies: ["Wordpress", "PHP", "Sass", "jQuery"],
	},
	iBMF: {
		img: {
			src: "/images/ibmf.jpg",
			alt: "",
		},
		title: "iBMF",
		desc: "A simple website build on top of WordPress with a course shop. Also with a custom theme.",
		links: {
			demo: "https://ibmf.pl/",
		},
		technologies: ["Wordpress", "PHP", "WooCommerce", "Sass", "jQuery"],
	},
	theSwitch: {
		img: {
			src: "/images/theswitch.jpg",
			alt: "",
		},
		title: "The Switch",
		desc: "Personal development website build on top of WordPress with a course shop. Theme created by me based on designer's project.",
		links: {
			demo: "https://theswitch.pl/",
		},
		technologies: ["Wordpress", "PHP", "WooCommerce", "Sass", "jQuery"],
	},
	kancelariaKaszyca: {
		img: {
			src: "/images/kancelaria-kaszyca.jpg",
			alt: "",
		},
		title: "Kancelaria Kaszyca",
		desc: "Legal Counseling website created for client build on top of WordPress. Custom theme created by me.",
		links: {
			demo: "https://www.kancelaria-kaszyca.pl/",
		},
		technologies: ["Wordpress", "PHP", "Sass", "jQuery"],
	},
});

// Project filtering
const filteredProjects = ref<ProjectInfo>(projectInfo);

const allTechnologies = (): string[] => {
	let project: keyof ProjectInfo;
	let technologiesArray: string[] = [];

	for (project in projectInfo) {
		technologiesArray = technologiesArray.concat(projectInfo[project].technologies);
	}

	technologiesArray = [...new Set(technologiesArray)];

	return technologiesArray;
};

const filterProjectsByTechnology = (filter: string | undefined) => {
	// if filter is undefined, return whole object, otherwise filter by technology
	if (!filter) {
		filteredProjects.value = projectInfo;
		Object.entries(projectInfo).forEach(([key, value], index) => {
			value.activeIndex = index + 1;
		});
	} else {
		filteredProjects.value = {};

		// Set index of active project to ensure proper scrolling
		let currIndexOfActive: number = 1;
		Object.entries(projectInfo).forEach(([key, value]) => {
			if (value.technologies.includes(filter)) {
				value.activeIndex = currIndexOfActive;
				filteredProjects.value[key] = value;
				currIndexOfActive++;
			} else {
				value.activeIndex = 0;
			}
		});
	}
};

// show Back to top button logic
const showBackToTopButton = ref<boolean>(false);

const shouldShowBackToTopButton = (): void => {
	showBackToTopButton.value = scrollElement.value && scrollElement.value.scrollTop > 100 ? true : false;
};

onMounted(() => {
	scrollElement.value?.addEventListener("scroll", shouldShowBackToTopButton);
});

onUnmounted(() => {
	scrollElement.value?.removeEventListener("scroll", shouldShowBackToTopButton);
});
</script>

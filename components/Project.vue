<template>
	<li :class="['project', !onScrollTranslations && 'project--column']" ref="projectElement">
		<Arrows
			v-if="!first"
			class="arrows--top"
			@click="projectElement && scrollElement && scrollToSection(projectElement, scrollElement, 'prev')"
		/>
		<div class="project__sections" ref="projectElementChild">
			<NuxtLink class="project__section project__section--thumbnail" :to="links.demo">
				<figure class="project__image">
					<img :src="img.src" :alt="img.alt" />
				</figure>
			</NuxtLink>
			<section class="project__section project__section--details">
				<h2 class="project__title">
					<a :href="links.demo">{{ title }}</a>
				</h2>
				<p class="main__desc project__desc" v-html="desc"></p>
				<ul class="project__links">
					<li v-for="(link, key) of links" :key="link" class="project__link-item">
						<a :href="link" class="project__link" target="_blank">
							<component :is="returnIcon(key)" />
						</a>
					</li>
				</ul>
			</section>
			<section class="project__section project__section--technologies">
				<h3 class="project__title--h3">Technologies used</h3>
				<ul class="list project__list">
					<li v-for="tech of technologies" :key="tech" class="list__item project__technology">
						<Marker class="list__marker" />
						{{ tech }}
					</li>
				</ul>
			</section>
		</div>
		<Arrows
			v-if="!last"
			:class="[!onScrollTranslations && 'arrows--static']"
			@click="projectElement && scrollElement && scrollToSection(projectElement, scrollElement, 'next')"
		/>
	</li>
</template>
<script setup lang="ts">
import "@/assets/sass/components/_project.scss";

import Arrows from "./helpers/Arrows.vue";
import Marker from "./icons/Marker.vue";
import Github from "./icons/Github.vue";
import Demo from "./icons/Demo.vue";

// Cannot import interfaces in Nuxt for some reason.
interface Props {
	img: {
		src: string;
		alt: string;
	};
	title: string;
	desc: string;
	links: {
		github?: string;
		demo?: string;
	};
	technologies: string[];
	first?: boolean;
	last?: boolean;
}

const { img, title, desc, links, technologies, first, last } = defineProps<Props>();

// Return icon (Vue 3 component :is doesn't work with strings, I hate You Evan)
const returnIcon = (key: string): typeof Github => {
	if (key === "github") {
		return Github;
	} else {
		return Demo;
	}
};

const projectElement = ref<HTMLElement | null>(null);

const scrollElement = ref<HTMLElement | null>(null);

const projectElementChild = ref<HTMLElement | null>(null);

const { onScrollTranslations, scrollToSection } = useParallaxSections(projectElement, scrollElement, projectElementChild);
</script>

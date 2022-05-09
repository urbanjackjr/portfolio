<template>
	<nav class="projects__nav" :class="[isOpen && 'projects__nav--active']">
		<div class="projects__nav-toggle" @click="isOpen = !isOpen">
			<Hamburger :class="[isOpen && 'hamburger--active']" />
		</div>
		<ol class="projects__nav-list">
			<li
				v-for="(link, key, index) in navLinks"
				:class="['projects__nav-item', (link.activeIndex || link.activeIndex === undefined) && 'projects__nav-item--active']"
				:key="key"
				@mouseover="isOpen = true"
				@click="
					projectElement &&
						scrollElement &&
						scrollToSection(projectElement, scrollElement, link.activeIndex ? link.activeIndex - 1 : index),
						(isOpen = false)
				"
			>
				{{ link.title }}
			</li>
		</ol>
	</nav>
</template>
<script setup lang="ts">
import "@/assets/sass/components/helpers/_projectsNav.scss";
import { scrollToSection } from "~~/composables/useParallaxSections/calculations";

import type { ProjectInfo } from "@/utils/types";

import Hamburger from "@/components/icons/Hamburger.vue";

const isOpen = ref<boolean>(false);

interface Props {
	navLinks: ProjectInfo;
	projectElement: HTMLElement | null;
	scrollElement: HTMLElement | null;
}

const { navLinks, projectElement, scrollElement } = defineProps<Props>();
</script>

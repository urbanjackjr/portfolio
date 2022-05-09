<template>
	<main class="main main--cols skills">
		<article class="main__col">
			<h1 class="main__title">Skills & Experience</h1>
			<p class="main__desc">
				I've been passionate about Web Development for many years now. I love working on my personal projects as well as helping my
				clients achieve their goals.
			</p>
			<p class="main__desc">
				Since my beginnings I've created many websites for clients, mainly using famous content management systems like
				<strong>Wordpress or Shopify</strong>. I am not a stranger to <strong>RWD</strong>. I create responsive websites that are
				optimised. I make sure not to cause unnecessary requests and only provide packages that are essential for the user
				experience. I can provide <strong>pixel perfect design</strong> that follows designer mockups. You can be sure to receive a
				product that you paid for.
			</p>
			<p class="main__desc">
				I write
				<strong>clean code</strong> that follows popular methodologies and patterns. I make sure to follow W3C recommendations and
				build-in semantics to ensure maintainability and cross-browser support. I constantly make sure to check compatibility with
				all users of the web.
			</p>
		</article>
		<section class="main__col skills__list">
			<ul v-for="(row, index) of skillList" class="main__row skills__row" :key="index">
				<li v-for="(skill, key) in row" :class="['skills__item', index !== 0 && 'skills__item--small']" :key="key">
					<component :is="skill" class="skills__icon" />
					{{ key }}
				</li>
			</ul>
		</section>
	</main>
</template>
<script setup lang="ts">
import HTML5 from "@/components/icons/HTML5.vue";
import CSS3 from "@/components/icons/CSS3.vue";
import JavaScript from "@/components/icons/JavaScript.vue";
import PHP from "@/components/icons/PHP.vue";
import jQuery from "@/components/icons/jQuery.vue";
import NodeJS from "@/components/icons/NodeJS.vue";
import Nuxt from "@/components/icons/Nuxt.vue";
import Sass from "@/components/icons/Sass.vue";
import TypeScript from "@/components/icons/TypeScript.vue";
import Vue from "@/components/icons/Vue.vue";
import Wordpress from "@/components/icons/Wordpress.vue";

definePageMeta({
	title: "Skills",
});

type SkillList = { [key: string]: typeof HTML5 }[];

const skillList: SkillList = [
	{
		HTML: HTML5,
		CSS: CSS3,
		JavaScript: JavaScript,
	},
	{
		Vue: Vue,
		Nuxt: Nuxt,
		Sass: Sass,
		WordPress: Wordpress,
	},
	{
		TypeScript: TypeScript,
		jQuery: jQuery,
		PHP: PHP,
		NodeJS: NodeJS,
	},
];
</script>

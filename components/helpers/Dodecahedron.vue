<template>
	<div class="dodecahedron-wrapper">
		<ul class="dodecahedron">
			<li class="dodecahedron__side" v-for="(skill, key) in skillList">
				<div class="dodecahedron__icon">
					<component :is="skill" class="dodecahedron__svg" />
				</div>
				<svg
					version="1.1"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					width="511.755px"
					xml:space="preserve"
					height="537.755px"
					viewBox="0 0 511.755 537.755"
					enable-background="new 0 0 511.755 537.755"
				>
					<polygon
						fill="var(--background--700)"
						stroke-width="10"
						stroke-miterlimit="10"
						points="101.369,481.708 5.878,187.816   255.878,6.18 505.877,187.816 410.386,481.708 "
						stroke="var(--foreground)"
					></polygon>
				</svg>
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import "@/assets/sass/components/helpers/_dodecahedron.scss";

import HTML5 from "@/components/icons/HTML5.vue";
import CSS3 from "@/components/icons/CSS3.vue";
import JavaScript from "@/components/icons/JavaScript.vue";
import PHP from "@/components/icons/PHP.vue";
import jQuery from "@/components/icons/jQuery.vue";
import MySQL from "@/components/icons/MySQL.vue";
import NodeJS from "@/components/icons/NodeJS.vue";
import Nuxt from "@/components/icons/Nuxt.vue";
import Sass from "@/components/icons/Sass.vue";
import TypeScript from "@/components/icons/TypeScript.vue";
import Vue from "@/components/icons/Vue.vue";
import Wordpress from "@/components/icons/Wordpress.vue";

type SkillList = {
	[key: string]: typeof HTML5;
};

const skillList: SkillList = {
	HTML: HTML5,
	CSS: CSS3,
	JavaScript: JavaScript,
	PHP: PHP,
	jQuery: jQuery,
	MySQL: MySQL,
	NodeJS: NodeJS,
	Nuxt: Nuxt,
	Sass: Sass,
	TypeScript: TypeScript,
	Vue: Vue,
	Wordpress: Wordpress,
};
</script>

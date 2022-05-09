<template>
	<main class="main main--cols index">
		<section class="main__col">
			<h1 class="main__title">Jacek Urban</h1>
			<p class="main__desc">
				Young Front End Developer located in Poland. I have a 2-year experience in Web Development and I always strive to learn new
				things. Web Development is not only my job, but my passion. I quickly acquire knowledge about libraries and other tools,
				that I haven't worked with before.
			</p>
			<div class="main__buttons">
				<NuxtLink to="/skills" class="button">
					<span class="button__text">Skills</span>
				</NuxtLink>
				<NuxtLink to="/projects" class="button">
					<span class="button__text">Projects</span>
				</NuxtLink>
				<NuxtLink to="/contact" class="button">
					<span class="button__text">Contact me</span>
				</NuxtLink>
			</div>
		</section>
		<section class="main__col main__col--center">
			<Dodecahedron />
		</section>
	</main>
</template>
<script setup lang="ts">
import Dodecahedron from "@/components/helpers/Dodecahedron.vue";

definePageMeta({
	title: "Home",
});
</script>

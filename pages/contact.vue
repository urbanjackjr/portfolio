<template>
	<main class="main contact">
		<Script v-if="formActive" :src="`https://www.google.com/recaptcha/api.js?render=${reCaptchaSiteKey}`" async defer> </Script>

		<h1 class="main__title">Contact me</h1>
		<address class="contact__address">
			<NuxtLink class="contact__info" :href="`mailto:${contactInfo.mail}`" target="_blank">
				<Mail class="contact__icon" />
				{{ contactInfo.mail }}
			</NuxtLink>
			<NuxtLink class="contact__info" :href="contactInfo.github" target="_blank">
				<Github class="contact__icon" />
				Github
			</NuxtLink>
			<NuxtLink class="contact__info" :href="contactInfo.linkedIn" target="_blank">
				<LinkedIn class="contact__icon" />
				LinkedIn
			</NuxtLink>
		</address>
		<p class="main__desc contact__desc">If you have got any questions, drop me a line here, or through any of links above.</p>
		<Form class="contact__form" @click.once="formActive = true" />
	</main>
</template>
<script setup lang="ts">
import Mail from "@/components/icons/Mail.vue";
import Github from "@/components/icons/Github.vue";
import LinkedIn from "@/components/icons/LinkedIn.vue";

const formActive = ref<boolean>(false);

const contactInfo = reactive<{ [key: string]: string }>({
	mail: "",
	github: "",
	linkedIn: "",
});

const reCaptchaSiteKey = useRuntimeConfig().reCaptchaSiteKey;

definePageMeta({
	title: "Contact",
});

onMounted(() => {
	contactInfo.mail = "jaceku20@gmail.com";
	contactInfo.github = "https://github.com/urbanjackjr/";
	contactInfo.linkedIn = "https://www.linkedin.com/in/jacek-urban/";
});

onBeforeUnmount(() => {
	formActive.value = false;

	// remove badge if it exists
	document.body.lastElementChild &&
		document.body.lastElementChild.querySelector(".grecaptcha-badge") &&
		document.body.removeChild(document.body.lastElementChild);
});
</script>

<template>
	<div class="header-wrapper">
		<header class="header">
			<div class="header__section header__section--logo">
				<NuxtLink class="header__logo" to="/">
					<Logo />
				</NuxtLink>
				<ThemeSwitcher />
			</div>
			<nav class="header__section header__section--links">
				<NuxtLink v-for="(link, key, index) in links" class="header__link" :key="link.to" :to="link.to" :aria-label="key">
					<component :is="link.icon" class="header__icon" />
					<span class="header__nav-title">{{ key }}</span>
				</NuxtLink>
			</nav>
			<div class="header__section header__section--links">
				<NuxtLink
					v-for="(link, key, index) in externalLinks"
					:href="link.to"
					class="header__link header__link--external"
					target="_blank"
					:aria-label="key"
				>
					<component :is="link.icon" class="header__icon header__icon--external" />
					<span class="header__nav-title">{{ key }}</span>
				</NuxtLink>
			</div>
		</header>
	</div>
</template>

<script setup lang="ts">
// style import in main.scss to avoid splash unstyled content

import Code from "./icons/Code.vue";
import Contact from "./icons/Contact.vue";
import Home from "./icons/Home.vue";
import Badge from "./icons/Badge.vue";
import Github from "./icons/Github.vue";
import LinkedIn from "./icons/LinkedIn.vue";
import Logo from "./icons/Logo.vue";

import ThemeSwitcher from "./helpers/ThemeSwitcher.vue";

type Links = {
	[key: string]: {
		to: string;
		icon: object;
	};
};

const links: Links = {
	Home: { to: "/", icon: Home },
	Skills: { to: "/skills", icon: Badge },
	Projects: { to: "/projects", icon: Code },
	Contact: { to: "/contact", icon: Contact },
};

const externalLinks: Links = {
	Github: { to: "https://github.com/urbanjackjr/", icon: Github },
	LinkedIn: {
		to: "https://www.linkedin.com/in/jacek-urban/",
		icon: LinkedIn,
	},
};
</script>

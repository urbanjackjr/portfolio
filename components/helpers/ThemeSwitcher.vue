<template>
	<div @mouseleave="isListOpen = false" class="themeSwitcher">
		<button @click="toggleList" :class="['themeSwitcher__toggler', isListOpen && 'themeSwitcher__toggler--active']">
			<Brush class="header__icon" />
			<span class="header__nav-title">Themes</span>
		</button>
		<Transition name="list">
			<div @mouseover="isListOpen = true" v-show="isListOpen" class="themeSwitcher__list--wrapper">
				<ul class="themeSwitcher__list">
					<li
						v-for="(theme, themeKey) in themeData"
						:key="themeKey"
						@click="themeChangeHandler(themeKey)"
						:class="['themeSwitcher__item', themeName === themeKey && 'themeSwitcher__item--current']"
					>
						{{ themeKey }}
					</li>
				</ul>
			</div>
		</Transition>
	</div>
</template>
<script setup lang="ts">
import "@/assets/sass/components/helpers/_themeSwitcher.scss";

import themeData from "@/assets/data/themes.json";

import Brush from "@/components/icons/Brush.vue";

const { $store } = useNuxtApp();

const isListOpen = ref<boolean>(false);

const toggleList = (): void => {
	isListOpen.value = !isListOpen.value;
};

const themeName = useThemeCookie();

const themeCookie = useCookie("theme", {
	sameSite: "strict",
	secure: true,
});

const themeChangeHandler = (themeKey: string): void => {
	$store.themes.actions.themeHandler(themeKey);
	themeName.value = themeKey;
	toggleList();
	if (typeof $store.themes.state.currentTheme === "string") {
		themeCookie.value = $store.themes.state.currentTheme;
	}
};
</script>

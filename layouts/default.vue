<template>
	<div class="wrapper">
		<Html>
			<Head>
				<Title>{{ route.meta.title }} - Jacek Urban</Title>
				<Meta name="description" :content="`My page's description`" />
				<Style class="colors" :children="themeCSSVars(theme)"></Style>
			</Head>
		</Html>
		<Header />
		<div class="main-wrapper">
			<Loading :isLoading="$store.universal.state.loading" />
			<slot />
		</div>
		<Termynal />
	</div>
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue";
import Termynal from "@/components/helpers/Termynal.vue";
import Loading from "@/components/helpers/Loading.vue";

import { themeCSSVars } from "~~/utils/themes";

const theme = useThemeCookie();

const { $store } = useNuxtApp();
const route = useRoute();

onMounted(() => {
	$store.universal.mutations.stopLoading();
});
</script>

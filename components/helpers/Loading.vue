<template>
	<Transition name="fade">
		<div v-if="isLoading" class="loading">
			<div class="loading__ring">
				<div class="loading__single"></div>
				<div class="loading__single"></div>
				<div class="loading__single"></div>
				<div class="loading__single"></div>
			</div>
		</div>
	</Transition>
</template>
<script setup lang="ts">
import "@/assets/sass/components/helpers/_loading.scss";

defineProps({
	isLoading: Boolean,
});
</script>

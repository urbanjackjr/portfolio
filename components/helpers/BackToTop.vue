<template>
	<Transition name="fade">
		<button v-if="show" class="back-to-top button" aria-label="Back to top">
			<span class="button__text">
				<ArrowUpward />
			</span>
		</button>
	</Transition>
</template>
<script setup lang="ts">
import ArrowUpward from "@/components/icons/ArrowUpward.vue";

interface Props {
	show: boolean;
}

const { show } = defineProps<Props>();
</script>

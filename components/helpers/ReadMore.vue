<template>
	<p ref="paragraph" @click="toggleParagraph" :style="{ maxHeight: maxHeight }">
		{{ props.text }}
		<button class="button button--read-more">
			<Down />Read more
			<Down />
		</button>
	</p>
</template>
<script setup lang="ts">
import "@/assets/sass/components/helpers/_readMore.scss";
import Down from "@/components/icons/Down.vue";

const props = defineProps<{
	text: string;
}>();

const isParagraphOpen = ref<Boolean>(false);
const maxHeight = ref<string>("110px");

const paragraph = ref<HTMLParagraphElement | null>(null);

const toggleParagraph = () => {
	if (!paragraph.value) return;
	isParagraphOpen.value = !isParagraphOpen.value;
	maxHeight.value = isParagraphOpen.value ? paragraph.value.scrollHeight.toString() + "px" : "110px";
};
</script>

<template>
	<div class="project__filters">
		<span class="project__filters-title"><Filter class="project__icon" />Filter Projects:</span>
		<ul class="project__filter-list">
			<li
				v-for="filter of filterArray"
				:class="['project__filter', 'button', filter === currentFilter && ['button--active', 'project__filter--active']]"
				@click="setCurrentFilter(filter)"
			>
				<span class="button__text">{{ filter }}</span>
				<Close v-if="filter === currentFilter" class="project__filter-clear" />
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import "@/assets/sass/components/helpers/_projectFilter.scss";
import Filter from "@/components/icons/Filter.vue";
import Close from "@/components/icons/Close.vue";

interface Props {
	filterArray: string[];
}

const { filterArray } = defineProps<Props>();

const emit = defineEmits<{
	(e: "onFilter", filter: string | undefined): void;
}>();

const currentFilter = ref<string>();

const setCurrentFilter = (filter: string): void => {
	currentFilter.value = currentFilter.value === filter ? undefined : filter;
	emit("onFilter", currentFilter.value);
};
</script>

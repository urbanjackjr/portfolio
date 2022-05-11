<template>
	<form class="form" autocomplete="off" method="post" @submit.prevent="() => formValidation()">
		<li v-for="(field, key) in formFields" :class="['form__field', `form__field--${field.name}`]" :key="key">
			<input
				v-if="!field.tag || field.tag === 'input'"
				:type="field.type"
				:name="field.name"
				:class="field.tag ? `form__${field.tag}` : 'form__input'"
				:placeholder="field.placeholder"
				v-model="field.inputValue"
				@focus="clearErrors(key)"
				@focusout="(e: Event) => singleValidation(e, field)"
			/>
			<textarea
				v-else-if="field.tag === 'textarea'"
				:type="field.type"
				:name="field.name"
				:class="field.tag ? `form__${field.tag}` : 'form__input'"
				:placeholder="field.placeholder"
				v-model="field.inputValue"
				@focus="clearErrors(key)"
				@focusout="(e: Event) => singleValidation(e, field)"
			/>
			<label for="name" class="form__label sr-only">{{ field.placeholder }}</label>
			<Transition name="slide--down">
				<label v-if="field.error" for="name" class="form__error">{{ field.errorMessage }}</label>
			</Transition>
		</li>
		<li class="form__field">
			<button type="submit" class="form__submit button">
				<span class="button__text">Send message!</span>
				<Loading :isLoading="formLoading" />
			</button>
			<Transition name="fade">
				<span v-if="validationMessage" :class="['form__message', formSuccess && 'form__message--success']">{{
					validationMessage
				}}</span>
			</Transition>
		</li>
	</form>
</template>
<script setup lang="ts">
// !!! IMPORTANT !!!
// INPUT AND TEXTAREA ARE DONE THIS WAY, BECAUSE VUE HAS A PROBLEM WITH CAPTURING EVENTS WITH COMPONENT :IS

import "@/assets/sass/components/_form.scss";

import Loading from "@/components/helpers/Loading.vue";

import { nameValidation, emailValidation, emptyValidation } from "@/utils/validator";

interface FormFields {
	[key: string]: {
		name: string;
		tag?: "input" | "textarea";
		type: string;
		placeholder?: string;
		validation: typeof nameValidation;
		error: boolean;
		inputValue: string;
		errorMessage: string;
	};
}

const singleValidation = (e: Event, field: typeof formFields.name): void => {
	field.error = !field.validation((e.target as HTMLTextAreaElement).value);
};

const formLoading = ref<boolean>(false);

const formSuccess = ref<boolean>(false);

const validationMessage = ref<string | undefined>();

const formFields = reactive<FormFields>({
	name: {
		name: "name",
		tag: "input",
		type: "text",
		placeholder: "Name",
		validation: nameValidation,
		inputValue: "",
		error: false,
		errorMessage: "Name should contain at least 2 characters.",
	},
	email: {
		name: "email",
		tag: "input",
		type: "email",
		placeholder: "Email",
		validation: emailValidation,
		inputValue: "",
		error: false,
		errorMessage: "Enter a valid email address.",
	},
	subject: {
		name: "subject",
		tag: "input",
		type: "text",
		placeholder: "Subject",
		validation: emptyValidation,
		inputValue: "",
		error: false,
		errorMessage: "Type in a subject of the message.",
	},
	message: {
		name: "message",
		tag: "textarea",
		type: "text",
		placeholder: "Message",
		validation: emptyValidation,
		inputValue: "",
		error: false,
		errorMessage: "The message should not be empty.",
	},
});

const formValidation = (): boolean => {
	const formValues: { [key: string]: string } = {};
	validationMessage.value = undefined;

	for (const field in formFields) {
		formFields[field].error = !formFields[field].validation(formFields[field].inputValue);
		if (formFields[field].error) {
			validationMessage.value = "There are some errors in the form. Check and try again.";
		}

		formValues[field] = formFields[field].inputValue;
	}

	if (validationMessage.value) {
		return false;
	}

	formLoading.value = true;

	useReCaptcha()
		.then((value) => {
			formValues["reCaptcha"] = value;
		})
		.then(() => {
			fetch("/api/contact", {
				method: "POST",
				mode: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formValues),
			})
				.then((response) => {
					if (!(response.status >= 200 && response.status < 300)) {
						formSuccess.value = false;
					} else {
						formSuccess.value = true;
					}

					return response.text();
				})
				.then((data) => {
					formLoading.value = false;
					validationMessage.value = data;

					for (const field in formFields) {
						formFields[field].inputValue = "";
					}

					return true;
				});
		})
		.catch((error) => {
			formLoading.value = false;
			validationMessage.value = error;
		});

	return true;
};

const clearErrors = (field: keyof FormFields): void => {
	formFields[field].error = false;
};
</script>

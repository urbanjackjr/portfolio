<template>
	<form class="form" autocomplete="off" method="post" @submit.prevent="(e: any) => formValidation(e)">
		<li v-for="(field, key) in formFields" :class="['form__field', `form__field--${field.name}`]" :key="key">
			<input
				v-if="!field.tag || field.tag === 'input'"
				:type="field.type"
				:name="field.name"
				:class="field.tag ? `form__${field.tag}` : 'form__input'"
				:placeholder="field.placeholder"
				v-model="field.inputValue"
				@focus="clearErrors(key)"
				@focusout="(e: any) => field.validation && field.validation(e.target.value)"
			/>
			<textarea
				v-else-if="field.tag === 'textarea'"
				:type="field.type"
				:name="field.name"
				:class="field.tag ? `form__${field.tag}` : 'form__input'"
				:placeholder="field.placeholder"
				v-model="field.inputValue"
				@focus="clearErrors(key)"
				@focusout="(e: any) => field.validation && field.validation(e.target.value)"
			/>
			<label for="name" class="form__label sr-only">{{ field.placeholder }}</label>
			<Transition name="slide--down">
				<label v-if="field.error" for="name" class="form__error">{{ field.error }}</label>
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
import "@/assets/sass/components/_form.scss";

import Loading from "@/components/helpers/Loading.vue";

interface FormFields {
	[key: string]: {
		name: string;
		tag?: "input" | "textarea";
		type: string;
		placeholder?: string;
		validation: (a: string) => boolean;
		error?: string;
		inputValue: string;
	};
}

type singleValidation = (a: string) => boolean;

const nameValidation: singleValidation = (value) => {
	if (value.length > 1) {
		return true;
	}

	formFields.name.error = "Name should contain at least 2 characters.";
	return false;
};

const emailValidation: singleValidation = (value) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
		return true;
	}

	formFields.email.error = "Enter a valid email address.";
	return false;
};

const subjectValidation: singleValidation = (value) => {
	if (value) {
		return true;
	}

	formFields.subject.error = "Type in a subject of the message.";
	return false;
};

const messageValidation: singleValidation = (value) => {
	if (value) {
		return true;
	}

	formFields.message.error = "The message should not be empty.";
	return false;
};

const formLoading = ref<boolean>(false);

const formSuccess = ref<boolean>(false);

const validationMessage = ref<string | undefined>();

const formFields = reactive<FormFields>({
	name: {
		name: "name",
		type: "text",
		placeholder: "Name",
		validation: nameValidation,
		inputValue: "",
	},
	email: {
		name: "email",
		type: "email",
		placeholder: "Email",
		validation: emailValidation,
		inputValue: "",
	},
	subject: {
		name: "subject",
		type: "text",
		placeholder: "Subject",
		validation: subjectValidation,
		inputValue: "",
	},
	message: {
		name: "message",
		tag: "textarea",
		type: "text",
		placeholder: "Message",
		validation: messageValidation,
		inputValue: "",
	},
});

const formValidation = (e: any): boolean => {
	const formValues: { [key: string]: string } = {};
	validationMessage.value = undefined;

	for (const field in formFields) {
		formFields[field].validation(formFields[field].inputValue);
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
	formFields[field].error = undefined;
};
</script>

type Data = {
	[key: string]: string
}

import { useBody } from 'h3';
import type { CompatibilityEvent } from 'h3';
import type { IncomingMessage, ServerResponse } from 'http';
import nodeMail from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
import { nameValidation, emailValidation, emptyValidation, escapeString } from '~~/utils/validator';

const escapeData = (data: Data): Data => {
	for (const entry in data) {
		data[entry] = escapeString(data[entry]);
	}
	return data;
}

const validateData = (data: Data): Promise<string> => {
	return new Promise((resolve, reject) => {

		if (!nameValidation(data.name) || !emailValidation(data.email) || !emptyValidation(data.subject) || !emptyValidation(data.message)) {
			reject("You've passed bad data to backend. Shame on you.");
		}

		resolve("Data validated");
	})
}

const createTransporter = async () => {
	const oauth2Client = new OAuth2(
		useRuntimeConfig().cliendId,
		useRuntimeConfig().clientSecret,
		"https://developers.google.com/oauthplayground"
	);

	oauth2Client.setCredentials({
		refresh_token: useRuntimeConfig().refreshToken
	});

	const accessToken = await new Promise((resolve, reject) => {
		oauth2Client.getAccessToken((err, token) => {
			if (err) {
				reject("Failed to create access token :(");
			}
			resolve(token);
		});
	});

	const transporter = nodeMail.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: useRuntimeConfig().mailEmail,
			accessToken,
			clientId: useRuntimeConfig().cliendId,
			clientSecret: useRuntimeConfig().clientSecret,
			refreshToken: useRuntimeConfig().refreshToken
		}
	});

	return transporter;
};

const mainMail = async (data: Data, res: ServerResponse): Promise<string> => {
	let emailTransporter = await createTransporter();
	const mailOption = {
		from: data.email,
		to: 'jaceku20@gmail.com',
		subject: data.subject,
		html: `You got a message from 
		Email : ${data.email}
		Name: ${data.name}
		Message: ${data.message}`,
	};
	try {
		await emailTransporter.sendMail(mailOption);
		res.statusMessage = "Everything went well. Email was sent."
		return Promise.resolve("Message Sent Successfully!");
	} catch (error) {
		return Promise.reject("Server Error. Couldn't Send Email. Try Again.");
	}
}

const verifyReCaptcha = async (token: string, res: ServerResponse) => {
	let url = 'https://www.google.com/recaptcha/api/siteverify?secret=';
	url += useRuntimeConfig().reCaptchaSecretKey;
	url += '&response=' + token;

	await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
	}).then((response) => {
		// Check for network status
		if (!(response.status >= 200 && response.status < 300)) {
			return Promise.reject("Couldn't verify reCaptcha. Try again or reach me by email.");
		}

		return response.json();
	}).then((data) => {
		if (!data.success) {
			return Promise.reject("Couldn't verify reCaptcha. Try again or reach me by email.")
		}

		if (data.score <= 0.5) {
			return Promise.reject("You are most likely a robot.")
		}

		return data;
	}).catch((error) => {
		return Promise.reject(error);
	})
}

export default async (req: IncomingMessage, res: ServerResponse) => {
	const body = await useBody(req as CompatibilityEvent);
	try {
		await validateData(body);
		await verifyReCaptcha(body.reCaptcha, res);
		await mainMail(escapeData(body), res);

		return "Message Successfully Sent!";
	} catch (error) {
		res.statusCode = 500;
		res.statusMessage = error as string;
		return error;
	}
}
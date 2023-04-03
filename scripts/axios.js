import axios from "axios";

const OPENAI_API_KEY = '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'

export const http = axios.create({
	baseURL: 'https://api.openai.com/v1/completions',
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${OPENAI_API_KEY}`
	}
})

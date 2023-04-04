import axios from "axios";

const OPENAI_API_KEY = process.env.SECRET_API_KEY

export const http = axios.create({
	baseURL: process.env.BASE_URL_API,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${OPENAI_API_KEY}`
	}
})

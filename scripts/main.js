import { http } from "./axios";
// implementing axios call to API
export default {
	completionsToApi: () => {
		return http.post(data);
	},
};

// fetch request to API

const inputQuestion = document.querySelector("#question");
const inputResult = document.querySelector("#result");

const OPENAPI_API_KEY = "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";

inputQuestion.addEventListener("keypress", (e) => {
	if (inputQuestion.value && e.key === "Enter") {
		SendQuestion();
	}
});


function SendQuestion() {
	let questionValue = inputQuestion.value;

	fetch("https://api.openai.com/v1/completions", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + OPENAPI_API_KEY,
		},
		body: JSON.stringify({
			model: "text-davinci-003",
			prompt: questionValue,
			max_tokens: 2048,
			temperature: 0.5,
		}),
	})
		.then((res) => res.json())
		.then((json) => {
			if (inputResult.value) inputResult.value += "\n";

			if (json.error?.message) {
				inputResult.value += `Error: ${json.error.message}`;
			} else if (json.choices?.[0].text) {
				let text = json.choices[0].text || "Sem resposta";

				inputResult.value += "Chat GPT: " + text;
			}

			inputResult.scrollTop = inputResult.scrollHeight;
		})
		.catch((error) => console.error("Error:", error))
		.finally(() => {
			inputQuestion.value = "";
			inputQuestion.disabled = false;
			inputQuestion.focus();
		});

	if (result.value) result.value += "\n\n\n";

	inputResult.value += `Eu: ${questionValue}`;
	inputQuestion.value = "Carregando...";
	inputQuestion.disabled = true;

	inputResult.scrollTop = inputResult.scrollHeight;
}

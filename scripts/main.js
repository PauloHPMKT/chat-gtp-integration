const inputQuestion = document.querySelector("#data-question");
const inputResultReply = document.querySelector("#result-reply");
const inputResultQuestion = document.querySelector("#result-question");
const sendMessage = document.querySelector('#send-message');
const startDisplay = document.querySelector('#start-display');
const chatDisplay = document.querySelector('.chat-display');
const btnResetChat = document.querySelector('#btn-reset-chat');

const OPENAPI_API_KEY = "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";

/*
para fazer as classes funcionar é necessario criar uma logica
dentro de um unico container
*/

// send message by keypress
inputQuestion.addEventListener("keypress", (e) => {
	if (inputQuestion.value && e.key === "Enter") {
		setDisplay();
		SendQuestion();
	}
});

// send message by click event
sendMessage.addEventListener('click', () => {
	if (inputQuestion.value) {
		setDisplay();
		SendQuestion();
	}
})

//event to change initial screen for chat screen
const setDisplay = () => {
	startDisplay.classList.remove('setStartDisplay');
	startDisplay.classList.add('hiddenStartDisplay');

	//chatDisplay.classList.add('hiddenChatDisplay')
}

// reseting chat conversation
btnResetChat.onclick = () => {
	console.log(true)
	startDisplay.classList.remove('hiddenStartDisplay');
	startDisplay.classList.add('setStartDisplay');
}

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
			if (inputResultQuestion && inputResultReply) {
				inputResultQuestion.innerHTML += "\n"
				inputResultReply.innerHTML += "\n"
			}

			if (json.error && json.error.code === "invalid_api_key") {
				chatDisplay.innerHTML += `
					<div id="result-reply">
						<div class="reply">
							<div class="reply-content">
								<span>ChatGPT</span>
								<p>Chat GPT: Desculpe, sua chave inspirou!</p>
							</div>
						</div>
					</div>
				`;
				console.error(json.error.message);
			} else if (json.choices?.[0].text) {
				let text = json.choices[0].text || "Sem resposta";

				chatDisplay.innerHTML += `
					<div id="result-reply">
						<div class="reply">
							<div class="reply-content">
								<span>ChatGPT</span>
								<p>${text}</p>
							</div>
						</div>
					</div>
				`

				//localStorage.setItem('reply', text)
			}

			chatDisplay.scrollTop = chatDisplay.scrollHeight;
		})
		.catch((error) => console.error("Error:", error))
		.finally(() => {
			inputQuestion.value = "";
			inputQuestion.disabled = false;
			inputQuestion.focus();
		});

	chatDisplay.innerHTML += `
		<div id="result-question">
			<div class="question">
				<div class="question-content">
					<span>Eu</span>
					<p>${questionValue}</p>
				</div>
			</div>
		</div>
	`;
	inputQuestion.value = "Carregando...";
	inputQuestion.disabled = true;

	//localStorage.setItem('ask', questionValue)

	chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

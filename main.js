const apiKey = "YOUR_API_KEY"; // Use uma maneira segura de armazenar a chave

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const status = document.getElementById('status');
    const btnSubmit = document.getElementById('btn-submit');

    if (!messageInput.value) {
        messageInput.style.border = '1px solid red';
        return;
    }
    messageInput.style.border = 'none';

    status.style.display = 'block';
    status.innerHTML = 'Carregando...';
    btnSubmit.disabled = true;
    messageInput.disabled = true;

    fetch("https://api.openai.com/v1/completions", {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: messageInput.value,
            max_tokens: 2048,
            temperature: 0.5
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }
        return response.json();
    })
    .then(response => {
        const r = response.choices[0]?.text || "Resposta não disponível.";
        status.style.display = 'none';
        showHistory(messageInput.value, r);
    })
    .catch(error => {
        console.error(`Error -> ${error}`);
        status.innerHTML = 'Erro, tente novamente mais tarde...';
    })
    .finally(() => {
        btnSubmit.disabled = false;
        messageInput.disabled = false;
        messageInput.value = '';
    });
}

function showHistory(message, response) {
    const historyBox = document.getElementById('history');

    // Mensagem do usuário
    const boxMyMessage = document.createElement('div');
    boxMyMessage.className = 'box-my-message';
    boxMyMessage.innerHTML = `<p class='my-message'>${message}</p>`;
    historyBox.appendChild(boxMyMessage);

    // Resposta da API
    const boxResponseMessage = document.createElement('div');
    boxResponseMessage.className = 'box-response-message';
    boxResponseMessage.innerHTML = `<p class='response-message'>${response}</p>`;
    historyBox.appendChild(boxResponseMessage);

    // Rolagem para o final
    historyBox.scrollTop = historyBox.scrollHeight;
}

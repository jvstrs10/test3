const respostas = {
    "finanças": "Finanças é a gestão eficiente de recursos financeiros para indivíduos, empresas e governos, visando maximizar valor e segurança econômica.",
    "internet": "Para ganhar dinheiro online, explore áreas como criação de conteúdo (YouTube, blogs), vendas (e-commerce, dropshipping) e freelancing (design, escrita, programação). Plataformas como cursos, consultoria e investimentos digitais também são populares e rentáveis.",
    "empresa": "Para dar os primeiros passos com sua empresa, comece com um plano de negócios claro, defina seu público-alvo e registre legalmente o negócio. Em seguida, desenvolva sua marca, crie uma presença online e busque financiamento, se necessário.",
    "Muito obrigado": "De nada, estou aqui para te ajudar"
};


function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    addMessage("Você: " + userInput, "user-message");
    document.getElementById("user-input").value = "";

    
    const botResponse = chatbot(userInput.toLowerCase());
    addMessage("Chatbot: " + botResponse, "bot-message");
}

function chatbot(mensagem) {
    for (const palavra in respostas) {
        if (mensagem.includes(palavra)) {
            return respostas[palavra];
        }
    }
    return "Desculpe, não entendi. Poderia reformular?";
}

function addMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message " + className;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
}

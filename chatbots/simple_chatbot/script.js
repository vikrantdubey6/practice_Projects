document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Predefined responses 
    const responses = {
        "hello": "Hello there! How can I help you?",
        "hi": "Hi! What can I do for you today?",
        "how are you": "I'm just a simple bot, but I'm functioning well!",
        "what's your name": "I'm SimpleBot, your basic chatbot assistant.",
        "help": "I can respond to basic greetings and questions. Try saying 'hello' or 'what can you do?'",
        "what can you do": "I can answer simple questions and respond to greetings. I'm not very advanced!",
        "bye": "Goodbye! Have a great day!",
        "who is vikrant":`Vikrant is a Developer he built me.`,
        "who is vikrant":`Vikrant is a Developer he built me.`,
        "who built you":`Vikrant is a Developer he built me.`,
        "who made you":`Vikrant is a Developer he built me.`,
        "default": "I'm not sure how to respond to that. Try asking something simpler."

    };

    // Add a message to the chat
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Process user input and generate response
    function processInput() {
        const input = userInput.value.trim().toLowerCase();
        if (input === '') return;

        addMessage(input, true);
        userInput.value = '';

        // Check for matching responses
        let response = responses.default;
        for (const [key, value] of Object.entries(responses)) {
            if (input.includes(key)) {
                response = value;
                break;
            }
        }

        // Simulate typing delay
        setTimeout(() => {
            addMessage(response, false);
    }, 500);
    }

    // Event listeners
    sendButton.addEventListener('click', processInput);
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            processInput();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const optionButtons = document.querySelectorAll('#options button');

    // Predefined responses
    const responses = {
        "hi": "Hello there! How can I help you today?",
        "hello": "Hi! Nice to meet you!",
        "contact": "You can reach us at contact@example.com or call +1 (555) 123-4567",
        "about": "We are a friendly chatbot service helping customers since 2023!",
        "request": "We'll call you back shortly. Please provide your phone number.",
        "faq": "Here are frequently asked questions:\n1. How does this work?\n2. Is it free?\n3. Who made this?",
        "default": "I'm not sure how to respond to that. Try asking something else."
    };

    // Add click handlers to all option buttons
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            // Add user's selection as a message
            addMessage(buttonText, true);
            
            // Process the button selection
            processButtonSelection(buttonText.toLowerCase());
        });
    });

    // Function to handle button selections
    function processButtonSelection(selection) {
        let responseKey = selection;
        
        // Map button text to response keys
        const buttonMap = {
            "contact us": "contact",
            "about us": "about",
            "request a call": "request",
            "faq": "faq"
        };
        
        if (buttonMap[selection]) {
            responseKey = buttonMap[selection];
        }
        
        setTimeout(() => {
            addMessage(responses[responseKey] || responses.default, false);
        }, 500);
    }

    // Function to add a message to the chat
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to process user text input
    function processInput() {
        const input = userInput.value.trim().toLowerCase();
        if (input === '') return;

        addMessage(input, true);
        userInput.value = '';

        let response = responses.default;
        for (const [key, value] of Object.entries(responses)) {
            if (input.includes(key)) {
                response = value;
                break;
            }
        }

        setTimeout(() => {
            addMessage(response, false);
        }, 500);
    }

    // Event listeners for send button and Enter key
    sendButton.addEventListener('click', processInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processInput();
        }
    });
});
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
            addMessage(buttonText, true);
            processButtonSelection(buttonText.toLowerCase());
        });
    });

    // Function to handle button selections
    function processButtonSelection(selection) {
        let responseKey = selection;
        
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
            // Add feedback buttons after bot response
            addFeedbackButtons();
        }, 500);
    }

    // Function to add feedback buttons
    function addFeedbackButtons() {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback';
        feedbackDiv.innerHTML = `
            <button class="feedBtn">Problem solved</button>
            <button class="feedBtn">Not solved</button>
        `;
        chatMessages.appendChild(feedbackDiv);
        
        // Add event listeners to new feedback buttons
        feedbackDiv.querySelectorAll('.feedBtn').forEach(button => {
            button.addEventListener('click', function() {
                handleFeedback(this.textContent);
            });
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to handle feedback selection
    function handleFeedback(feedback) {
        if (feedback === "Problem solved") {
            // Close the chat with a thank you message
            addMessage("Thank you for using our chatbot! Goodbye!", false);
            setTimeout(() => {
                // Disable the chat interface
                userInput.disabled = true;
                sendButton.disabled = true;
                // Show restart button
                const restartDiv = document.createElement('div');
                restartDiv.className = 'restart-container';
                restartDiv.innerHTML = '<button id="restartBtn">Start New Chat</button>';
                chatMessages.appendChild(restartDiv);
                
                document.getElementById('restartBtn').addEventListener('click', restartChat);
            }, 500);
        } else {
            // Show the feedback form
            showFeedbackForm();
        }
    }

    // Function to show feedback form
    function showFeedbackForm() {
        const formDiv = document.createElement('div');
        formDiv.className = 'feedback-form';
        formDiv.innerHTML = `
            <h3>We're sorry we couldn't help. Please provide your details:</h3>
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" required>
                </div>
                <div class="form-group">
                    <label for="query">Your Query:</label>
                    <textarea id="query" required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        `;
        chatMessages.appendChild(formDiv);
        
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            submitFeedbackForm();
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to submit feedback form
    function submitFeedbackForm() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const query = document.getElementById('query').value;
        
        // Here you would typically send this data to a server
        console.log("Feedback submitted:", { name, phone, query });
        
        addMessage("Thank you for your feedback. We'll contact you soon.", false);
        name.value = ''
        phone.value = ''
        query.value = ''
        setTimeout(() => {
            // Disable the chat interface
            userInput.disabled = true;
            sendButton.disabled = true;
            // Show restart button
            const restartDiv = document.createElement('div');
            restartDiv.className = 'restart-container';
            restartDiv.innerHTML = '<button id="restartBtn">Start New Chat</button>';
            chatMessages.appendChild(restartDiv);
            
            document.getElementById('restartBtn').addEventListener('click', restartChat);
        }, 500);
    }

    // Function to restart the chat
    function restartChat() {
        // Clear all messages except the initial one
        chatMessages.innerHTML = `
            <div class="message bot-message">
                Hello! I'm a simple chatbot. How can I help you today?
            </div>
            <div id="options" class="options"> 
                <button id="optBtn">Contact us</button>
                <button id="optBtn">About Us</button>
                <button id="optBtn">Request a call</button>
                <button id="optBtn">FAQ</button>
            </div>
        `;
        
        // Re-enable the chat interface
        userInput.disabled = false;
        sendButton.disabled = false;
        
        // Reattach event listeners
        document.querySelectorAll('#options button').forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent;
                addMessage(buttonText, true);
                processButtonSelection(buttonText.toLowerCase());
            });
        });
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
            // Add feedback buttons after bot response
            addFeedbackButtons();
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
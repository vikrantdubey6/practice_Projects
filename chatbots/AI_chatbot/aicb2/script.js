document.addEventListener("DOMContentLoaded", function(){
const CB_icon = document.getElementById('chatbot-icon')
const CB_container = document.getElementById("chatbot-container")
const closeBtn = document.getElementById("close-btn")
const sendBtn = document.getElementById("send-btn")
const CB_messages = document.getElementById("chatbot-messages")
const CB_input = document.getElementById("chatbot-input")


CB_icon.addEventListener('click', function(){
    CB_container.classList.remove("hidden")
    CB_icon.style.display = 'none'  
});

closeBtn.addEventListener('click', function(){
        // CB_container.style.display = 'none'   // (also correct)
        CB_container.classList.add("hidden")  
        CB_icon.style.display = 'flex'
        });

sendBtn.addEventListener('click', sendMessage)

CB_input.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        sendMessage()
    }
});


function sendMessage(){
const userMessage = CB_input.value.trim();
if(userMessage){
    appendMessage('user', userMessage);
    CB_input.value = ''
    getBotResponse(userMessage)
}
}

function appendMessage(sender , message){
    const messageDiv = document.createElement('div')
    messageDiv.classList.add('message', sender)
    messageDiv.textContent = message;
    CB_messages.appendChild(messageDiv);
    CB_messages.scrollTop = CB_messages.scrollHeight
}

const apiKey = ''
const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

async function getBotResponse(userMessage) {
    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // The 'Authorization' header is not used for Gemini API key authentication
            },
            body: JSON.stringify({
                // The body structure is different for Gemini
                "contents": [{
                    "parts": [{
                        "text": userMessage
                    }]
                }],
                
                // Optional: Configuration for generation
                "generationConfig": {
                    "maxOutputTokens": 80, // Correct parameter name is maxOutputTokens
                    "temperature": 0.7,
                }
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.error.message}`);
        }

        const data = await response.json();

        // The response structure is also different
        // Check if there are candidates and parts before accessing them
        if (data.candidates && data.candidates.length > 0) {
            const botMessage = data.candidates[0].content.parts[0].text;
            appendMessage('bot', botMessage.trim());
        } else {
             // Handle cases where the model returns a response with no text (e.g., due to safety settings)
            appendMessage('bot', "I'm sorry, I couldn't generate a response for that.");
            console.log("No content generated:", data);
        }

    } catch (error) {
        console.error("Error fetching bot response:", error);
        appendMessage('bot', "Sorry, something went wrong. Please check the console for details.");
    }
}




})
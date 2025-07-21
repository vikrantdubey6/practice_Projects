document.addEventListener('DOMContentLoaded', function() {
const chatMessage = document.getElementById('chat-messages')
const userInput = document.getElementById('user-input')
const sendBtn = document.getElementById('send-button')
const replies = document.querySelectorAll('#options button')
const feedback = document.querySelectorAll('#feedback button')

const responses = {
    "hi":"hello, how may i help you?",
    "bye":"Bye have a nice day",
    "how are you":"My servers are doing fine, what about you?",
    "who are you":"I m chatBox made by Vikrant",
    "contact": "You can reach us at contact@example.com or call +1 (555) 123-4567",
        "about": "We are a friendly chatbot service helping customers since 2023!",
        "request": "We'll call you back shortly. Please provide your phone number.",
       "faq": "Here are frequently asked questions:\<br>\n1. How does this work?\<br>\n2. Is it free?\<br>\n3. Who made this?", 
    "default":"this is default msg" 
}
function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message')
    messageDiv.classList.add(isUser ? 'user-message': 'bot-message');
    messageDiv.innerHTML = message;
    chatMessage.appendChild(messageDiv);
    chatMessage.scrollTop = chatMessage.scrollHeight;
}

feedback.forEach(button =>{
    button.addEventListener('click', function(){
        const buttonText = this.textContent
        addMessage(buttonText,true)

        // feedbackSelection(button.textContent.toLowerCase())
    })
})

// function feedbackSelection(feedback){
//     let
// }


replies.forEach(button =>{
    button.addEventListener('click',function(){
        const buttonText = this.textContent
        addMessage(buttonText, true)

        procesButtonSelection(buttonText.toLowerCase())
    })
})

function procesButtonSelection(selection){

    let responseKey = selection
    const buttonMap = {
            "contact us": "contact",
            "about us": "about",
            "request a call": "request",
            "faq": "faq",
    }

if (buttonMap[selection]) {
    responseKey = buttonMap[selection]
}

setTimeout(function(){
    addMessage(responses[responseKey] || responses.default, false)
}, 500)

}

function processInput(){
    const input = userInput.value.trim().toLowerCase()
    if(input === '') return;
addMessage(input, true)
userInput.value = ''
let response = responses.default
for(const[key,value] of Object.entries(responses)){
    if (input.includes(key)){
        response = value
        break;
    }
}
setTimeout(() => {
    addMessage(response, false)},500)
}
sendBtn.addEventListener('click', processInput)
userInput.addEventListener('keydown',function(e){
    if(e.key === 'Enter'){
        processInput()
    }
})
})
 









const socket = io();

// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector(".container");
// let audio = new Audio("sound.mp3");

// const append = (message,position) =>{
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     // messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.appendChild(messageElement);
    
//     if(position === "left"){
//         audio.play();
//     }
// }
//  form.addEventListener('submit', (e)=>{
//      e.preventDefault();
//      const message = messageInput.value;
//      if(message != ''){
//         append(`You: ${message}`,'right');
//         socket.emit('send',message);
//         messageInput.value = '';
//      }
     
//  })
// const name = prompt("Enter your Name:")
// console.log(name);
// socket.emit('new-user-joined',name);

// socket.on('user-joined',name =>{
//     append(`${name} joined the chat`,'middle')
// })
// socket.on('receive',data =>{
//     append(`${data.name} : ${data.message}`,'left')
// })
// socket.on('left',name =>{
//     append(`One user left the chat`,'middle')
// })




const inputName = document.getElementById("name");
const chatBoxBtn = document.getElementById("showChatBtn");
const info = document.getElementById("info");
const submitBtn = document.getElementById("submitBtn");
const addNameBtn = document.getElementById("addNameBtn");
var name;
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".box");
const registrationBox = document.querySelector(".registration_box");
const container = document.querySelector(".container");
let audio = new Audio("sound.mp3");
messageContainer.style.display="none";
chatBoxBtn.style.display = "none"

addNameBtn.addEventListener("click",function(){
    name = inputName.value;
    console.log(name);
    inputName.value = ''
    inputName.style.display = "none";
    addNameBtn.style.display = "none";
    info.innerText = "Thanks " + name + " You can now Proceed"
    chatBoxBtn.style.display = ""
})

chatBoxBtn.addEventListener("click", function () {
    info.style.display = "none";
    chatBoxBtn.style.display = "none";
    registrationBox.style.display = "none"
    // submitBtn.style.display = false;
    messageContainer.style.display=""
    socket.emit('new-user-joined', name);

    socket.on('user-joined', name => {
        append(`${name} joined the chat`, 'middle')
    })
    socket.on('receive', data => {
        append(`${data.name} : ${data.message}`, 'left')
    })
    socket.on('left', name => {
        append(`${name} left the chat`, 'middle')
    })
})



const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    // messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.appendChild(messageElement);

    if (position === "left") {
        audio.play();
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message != '') {
        append(`${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    }

});

console.log(name);

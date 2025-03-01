const socket = io();
let username = "";

function setUsername() {
    const usernameInput = document.getElementById("username").value.trim();

    if (usernameInput) {
        username = usernameInput;
        socket.emit("set username", username);
        alert(`Username set to ${username}`);
    }
}

function sendMessage() {
    const messageInput = document.getElementById("message-input").value.trim();
    
    if (messageInput !== "" && username) {
        socket.emit("chat message", messageInput);
        messageInput.value = "";
    }

    if (!username) {
        alert("Please set your username first.");
    }
}

socket.on("chat message", (msg) => {
    const chatContainer = document.getElementById("chat-container");
    const messageBubble = document.createElement("div");
    
    const timeStamp = new Date();
    const formattedTime = timeStamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageBubble.classList.add("p-2", "rounded-lg", "max-w-xs", "shadow-md", "mb-2", "text-white");

    if (msg.startsWith("Bot:")) {
        // Display purple message on left side for API responses
        messageBubble.classList.add("bg-purple-500", "self-start");
    } else {
        // Display blue message on right side for user messages
        messageBubble.classList.add("bg-blue-500", "self-end");
    }

    messageBubble.textContent = msg;
    messageBubble.innerHTML = `<span class="text-xs text-white mr-1">${formattedTime}</span> ${msg}`;

    chatContainer.appendChild(messageBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

socket.on("user list", (userlist)=>{
    console.log("Active Users", userlist);
    const userListElement = document.getElementById("user-list");
    userListElement.innerHTML = "";

    userlist.forEach(user => {
        const p = document.createElement("p");
        p.innerHTML = user;
        userListElement.appendChild(p);
    });
});

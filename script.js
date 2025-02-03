// Array of images for random background
const images = [
    "bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg",
    "bg6.jpg", "bg7.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg"
];

// Set random background image on page load
document.body.style.backgroundImage = `url('${images[Math.floor(Math.random() * images.length)]}')`;

const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("user-input");

// Create a typing indicator element
const typingIndicator = document.createElement("div");
typingIndicator.classList.add("typing-indicator");
typingIndicator.innerText = "Chatbot is typing...";
typingIndicator.style.display = "none";
messagesDiv.appendChild(typingIndicator);

// Handle user input on pressing Enter
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let userText = userInput.value.trim();
        if (userText) {
            addMessage(userText, "user-message");
            userInput.value = "";

            // Show typing indicator while fetching response
            typingIndicator.style.display = "block";
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            fetch("http://localhost:5000/get-info", {  // Replace with your backend endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText }),
            })
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    typingIndicator.style.display = "none"; // Hide typing indicator

                    if (data.error) {
                        addMessage(data.error, "bot-message");
                    } else {
                        displayResponse(data);
                    }
                }, 1000); // Simulate a delay for natural typing effect
            })
            .catch(error => {
                typingIndicator.style.display = "none"; // Hide typing indicator on error
                addMessage("Error fetching data. Please try again.", "bot-message");
                console.error("Error:", error);
            });
        }
    }
});

// Function to add user or bot message
function addMessage(text, className) {
    let message = document.createElement("div");
    message.classList.add("message", className);

    // Convert **bold text** to <b>text</b>
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Convert new lines to <br> for proper line breaks
    text = text.replace(/\n/g, "<br>");

    message.innerHTML = text;  // Use innerHTML instead of innerText to support HTML elements
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Function to display chatbot response
function displayResponse(data) {
    let responseText = `📌 <b>Destination:</b> ${data.description}<br><br>`;

    if (data.places_to_visit && data.places_to_visit.length > 0) {
        responseText += "🏛 <b>Places to Visit:</b><br>";
        data.places_to_visit.forEach(place => {
            responseText += `- <b>${place.name}:</b> ${place.description}<br>`;
        });
        responseText += "<br>";
    }

    if (data.famous_foods && data.famous_foods.length > 0) {
        responseText += "🍽 <b>Foods to Try:</b><br>";
        data.famous_foods.forEach(food => {
            responseText += `- <b>${food.name}:</b> ${food.description}<br>`;
        });
        responseText += "<br>";
    }

    if (data.restaurants && data.restaurants.length > 0) {
        responseText += "🍴 <b>Famous Restaurants:</b><br>";
        data.restaurants.forEach(restaurant => {
            responseText += `- <b>${restaurant.name}:</b> ${restaurant.description} (Cuisine: ${restaurant.cuisine}, Rating: ${restaurant.rating}, Price: ${restaurant.price})<br>`;
        });
        responseText += "<br>";
    }

    if (data.hotels && data.hotels.length > 0) {
        responseText += "🏨 <b>Hotels to Stay:</b><br>";
        data.hotels.forEach(hotel => {
            responseText += `- <b>${hotel.name}:</b> ${hotel.description} (Rating: ${hotel.rating}, Price: ${hotel.price})<br>`;
        });
    }

    addMessage(responseText, "bot-message");
}

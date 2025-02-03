# Trip_Chatbot-Stacia-Corp.-
This project is a web-based Trip Planner Chatbot that helps users find information about various Indian cities, including places to visit, famous foods, restaurants, and hotels. It is built using Flask (Python) for the backend and HTML, CSS, and JavaScript for the frontend.  

Key Features
✅ Destination Recognition & Context Awareness

Users can enter a city name (e.g., "Goa"), and the chatbot will retrieve relevant travel details.
The chatbot remembers the current destination and provides context-aware responses (e.g., if the user asks for "hotels" without specifying a city, it will refer to the last mentioned destination).
✅ Structured Information Retrieval

Data is stored in a JSON file (trip_data.json), which includes information on:
🌍 Places to Visit (Name, Description)
🍛 Famous Foods (Name, Description)
🍽 Restaurants (Name, Cuisine, Rating, Price Range, Description)
🏨 Hotels (Name, Rating, Price Range, Description)
✅ Dynamic User Interaction

Users can ask for specific information (e.g., "Best restaurants in Chennai" or "Places to visit in Jaipur").
If a city is not specified, the bot refers to the current destination.
Users can change the city context anytime (e.g., "Show hotels in Mumbai").
✅ Flask Backend with Session Management

The chatbot stores the current destination in a Flask session, so users don't need to repeat the city name in every query.
The backend processes user requests, searches for relevant data, and returns a structured response.
✅ Engaging Frontend with Interactive UI

Users interact with the chatbot via a terminal-style chat interface.
Typing indicator creates a realistic delay to simulate human-like responses.
Random background images change on every page refresh for an engaging look.
Technology Stack
🔹 Backend: Flask (Python), JSON-based data storage
🔹 Frontend: HTML, CSS, JavaScript
🔹 Communication: Fetch API (AJAX requests to Flask backend)
🔹 Session Management: Flask session for tracking user preferences

How It Works
User enters a query (e.g., "Tell me about Delhi").
Flask backend retrieves the relevant data from trip_data.json.
Bot responds with structured information, formatted using HTML and CSS.
User can refine queries without re-entering the destination (e.g., "Show me famous foods").
This chatbot provides an intelligent, user-friendly, and interactive way to plan a trip while keeping the conversation smooth and contextual! 🚀

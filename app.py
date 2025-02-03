from flask import Flask, send_from_directory, jsonify, request, session
from flask_cors import CORS
import json
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Required for session management
CORS(app)  # Enable CORS for all routes

# Set the folder where static files are located (current directory)
app.config['STATIC_FOLDER'] = os.getcwd()

# Load city data once on startup
with open('trip_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

@app.route('/')
def index():
    # Serve the index.html file from the current directory
    return send_from_directory(app.config['STATIC_FOLDER'], 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    # Serve other static files (CSS, JS, etc.) from the current directory
    return send_from_directory(app.config['STATIC_FOLDER'], filename)

@app.route('/get-info', methods=['POST'])
def get_info():
    user_message = request.json.get('message', '').lower()
    response = {}

    # Check if the destination is already set in the session
    current_destination = session.get('destination', None)
    
    # Look for a match with any of the cities in the request message
    city = None
    if current_destination:
        city = current_destination
    else:
        for city_name in data.keys():
            if city_name.lower() in user_message:
                city = city_name
                session['destination'] = city  # Set the destination in session
                break

    if city:
        # Respond with city information
        city_data = data[city]
        response['description'] = f"Explore {city}, a vibrant destination with rich history and culture!"
        response['places_to_visit'] = [{'name': place['name'], 'description': place.get('description', 'N/A')} for place in city_data.get('places_to_visit', [])]
        response['famous_foods'] = [{'name': food['name'], 'description': food.get('description', 'N/A')} for food in city_data.get('famous_foods', [])]
        response['restaurants'] = [
            {'name': restaurant['name'], 'description': restaurant.get('description', 'N/A'), 'cuisine': restaurant.get('cuisine', 'N/A'), 'rating': restaurant.get('rating', 'N/A'), 'price': restaurant.get('price_range', 'N/A')}
            for restaurant in city_data.get('restaurants', [])
        ]
        response['hotels'] = [
            {'name': hotel['name'], 'description': hotel.get('description', 'N/A'), 'rating': hotel.get('rating', 'N/A'), 'price': hotel.get('price_range', 'N/A')}
            for hotel in city_data.get('hotels', [])
        ]
    else:
        response['error'] = "Sorry, I don't have information on that city."

    return jsonify(response)

@app.route('/set-destination', methods=['POST'])
def set_destination():
    user_message = request.json.get('message', '').lower()
    for city_name in data.keys():
        if city_name.lower() in user_message:
            session['destination'] = city_name  # Set the destination in session
            return jsonify({'message': f"Current destination set to {city_name}."})
    return jsonify({'error': "I couldn't find that city. Please try again."})

if __name__ == "__main__":
    app.run(debug=True)

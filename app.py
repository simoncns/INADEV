from math import nan
from flask import Flask, request, jsonify, render_template, redirect, url_for
import requests
from flask_cors import CORS
import pgeocode

app = Flask(__name__)
CORS(app)

# Routes the web app to the ain page automatically to begin with
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/weather', methods=['POST'])
def get_weather():
    data = request.get_json()  # Correctly retrieve data from JSON body
    zip_code = data.get('zipCode')  # Use .get to avoid KeyError if zipCode is not provided
    
    if not zip_code:
        return jsonify({'error': 'Zip code is required'}), 400  # Error if zip code is not provided
    
    lat, lon = coordinateCalculation(zip_code)  # Get coordinates based on zip code
    
    # Make sure lat and lon are valid
    if lat is None or lon is None:
        return jsonify({'error': 'Invalid zip code provided'}), 404
    
    if lat is nan or lon is nan:
        return jsonify({'error': 'Invalid zip code provided'}), 404
    
    # Open-Meteo API call using the coordinates
    api_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York"
    response = requests.get(api_url)

    if response.ok:
        weather_data = response.json()  # Parse the JSON response from Open-Meteo API
        return jsonify(weather_data)  # Return the weather data as JSON
    else:
        return jsonify({'error': 'Failed to fetch weather data'}), 500 # Returns an error code and message if there is an issue with the API call

if __name__ == '__main__':
    app.run(debug=True, port='0.0.0.0')

# Helper function to translate the ZIP Code to coordinates to use in the API call
def coordinateCalculation(zipCode):
    zip = int(zipCode)
    nomi = pgeocode.Nominatim('us')
    query = nomi.query_postal_code(zip)

    lat = query["latitude"]
    lon = query["longitude"]

    return lat, lon
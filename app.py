# from flask import Flask, render_template
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# @app.route('/')
# def home():
#     return render_template('index.html')

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0')

from flask import Flask, request, jsonify, render_template, redirect, url_for
import requests
from flask_cors import CORS
import pgeocode

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

# @app.route('/weather', methods=['POST'])
# def get_weather():
#     zip_code = request.args.get('zipCode')
#     print(zip_code)
#     lat, lon = coordinateCalculation(zip_code)
#     # Zip to coordinates
#     # api_url = f"https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBBtpUBPCusP7SosNq5iskU3ef7jLbj_T0&components=postal_code:22124"
#     # Put the correct call to the api to get the weather data
#     # api_url = f"https://api.open-meteo.com/v1/forecast?postal_code={zip_code}&country=US"
#     api_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch"
#     response = requests.get(api_url)
#     print(response.json())
#     return jsonify(response.json())

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
    
    # Open-Meteo API call using the obtained coordinates
    api_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch"
    
    response = requests.get(api_url)
    if response.ok:
        weather_data = response.json()  # Parse the JSON response from Open-Meteo
        return jsonify(weather_data)  # Return the weather data as JSON
    else:
        return jsonify({'error': 'Failed to fetch weather data'}), 500

# @app.route('/get-coordinates', methods=["GET", "POST"])
# def get_coordinates():
#     data = request.get_json()
#     zip_code = data['zip']
#     # Here, you would add the logic to convert the zip code to coordinates
#     # For now, let's just return the received zip code as a JSON
#     print(zip_code)
#     return jsonify({'zip': zip_code})

@app.route('/get-coordinates', methods=["GET", "POST"])
def get_coordinates():
    if request.method == "POST":
        data = request.get_json()
        zip_code = data['zip']
    else:  # GET request
        zip_code = request.args.get('zip')
    
    lat, lon = coordinateCalculation(zip_code)
    return jsonify({'lat': lat,
                    'lon': lon})

if __name__ == '__main__':
    app.run(debug=True, port='0.0.0.0')


def coordinateCalculation(zipCode):
    zip = int(zipCode)
    nomi = pgeocode.Nominatim('us')
    query = nomi.query_postal_code(zip)

    # data = {
    #     "lat": query["latitude"],
    #     "lon": query["longitude"]
    # }
    lat = query["latitude"]
    lon = query["longitude"]

    return lat, lon
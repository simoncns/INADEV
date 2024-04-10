document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const zipCode = document.getElementById('zip').value;
        console.log(zipCode);

        const url = 'http://localhost:5000/get-coordinates?zip=' + encodeURIComponent(zipCode);

        // console.log(url);

        // fetch('/get-coordinates', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ zip: zipCode })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Coordinates:', data);
        //     // Handle the response data here
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        //     // Handle errors here
        // });

        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Coordinates:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        fetch('/get-coordinates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ zip: zipCode })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            console.log('Coordinates:', data);
            // Example of handling the response data:
            // Update the DOM or trigger further actions based on the received coordinates
            document.getElementById('results').textContent = `Latitude: ${data.lat}, Longitude: ${data.lon}`;
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here, such as displaying a message to the user
        });

        fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ zipCode: zipCode })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Weather Data:', data);
            // Assuming 'data' contains a 'current_weather' object with 'temperature', 'windspeed', etc.
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = `Temperature: ${data.current.temperature_2m}°F`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weatherResult').textContent = 'Failed to fetch weather data';
        });

        // fetch('/weather', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ latitude: lat, longitude: lon }) // Assuming lat and lon are variables holding coordinates
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Weather Data:', data);
        //     // Handle the weather data here
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        //     // Handle errors from the `/weather` call here
        // });
        
    });
});
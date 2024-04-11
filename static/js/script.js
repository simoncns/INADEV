// Pull the ZIP Code given by the user
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;


    // Fetch call to the backend to get the JSON of helpful information from the API call
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

        // Assign all of the useful JSON values
        const maxTemp = data.daily.temperature_2m_max[0];
        const minTemp = data.daily.temperature_2m_min[0];
        const sunrise = data.daily.sunrise[0];
        const sunset = data.daily.sunset[0];
        const uvIndex = data.daily.uv_index_max[0]; 
        const weatherResult = document.getElementById('weatherResult');
        
        // Update the front-end with the results of the API call
        weatherResult.innerHTML = `
        <img src="/static/images/temp.png" alt="Temperature Icon" width="20" height="20"><strong>Current Temperature:</strong> ${data.current.temperature_2m}°F<br>
        <img src="/static/images/hot.png" alt="High Temperature Icon" width="20" height="20"><strong>High Temperature:</strong> ${maxTemp}°F<br>
        <img src="/static/images/cold.png" alt="Low Temperature Icon" width="20" height="20"><strong>Low Temperature:</strong> ${minTemp}°F<br>
        <img src="/static/images/sunrise.png" alt="Sunrise" width="20" height="20"><strong>Sunrise:</strong> ${formatTime(sunrise)}<br>
        <img src="/static/images/sunset.png" alt="Sunset" width="20" height="20"><strong>Sunset:</strong> ${formatTime(sunset)}<br>
        <img src="/static/images/uv-index.png" alt="UV Index" width="20" height="20"><strong>UV Index:</strong> ${uvIndex}
    `
    })
    // Error message given if the ZIP code is not valid
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('weatherResult').textContent = 'Invalid ZIP Code';
    });

    function formatTime(time) {
        // Create a date object using the ISO string
        const date = new Date(time);
    
        // Extract hours and minutes
        var hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        if (hours >= 12) {
            if (hours > 12) {
                hours = hours - 12;
            }
            return `${hours}:${minutes} PM`;
        } else {
            return `${hours}:${minutes} AM`;
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const zipCode = document.getElementById('zip').value;
        console.log(zipCode);

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

            const maxTemp = data.daily.temperature_2m_max[0];
            const minTemp = data.daily.temperature_2m_min[0];
            const sunrise = data.daily.sunrise[0];
            const sunset = data.daily.sunset[0];

            const weatherResult = document.getElementById('weatherResult');
            // weatherResult.innerHTML = `Temperature: ${data.current.temperature_2m}°F`;
            weatherResult.innerHTML = `
            <strong>Current Temperature:</strong> ${data.current.temperature_2m}°F<br>
            <strong>Max Temperature:</strong> ${maxTemp}°F<br>
            <strong>Min Temperature:</strong> ${minTemp}°F<br>
            <strong>Sunrise:</strong> ${formatTime(sunrise)}<br>
            <strong>Sunset:</strong> ${formatTime(sunset)}
        `
        })
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
        
            if (hours > 11) {
                hours = hours - 12;
                return `${hours}:${minutes} PM`;
            } else {
                return `${hours}:${minutes} AM`;
            }
        }
    });
});
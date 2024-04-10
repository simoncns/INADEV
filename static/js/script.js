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

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Coordinates:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
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
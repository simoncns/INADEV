document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const zipCode = document.getElementById('zip').value;
        console.log(zipCode);

        const url = 'http://localhost:5000/weather?zip=' + zipCode;

        console.log(url);

    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const zipCode = document.getElementById('zip').value;
        console.log('Zip Code:', zipCode);
    });
});
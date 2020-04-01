// this script will be run on the client side
console.log('client side');

paragraph1 = document.querySelector('#paragraph1');
paragraph2 = document.querySelector('#paragraph2');

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    paragraph1.textContent = 'Loading...';
    paragraph2.textContent = '';

    const address = document.querySelector('input').value;

    fetch(`${window.location.origin}/weatherapp?address=${encodeURI(address)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error)
                paragraph1.textContent = data.error;
            else {
                paragraph1.textContent = data.location;
                paragraph2.textContent = data.forecast;
            }
        });
});


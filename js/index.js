const peopleLink = document.getElementById('people-link');
const planetsLink = document.getElementById('planets-link');
const shipsLink = document.getElementById('ships-link');
const contentDiv = document.getElementById('content');

const apiBaseURL = 'https://swapi.tech/api/';

let dataType = 'people';

peopleLink.addEventListener('click', () => changeDataType('people'));
planetsLink.addEventListener('click', () => changeDataType('planets'));
shipsLink.addEventListener('click', () => changeDataType('starships'));

function changeDataType(type) {
    dataType = type;
    fetchData(dataType);
}

function fetchData(type) {
    contentDiv.innerHTML = '';

    fetch(`${apiBaseURL}${type}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                displayData(data);
            } else {
                displayError("No data available!");
            }
        })
        .catch(() => displayError("An error occurred while fetching the data."));
}

// Function to display the data in cards
function displayData(data) {
    data.results.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h3>${item.name}</h3>`;
        contentDiv.appendChild(card);
    });
}

function displayError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error');
    errorMessage.textContent = message;
    contentDiv.appendChild(errorMessage);
}
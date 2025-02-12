const apiBaseURL = 'https://swapi.dev/api/';
let currentPage = 1;
const pageSize = 10;
let currentDataType = 'people';

const contentDiv = document.getElementById('content');
const paginationControls = document.getElementById('pagination-controls');
const peopleLink = document.getElementById('people-link');
const planetsLink = document.getElementById('planets-link');
const starshipsLink = document.getElementById('starships-link');

peopleLink.addEventListener('click', () => {
    updateActiveLink(peopleLink);
    changeDataType('people');
    fetchData();
});
planetsLink.addEventListener('click', () => {
    updateActiveLink(planetsLink);
    changeDataType('planets');
    fetchData();
});
starshipsLink.addEventListener('click', () => {
    updateActiveLink(starshipsLink);
    changeDataType('starships');
    fetchData();
});

function changeDataType(type) {
    currentDataType = type;
    currentPage = 1;
}

function fetchData() {
    contentDiv.innerHTML = '';
    paginationControls.innerHTML = '';

    const url = `${apiBaseURL}${currentDataType}/?page=${currentPage}&limit=${pageSize}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results) {
                displayData(data.results);
                setupPagination(data.count);
            } else {
                displayError("No data available.");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            displayError("An error occurred while fetching data.");
        });
}

function displayData(items) {
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        let details = `<h3>${item.name}</h3>`;

        if (currentDataType === 'people') {
            details += `
                <p><strong>Height:</strong> ${item.height} cm</p>
                <p><strong>Mass:</strong> ${item.mass} kg</p>
                <p><strong>Gender:</strong> ${item.gender}</p>
            `;
        } else if (currentDataType === 'planets') {
            details += `
                <p><strong>Climate:</strong> ${item.climate}</p>
                <p><strong>Population:</strong> ${item.population}</p>
                <p><strong>Terrain:</strong> ${item.terrain}</p>
            `;
        } else if (currentDataType === 'starships') {
            details += `
                <p><strong>Model:</strong> ${item.model}</p>
                <p><strong>Manufacturer:</strong> ${item.manufacturer}</p>
                <p><strong>Cost in Credits:</strong> ${item.cost_in_credits}</p>
            `;
        }

        card.innerHTML = details;
        contentDiv.appendChild(card);
    });
}

function setupPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            currentPage--;
            fetchData();
        });
        paginationControls.appendChild(prevButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            currentPage++;
            fetchData();
        });
        paginationControls.appendChild(nextButton);
    }
}

function displayError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error');
    errorMessage.textContent = message;
    contentDiv.appendChild(errorMessage);
}

function updateActiveLink(link) {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => link.classList.remove('active'));

    link.classList.add('active');
}
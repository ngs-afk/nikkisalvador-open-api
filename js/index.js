const githubUsername = 'ngs-afk';

fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(repositories => {
        if (repositories.length === 0) {
            console.log('No repositories found.');
            alert('Oops! It looks like there are no repositories available in this Github account.');
        } else {
            console.log('Repositories:', repositories);
            const projectSection = document.getElementById('Projects');
            const projectList = projectSection.querySelector('ul');

            for (let i = 0; i < repositories.length; i++) {
                const repository = repositories[i];
                const project = document.createElement('li');
                project.innerText = repository.name;
                projectList.appendChild(project);
            }
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Sorry, something went wrong while fetching the repositories. Please try again later.');
    });
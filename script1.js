const developerList = document.getElementById('developer-list');
const searchInput = document.getElementById('name-search');
const designationFilter = document.getElementById('designation-filter');
let developers = [];

// Render developers list
function renderDevelopers(developers) {
  developerList.innerHTML = '';

  developers.forEach(developer => {
    const card = document.createElement('div');
    card.classList.add('developer-card');

    const name = document.createElement('h3');
    name.textContent = developer.name;
    card.appendChild(name);

    const designation = document.createElement('p');
    designation.textContent = `Designation: ${developer.designation}`;
    card.appendChild(designation);

    const skills = document.createElement('p');
    skills.textContent = `Skills: ${developer.skills.join(', ')}`;
    card.appendChild(skills);

    if (developer.projects) {
      const projects = document.createElement('div');
      projects.classList.add('projects');

      developer.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        const projectName = document.createElement('h4');
        projectName.textContent = `Project: ${project.name}`;
        projectCard.appendChild(projectName);

        const projectDescription = document.createElement('p');
        projectDescription.textContent = `Description: ${project.description}`;
        projectCard.appendChild(projectDescription);

        const teamMembers = document.createElement('p');
        teamMembers.textContent = `Team Members: ${project.team.map(member => member.name).join(', ')}`;
        projectCard.appendChild(teamMembers);

        const tasks = document.createElement('ul');
        tasks.classList.add('tasks');

        project.tasks.forEach(task => {
          const taskItem = document.createElement('li');
          taskItem.textContent = `Task ${task.id}: ${task.name} (${task.status || 'N/A'})`;
          tasks.appendChild(taskItem);
        });

        projectCard.appendChild(tasks);
        projects.appendChild(projectCard);
      });

      card.appendChild(projects);
    }

    developerList.appendChild(card);
  });
}


// Search developers by name
function searchByName() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredDevelopers = developers.filter(developer =>
    developer.name && developer.name.toLowerCase().includes(searchTerm)
  );
  renderDevelopers(filteredDevelopers);
}

// Filter developers by designation
function filterByDesignation() {
  const selectedDesignation = designationFilter.value;
  if (selectedDesignation === '') {
    renderDevelopers(developers);
  } else {
    const filteredDevelopers = developers.filter(developer =>
      developer.designation === selectedDesignation
    );
    renderDevelopers(filteredDevelopers);
  }
}

// Event listener for search input
searchInput.addEventListener('input', searchByName);

// Fetch JSON data from the file
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data.employees)) {
      throw new Error('Data is not in the expected format');
    }
    developers = data.employees;
    renderDevelopers(developers);
    
    // Event listener for designation filter
    designationFilter.addEventListener('change', filterByDesignation);
  })
  .catch(error => console.error('Error fetching JSON data:', error));


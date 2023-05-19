const developerList = document.getElementById('developer-list');
const searchInput = document.getElementById('name-search');
const designationFilter = document.getElementById('designation-filter');
let developers = [];

// Local copy of the JSON data
const jsonData = [
  {
    "name": "John Doe",
    "designation": "Frontend Developer",
    "skills": ["HTML", "CSS", "JavaScript"]
  },
  {
    "name": "Jane Smith",
    "designation": "Backend Developer",
    "skills": ["Python", "Java", "SQL"]
  },
 
];


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

    developerList.appendChild(card);
  });
}

function searchByName() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredDevelopers = developers.filter(developer =>
    developer.name.toLowerCase().includes(searchTerm)
  );
  renderDevelopers(filteredDevelopers);
}

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

developers = jsonData;
renderDevelopers(developers);

searchInput.addEventListener('input', searchByName);

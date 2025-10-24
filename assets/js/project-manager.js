// Project Manager - Easy way to add/remove projects
class ProjectManager {
  constructor() {
    this.projects = [];
    this.loadProjects();
  }

  async loadProjects() {
    try {
      const response = await fetch('./assets/data/projects.json');
      const data = await response.json();
      this.projects = data.projects;
      this.renderProjects();
      
      // Initialize filtering after projects are loaded
      this.initializeFiltering();
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  renderProjects() {
    const projectList = document.querySelector('.project-list');
    if (!projectList) return;

    // Clear existing projects
    projectList.innerHTML = '';

    // Render each project
    this.projects.forEach(project => {
      const projectElement = this.createProjectElement(project);
      projectList.appendChild(projectElement);
    });

    // Re-initialize project links after rendering
    this.initializeProjectLinks();
  }

  createProjectElement(project) {
    const li = document.createElement('li');
    li.className = `project-item active`;
    li.setAttribute('data-filter-item', '');
    li.setAttribute('data-category', project.category.toLowerCase());
    li.setAttribute('data-project-title', project.title);
    li.setAttribute('data-project-category', project.category);
    li.setAttribute('data-project-description', project.description);
    li.setAttribute('data-project-image', project.image);
    li.setAttribute('data-project-images', project.images.join(','));
    li.setAttribute('data-project-github', project.github || '');
    li.setAttribute('data-project-live', project.live || '');
    li.setAttribute('data-project-technologies', project.technologies ? project.technologies.join(',') : '');

    li.innerHTML = `
      <div class="project-link" data-project-link>
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </figure>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-category">${project.category}</p>
      </div>
    `;

    return li;
  }

  initializeProjectLinks() {
    // Re-initialize the project navigation functionality
    const projectLinks = document.querySelectorAll("[data-project-link]");

    projectLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const projectItem = this.closest(".project-item");
        if (typeof showProjectDetail === 'function') {
          showProjectDetail(projectItem);
        }
      });
    });
  }

  initializeFiltering() {
    // Initialize the filtering system that already exists in the main script
    const filterItems = document.querySelectorAll("[data-filter-item]");
    const filterButtons = document.querySelectorAll("[data-filter-btn]");

    if (filterButtons.length > 0) {
      // Add click event listeners to filter buttons
      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          const filterValue = button.getAttribute("data-filter-btn");
          
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");
          
          // Filter projects
          this.filterProjects(filterValue);
        });
      });
    }
  }

  filterProjects(filterValue) {
    const filterItems = document.querySelectorAll("[data-filter-item]");
    
    filterItems.forEach(item => {
      if (filterValue === "all") {
        item.classList.add("active");
      } else {
        const category = item.getAttribute("data-category");
        if (category === filterValue) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      }
    });
  }

  // Method to add a new project
  addProject(projectData) {
    this.projects.push(projectData);
    this.renderProjects();
  }

  // Method to remove a project
  removeProject(projectId) {
    this.projects = this.projects.filter(project => project.id !== projectId);
    this.renderProjects();
  }

  // Method to update a project
  updateProject(projectId, updatedData) {
    const index = this.projects.findIndex(project => project.id === projectId);
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...updatedData };
      this.renderProjects();
    }
  }
}

// Initialize the project manager when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for the main script to load first
  setTimeout(() => {
    window.projectManager = new ProjectManager();
  }, 100);
});

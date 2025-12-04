'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.getAttribute("data-filter-value") || this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    
    // Use project manager filtering if available, otherwise use original filtering
    if (window.projectManager) {
      window.projectManager.filterProjects(selectedValue);
    } else {
      filterFunc(selectedValue);
    }

  });
}

// Also add touch events for better iOS support
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("touchend", function (e) {
    e.preventDefault();
    let selectedValue = this.getAttribute("data-filter-value") || this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    
    // Use project manager filtering if available, otherwise use original filtering
    if (window.projectManager) {
      window.projectManager.filterProjects(selectedValue);
    } else {
      filterFunc(selectedValue);
    }
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}







// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// portfolio navigation variables (moved up for access in navigation)
const portfolioGrid = document.querySelector("[data-portfolio-grid]");
const projectDetail = document.querySelector("[data-project-detail]");

// portfolio functions (moved up for access in navigation)
const showPortfolioGrid = function () {
  // Hide detail view and show grid view
  projectDetail.classList.remove("active");
  portfolioGrid.classList.remove("hidden");
};

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    // Special handling for projects page
    if (targetPage === "projects") {
      // If we're currently in project detail view, go back to projects grid
      if (projectDetail && projectDetail.classList.contains("active")) {
        showPortfolioGrid();
        return;
      }
    }

    for (let i = 0; i < pages.length; i++) {
      if (targetPage === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Avatar click navigation to About page
const avatarLink = document.querySelector("[data-avatar-link]");
if (avatarLink) {
  avatarLink.addEventListener("click", function () {
    // Find and click the About navigation button
    const aboutNavLink = Array.from(navigationLinks).find(link => 
      link.textContent.trim().toLowerCase() === "about"
    );
    if (aboutNavLink) {
      aboutNavLink.click();
    }
  });
}

// portfolio navigation variables (duplicates removed)
const projectLinks = document.querySelectorAll("[data-project-link]");
const backToPortfolioBtn = document.querySelector("[data-back-to-portfolio]");
const portfolioNavLink = Array.from(document.querySelectorAll('button[data-nav-link]')).find(btn => btn.textContent.trim() === 'Projects');

// gallery navigation variables
const prevBtn = document.querySelector("[data-gallery-prev]");
const nextBtn = document.querySelector("[data-gallery-next]");

// current project data
let currentProjectImages = [];
let currentImageIndex = 0;

// Function to update project media (image or video)
const updateProjectMedia = function (mediaSrc, altText) {
  const mediaContainer = document.querySelector(".project-main-image");
  const isVideo = mediaSrc.toLowerCase().endsWith('.webm') || mediaSrc.toLowerCase().endsWith('.mp4');
  
  if (isVideo) {
    // Create video element
    const video = document.createElement('video');
    video.src = mediaSrc;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.display = 'block';
    video.style.objectFit = 'cover';
    video.style.objectPosition = 'top';
    
    // Clear container and add video
    mediaContainer.innerHTML = '';
    mediaContainer.appendChild(video);
  } else {
    // Create image element
    const img = document.createElement('img');
    img.src = mediaSrc;
    img.alt = altText;
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    
    // Clear container and add image
    mediaContainer.innerHTML = '';
    mediaContainer.appendChild(img);
  }
};

// portfolio navigation function
const showProjectDetail = function (projectItem) {
  // Get project data
  const title = projectItem.getAttribute("data-project-title");
  const category = projectItem.getAttribute("data-project-category");
  const description = projectItem.getAttribute("data-project-description");
  const image = projectItem.getAttribute("data-project-image");
  const github = projectItem.getAttribute("data-project-github");
  const live = projectItem.getAttribute("data-project-live");
  const technologies = projectItem.getAttribute("data-project-technologies");
  const images = projectItem.getAttribute("data-project-images");

  console.log("Showing project detail for:", title); // Debug log

  // Parse images (comma-separated string)
  currentProjectImages = images ? images.split(',').map(img => img.trim()) : [image];
  currentImageIndex = 0;

  // Update detail view content
  updateProjectMedia(currentProjectImages[currentImageIndex], title);
  document.querySelector("[data-detail-project-title]").textContent = title;
  document.querySelector("[data-detail-project-category]").textContent = category;
  document.querySelector("[data-detail-project-description]").textContent = description;
  
  // Handle GitHub link
  const githubBtn = document.querySelector("[data-detail-project-github]");
  if (github && github !== '' && github !== '#') {
    githubBtn.href = github;
    githubBtn.style.display = 'inline-flex';
  } else {
    githubBtn.style.display = 'none';
  }
  
  // Handle Live link
  const liveBtn = document.querySelector("[data-detail-project-live]");
  if (live && live !== '' && live !== '#') {
    liveBtn.href = live;
    liveBtn.style.display = 'inline-flex';
  } else {
    liveBtn.style.display = 'none';
  }

  // Handle title visibility and text - hide if no buttons are visible
  const linksSectionTitle = document.querySelector('.project-detail-links-section h4');
  const hasGithub = github && github !== '' && github !== '#';
  const hasLive = live && live !== '' && live !== '#';
  
  if (hasGithub && hasLive) {
    linksSectionTitle.textContent = 'Github & Live Demo';
    linksSectionTitle.style.display = 'block';
  } else if (hasGithub && !hasLive) {
    linksSectionTitle.textContent = 'Github';
    linksSectionTitle.style.display = 'block';
  } else if (!hasGithub && hasLive) {
    linksSectionTitle.textContent = 'Live Demo';
    linksSectionTitle.style.display = 'block';
  } else {
    linksSectionTitle.style.display = 'none';
  }

  // Handle Technologies
  const techContainer = document.querySelector("[data-detail-project-technologies]");
  if (technologies && technologies !== '') {
    const techList = technologies.split(',').map(tech => tech.trim());
    
    // Technology to icon mapping
    const techIcons = {
      'JavaScript': 'bx bxl-javascript',
      'React': 'bx bxl-react',
      'React Native': 'bx bxl-react',
      'Node.js': 'bx bxl-nodejs',
      'Python': 'bx bxl-python',
      'SQL': 'bx bx-data',
      'Supabase': 'bx bx-server',
      'Git': 'bx bxl-git',
      'HTML': 'bx bxl-html5',
      'CSS': 'bx bxl-css3',
      'TypeScript': 'bx bxl-typescript',
      'Figma': 'bx bxl-figma',
      'UI/UX Design': 'bx bx-palette',
      'Web Design': 'bx bx-palette',
      'Responsive Design': 'bx bx-mobile-alt',
      'API': 'bx bx-code-alt',
      'Typescrips': 'bx bxl-typescript', // Fix typo in your JSON
      'CSS': 'bx bxl-css3',
      'JavaScript': 'bx bxl-javascript'
    };
    
    techContainer.innerHTML = techList.map(tech => {
      const iconClass = techIcons[tech] || 'bx bx-code-alt'; // Default icon for unknown tech
      return `<span class="tech-item"><i class="${iconClass}"></i> ${tech}</span>`;
    }).join('');
  } else {
    techContainer.innerHTML = '';
  }


  // Update navigation buttons state
  updateGalleryButtons();

  // Hide grid view and show detail view
  portfolioGrid.classList.add("hidden");
  projectDetail.classList.add("active");
  
  console.log("Grid hidden:", portfolioGrid.classList.contains("hidden")); // Debug log
  console.log("Detail active:", projectDetail.classList.contains("active")); // Debug log
};

// Gallery navigation functions
const updateGalleryButtons = function () {
  // Hide buttons if there's only one image/video
  if (currentProjectImages.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
  }
};

const showNextImage = function () {
  currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
  updateProjectMedia(currentProjectImages[currentImageIndex], document.querySelector("[data-detail-project-title]").textContent);
  updateGalleryButtons();
};

const showPrevImage = function () {
  currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
  updateProjectMedia(currentProjectImages[currentImageIndex], document.querySelector("[data-detail-project-title]").textContent);
  updateGalleryButtons();
};

// add click event to all project links
for (let i = 0; i < projectLinks.length; i++) {
  projectLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    const projectItem = this.closest(".project-item");
    showProjectDetail(projectItem);
  });
}

// back to portfolio button
backToPortfolioBtn.addEventListener("click", function (e) {
  e.preventDefault();
  showPortfolioGrid();
});

// portfolio navigation link in header
if (portfolioNavLink) {
  portfolioNavLink.addEventListener("click", function (e) {
    e.preventDefault();
    showPortfolioGrid();
  });
}

// gallery navigation buttons
prevBtn.addEventListener("click", function (e) {
  e.preventDefault();
  showPrevImage();
});

nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  showNextImage();
});

// iOS-specific touch handling for navigation buttons
prevBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  showPrevImage();
  // Force blur to remove iOS touch highlight
  this.blur();
});

nextBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  showNextImage();
  // Force blur to remove iOS touch highlight
  this.blur();
});

// keyboard navigation for gallery
document.addEventListener("keydown", function (e) {
  if (projectDetail.classList.contains("active")) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      showNextImage();
    } else if (e.key === "Escape") {
      e.preventDefault();
      showPortfolioGrid();
    }
  }
});

// contact form handling
const contactForm = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Initialize EmailJS
(function() {
  // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
  emailjs.init("kbyhHJzM8F1SCB2uk");
})();

// Security: HTML escaping function to prevent XSS
const escapeHtml = function(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Security: Sanitize input by removing dangerous characters and limiting length
const sanitizeInput = function(input, maxLength = 1000) {
  if (!input) return '';
  
  // Trim whitespace
  let sanitized = input.trim();
  
  // Limit length to prevent DoS
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  // Remove newlines and carriage returns to prevent email header injection
  sanitized = sanitized.replace(/[\r\n]/g, ' ');
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');
  
  return sanitized;
};

// Security: Validate and sanitize email address
const sanitizeEmail = function(email) {
  if (!email) return '';
  
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Trim and lowercase
  let sanitized = email.trim().toLowerCase();
  
  // Remove newlines and carriage returns (email header injection prevention)
  sanitized = sanitized.replace(/[\r\n]/g, '');
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');
  
  // Limit length
  if (sanitized.length > 254) {
    sanitized = sanitized.substring(0, 254);
  }
  
  // Validate format
  if (!emailRegex.test(sanitized)) {
    return '';
  }
  
  return sanitized;
};

if (contactForm) {
  // form validation with length checks
  const formValidation = function () {
    let isValid = true;
    
    formInputs.forEach(input => {
      const value = input.value.trim();
      
      // Check if empty
      if (value === '') {
        isValid = false;
        return;
      }
      
      // Check length limits
      if (input.name === 'fullname' && value.length > 100) {
        isValid = false;
        return;
      }
      
      if (input.name === 'email') {
        const sanitizedEmail = sanitizeEmail(value);
        if (!sanitizedEmail || sanitizedEmail !== value.toLowerCase().trim()) {
          isValid = false;
          return;
        }
      }
      
      if (input.name === 'message' && value.length > 5000) {
        isValid = false;
        return;
      }
    });
    
    formBtn.disabled = !isValid;
  };

  // add validation to all inputs
  formInputs.forEach(input => {
    input.addEventListener('input', formValidation);
  });

  // form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Get and sanitize form data
    const formData = new FormData(contactForm);
    
    // Sanitize all inputs
    const fullname = sanitizeInput(formData.get('fullname'), 100);
    const email = sanitizeEmail(formData.get('email'));
    const message = sanitizeInput(formData.get('message'), 5000);
    
    // Validate required fields after sanitization
    if (!fullname || !email || !message) {
      showErrorMessage('Please fill in all fields with valid data.');
      return;
    }
    
    const templateParams = {
      from_name: fullname,
      email: email,
      message: message,
      time: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };
    
    // Show loading state
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    formBtn.disabled = true;
    
    // Send email using EmailJS
    // Replace 'service_9dzhekk' with your new Gmail service ID
    emailjs.send('service_9dzhekk', 'template_b7ila3j', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showSuccessMessage(fullname);
        contactForm.reset();
        formBtn.innerHTML = '<ion-icon name="send"></ion-icon><span>Send Message</span>';
        formBtn.disabled = true;
      }, function(error) {
        console.error('EmailJS Error:', error);
        console.log('Error details:', {
          status: error.status,
          text: error.text,
          details: error
        });
        showErrorMessage();
        formBtn.innerHTML = '<ion-icon name="send"></ion-icon><span>Send Message</span>';
        formBtn.disabled = false;
      });
  });
}

// success message function - FIXED: Uses textContent to prevent XSS
const showSuccessMessage = function (name) {
  // Create success message element
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  
  // Create content structure safely
  const content = document.createElement('div');
  content.className = 'success-content';
  
  // Create icon
  const icon = document.createElement('ion-icon');
  icon.setAttribute('name', 'checkmark-circle');
  
  // Create heading
  const heading = document.createElement('h4');
  heading.textContent = 'Message Sent Successfully!';
  
  // Create paragraph with escaped name
  const paragraph = document.createElement('p');
  paragraph.textContent = `Thank you ${escapeHtml(name)}! I'll get back to you as soon as possible.`;
  
  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'success-close';
  closeBtn.addEventListener('click', function() {
    successMessage.remove();
  });
  
  const closeIcon = document.createElement('ion-icon');
  closeIcon.setAttribute('name', 'close');
  closeBtn.appendChild(closeIcon);
  
  // Assemble content
  content.appendChild(icon);
  content.appendChild(heading);
  content.appendChild(paragraph);
  content.appendChild(closeBtn);
  successMessage.appendChild(content);
  
  // Add to body
  document.body.appendChild(successMessage);
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (successMessage.parentElement) {
      successMessage.remove();
    }
  }, 5000);
};

// error message function - FIXED: Uses textContent to prevent XSS
const showErrorMessage = function (customMessage) {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  
  // Create content structure safely
  const content = document.createElement('div');
  content.className = 'error-content';
  
  // Create icon
  const icon = document.createElement('ion-icon');
  icon.setAttribute('name', 'close-circle');
  
  // Create heading
  const heading = document.createElement('h4');
  heading.textContent = 'Message Failed to Send';
  
  // Create paragraph
  const paragraph = document.createElement('p');
  paragraph.textContent = customMessage || 'Sorry, there was an error sending your message. Please try again or contact me directly.';
  
  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'error-close';
  closeBtn.addEventListener('click', function() {
    errorMessage.remove();
  });
  
  const closeIcon = document.createElement('ion-icon');
  closeIcon.setAttribute('name', 'close');
  closeBtn.appendChild(closeIcon);
  
  // Assemble content
  content.appendChild(icon);
  content.appendChild(heading);
  content.appendChild(paragraph);
  content.appendChild(closeBtn);
  errorMessage.appendChild(content);
  
  document.body.appendChild(errorMessage);
  
  setTimeout(() => {
    if (errorMessage.parentElement) {
      errorMessage.remove();
    }
  }, 5000);
};
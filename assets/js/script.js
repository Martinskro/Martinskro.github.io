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

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

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



// portfolio navigation variables (duplicates removed)
const projectLinks = document.querySelectorAll("[data-project-link]");
const backToPortfolioBtn = document.querySelector("[data-back-to-portfolio]");
const portfolioNavLink = Array.from(document.querySelectorAll('button[data-nav-link]')).find(btn => btn.textContent.trim() === 'Projects');

// gallery navigation variables
const prevBtn = document.querySelector("[data-gallery-prev]");
const nextBtn = document.querySelector("[data-gallery-next]");
const detailProjectImg = document.querySelector("[data-detail-project-img]");

// current project data
let currentProjectImages = [];
let currentImageIndex = 0;

// portfolio navigation function
const showProjectDetail = function (projectItem) {
  // Get project data
  const title = projectItem.getAttribute("data-project-title");
  const category = projectItem.getAttribute("data-project-category");
  const description = projectItem.getAttribute("data-project-description");
  const image = projectItem.getAttribute("data-project-image");
  const github = projectItem.getAttribute("data-project-github");
  const live = projectItem.getAttribute("data-project-live");
  const images = projectItem.getAttribute("data-project-images");

  console.log("Showing project detail for:", title); // Debug log

  // Parse images (comma-separated string)
  currentProjectImages = images ? images.split(',').map(img => img.trim()) : [image];
  currentImageIndex = 0;

  // Update detail view content
  detailProjectImg.src = currentProjectImages[currentImageIndex];
  detailProjectImg.alt = title;
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
  // No need to disable buttons since we're looping
  prevBtn.disabled = false;
  nextBtn.disabled = false;
};

const showNextImage = function () {
  currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
  detailProjectImg.src = currentProjectImages[currentImageIndex];
  updateGalleryButtons();
};

const showPrevImage = function () {
  currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
  detailProjectImg.src = currentProjectImages[currentImageIndex];
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

if (contactForm) {
  // form validation
  const formValidation = function () {
    let isValid = true;
    
    formInputs.forEach(input => {
      if (input.value.trim() === '') {
        isValid = false;
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
    
    // Get form data
    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: formData.get('fullname'),
      email: formData.get('email'),  // Changed from 'from_email' to 'email' to match template
      message: formData.get('message'),
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
        showSuccessMessage(templateParams.from_name);
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

// success message function
const showSuccessMessage = function (name) {
  // Create success message element
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.innerHTML = `
    <div class="success-content">
      <ion-icon name="checkmark-circle"></ion-icon>
      <h4>Message Sent Successfully!</h4>
      <p>Thank you ${name}! I'll get back to you as soon as possible.</p>
      <button class="success-close" onclick="this.parentElement.parentElement.remove()">
        <ion-icon name="close"></ion-icon>
      </button>
    </div>
  `;
  
  // Add to body
  document.body.appendChild(successMessage);
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (successMessage.parentElement) {
      successMessage.remove();
    }
  }, 5000);
};

// error message function
const showErrorMessage = function () {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.innerHTML = `
    <div class="error-content">
      <ion-icon name="close-circle"></ion-icon>
      <h4>Message Failed to Send</h4>
      <p>Sorry, there was an error sending your message. Please try again or contact me directly.</p>
      <button class="error-close" onclick="this.parentElement.parentElement.remove()">
        <ion-icon name="close"></ion-icon>
      </button>
    </div>
  `;
  
  document.body.appendChild(errorMessage);
  
  setTimeout(() => {
    if (errorMessage.parentElement) {
      errorMessage.remove();
    }
  }, 5000);
};
// Scroll functionality for showing the sticky button
let lastScrollTop = 0;
let lastScrollTime = Date.now();

document.addEventListener('scroll', function() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const currentTime = Date.now();
    const timeDiff = currentTime - lastScrollTime;

    // Calculate scroll speed
    const scrollSpeed = Math.abs(currentScrollTop - lastScrollTop) / timeDiff;

    // Set a minimum and maximum speed for animation duration
    const minDuration = 0.1; // Minimum duration in seconds (fastest transition)
    const maxDuration = 1; // Maximum duration in seconds (slowest transition)

    // Map the scroll speed to a transition duration (inverse: faster scroll = shorter duration)
    const duration = Math.max(minDuration, Math.min(maxDuration, 1 / scrollSpeed));

    const section2 = document.querySelector('.section1');
    const button = document.getElementById('uploadButton');
    const section2Bottom = section2.getBoundingClientRect().bottom;

    // Apply the transition duration based on scroll speed
    button.style.transition = `bottom ${duration}s ease-in-out`;

    if (section2Bottom < 0) {
        // Show the button when scrolling past Section 2
        button.classList.add('show');
    } else {
        // Hide the button when Section 2 is not scrolled past
        button.classList.remove('show');
    }

    lastScrollTop = currentScrollTop;
    lastScrollTime = currentTime;
});

// Reference the overlay element
const overlay = document.getElementById('overlay');

// Counter to keep track of drag events
let dragCounter = 0;

// Show overlay when dragging over the window
window.addEventListener('dragover', (e) => {
    e.preventDefault(); // Prevent default to allow file drop
    overlay.style.display = 'block'; // Show the overlay
    dragCounter++; // Increase the counter when dragover occurs
});

// Hide overlay when dragging leaves the window or body
window.addEventListener('dragleave', (e) => {
    dragCounter--; // Decrease the counter
    if (e.relatedTarget === null || dragCounter === 0) {
        // `e.relatedTarget` is null when the drag leaves the window or body
        overlay.style.display = 'none'; // Hide the overlay
        dragCounter = 0; // Reset counter for safety
    }
});

// Handle drop event to hide the overlay and show file details
window.addEventListener('drop', (e) => {
    e.preventDefault(); // Prevent default behavior (stop opening file)
    overlay.style.display = 'none'; // Hide the overlay
    dragCounter = 0; // Reset the counter

    // Check if files were dropped
    if (e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        showFileDetails(file);
    }
});

// Handle file selection for the section upload button
document.getElementById('sectionFileInput').addEventListener('change', handleFileSelect);

// Handle file selection for the sticky upload button
const stickyFileInput = document.getElementById('stickyFileInput');
const stickyButton = document.getElementById('uploadButton');

// Trigger the hidden file input when the sticky button is clicked
stickyButton.addEventListener('click', () => {
    stickyFileInput.click(); // Simulate a click on the hidden file input
});

// Handle file selection for the sticky button
stickyFileInput.addEventListener('change', handleFileSelect);

// Function to handle file selection and redirect
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        showFileDetails(file); // Call the function to process the file and redirect
    }
}

// Function to handle showing file details and redirecting to the converter page
function showFileDetails(file) {
    // Store the file name or other details in sessionStorage (or handle as needed)
    sessionStorage.setItem('uploadedFileName', file.name);
    // Redirect to converter.html
    window.location.href = 'converter.html';
}

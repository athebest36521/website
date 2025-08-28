/**
 * Adjusts the height of an iframe to match its content's scroll height.
 * This prevents scrollbars inside the iframe and makes it feel like
 * a seamless part of the main page.
 * @param {HTMLIFrameElement} obj - The iframe element to resize.
 */
function resizeIframe(obj) {
    // Check if the iframe object and its content window/document/body are accessible
    if (obj && obj.contentWindow && obj.contentWindow.document && obj.contentWindow.document.body) {
        // Set the iframe's height to the scrollHeight of its content body
        obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    }
}

// --- Logic for index.html (Iframe Resizing) ---
// Find the iframe element in the main index.html page
const mainIframe = document.getElementById('contentFrame');
if (mainIframe) {
    // Attach an event listener to the iframe's load event
    // When a new page finishes loading inside the iframe, resize it
    mainIframe.onload = function() {
        resizeIframe(mainIframe);
    };
    // Also resize initially in case the src is already set
    resizeIframe(mainIframe);
}

// --- Logic for contact.html (Form Submission) ---
// This part will run only if the current page has a form with id 'contactForm'
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the form from submitting normally (reloading the page)

            const formMessage = document.getElementById('formMessage');
            if (formMessage) {
                formMessage.style.display = 'block'; // Make the message visible
                // Clear previous message styles
                formMessage.classList.remove('bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');

                // Simulate a successful form submission
                formMessage.classList.add('bg-green-100', 'text-green-700');
                formMessage.textContent = 'Thank you for your message! I will get back to you soon.';

                // Optionally clear the form fields
                this.reset();

                // Hide the message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
});

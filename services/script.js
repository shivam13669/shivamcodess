// hamburger menu toggle
const menuIcon = document.getElementById('menu');
const navbar = document.querySelector('header .navbar');

menuIcon.addEventListener('click', function() {
    navbar.classList.toggle('nav-toggle');
    menuIcon.classList.toggle('fa-times');
});

// Close navbar when a link is clicked
const navLinks = document.querySelectorAll('header .navbar ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('nav-toggle');
        menuIcon.classList.remove('fa-times');
    });
});

// Load services from JSON
async function loadServices() {
    try {
        const response = await fetch('/services/services.json');
        const services = await response.json();
        const servicesGrid = document.querySelector('.services .services-grid');

        services.forEach(service => {
            const learningsHTML = service.learnings.map(learning =>
                `<li><span class="arrow">→</span> ${learning}</li>`
            ).join('');

            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-subtitle">${service.subtitle}</p>
                <p class="service-desc">${service.description}</p>
                <div class="service-learnings">
                    <h4>What You'll Learn:</h4>
                    <ul>
                        ${learningsHTML}
                    </ul>
                </div>
            `;
            servicesGrid.appendChild(serviceCard);
        });
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

// Load services when DOM is ready
document.addEventListener('DOMContentLoaded', loadServices);

// Scroll to top functionality
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

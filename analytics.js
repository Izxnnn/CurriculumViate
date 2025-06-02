// Google Analytics 4 Implementation
function initAnalytics() {
  // This is a placeholder for the Google Analytics 4 tracking code
  // Replace 'G-MEASUREMENT_ID' with your actual Google Analytics 4 measurement ID when you have one
  
  // Load Google Analytics script asynchronously
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID';
  document.head.appendChild(script);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-MEASUREMENT_ID');

  // Track custom events
  setupCustomEventTracking();
}

function setupCustomEventTracking() {
  // Track project clicks
  document.querySelectorAll('.project-card, .project-link').forEach(element => {
    element.addEventListener('click', function() {
      const projectName = this.querySelector('h3')?.textContent || this.textContent || 'Unknown Project';
      trackEvent('project_click', {
        project_name: projectName
      });
    });
  });

  // Track social media clicks
  document.querySelectorAll('.social-link').forEach(element => {
    element.addEventListener('click', function() {
      const socialNetwork = this.getAttribute('aria-label') || this.textContent || 'Unknown Network';
      trackEvent('social_click', {
        social_network: socialNetwork
      });
    });
  });

  // Track form submissions
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      trackEvent('form_submission', {
        form_name: 'contact_form'
      });
    });
  }

  // Track section visibility
  setupSectionVisibilityTracking();
}

function setupSectionVisibilityTracking() {
  // Use Intersection Observer to track when sections become visible
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id || 'unknown-section';
        trackEvent('section_view', {
          section_id: sectionId
        });
        
        // Unobserve after first view to avoid duplicate events
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // Consider section visible when 50% is in viewport
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

function trackEvent(eventName, eventParams = {}) {
  if (window.gtag) {
    gtag('event', eventName, eventParams);
  } else {
    console.log('Analytics not loaded. Would track:', eventName, eventParams);
  }
}

// Export functions for use in other scripts
window.analyticsTools = {
  trackEvent
};

// Initialize analytics when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initAnalytics);
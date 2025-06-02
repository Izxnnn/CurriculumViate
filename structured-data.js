/**
 * Structured Data Implementation for SEO
 * Uses JSON-LD format to provide search engines with detailed information about the website
 */

function initStructuredData() {
  // Determine which structured data to inject based on the current page
  const currentPath = window.location.pathname;
  
  if (currentPath.includes('proyectos.html')) {
    injectProjectsStructuredData();
  } else {
    // Default to CV/resume structured data for the main page
    injectResumeStructuredData();
  }
}

function injectResumeStructuredData() {
  // Get information from the page to use in structured data
  const name = document.querySelector('h1')?.textContent || 'Izan Martín Velasco';
  const profession = document.querySelector('.profession')?.textContent || 'Programador Junior';
  const description = document.querySelector('meta[name="description"]')?.content || '';
  const image = document.querySelector('meta[property="og:image"]')?.content || '';
  
  // Create the Person structured data
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": profession,
    "description": description,
    "image": image,
    "url": window.location.href,
    "sameAs": getSocialMediaLinks()
  };
  
  // Add work experience if available
  const workExperience = getWorkExperience();
  if (workExperience.length > 0) {
    personData.workExperience = workExperience;
  }
  
  // Add education if available
  const education = getEducation();
  if (education.length > 0) {
    personData.alumniOf = education;
  }
  
  // Add skills if available
  const skills = getSkills();
  if (skills.length > 0) {
    personData.knowsAbout = skills;
  }
  
  // Inject the structured data into the page
  injectStructuredDataToPage(personData);
}

function injectProjectsStructuredData() {
  // Create structured data for projects page
  const projectsData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": getProjectsData()
  };
  
  // Inject the structured data into the page
  injectStructuredDataToPage(projectsData);
}

function getSocialMediaLinks() {
  // Extract social media links from the page
  const socialLinks = [];
  document.querySelectorAll('.social-link').forEach(link => {
    if (link.href) {
      socialLinks.push(link.href);
    }
  });
  
  return socialLinks;
}

function getWorkExperience() {
  const workExperience = [];
  const experienceItems = document.querySelectorAll('#experiencia .timeline-item');
  
  experienceItems.forEach((item, index) => {
    const title = item.querySelector('h3')?.textContent || '';
    const company = item.querySelector('h4')?.textContent || '';
    const dateRange = item.querySelector('.date')?.textContent || '';
    const description = item.querySelector('p')?.textContent || '';
    
    // Parse date range (format: "YYYY - YYYY" or "YYYY - Present")
    let startDate = '';
    let endDate = '';
    
    if (dateRange) {
      const dates = dateRange.split(' - ');
      if (dates.length === 2) {
        startDate = dates[0].trim();
        endDate = dates[1].trim();
        
        // Format dates properly for Schema.org
        if (startDate.match(/^\d{4}$/)) {
          startDate = startDate + '-01-01';
        }
        
        if (endDate.match(/^\d{4}$/)) {
          endDate = endDate + '-12-31';
        } else if (endDate.toLowerCase() === 'presente' || endDate.toLowerCase() === 'present') {
          endDate = new Date().toISOString().split('T')[0];
        }
      }
    }
    
    workExperience.push({
      "@type": "OrganizationRole",
      "roleName": title,
      "worksFor": {
        "@type": "Organization",
        "name": company
      },
      "startDate": startDate,
      "endDate": endDate,
      "description": description
    });
  });
  
  return workExperience;
}

function getEducation() {
  const education = [];
  const educationItems = document.querySelectorAll('#educacion .timeline-item');
  
  educationItems.forEach((item, index) => {
    const degree = item.querySelector('h3')?.textContent || '';
    const institution = item.querySelector('h4')?.textContent || '';
    const dateRange = item.querySelector('.date')?.textContent || '';
    
    // Parse date range (format: "YYYY - YYYY")
    let startDate = '';
    let endDate = '';
    
    if (dateRange) {
      const dates = dateRange.split(' - ');
      if (dates.length === 2) {
        startDate = dates[0].trim();
        endDate = dates[1].trim();
        
        // Format dates properly for Schema.org
        if (startDate.match(/^\d{4}$/)) {
          startDate = startDate + '-01-01';
        }
        
        if (endDate.match(/^\d{4}$/)) {
          endDate = endDate + '-12-31';
        } else if (endDate.toLowerCase() === 'presente' || endDate.toLowerCase() === 'present') {
          endDate = new Date().toISOString().split('T')[0];
        }
      }
    }
    
    education.push({
      "@type": "EducationalOrganization",
      "name": institution,
      "degree": degree,
      "startDate": startDate,
      "endDate": endDate
    });
  });
  
  return education;
}

function getSkills() {
  const skills = [];
  const skillItems = document.querySelectorAll('#habilidades .skill');
  
  skillItems.forEach(item => {
    const skillName = item.querySelector('.skill-name')?.textContent || '';
    if (skillName) {
      skills.push(skillName);
    }
  });
  
  return skills;
}

function getProjectsData() {
  const projects = [];
  const projectItems = document.querySelectorAll('.project-card');
  
  projectItems.forEach((item, index) => {
    const name = item.querySelector('h3')?.textContent || `Project ${index + 1}`;
    const description = item.querySelector('p')?.textContent || '';
    const imageElement = item.querySelector('img');
    const image = imageElement ? imageElement.src : '';
    const url = item.querySelector('a')?.href || '';
    
    projects.push({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": name,
        "description": description,
        "image": image,
        "url": url,
        "applicationCategory": "WebApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/OnlineOnly"
        }
      }
    });
  });
  
  return projects;
}

function injectStructuredDataToPage(data) {
  // Create script element for JSON-LD
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  
  // Add to head
  document.head.appendChild(script);
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initStructuredData);
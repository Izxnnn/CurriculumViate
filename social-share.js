/**
 * Social Media Sharing Functionality
 * Enables easy sharing of the website content on various social media platforms
 */

function initSocialSharing() {
  // Create the social sharing container
  createSocialSharingButtons();
  
  // Track sharing events with analytics
  trackSharingEvents();
}

function createSocialSharingButtons() {
  // Create the main container for social sharing buttons
  const sharingContainer = document.createElement('div');
  sharingContainer.className = 'social-sharing-container';
  
  // Add heading
  const heading = document.createElement('h3');
  heading.textContent = '¡Comparte mi perfil!';
  heading.className = 'social-sharing-heading';
  sharingContainer.appendChild(heading);
  
  // Get current page information for sharing
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);
  const pageDescription = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || '');
  
  // Define social networks to include
  const socialNetworks = [
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      url: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
      color: '#1da1f2'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      color: '#3b5998'
    },
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      url: `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`,
      color: '#25d366'
    },
    {
      name: 'Email',
      icon: 'fas fa-envelope',
      url: `mailto:?subject=${pageTitle}&body=${pageDescription}%0A%0A${pageUrl}`,
      color: '#dd4b39'
    }
  ];
  
  // Create the buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'social-sharing-buttons';
  
  // Create buttons for each social network
  socialNetworks.forEach(network => {
    const button = document.createElement('a');
    button.href = network.url;
    button.className = 'social-sharing-button';
    button.setAttribute('data-network', network.name.toLowerCase());
    button.setAttribute('aria-label', `Compartir en ${network.name}`);
    button.setAttribute('rel', 'noopener noreferrer');
    button.setAttribute('target', '_blank');
    
    // Don't open email in new tab
    if (network.name === 'Email') {
      button.removeAttribute('target');
    }
    
    // Create icon
    const icon = document.createElement('i');
    icon.className = network.icon;
    button.appendChild(icon);
    
    // Create text
    const text = document.createElement('span');
    text.textContent = network.name;
    button.appendChild(text);
    
    // Set custom color as a CSS variable
    button.style.setProperty('--network-color', network.color);
    
    // Add to container
    buttonsContainer.appendChild(button);
  });
  
  // Add buttons to main container
  sharingContainer.appendChild(buttonsContainer);
  
  // Add copy link button
  const copyLinkButton = document.createElement('button');
  copyLinkButton.className = 'copy-link-button';
  copyLinkButton.innerHTML = '<i class="fas fa-link"></i> Copiar enlace';
  copyLinkButton.addEventListener('click', function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // Show success message
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> ¡Enlace copiado!';
      
      // Track copy event
      if (window.analyticsTools && window.analyticsTools.trackEvent) {
        window.analyticsTools.trackEvent('share', {
          method: 'copy_link'
        });
      }
      
      // Reset button text after 2 seconds
      setTimeout(() => {
        this.innerHTML = originalText;
      }, 2000);
    });
  });
  
  sharingContainer.appendChild(copyLinkButton);
  
  // Add the container to the page inside the contact section, after the contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Insert after the contact form
    contactForm.parentNode.insertBefore(sharingContainer, contactForm.nextSibling);
  } else {
    // Try to add it after the social networks section if contact form doesn't exist
    const socialNetworksSection = document.getElementById('redes-sociales');
    if (socialNetworksSection) {
      socialNetworksSection.parentNode.insertBefore(sharingContainer, socialNetworksSection.nextSibling);
    } else {
      // Otherwise add it before the footer
      const footer = document.querySelector('footer');
      if (footer) {
        footer.parentNode.insertBefore(sharingContainer, footer);
      } else {
        // Last resort: add to the end of the body
        document.body.appendChild(sharingContainer);
      }
    }
  }
}

function trackSharingEvents() {
  // Add click event listeners to all sharing buttons
  document.querySelectorAll('.social-sharing-button').forEach(button => {
    button.addEventListener('click', function() {
      const network = this.getAttribute('data-network');
      
      // Track the share event if analytics is available
      if (window.analyticsTools && window.analyticsTools.trackEvent) {
        window.analyticsTools.trackEvent('share', {
          method: network
        });
      }
    });
  });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initSocialSharing);
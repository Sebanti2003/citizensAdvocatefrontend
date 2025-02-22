

// import React from 'react';

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-black/70 text-white text-center py-4">
      <div className="space-y-4">
        <p>&copy; 2025 Citizen&apos;s Advocate. All rights reserved.</p>
        
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/150"  // Placeholder logo URL, replace with your logo URL
            alt="Citizen's Advocate Logo"
            className="h-12"
          />
        </div>
        
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/noobuild.community/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            Instagram
          </a>
          <a href="https://twitter.com/NooBuild_Tech" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            Twitter
          </a>
          <a href="https://www.facebook.com/NooBuild" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            Facebook
          </a>
          <a href="mailto:contact@noobuild.com" className="hover:text-blue-400">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

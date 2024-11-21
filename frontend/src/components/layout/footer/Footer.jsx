import React from 'react';

const Footer = () => {
  const footerLinks = ['Home', 'Products', 'About Us', 'Contact Us', 'Privacy Policy'];
  return (
    <footer className="bg-gray-800 text-white py-10 font-roboto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-5xl font-bold mb-4 text-orange-700">E-Commerce.</h3>
          <p className="text-gray-400 ">
            Your one-stop shop for all your needs. Quality products, fast shipping, and excellent customer service.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {footerLinks.map((link) => {
              return <li key={link}><a href="#footer" className="hover:text-gray-400">{link}</a></li>
            })}
          </ul>
        </div>

        {/* Social Media & Store Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#twitter" className="flex items-center hover:text-gray-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557a9.94 9.94 0 01-2.828.775 4.952 4.952 0 002.165-2.723c-.95.563-2.005.973-3.127 1.194a4.935 4.935 0 00-8.401 4.49A14 14 0 011.671 3.149a4.931 4.931 0 001.53 6.574A4.93 4.93 0 01.96 9.149v.062a4.934 4.934 0 003.95 4.834 4.942 4.942 0 01-2.224.084 4.936 4.936 0 004.604 3.417A9.874 9.874 0 010 20.054a13.924 13.924 0 007.548 2.212c9.057 0 14.01-7.51 14.01-14.01 0-.213-.005-.425-.014-.637A10.024 10.024 0 0024 4.557z" />
                </svg>
                Twitter
              </a>
            </li>
            <li>
              <a href="#insta" className="flex items-center hover:text-gray-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.615 3.184A9.935 9.935 0 0012 0a9.935 9.935 0 00-7.615 3.184A9.935 9.935 0 000 10.615a9.935 9.935 0 003.184 7.615A9.935 9.935 0 0012 21a9.935 9.935 0 007.615-3.184A9.935 9.935 0 0024 10.615a9.935 9.935 0 00-3.184-7.431zm-7.615 17.364a8.053 8.053 0 01-8.052-8.053A8.053 8.053 0 0112 4.462a8.053 8.053 0 018.052 8.053A8.053 8.053 0 0112 20.548z" />
                  <circle cx="12" cy="10.615" r="3.846" />
                </svg>
                Instagram
              </a>
            </li>
            <li>
              <a href="#facebook" className="flex items-center hover:text-gray-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.94 12.041c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.993 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.469h3.047v-2.646c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.236 2.686.236v2.953h-1.514c-1.492 0-1.953.93-1.953 1.887v2.238h3.328l-.531 3.469h-2.797v8.385C19.553 22.995 24 18.034 24 12.041z" />
                </svg>
                Facebook
              </a>
            </li>
          </ul>

          {/* App Store & Play Store */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Get Our App</h3>
            <div className="flex space-x-4">
              {/* Google Play Store */}
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="w-36"
                />
              </a>

              {/* Apple App Store */}
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="w-36"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center text-gray-400">
        &copy; {new Date().getFullYear()} E-Commerce. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

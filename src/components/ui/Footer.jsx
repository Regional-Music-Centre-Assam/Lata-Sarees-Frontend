import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Lata Sarees. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-gray-400">Terms of Service</a>
            <a href="/contact" className="hover:text-gray-400">Contact Us</a>
          </div>
        </div>
      </footer>
  )
}

export default Footer
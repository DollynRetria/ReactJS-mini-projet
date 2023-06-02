import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer-txt text-center">
            © {new Date().getFullYear()} Copyright <span>Lorem ipsum</span>
            </div>
        </div>

    </footer>
  )
}

export default Footer

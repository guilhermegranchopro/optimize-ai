// components/Footer.js
export default function Footer() {
    return (
      <footer className="footer">
        <p>
          Contact us: <a href="mailto:info@startup.com">info@startup.com</a>
        </p>
        <p>
          GitHub: <a href="https://github.com/startup" target="_blank" rel="noopener noreferrer">github.com/startup</a>
        </p>
        <p>&copy; {new Date().getFullYear()} Startup Name. All rights reserved.</p>
      </footer>
    )
  }
  
  
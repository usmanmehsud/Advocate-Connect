import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; 
import { useNavigate } from 'react-router-dom';

const Footer = () => {

   const navigate = useNavigate();

  const handleHighRatedClick = () => {
    navigate('/'); // navigate to home
    setTimeout(() => {
      
      const ele = document.getElementById('practice-area');
      
      
      if (ele) {
        ele.scrollIntoView({ behavior: 'smooth' });
      }
      
    }, 300); // wait for Home to mount and render
  };  
  const handleHighRatedClickk = () => {
    navigate('/about'); // navigate to about
    setTimeout(() => {
      
      const eleee = document.getElementById('faq21');
      
      if (eleee) {
        eleee.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // wait for Home to mount and render
  };

  const handleHighRated=()=>{
    navigate("/privacyandpolicies")
  }
const handleHighRatedClicck = () => {
    navigate('/'); // navigate to about
    setTimeout(() => {
      
      const element = document.getElementById('high-rated-lawyers1');
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // wait for Home to mount and render
  };


  const termandcontionclick=()=>{
    navigate("/termsandcontions")
  }


  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-col">
          <h2>AdvocateConnect</h2>
          <p>
            Streamlining legal services communication and connecting advocates with clients through technology.
          </p>
         
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>

        <div className="footer-col">
          <h3>SERVICES</h3>
          <ul>
            <li>
            <Link to="/services" style={{ textDecoration: 'none', color: 'inherit' }}>
    Legal Consultation
  </Link>
  </li>
             <li style={{ cursor: 'pointer' }} onClick={handleHighRatedClicck}>
      Our High Rated Advocates
    </li>



            <li>
  <Link to="/activecaselawyer/6824c70ded4ae86973c04719" style={{ textDecoration: 'none', color: 'inherit' }}>
    Active Cases
  </Link>
</li>

            
          </ul>
        </div>

        <div className="footer-col">
          <h3>RESOURCES</h3>
          <ul>
            <li style={{ cursor: 'pointer' }} onClick={handleHighRatedClick}>
      Practice Area
    </li>
           <li style={{ cursor: 'pointer' }} onClick={handleHighRatedClickk}>
      FAQs
    </li>
    <li style={{ cursor: 'pointer' }} onClick={termandcontionclick}>
      Terms and Conditions
    </li>
        <li style={{ cursor: 'pointer' }} onClick={handleHighRated}>
      Privacy and Policies
    </li>
    
            <li> <Link to="/services" style={{ textDecoration: 'none', color: 'inherit' }}>
    Explore Us
  </Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>CONTACT</h3>
          <ul className="contact-info">
            <li><i className="fas fa-envelope"></i> contact@advocateconnect.com</li>
            <li><i className="fas fa-phone"></i> +1 (555) 555-5555</li>
            <li>123 Legal Street, Suite 100<br />Lawsville, CA 94105</li>
          </ul>
        </div>
      </div>
       
    </footer>
  );
};

export default Footer;

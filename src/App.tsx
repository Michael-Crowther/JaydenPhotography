import './App.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Gallery from './Gallery';
import Shop from './Shop';
import Contact from './Contact';
import image from './images/headshot.png';


function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  //UseEffect hook for checking if user scrolls. Change navbar if user scrolls
  useEffect(() => {
    const header = document.getElementById('Top') as HTMLElement;
    const logo = document.getElementById('logo') as HTMLElement;
    const navbarTextElements = document.getElementsByClassName('navbarText') as HTMLCollectionOf<HTMLElement>;
    const icon = document.getElementById('icon') as HTMLElement;

    const navbarTextArray = Array.from(navbarTextElements); // Convert HTMLCollection to an array

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 25; // Adjust this value as needed

      if (scrollPosition > threshold) {
        header.classList.add("stickyTop");
        logo.classList.add("stickyLogo");
        icon.classList.add("stickyLogo");
        header.classList.remove("stickyFadeOut");
        navbarTextArray.forEach((element) => {//Gets all text elements in navbar
          element.classList.add('stickyNavBarText');
        });

      } 
      else {
        if (scrollPosition <= threshold && scrollPosition === 0) {
          header.classList.add("stickyFadeOut");
          setTimeout(() => {//Wait for fadeOut animtation to end
            header.classList.remove("stickyTop");
            logo.classList.remove("stickyLogo");
            icon.classList.remove("stickyLogo");
            navbarTextArray.forEach((element) => {
              element.classList.remove('stickyNavBarText');
            });   
          }, 200);
        }
      } 
    };

    // Add event listener on component mount
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //UseEffect hook to handle resetting page when user refreshes
  useEffect(() => {
    const handlePageRefresh = () => {
      // Scroll to the top of the page when the user refreshes it
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handlePageRefresh);

    return () => {
      window.removeEventListener("beforeunload", handlePageRefresh);
    };
  }, []);

  //This effect will prevent having both nav bars showing
  useEffect(() => {

    const hamburgerIcon = document.getElementById("icon");

    function handleResize(){
      
      if(window.innerWidth >= 1400){
        setIsMobileNavOpen(false);
        hamburgerIcon?.classList.remove("visible");
      }
      else if(hamburgerIcon?.classList.contains("hidden")){
        setIsMobileNavOpen(true);
      }
      
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileNavOpen]);

  //This effect checks if the user clicks anywhere outside of the mobile nav bar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent){
      const targetElement = event.target as Element;
      const hamburgerIcon = document.getElementById("icon");

      //Close navbar and make bars visible if the user clicks a class outside
      //of the mobileLinks and if the mobile navbar is visible
      if(!targetElement.closest("#mobileLinks") && hamburgerIcon?.classList.contains("hidden")){
        setIsMobileNavOpen(false);
        hamburgerIcon.classList.toggle("hidden");
      }
      
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, []);

  const handleMobileNavbarClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);

    const hamburgerIcon = document.getElementById("icon");
    //const mobileNavBar = document.getElementById("mobileLinks");


    if(hamburgerIcon?.classList.contains("hidden")){
      //If hidden, make it visible instantly
      hamburgerIcon.classList.remove("hidden");
      hamburgerIcon.classList.add("visible");
      //mobileNavBar?.classList.add("hidden");
    }
    else{
      //If visible, hide after a delay
      hamburgerIcon?.classList.remove("visible");
      setTimeout(() => {
        hamburgerIcon?.classList.add("hidden");
        //mobileNavBar?.classList.remove("hidden");
      }, 300);
    }   
  };


  return (
    <div className="App" id="linkTop">

    {/*Hidden NEtlify Form */}
    <form name="contactForm" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="text" name="firstName" />
      <input type="text" name="lastName" />
      <input type="tel" name="phone" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
    </form>

      <header id="Top">
        <div className="logo" id="logo">Jayden Crowther</div>
        <nav className="navbar" id="navbar">
          <FontAwesomeIcon icon={faBars} id="icon" className="icon" onClick={handleMobileNavbarClick} />
          <ul id="myLinks">
            <li><a className="navbarText" href="#linkTop">Home</a></li>
            <li><a className="navbarText" href="#About">About</a></li>
            <li><a className="navbarText" href="#Gallery">Gallery</a></li>
            <li><a className="navbarText" href="#Shop">Shop</a></li>
            <li><a className="navbarText" href="#Contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <ul id="mobileLinks" className={isMobileNavOpen ? 'open' : ' '}>        
        <li><a className="navbarText" href="#linkTop" onClick={handleMobileNavbarClick}>Home</a></li>
        <li><a className="navbarText" href="#About" onClick={handleMobileNavbarClick}>About</a></li>
        <li><a className="navbarText" href="#Gallery" onClick={handleMobileNavbarClick}>Gallery</a></li>
        <li><a className="navbarText" href="#Shop" onClick={handleMobileNavbarClick}>Shop</a></li>
        <li><a className="navbarText" href="#Contact" onClick={handleMobileNavbarClick}>Contact</a></li>
        <FontAwesomeIcon icon={faBars} id="mobileIcon" onClick={handleMobileNavbarClick} />
      </ul>


      <section id="Home">
        <h1 className="homeHeader">Photography</h1>
        <h2 className="homeSubHeader">at its finest.</h2>
      </section>

      <section id="About">
        <div className="about-parent">
          <img src={image} alt="profile" className="about-image" />
          <div className="about-content">
            <h3 className="aboutHeader">Hey, I'm Jayden</h3>
            <p className="aboutParagraph">I'm a photographer from the beautiful Utah Valley. People say I have a knack for making them feel at ease in front of the camera. Whether it's capturing candid moments, vibrant portraits, or those once-in-a-lifetime family memories, my goal is to make every shot count and give you photos you'll cherish. Feel free to contact me so we can schedule a shoot!</p>
          </div>
        </div>
      </section>

      <Gallery/>

      <Shop/>

      <Contact/>
  </div>
  );
}

export default App;

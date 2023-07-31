import './App.css';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';


function App() {

  //UseEffect hook for checking if user scrolls. Change navbar if user scrolls
  useEffect(() => {
    const header = document.getElementById('Top') as HTMLElement;
    const logo = document.getElementById('logo') as HTMLElement;
    const navbarTextElements = document.getElementsByClassName('navbarText') as HTMLCollectionOf<HTMLElement>;
    const icon = document.getElementById('icon') as HTMLElement;
    const xIcon = document.getElementById('iconX') as HTMLElement;

    const navbarTextArray = Array.from(navbarTextElements); // Convert HTMLCollection to an array

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 25; // Adjust this value as needed

      if (scrollPosition > threshold) {
        header.classList.add("stickyTop");
        logo.classList.add("stickyLogo");
        icon.classList.add("stickyLogo");
        xIcon.classList.add("stickyLogo");
        header.classList.remove("stickyFadeOut");
        navbarTextArray.forEach((element) => {//Gets all text elements in navbar
          element.classList.add('stickyNavBarText');
        });

      } 
      else {
        if (scrollPosition <= threshold && scrollPosition == 0) {
          header.classList.add("stickyFadeOut");
          setTimeout(() => {//Wait for fadeOut animtation to end
            header.classList.remove("stickyTop");
            logo.classList.remove("stickyLogo");
            icon.classList.remove("stickyLogo");
            xIcon.classList.remove("stickyLogo");
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


  const handleMobileNavbarClick = () => {
    const x = document.getElementById("myLinks") as HTMLElement;
    const hamburgerIcon = document.getElementById("icon");
    const xIcon = document.getElementById("iconX");


    // Toggle the visibility of 'x' element
    x.classList.toggle("visible");
    x.classList.toggle("hidden");

    // Toggle the visibility of 'hamburgerIcon' element
    hamburgerIcon?.classList.toggle("visible");
    hamburgerIcon?.classList.toggle("hidden");

    xIcon?.classList.toggle("visible");
    xIcon?.classList.toggle("hidden");
  };

  return (
    <div className="App" id="linkTop">
      <header id="Top">
        <div className="logo" id="logo">Jayden Crowther</div>
        <nav className="navbar" id="navbar">
          <FontAwesomeIcon icon={faBars} id="icon" className="icon" onClick={handleMobileNavbarClick} />
          <FontAwesomeIcon icon={faXmark} id="iconX" className="iconX hidden" onClick={handleMobileNavbarClick} />
          <ul id="myLinks">
            <li><a className="navbarText" href="#linkTop" onClick={handleMobileNavbarClick}>Home</a></li>
            <li><a className="navbarText" href="#About" onClick={handleMobileNavbarClick}>About</a></li>
            <li><a className="navbarText" href="#Gallery" onClick={handleMobileNavbarClick}>Gallery</a></li>
            <li><a className="navbarText" href="#Shop" onClick={handleMobileNavbarClick}>Shop</a></li>
            <li><a className="navbarText" href="#Contact" onClick={handleMobileNavbarClick}>Contact</a></li>
          </ul>
        </nav>
      </header>


      <section id="Home">
        <h1 className="homeHeader">Photography</h1>
        <h2 className="homeSubHeader">at its finest.</h2>
      </section>

      <section id="About">
        <h3 className="aboutHeader">My name is Jayden Crowther</h3>
        <p className="aboutParagraph">I am a professional photographer based in Utah Valley, known for my exceptional charisma and innate talent for working with people. With expertise in capturing stunning portraits, engaging engagement photos, and heartwarming family moments, I strive to deliver a remarkable photography experience. </p>
      </section>

      <section id="Gallery">

      </section>

      <section id="Shop">

      </section>

      <section id="Contact">

      </section>
  </div>
  );
}

export default App;

import './App.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import img6 from "./images/img6.jpg";
import img7 from "./images/img7.jpg";
import img8 from "./images/img8.jpg";
import img9 from "./images/img9.jpg";
import img10 from "./images/img10.jpg";
import img11 from "./images/img11.jpg";
import img12 from "./images/img12.jpg";


const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12]

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const goToLeftImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }

  const goToRightImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="App" id="linkTop">
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

      <ul id="mobileLinks" className={isMobileNavOpen ? 'open' : ' '}>        <li><a className="navbarText" href="#linkTop" onClick={handleMobileNavbarClick}>Home</a></li>
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
        <h3 className="aboutHeader">Hey, I'm Jayden</h3>
        <p className="aboutParagraph">I am a professional photographer based in Utah Valley, known for my exceptional charisma and innate talent for working with people. With expertise in capturing stunning portraits, engaging engagement photos, and heartwarming family moments, I strive to deliver a remarkable photography experience. </p>
      </section>

      <section id="Gallery">
        <div className="image-container">
          <FontAwesomeIcon icon={faArrowLeft} className="arrow left-arrow" onClick={goToLeftImage} />
          <img src={images[currentImageIndex]} alt="gallery" className="gallery-image" />
          <FontAwesomeIcon icon={faArrowRight} className="arrow right-arrow" onClick={goToRightImage} />
        </div>
      </section>

      <section id="Shop">

      </section>

      <section id="Contact">

      </section>
  </div>
  );
}

export default App;

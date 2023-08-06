import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
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

/**Start Functional Component */
const Gallery: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPortraitImage, setIsPortraitImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  
  const imageLoadedRef = useRef(imageLoaded);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);//for mobile swipe on gallery
  const [isLoading, setIsLoading] = useState(false);


      /**Gallery Section Functions */

  const goToLeftImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setImageLoaded(false);
    setIsContentVisible(false); // <- hide content initially
    loadTimer();
  }

  const loadTimer = () => {
    setTimeout(() => {
        if(imageLoadedRef.current === false)
            setIsLoading(true);
        setIsContentVisible(true);
    }, 400);
  }

  const goToRightImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    setImageLoaded(false);
    setIsContentVisible(false); // <- hide content initially
    loadTimer();   
  };

  const closeModal = () => {
    setShowModal(false);
    setIsPortraitImage(false);
    setIsLoading(false);

    const header = document.getElementById("Top");

    header?.classList.toggle("hidden");
  }

  const openModal = () => {
    setShowModal(true);
    setIsContentVisible(false); // <- hide content initially
    setImageLoaded(false);
    loadTimer();

    const header = document.getElementById("Top");

    header?.classList.toggle("hidden");
  }

  // Ensure ref is always in sync with state
    useEffect(() => {
        imageLoadedRef.current = imageLoaded;
    }, [imageLoaded]);

  const handleImageLoad = () => {
    const modalContent = modalContentRef.current;
    setIsLoading(false);
    setImageLoaded(true);
    setIsContentVisible(true);  // <- make content visible when image is loaded
    console.log("image loaded");

    if(modalContent){
      const rect = modalContent.getBoundingClientRect();
      const height = rect.height;

      modalContent?.classList.remove("hidden");

      if(height && height > 550){
        setIsPortraitImage(true);
      }
      else{
        setIsPortraitImage(false);
      }
    }

  }

  /**Mobile Functions on Gallery */
  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    touchStartX.current = e.touches[0].clientX;
  }

  //Swipe functionality on Gallery on mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if(!touchStartX.current){
      return;
    }
    const touchEndX = e.touches[0].clientX;
    const swipeLength = touchStartX.current - touchEndX;

    if(Math.abs(swipeLength) > 100){
      if(swipeLength > 0){
        //Go right image
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }
      else{
        //Go left image
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      }
    }
  }

    return (
        <section id="Gallery">
        <div className="image-container">
          <FontAwesomeIcon icon={faArrowLeft} className="arrow left-arrow" onClick={goToLeftImage} />
          <img src={images[currentImageIndex]} alt="gallery" className="gallery-image" onClick={openModal} />
          <FontAwesomeIcon icon={faArrowRight} className="arrow right-arrow" onClick={goToRightImage} />
        </div>
        {showModal &&
          <div className="modal" onClick={closeModal}>
            <div id="modal-content" 
            ref={modalContentRef} 
            key={currentImageIndex} 
            className={`modal-content ${!isContentVisible || isLoading ? 'hidden-modal-content' : ''} ${isPortraitImage ? 'portrait' : ''}`} 
            onClick={e => e.stopPropagation()} 
            onTouchStart={handleTouchStart} 
            onTouchMove={handleTouchMove}>
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={closeModal}/>
                <FontAwesomeIcon icon={faArrowLeft} className="arrow left-arrow-modal" onClick={goToLeftImage} />
                <img src={images[currentImageIndex]} alt="gallery" id="modal-image" className="modal-image" onLoad={handleImageLoad} />
                <FontAwesomeIcon icon={faArrowRight} className="arrow right-arrow-modal" onClick={goToRightImage} />
            </div>

            {isLoading && <div className="loading" id="loading"></div>}
          </div>
        }
      </section>
    );
}

export default Gallery;
import React from 'react';

const Shop: React.FC = () => {
    return (
        <section id="Shop">
            <div className="shop-content">
                <h2 className="shop-description">Hey there! I've started using 'Printful' to help you get more out of my photos. With Printful, you can easily get my shots on fun stuff like canvases, puzzles, mugs, or even t-shirts. Think of it as a way to bring a little piece of my gallery into your everyday life. Take a look and find a unique way to enjoy my work!</h2>
                <a href="https://www.printful.com/custom-products" className="shop-link" target="_blank" rel="noopener noreferrer">
                    <button>Go to 'Printful'</button>
                </a>            
            </div>
        </section>
    );
}

export default Shop;
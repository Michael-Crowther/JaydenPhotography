import React, { useState } from 'react';

interface FormData{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [data, setData] = useState<FormData>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Handle form submission logic here, send data to API...
    }

    return (   
        <div id="Contact">
            <h2 className="contact-header">Contact Me</h2>  
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" name="email" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows={4} required onChange={handleChange}></textarea>
                </div>
        
                <div className="button-parent">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>     
      );
}

export default ContactForm;
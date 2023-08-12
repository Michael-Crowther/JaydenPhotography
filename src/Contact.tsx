import React, { useState } from 'react';

const ContactForm: React.FC = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setErrorMessage('');

        const phoneRegex = /^(\d{3}-?\d{3}-?\d{4})$/;

        if (Object.values(form).some((value) => value === '')) {
            e.preventDefault();
            setErrorMessage('Please fill out all fields before submitting');
        } else if (!phoneRegex.test(form.phone)) {
            e.preventDefault();
            setErrorMessage('Please enter a valid phone number');
        } else {
            // Reset form fields
            setForm({
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                message: '',
            });
            setIsModalOpen(true);
            document.documentElement.classList.add('modal-open');
        }
        //Handle form submission logic here, send data to API...
    }

    /**Modal Stuff Here */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.documentElement.classList.remove('modal-open'); // Remove the class here
    };

    type ModalProps = {
        isOpen: boolean;
        message: string;
        onClose: () => void;
    };
    
    const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
        if (!isOpen) {
            return null;
        }
    
        return (
            <div className="modal-background">
                <div className="modal-contact">
                    <p>{message}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    };

    return (   
        <div id="Contact">
            <h2 className="contact-header">Contact Me</h2> 
            <form name="contactForm" className="form" onSubmit={handleSubmit} method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contactForm" />

                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" onChange={handleChange} value={form.firstName} />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" onChange={handleChange} value={form.lastName} />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" onChange={handleChange} value={form.phone} />
                </div>
                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" name="email" onChange={handleChange} value={form.email} />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows={4} onChange={handleChange} value={form.message}></textarea>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="button-parent">
                    <button type="submit">Submit</button>
                </div>
            </form>

            <Modal
                isOpen={isModalOpen}
                message="Thanks for reaching out! I will get back to you as soon as I can!"
                onClose={handleCloseModal}
            />
        </div>     
      );
}

export default ContactForm;
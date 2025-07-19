import React from 'react'
import "../CSS/contact.css"
const Contact = () => {
  return (
    <>
    <section className="contact-section">
    <header>
        <h1>Contact Us</h1>
    </header>
        <div className="container">
            <div className="contact-info">
                <h2>Contact Information</h2>
                <hr />
                <p>Welcome to EduWeb's Contact Page! We value your questions, feedback, and suggestions. Whether you're a student eager to learn, a teacher looking to share knowledge, or a curious visitor wanting to know more about our offerings, we're here to assist you. Our dedicated team is committed to providing you with the best support possible. Please feel free to reach out to us through the various channels provided below, and we will get back to you promptly. Thank you for being a part of the EduWeb community!</p>
                <ul>
                    <li><strong>Address:</strong> 123 EduWeb Street, Barhampur, Sitlapali, 761003, Odisha</li>
                    <li><strong>Email:</strong> contact@eduweb.com</li>
                    <li><strong>Phone:</strong> +91 12345 67890</li>
                </ul>
            </div>
            {/* <div className="contact-form">
                <h2>Send Us a Message</h2>
                <form action="#" method="post">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required/>
                    
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required/>
                    
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="6" required></textarea>
                    
                    <button type="submit">Send</button>
                </form>
            </div> */}
        </div>
    </section>

    </>
  )
}

export default Contact
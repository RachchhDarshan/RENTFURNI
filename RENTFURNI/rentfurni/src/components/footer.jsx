// footer.jsx

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>We are a company that values excellence and quality in all our products.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact</h5>
                        <ul className="list-unstyled">
                            <li>Email: info@example.com</li>
                            <li>Phone: +1 234 567 890</li>
                            <li>Address: 1234 Street Name, City, State, Country</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Facebook</a></li>
                            <li><a href="#" className="text-white">Twitter</a></li>
                            <li><a href="#" className="text-white">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-secondary text-center py-3">
                <p className="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
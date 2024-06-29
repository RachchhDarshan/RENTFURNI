// MasterPage.jsx

import React from 'react';
import Navigationbar from './navbar'; // Adjust path as per your file structure
import Footer from './footer'; // Adjust path as per your file structure

const MasterPage = ({ children }) => {
    return (
        <div>
            <Navigationbar />

            <div className="content">
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default MasterPage;

// src/AppRoutes.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import DealSubmission from './DealSubmission';
import Seller from './Seller';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/DealSubmission" />} /> {/* Default route */}
            <Route path="/DealSubmission" element={<DealSubmission />} />
            <Route path="/seller" element={<Seller />} />
        </Routes>
    );
};

export default AppRoutes;

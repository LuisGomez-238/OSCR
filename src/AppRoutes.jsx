// src/AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DealSubmission from './DealSubmission';
import Seller from './Seller';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/DealSubmission" element={<DealSubmission />} />
            <Route path="/seller" element={<Seller />} />
        </Routes>
    );
};

export default AppRoutes;
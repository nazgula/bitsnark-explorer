import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IneractionsList from './pages/interactions-list/InetractionsList';
import Ineraction from './pages/interaction/Ineraction';


const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={IneractionsList} />
                <Route path="/interaction/:id" Component={Ineraction} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
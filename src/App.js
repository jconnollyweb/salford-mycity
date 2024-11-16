import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ServicesAndGroups from './components/ServicesAndGroups';
import Childcare from './components/Childcare';
import LocalOffer from './components/LocalOffer';
import AdultCareSupport from './components/AdultCare';
import ChildcareClubsList from './components/ChildcareClubsList';
import ClubDetails from './components/ClubDetails';
import Home from './Home';
import CharitiesAndGroups from './components/CharitiesAndGroups';
import CharityDetails from './components/CharityDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services-and-groups" element={<ServicesAndGroups />} />
        <Route path="/childcare" element={<Childcare />} />
        <Route path="/local-offer" element={<LocalOffer />} />
        <Route path="/adult-care" element={<AdultCareSupport />} />
        <Route path="/clubs-list" element={<ChildcareClubsList />} />
        <Route path="/club/:id" element={<ClubDetails />} />
        <Route path="/charity-groups" element={<CharitiesAndGroups />} />
        <Route path="/charities/:id" element={<CharityDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

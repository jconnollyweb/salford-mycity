import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ServicesAndGroups from './components/servicesGroups/ServicesAndGroups';
import Childcare from './components/childcare/Childcare';
import LocalOffer from './components/localOffer/LocalOffer';
import AdultCareSupport from './components/adultCare/AdultCare';
import ChildcareClubsList from './components/childcare/ChildcareClubsList';
import ClubDetails from './components/childcare/ClubDetails';
import Home from './Home';
import CharitiesAndGroups from './components/charityGroups/CharitiesAndGroups';
import CharityDetails from './components/charityGroups/CharityDetails';
import Header from './components/header/Header';
import SearchResults from './components/header/SearchResults';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';

function App() {
  return (
    <Router>
      <Header /> 
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
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

      </Routes>
    </Router>
  );
}

export default App;

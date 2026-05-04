// import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import MinistryofHealthandFamilyWelfare from './government/pages/MinistryofHealthandFamilyWelfare'
import MinistryofWomenandChildDevelopment from './government/pages/MinistryofWomenandChildDevelopment'
import MinistryofConsumerAffairsFoodandPublicDistribution from './government/pages/MinistryofConsumerAffairsFoodandPublicDistribution'
import MinistryofRailways from './government/pages/MinistryofRailways'
import MinistryofRoadTransportandHighways from './government/pages/MinistryofRoadTransportandHighways'
import LandingPage from './users/pages/LandingPage'
import UserLogin from './users/pages/UserLogin'
import UserSign from './users/pages/UserSign'
import GovtLogin from './users/pages/GovtLogin'
import GovtSign from './users/pages/GovtSign'
import CitizenDashboard from './users/pages/CitizenDashboard'
import SelectCategory from './users/pages/SelectCategory'
import RailwayDashboard from './users/pages/RailwayDashboard'
import EducationDashboard from './users/pages/EducationDashboard'
import HealthFamilyDashboard from './users/pages/HealthFamilyDashboard'
import ConsumerAffairsDashboard from './users/pages/ConsumerAffairsDashboard'
import RoadTransportDashboard from './users/pages/RoadTransportDashboard'
import WomenChildDashboard from './users/pages/WomenChildDashboard'
import EmployeeRegistrationForm from './government/pages/EmployeeRegistrationForm'
import MinistryofConsumerAffairs from './government/pages/MinistryofConsumerAffairsFoodandPublicDistribution'
import MinistryofEducation from './government/pages/MinistryofEducation'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* User side routes */}
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<LandingPage/>} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSign />} />
        <Route path="/govt/login" element={<GovtLogin />} />
        <Route path="/govt/signup" element={<GovtSign />} />
        <Route path="/user/citizendashboard" element={<CitizenDashboard />} />
        <Route path="/user/selectcategory" element={<SelectCategory />} />
        <Route path="/user/railwaydashboard" element={<RailwayDashboard />} />
        {/* Government side routes */}
        <Route path="/govt/EmployeeRegistration" element={<EmployeeRegistrationForm />} />
        <Route path="/MinistryofHealthandFamilyWelfare" element={<MinistryofHealthandFamilyWelfare />} />
        <Route path="/MinistryofEducation" element={<MinistryofEducation />} />
        <Route path="/MinistryofWomenandChildDevelopment" element={<MinistryofWomenandChildDevelopment />} />
        <Route path="/MinistryofConsumerAffairs" element={<MinistryofConsumerAffairs/>} />
        <Route path="/MinistryofRailways" element={<MinistryofRailways />} />
        <Route path="/MinistryofRoadTransportandHighways" element={<MinistryofRoadTransportandHighways />} />
        {/* user side routes */}
        <Route path="/SelectCategory" element = {<SelectCategory/>}/>
        <Route path="/RailwayDashboard" element = {<RailwayDashboard/>}/>
        <Route path="/EducationDashboard" element = {<EducationDashboard/>}/>
        <Route path="/RoadTransportDashboard" element = {<RoadTransportDashboard/>}/>
        <Route path="/ConsumerAffairsDashboard" element = {<ConsumerAffairsDashboard/>}/>
        <Route path="/HealthFamilyDashboard" element = {<HealthFamilyDashboard/>}/>
        <Route path="/WomenChildDashboard" element = {<WomenChildDashboard/>}/>
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
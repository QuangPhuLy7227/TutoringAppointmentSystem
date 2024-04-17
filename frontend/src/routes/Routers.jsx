import React from 'react';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Tutors from '../pages/Tutor/Tutors'; 
import TutorDetails from '../pages/Tutor/TutorDetails';
import MyAccount from '../Dashboard/user-account/MyAccount';
import Dashboard from '../Dashboard/tutor-account/Dashboard';

import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/tutors' element={<Tutors />} />
      <Route path='/tutors/:id' element={<TutorDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/services' element={<Services />} />
      <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['student']}><MyAccount /></ProtectedRoute>} />
      <Route path='/tutors/profile/me' element={<ProtectedRoute allowedRoles={['tutor']}><Dashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default Router
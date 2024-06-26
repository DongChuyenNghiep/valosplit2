import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Rule from './pages/rule.jsx';
import Navbar from './component/Navbar.jsx';
import Footer from './component/Footer.jsx';
import Allteam from './pages/allteam.jsx';
import SwissStage from './pages/swissstage.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Stat from './pages/stat.jsx';
import Calendar from './pages/calendar.jsx';
import Playoff from './pages/playoff.jsx';
import SignUp from './pages/signup.jsx';
import Login from './pages/signin.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
import { persistor, store } from '../redux/store.js';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from './component/PrivateRouter.jsx';
import Profile from './pages/profile.jsx';
root.render(
  <>
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route exact path='/' element={<Home />} />
    <Route path='/swissstage' element={<SwissStage />} />
    <Route path='/rule' element={<Rule />} />
    <Route path='/allteam' element={<Allteam />} />
    <Route path='/stat' element={<Stat />} />
    <Route path='/calendar' element={<Calendar />} />
    <Route path='/playoff' element={<Playoff />} />
    <Route path='/signup' element = {<SignUp />} />
    <Route path='/signin' element = {<Login/>} />
    <Route element={<PrivateRoute />} >
    <Route path='/profile' element={<Profile />} />
    </Route>
  </Routes>

    <Footer />
  </BrowserRouter>
  </PersistGate>
  </Provider>
  </>
);


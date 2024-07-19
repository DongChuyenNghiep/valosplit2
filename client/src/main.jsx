import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { persistor, store } from '../redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from './component/PrivateRouter.jsx';
import Profile from './pages/profile.jsx';
import MatchInfo from './pages/playoffmatchdata.jsx';
import MatchStatsTable from './pages/ranking.jsx';
import PlayerStat from './pages/playerstat.jsx';
import Quiz from './pages/quiz.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/valorant/stat/:ign" element={<PlayerStat />} />
            <Route exact path='/valorant' element={<Home />} />
            <Route path='/valorant/swissstage' element={<SwissStage />} />
            <Route path='/valorant/rule' element={<Rule />} />
            <Route path='/valorant/allteam' element={<Allteam />} />
            <Route path='/valorant/stat' element={<Stat />} />
            <Route path='/valorant/calendar' element={<Calendar />} />
            <Route path='/valorant/playoff' element={<Playoff />} />
            <Route path='/valorant/signup' element={<SignUp />} />
            <Route path='/valorant/signin' element={<Login />} />
            <Route path='/valorant/dataplayoff' element={<MatchInfo />} />
            <Route path='/valorant/rank' element={<MatchStatsTable />} />
            <Route path='/valorant/quiz' element={<Quiz />} />
            <Route element={<PrivateRoute />}>
              <Route path='/valorant/profile' element={<Profile />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>
);

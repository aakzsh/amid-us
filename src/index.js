import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes as Switch, Route, Link } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Team from './pages/team';
import About from './pages/about';
import Result from './pages/result';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <Header />
      <Router>
        <Switch>
          <Route exact path='/' element={<Home />} />
        </Switch>
        <Switch>
          <Route exact path='/team' element={<Team />} />
        </Switch>
        <Switch>
          <Route exact path='/about' element={<About />} />
        </Switch>
        <Switch>
          <Route exact path='/result' element={<Result />} />
        </Switch>
      </Router>
      <Footer />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

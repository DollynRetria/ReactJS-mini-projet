import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Articles from './components/Articles';
import Panier from './components/Panier';
import Footer from './components/Footer';
import DetailArticle from './components/DetailArticle';
import ErrorPage from './components/ErrorPage';

import store from './redux/store';
import { Provider } from 'react-redux';


const App = () => {
  return (
   <Provider store={store}>  
    <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article-detail/:productID" element={<DetailArticle />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
    </Router>
  </Provider>
  );
}

export default App;

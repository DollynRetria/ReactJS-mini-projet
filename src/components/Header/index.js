import React, {Fragment, useState, useEffect} from 'react';
import shopping from '../../assets/images/shopping-cart.png'
import {Link, NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Panier from '../Panier'

const Header = () => {
  const [isActiveCart, setIsActiveCart] = useState(false);
  const cart = useSelector(state => state.panier_key);

  useEffect(() => {
    cart.product.length == 0 && setIsActiveCart(false)
  }, [cart])

  return (
    <header>
        <div className="container">
            <div className="header-top">
                <div className="header-top--left">
                    <div className="header-top--left-logo">
                        <h2><Link to="/" style={{color: "#000", textDecoration: "none"}}>Logo ici</Link></h2>
                    </div>
                    <div className="header-top--left-menu">
                        <ul className="navigation">
                            <li><NavLink to="/">Accueil</NavLink></li>
                            <li><NavLink to="/articles">Articles</NavLink></li>
                            <li><NavLink to="/contactez-nous">Contactez-nous</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="header-top--right">
                    <button className="btn-cart" onClick={() => setIsActiveCart(!isActiveCart)}><span><img src={shopping} alt="cart" /></span> <span className="nombre">{cart.product.length}</span></button>
                    {isActiveCart && <Panier />}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header;

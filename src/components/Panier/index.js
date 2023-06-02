import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeToCart, removeAllCart} from '../../redux/panier/actionPanier';
import QuantityInCart from './quantityInCart';

const Panier = () => {
  let cart = useSelector(state => state.panier_key)
  const dispatch = useDispatch()

  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const cartsPerVendeur = groupByUserId(cart.product)
    setCarts([...cartsPerVendeur]);
  }, [cart]);

  //console.log(carts)

  //fonction qui regroupe le panier par vendeur
  const groupByUserId = (allProductsInCarts) => {
    let groupedItems = {};
    
    allProductsInCarts.forEach(item => {
      const vendeurId= item.id_vendeur;
      const vendeurName = item.nom_vendeur;
      const related_product = {
        id: item.id, 
        title: item.title, 
        image: item.image, 
        price: item.price, 
        quantity: item.quantity
      }
      if (!groupedItems[vendeurId]) {
        groupedItems[vendeurId] = { name: vendeurName, products: [related_product] };
      } else {
        groupedItems[vendeurId].products.push(related_product);
      }
    });
    return Object.values(groupedItems);
  }
  //end function qui regroupe le panier par vendeur

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = carts.map((element) => {
          const productPerVendeur = element.products.map((product) => {
            return product.id === productId ? { ...product, quantity: newQuantity } : product
          })
          return {name: element.name, products: [...productPerVendeur]}
    });
    setCarts(updatedProducts);
  };  


  let prixTotal = 0;
  const displayCart = carts.map((element, index) => {
    let total = 0;
    for(let i=0; i < element.products.length; i++){
      total += (element.products[i].price * element.products[i].quantity);
    }

    prixTotal += total;

    let listingProduct = element.products.map((item, index) => {
      const picture = item.image !== '' ? (
        <div className="ppvi-image">
          <img src={`https://akata-marketplace.goavana.com${item.image.url}`} alt={item.image.alt} />
        </div>
      ) : (
        <div className="ppvi-image no-image">
          No image
        </div>
      )

      const price = item.price * item.quantity;

      return (
        <div key={index}  className="product-par-vendeur-item">
          {picture}
          <div className="ppvi-infos">
            <div className="ppvi-infos-title">{item.title}</div>
            <div className="ppvi-infos-prix">Prix : {price.toLocaleString('en-US')} Ar</div>
            <QuantityInCart key={item.id} product={item} onQuantityChange={handleQuantityChange} />

            <button onClick={() => dispatch(removeToCart(item.id))} className="btn btn-danger">delete</button>
          </div>
        </div>
      )
    })

    return (
      <div key={index} className="product-par-vendeur">
          <strong>Commande auprès de: {element.name}, Total: {total.toLocaleString('en-US')} Ar </strong>
          {listingProduct}
      </div>
    )
  })

  return (
    <div className="panier-wrapper">
        {cart.product.length > 0 ? 
        <span>Montant total à payer : {prixTotal.toLocaleString('en-US')} Ar </span> :
        <span>Le panier est vide</span>
        }
        {displayCart}
        {cart.product.length > 0 && <div className="mt-2"><button onClick={() => dispatch(removeAllCart())} className="btn btn-warning">Vider le panier</button></div>}
    </div>
  )
}

export default Panier

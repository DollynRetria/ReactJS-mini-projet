import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {removeToCart} from '../../redux/panier/actionPanier';

const AnyProduct = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [toCart, setToCart] = useState(false);
    const dispatch = useDispatch();
    let cart = useSelector(state => state.panier_key)

    useEffect(() => {
        //console.log('longueur de la cart', cart.product.length);
        if(cart.product.length > 0){
            let isInCart = false
            cart.product.forEach((element, index) => {
                if(element.id === props.product.id){
                    isInCart = true;
                    setQuantity(element.quantity);
                }
            })

            isInCart ? setToCart(true) : setToCart(false)
        }else{
            setToCart(false) 
        }
    }, [cart, props.product.id])

    //console.log(toCart)

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value);
    };
    
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    
    const handleAddToCart = () => {
        const cartItem = {
            id: props.product.id, 
            title: props.product.title, 
            image: props.product.displayImage, 
            price: props.product.price, 
            id_vendeur: props.product.id_vendeur,
            nom_vendeur: props.product.nom_vendeur,
            quantity: quantity
        };
        props.onAddToCart(cartItem);
        setToCart(true);
    };
  
    const handleRemoveToCart = () => {
        dispatch(removeToCart(props.product.id));
        setToCart(false);
    }
  
    const image = props.product.displayImage === '' ? (
        <div className="img-wrapper no-image">

        </div>
    ):(
        <div className="img-wrapper with-image">
            <img src={`https://akata-marketplace.goavana.com${props.product.displayImage.url}`} alt={props.product.displayImage.alt} />
        </div>
    )
  
    const pricePerQuantity = props.product.price * (isNaN(parseInt(quantity, 10)) ? 1 : parseInt(quantity, 10));

    const button = toCart === false ? 
        (<button className="btn btn-success" onClick={handleAddToCart}>Ajouter au panier</button>) :
        (<button className="btn btn-warning" onClick={handleRemoveToCart}>Retirer du panier</button>)
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    {image}
                </div>
                <div className="col-8">
                    <h5 className="card-title mb-2">{props.product.title}</h5>
                    <p className="card-text mb-2">{props.product.description}</p>
                    <div className="price-and-action">
                      <div className="price mb-2">Prix : {pricePerQuantity.toLocaleString('en-US')} Ar</div>
                      <div className="action">
                          <button className="btn btn-action-min" onClick={handleDecrement}>-</button>
                          <input className="form-control" type="text" id="quantity" name="quantity" value={isNaN(parseInt(quantity, 10)) ? 1 : parseInt(quantity, 10)} onChange={handleInputChange} />
                          <button className="btn btn-action-max" onClick={handleIncrement}>+</button>
                      </div>
                      <div className="add-to-cart-btn">
                        {button}
                      </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default AnyProduct

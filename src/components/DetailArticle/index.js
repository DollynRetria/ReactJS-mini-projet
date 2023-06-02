import React, {useState, useEffect } from 'react'
import AnyProduct from './AnyProduct'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { loadApiArticles, loadArticlesSuccess, loadArticlesError} from '../../redux/articles/actionArticles'
import { addToCart, removeToCart } from '../../redux/panier/actionPanier';

const DetailArticle = (props) => {
  const { productID } = useParams();
  const dispatch = useDispatch();
  //const apiData = useSelector(state => state.article_key );
  const [productData, setProductData] = useState([]);
  // const article = apiData.articles.filter(product => product.id == productID);
  // console.log(article);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let article = JSON.parse(
          localStorage.getItem(`product_${productID}`)
        );
        if (article) {
          setProductData([article]);
        } else {
          const res = await axios.get('https://akata-marketplace.goavana.com/products?_start=0&_limit=10&_sort=created_at:desc');
          const data = res.data.filter(product => product.id == productID)
          if (data.length > 0) {
            localStorage.setItem(
              `product_${productID}`,
              JSON.stringify(data[0])
            );
            setProductData([data[0]]);
          } else {
            console.error(`Cannot find product with ID ${productID}`);
          }
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [productID]);

  const addToCartItem = (object) => {
    dispatch(addToCart(object))
  }

  const details = productData.length > 0 ? (
    (() => {
      let id = productData[0].id;
      let displayImage = productData[0].image == null ? '' : { url: productData[0].image.url, alt: productData[0].image.alternativeText };
      let title = productData[0].title;
      let description = productData[0].description;
      let price = productData[0].price;
      let id_vendeur = productData[0].users_id.id;
      let nom_vendeur = productData[0].users_id.name;
      let product = {
        id,
        displayImage,
        title,
        description,
        price,
        id_vendeur,
        nom_vendeur
      }
      return (
        <AnyProduct
          product={product}
          onAddToCart={addToCartItem}
        />
      );
    })()
  ) : (
    <p>...loading-more</p>
  )
  // console.log(product)
  return (
     <div className="article-details-wrapper">{details}</div>    
  )
}

export default DetailArticle

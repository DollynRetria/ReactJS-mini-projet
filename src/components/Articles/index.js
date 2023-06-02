import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import {Link, NavLink} from 'react-router-dom';
import ProductItem from './ProductItem';
//import {connect} from 'react-redux'
import {useSelector, useDispatch} from 'react-redux';
//import { apiCall } from '../../redux/articles/actionArticles'
import { loadApiArticles, loadArticlesSuccess, loadArticlesError} from '../../redux/articles/actionArticles'
import { addToCart } from '../../redux/panier/actionPanier'

const Articles = (props) => {
    const apiData = useSelector(state => state.article_key )
    //const cartdata = useSelector(state => state.panier_key)
    const dispatch = useDispatch()

    useEffect(() => {
        const apiCall = async () => {
            dispatch(loadApiArticles())
            try{
                const res = await axios.get('https://akata-marketplace.goavana.com/products?_start=0&_limit=10&_sort=created_at:desc');
                await dispatch(loadArticlesSuccess(res.data));
            } catch (err) {
                dispatch(loadArticlesError(err.message))
            }
        }
        apiCall()
    }, [dispatch])

    const addToCartItem = (object) => {
        //console.log('data mitovy', object);
        dispatch(addToCart(object))
    }

    const displayApiData = apiData.isLoading ? (
        <p>Loading ...</p>
    ) : apiData.error ? (
        <p>{apiData.error}</p>
    ) : (
    apiData.articles.map( (article, index) => {
            let id = article.id;
            let displayImage = article.image == null ? '' : {url: article.image.url, alt: article.image.arternativeText}
            let title = article.title;
            let description = article.description;
            let price = article.price;
            //let allData = article;
            let id_vendeur = article.users_id.id;
            let nom_vendeur = article.users_id.name;

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
                <ProductItem 
                    key={index}
                    product={product}
                    onAddToCart={addToCartItem}
                />
            )
        })
    )
    
  return (
    <div className="articles-wrapper mb-3">
        <div className="container">
            <div className="row">
                <div className="col-12"><h2>Tous les articles disponibles</h2></div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                {displayApiData}
            </div>
        </div>
    </div>
  )
}

export default Articles

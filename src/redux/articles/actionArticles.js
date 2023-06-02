import axios from 'axios'
import {LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_ERROR} from './type';

export const loadApiArticles = () => {
    return {
        type: LOAD_ARTICLES
    }
}

export const loadArticlesSuccess = articles => {
    return {
        type: LOAD_ARTICLES_SUCCESS,
        payload: articles
    }
}

export const loadArticlesError = error => {
    return {
        type: LOAD_ARTICLES_ERROR,
        payload: error
    }
}


export const apiCall = async (dispatch) => {
    dispatch(loadApiArticles())
    
    try{
        const res = await axios.get('https://akata-marketplace.goavana.com/products?_start=0&_limit=10&_sort=created_at:desc');
        dispatch(loadArticlesSuccess(res.data));
    } catch (err) {
        dispatch(loadArticlesError(err.message))
    }
}
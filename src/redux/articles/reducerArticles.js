import {LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_ERROR} from './type';

const initialStateArticles = {
    isLoading: false, 
    articles: [],
    error: ''
}

const articleReducer = (state = initialStateArticles, action) => {
    switch(action.type){
        case LOAD_ARTICLES:
            return {
                ...state, 
                isLoading: true
            }

        case LOAD_ARTICLES_SUCCESS:
            return {
                ...state, 
                isLoading: false, 
                articles: action.payload,
            }
        
        case LOAD_ARTICLES_ERROR:
            return {
                ...state, 
                isLoading: false, 
                articles: [],
                error: action.payload
            }
        
        default: return state
    }
}

export default articleReducer
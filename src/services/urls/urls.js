import axios from "axios";
export const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const imgBaseURL = "https://upskilling-egypt.com:3006";

export const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: localStorage.getItem("token")}
});
// Users URLS
export const USERS_URLS ={
    LOGIN : `/Users/Login`,
    FORGER_REQUEST : `/Users/Reset/Request`,
    RESET_PASS : `/Users/Reset`,
    GET_USER: (id) => `/Users${id}`,
    REGISTER : `/Users/Register`,
   GET_USERS_LIST : `/Users`,
   DELETE_USER: (id) => `/Users/${id}`,
   VERIFY : `/Users/Verify`
    
};
// CATEGORY_ URLS
export const CATEGORY_URLS = {
    GET_CATEGORIES : "/Category/",
    DELETE_CATEGORy: (id) => `/Category/${id}`,
    POST_CATEGORY : "/Category/",
    UPDATE_CATEGORy: (id) => `/Category/${id}`,
}
// RECIPES_ URLS
export const RECIPES_URLS = {
    GET_RECIPES : "/Recipe/",
    DELETE_RECIPE: (id) => `/Recipe/${id}`,
    POST_RECIPE : "/Recipe/",
    GET_RECIPE: (recipeId) => `/Recipe/${recipeId}`,
    UPDATE_RECIPE: (recipeId) => `/Recipe/${recipeId}`,
}

// TAGS_ URLS
export const TAGS_URLS = {
    GET_TAGS : `/tag/`,
    
}
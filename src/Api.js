import axios from "axios"
import CryptoJS from "crypto-js"

const CONSUMER_KEY = "ck_8516967a0140892c0939dddcdb4353d7f9c0ec9b"
const CONSUMER_SECRET = "cs_a4652153db2d2682ab098f77321ee52500c90a8a"
const PROJECT_URL = "http://headless-cms.local/"
const API_URL = PROJECT_URL + "wp-json/wc/v3"

// Function to generate OAuth signature
const generateOAuthSignature = (url, method = 'GET', params = {}) => {
  const nonce = Math.random().toString(36).substring(2);
  const timestamp = Math.floor(Date.now() / 1000);

  const oauthParams = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_version: '1.0',
  };

  const allParams = { ...oauthParams, ...params };

  const paramString = Object.keys(allParams)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
    .join('&');

  const baseUrl = url.split('?')[0]; // Ensure no query params in the base URL
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(paramString)}`;
  const signingKey = `${encodeURIComponent(CONSUMER_SECRET)}&`;

  const signature = CryptoJS.HmacSHA1(baseString, signingKey).toString(CryptoJS.enc.Base64);

  return { ...oauthParams, oauth_signature: encodeURIComponent(signature) };
};

const api = axios.create({
    baseURL: API_URL
})


// Get all products

export const getAllProducts = async() => {
    
    try {

        const url = `${API_URL}/products`
        const oauthParams = generateOAuthSignature(url)
        const response = await api.get("/products", {
            params: oauthParams
        })

        return response.data

    } catch(error) {
        console.log(error)
    }
}

// Read single product data by id

export const getSingleProductData = async(productID) => {

    try{

        const url = `${API_URL}/products/${productID}`
        const oauthParams = generateOAuthSignature(url)
        const response = await api.get(`/products/${productID}`, {
            params: oauthParams
        })

        return response.data

    } catch(error) {
        console.log(error)
    }
}
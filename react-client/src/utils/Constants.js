const API_BASE_URL_DEVELOPMENT ='https://localhost:44333/api';
const API_BASE_URL_PRODUCTION = 'https://trainingreactnet420.azurewebsites.net';

const ENDPOINTS = {
    GET_ALL_PRODUCTS: 'product/products',
    GET_PRODUCT_BY_ID: 'product/product-by-id',
    CLEAN_CART: 'product/clean-cart',
    ADD_TO_CART: 'product/add-to-cart',
    GET_CART: 'product/get-cart',
    REMOVE_FROM_CART: 'product/remove-from-cart',
    REMOVE_ONE_FROM_CART: 'product/remove-one-from-cart',
    GET_USER: 'product/get-user',    
    CREATE_PRODUCT: 'product/add-product',
    UPDATE_PRODUCT: 'product/update-product',
    DELETE_PRODUCT: 'product/delete-product',
    FIND_PRODUCT_BY_NAME: 'product/find-product',
    FIND_PRODUCT_BY_CATEGORY: 'product/find-product-by-category',
    FIND_PRODUCT_BY_PRICE: 'product/find-product-by-price',
    FIND_PRODUCT_BY_PARAMS: 'product/find-product-by-params',
    REGISTER_USER: 'login/register-user',
    REGISTER_ADMIN: 'login/register-admin',
    LOGIN_USER: 'login/login',
    LOGOUT_USER: 'login/logout',
    SHOW_USER: 'login/show-user',
    SHOW_ADMIN: 'login/show-admin',
    SHOW_ANON: 'login/show-anon',
    CHECK_USER: 'login/check-user',
    UPDATE_USER: 'login/update-user',
    DELETE_USER: 'login/delete-user'
};

const development = {
    API_URL_GET_ALL_PRODUCTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL_PRODUCTS}`,
    API_URL_GET_PRODUCT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_PRODUCT_BY_ID}`,
    API_URL_CLEAN_CART: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CLEAN_CART}`,
    API_URL_ADD_TO_CART: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.ADD_TO_CART}`,
    API_URL_GET_CART: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_CART}`,
    API_URL_REMOVE_FROM_CART: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.REMOVE_FROM_CART}`,
    API_URL_REMOVE_ONE_FROM_CART: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.REMOVE_ONE_FROM_CART}`,
    API_URL_GET_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_USER}`,
    API_URL_CREATE_PRODUCT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_PRODUCT}`,
    API_URL_UPDATE_PRODUCT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_PRODUCT}`,
    API_URL_DELETE_PRODUCT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_PRODUCT}`,
    API_URL_FIND_PRODUCT_BY_NAME: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.FIND_PRODUCT_BY_NAME}`,
    API_URL_FIND_PRODUCT_BY_CATEGORY: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.FIND_PRODUCT_BY_CATEGORY}`,
    API_URL_FIND_PRODUCT_BY_PRICE: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.FIND_PRODUCT_BY_PRICE}`,
    API_URL_FIND_PRODUCT_BY_PARAMS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.FIND_PRODUCT_BY_PARAMS}`,
    API_URL_REGISTER_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.REGISTER_USER}`,
    API_URL_REGISTER_ADMIN: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.REGISTER_ADMIN}`,
    API_URL_LOGIN_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.LOGIN_USER}`,
    API_URL_LOGOUT_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.LOGOUT_USER}`,
    API_URL_SHOW_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.SHOW_USER}`,
    API_URL_SHOW_ADMIN: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.SHOW_ADMIN}`,
    API_URL_SHOW_ANON: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.SHOW_ANON}`,
    API_URL_CHECK_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CHECK_USER}`,
    API_URL_UPDATE_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_USER}`,
    API_URL_DELETE_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_USER}`
};

const production = {
    API_URL_GET_ALL_PRODUCTS: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_ALL_PRODUCTS}`,
    API_URL_GET_PRODUCT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_PRODUCT_BY_ID}`,
    API_URL_CLEAN_CART: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.CLEAN_CART}`,
    API_URL_ADD_TO_CART: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.ADD_TO_CART}`,
    API_URL_GET_CART: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_CART}`,
    API_URL_REMOVE_FROM_CART: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.REMOVE_FROM_CART}`,
    API_URL_REMOVE_ONE_FROM_CART: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.REMOVE_ONE_FROM_CART}`,
    API_URL_GET_USER: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_USER}`,
    API_URL_CREATE_PRODUCT: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.CREATE_PRODUCT}`,
    API_URL_UPDATE_PRODUCT: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.UPDATE_PRODUCT}`,
    API_URL_DELETE_PRODUCT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.DELETE_PRODUCT}`,
    API_URL_FIND_PRODUCT_BY_NAME: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.FIND_PRODUCT_BY_NAME}`,
    API_URL_FIND_PRODUCT_BY_CATEGORY: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.FIND_PRODUCT_BY_CATEGORY}`,
    API_URL_FIND_PRODUCT_BY_PRICE: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.FIND_PRODUCT_BY_PRICE}`,
    API_URL_FIND_PRODUCT_BY_PARAMS: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.FIND_PRODUCT_BY_PARAMS}`,
    API_URL_REGISTER_USER: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.REGISTER_USER}`,
    API_URL_REGISTER_ADMIN: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.REGISTER_ADMIN}`,
    API_URL_LOGIN_USER: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.LOGIN_USER}`,
    API_URL_LOGOUT_USER: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.LOGOUT_USER}`,
    API_URL_SHOW_USER: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.SHOW_USER}`,
    API_URL_SHOW_ADMIN: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.SHOW_ADMIN}`,
    API_URL_SHOW_ANON: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.SHOW_ANON}`,
    API_URL_CHECK_USER: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.CHECK_USER}`,
    API_URL_UPDATE_USER: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.UPDATE_USER}`,
    API_URL_DELETE_USER: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.DELETE_USER}`
};

const Constants = process.env.NODE_ENV === 'development' ? development : production;

export default Constants;

/*!
 * Module: cookie
 * Version: 1.1
 * Copyright: Copyright(c) 2024 Fosztó Zsolt
 * Licens: MIT Licensed
 */

'use strict';

/**
 * Module cookie.
 * @public
 * 
 * @returns {object} Cookie functions
 * @module Cookie
 */

const Cookie = () => {
    let cookie = {};

/**
 * -Init cookies
 * -Sets the "privat" cookie object. 
 * 
 */

    function init(){
        cookie = {};
        let cookies = document.cookie.split('; ');
        for (const cook of cookies)    
            if (cook.length > 0){
                const cookieItem = cook.split('=');
                cookie[cookieItem[0]] = cookieItem[1];
            }
    }

    init();

/**
 * Sets a cookie, on expiration time, and on valid path.
 * 
 * @param {string} key - Data key
 * @param {string} val - Data value
 * @param {number} expires - Number of days
 * @param {string} path - Path of cookie. The cookie will be valid on this path.
 */

    const setItem = (key, val, expires = 30, path = '/') => {
        const d = new Date(Date.now() + (1000 * 60 * 60 * 24 * expires));
        document.cookie = `${key}=${val}; expires=${d.toUTCString()}; path=${path}`;

        cookie[key] = val;
    };

/**
 * -Returns the value associated with the key
 * 
 * @param {string} key - Cookie item key
 * @returns {string}
 */
    const getItem = key => cookie[key];

    const removeItem = key => {
        document.cookie = `${key}=; expires=${new Date(0).toUTCString()}; path=/`;
        
        init(); // Reset the cookie params.
        /*
            Not with the "delete cookie" command, because if the deletion was not successful, 
            the original state must be restored anyway.
        */
    }
/**
 * 
 * @returns {array} All cookie names.
 */
    const keys = () => Object.keys(cookie);

/**
 * Remove/delete all cookies
 */
    const clear = () =>{
        for (const key of keys())
            removeItem(key);
    }
/**
 * 
 * @returns {object} {key: value...} - All cookies 
 */
    const getCookies = () => Object.assign({}, cookie);

/* ********************PUBLIC INTERFACE******************** */
    return {
        setItem, getItem, removeItem, clear, keys, getCookies
    }
}

/**
 * 
 * @object Cookie
 */

const cookie = Cookie();




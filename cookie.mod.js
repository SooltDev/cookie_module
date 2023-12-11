
/*!
 * Module: cookie
 * Version: 2.3
 * Copyright: Copyright(c) 2023. december Fosztó Zsolt
 * Licens: MIT Licensed
 */

"use strict";

/**
 * Module cookie.
 * @public module
 * 
 * @returns {object} Cookie functions
 * @module Cookie
 */

const Cookie = function(){

    let created = false;
    const version = '2.3';

    return (options = {}) => {

        if (created)
            return new Error("The cookie manager has already been created.");

        let cookie = {};
        const tsPrefix = '_ts_';

        options = Object.assign({
            //If saveExpires true, Cookie module manage expiration date
            saveExpires: true 
        }, options);

    /**
     * - Generate timestap id to cooki name
     * @param {string} key 
     * @returns {string}
     * @private private function
     */
        const tsKey = key => tsPrefix + key;
    /**
     * 
     * @param {string} key cookie name
     * @returns {boolean} true, if cookie name is timestamp key
     */
        const isTsKey = key => key.slice(0, tsPrefix.length) == tsPrefix;

    /**
     * - Init cookies
     * - Sets the "privat" cookie object. 
     * @private
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
     * - Sets a cookie, on expiration time, and on valid path.
     * 
     * @param {object} params property
     * @param {string} params.key cookie name
     * @param {string} params.val cookie value
     * @param {number} [params.expires] - Number of days - default value: 30
     * @param {string} [params.path]  - Path of cookie. The cookie will be valid on this path.
     * @param {string} [params.samesite] - SameSite attributes
     */

        const setItem = (params) => {
            if (!isTsKey(params.key)){
                params = Object.assign({
                    expires: 30,
                    path: '/',
                    samesite: 'lax'
                },params);

                const d = new Date(Date.now() + (1000 * 60 * 60 * 24 * params.expires));

                document.cookie = `${params.key}=${params.val}; expires=${d.toUTCString()}; SameSite=${params.samesite}; path=${params.path}`;
                cookie[params.key] = params.val;

                //Saves the expiration date(timestamp) to manage it.
                if (options.saveExpires){
                    document.cookie = `${tsKey(params.key)}=${d.getTime()}; expires=${d.toUTCString()}; SameSite=strict; path=${params.path}`;
                    cookie[tsKey(params.key)] = d.getTime();
                }
            }
        };

        const setCookie = (key, val, expires = 30, path = '/') => {
            setItem({
                key, val, expires, path
            });
        }

    /**
     * - Returns the value associated with the key
     * 
     * @param {string} key - Cookie item key
     * @returns {string}
     */
        const getItem = key => 
            !isTsKey(key) && cookie[key] ? cookie[key] : undefined;

        const getCookie = key => getItem(key);

    /**
     * - Returns the number of days remaining.
     * 
     * @param {string} key cookie name
     * @returns {number} days number
     */
        const remainingDays = key => {
            if (cookie[tsKey(key)]){
                const now = new Date().getTime();
                const expires = new Date(Number(cookie[tsKey(key)])).getTime();

                return Number(((expires - now) / (1000 * 60 * 60 * 24)).toFixed(2));
            }
            console.warn('Time management is not set, or This cookie was not created with the cookie manager module.\nPlease set the "saveExpires" parameter when initializing the Cookie app.');
            return undefined;
        }

    /**
     * - Remove the cookie associated with the "key" key. 
     * 
     * @param {string} key 
     */
        const removeItem = key => {
            document.cookie = `${key}=; expires=${new Date(0).toUTCString()}; path=/`;
            document.cookie = `${tsKey(key)}=; expires=${new Date(0).toUTCString()}; path=/`;

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
        const keys = () =>{
            const ret = [];
            for (const key in cookie){
                if (!isTsKey(key))
                    ret.push(key);
            }
            
            return ret;
        } 


    /**
     * Remove/delete all cookies
     */
        const clear = () =>{
            for (const key of keys())
                removeItem(key);
        }
    /**
     * 
     * @returns {object} {key: {value, expirationDays}} - All cookies 
     */
        const getCookies = () => {
            const cooks = {};

            for (const key of keys())
                cooks[key] = {
                    value: cookie[key],
                    expirationDays: remainingDays(key)
                };

            return cooks;
        }

        created = true;

    /* ********************PUBLIC INTERFACE******************** */

        const publicInterface = {
            setItem, getItem, removeItem, clear, keys, getCookies, remainingDays, setCookie, getCookie,
            get version(){
                return version;
            }
        };

        return publicInterface;
    }
}();



# module Cookie

Use the cookie module to easily manage the cookies belonging to your site. 

Cookie management in the browser is difficult, as it stores all data in a single string. In addition, we do not have the option of querying the expiration date of cookies. 

The Cookie module offers a simple solution for managing them.

 - such as the:
    - Create new cookies from parameters
    - Query based on cookie key.
    - Querying the cookie expiration time.
    - Cookie object query that contains the key-value pairs, together with the expiration time
    - . . .

## Usage
Download `cookie.mod.js`, and paste the html snippet, into the head section.

````html
<script src="path/cookie.mod.js"></script>
````
or
````html
<script src="path/cookie.mod.min.js"></script>
````
The cookie module can be started with the javascript code below.
``````javascript
const cookie = Cookie({
    saveExpires: true
});
``````
### Methods:

### setItem
Sets a cookie, on expiration time, and on valid path.
````javascript
cookie.setItem({
    key: 'username',
    val: 'anonym',
    expires: 30, //dayNumbers, optional
    path: '/',// optional
    samesite: 'lax'
});
````
- `params:object`
    * `key:string` - Data key
    * `val:string` - Data value
    * `[expires]:number` - (Optional) Number of days 
        - defalut value: 30
    * `[path]:string` - (Optional )Path of cookie. The cookie will be valid on this path.
        - default value '/'
    * `[samesite]:string` - "SameSite" - attribute 
        - default value: 'lax'
___

### setCookie
Sets a cookie, on expiration time, and on valid path.
````javascript
cookie.setCookie(key, value, expires?, path?);
````
 * `key:string` - Data key
 * `val:string` - Data value
 * `[expires]:number` - (Optional) Number of days 
    - defalut value: 30
 * `[path]:string` - (Optional )Path of cookie. The cookie will be valid on this path.
    - default value '/'
___
### getItem
Returns the value associated with the key
````javascript
cookie.getItem(key);
````
- `key:string`: cookie name (cookie key)
- `return`: - cookie value
___
### getCookie
Alias for "getItem".
````javascript
cookie.getCookie(key);
````
___
### removeItem
Remove the cookie associated with the "key" key. 
````javascript
cookie.removeItem(key);
````
- `key:string`: cookie name
___
### getCookies
Returns the value associated with the key
````javascript
cookie.getCookies();
````
- `return:object` - Returns with all the cookies.
````javascript
//return example
    {
        user: {
            value: "anonym",
            expirationDays: 30
        },
        token: {
            value: "jshdf876sjdf9-0lkj"
            expieationDay: 30
        }
        .
        .
        .
    }
````
___
### clear
Remove/delete all cookies
````javascript
cookie.clear();
````

___
### keys
Returns with all cookies names.
````javascript
cookie.keys();
````
- `return:array` - Returns with all cookie names.

___
### remainingDays
Returns the number of days remaining.
````javascript
cookie.remainingDays(key);
````
- `key:string` - cookie name
- `return:number` - remaining days.

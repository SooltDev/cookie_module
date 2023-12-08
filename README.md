# module Cookie

Use the cookie module to easily manage the cookies belonging to your site. 



## Usage

### Methods:

### setItem
Sets a cookie, on expiration time, and on valid path.
````javascript
cookie.setItem(key, value, expires?, path?);
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
___
- `return`: cookie value

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
___
- `return:object`: Returns with all the cookies.

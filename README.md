# Product Management Inventory

This is a simple product for project management inventory system. This is the backend of this site. In this backend, the data are provided to the client site using api.

## The server side overview

- In this server side, there are two collection, name User collection and Product collection.
- The user are kept on the user collection. It allow to change the user role.
- The product collection used to curd operation of product.

## Technology used

- Node JS
- Express JS
- MongoDB
- Heroku

### The api link are given below

Root api link: Server link: [api_link] (https://serene-fortress-92200.herokuapp.com/)
<br>

Post a user api link : https://serene-fortress-92200.herokuapp.com/users
<br>
Get all user api link : https://serene-fortress-92200.herokuapp.com/users
<br>
Get a single user by email: https://serene-fortress-92200.herokuapp.com/users/email
<br>
Get all product: https://serene-fortress-92200.herokuapp.com/products
<br>
Get a single product by id: https://serene-fortress-92200.herokuapp.com/products/id
<br>
Update product by id : https://serene-fortress-92200.herokuapp.com/products/id

- you must need to send product information to body.

<br>
Delete a product form database : https://serene-fortress-92200.herokuapp.com/products/id
<br>
Get product by specific user using query email.
Ex: https://serene-fortress-92200.herokuapp.com/user-products?email=bappy@gmail.com
<br>
Make admin link: https://serene-fortress-92200.herokuapp.com/admin/email


# Flat Rock Technology Frontend Test 
The task is split into different levels of complexity listed below:

Stage I
- Complete Design of Product Listing Page (commonly referred as PLP) and Product Details Page (PDP).
- Tab filter for product category as well as brand filter and sort by functionality – All filtering/sorting functionalities should be done on the client side.
- Correctly manage product stock while adding items to cart from product detail page – design of toast messages up to you.
- Keep in mind that if item has available option, it means that selection is mandatory.
- Cart dropdown without item qty management – design of empty cart up to you (should correspond to the general UI of application).
- Each option is basically a different item i.e if I have same item but with different options, I should see two different entries in the cart dropdown.

Stage II
- Price Filter for PLP
- Qty management from cart dropdown
- Quick add to cart functionality – Cart Icon on each product cart on the PLP, is a functionality which allows user to add item to cart without need to move to the PDP.
- In such case we have two UX – if an item does not have any options, we directly add item to cart
- If options are present, we need to display modal which will allow user to select required option after which item will be added to cart. (modal design is up to you)

Stage III
- Checkout functionality
- Implement page which would have simple input fields (Name, surname, phone number, email, zip code) with proper validation.
- Send user data with item data (including amount and selected options) to the /checkout endpoint
- Handle response from the API and redirect/ask user to resubmit.



## Deployment

To run this project run

```bash
  npm run dev
```

Use node version 22.17.0

## Authors

- Jason Francisco Gonzalez Garcia [LinkedIn](https://www.linkedin.com/in/jason-gonzalez-garcia/)


# Product Management API

This is a simple API for managing products and images. It allows you to add products with associated images, retrieve products with their images, and delete products.

## Getting Started

To run the API locally, follow these instructions:

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies by running: ```npm install```


### Environment Variables

Create a `.env` file in the root directory of the project and set the following environment variables:

```DATABASE=leading-tech``` <br>
```USER=root``` <br>
```PASS=your_password``` <br>
```HOST=localhost``` <br>
```DILACT=mysql``` <br>

```JWT_CODE=your_secret_jwt_code``` <br>


Replace `your_password` and `your_secret_jwt_code` with your actual database password and JWT secret code.

### Running the Server

Run the server using the following command: ```npm run server```

The API will start running on port 4500.

## Endpoints

### GET /products

Retrieve a list of products along with their associated images.

### POST /products

Add a new product with associated images. Use the request body to provide product details and image URLs.

Example Request Body:
```json
{
  "name": "Product Name",
  "SKU": "ABC123",
  "images": ["url1.jpg", "url2.jpg"]
}
```

### GET /products/:productId

Retrieve a specific product by its ID along with its associated images.

### DELETE /products/:productId

Delete a product by its ID. This will also delete associated images.



# Vegan Fresh Backend API

Complete MERN backend for an organic vegetables e-commerce platform.

## Features
- User Authentication (JWT)
- Product Management
- Shopping Cart
- Order Processing
- Payment Integration (Stripe)
- Image Upload (Cloudinary)
- Admin Dashboard
- Blog System
- Coupon Management

## Tech Stack
- **Runtime:** Node.js v24
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT + bcrypt
- **Payments:** Stripe
- **Image Upload:** Cloudinary
- **Email:** SendGrid
- **Rate Limiting:** express-rate-limit

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and configure the required environment variables using your own credentials.

Example `.env.example`:

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
NODE_ENV=development
STRIPE_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
SENDGRID_API_KEY=
```

**Security note:** Never commit your actual `.env` file, API keys, database credentials, or JWT secrets to GitHub. Add `.env` to your `.gitignore` file.

## Running the Server

```bash
node server.js
```

Server runs at:

`http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register a user
- `POST /api/auth/login` — Log in a user

### Products
- `GET /api/products` — Get all products
- `GET /api/products/:id` — Get a product by ID
- `POST /api/products` — Create a product (admin)

### Cart
- `GET /api/cart` — Get the user's cart
- `POST /api/cart/add` — Add an item to the cart
- `PUT /api/cart/update/:itemId` — Update a cart item
- `DELETE /api/cart/remove/:itemId` — Remove an item from the cart

### Orders
- `POST /api/orders` — Create an order
- `GET /api/orders` — Get the user's orders
- `GET /api/orders/:id` — Get order details

### Payments
- `POST /api/payments/create-intent` — Create a Stripe payment intent
- `POST /api/payments/confirm` — Confirm a payment

### Admin
- `GET /api/admin/dashboard` — Retrieve dashboard statistics
- `GET /api/admin/users` — Retrieve all users
- `GET /api/admin/orders` — Retrieve all orders

## Postman Collection

Import `postman-collection.json` into Postman to test the API endpoints.

## Deployment

This project can be deployed to Render or another compatible hosting platform.

Before deployment, configure the required environment variables in the hosting provider's dashboard.

## Author

**Ayesha Nazish**  
MERN Backend Lead

## License

MIT

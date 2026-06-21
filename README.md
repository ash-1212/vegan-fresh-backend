# Vegan Fresh Backend API

Complete MERN backend for organic vegetables e-commerce platform.

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

Create `.env` file:
PORT=5000

MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/veganfresh

JWT_SECRET=your_jwt_secret

NODE_ENV=development

STRIPE_SECRET_KEY=sk_test_xxx

CLOUDINARY_CLOUD_NAME=xxx

SENDGRID_API_KEY=SG.xxx

## Running

```bash
node server.js
```

Server runs on: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment
- `POST /api/payments/confirm` - Confirm payment

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - All users
- `GET /api/admin/orders` - All orders

## Postman Collection

Import `postman-collection.json` into Postman for testing.

## Deployment

Deploy to Render:
```bash
git push origin main
```

## Author

Ayesh Nazish - MERN Backend Lead

## License

MIT
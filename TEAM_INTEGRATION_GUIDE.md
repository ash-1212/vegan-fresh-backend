# Vegan Fresh Backend - Team Integration Guide

## Backend API is READY ✅

### Base URL
http://localhost:5000/api

### Authentication
All protected endpoints require JWT token:
Header: Authorization: Bearer <your_token>

### Get Token
POST /api/auth/register

Body: { "name": "Test", "email": "test@example.com", "password": "pass123" }
POST /api/auth/login

Body: { "email": "test@example.com", "password": "pass123" }
Response: { "token": "eyJhbGc..." }

### Core Endpoints

#### Products
- GET /api/products - List all
- GET /api/products/:id - Single product
- POST /api/products - Create (admin)

#### Cart
- GET /api/cart - Get user cart
- POST /api/cart/add - Add item
- PUT /api/cart/update/:itemId - Update
- DELETE /api/cart/remove/:itemId - Remove

#### Orders
- POST /api/orders - Create order
- GET /api/orders - User orders
- GET /api/orders/:id - Order detail

#### Users
- GET /api/users/profile - User profile
- POST /api/users/favorites/:productId - Add favorite
- GET /api/users/favorites - Get favorites

### Postman Collection
Import: `postman-collection.json`

### Socket.io Events
```javascript
// Frontend
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

// Join user room
socket.emit('join-user', userId);

// Listen for order updates
socket.on('order-updated', (data) => {
  console.log('Order status:', data.status);
});

// Track order
socket.emit('track-order', orderId);
socket.on('tracking-data', (data) => {
  console.log('Location:', data.currentLocation);
});
```

### Common Issues & Solutions

**CORS Error?**
- Backend CORS is enabled for all origins
- Make sure you're using correct base URL

**Auth Token Expired?**
- Token expires in 7 days
- Re-login to get new token
- Include token in Authorization header

**Socket.io Not Connecting?**
- Make sure server is running
- Check if client is using correct URL
- Check browser console for errors

---

## Questions? Ask backend team!
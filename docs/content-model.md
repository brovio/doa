# Content Model

## Overview
This document defines the content structure and data models for the application.

## Core Entities

### User
```
- id: string (UUID)
- email: string (unique)
- firstName: string
- lastName: string
- role: enum (user, admin)
- createdAt: datetime
- updatedAt: datetime
- lastLogin: datetime
```

### Product
```
- id: string (UUID)
- name: string
- description: string
- price: number
- currency: string (default: USD)
- images: array of strings (image URLs)
- category: string
- tags: array of strings
- isActive: boolean
- createdAt: datetime
- updatedAt: datetime
```

### Order
```
- id: string (UUID)
- userId: string (foreign key to User)
- items: array of OrderItem
- total: number
- status: enum (pending, processing, shipped, delivered, cancelled)
- shippingAddress: Address object
- billingAddress: Address object
- paymentMethod: string
- createdAt: datetime
- updatedAt: datetime
```

### OrderItem
```
- productId: string (foreign key to Product)
- quantity: number
- price: number (at time of order)
```

### Address
```
- street: string
- city: string
- state: string
- postalCode: string
- country: string
```

## Content Relationships
- Users can have multiple Orders
- Orders contain multiple OrderItems
- OrderItems reference Products
- Products can belong to multiple categories
- Users can have multiple Addresses

## Memory Bank Entry
This content model should guide database schema design and API endpoint structure.
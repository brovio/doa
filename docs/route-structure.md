# Route Structure

## Overview
This document defines the application's route structure and navigation patterns.

## Base Routes
```
/                    - Home/Landing page
/about               - About page
/products            - Products listing
/products/:id        - Individual product detail
/services            - Services page
/contact             - Contact page
/dashboard           - User dashboard (authenticated)
/admin               - Admin panel (authenticated, admin only)
```

## Route Hierarchy
```
Public Routes:
├── /                 (Home)
├── /about            (About)
├── /products         (Products List)
│   └── /products/:id (Product Detail)
├── /services         (Services)
└── /contact          (Contact)

Authenticated Routes:
├── /dashboard        (User Dashboard)
│   ├── /dashboard/profile     (User Profile)
│   ├── /dashboard/settings    (User Settings)
│   └── /dashboard/orders      (Order History)
└── /admin            (Admin Panel)
    ├── /admin/users           (User Management)
    ├── /admin/products        (Product Management)
    └── /admin/analytics       (Analytics)
```

## Route Parameters
- `:id` - Resource identifier for dynamic routes
- Query parameters for filtering, sorting, and pagination

## Route Protection
- Public routes: Accessible to all users
- Authenticated routes: Require user authentication
- Admin routes: Require admin privileges

## Memory Bank Entry
This route structure should be referenced when implementing navigation components and server-side routing.
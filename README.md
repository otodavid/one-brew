# One Brew
## 👋 Introduction
One Brew is a full-stack coffee e-commerce application that provides a seamless shopping experience for coffee enthusiasts. The platform allows users to browse a rich collection of coffee products, manage their carts, and make purchases with an account.

This repository includes the client-side application and backend server, with plans for an admin dashboard currently in development.

## 🌟 Features
<ins>Client-Side</ins>:
- Dynamic Cart Management:
  - Local storage persists cart data for guests.
  - Signed-in users' cart merges guest cart data with their database cart upon login.
- Product Browsing & Filtering: Users can view coffee products with intuitive categorization and filtering options.
- Responsive Design: Optimized for mobile and desktop views.
- Authentication: Integrated with Auth0 for secure user login and registration.
- Full-text search with search suggestions and filtering options.

<ins>Backend</ins>:
- API-Driven Architecture: RESTful APIs built with Node.js and Express.
- Database Integration: PostgreSQL for secure and efficient data storage.
- Cart Synchronization: Logic to handle cart merging between guest and signed-in users.
- Scalability: Modular code structure for ease of future extensions.

## 🔧 Tech Stack
- Frontend: Next.js, Typescript, Redux Toolkit, Tanstack Query(React Query), Axios, TailwindCSS, Shadcn
- Backend: Node.js, Express, Typescript
- Database: PostgreSQL
- Authentication: Auth0
- Payment Integration: Stripe 
- State Management: Redux Toolkit
- Other Tools: Local Storage, Git

## 🚀 Features in Progress
- Admin Dashboard:
  - Manage inventory, track orders, and update product details dynamically.
  - Role-based access control for admin users.
- Protected and public API routes
- Authentication for protected API routes

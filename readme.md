# Linker's Lobby - Service Discovery Platform

Linker's Lobby is an innovative service discovery platform designed to connect users with a variety of service providers across different categories. This README provides a comprehensive overview of the project's technical progress and outlines the upcoming features and improvements.

## Project Structure

The project is structured with two main directories:

- **Linker's Lobby (Root Directory):**
  - Contains both backend and frontend subdirectories.
  - The frontend is yet to be initialized and developed.

### Backend (backend/ Directory)

The backend directory contains the server-side logic and APIs responsible for handling user interactions, service provider registrations, reviews, and more.

## Development Roadmap Checklist

### Initialization (Week 1-2):

- [x] **Project Setup:**
  - [x] MongoDB Atlas cluster created for efficient database storage.
  - [x] Mongoose schemas designed for User, ServiceProvider, and Review entities.
  - [ ] Work in Progress: Additional schemas for future features.

- [x] **Database Design:**
  - [x] Mongoose schemas created for User, ServiceProvider, and Review entities. 
  - [ ] Work in Progress: Additional schemas for future features.

- [x] **API Development:**
  - [x] User registration API implemented to handle user sign-up.
  - [x] Dynamic update logic for nested fields in user profiles to accommodate flexible user data.
  - [x] Implementing User authentication API to handle user logins.
  - [ ] Work in Progress: Future API routes.

### Backend Development (Week 3-4):

- [x] **API Routes:**
  - [x] Routes established for user operations, including registration and profile updates.
  - [x] Service provider routes implemented for registration and other related operations.
  - [ ] Work in Progress: Additional API routes for future features.

### Frontend Development (Week 5-6):

- [ ] **Frontend Setup:**
  - [ ] Initiated the setup for the frontend using React.
  - [ ] Work in Progress: Ongoing development of frontend components and pages.

### Service Provider Listings (Week 7-8):

- [x] **Service Provider Operations:**
  - [x] Developed APIs and routes for service provider operations.
  - [ ] Work in Progress: Frontend integration for displaying service provider listings.

### User Reviews and Ratings (Week 9-10):

- [x] **Review APIs:**
  - [x] Implemented APIs for user reviews and ratings for service providers.
  - [ ] Integrated secure payment features for service fees.
  - [ ] Work in Progress: Additional features related to reviews.

### Testing and Deployment (Week 11-12):

- [ ] **Comprehensive Testing:**
  - [ ] Conducted comprehensive testing of APIs, debugging, and resolving errors.
  - [ ] Work in Progress: Final testing and frontend deployment.

## TODO List

### Backend Improvements

- [x] **Implement Google Authentication:**
  - [x] Integrated Google user authentication.
- [x] **Service Provider Dynamic Route:**
  - [x] Work in Progress: Implementing dynamic route for service provider to have various query parameters to filter results. 

- [x] **Location and Region Management:**
  - [x] Implemented APIs for location and region management.
  - [ ] Work in Progress: Improving functionality for managing locations and regions.
  - [ ] Work in Progress: Integrating Google Maps Geo Coding API for location management.

- [x] **Cors Implementation:**
  - [x] Implemented Cross-Origin Resource Sharing.

- [x] **Helmet Integration:**
  - [x] Integrated Helmet for enhanced security.

- [x] **Babel Setup:**
  - [x] Configured Babel for cross-browser compatibility.

- [x] **Security Enhancements:**
  - [x] Implemented password hashing and salting.

### General Improvements

- [x] **Token System Development:**
  - [x] Implemented a robust token system.
  - [ ]  Work in Progress: Improving token system for user authentication.

- [x] **Logger Implementation:**
  - [x] Implemented the logger for effective error tracking and record handling using morgan
  - [ ] Optional: Implemented the logger for effective error tracking and record handling using winston

- [ ] **Cache Integration:**
  - [ ] Work in Progress: Implementing a caching system.

- [x] **Route Restructuring:**
  - [x] Renamed each route file for better organization.

- [ ] **Validation Using Joi:**
  - [ ] Work in Progress: Integrating npm Joi for robust input validation.

---

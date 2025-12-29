# InchBrick Frontend Documentation

## Project Overview
InchBrick Frontend is a Next.js-based real estate platform that provides property listings, property details, and real estate services in Dubai. The application is built with modern React practices and follows a component-based architecture.

## Tech Stack
- Next.js - React Framework
- React - UI Library
- SASS - Styling
- Bootstrap - UI Framework
- Context API - State Management

## Project Structure
```
inchbrick_front/
├── components/         # Reusable React components
├── config/            # API configuration and fetch utilities
├── context/           # React Context providers
├── form/             # Form-related components
├── helper/           # Utility functions and helpers
├── markup/           # Static markup components
├── pages/            # Next.js pages and routing
├── public/           # Static assets
├── schema/           # Data schemas
├── styles/           # Global styles and CSS modules
└── utils/            # Utility functions
```

## Key Features
1. Property Listings
   - Search and filter properties
   - Property categorization (Ready to Move, Off Plan, Rental)
   - Price filtering and sorting

2. Property Details
   - Image galleries
   - Floor plans
   - Location mapping
   - Amenities display
   - Price conversion
   - Video galleries
   - Downloadable resources (brochures, payment plans)

3. User Features
   - Authentication
   - Property inquiries
   - Resource downloads
   - Contact forms

## API Integration
The application uses a centralized API integration system through the `config/fetchApi.js` module. Key API functionalities include:

- Property data fetching
- Banner management
- Location services
- Developer and agent information
- Blog and press releases
- Reviews and ratings

### API Utilities
```javascript
fetchData(url, options)      // Generic data fetching utility
fetchProperty(options)       // Property-specific data
fetchBanner(options)         // Banner data
fetchLocation(options)       // Location data
fetchPropertyType(options)   // Property type information
```

## Components Documentation

### Property Components
1. `LeftDetails.js`
   - Purpose: Displays detailed property information
   - Features:
     - Dynamic currency conversion
     - Image gallery integration
     - Floor plan display
     - Amenities listing
     - Location mapping
   - Props:
     ```javascript
     {
       data: PropTypes.object,        // Property data
       florData: PropTypes.array,     // Floor plan data
       galleryData: PropTypes.array,  // Gallery images/videos
       review: PropTypes.array        // Property reviews
     }
     ```

### Context Providers
1. Currency Provider
   - Manages currency conversion across the application
   - Provides real-time currency updates
   - Used in property price displays

2. Auth Provider
   - Manages user authentication state
   - Controls access to protected resources
   - Handles user sessions

## State Management
The application uses React Context API for state management, with key contexts including:
- Currency context for price conversion
- Authentication context for user state
- Site context for global site configuration
- Meta context for SEO management

## Performance Optimization
1. Image Optimization
   - Uses Next.js Image component
   - Implements lazy loading
   - Supports responsive images

2. Data Fetching
   - Implements data caching
   - Uses dynamic imports
   - Supports server-side rendering

3. Component Loading
   - Implements code splitting
   - Uses dynamic component loading
   - Optimizes bundle size

## Development Guidelines

### Code Style
- Follow React best practices
- Use functional components
- Implement proper error handling
- Follow consistent naming conventions

### Component Creation
1. Use functional components
2. Implement proper prop validation
3. Use appropriate error boundaries
4. Follow the single responsibility principle

### API Integration
1. Use the centralized `fetchApi` utilities
2. Implement proper error handling
3. Use appropriate loading states
4. Cache responses when appropriate

## Deployment
The application can be deployed using:
1. Docker container (Dockerfile provided)
2. Traditional Next.js deployment
3. CI/CD pipeline (.gitlab-ci.yml provided)

### Environment Setup
Required environment variables:
```
API_URL=your_api_url
NEXT_PUBLIC_API_URL=your_public_api_url
```

## Testing
- Implement unit tests for components
- Test API integration
- Verify currency conversion
- Test user flows

## Security Considerations
1. Implement proper authentication
2. Protect sensitive routes
3. Validate user input
4. Secure API calls

## Contributing
1. Follow the established code style
2. Write clear commit messages
3. Document new features
4. Test thoroughly before submitting PRs

## Support and Maintenance
For support:
1. Check existing documentation
2. Review component props
3. Verify API responses
4. Check browser console for errors

## Future Improvements
1. Implement more caching strategies
2. Add more unit tests
3. Enhance performance monitoring
4. Improve error handling
5. Add more documentation 
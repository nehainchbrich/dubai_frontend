# API Documentation

## Overview
The InchBrick Frontend uses a RESTful API architecture for data fetching and manipulation. All API utilities are centralized in the `config/fetchApi.js` module.

## Base Configuration
API endpoints are configured in `config/apiconfig.js`. The base URL is set through environment variables:
```javascript
API_URL=your_api_url
NEXT_PUBLIC_API_URL=your_public_api_url
```

## API Utilities

### Generic Data Fetching
```javascript
fetchData(url, options)
```
Parameters:
- `url`: API endpoint URL
- `options`: Query parameters object
  - `status`: Status filter
  - `limit`: Number of records to return
  - `offset`: Pagination offset
  - `columns`: Specific columns to return
  - `sortBy`: Sort field
  - `sortOrder`: Sort direction ('asc'/'desc')

Returns: Promise resolving to data object or null

### Property Data
```javascript
fetchPropertyType(options)
```
Fetches property type information.
Parameters:
- `status`: Active status (1/0)
- `limit`: Number of records
- `offset`: Pagination offset
- `columns`: Specific columns

### Location Data
```javascript
fetchLocation(options)
```
Fetches location information.
Parameters:
- `status`: Active status
- `is_prominent`: Featured locations flag
- `limit`: Number of records
- `columns`: Specific columns

### Banner Management
```javascript
fetchBanner(options)
```
Fetches banner information.
Parameters:
- `status`: Active status
- `limit`: Number of records
- `offset`: Pagination offset
- `columns`: Specific columns

### Property Gallery
```javascript
fetchPropertyGallery(options)
```
Fetches property media files.
Parameters:
- `status`: Active status
- `limit`: Number of records
- `code`: Property code

### Reviews
```javascript
fetchReview(options)
```
Fetches property reviews.
Parameters:
- `status`: Active status
- `limit`: Number of records
- `code`: Page code

### Agents and Developers
```javascript
fetchAgent(options)
fetchDeveloper(options)
```
Fetches agent/developer information.
Parameters:
- `status`: Active status
- `is_verify`: Verification status (for agents)
- `limit`: Number of records

### Blog and Press
```javascript
fetchBlog(options)
fetchPress(options)
```
Fetches blog posts and press releases.
Parameters:
- `status`: Active status
- `limit`: Number of records
- `categoryName`: Category filter

## Response Format
All API responses follow a standard format:
```javascript
{
  status: boolean,
  data: Array|Object,
  message?: string
}
```

## Error Handling
All API utilities include error handling:
- Network errors are caught and logged
- Invalid responses return null
- Status checks ensure valid data

## Usage Examples

### Fetching Property Data
```javascript
const options = {
  status: 1,
  limit: 10,
  columns: 'title,thumbnail,price'
};

try {
  const properties = await fetchData(API_URLS.PROPERTIES, options);
  if (properties) {
    // Handle success
  }
} catch (error) {
  // Handle error
}
```

### Fetching Location Data
```javascript
const options = {
  status: 1,
  is_prominent: 1,
  limit: 4
};

try {
  const locations = await fetchLocation(options);
  if (locations) {
    // Handle success
  }
} catch (error) {
  // Handle error
}
```

## Best Practices

### Caching
- Implement response caching for frequently accessed data
- Use browser storage for temporary data
- Clear cache on user logout or data updates

### Error Handling
- Always wrap API calls in try-catch blocks
- Provide meaningful error messages
- Implement retry logic for failed requests

### Performance
- Request only needed columns
- Implement pagination
- Use appropriate cache strategies

### Security
- Validate all input data
- Sanitize response data
- Use appropriate authentication headers

## Rate Limiting
The API implements rate limiting:
- Maximum requests per minute
- Maximum concurrent requests
- Implement exponential backoff for retries

## Versioning
API endpoints follow semantic versioning:
- Major version changes in URL
- Minor version changes in headers
- Patch changes are backward compatible

## Testing
Test API integration using:
- Unit tests for utilities
- Integration tests for endpoints
- Mock responses for development
- Error scenario testing

## Monitoring
Monitor API usage:
- Track response times
- Log error rates
- Monitor rate limit usage
- Track cache hit rates 
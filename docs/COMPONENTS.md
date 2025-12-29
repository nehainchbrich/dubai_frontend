# Components Documentation

## Overview
The InchBrick Frontend uses a component-based architecture with React functional components. Components are organized by feature and functionality.

## Component Structure
```
components/
├── website/           # Website-specific components
│   ├── property/     # Property-related components
│   ├── common/       # Shared components
│   ├── blogs/        # Blog components
│   ├── home/         # Homepage components
│   └── form/         # Form components
```

## Key Components

### Property Components

#### LeftDetails Component
```javascript
import LeftDetails from '@/components/website/property/LeftDetails'
```

Purpose: Displays detailed property information including galleries, floor plans, and amenities.

Props:
```javascript
{
  data: {
    title: string,
    city: string,
    state: string,
    country: string,
    minAmount: number,
    maxAmount: number,
    thumbnail: string,
    amenities: string,
    description: string,
    // ... other property fields
  },
  florData: Array<{
    bedroom: number,
    bathroom: number,
    area: number,
    parking: number,
    amount: number,
    thumbnail: string
  }>,
  galleryData: Array<{
    fileType: 'image' | 'video' | 'unknown',
    fileFor: string,
    thumbnails: string
  }>,
  review: Array<ReviewType>
}
```

Features:
- Dynamic currency conversion
- Image gallery with lazy loading
- Video gallery with play state management
- Floor plan display with pricing
- Amenities categorization and display
- Location mapping integration
- Download management for authenticated users

### Common Components

#### MyGallery Component
Image gallery component with:
- Lazy loading
- Thumbnail navigation
- Full-screen view
- Touch support

#### VideoGallery Component
Video player component with:
- Play state management
- Thumbnail preview
- Multiple format support

### Form Components

#### TriggerFrm Component
Contact form component with:
- Input validation
- Form state management
- API integration
- Error handling

### Context Integration

Components can access global state through context:

```javascript
// Currency Context
const { currency } = useCurrency();

// Auth Context
const { user } = useAuth();
```

## Component Best Practices

### State Management
```javascript
// Local State
const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

// Effect Dependencies
useEffect(() => {
  // Effect logic
}, [dependency1, dependency2]);
```

### Error Handling
```javascript
try {
  // Component logic
} catch (error) {
  console.error('Component error:', error);
  // Error handling logic
}
```

### Performance Optimization

#### Image Optimization
```javascript
<Image
  loader={imageKitLoader}
  src={thumbnail}
  alt={title}
  width={width}
  height={height}
  loading="lazy"
/>
```

#### Memoization
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

#### Callback Optimization
```javascript
const handleVideoPlay = useCallback((index) => {
  setPlayingVideoIndex(index);
}, []);
```

### Accessibility

Components should implement:
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support

Example:
```javascript
<button
  aria-label="Play video"
  onClick={handlePlay}
  onKeyPress={handleKeyPress}
  tabIndex={0}
>
  {children}
</button>
```

## Component Testing

### Unit Tests
```javascript
describe('LeftDetails', () => {
  it('renders property details correctly', () => {
    // Test implementation
  });

  it('handles currency conversion', () => {
    // Test implementation
  });
});
```

### Integration Tests
```javascript
describe('Property Page', () => {
  it('loads and displays property data', () => {
    // Test implementation
  });
});
```

## Styling

Components use a combination of:
- CSS Modules
- Global styles
- Bootstrap classes
- Custom SASS

Example:
```javascript
import styles from '../../../styles/SingleProperty.module.css'

<div className={`${styles.main_thumbnail} my-3`}>
  {/* Component content */}
</div>
```

## Component Documentation

Each component should include:
- Purpose description
- Props documentation
- Usage examples
- Dependencies list

Example:
```javascript
/**
 * LeftDetails Component
 * 
 * Displays detailed property information including galleries,
 * floor plans, and amenities.
 * 
 * @param {Object} props
 * @param {Object} props.data - Property data
 * @param {Array} props.florData - Floor plan data
 * @param {Array} props.galleryData - Gallery data
 * @param {Array} props.review - Property reviews
 */
```

## Error Boundaries

Implement error boundaries for component error handling:

```javascript
class ComponentErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## Component Updates

When updating components:
1. Document changes
2. Update tests
3. Verify accessibility
4. Check performance
5. Test error handling 
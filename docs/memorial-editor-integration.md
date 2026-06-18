# Memorial Editor Integration Guide

This guide explains how to integrate the MemorialEditor component into your existing DOA project.

## Prerequisites

Make sure you have the latest version of the project with all dependencies installed:

```bash
npm install
```

## Component Location

The MemorialEditor component is located at:
```
/components/MemorialEditor/
```

## Basic Integration

### 1. Import the Component

```typescript
import { MemorialEditor } from '../components';
```

Or import directly:
```typescript
import MemorialEditor from '../components/MemorialEditor/MemorialEditor';
```

### 2. Use the Component

```tsx
function MyPage() {
  const handleSave = (memorialData) => {
    // Handle saving the memorial data
    console.log('Saving memorial:', memorialData);
  };

  const handleCancel = () => {
    // Handle cancellation
    console.log('Editing cancelled');
  };

  return (
    <div>
      <h1>Create Memorial</h1>
      <MemorialEditor 
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
```

## Advanced Integration

### Providing Initial Data

You can pre-populate the editor with existing data:

```tsx
const initialData = {
  id: 'memorial-123',
  name: 'John Doe',
  biography: 'A wonderful person...',
  dates: {
    birth: '1950-01-15',
    death: '2020-03-22',
    milestones: []
  },
  gallery: [],
  timeline: [],
  keyMemories: [],
  privacyMode: 'public'
};

<MemorialEditor 
  initialData={initialData}
  onSave={handleSave}
  onCancel={handleCancel}
/>
```

### Handling Save Operations

The `onSave` callback receives the complete memorial data:

```typescript
const handleSave = async (memorialData) => {
  try {
    // Send to your API
    const response = await fetch('/api/memorials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memorialData),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Memorial saved successfully:', result);
    } else {
      console.error('Failed to save memorial');
    }
  } catch (error) {
    console.error('Error saving memorial:', error);
  }
};
```

## Styling Customization

The MemorialEditor uses CSS variables that can be customized:

```css
/* In your global CSS file */
:root {
  --color-primary: #your-primary-color;
  --color-secondary: #your-secondary-color;
  --font-family: 'Your Custom Font', sans-serif;
}
```

## Responsive Behavior

The component is fully responsive and will adapt to different screen sizes:
- On desktop: Sidebar navigation with step indicators
- On mobile: Stacked layout with clear step progression
- All form elements are touch-friendly

## Accessibility Features

The component includes:
- Proper semantic HTML structure
- Keyboard navigation support
- ARIA labels for screen readers
- Sufficient color contrast
- Focus management

## Error Handling

The component handles common errors gracefully:
- Form validation for required fields
- Graceful degradation if JavaScript is disabled
- Clear error messages for user guidance

## Performance Considerations

- Lazy loading of step components
- Efficient state management
- Minimal re-renders
- Auto-save debouncing

## Testing

To test the component integration:

```bash
npm test
```

Or run specific tests:
```bash
npm test -- MemorialEditor
```

## Troubleshooting

### Common Issues

1. **Component not found**: Make sure the import path is correct
2. **Styling issues**: Check that CSS files are being loaded
3. **TypeScript errors**: Ensure all required props are provided

### Debugging Tips

1. Check the browser console for any error messages
2. Verify that all dependencies are installed
3. Ensure the component is properly exported from the index files

## Support

For issues with the MemorialEditor component, please:
1. Check the component's README.md
2. Review the existing documentation
3. Contact the development team for assistance
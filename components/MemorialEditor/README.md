# Memorial Editor Component

A calm, step-based memorial editor with autosave, summary step, and clear editing flow.

## Features

- **Step-Based Editing**: Organized into clear steps for biography, dates, gallery, timeline, key memories, and privacy settings
- **Auto-Save**: Automatically saves progress every 30 seconds
- **Summary Step**: Review all information before finalizing
- **Responsive Design**: Works on all device sizes
- **Privacy Controls**: Multiple privacy modes (public, private, friends only)

## Component Structure

```
MemorialEditor/
├── MemorialEditor.tsx          # Main component
├── MemorialEditorHeader.tsx    # Header with title and save status
├── MemorialEditorSteps.tsx     # Step navigation sidebar
├── MemorialEditorNavigation.tsx # Navigation buttons
├── MemorialEditorSummary.tsx   # Summary review step
├── BiographyStep.tsx           # Biography editing step
├── DatesStep.tsx              # Birth/death dates and milestones
├── GalleryStep.tsx            # Photo gallery management
├── TimelineStep.tsx           # Life timeline events
├── KeyMemoriesStep.tsx        # Special memories
├── PrivacyStep.tsx            # Privacy settings
├── types.ts                   # TypeScript interfaces
├── MemorialEditor.css         # Component styles
└── index.ts                   # Export file
```

## Usage

```tsx
import { MemorialEditor } from '../components/MemorialEditor';

function MyComponent() {
  const handleSave = (data) => {
    console.log('Memorial saved:', data);
    // Save to your backend
  };

  const handleCancel = () => {
    console.log('Editing cancelled');
    // Handle cancellation
  };

  return (
    <MemorialEditor 
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `initialData` | `MemorialData` | Optional initial data for editing existing memorials |
| `onSave` | `function` | Callback when save is triggered |
| `onCancel` | `function` | Callback when cancel is triggered |

## Data Structure

The component manages data in the following structure:

```typescript
interface MemorialData {
  id: string;
  name: string;
  biography: string;
  dates: {
    birth: string;
    death: string;
    milestones: Milestone[];
  };
  gallery: GalleryImage[];
  timeline: TimelineEvent[];
  keyMemories: Memory[];
  privacyMode: 'public' | 'private' | 'friends';
}
```

## Styling

The component uses CSS variables for consistent theming. You can customize the appearance by overriding these variables in your global CSS:

```css
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-light: #f8f9fa;
  --color-dark: #343a40;
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## Development

To modify the component:

1. Edit the individual step components in `components/MemorialEditor/`
2. Update styles in `MemorialEditor.css`
3. Modify data structures in `types.ts`

## Testing

Run tests with:

```bash
npm test
```

## Accessibility

The component follows WCAG 2.1 guidelines:
- Proper semantic HTML structure
- Keyboard navigation support
- ARIA labels where appropriate
- Sufficient color contrast
- Focus management

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request
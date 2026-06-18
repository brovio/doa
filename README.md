# DOA Project

## Overview
This repository contains the DOA (Design-Oriented Architecture) project, focusing on a modern web application with a strong design system foundation.

## Project Structure
- `/src` - Source code
- `/design-system` - Design system components and guidelines
- `/docs` - Documentation
# DOA Project with Memorial Editor

This project includes a new Memorial Editor component that provides a calm, step-based editing experience for creating memorial pages.

## New Component: Memorial Editor

A comprehensive memorial editor with the following features:

### Key Features
- **Step-Based Flow**: Organized into 7 clear steps (Biography, Dates, Gallery, Timeline, Key Memories, Privacy, Summary)
- **Auto-Save**: Automatically saves progress every 30 seconds
- **Responsive Design**: Works on all device sizes
- **Privacy Controls**: Public, Private, and Friends-only modes
- **Summary Review**: Final step to review all information before saving

### Component Structure
```
components/MemorialEditor/
├── MemorialEditor.tsx          # Main component orchestrator
├── MemorialEditorHeader.tsx    # Header with title and save status
├── MemorialEditorSteps.tsx     # Step navigation sidebar
├── MemorialEditorNavigation.tsx # Navigation buttons
├── MemorialEditorSummary.tsx   # Summary review step
├── BiographyStep.tsx           # Biography editing
├── DatesStep.tsx              # Birth/death dates and milestones
├── GalleryStep.tsx            # Photo gallery management
├── TimelineStep.tsx           # Life timeline events
├── KeyMemoriesStep.tsx        # Special memories
├── PrivacyStep.tsx            # Privacy settings
├── types.ts                   # TypeScript interfaces
├── MemorialEditor.css         # Component styles
├── index.ts                   # Export file
├── README.md                  # Component documentation
└── MemorialEditorDemo.tsx     # Usage demonstration
```

### Usage
```tsx
import { MemorialEditor } from '../components';

function MemorialPage() {
  const handleSave = (data) => {
    // Save memorial data to your backend
  };

  const handleCancel = () => {
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

### Documentation
- **Component Docs**: `components/MemorialEditor/README.md`
- **Integration Guide**: `docs/memorial-editor-integration.md`
- **Demo Page**: `public/memorial-demo.html`

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. View the Memorial Editor demo in the browser

## Testing

Run tests with: `npm test`

## Project Structure
The project follows the existing DOA architecture with the new MemorialEditor component integrated as a shared component.
- `/public` - Static assets
- `/components` - Shared components

## Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Memory Bank
The Memory Bank is used to store design system decisions, component patterns, and architectural choices.

## Routes
Route structure will be defined based on application requirements.

## Content Model
Content modeling will be defined based on business requirements.
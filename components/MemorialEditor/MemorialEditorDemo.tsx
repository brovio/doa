import React from 'react';
import MemorialEditor from './MemorialEditor';

/**
 * MemorialEditorDemo - A demonstration component showing how to use the MemorialEditor
 * 
 * This component showcases the MemorialEditor with example data and handlers
 */
const MemorialEditorDemo: React.FC = () => {
  // Example initial data (optional)
  const initialMemorialData = {
    id: 'demo-memorial-1',
    name: 'John Doe',
    biography: 'A brief biography of John Doe...',
    dates: {
      birth: '1950-01-15',
      death: '2020-03-22',
      milestones: [
        {
          id: 'milestone-1',
          date: '1975-06-10',
          title: 'Graduation',
          description: 'Graduated from University with honors'
        },
        {
          id: 'milestone-2',
          date: '1980-08-20',
          title: 'Marriage',
          description: 'Married to Jane Smith'
        }
      ]
    },
    gallery: [
      {
        id: 'photo-1',
        url: 'https://example.com/family-photo.jpg',
        title: 'Family Photo',
        description: 'A cherished family moment',
        date: '1995-07-04'
      }
    ],
    timeline: [
      {
        id: 'event-1',
        date: '1985-03-15',
        title: 'Career Achievement',
        description: 'Promoted to Senior Manager',
        category: 'achievement'
      }
    ],
    keyMemories: [
      {
        id: 'memory-1',
        title: 'First Grandchild',
        description: 'The day we met our first grandchild',
        date: '2005-11-08',
        people: 'John, Jane, and baby Emma'
      }
    ],
    privacyMode: 'friends'
  };

  // Handler for save action
  const handleSave = (data: any) => {
    console.log('Saving memorial data:', data);
    // In a real app, you would send this to your backend
    alert('Memorial saved successfully!');
  };

  // Handler for cancel action
  const handleCancel = () => {
    console.log('Memorial editing cancelled');
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      alert('Editing cancelled');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Memorial Editor Demo</h1>
      <p>This is a demonstration of the MemorialEditor component in action.</p>
      
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px', 
        backgroundColor: '#f9f9f9' 
      }}>
        <MemorialEditor 
          initialData={initialMemorialData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        <h3>How it works:</h3>
        <ul>
          <li>Users can navigate through 7 steps: Biography, Dates, Gallery, Timeline, Key Memories, Privacy, and Summary</li>
          <li>Data is automatically saved every 30 seconds</li>
          <li>Users can save manually at any time</li>
          <li>The summary step allows final review before saving</li>
          <li>Privacy settings control who can view the memorial</li>
        </ul>
      </div>
    </div>
  );
};

export default MemorialEditorDemo;
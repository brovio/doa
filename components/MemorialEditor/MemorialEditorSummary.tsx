import React from 'react';
import { MemorialData } from './types';

interface MemorialEditorSummaryProps {
  data: MemorialData;
  onDataChange: (data: Partial<MemorialData>) => void;
}

const MemorialEditorSummary: React.FC<MemorialEditorSummaryProps> = ({ 
  data 
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  const getPrivacyLabel = (mode: string) => {
    switch (mode) {
      case 'public': return 'Public';
      case 'private': return 'Private';
      case 'friends': return 'Friends Only';
      default: return 'Public';
    }
  };

  return (
    <div className="editor-step">
      <h2>Summary</h2>
      <p className="step-description">Review your memorial before saving</p>
      
      <div className="summary-section">
        <h3>Basic Information</h3>
        <div className="summary-item">
          <label>Name:</label>
          <span>{data.name || 'Not provided'}</span>
        </div>
        <div className="summary-item">
          <label>Birth Date:</label>
          <span>{formatDate(data.dates.birth)}</span>
        </div>
        <div className="summary-item">
          <label>Death Date:</label>
          <span>{formatDate(data.dates.death)}</span>
        </div>
      </div>
      
      <div className="summary-section">
        <h3>Biography</h3>
        <div className="summary-item">
          <p>{data.biography || 'No biography provided'}</p>
        </div>
      </div>
      
      <div className="summary-section">
        <h3>Life Milestones</h3>
        {data.dates.milestones.length > 0 ? (
          <ul className="summary-list">
            {data.dates.milestones.map((milestone) => (
              <li key={milestone.id} className="summary-list-item">
                <strong>{milestone.title}</strong> - {formatDate(milestone.date)}
                <p>{milestone.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No milestones added</p>
        )}
      </div>
      
      <div className="summary-section">
        <h3>Gallery</h3>
        <p>{data.gallery.length} photo(s) added</p>
      </div>
      
      <div className="summary-section">
        <h3>Timeline Events</h3>
        <p>{data.timeline.length} event(s) added</p>
      </div>
      
      <div className="summary-section">
        <h3>Key Memories</h3>
        <p>{data.keyMemories.length} memory(ies) added</p>
      </div>
      
      <div className="summary-section">
        <h3>Privacy Settings</h3>
        <div className="summary-item">
          <label>Visibility:</label>
          <span>{getPrivacyLabel(data.privacyMode)}</span>
        </div>
      </div>
    </div>
  );
};

export default MemorialEditorSummary;
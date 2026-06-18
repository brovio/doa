import React from 'react';
import { MemorialData } from './types';

interface BiographyStepProps {
  data: MemorialData;
  onDataChange: (data: Partial<MemorialData>) => void;
}

const BiographyStep: React.FC<BiographyStepProps> = ({ data, onDataChange }) => {
  return (
    <div className="editor-step">
      <h2>Biography</h2>
      <p className="step-description">Tell the story of their life</p>
      
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => onDataChange({ name: e.target.value })}
          placeholder="Enter full name"
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="biography">Biography</label>
        <textarea
          id="biography"
          value={data.biography}
          onChange={(e) => onDataChange({ biography: e.target.value })}
          placeholder="Share their life story, achievements, and what made them special..."
          className="form-textarea"
          rows={8}
        />
      </div>
    </div>
  );
};

export default BiographyStep;
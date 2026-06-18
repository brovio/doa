import React from 'react';
import { MemorialData } from './types';

interface PrivacyStepProps {
  data: MemorialData;
  onDataChange: (data: Partial<MemorialData>) => void;
}

const PrivacyStep: React.FC<PrivacyStepProps> = ({ data, onDataChange }) => {
  return (
    <div className="editor-step">
      <h2>Privacy Settings</h2>
      <p className="step-description">Control who can view this memorial</p>
      
      <div className="privacy-options">
        <div className="privacy-option">
          <input
            type="radio"
            id="privacy-public"
            name="privacy"
            value="public"
            checked={data.privacyMode === 'public'}
            onChange={(e) => onDataChange({ privacyMode: e.target.value as any })}
          />
          <label htmlFor="privacy-public">
            <h3>Public</h3>
            <p>Anyone can view this memorial</p>
          </label>
        </div>
        
        <div className="privacy-option">
          <input
            type="radio"
            id="privacy-private"
            name="privacy"
            value="private"
            checked={data.privacyMode === 'private'}
            onChange={(e) => onDataChange({ privacyMode: e.target.value as any })}
          />
          <label htmlFor="privacy-private">
            <h3>Private</h3>
            <p>Only invited people can view this memorial</p>
          </label>
        </div>
        
        <div className="privacy-option">
          <input
            type="radio"
            id="privacy-friends"
            name="privacy"
            value="friends"
            checked={data.privacyMode === 'friends'}
            onChange={(e) => onDataChange({ privacyMode: e.target.value as any })}
          />
          <label htmlFor="privacy-friends">
            <h3>Friends Only</h3>
            <p>Only friends and family can view this memorial</p>
          </label>
        </div>
      </div>
      
      {data.privacyMode !== 'public' && (
        <div className="privacy-settings">
          <h3>Access Control</h3>
          <p>Add specific people who can view this memorial:</p>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter email addresses (comma separated)"
              className="form-input"
            />
          </div>
          <button type="button" className="btn btn-secondary">
            Add People
          </button>
        </div>
      )}
    </div>
  );
};

export default PrivacyStep;
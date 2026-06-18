import React from 'react';
import { Button } from '../../components';

interface MemorialEditorNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  onCancel: (() => void) | undefined;
  isSaving: boolean;
}

const MemorialEditorNavigation: React.FC<MemorialEditorNavigationProps> = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSave, 
  onCancel,
  isSaving
}) => {
  return (
    <div className="memorial-editor-navigation">
      <div className="nav-buttons">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button 
          variant="secondary" 
          onClick={onPrevious}
          disabled={currentStep === 0 || isSaving}
        >
          Previous
        </Button>
      </div>
      
      <div className="nav-buttons">
        <Button 
          variant="secondary" 
          onClick={onNext}
          disabled={currentStep === totalSteps - 1 || isSaving}
        >
          Next
        </Button>
        <Button 
          variant="primary" 
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default MemorialEditorNavigation;
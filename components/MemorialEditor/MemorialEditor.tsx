import React, { useState, useEffect } from 'react';
import './MemorialEditor.css';
import MemorialEditorHeader from './MemorialEditorHeader';
import MemorialEditorSteps from './MemorialEditorSteps';
import MemorialEditorNavigation from './MemorialEditorNavigation';
import MemorialEditorSummary from './MemorialEditorSummary';
import { MemorialData } from './types';
import BiographyStep from './BiographyStep';
import DatesStep from './DatesStep';
import GalleryStep from './GalleryStep';
import TimelineStep from './TimelineStep';
import KeyMemoriesStep from './KeyMemoriesStep';
import PrivacyStep from './PrivacyStep';

interface MemorialEditorProps {
  initialData?: MemorialData;
  onSave?: (data: MemorialData) => void;
  onCancel?: () => void;
}

const MemorialEditor: React.FC<MemorialEditorProps> = ({ 
  initialData,
  onSave,
  onCancel 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [memorialData, setMemorialData] = useState<MemorialData>(
    initialData || {
      id: '',
      name: '',
      biography: '',
      dates: {
        birth: '',
        death: '',
        milestones: []
      },
      gallery: [],
      timeline: [],
      keyMemories: [],
      privacyMode: 'public'
    }
  );
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      handleAutoSave();
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [memorialData]);

  const handleAutoSave = () => {
    // In a real application, this would save to a backend
    console.log('Auto-saving memorial data...', memorialData);
    setLastSaved(new Date());
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      if (onSave) {
        onSave(memorialData);
      }
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataChange = (data: Partial<MemorialData>) => {
    setMemorialData(prev => ({ ...prev, ...data }));
  };

  const steps = [
    'Biography',
    'Dates',
    'Gallery',
    'Timeline',
    'Key Memories',
    'Privacy',
    'Summary'
  ];

  return (
    <div className="memorial-editor">
      <MemorialEditorHeader 
        title={memorialData.name || 'New Memorial'}
        lastSaved={lastSaved}
        isSaving={isSaving}
      />
      
      <div className="memorial-editor-content">
        <MemorialEditorSteps 
          steps={steps}
          currentStep={currentStep}
        />
        
        <div className="memorial-editor-step-content">
          {currentStep === 0 && (
            <BiographyStep 
              data={memorialData}
              onDataChange={handleDataChange}
            />
          )}
          {currentStep === 1 && (
            <DatesStep 
              data={memorialData}
              onDataChange={handleDataChange}
            />
          )}
          {currentStep === 2 && (
            <GalleryStep 
              data={memorialData}
              onDataChange={handleDataChange}
            />
          )}
          {currentStep === 3 && (
            <TimelineStep 
              data={memorialData}
              onDataChange={handleDataChange}
            />
          )}
          {currentStep === 4 && (
            <KeyMemoriesStep 
              data={memorialData}
              onDataChange={handleDataChange}
            />
          )}
          {currentStep === 5 && (
            <PrivacyStep 
              data={memorialData}
              onDataChange={handleDataChange}
            />
          )}
          {currentStep === 6 && (
            <MemorialEditorSummary 
              data={memorialData}
              onDataChange={handleDataChange}
            />
          )}
        </div>
      </div>
      
      <MemorialEditorNavigation 
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSave={handleSave}
        onCancel={onCancel}
        isSaving={isSaving}
      />
    </div>
  );
};

export default MemorialEditor;
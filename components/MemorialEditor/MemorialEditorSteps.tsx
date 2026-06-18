import React from 'react';

interface MemorialEditorStepsProps {
  steps: string[];
  currentStep: number;
}

const MemorialEditorSteps: React.FC<MemorialEditorStepsProps> = ({ 
  steps, 
  currentStep 
}) => {
  return (
    <div className="memorial-editor-steps">
      <ul className="steps-list">
        {steps.map((step, index) => (
          <li 
            key={index}
            className={`step-item ${
              index === currentStep ? 'active' : 
              index < currentStep ? 'completed' : ''
            }`}
          >
            <span className="step-item-number">{index + 1}</span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemorialEditorSteps;
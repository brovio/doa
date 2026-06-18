import React from 'react';
import { MemorialData } from './types';

interface DatesStepProps {
  data: MemorialData;
  onDataChange: (data: Partial<MemorialData>) => void;
}

const DatesStep: React.FC<DatesStepProps> = ({ data, onDataChange }) => {
  const addMilestone = () => {
    const newMilestone = {
      id: Date.now().toString(),
      date: '',
      title: '',
      description: ''
    };
    onDataChange({
      dates: {
        ...data.dates,
        milestones: [...data.dates.milestones, newMilestone]
      }
    });
  };

  const updateMilestone = (id: string, field: string, value: string) => {
    const updatedMilestones = data.dates.milestones.map((milestone) => 
      milestone.id === id ? { ...milestone, [field]: value } : milestone
    );
    onDataChange({
      dates: {
        ...data.dates,
        milestones: updatedMilestones
      }
    });
  };

  const removeMilestone = (id: string) => {
    const updatedMilestones = data.dates.milestones.filter((milestone) => 
      milestone.id !== id
    );
    onDataChange({
      dates: {
        ...data.dates,
        milestones: updatedMilestones
      }
    });
  };

  return (
    <div className="editor-step">
      <h2>Important Dates</h2>
      <p className="step-description">Record significant moments in their life</p>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            id="birthDate"
            type="date"
            value={data.dates.birth}
            onChange={(e) => onDataChange({ 
              dates: { ...data.dates, birth: e.target.value } 
            })}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="deathDate">Death Date</label>
          <input
            id="deathDate"
            type="date"
            value={data.dates.death}
            onChange={(e) => onDataChange({ 
              dates: { ...data.dates, death: e.target.value } 
            })}
            className="form-input"
          />
        </div>
      </div>
      
      <div className="milestones-section">
        <div className="section-header">
          <h3>Life Milestones</h3>
          <button 
            type="button" 
            onClick={addMilestone}
            className="btn btn-secondary btn-sm"
          >
            + Add Milestone
          </button>
        </div>
        
        {data.dates.milestones.map((milestone) => (
          <div key={milestone.id} className="milestone-item">
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={milestone.date}
                  onChange={(e) => updateMilestone(milestone.id, 'date', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                  placeholder="e.g., Graduation, Marriage"
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={milestone.description}
                onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                placeholder="Describe this milestone..."
                className="form-textarea"
                rows={2}
              />
            </div>
            
            <button
              type="button"
              onClick={() => removeMilestone(milestone.id)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatesStep;
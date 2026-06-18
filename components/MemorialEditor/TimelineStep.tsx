import React from 'react';
import { MemorialData } from './types';

interface TimelineStepProps {
  data: MemorialData;
  onDataChange: (data: Partial<MemorialData>) => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ data, onDataChange }) => {
  const addTimelineEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      date: '',
      title: '',
      description: '',
      category: 'life'
    };
    onDataChange({
      timeline: [...data.timeline, newEvent]
    });
  };

  const updateTimelineEvent = (id: string, field: string, value: string) => {
    const updatedTimeline = data.timeline.map((event) => 
      event.id === id ? { ...event, [field]: value } : event
    );
    onDataChange({
      timeline: updatedTimeline
    });
  };

  const removeTimelineEvent = (id: string) => {
    const updatedTimeline = data.timeline.filter((event) => 
      event.id !== id
    );
    onDataChange({
      timeline: updatedTimeline
    });
  };

  return (
    <div className="editor-step">
      <h2>Life Timeline</h2>
      <p className="step-description">Create a chronological story of their life</p>
      
      <div className="timeline-actions">
        <button 
          type="button" 
          onClick={addTimelineEvent}
          className="btn btn-primary"
        >
          + Add Event
        </button>
      </div>
      
      <div className="timeline-list">
        {data.timeline.map((event) => (
          <div key={event.id} className="timeline-item">
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) => updateTimelineEvent(event.id, 'date', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select
                  value={event.category}
                  onChange={(e) => updateTimelineEvent(event.id, 'category', e.target.value)}
                  className="form-select"
                >
                  <option value="life">Life Event</option>
                  <option value="achievement">Achievement</option>
                  <option value="family">Family</option>
                  <option value="work">Career</option>
                  <option value="memory">Memory</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={event.title}
                onChange={(e) => updateTimelineEvent(event.id, 'title', e.target.value)}
                placeholder="Event title"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={event.description}
                onChange={(e) => updateTimelineEvent(event.id, 'description', e.target.value)}
                placeholder="Describe this event..."
                className="form-textarea"
                rows={3}
              />
            </div>
            
            <button
              type="button"
              onClick={() => removeTimelineEvent(event.id)}
              className="btn btn-danger btn-sm"
            >
              Remove Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineStep;
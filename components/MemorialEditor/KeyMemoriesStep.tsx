import React from 'react';
import { MemorialData } from './types';

interface KeyMemoriesStepProps {
  data: MemorialData;
  onDataChange: (data: Partial<MemorialData>) => void;
}

const KeyMemoriesStep: React.FC<KeyMemoriesStepProps> = ({ data, onDataChange }) => {
  const addMemory = () => {
    const newMemory = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      people: ''
    };
    onDataChange({
      keyMemories: [...data.keyMemories, newMemory]
    });
  };

  const updateMemory = (id: string, field: string, value: string) => {
    const updatedMemories = data.keyMemories.map((memory) => 
      memory.id === id ? { ...memory, [field]: value } : memory
    );
    onDataChange({
      keyMemories: updatedMemories
    });
  };

  const removeMemory = (id: string) => {
    const updatedMemories = data.keyMemories.filter((memory) => 
      memory.id !== id
    );
    onDataChange({
      keyMemories: updatedMemories
    });
  };

  return (
    <div className="editor-step">
      <h2>Key Memories</h2>
      <p className="step-description">Capture special moments and stories</p>
      
      <div className="memories-actions">
        <button 
          type="button" 
          onClick={addMemory}
          className="btn btn-primary"
        >
          + Add Memory
        </button>
      </div>
      
      <div className="memories-list">
        {data.keyMemories.map((memory) => (
          <div key={memory.id} className="memory-item">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={memory.title}
                onChange={(e) => updateMemory(memory.id, 'title', e.target.value)}
                placeholder="Memory title"
                className="form-input"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={memory.date}
                  onChange={(e) => updateMemory(memory.id, 'date', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>People Involved</label>
                <input
                  type="text"
                  value={memory.people}
                  onChange={(e) => updateMemory(memory.id, 'people', e.target.value)}
                  placeholder="Who was there?"
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={memory.description}
                onChange={(e) => updateMemory(memory.id, 'description', e.target.value)}
                placeholder="Tell the story of this memory..."
                className="form-textarea"
                rows={4}
              />
            </div>
            
            <button
              type="button"
              onClick={() => removeMemory(memory.id)}
              className="btn btn-danger btn-sm"
            >
              Remove Memory
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMemoriesStep;
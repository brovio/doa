import React from 'react';

interface MemorialEditorHeaderProps {
  title: string;
  lastSaved: Date | null;
  isSaving: boolean;
}

const MemorialEditorHeader: React.FC<MemorialEditorHeaderProps> = ({ 
  title, 
  lastSaved, 
  isSaving 
}) => {
  const formatLastSaved = () => {
    if (!lastSaved) return 'Not saved yet';
    return `Last saved: ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="memorial-editor-header">
      <h1 className="memorial-editor-title">{title}</h1>
      <div className="memorial-editor-status">
        {isSaving ? 'Saving...' : formatLastSaved()}
      </div>
    </div>
  );
};

export default MemorialEditorHeader;
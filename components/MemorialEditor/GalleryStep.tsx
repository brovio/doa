import React from 'react';
import { MemorialData } from './types';

interface GalleryStepProps {
  data: MemorialData;
  onDataChange: (data: Partial<MemorialData>) => void;
}

const GalleryStep: React.FC<GalleryStepProps> = ({ data, onDataChange }) => {
  const addImage = () => {
    const newImage = {
      id: Date.now().toString(),
      url: '',
      title: '',
      description: '',
      date: ''
    };
    onDataChange({
      gallery: [...data.gallery, newImage]
    });
  };

  const updateImage = (id: string, field: string, value: string) => {
    const updatedGallery = data.gallery.map((image) => 
      image.id === id ? { ...image, [field]: value } : image
    );
    onDataChange({
      gallery: updatedGallery
    });
  };

  const removeImage = (id: string) => {
    const updatedGallery = data.gallery.filter((image) => 
      image.id !== id
    );
    onDataChange({
      gallery: updatedGallery
    });
  };

  return (
    <div className="editor-step">
      <h2>Photo Gallery</h2>
      <p className="step-description">Add cherished memories and photographs</p>
      
      <div className="gallery-actions">
        <button 
          type="button" 
          onClick={addImage}
          className="btn btn-primary"
        >
          + Add Photo
        </button>
      </div>
      
      <div className="gallery-grid">
        {data.gallery.map((image) => (
          <div key={image.id} className="gallery-item">
            <div className="gallery-item-content">
              {image.url ? (
                <img src={image.url} alt={image.title} className="gallery-image" />
              ) : (
                <div className="gallery-placeholder">
                  <span>No image uploaded</span>
                </div>
              )}
              
              <div className="gallery-item-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={image.title}
                    onChange={(e) => updateImage(image.id, 'title', e.target.value)}
                    placeholder="Photo title"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={image.date}
                    onChange={(e) => updateImage(image.id, 'date', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={image.description}
                    onChange={(e) => updateImage(image.id, 'description', e.target.value)}
                    placeholder="Describe this moment..."
                    className="form-textarea"
                    rows={2}
                  />
                </div>
                
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={image.url}
                    onChange={(e) => updateImage(image.id, 'url', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="form-input"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="btn btn-danger btn-sm"
                >
                  Remove Photo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryStep;
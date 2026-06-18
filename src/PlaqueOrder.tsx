import React, { useState } from 'react';
import { Button, Input, Card } from '../components';

const PlaqueOrder: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'personalization' | 'review' | 'confirmation'>('selection');
  const [selectedPlaque, setSelectedPlaque] = useState<string | null>(null);
  
  const plaqueOptions = [
    { id: 'standard', name: 'Standard Plaque', price: 49.99 },
    { id: 'premium', name: 'Premium Plaque', price: 79.99 },
    { id: 'custom', name: 'Custom Plaque', price: 99.99 }
  ];

  const handleSelectPlaque = (plaqueId: string) => {
    setSelectedPlaque(plaqueId);
    setStep('personalization');
  };

  const handleContinue = () => {
    if (step === 'personalization') {
      setStep('review');
    } else if (step === 'review') {
      setStep('confirmation');
    }
  };

  const handleBack = () => {
    if (step === 'personalization') {
      setStep('selection');
      setSelectedPlaque(null);
    } else if (step === 'review') {
      setStep('personalization');
    }
  };

  const handleHandoff = () => {
    alert('Handing off to memorial setup...');
    // Reset to beginning
    setStep('selection');
    setSelectedPlaque(null);
  };

  return (
    <div className="plaque-order">
      <Card elevation="md" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Plaque Ordering</h2>
        
        {step === 'selection' && (
          <div>
            <h3>Select Your Plaque</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {plaqueOptions.map(plaque => (
                <Card key={plaque.id} elevation="sm" style={{ width: '200px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '100px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      Plaque Image
                    </div>
                    <h4>{plaque.name}</h4>
                    <p>${plaque.price.toFixed(2)}</p>
                    <Button variant="primary" onClick={() => handleSelectPlaque(plaque.id)}>
                      Select
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'personalization' && (
          <div>
            <h3>Personalize Your Plaque</h3>
            <Card elevation="sm" style={{ marginBottom: '1rem' }}>
              <h4>Preview</h4>
              <div style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center', minHeight: '100px' }}>
                Preview Area
              </div>
            </Card>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input label="Name" placeholder="Enter name" />
              <Input label="Dates" placeholder="e.g., 1950-2020" />
              <Input label="Message" placeholder="Optional message" />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={handleBack}>Back</Button>
              <Button variant="primary" onClick={handleContinue}>Continue</Button>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div>
            <h3>Review Your Order</h3>
            <Card elevation="sm" style={{ marginBottom: '1rem' }}>
              <h4>Plaque Selection</h4>
              <p>Selected: {selectedPlaque}</p>
            </Card>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={handleBack}>Back</Button>
              <Button variant="primary" onClick={handleContinue}>Confirm Order</Button>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div>
            <h3>Order Confirmed!</h3>
            <p style={{ textAlign: 'center', fontSize: '3rem' }}>✓</p>
            <p>Your order has been placed successfully.</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Button variant="primary" onClick={handleHandoff}>
                Continue to Memorial Setup
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PlaqueOrder;
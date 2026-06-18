import React, { useState } from 'react';
import './styles/globals.css';
import { Button, Input, Card } from '../components';
import PlaqueOrder from './PlaqueOrder';

function App() {
  const [showPlaqueOrder, setShowPlaqueOrder] = useState(false);

  if (showPlaqueOrder) {
    return <PlaqueOrder />;
  }
  return (
    <div className="app">
      <header className="app-header">
        <h1>DOA Project</h1>
        <p>Welcome to the Design-Oriented Architecture project</p>
      </header>
      <main className="app-main">
        <Card elevation="md" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Project Overview</h2>
          <p>This is a placeholder for the main application content.</p>
          
          <h3>Key Documentation</h3>
          <ul>
            <li>Design system decisions are documented in the <code>design-system/decisions</code> directory.</li>
            <li>Route structure is defined in <code>docs/route-structure.md</code>.</li>
            <li>Content model is defined in <code>docs/content-model.md</code>.</li>
            <li>Shared components are located in the <code>components</code> directory.</li>
          </ul>
          
          <h3>Component Examples</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <Input label="Example Input" placeholder="Enter some text" />
            <Input label="Error Input" placeholder="This has an error" error="This field is required" />
          </div>
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <h3>Plaque Ordering</h3>
            <p>Order a memorial plaque for your loved one.</p>
            <Button variant="primary" onClick={() => setShowPlaqueOrder(true)}>
              Start Plaque Order
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default App;
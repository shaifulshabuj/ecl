import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';

// Import your components here
// For example: import { Button } from './components/Button/Button';

const Demo = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">ECL Component Library Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Components</h2>
          <p className="mb-4">This is a simple demo page for the ECL component library.</p>
          
          {/* Add your components here */}
          {/* For example: <Button>Click Me</Button> */}
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Documentation</h2>
          <p>
            The Enterprise Component Library (ECL) is a scalable, reusable component library 
            built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);

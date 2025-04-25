import React from 'react';
import { useChannel } from '@storybook/preview-api';
import { addons, types } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import { FORCE_REMOUNT, STORY_RENDERED } from '@storybook/core-events';

// Define the panel component
const TestStatePanel = () => {
  const emit = useChannel({});
  
  const testStates = [
    { name: 'Default', description: 'Default component state' },
    { name: 'Hover', description: 'Component in hover state' },
    { name: 'Focus', description: 'Component in focus state' },
    { name: 'Active', description: 'Component in active/pressed state' },
    { name: 'Disabled', description: 'Component in disabled state' },
    { name: 'Loading', description: 'Component in loading state' },
    { name: 'Error', description: 'Component in error state' },
    { name: 'Success', description: 'Component in success state' },
  ];
  
  const applyState = (stateName) => {
    // Force the story to re-render
    emit(FORCE_REMOUNT);
    
    // Wait for the story to render
    emit(STORY_RENDERED, () => {
      // Get the story iframe
      const iframe = document.getElementById('storybook-preview-iframe');
      if (!iframe) return;
      
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      
      // Find all buttons or interactive elements
      const elements = iframeDocument.querySelectorAll('button, input, select, textarea, a');
      
      // Reset all states
      elements.forEach(el => {
        el.blur();
        el.classList.remove('hover-state', 'focus-state', 'active-state');
      });
      
      // Apply the selected state
      if (elements.length > 0) {
        const el = elements[0];
        
        switch (stateName) {
          case 'Hover':
            el.classList.add('hover-state');
            // Simulate hover with CSS if possible
            const hoverStyle = document.createElement('style');
            hoverStyle.innerHTML = `
              .hover-state { 
                position: relative;
              }
              .hover-state::after {
                content: "Hover state";
                position: absolute;
                top: -20px;
                left: 0;
                background: #333;
                color: white;
                padding: 2px 5px;
                border-radius: 3px;
                font-size: 12px;
              }
            `;
            iframeDocument.head.appendChild(hoverStyle);
            break;
          case 'Focus':
            el.focus();
            break;
          case 'Active':
            el.classList.add('active-state');
            // Simulate active state with CSS
            const activeStyle = document.createElement('style');
            activeStyle.innerHTML = `
              .active-state { 
                position: relative;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.1) !important;
                transform: translateY(1px) !important;
              }
              .active-state::after {
                content: "Active state";
                position: absolute;
                top: -20px;
                left: 0;
                background: #333;
                color: white;
                padding: 2px 5px;
                border-radius: 3px;
                font-size: 12px;
              }
            `;
            iframeDocument.head.appendChild(activeStyle);
            break;
          default:
            // Default state doesn't need special handling
            break;
        }
      }
    });
  };
  
  return React.createElement(
    'div', 
    { style: { padding: '15px' } },
    React.createElement('h3', { style: { marginTop: 0, marginBottom: '10px' } }, 'Test Component States'),
    React.createElement('p', { style: { marginBottom: '15px', fontSize: '12px', color: '#666' } }, 
      'Click to simulate different component states for testing'
    ),
    React.createElement(
      'div', 
      { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } },
      testStates.map(state => 
        React.createElement(
          'button',
          {
            key: state.name,
            onClick: () => applyState(state.name),
            style: {
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f5f5f5',
              cursor: 'pointer',
              fontSize: '13px',
            },
            title: state.description
          },
          state.name
        )
      )
    )
  );
};

// Register the addon
addons.register('ecl/test-states', () => {
  addons.add('test-states/panel', {
    type: types.PANEL,
    title: 'Test States',
    render: ({ active, key }) => 
      React.createElement(
        AddonPanel, 
        { active: active, key: key },
        React.createElement(TestStatePanel, null)
      )
  });
});

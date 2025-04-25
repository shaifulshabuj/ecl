import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

/**
 * Switch Component
 * 
 * An accessible toggle switch component with support for labels, error states, and different sizes.
 */
const meta: Meta<typeof Switch> = {
  title: 'Components/Form/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: 'An accessible toggle switch component with support for labels, error states, and different sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the switch',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
    },
    inline: {
      control: 'boolean',
      description: 'Whether to display the switch and label inline',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to the switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'right' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'The visual style of the switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the switch is initially checked (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * Default Switch example
 */
export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

/**
 * Checked Switch
 */
export const Checked: Story = {
  args: {
    label: 'Dark mode',
    defaultChecked: true,
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Enable analytics',
    helperText: 'We collect anonymous usage data to improve our service',
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    label: 'Accept terms',
    error: 'You must accept the terms to continue',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Premium feature (disabled)',
    disabled: true,
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch (default)" size="md" />
      <Switch label="Large switch" size="lg" />
    </div>
  ),
};

/**
 * Label positions
 */
export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Label on right (default)" labelPosition="right" />
      <Switch label="Label on left" labelPosition="left" />
    </div>
  ),
};

/**
 * Controlled Switch
 */
export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [checked, setChecked] = useState(false);
    
    return (
      <div className="space-y-4">
        <Switch 
          label={`Controlled switch (${checked ? 'on' : 'off'})`}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        
        <button
          className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={() => setChecked(!checked)}
        >
          Toggle switch
        </button>
      </div>
    );
  }
};

/**
 * Settings form example
 */
export const SettingsForm: Story = {
  render: function SettingsFormExample() {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      analytics: true,
      newsletter: false,
      soundEffects: true,
    });
    
    const handleChange = (setting: keyof typeof settings) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings(prev => ({
        ...prev,
        [setting]: e.target.checked
      }));
    };
    
    return (
      <div className="w-full max-w-md p-6 border rounded-lg shadow-sm space-y-6">
        <h2 className="text-xl font-semibold mb-4">User Settings</h2>
        
        <div className="space-y-4">
          <Switch
            label="Enable notifications"
            checked={settings.notifications}
            onChange={handleChange('notifications')}
            helperText="Receive alerts about account activity"
          />
          
          <Switch
            label="Dark mode"
            checked={settings.darkMode}
            onChange={handleChange('darkMode')}
            helperText="Use dark color theme"
          />
          
          <Switch
            label="Analytics"
            checked={settings.analytics}
            onChange={handleChange('analytics')}
            helperText="Help us improve by sending anonymous usage data"
          />
          
          <Switch
            label="Newsletter"
            checked={settings.newsletter}
            onChange={handleChange('newsletter')}
            helperText="Receive monthly updates and tips"
          />
          
          <Switch
            label="Sound effects"
            checked={settings.soundEffects}
            onChange={handleChange('soundEffects')}
            helperText="Play sounds for notifications and actions"
          />
        </div>
        
        <div className="pt-4">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            Save Settings
          </button>
        </div>
      </div>
    );
  }
};

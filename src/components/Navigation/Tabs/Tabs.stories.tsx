import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';
import { Box } from '../../Layout/Box';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline', 'enclosed', 'vertical'],
      description: 'The visual style of the tabs',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the tabs',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    defaultTab: {
      control: 'text',
      description: 'The ID of the default active tab',
    },
    fitted: {
      control: 'boolean',
      description: 'Whether tabs should take up the full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'The alignment of the tabs',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all tabs are disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when tab changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic example with default tabs
export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="tab1">Tab 1</Tab>
        <Tab id="tab2">Tab 2</Tab>
        <Tab id="tab3">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="tab1">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
            <p>This is the content for Tab 1.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab2">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
            <p>This is the content for Tab 2.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab3">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
            <p>This is the content for Tab 3.</p>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
  args: {
    defaultTab: 'tab1',
  },
};

// Pills variant
export const Pills: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="tab1">Tab 1</Tab>
        <Tab id="tab2">Tab 2</Tab>
        <Tab id="tab3">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="tab1">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
            <p>This is the content for Tab 1.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab2">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
            <p>This is the content for Tab 2.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab3">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
            <p>This is the content for Tab 3.</p>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
  args: {
    variant: 'pills',
    defaultTab: 'tab1',
  },
};

// Underline variant
export const Underline: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="tab1">Tab 1</Tab>
        <Tab id="tab2">Tab 2</Tab>
        <Tab id="tab3">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="tab1">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
            <p>This is the content for Tab 1.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab2">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
            <p>This is the content for Tab 2.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab3">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
            <p>This is the content for Tab 3.</p>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
  args: {
    variant: 'underline',
    defaultTab: 'tab1',
  },
};

// Enclosed variant
export const Enclosed: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="tab1">Tab 1</Tab>
        <Tab id="tab2">Tab 2</Tab>
        <Tab id="tab3">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="tab1">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
            <p>This is the content for Tab 1.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab2">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
            <p>This is the content for Tab 2.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab3">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
            <p>This is the content for Tab 3.</p>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
  args: {
    variant: 'enclosed',
    defaultTab: 'tab1',
  },
};

// Vertical variant
export const Vertical: Story = {
  render: (args) => (
    <Tabs {...args}>
      <div className="flex">
        <TabList className="w-48 mr-4">
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
          <Tab id="tab3">Tab 3</Tab>
        </TabList>
        <TabPanels className="flex-1">
          <TabPanel id="tab1">
            <Box padding="md" border="thin" rounded="md">
              <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
              <p>This is the content for Tab 1.</p>
            </Box>
          </TabPanel>
          <TabPanel id="tab2">
            <Box padding="md" border="thin" rounded="md">
              <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
              <p>This is the content for Tab 2.</p>
            </Box>
          </TabPanel>
          <TabPanel id="tab3">
            <Box padding="md" border="thin" rounded="md">
              <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
              <p>This is the content for Tab 3.</p>
            </Box>
          </TabPanel>
        </TabPanels>
      </div>
    </Tabs>
  ),
  args: {
    variant: 'vertical',
    defaultTab: 'tab1',
  },
};

// Different sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small</h3>
        <Tabs defaultTab="tab1" size="sm">
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">
              <Box padding="sm" border="thin" rounded="md">
                <p>Small tab content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab2">
              <Box padding="sm" border="thin" rounded="md">
                <p>Small tab content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab3">
              <Box padding="sm" border="thin" rounded="md">
                <p>Small tab content</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Medium (Default)</h3>
        <Tabs defaultTab="tab1" size="md">
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">
              <Box padding="md" border="thin" rounded="md">
                <p>Medium tab content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab2">
              <Box padding="md" border="thin" rounded="md">
                <p>Medium tab content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab3">
              <Box padding="md" border="thin" rounded="md">
                <p>Medium tab content</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Large</h3>
        <Tabs defaultTab="tab1" size="lg">
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">
              <Box padding="lg" border="thin" rounded="md">
                <p>Large tab content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab2">
              <Box padding="lg" border="thin" rounded="md">
                <p>Large tab content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab3">
              <Box padding="lg" border="thin" rounded="md">
                <p>Large tab content</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
};

// Fitted tabs
export const Fitted: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="tab1">Tab 1</Tab>
        <Tab id="tab2">Tab 2</Tab>
        <Tab id="tab3">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="tab1">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
            <p>This is the content for Tab 1.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab2">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
            <p>This is the content for Tab 2.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab3">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
            <p>This is the content for Tab 3.</p>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
  args: {
    defaultTab: 'tab1',
    fitted: true,
  },
};

// Aligned tabs
export const Alignment: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Left Aligned (Default)</h3>
        <Tabs defaultTab="tab1" align="left">
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">
              <Box padding="md" border="thin" rounded="md">
                <p>Left aligned tabs content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab2">
              <Box padding="md" border="thin" rounded="md">
                <p>Left aligned tabs content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab3">
              <Box padding="md" border="thin" rounded="md">
                <p>Left aligned tabs content</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Center Aligned</h3>
        <Tabs defaultTab="tab1" align="center">
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">
              <Box padding="md" border="thin" rounded="md">
                <p>Center aligned tabs content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab2">
              <Box padding="md" border="thin" rounded="md">
                <p>Center aligned tabs content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab3">
              <Box padding="md" border="thin" rounded="md">
                <p>Center aligned tabs content</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Right Aligned</h3>
        <Tabs defaultTab="tab1" align="right">
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">
              <Box padding="md" border="thin" rounded="md">
                <p>Right aligned tabs content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab2">
              <Box padding="md" border="thin" rounded="md">
                <p>Right aligned tabs content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab3">
              <Box padding="md" border="thin" rounded="md">
                <p>Right aligned tabs content</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
};

// Disabled tabs
export const Disabled: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Individual Tab Disabled</h3>
        <Tabs defaultTab="tab1">
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2" disabled>Tab 2 (Disabled)</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">
              <Box padding="md" border="thin" rounded="md">
                <p>Tab 1 content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab2">
              <Box padding="md" border="thin" rounded="md">
                <p>Tab 2 content (you shouldn't see this)</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab3">
              <Box padding="md" border="thin" rounded="md">
                <p>Tab 3 content</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">All Tabs Disabled</h3>
        <Tabs defaultTab="tab1" disabled>
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">
              <Box padding="md" border="thin" rounded="md">
                <p>Tab 1 content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab2">
              <Box padding="md" border="thin" rounded="md">
                <p>Tab 2 content</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab3">
              <Box padding="md" border="thin" rounded="md">
                <p>Tab 3 content</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab 
          id="tab1" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          }
        >
          Home
        </Tab>
        <Tab 
          id="tab2" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          }
        >
          Profile
        </Tab>
        <Tab 
          id="tab3" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          }
        >
          Settings
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="tab1">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Home</h3>
            <p>Welcome to the home tab.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab2">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p>This is your profile information.</p>
          </Box>
        </TabPanel>
        <TabPanel id="tab3">
          <Box padding="md" border="thin" rounded="md">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p>Adjust your account settings here.</p>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
  args: {
    defaultTab: 'tab1',
  },
};

// Controlled tabs
export const Controlled: Story = {
  render: () => {
    // Use React hooks in the render function
    const [activeTab, setActiveTab] = React.useState('tab1');
    
    return (
      <div>
        <div className="mb-4">
          <p className="mb-2">External controls:</p>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 bg-primary-100 hover:bg-primary-200 rounded"
              onClick={() => setActiveTab('tab1')}
            >
              Activate Tab 1
            </button>
            <button 
              className="px-3 py-1 bg-primary-100 hover:bg-primary-200 rounded"
              onClick={() => setActiveTab('tab2')}
            >
              Activate Tab 2
            </button>
            <button 
              className="px-3 py-1 bg-primary-100 hover:bg-primary-200 rounded"
              onClick={() => setActiveTab('tab3')}
            >
              Activate Tab 3
            </button>
          </div>
        </div>
        
        <Tabs 
          activeTab={activeTab} 
          onChange={(tabId) => setActiveTab(tabId)}
        >
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">
              <Box padding="md" border="thin" rounded="md">
                <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
                <p>This is the content for Tab 1.</p>
                <p className="mt-2">Active tab: {activeTab}</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab2">
              <Box padding="md" border="thin" rounded="md">
                <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
                <p>This is the content for Tab 2.</p>
                <p className="mt-2">Active tab: {activeTab}</p>
              </Box>
            </TabPanel>
            <TabPanel id="tab3">
              <Box padding="md" border="thin" rounded="md">
                <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
                <p>This is the content for Tab 3.</p>
                <p className="mt-2">Active tab: {activeTab}</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  },
};

import React, { useState, createContext, useContext, useCallback, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { BaseProps } from '../../../types/common';

// ==============================
// Tab Context
// ==============================

interface TabContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  registerTab: (id: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within a TabsProvider');
  }
  return context;
}

// ==============================
// Tabs Container
// ==============================

const tabsVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        pills: '',
        underline: 'border-b border-neutral-200',
        enclosed: 'border-b border-neutral-200',
        vertical: 'flex',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TabsProps extends BaseProps, VariantProps<typeof tabsVariants> {
  /**
   * The default active tab id
   */
  defaultTab?: string;
  /**
   * Callback when tab changes
   */
  onChange?: (tabId: string) => void;
  /**
   * Whether to manually control the active tab
   */
  activeTab?: string;
  /**
   * Whether to fit tabs to container width
   */
  fitted?: boolean;
  /**
   * Whether to align tabs to the left, center, or right
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Whether to disable all tabs
   */
  disabled?: boolean;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      defaultTab,
      onChange,
      activeTab: controlledActiveTab,
      fitted = false,
      align = 'left',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [tabs, setTabs] = useState<string[]>([]);
    const [internalActiveTab, setInternalActiveTab] = useState<string>(defaultTab || '');
    
    const isControlled = controlledActiveTab !== undefined;
    const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

    useEffect(() => {
      // If there's no active tab but we have tabs, set the first one as active
      if (!activeTab && tabs.length > 0) {
        const firstTab = tabs[0];
        if (!isControlled) {
          setInternalActiveTab(firstTab);
        }
        onChange?.(firstTab);
      }
    }, [activeTab, tabs, isControlled, onChange]);

    const setActiveTab = useCallback((id: string) => {
      if (disabled) return;
      
      if (!isControlled) {
        setInternalActiveTab(id);
      }
      onChange?.(id);
    }, [disabled, isControlled, onChange]);

    const registerTab = useCallback((id: string) => {
      setTabs(prev => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });
      return () => {
        setTabs(prev => prev.filter(tabId => tabId !== id));
      };
    }, []);

    return (
      <TabContext.Provider value={{ activeTab, setActiveTab, registerTab }}>
        <div
          ref={ref}
          className={cn(
            tabsVariants({ variant, size }),
            className
          )}
          role="tablist"
          aria-orientation={variant === 'vertical' ? 'vertical' : 'horizontal'}
          {...props}
        >
          {children}
        </div>
      </TabContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// ==============================
// Tab List
// ==============================

const tabListVariants = cva(
  'flex',
  {
    variants: {
      variant: {
        default: 'border-b border-neutral-200',
        pills: 'space-x-1',
        underline: '',
        enclosed: 'space-x-1',
        vertical: 'flex-col',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      fitted: {
        true: 'w-full',
      },
      align: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      align: 'left',
    },
    compoundVariants: [
      {
        variant: 'vertical',
        className: 'border-b-0 border-r border-neutral-200 pr-4',
      },
    ],
  }
);

export interface TabListProps extends BaseProps, Omit<VariantProps<typeof tabListVariants>, 'fitted' | 'align'> {}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  (
    {
      children,
      className,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const { activeTab } = useTabContext();
    const tabsProps = useContext(TabContext);
    
    if (!tabsProps) {
      throw new Error('TabList must be used within a Tabs component');
    }

    const { variant: tabsVariant, size: tabsSize, fitted, align } = props as TabsProps;

    return (
      <div
        ref={ref}
        className={cn(
          tabListVariants({
            variant: variant || tabsVariant,
            size: size || tabsSize,
            fitted,
            align,
          }),
          className
        )}
        role="tablist"
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

// ==============================
// Tab
// ==============================

const tabVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-b-2 border-transparent px-4 py-2 hover:border-neutral-300 data-[state=active]:border-primary-500',
        pills: 'px-4 py-2 hover:bg-neutral-100 data-[state=active]:bg-primary-500 data-[state=active]:text-white rounded-full',
        underline: 'border-b-2 border-transparent px-4 py-2 hover:border-neutral-300 data-[state=active]:border-primary-500',
        enclosed: 'border-b border-transparent px-4 py-2 hover:bg-neutral-100 data-[state=active]:border-neutral-200 data-[state=active]:border-b-0 data-[state=active]:border-t-2 data-[state=active]:border-t-primary-500 rounded-t-md',
        vertical: 'justify-start border-l-2 border-transparent px-4 py-2 hover:bg-neutral-100 hover:border-neutral-300 data-[state=active]:border-primary-500',
      },
      size: {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-6 py-3',
      },
      fitted: {
        true: 'flex-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'vertical',
        className: 'border-l-2 border-r-0',
      },
    ],
  }
);

export interface TabProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>, VariantProps<typeof tabVariants> {
  /**
   * The id of the tab
   */
  id: string;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
  /**
   * Icon to display before the tab text
   */
  icon?: React.ReactNode;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      children,
      className,
      variant,
      size,
      id,
      disabled = false,
      icon,
      fitted,
      ...props
    },
    ref
  ) => {
    const { activeTab, setActiveTab, registerTab } = useTabContext();
    const isActive = activeTab === id;
    const tabsProps = useContext(TabContext);
    
    if (!tabsProps) {
      throw new Error('Tab must be used within a Tabs component');
    }

    const { variant: tabsVariant, size: tabsSize, disabled: tabsDisabled } = props as TabsProps;
    const isDisabled = disabled || tabsDisabled;

    useEffect(() => {
      registerTab(id);
    }, [id, registerTab]);

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        id={`tab-${id}`}
        aria-selected={isActive}
        aria-controls={`panel-${id}`}
        tabIndex={isActive ? 0 : -1}
        disabled={isDisabled}
        className={cn(
          tabVariants({
            variant: variant || tabsVariant,
            size: size || tabsSize,
            fitted,
          }),
          className
        )}
        data-state={isActive ? 'active' : 'inactive'}
        onClick={() => setActiveTab(id)}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

// ==============================
// Tab Panels Container
// ==============================

export interface TabPanelsProps extends BaseProps {}

export const TabPanels = React.forwardRef<HTMLDivElement, TabPanelsProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('mt-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanels.displayName = 'TabPanels';

// ==============================
// Tab Panel
// ==============================

export interface TabPanelProps extends BaseProps {
  /**
   * The id of the tab this panel belongs to
   */
  id: string;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  (
    {
      children,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const { activeTab } = useTabContext();
    const isActive = activeTab === id;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${id}`}
        aria-labelledby={`tab-${id}`}
        tabIndex={0}
        className={cn(
          'focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm p-4',
          className
        )}
        hidden={!isActive}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';

// Components are exported individually above

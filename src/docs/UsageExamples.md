# ECL Usage Examples

This document provides practical examples of how to use ECL components in common UI patterns and layouts.

## Basic Form

A simple form with various input types, validation, and submission handling.

```tsx
import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  FormGroup,
  Input,
  Label,
  Select,
  Stack,
  TextArea,
} from 'ecl';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    subscribe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          subscribe: false,
        });
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="lg">
        <FormGroup>
          <Label htmlFor="name" required>Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <div id="name-error" className="text-red-500 text-sm mt-1">
              {errors.name}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email" required>Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div id="email-error" className="text-red-500 text-sm mt-1">
              {errors.email}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Support</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message" required>Message</Label>
          <TextArea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <div id="message-error" className="text-red-500 text-sm mt-1">
              {errors.message}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Checkbox
            id="subscribe"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
          >
            Subscribe to newsletter
          </Checkbox>
        </FormGroup>

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Stack>
    </form>
  );
}
```

## Dashboard Layout

A responsive dashboard layout using Grid and Container components.

```tsx
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
} from 'ecl';

function Dashboard() {
  return (
    <Container size="xl" padding="lg">
      <Stack spacing="xl">
        <header>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Divider />
        </header>
        
        <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
          {/* Summary Cards */}
          <Box padding="lg" rounded="md" shadow="md" border="thin">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold">1,234</p>
          </Box>
          
          <Box padding="lg" rounded="md" shadow="md" border="thin">
            <h2 className="text-lg font-semibold mb-2">Revenue</h2>
            <p className="text-3xl font-bold">$45,678</p>
          </Box>
          
          <Box padding="lg" rounded="md" shadow="md" border="thin">
            <h2 className="text-lg font-semibold mb-2">Active Projects</h2>
            <p className="text-3xl font-bold">27</p>
          </Box>
        </Grid>
        
        <Grid columns={{ sm: 1, lg: 2 }} gap="lg">
          {/* Charts and Tables */}
          <Box padding="lg" rounded="md" shadow="md" border="thin">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            <div className="h-64 bg-gray-100 flex items-center justify-center">
              Chart Placeholder
            </div>
          </Box>
          
          <Box padding="lg" rounded="md" shadow="md" border="thin">
            <h2 className="text-lg font-semibold mb-4">Top Products</h2>
            <div className="h-64 bg-gray-100 flex items-center justify-center">
              Table Placeholder
            </div>
          </Box>
        </Grid>
        
        <Box padding="lg" rounded="md" shadow="md" border="thin">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            Activity Feed Placeholder
          </div>
        </Box>
      </Stack>
    </Container>
  );
}
```

## Authentication Forms

Login and registration forms with validation.

```tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormGroup,
  Input,
  Label,
  Stack,
  Switch,
} from 'ecl';

function AuthForms() {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', loginData);
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register submitted:', registerData);
  };
  
  return (
    <Container size="sm" padding="lg">
      <Box padding="xl" rounded="lg" shadow="lg" border="thin">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 ${activeTab === 'login' ? 'border-b-2 border-primary-500 font-semibold' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === 'register' ? 'border-b-2 border-primary-500 font-semibold' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
        
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <Stack spacing="md">
              <FormGroup>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </FormGroup>
              
              <div className="flex items-center justify-between">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={loginData.remember}
                  onChange={handleLoginChange}
                >
                  Remember me
                </Checkbox>
                
                <a href="#" className="text-sm text-primary-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <Button type="submit" variant="primary" className="w-full">
                Sign In
              </Button>
            </Stack>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <Stack spacing="md">
              <FormGroup>
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </FormGroup>
              
              <Checkbox
                id="agree-terms"
                name="agreeTerms"
                checked={registerData.agreeTerms}
                onChange={handleRegisterChange}
                required
              >
                I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
              </Checkbox>
              
              <Button type="submit" variant="primary" className="w-full">
                Create Account
              </Button>
            </Stack>
          </form>
        )}
        
        <Divider label="Or continue with" className="my-6" />
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            GitHub
          </Button>
        </div>
      </Box>
    </Container>
  );
}
```

## Settings Panel

A settings panel with various form controls.

```tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormGroup,
  Grid,
  Input,
  Label,
  Radio,
  Select,
  Stack,
  Switch,
} from 'ecl';

function SettingsPanel() {
  const [settings, setSettings] = useState({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software developer with 5 years of experience',
    theme: 'system',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: 'friends',
    language: 'en',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [name]: checked,
      },
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
  };
  
  return (
    <Container size="lg" padding="lg">
      <Box padding="xl" rounded="lg" shadow="md" border="thin">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing="xl">
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <Divider className="mb-4" />
              
              <Grid columns={{ sm: 1, md: 2 }} gap="md">
                <FormGroup>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    name="displayName"
                    value={settings.displayName}
                    onChange={handleChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Grid>
              
              <FormGroup>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={settings.bio}
                  onChange={handleChange}
                />
                <div className="text-sm text-gray-500 mt-1">
                  Brief description for your profile.
                </div>
              </FormGroup>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Preferences</h2>
              <Divider className="mb-4" />
              
              <FormGroup>
                <Label htmlFor="language">Language</Label>
                <Select
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="es">Spanish</option>
                  <option value="ja">Japanese</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Theme</Label>
                <div className="space-y-2 mt-2">
                  <Radio
                    id="theme-light"
                    name="theme"
                    value="light"
                    checked={settings.theme === 'light'}
                    onChange={handleChange}
                  >
                    Light
                  </Radio>
                  
                  <Radio
                    id="theme-dark"
                    name="theme"
                    value="dark"
                    checked={settings.theme === 'dark'}
                    onChange={handleChange}
                  >
                    Dark
                  </Radio>
                  
                  <Radio
                    id="theme-system"
                    name="theme"
                    value="system"
                    checked={settings.theme === 'system'}
                    onChange={handleChange}
                  >
                    System Default
                  </Radio>
                </div>
              </FormGroup>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <Divider className="mb-4" />
              
              <div className="space-y-4">
                <FormGroup>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications-email" className="mb-0">
                      Email Notifications
                    </Label>
                    <Switch
                      id="notifications-email"
                      name="email"
                      checked={settings.notifications.email}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Receive notifications via email
                  </div>
                </FormGroup>
                
                <FormGroup>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications-push" className="mb-0">
                      Push Notifications
                    </Label>
                    <Switch
                      id="notifications-push"
                      name="push"
                      checked={settings.notifications.push}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Receive push notifications in your browser
                  </div>
                </FormGroup>
                
                <FormGroup>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications-sms" className="mb-0">
                      SMS Notifications
                    </Label>
                    <Switch
                      id="notifications-sms"
                      name="sms"
                      checked={settings.notifications.sms}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Receive notifications via SMS
                  </div>
                </FormGroup>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Privacy</h2>
              <Divider className="mb-4" />
              
              <FormGroup>
                <Label>Profile Visibility</Label>
                <div className="space-y-2 mt-2">
                  <Radio
                    id="privacy-public"
                    name="privacy"
                    value="public"
                    checked={settings.privacy === 'public'}
                    onChange={handleChange}
                  >
                    Public
                  </Radio>
                  
                  <Radio
                    id="privacy-friends"
                    name="privacy"
                    value="friends"
                    checked={settings.privacy === 'friends'}
                    onChange={handleChange}
                  >
                    Friends Only
                  </Radio>
                  
                  <Radio
                    id="privacy-private"
                    name="privacy"
                    value="private"
                    checked={settings.privacy === 'private'}
                    onChange={handleChange}
                  >
                    Private
                  </Radio>
                </div>
              </FormGroup>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" variant="primary">Save Changes</Button>
            </div>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
```

## Responsive Pricing Table

A responsive pricing table using Grid and Box components.

```tsx
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
} from 'ecl';

function PricingTable() {
  const plans = [
    {
      name: 'Basic',
      price: '$9',
      period: 'per month',
      description: 'Perfect for individuals and small projects',
      features: [
        '5 Projects',
        '20GB Storage',
        'Basic Support',
        'Email Notifications',
        'Access to Basic Templates',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'Great for growing teams and businesses',
      features: [
        'Unlimited Projects',
        '100GB Storage',
        'Priority Support',
        'Advanced Analytics',
        'Custom Domains',
        'Team Collaboration',
        'API Access',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited Everything',
        'Dedicated Support',
        'Custom Integrations',
        'Advanced Security',
        'SLA Guarantee',
        'Dedicated Account Manager',
        'On-premise Deployment Option',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <Container size="xl" padding="lg">
      <Stack spacing="xl" className="text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you and start building amazing projects today.
          </p>
        </div>
        
        <Grid columns={{ sm: 1, lg: 3 }} gap="lg">
          {plans.map((plan) => (
            <Box
              key={plan.name}
              padding="xl"
              rounded="lg"
              shadow={plan.popular ? 'xl' : 'md'}
              border={plan.popular ? 'thick' : 'thin'}
              className={`relative ${plan.popular ? 'border-primary-500' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <Stack spacing="lg">
                <div>
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>
                
                <Divider />
                
                <div className="text-left">
                  <h3 className="font-semibold mb-4">Features include:</h3>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Stack>
            </Box>
          ))}
        </Grid>
        
        <div className="text-gray-600 max-w-2xl mx-auto">
          <p>All plans include a 14-day free trial. No credit card required.</p>
          <p className="mt-2">Need a custom plan? <a href="#" className="text-primary-600 hover:underline">Contact our sales team</a>.</p>
        </div>
      </Stack>
    </Container>
  );
}
```

These examples demonstrate how to use ECL components in common UI patterns and layouts. You can adapt these examples to fit your specific needs and design requirements.

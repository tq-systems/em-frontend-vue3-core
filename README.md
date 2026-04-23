# @tq-em/em-vue3-core

Core utilities for building Vue 3 applications on the TQ-EM platform, including web component integration and route management.

## Installation

First, configure your `.yarnrc.yml` to use the TQ-EM registry for scoped packages:

```yaml
npmScopes:
  tq-em:
    npmRegistryServer: "<tq-em-registry-url>"
```

Then install the package:

```bash
yarn add @tq-em/em-vue3-core
```

## Features

- 🎯 **Web Component Integration** - Convert Vue 3 components into custom web components with plugin support
- 🚦 **Route Management** - Generate Vue Router routes from EM platform route configurations
- ⚡ **Vue 3 Compatible** - Built for Vue 3 with full composition API support
- 🔌 **Plugin Support** - Easily integrate Vue plugins (Router, Pinia, i18n, etc.) into web components

## API Reference

### defineVueWebComponent

Converts a Vue 3 component into a custom web component (Custom Element).

```javascript
import { defineVueWebComponent } from '@tq-em/em-vue3-core'

defineVueWebComponent(tagName, vueRootComponent, additionalPlugins)
```

**Parameters:**
- `tagName` (string): The custom element tag name (e.g., `'my-app'`)
- `vueRootComponent` (Component): The Vue 3 root component to render
- `additionalPlugins` (Array, optional): Array of Vue plugins to install. Default: `[]`

**Features:**
- Automatically handles component lifecycle (mounting/unmounting)
- Prevents duplicate custom element registration
- Dispatches a `mounted` event when component is ready
- Supports multiple Vue plugins (Router, Pinia, i18n, etc.)

### createAppRoutes

Generates Vue Router route configurations from EM platform route definitions.

```javascript
import { createAppRoutes } from '@tq-em/em-vue3-core'

const routes = createAppRoutes(emRoutes, wrapperComponent)
```

**Parameters:**
- `emRoutes` (Array): Array of EM route configuration objects
- `wrapperComponent` (Component): Vue component to wrap each view

**EM Route Configuration Format:**

```javascript
const emRoutes = [
    {
        path: 'dashboard',
        name: 'Dashboard',
        i18nkey: 'dashboard.title',
        views: {
            app: {
                component: 'dashboard-app',
                i18nkey: 'dashboard.app.title'
            },
            settings: {
                component: 'dashboard-settings',
                i18nkey: 'dashboard.settings.title'
            }
        }
    }
]
```

**Returns:**

An array of Vue Router route objects with the following structure:
- Base path redirect to `/path/app`
- Child routes for each view with component wrapper
- Metadata including i18n keys

## Usage Example

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { defineVueWebComponent, createAppRoutes } from '@tq-em/em-vue3-core'
import App from './App.vue'
import ViewWrapper from './components/ViewWrapper.vue'

// Define EM routes
const emRoutes = [
    {
        path: 'energy',
        name: 'Energy',
        i18nkey: 'energy',
        views: {
            app: { component: 'energy-overview', i18nkey: 'energy.overview' },
            analytics: { component: 'energy-analytics', i18nkey: 'energy.analytics' }
        }
    }
]

// Create router with EM routes
const router = createRouter({
    history: createWebHistory(),
    routes: createAppRoutes(emRoutes, ViewWrapper)
})

// Create i18n instance
const i18n = createI18n({
    locale: 'en',
    messages: { /* your messages */ }
})

// Define web component with all plugins
defineVueWebComponent('energy-manager-app', App, [router, i18n])
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>Energy Manager</title>
</head>
<body>
    <energy-manager-app></energy-manager-app>
    <script src="./dist/app.js"></script>
</body>
</html>
```

**Event Handling:**

```javascript
document.querySelector('energy-manager-app').addEventListener('mounted', () => {
    console.log('App is mounted and ready')
})
```

## Requirements

- Vue 3.x or higher

## License

LicenseRef-TQSPSLA-1.0.3 - See [LICENSE](LICENSE) file for details.

## Author

TQ-Systems GmbH

© TQ-Systems GmbH 2026

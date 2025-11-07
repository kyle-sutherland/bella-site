# Windows 95/98 UI Components

A collection of React components styled to replicate the classic Windows 95/98 aesthetic, complete with 3D borders, authentic color schemes, and period-accurate UI elements.

## Features

- **Authentic styling**: Pixel-perfect recreation of Win95/98 UI elements
- **Multiple themes**: Classic, Desert, Lilac, and High Contrast color schemes
- **Reusable components**: Button, Input, Select, Checkbox, Panel, and Window components
- **TypeScript support**: Full type definitions included
- **Accessible**: Built with semantic HTML and ARIA attributes

## Components

### Win95Button

Classic Windows 95 button with raised 3D effect.

```tsx
import { Win95Button } from '@/app/components/win95';

<Win95Button variant="normal">OK</Win95Button>
<Win95Button variant="default">Default</Win95Button>
<Win95Button disabled>Disabled</Win95Button>
```

**Props:**
- `variant`: `'normal'` | `'default'` - Default buttons have a thicker border
- `disabled`: boolean
- All standard button HTML attributes

### Win95Input

Text input with sunken 3D border effect.

```tsx
import { Win95Input } from '@/app/components/win95';

<Win95Input placeholder="Enter text" />
<Win95Input type="password" />
<Win95Input disabled value="Disabled" />
```

**Props:**
- All standard input HTML attributes

### Win95Select

Dropdown select with Win95 styling.

```tsx
import { Win95Select } from '@/app/components/win95';

<Win95Select>
  <option>Option 1</option>
  <option>Option 2</option>
</Win95Select>
```

**Props:**
- All standard select HTML attributes

### Win95Checkbox

Classic checkbox with checkmark indicator.

```tsx
import { Win95Checkbox } from '@/app/components/win95';

<Win95Checkbox label="Enable feature" />
<Win95Checkbox label="Checked" defaultChecked />
<Win95Checkbox label="Disabled" disabled />
```

**Props:**
- `label`: string - Label text
- `checked`: boolean - Controlled state
- `defaultChecked`: boolean - Uncontrolled default state
- `onChange`: (checked: boolean) => void
- `disabled`: boolean

### Win95Panel

Container with 3D border effects.

```tsx
import { Win95Panel } from '@/app/components/win95';

<Win95Panel variant="raised">Raised content</Win95Panel>
<Win95Panel variant="sunken">Sunken content</Win95Panel>
```

**Props:**
- `variant`: `'raised'` | `'sunken'`
- `className`: string
- `style`: React.CSSProperties

### Win95Window

Window component with title bar and control buttons.

```tsx
import { Win95Window } from '@/app/components/win95';

<Win95Window
  title="My Window"
  active={true}
  onClose={() => console.log('Close')}
  onMinimize={() => console.log('Minimize')}
  onMaximize={() => console.log('Maximize')}
>
  Window content
</Win95Window>
```

**Props:**
- `title`: string - Window title
- `active`: boolean - Whether window is active (affects title bar color)
- `showMinimize`: boolean - Show minimize button
- `showMaximize`: boolean - Show maximize button
- `showClose`: boolean - Show close button
- `onMinimize`, `onMaximize`, `onClose`: Callback functions
- `icon`: React.ReactNode - Optional icon in title bar

## Themes

The Win95 components support four color schemes:

1. **Classic** - Traditional silver-gray (#c0c0c0)
2. **Desert** - Sandy tones with teal accents
3. **Lilac** - Purple/pink themed
4. **High Contrast** - Black and white for accessibility

To apply a theme, set the `data-win95-theme` attribute on a parent element:

```tsx
<div data-win95-theme="desert">
  {/* Components will use Desert theme */}
</div>
```

## Utility CSS Classes

The stylesheet includes utility classes for custom styling:

### Borders
- `.win95-border-raised` - Raised 3D effect
- `.win95-border-sunken` - Sunken 3D effect
- `.win95-border-ridge` - Ridge effect for window frames
- `.win95-border-flat` - Flat 1px border

### Backgrounds
- `.win95-bg-face` - Button face color
- `.win95-bg-desktop` - Desktop background color

### Typography
- `.win95-font` - MS Sans Serif font
- `.win95-font-bold` - Bold variant
- `.win95-font-title` - Title bar font

### Other
- `.win95-menu-bar` - Menu bar styling
- `.win95-status-bar` - Status bar styling
- `.win95-status-panel` - Status panel item

## Demo

Visit `/win95-demo` to see all components in action with interactive theme switching.

## CSS Variables

Each theme defines these CSS variables:

```css
--win95-button-face
--win95-button-highlight
--win95-button-light
--win95-button-shadow
--win95-button-dark-shadow
--win95-button-text
--win95-title-bar-active-start
--win95-title-bar-active-end
--win95-title-bar-inactive
--win95-title-text
--win95-window-bg
--win95-input-bg
--win95-input-text
--win95-desktop-bg
```

You can use these variables in custom styles to maintain theme consistency.

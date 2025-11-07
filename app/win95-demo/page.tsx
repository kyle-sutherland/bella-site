'use client';

import { useState } from 'react';
import Win95Button from '../components/win95/Win95Button';
import Win95Input from '../components/win95/Win95Input';
import Win95Select from '../components/win95/Win95Select';
import Win95Checkbox from '../components/win95/Win95Checkbox';
import Win95Panel from '../components/win95/Win95Panel';
import Win95Window from '../components/win95/Win95Window';

export default function Win95Demo() {
  const [theme, setTheme] = useState<'classic' | 'desert' | 'lilac' | 'high-contrast'>('classic');
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div
      className="win95-bg-desktop"
      style={{ minHeight: '100vh', padding: '20px' }}
      data-win95-theme={theme}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 className="win95-font-bold" style={{ color: '#fff', marginBottom: '20px', fontSize: '24px' }}>
          Windows 95/98 UI Components Demo
        </h1>

        {/* Theme Selector */}
        <Win95Panel style={{ marginBottom: '20px' }}>
          <div className="win95-font-bold" style={{ marginBottom: '10px' }}>
            Select Theme:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Win95Button
              variant={theme === 'classic' ? 'default' : 'normal'}
              onClick={() => setTheme('classic')}
            >
              Classic
            </Win95Button>
            <Win95Button
              variant={theme === 'desert' ? 'default' : 'normal'}
              onClick={() => setTheme('desert')}
            >
              Desert
            </Win95Button>
            <Win95Button
              variant={theme === 'lilac' ? 'default' : 'normal'}
              onClick={() => setTheme('lilac')}
            >
              Lilac
            </Win95Button>
            <Win95Button
              variant={theme === 'high-contrast' ? 'default' : 'normal'}
              onClick={() => setTheme('high-contrast')}
            >
              High Contrast
            </Win95Button>
          </div>
        </Win95Panel>

        {/* Windows Demo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
          {/* Buttons Demo */}
          <Win95Window
            title="Buttons"
            onClose={() => alert('Close clicked!')}
            onMinimize={() => alert('Minimize clicked!')}
            onMaximize={() => alert('Maximize clicked!')}
          >
            <div className="win95-font">
              <div style={{ marginBottom: '12px' }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Normal Buttons:</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Win95Button>OK</Win95Button>
                  <Win95Button>Cancel</Win95Button>
                  <Win95Button>Apply</Win95Button>
                  <Win95Button disabled>Disabled</Win95Button>
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Default Button:</div>
                <Win95Button variant="default">OK</Win95Button>
              </div>
            </div>
          </Win95Window>

          {/* Inputs Demo */}
          <Win95Window
            title="Text Inputs"
            onClose={() => alert('Close clicked!')}
          >
            <div className="win95-font">
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Name:
                </label>
                <Win95Input
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Password:
                </label>
                <Win95Input
                  type="password"
                  placeholder="Enter password"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Disabled:
                </label>
                <Win95Input
                  disabled
                  value="Disabled input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </Win95Window>

          {/* Select Demo */}
          <Win95Window
            title="Dropdowns"
            onClose={() => alert('Close clicked!')}
          >
            <div className="win95-font">
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Select an option:
                </label>
                <Win95Select style={{ width: '100%' }}>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                  <option>Option 4</option>
                </Win95Select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Choose a color:
                </label>
                <Win95Select style={{ width: '100%' }}>
                  <option>Red</option>
                  <option>Green</option>
                  <option>Blue</option>
                  <option>Yellow</option>
                  <option>Purple</option>
                </Win95Select>
              </div>
            </div>
          </Win95Window>

          {/* Checkboxes Demo */}
          <Win95Window
            title="Checkboxes"
            onClose={() => alert('Close clicked!')}
          >
            <div className="win95-font">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Win95Checkbox
                  label="Enable feature A"
                  checked={checked}
                  onChange={setChecked}
                />
                <Win95Checkbox label="Enable feature B" defaultChecked />
                <Win95Checkbox label="Enable feature C" />
                <Win95Checkbox label="Disabled option" disabled />
              </div>
            </div>
          </Win95Window>

          {/* Panels Demo */}
          <Win95Window
            title="Panels & Borders"
            onClose={() => alert('Close clicked!')}
          >
            <div className="win95-font">
              <div style={{ marginBottom: '12px' }}>
                <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>Raised Panel:</div>
                <Win95Panel variant="raised">
                  This panel has a raised 3D effect
                </Win95Panel>
              </div>
              <div>
                <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>Sunken Panel:</div>
                <Win95Panel variant="sunken">
                  This panel has a sunken 3D effect
                </Win95Panel>
              </div>
            </div>
          </Win95Window>

          {/* Complex Example */}
          <Win95Window
            title="Login Dialog"
            icon={<span style={{ fontSize: '14px' }}>🔐</span>}
            onClose={() => alert('Close clicked!')}
            showMinimize={false}
            showMaximize={false}
          >
            <div className="win95-font">
              <Win95Panel variant="sunken" style={{ marginBottom: '12px', padding: '12px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                    Username:
                  </label>
                  <Win95Input placeholder="Enter username" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                    Password:
                  </label>
                  <Win95Input type="password" placeholder="Enter password" style={{ width: '100%' }} />
                </div>
              </Win95Panel>
              <Win95Checkbox label="Remember me" style={{ marginBottom: '12px' }} />
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Win95Button variant="default">Login</Win95Button>
                <Win95Button>Cancel</Win95Button>
              </div>
            </div>
          </Win95Window>
        </div>

        {/* Status Bar */}
        <div className="win95-status-bar" style={{ marginTop: '20px' }}>
          <div className="win95-status-panel">Ready</div>
          <div className="win95-status-panel">Theme: {theme}</div>
          <div className="win95-status-panel">Components: 6</div>
        </div>
      </div>
    </div>
  );
}

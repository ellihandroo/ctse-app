import { useState } from 'react'
import { Shield, Lock, Bell, Globe, Palette, Info } from 'lucide-react'
import { useUser } from '../context/UserContext'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'

const typeLabels = {
  retail: 'Retail',
  hnw: 'High Net Worth',
  institutional: 'Institutional',
}

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-10 h-6 rounded-full transition-colors ${
        enabled ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          enabled ? 'translate-x-4' : ''
        }`}
      />
    </button>
  )
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export default function Settings() {
  const { user } = useUser()
  const [currency, setCurrency] = useState('ZAR')
  const [notifications, setNotifications] = useState({
    trades: true,
    prices: true,
    dividends: true,
    corporate: false,
  })

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>

      {/* Profile */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-primary">
              {user?.initials}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{user?.name}</h2>
            <p className="text-sm text-text-muted">{user?.email}</p>
            <Badge variant="primary" className="mt-1">
              {typeLabels[user?.type] || user?.type}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-text-secondary" />
          <h3 className="font-semibold text-text-primary">Preferences</h3>
        </div>
        <div className="divide-y divide-border">
          <SettingRow label="Display Currency" description="Prices shown across the app">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50"
            >
              <option value="ZAR">ZAR (R)</option>
              <option value="USD">USD ($)</option>
            </select>
          </SettingRow>
          <SettingRow label="Trading Theme" description="Dark mode automatically activates on trade screen">
            <Badge variant="neutral">Auto</Badge>
          </SettingRow>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-text-secondary" />
          <h3 className="font-semibold text-text-primary">Notifications</h3>
        </div>
        <div className="divide-y divide-border">
          <SettingRow label="Trade Confirmations" description="Get notified when orders execute">
            <Toggle enabled={notifications.trades} onChange={() => toggleNotification('trades')} />
          </SettingRow>
          <SettingRow label="Price Alerts" description="Alert when assets hit target prices">
            <Toggle enabled={notifications.prices} onChange={() => toggleNotification('prices')} />
          </SettingRow>
          <SettingRow label="Dividends & Yield" description="Income notifications from holdings">
            <Toggle enabled={notifications.dividends} onChange={() => toggleNotification('dividends')} />
          </SettingRow>
          <SettingRow label="Corporate Actions" description="Votes and SENS announcements">
            <Toggle enabled={notifications.corporate} onChange={() => toggleNotification('corporate')} />
          </SettingRow>
        </div>
      </Card>

      {/* Security */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-4 h-4 text-text-secondary" />
          <h3 className="font-semibold text-text-primary">Security</h3>
        </div>
        <div className="divide-y divide-border">
          <SettingRow label="Password" description="Last changed 30 days ago">
            <button className="text-sm text-primary font-medium hover:underline">
              Change
            </button>
          </SettingRow>
          <SettingRow label="Two-Factor Authentication" description="Authenticator app">
            <Badge variant="success">Enabled</Badge>
          </SettingRow>
          <SettingRow label="Active Sessions" description="1 active session">
            <button className="text-sm text-primary font-medium hover:underline">
              Manage
            </button>
          </SettingRow>
        </div>
      </Card>

      {/* About */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-text-secondary" />
          <h3 className="font-semibold text-text-primary">About</h3>
        </div>
        <div className="divide-y divide-border">
          <SettingRow label="App Version">
            <span className="text-sm text-text-muted font-mono">1.0.0-beta</span>
          </SettingRow>
          <SettingRow label="Regulatory Status">
            <Badge variant="primary">
              <Shield className="w-3 h-3 mr-1" />
              FSCA Regulated
            </Badge>
          </SettingRow>
          <SettingRow label="Support">
            <button className="text-sm text-primary font-medium hover:underline">
              support@ctse.app
            </button>
          </SettingRow>
        </div>
      </Card>
    </div>
  )
}

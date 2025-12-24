import { Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Form';
import { showToast } from '../ui/Toast';

export function SettingsScreen() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-[var(--text)] mb-1">Settings</h1>
        <p className="text-[var(--text-muted)]">Manage platform configuration and preferences</p>
      </div>

      {/* General Settings */}
      <Card title="General Settings">
        <div className="space-y-4">
          <Input label="Platform Name" defaultValue="EduAdmin" />
          <Input label="Support Email" type="email" defaultValue="support@eduadmin.com" />
          <div>
            <label className="block mb-2 text-[var(--text)]">Default Language</label>
            <select className="w-full px-4 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]">
              <option>English</option>
              <option>Russian</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-[var(--text)]">Timezone</label>
            <select className="w-full px-4 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]">
              <option>UTC</option>
              <option>Europe/Moscow</option>
              <option>America/New_York</option>
            </select>
          </div>
          <Button variant="primary" onClick={() => showToast('Settings saved', 'success')}>
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Course Settings */}
      <Card title="Course Settings">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text)]">Auto-publish courses</p>
              <p className="text-[var(--text-muted)]">Automatically publish courses when all lessons are complete</p>
            </div>
            <input
              type="checkbox"
              className="w-10 h-6 appearance-none bg-[var(--border)] rounded-full relative cursor-pointer transition-colors checked:bg-[var(--success)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] before:content-[''] before:absolute before:w-5 before:h-5 before:bg-[var(--surface)] before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text)]">Enable course ratings</p>
              <p className="text-[var(--text-muted)]">Allow students to rate courses</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-10 h-6 appearance-none bg-[var(--border)] rounded-full relative cursor-pointer transition-colors checked:bg-[var(--success)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] before:content-[''] before:absolute before:w-5 before:h-5 before:bg-[var(--surface)] before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text)]">Require email verification</p>
              <p className="text-[var(--text-muted)]">Students must verify email before enrolling</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-10 h-6 appearance-none bg-[var(--border)] rounded-full relative cursor-pointer transition-colors checked:bg-[var(--success)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] before:content-[''] before:absolute before:w-5 before:h-5 before:bg-[var(--surface)] before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4"
            />
          </div>
          <Button variant="primary" onClick={() => showToast('Settings saved', 'success')}>
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card title="Notification Settings">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text)]">Email notifications</p>
              <p className="text-[var(--text-muted)]">Receive email updates about platform activity</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-10 h-6 appearance-none bg-[var(--border)] rounded-full relative cursor-pointer transition-colors checked:bg-[var(--success)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] before:content-[''] before:absolute before:w-5 before:h-5 before:bg-[var(--surface)] before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text)]">Review notifications</p>
              <p className="text-[var(--text-muted)]">Get notified when new code reviews are pending</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-10 h-6 appearance-none bg-[var(--border)] rounded-full relative cursor-pointer transition-colors checked:bg-[var(--success)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] before:content-[''] before:absolute before:w-5 before:h-5 before:bg-[var(--surface)] before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text)]">Weekly digest</p>
              <p className="text-[var(--text-muted)]">Receive a weekly summary of platform activity</p>
            </div>
            <input
              type="checkbox"
              className="w-10 h-6 appearance-none bg-[var(--border)] rounded-full relative cursor-pointer transition-colors checked:bg-[var(--success)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] before:content-[''] before:absolute before:w-5 before:h-5 before:bg-[var(--surface)] before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4"
            />
          </div>
          <Button variant="primary" onClick={() => showToast('Settings saved', 'success')}>
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Security Settings */}
      <Card title="Security Settings">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text)]">Two-factor authentication</p>
              <p className="text-[var(--text-muted)]">Add an extra layer of security to your account</p>
            </div>
            <Button variant="secondary">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text)]">Session timeout</p>
              <p className="text-[var(--text-muted)]">Automatically log out after period of inactivity</p>
            </div>
            <select className="px-4 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>Never</option>
            </select>
          </div>
          <Button variant="primary" onClick={() => showToast('Settings saved', 'success')}>
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* API Settings */}
      <Card title="API Settings">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-[var(--text)]">API Key</label>
            <div className="flex gap-2">
              <Input value="••••••••••••••••••••••••••••••••" readOnly />
              <Button variant="secondary">Regenerate</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text)]">Enable API access</p>
              <p className="text-[var(--text-muted)]">Allow external applications to access the API</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-10 h-6 appearance-none bg-[var(--border)] rounded-full relative cursor-pointer transition-colors checked:bg-[var(--success)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] before:content-[''] before:absolute before:w-5 before:h-5 before:bg-[var(--surface)] before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

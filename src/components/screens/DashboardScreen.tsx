import { BookOpen, FileText, CheckSquare, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { KPICard } from '../ui/Card';
import { Card } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { mockDashboardStats, mockStudentActivity, mockStudentsByCourse, mockTaskSuccessByTech, mockActivities } from '../../utils/mockData';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';
import { useChartTheme } from '../../utils/chartTheme';

export function DashboardScreen() {
  const chartTheme = useChartTheme();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--text)] mb-2">Dashboard</h1>
          <p className="text-[var(--text-muted)]">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <Button variant="primary">
          <Plus size={18} />
          Quick Action
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard
          title="Total Courses"
          value={mockDashboardStats.coursesCount}
          change="+3 this month"
          changeType="positive"
          icon={<BookOpen size={20} />}
        />
        <KPICard
          title="Total Lessons"
          value={mockDashboardStats.lessonsCount}
          change="+12 this month"
          changeType="positive"
          icon={<FileText size={20} />}
        />
        <KPICard
          title="Total Tasks"
          value={mockDashboardStats.tasksCount}
          change="+45 this month"
          changeType="positive"
          icon={<CheckSquare size={20} />}
        />
        <KPICard
          title="Active Students"
          value={mockDashboardStats.studentsCount}
          change="+234 this month"
          changeType="positive"
          icon={<Users size={20} />}
        />
        <KPICard
          title="Pending Reviews"
          value={mockDashboardStats.reviewsCount}
          change="-12 from yesterday"
          changeType="positive"
          icon={<MessageSquare size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Student Activity (30 Days)">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockStudentActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
                <XAxis
                  dataKey="date"
                  tick={{ ...chartTheme.labelStyle }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  stroke={chartTheme.axisColor}
                />
                <YAxis tick={{ ...chartTheme.labelStyle }} stroke={chartTheme.axisColor} />
                <Tooltip
                  contentStyle={chartTheme.tooltipStyle}
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                />
                <Line type="monotone" dataKey="students" stroke={chartTheme.primaryColor} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Students by Course">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockStudentsByCourse}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockStudentsByCourse.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTheme.tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Task Success Rate by Technology">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTaskSuccessByTech}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
                <XAxis dataKey="tech" tick={{ ...chartTheme.labelStyle }} stroke={chartTheme.axisColor} />
                <YAxis tick={{ ...chartTheme.labelStyle }} domain={[0, 100]} stroke={chartTheme.axisColor} />
                <Tooltip contentStyle={chartTheme.tooltipStyle} formatter={(value) => `${value}%`} />
                <Bar dataKey="success" fill={chartTheme.successColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Activity">
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 pb-4 border-b border-[var(--border)] last:border-b-0 last:pb-0">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--primary-contrast)] flex-shrink-0">
                  {activity.userName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[var(--text)] mb-1">
                    <span>{activity.userName}</span> {activity.action}
                  </p>
                  <p className="text-[var(--text-muted)] truncate mb-1">{activity.resource}</p>
                  <p className="text-[var(--text-muted)]">
                    {new Date(activity.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Quick Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="secondary" className="justify-start">
            <Plus size={18} />
            Create Course
          </Button>
          <Button variant="secondary" className="justify-start">
            <Plus size={18} />
            Create Lesson
          </Button>
          <Button variant="secondary" className="justify-start">
            <Plus size={18} />
            Create Task
          </Button>
          <Button variant="secondary" className="justify-start">
            <Users size={18} />
            Invite User
          </Button>
        </div>
      </Card>
    </div>
  );
}
import { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { KPICard } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { mockStudentActivity } from '../../utils/mockData';
import { useChartTheme } from '../../utils/chartTheme';

const daumauData = [
  { date: '2024-11-01', dau: 1240, wau: 3450, mau: 12340 },
  { date: '2024-11-08', dau: 1320, wau: 3580, mau: 12680 },
  { date: '2024-11-15', dau: 1180, wau: 3420, mau: 12890 },
  { date: '2024-11-22', dau: 1380, wau: 3780, mau: 13120 },
  { date: '2024-11-29', dau: 1420, wau: 3890, mau: 13450 },
  { date: '2024-12-06', dau: 1350, wau: 3720, mau: 13580 },
  { date: '2024-12-13', dau: 1290, wau: 3650, mau: 13720 },
  { date: '2024-12-20', dau: 1240, wau: 3590, mau: 13890 },
];

const courseCompletionData = [
  { course: 'HTML & CSS', started: 1543, completed: 1205, completion: 78 },
  { course: 'JavaScript', started: 2341, completed: 1756, completion: 75 },
  { course: 'React', started: 892, completed: 623, completion: 70 },
  { course: 'TypeScript', started: 1205, completed: 965, completion: 80 },
  { course: 'Node.js', started: 543, completed: 325, completion: 60 },
];

const engagementData = [
  { week: 'Week 1', sessions: 4.2, duration: 45 },
  { week: 'Week 2', sessions: 4.5, duration: 48 },
  { week: 'Week 3', sessions: 4.1, duration: 43 },
  { week: 'Week 4', sessions: 4.8, duration: 52 },
];

export function StatisticsScreen() {
  const [dateRange, setDateRange] = useState('30d');
  const [courseFilter, setCourseFilter] = useState('all');
  const chartTheme = useChartTheme();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-1">Statistics</h1>
          <p className="text-[var(--text-muted)]">Platform analytics and insights</p>
        </div>
        <Button variant="secondary">
          <Download size={18} />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)]"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="365d">Last year</option>
            <option value="custom">Custom range</option>
          </select>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-4 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)]"
          >
            <option value="all">All Courses</option>
            <option value="html-css">HTML & CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="typescript">TypeScript</option>
          </select>
          <Button variant="secondary">
            <Filter size={18} />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="DAU"
          value="1,240"
          change="+5.2% from yesterday"
          changeType="positive"
        />
        <KPICard
          title="WAU"
          value="3,590"
          change="+2.8% from last week"
          changeType="positive"
        />
        <KPICard
          title="MAU"
          value="13,890"
          change="+8.1% from last month"
          changeType="positive"
        />
        <KPICard
          title="Avg. Session Duration"
          value="47 min"
          change="+12% from last week"
          changeType="positive"
        />
      </div>

      {/* DAU/WAU/MAU Chart */}
      <Card title="Daily, Weekly, Monthly Active Users">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={daumauData}>
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
              <Legend />
              <Line type="monotone" dataKey="dau" stroke={chartTheme.primaryColor} strokeWidth={2} name="DAU" />
              <Line type="monotone" dataKey="wau" stroke={chartTheme.successColor} strokeWidth={2} name="WAU" />
              <Line type="monotone" dataKey="mau" stroke={chartTheme.warningColor} strokeWidth={2} name="MAU" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Course Completion Rates */}
      <Card title="Course Completion Rates">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={courseCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
              <XAxis dataKey="course" tick={{ ...chartTheme.labelStyle }} stroke={chartTheme.axisColor} />
              <YAxis tick={{ ...chartTheme.labelStyle }} stroke={chartTheme.axisColor} />
              <Tooltip contentStyle={chartTheme.tooltipStyle} />
              <Legend />
              <Bar dataKey="started" fill={chartTheme.primaryColor} name="Started" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill={chartTheme.successColor} name="Completed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          {courseCompletionData.map((course) => (
            <div key={course.course} className="text-center">
              <p className="text-[var(--text-muted)] mb-1">{course.course}</p>
              <p className="text-[var(--text)]">{course.completion}%</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Average Sessions per Week">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
                <XAxis dataKey="week" tick={{ ...chartTheme.labelStyle }} stroke={chartTheme.axisColor} />
                <YAxis tick={{ ...chartTheme.labelStyle }} domain={[0, 6]} stroke={chartTheme.axisColor} />
                <Tooltip contentStyle={chartTheme.tooltipStyle} />
                <Bar dataKey="sessions" fill={chartTheme.primaryColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Average Session Duration (minutes)">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
                <XAxis dataKey="week" tick={{ ...chartTheme.labelStyle }} stroke={chartTheme.axisColor} />
                <YAxis tick={{ ...chartTheme.labelStyle }} domain={[0, 60]} stroke={chartTheme.axisColor} />
                <Tooltip contentStyle={chartTheme.tooltipStyle} />
                <Line type="monotone" dataKey="duration" stroke={chartTheme.successColor} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Funnel Analysis */}
      <Card title="User Journey Funnel">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[var(--text)]">Registered Users</span>
                <span className="text-[var(--text-muted)]">5,234 (100%)</span>
              </div>
              <div className="w-full h-8 bg-[var(--primary)] rounded" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[var(--text)]">Started a Course</span>
                <span className="text-[var(--text-muted)]">4,524 (86%)</span>
              </div>
              <div className="w-[86%] h-8 bg-[var(--success)] rounded" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[var(--text)]">Completed First Lesson</span>
                <span className="text-[var(--text-muted)]">3,874 (74%)</span>
              </div>
              <div className="w-[74%] h-8 bg-[var(--warning)] rounded" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[var(--text)]">Completed a Course</span>
                <span className="text-[var(--text-muted)]">2,874 (55%)</span>
              </div>
              <div className="w-[55%] h-8 rounded" style={{ backgroundColor: '#8B5CF6' }} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
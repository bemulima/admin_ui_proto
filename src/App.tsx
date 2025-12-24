import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { CoursesScreen } from './components/screens/CoursesScreen';
import { LessonsScreen } from './components/screens/LessonsScreen';
import { TasksScreen } from './components/screens/TasksScreen';
import { UsersScreen } from './components/screens/UsersScreen';
import { RolesScreen } from './components/screens/RolesScreen';
import { StatisticsScreen } from './components/screens/StatisticsScreen';
import { CodeReviewScreen } from './components/screens/CodeReviewScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { ToastContainer } from './components/ui/Toast';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/courses" element={<CoursesScreen />} />
            <Route path="/lessons" element={<LessonsScreen />} />
            <Route path="/tasks" element={<TasksScreen />} />
            <Route path="/users" element={<UsersScreen />} />
            <Route path="/roles" element={<RolesScreen />} />
            <Route path="/statistics" element={<StatisticsScreen />} />
            <Route path="/code-review" element={<CodeReviewScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </Layout>
        <ToastContainer />
      </Router>
    </ThemeProvider>
  );
}

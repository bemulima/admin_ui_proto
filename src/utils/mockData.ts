export interface Course {
  id: string;
  title: { ru: string; en: string };
  slug: string;
  status: 'draft' | 'active' | 'inactive' | 'archived';
  technologies: string[];
  lessonsCount: number;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
  version: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: { ru: string; en: string };
  order: number;
  status: 'draft' | 'active' | 'inactive';
  tasksCount: number;
  duration: number;
  createdAt: string;
}

export interface Task {
  id: string;
  lessonId: string;
  title: { ru: string; en: string };
  type: 'code' | 'quiz' | 'project';
  order: number;
  status: 'draft' | 'active' | 'inactive';
  validatorStatus: 'configured' | 'error' | 'not-configured';
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'teacher' | 'student' | 'user' | 'guest';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  lastLoginAt: string;
  coursesEnrolled: number;
  tasksCompleted: number;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
}

export interface CodeReview {
  id: string;
  taskId: string;
  taskTitle: string;
  studentId: string;
  studentName: string;
  status: 'pending' | 'approved' | 'changes-requested';
  submittedAt: string;
  reviewedAt?: string;
  validationResults: {
    passed: number;
    failed: number;
    total: number;
  };
}

export interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: {
    courses: { create: boolean; read: boolean; update: boolean; delete: boolean };
    lessons: { create: boolean; read: boolean; update: boolean; delete: boolean };
    tasks: { create: boolean; read: boolean; update: boolean; delete: boolean };
    users: { create: boolean; read: boolean; update: boolean; delete: boolean };
    reviews: { create: boolean; read: boolean; update: boolean; delete: boolean };
    statistics: { read: boolean };
  };
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: { ru: 'Основы HTML и CSS', en: 'HTML & CSS Fundamentals' },
    slug: 'html-css-fundamentals',
    status: 'active',
    technologies: ['HTML', 'CSS'],
    lessonsCount: 12,
    studentsCount: 1543,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-10',
    version: '2.1.0',
  },
  {
    id: '2',
    title: { ru: 'JavaScript для начинающих', en: 'JavaScript for Beginners' },
    slug: 'javascript-beginners',
    status: 'active',
    technologies: ['JS'],
    lessonsCount: 18,
    studentsCount: 2341,
    createdAt: '2024-02-01',
    updatedAt: '2024-12-15',
    version: '3.0.1',
  },
  {
    id: '3',
    title: { ru: 'React: Продвинутый уровень', en: 'Advanced React' },
    slug: 'advanced-react',
    status: 'active',
    technologies: ['React', 'TS'],
    lessonsCount: 24,
    studentsCount: 892,
    createdAt: '2024-03-10',
    updatedAt: '2024-12-20',
    version: '1.5.2',
  },
  {
    id: '4',
    title: { ru: 'Backend на Node.js', en: 'Backend with Node.js' },
    slug: 'backend-nodejs',
    status: 'draft',
    technologies: ['Node.js', 'Express', 'TS'],
    lessonsCount: 16,
    studentsCount: 0,
    createdAt: '2024-12-01',
    updatedAt: '2024-12-22',
    version: '0.1.0',
  },
  {
    id: '5',
    title: { ru: 'TypeScript: От нуля до героя', en: 'TypeScript: Zero to Hero' },
    slug: 'typescript-zero-hero',
    status: 'active',
    technologies: ['TS'],
    lessonsCount: 14,
    studentsCount: 1205,
    createdAt: '2024-04-20',
    updatedAt: '2024-11-30',
    version: '2.0.0',
  },
];

export const mockLessons: Lesson[] = [
  {
    id: 'l1',
    courseId: '1',
    title: { ru: 'Введение в HTML', en: 'Introduction to HTML' },
    order: 1,
    status: 'active',
    tasksCount: 5,
    duration: 45,
    createdAt: '2024-01-16',
  },
  {
    id: 'l2',
    courseId: '1',
    title: { ru: 'Семантическая разметка', en: 'Semantic Markup' },
    order: 2,
    status: 'active',
    tasksCount: 4,
    duration: 60,
    createdAt: '2024-01-17',
  },
  {
    id: 'l3',
    courseId: '1',
    title: { ru: 'CSS: Основы стилизации', en: 'CSS: Styling Basics' },
    order: 3,
    status: 'active',
    tasksCount: 6,
    duration: 90,
    createdAt: '2024-01-18',
  },
  {
    id: 'l4',
    courseId: '1',
    title: { ru: 'Flexbox макеты', en: 'Flexbox Layouts' },
    order: 4,
    status: 'draft',
    tasksCount: 3,
    duration: 75,
    createdAt: '2024-01-19',
  },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    lessonId: 'l1',
    title: { ru: 'Создать простую HTML страницу', en: 'Create a simple HTML page' },
    type: 'code',
    order: 1,
    status: 'active',
    validatorStatus: 'configured',
    difficulty: 'easy',
    createdAt: '2024-01-20',
  },
  {
    id: 't2',
    lessonId: 'l1',
    title: { ru: 'Добавить заголовки и параграфы', en: 'Add headings and paragraphs' },
    type: 'code',
    order: 2,
    status: 'active',
    validatorStatus: 'configured',
    difficulty: 'easy',
    createdAt: '2024-01-21',
  },
  {
    id: 't3',
    lessonId: 'l1',
    title: { ru: 'Работа со списками', en: 'Working with lists' },
    type: 'code',
    order: 3,
    status: 'active',
    validatorStatus: 'error',
    difficulty: 'medium',
    createdAt: '2024-01-22',
  },
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Анна Иванова',
    email: 'anna.ivanova@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2023-01-10',
    lastLoginAt: '2024-12-23',
    coursesEnrolled: 0,
    tasksCompleted: 0,
  },
  {
    id: 'u2',
    name: 'Дмитрий Петров',
    email: 'dmitry.petrov@example.com',
    role: 'teacher',
    status: 'active',
    createdAt: '2023-03-15',
    lastLoginAt: '2024-12-22',
    coursesEnrolled: 3,
    tasksCompleted: 156,
  },
  {
    id: 'u3',
    name: 'Мария Смирнова',
    email: 'maria.smirnova@example.com',
    role: 'student',
    status: 'active',
    createdAt: '2024-01-20',
    lastLoginAt: '2024-12-23',
    coursesEnrolled: 5,
    tasksCompleted: 87,
  },
  {
    id: 'u4',
    name: 'Алексей Козлов',
    email: 'alexey.kozlov@example.com',
    role: 'student',
    status: 'active',
    createdAt: '2024-02-10',
    lastLoginAt: '2024-12-21',
    coursesEnrolled: 3,
    tasksCompleted: 45,
  },
  {
    id: 'u5',
    name: 'Елена Морозова',
    email: 'elena.morozova@example.com',
    role: 'moderator',
    status: 'active',
    createdAt: '2023-06-05',
    lastLoginAt: '2024-12-23',
    coursesEnrolled: 2,
    tasksCompleted: 234,
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    userId: 'u2',
    userName: 'Дмитрий Петров',
    action: 'Создал новый курс',
    resource: 'Backend на Node.js',
    timestamp: '2024-12-23T10:30:00',
  },
  {
    id: 'a2',
    userId: 'u3',
    userName: 'Мария Смирнова',
    action: 'Завершила задачу',
    resource: 'React Hooks: useState',
    timestamp: '2024-12-23T09:15:00',
  },
  {
    id: 'a3',
    userId: 'u5',
    userName: 'Елена Морозова',
    action: 'Одобрила код-ревью',
    resource: 'Task #234',
    timestamp: '2024-12-23T08:45:00',
  },
  {
    id: 'a4',
    userId: 'u4',
    userName: 'Алексей Козлов',
    action: 'Записался на курс',
    resource: 'TypeScript: От нуля до героя',
    timestamp: '2024-12-22T16:20:00',
  },
];

export const mockCodeReviews: CodeReview[] = [
  {
    id: 'r1',
    taskId: 't1',
    taskTitle: 'Create a simple HTML page',
    studentId: 'u3',
    studentName: 'Мария Смирнова',
    status: 'pending',
    submittedAt: '2024-12-23T08:30:00',
    validationResults: {
      passed: 8,
      failed: 2,
      total: 10,
    },
  },
  {
    id: 'r2',
    taskId: 't2',
    taskTitle: 'Add headings and paragraphs',
    studentId: 'u4',
    studentName: 'Алексей Козлов',
    status: 'pending',
    submittedAt: '2024-12-23T07:15:00',
    validationResults: {
      passed: 10,
      failed: 0,
      total: 10,
    },
  },
  {
    id: 'r3',
    taskId: 't3',
    taskTitle: 'Working with lists',
    studentId: 'u3',
    studentName: 'Мария Смирнова',
    status: 'approved',
    submittedAt: '2024-12-22T14:30:00',
    reviewedAt: '2024-12-22T15:45:00',
    validationResults: {
      passed: 12,
      failed: 0,
      total: 12,
    },
  },
];

export const mockRoles: Role[] = [
  {
    id: 'r1',
    name: 'Admin',
    description: 'Full system access',
    usersCount: 3,
    permissions: {
      courses: { create: true, read: true, update: true, delete: true },
      lessons: { create: true, read: true, update: true, delete: true },
      tasks: { create: true, read: true, update: true, delete: true },
      users: { create: true, read: true, update: true, delete: true },
      reviews: { create: true, read: true, update: true, delete: true },
      statistics: { read: true },
    },
  },
  {
    id: 'r2',
    name: 'Teacher',
    description: 'Create and manage educational content',
    usersCount: 15,
    permissions: {
      courses: { create: true, read: true, update: true, delete: false },
      lessons: { create: true, read: true, update: true, delete: false },
      tasks: { create: true, read: true, update: true, delete: false },
      users: { create: false, read: true, update: false, delete: false },
      reviews: { create: true, read: true, update: true, delete: false },
      statistics: { read: true },
    },
  },
  {
    id: 'r3',
    name: 'Student',
    description: 'Access courses and submit tasks',
    usersCount: 2341,
    permissions: {
      courses: { create: false, read: true, update: false, delete: false },
      lessons: { create: false, read: true, update: false, delete: false },
      tasks: { create: false, read: true, update: false, delete: false },
      users: { create: false, read: false, update: false, delete: false },
      reviews: { create: false, read: false, update: false, delete: false },
      statistics: { read: false },
    },
  },
  {
    id: 'r4',
    name: 'Moderator',
    description: 'Review content and manage users',
    usersCount: 8,
    permissions: {
      courses: { create: false, read: true, update: true, delete: false },
      lessons: { create: false, read: true, update: true, delete: false },
      tasks: { create: false, read: true, update: true, delete: false },
      users: { create: false, read: true, update: true, delete: false },
      reviews: { create: true, read: true, update: true, delete: true },
      statistics: { read: true },
    },
  },
];

export const mockDashboardStats = {
  coursesCount: 24,
  lessonsCount: 312,
  tasksCount: 1847,
  studentsCount: 5234,
  reviewsCount: 142,
};

export const mockStudentActivity = [
  { date: '2024-11-23', students: 1240 },
  { date: '2024-11-24', students: 1320 },
  { date: '2024-11-25', students: 1180 },
  { date: '2024-11-26', students: 980 },
  { date: '2024-11-27', students: 890 },
  { date: '2024-11-28', students: 920 },
  { date: '2024-11-29', students: 1050 },
  { date: '2024-11-30', students: 1380 },
  { date: '2024-12-01', students: 1420 },
  { date: '2024-12-02', students: 1350 },
  { date: '2024-12-03', students: 1280 },
  { date: '2024-12-04', students: 1100 },
  { date: '2024-12-05', students: 1020 },
  { date: '2024-12-06', students: 1150 },
  { date: '2024-12-07', students: 1290 },
  { date: '2024-12-08', students: 1450 },
  { date: '2024-12-09', students: 1510 },
  { date: '2024-12-10', students: 1480 },
  { date: '2024-12-11', students: 1390 },
  { date: '2024-12-12', students: 1320 },
  { date: '2024-12-13', students: 1250 },
  { date: '2024-12-14', students: 1080 },
  { date: '2024-12-15', students: 1010 },
  { date: '2024-12-16', students: 1170 },
  { date: '2024-12-17', students: 1340 },
  { date: '2024-12-18', students: 1420 },
  { date: '2024-12-19', students: 1380 },
  { date: '2024-12-20', students: 1290 },
  { date: '2024-12-21', students: 1100 },
  { date: '2024-12-22', students: 980 },
  { date: '2024-12-23', students: 1240 },
];

export const mockStudentsByCourse = [
  { name: 'HTML & CSS', value: 1543, color: '#3B82F6' },
  { name: 'JavaScript', value: 2341, color: '#10B981' },
  { name: 'React', value: 892, color: '#F59E0B' },
  { name: 'TypeScript', value: 1205, color: '#8B5CF6' },
  { name: 'Other', value: 253, color: '#6B7280' },
];

export const mockTaskSuccessByTech = [
  { tech: 'HTML', success: 92 },
  { tech: 'CSS', success: 85 },
  { tech: 'JS', success: 78 },
  { tech: 'TS', success: 81 },
  { tech: 'React', success: 74 },
  { tech: 'Node.js', success: 69 },
];

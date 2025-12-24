import { useState } from 'react';
import { Plus, GripVertical, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { mockTasks, mockLessons, mockCourses } from '../../utils/mockData';
import { Card } from '../ui/Card';
import { showToast } from '../ui/Toast';

export function TasksScreen() {
  const [selectedLessonId, setSelectedLessonId] = useState('l1');

  const selectedLesson = mockLessons.find((l) => l.id === selectedLessonId);
  const selectedCourse = mockCourses.find((c) => c.id === selectedLesson?.courseId);
  const tasks = mockTasks.filter((t) => t.lessonId === selectedLessonId);

  const getValidatorIcon = (status: string) => {
    switch (status) {
      case 'configured':
        return <CheckCircle size={16} className="text-[var(--success)]" />;
      case 'error':
        return <XCircle size={16} className="text-[var(--danger)]" />;
      case 'not-configured':
        return <AlertCircle size={16} className="text-[var(--warning)]" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--text)] mb-1">Tasks</h1>
          <p className="text-[var(--text-muted)]">Manage tasks and validators</p>
        </div>
        <Button variant="primary">
          <Plus size={18} />
          Create Task
        </Button>
      </div>

      {/* Lesson Selector */}
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-[var(--text)]">Select Lesson</label>
            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              {mockLessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title.en} ({lesson.tasksCount} tasks)
                </option>
              ))}
            </select>
          </div>

          {selectedLesson && selectedCourse && (
            <div className="flex items-center gap-3">
              <span className="text-[var(--text-muted)]">Course:</span>
              <span className="text-[var(--text)]">{selectedCourse.title.en}</span>
              <Badge variant="status" status={selectedLesson.status}>
                {selectedLesson.status}
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Tasks List */}
      <Card title={`Tasks (${tasks.length})`}>
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            No tasks found. Create your first task.
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 px-4 py-3 min-h-[56px] border border-[var(--border)] rounded-lg bg-[var(--surface)] hover:shadow-md transition-shadow"
              >
                {/* Drag Handle */}
                <div className="text-[var(--text-muted)] cursor-grab active:cursor-grabbing flex-shrink-0">
                  <GripVertical size={20} />
                </div>

                {/* Order */}
                <div className="flex items-center justify-center w-8 h-8 bg-[var(--surface-2)] rounded text-[var(--text-muted)] flex-shrink-0">
                  {task.order}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-[var(--text)]">{task.title.en}</h4>
                    <Badge variant="status" status={task.status}>
                      {task.status}
                    </Badge>
                    <Badge variant="default">{task.type}</Badge>
                    <Badge
                      variant="default"
                      className={
                        task.difficulty === 'easy'
                          ? 'bg-[var(--surface)] text-[var(--success)] border-[var(--success)]'
                          : task.difficulty === 'medium'
                          ? 'bg-[var(--surface)] text-[var(--warning)] border-[var(--warning)]'
                          : 'bg-[var(--surface)] text-[var(--danger)] border-[var(--danger)]'
                      }
                    >
                      {task.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      {getValidatorIcon(task.validatorStatus)}
                      Validator: {task.validatorStatus}
                    </span>
                    <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => console.log('Edit task')}
                    className="p-2 text-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--surface-2)] rounded transition-colors"
                    aria-label="Edit task"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => showToast('Task deleted', 'success')}
                    className="p-2 text-[var(--danger)] hover:text-[var(--danger)] hover:bg-[var(--surface-2)] rounded transition-colors"
                    aria-label="Delete task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Validator Status Legend */}
      <Card title="Validator Status">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-[var(--success)]" />
            <div>
              <p className="text-[var(--text)]">Configured</p>
              <p className="text-[var(--text-muted)]">Validator is properly configured and working</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <XCircle size={20} className="text-[var(--danger)]" />
            <div>
              <p className="text-[var(--text)]">Error</p>
              <p className="text-[var(--text-muted)]">Validator has configuration errors</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-[var(--warning)]" />
            <div>
              <p className="text-[var(--text)]">Not Configured</p>
              <p className="text-[var(--text-muted)]">Validator needs to be set up</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

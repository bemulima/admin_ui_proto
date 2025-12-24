import { useState } from 'react';
import { Plus, GripVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { mockLessons, mockCourses } from '../../utils/mockData';
import { Card } from '../ui/Card';
import { showToast } from '../ui/Toast';

export function LessonsScreen() {
  const [selectedCourseId, setSelectedCourseId] = useState('1');
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const selectedCourse = mockCourses.find((c) => c.id === selectedCourseId);
  const lessons = mockLessons.filter((l) => l.courseId === selectedCourseId);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (draggedId && draggedId !== targetId) {
      showToast('Lesson order updated', 'success');
    }
    setDraggedId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--text)] mb-1">Lessons</h1>
          <p className="text-[var(--text-muted)]">Manage lessons and their ordering</p>
        </div>
        <Button variant="primary">
          <Plus size={18} />
          Create Lesson
        </Button>
      </div>

      <Card>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-[var(--text)]">Select Course</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)]"
            >
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title.en} ({course.lessonsCount} lessons)
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div className="flex flex-wrap gap-2">
              <Badge variant="status" status={selectedCourse.status}>
                {selectedCourse.status}
              </Badge>
              {selectedCourse.technologies.map((tech) => (
                <Badge key={tech} variant="tech" tech={tech}>
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card title={`Lessons (${lessons.length})`}>
        {lessons.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            No lessons found. Create your first lesson.
          </div>
        ) : (
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                draggable
                onDragStart={() => handleDragStart(lesson.id)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(lesson.id)}
                className={`flex items-center gap-4 px-4 py-3 min-h-[56px] border border-[var(--border)] rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors cursor-move ${
                  draggedId === lesson.id ? 'opacity-50' : ''
                }`}
              >
                <div className="text-[var(--text-muted)] cursor-grab active:cursor-grabbing flex-shrink-0">
                  <GripVertical size={20} />
                </div>

                <div className="flex items-center justify-center w-8 h-8 bg-[var(--surface-2)] rounded text-[var(--text-muted)] flex-shrink-0">
                  {lesson.order}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-[var(--text)]">{lesson.title.en}</h4>
                    <Badge variant="status" status={lesson.status}>
                      {lesson.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-[var(--text-muted)]">
                    <span>{lesson.tasksCount} tasks</span>
                    <span>{lesson.duration} minutes</span>
                    <span>Created: {new Date(lesson.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={lesson.status === 'active'}
                    onChange={() => showToast('Lesson status updated', 'success')}
                    className="w-10 h-6 appearance-none bg-[var(--border)] rounded-full relative cursor-pointer transition-colors checked:bg-[var(--success)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] before:content-[''] before:absolute before:w-5 before:h-5 before:bg-[var(--surface)] before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4 before:shadow-sm"
                  />
                  <span className="text-[var(--text-muted)]">Active</span>
                </label>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => console.log('View lesson')}
                    className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded transition-colors"
                    aria-label="View lesson"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => console.log('Edit lesson')}
                    className="p-2 text-[var(--primary)] hover:opacity-80 hover:bg-[var(--primary)] hover:bg-opacity-10 rounded transition-colors"
                    aria-label="Edit lesson"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => showToast('Lesson deleted', 'success')}
                    className="p-2 text-[var(--danger)] hover:opacity-80 hover:bg-[var(--danger)] hover:bg-opacity-10 rounded transition-colors"
                    aria-label="Delete lesson"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
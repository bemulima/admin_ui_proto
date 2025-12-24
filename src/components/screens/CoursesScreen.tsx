import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Form';
import { Table, Column, Pagination } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { mockCourses, Course } from '../../utils/mockData';
import { Modal } from '../ui/Modal';
import { showToast } from '../ui/Toast';

export function CoursesScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const itemsPerPage = 10;

  // Filter courses
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.ru.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: Column<Course>[] = [
    {
      key: 'title',
      header: 'Course Title',
      sortable: true,
      render: (course) => (
        <div>
          <p className="text-[var(--text)]">{course.title.en}</p>
          <p className="text-[var(--text-muted)]">{course.slug}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (course) => <Badge variant="status" status={course.status}>{course.status}</Badge>,
      width: 'w-32',
    },
    {
      key: 'technologies',
      header: 'Technologies',
      render: (course) => (
        <div className="flex flex-wrap gap-2">
          {course.technologies.map((tech) => (
            <Badge key={tech} variant="tech" tech={tech}>
              {tech}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'lessonsCount',
      header: 'Lessons',
      sortable: true,
      align: 'right',
      width: 'w-24',
    },
    {
      key: 'studentsCount',
      header: 'Students',
      sortable: true,
      align: 'right',
      width: 'w-24',
    },
    {
      key: 'version',
      header: 'Version',
      width: 'w-24',
    },
    {
      key: 'updatedAt',
      header: 'Last Updated',
      sortable: true,
      render: (course) => new Date(course.updatedAt).toLocaleDateString(),
      width: 'w-32',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (course) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCourse(course);
              setIsCreateModalOpen(true);
            }}
            className="p-2 text-[var(--primary)] hover:opacity-80 hover:bg-[var(--primary)] hover:bg-opacity-10 rounded transition-colors"
            aria-label="Edit course"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showToast('Course deleted successfully', 'success');
            }}
            className="p-2 text-[var(--danger)] hover:opacity-80 hover:bg-[var(--danger)] hover:bg-opacity-10 rounded transition-colors"
            aria-label="Delete course"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      align: 'center',
      width: 'w-24',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Courses</h1>
          <p className="text-[var(--text-muted)]">Manage all courses in your platform</p>
        </div>
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} />
          Create Course
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)]"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
          <Button variant="secondary">
            <Filter size={18} />
            More Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={paginatedCourses}
        emptyMessage="No courses found"
        onRowClick={(course) => console.log('View course:', course)}
        getRowId={(course) => course.id}
      />

      {/* Pagination */}
      {filteredCourses.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredCourses.length}
          itemsPerPage={itemsPerPage}
        />
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedCourse(null);
        }}
        title={selectedCourse ? 'Edit Course' : 'Create New Course'}
        size="lg"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsCreateModalOpen(false);
                setSelectedCourse(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                showToast(
                  selectedCourse ? 'Course updated successfully' : 'Course created successfully',
                  'success'
                );
                setIsCreateModalOpen(false);
                setSelectedCourse(null);
              }}
            >
              {selectedCourse ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Language Tabs */}
          <div className="flex gap-2 border-b border-[var(--border)]">
            <button className="px-4 py-2 border-b-2 border-[var(--primary)] text-[var(--primary)]">
              English
            </button>
            <button className="px-4 py-2 text-[var(--text-muted)] hover:text-[var(--text)]">
              Русский
            </button>
          </div>

          <Input label="Course Title" placeholder="Enter course title" required />
          <Input label="Slug" placeholder="course-slug" required />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-[var(--text)]">
                Status <span className="text-[var(--danger)]">*</span>
              </label>
              <select className="w-full h-10 px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)]">
                <option>Draft</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Archived</option>
              </select>
            </div>
            <Input label="Version" placeholder="1.0.0" required />
          </div>

          <div>
            <label className="block mb-2 text-[var(--text)]">Technologies</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="tech" tech="HTML">HTML</Badge>
              <Badge variant="tech" tech="CSS">CSS</Badge>
              <Badge variant="tech" tech="JS">JS</Badge>
            </div>
            <Input placeholder="Add technology..." />
          </div>

          <div>
            <label className="block mb-2 text-[var(--text)]">Description</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] resize-y"
              placeholder="Enter course description..."
            />
          </div>

          <div>
            <label className="block mb-2 text-[var(--text)]">JSON Configuration</label>
            <textarea
              rows={8}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] font-mono resize-y"
              placeholder='{"key": "value"}'
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
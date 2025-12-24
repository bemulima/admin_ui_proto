import { useState } from 'react';
import { Check, X, Eye, Code, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Table, Column, Pagination } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { mockCodeReviews, CodeReview } from '../../utils/mockData';
import { Modal } from '../ui/Modal';
import { showToast } from '../ui/Toast';

const mockFileStructure = [
  { name: 'index.html', type: 'file' },
  { name: 'styles.css', type: 'file' },
  { name: 'script.js', type: 'file' },
  { name: 'README.md', type: 'file' },
];

const mockCodeContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is a simple website created with HTML.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`;

export function CodeReviewScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<CodeReview | null>(null);
  const [selectedFile, setSelectedFile] = useState('index.html');
  const itemsPerPage = 10;

  const filteredReviews = mockCodeReviews.filter((r) => r.status === 'pending');
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: Column<CodeReview>[] = [
    {
      key: 'studentName',
      header: 'Student',
      sortable: true,
      render: (review) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--primary-contrast)] flex-shrink-0">
            {review.studentName.charAt(0)}
          </div>
          <span className="text-[var(--text)]">{review.studentName}</span>
        </div>
      ),
    },
    {
      key: 'taskTitle',
      header: 'Task',
      sortable: true,
    },
    {
      key: 'validationResults',
      header: 'Validation',
      render: (review) => (
        <div className="flex items-center gap-2">
          <span className="text-[var(--success)]">{review.validationResults.passed} passed</span>
          <span className="text-[var(--text-muted)]">/</span>
          <span className="text-[var(--danger)]">{review.validationResults.failed} failed</span>
        </div>
      ),
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      sortable: true,
      render: (review) => new Date(review.submittedAt).toLocaleString(),
    },
    {
      key: 'status',
      header: 'Status',
      render: (review) => (
        <Badge variant="status" status={review.status}>
          {review.status}
        </Badge>
      ),
      width: 'w-32',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (review) => (
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedReview(review);
              setIsReviewModalOpen(true);
            }}
            className="p-2 text-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--surface-2)] rounded transition-colors inline-flex items-center gap-1.5"
            aria-label="Review submission"
          >
            <Eye size={16} />
            <span className="text-xs">Review</span>
          </button>
        </div>
      ),
      align: 'center',
      width: 'w-28',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--text)] mb-1">Code Review</h1>
          <p className="text-[var(--text-muted)]">Review and approve student submissions</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="default" className="text-[var(--warning)] border-[var(--warning)]">
            {filteredReviews.length} pending
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
          <p className="text-[var(--text-muted)] mb-1">Pending Reviews</p>
          <p className="text-[var(--text)]">{filteredReviews.length}</p>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
          <p className="text-[var(--text-muted)] mb-1">Approved Today</p>
          <p className="text-[var(--text)]">23</p>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
          <p className="text-[var(--text-muted)] mb-1">Changes Requested</p>
          <p className="text-[var(--text)]">8</p>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={paginatedReviews}
        emptyMessage="No pending reviews"
        getRowId={(review) => review.id}
      />

      {/* Pagination */}
      {filteredReviews.length > 0 && (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredReviews.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}

      {/* Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedReview(null);
        }}
        title={selectedReview ? `Review: ${selectedReview.taskTitle}` : 'Code Review'}
        size="xl"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsReviewModalOpen(false);
                setSelectedReview(null);
              }}
            >
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                showToast('Changes requested', 'warning');
                setIsReviewModalOpen(false);
                setSelectedReview(null);
              }}
            >
              <X size={18} />
              Request Changes
            </Button>
            <Button
              variant="success"
              onClick={() => {
                showToast('Submission approved', 'success');
                setIsReviewModalOpen(false);
                setSelectedReview(null);
              }}
            >
              <Check size={18} />
              Approve
            </Button>
          </>
        }
      >
        {selectedReview && (
          <div className="space-y-4">
            {/* Student Info */}
            <div className="flex items-center justify-between p-4 bg-[var(--surface-2)] rounded">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--primary-contrast)]">
                  {selectedReview.studentName.charAt(0)}
                </div>
                <div>
                  <p className="text-[var(--text)]">{selectedReview.studentName}</p>
                  <p className="text-[var(--text-muted)]">
                    Submitted: {new Date(selectedReview.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Validation Results */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-[var(--surface)] border border-[var(--success)] rounded">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={20} className="text-[var(--success)]" />
                  <span className="text-[var(--text)]">Passed</span>
                </div>
                <p className="text-[var(--success)]">{selectedReview.validationResults.passed}</p>
              </div>
              <div className="p-4 bg-[var(--surface)] border border-[var(--danger)] rounded">
                <div className="flex items-center gap-2 mb-1">
                  <XCircle size={20} className="text-[var(--danger)]" />
                  <span className="text-[var(--text)]">Failed</span>
                </div>
                <p className="text-[var(--danger)]">{selectedReview.validationResults.failed}</p>
              </div>
              <div className="p-4 bg-[var(--surface-2)] border border-[var(--border)] rounded">
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={20} className="text-[var(--text-muted)]" />
                  <span className="text-[var(--text)]">Total</span>
                </div>
                <p className="text-[var(--text-muted)]">{selectedReview.validationResults.total}</p>
              </div>
            </div>

            {/* File Structure and Code */}
            <div className="grid grid-cols-4 gap-4">
              {/* File Tree */}
              <div className="col-span-1 border border-[var(--border)] rounded bg-[var(--surface-2)] p-2">
                <p className="text-[var(--text-muted)] px-2 py-1 mb-2">Files</p>
                <div className="space-y-1">
                  {mockFileStructure.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => setSelectedFile(file.name)}
                      className={`w-full text-left px-2 py-1 rounded transition-colors ${
                        selectedFile === file.name
                          ? 'bg-[var(--primary)] text-[var(--primary-contrast)]'
                          : 'text-[var(--text)] hover:bg-[var(--surface-2)]'
                      }`}
                    >
                      <FileText size={14} className="inline mr-2" />
                      {file.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Editor */}
              <div className="col-span-3 border border-[var(--border)] rounded">
                <div className="flex items-center justify-between px-4 py-2 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  <span className="text-[var(--text)]">{selectedFile}</span>
                  <Code size={16} className="text-[var(--text-muted)]" />
                </div>
                <pre className="p-4 overflow-auto max-h-96 bg-[var(--surface)] text-[var(--text)] rounded-b">
                  <code>{mockCodeContent}</code>
                </pre>
              </div>
            </div>

            {/* Preview */}
            <div className="border border-[var(--border)] rounded">
              <div className="px-4 py-2 bg-[var(--surface-2)] border-b border-[var(--border)]">
                <span className="text-[var(--text)]">Preview</span>
              </div>
              <div className="p-4 bg-[var(--surface)] min-h-[200px]">
                <div className="border border-[var(--border)] rounded p-4">
                  <h1 className="mb-4">Welcome to My Website</h1>
                  <nav className="mb-4">
                    <ul className="flex gap-4">
                      <li><a href="#" className="text-[var(--primary)]">Home</a></li>
                      <li><a href="#" className="text-[var(--primary)]">About</a></li>
                      <li><a href="#" className="text-[var(--primary)]">Contact</a></li>
                    </ul>
                  </nav>
                  <h2 className="mb-2">Home Section</h2>
                  <p className="text-[var(--text-muted)]">This is a simple website created with HTML.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

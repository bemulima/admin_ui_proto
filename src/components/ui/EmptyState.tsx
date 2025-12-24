interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="text-[var(--text-muted)] mb-4">{icon}</div>}
      <h3 className="text-[var(--text)] mb-2">{title}</h3>
      {description && <p className="text-[var(--text-muted)] mb-4 max-w-md">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
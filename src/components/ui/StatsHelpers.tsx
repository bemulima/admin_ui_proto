interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <p className="text-[var(--text-muted)]">{label}</p>
        {icon && <div className="text-[var(--text-muted)]">{icon}</div>}
      </div>
      <p className="text-[var(--text)]">{value}</p>
    </div>
  );
}

interface FilterBarProps {
  children: React.ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 md:p-6 transition-colors">
      {children}
    </div>
  );
}

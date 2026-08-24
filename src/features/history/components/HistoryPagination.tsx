import type { HistoryPagination as HistoryPaginationType } from '../types/history'

type HistoryPaginationProps = {
  onPageChange: (page: number) => void
  pagination?: HistoryPaginationType
}

export function HistoryPagination({ onPageChange, pagination }: HistoryPaginationProps) {
  const currentPage = pagination?.page ?? 1
  const startItem = pagination && pagination.totalItems > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0
  const endItem = pagination ? Math.min(pagination.page * pagination.limit, pagination.totalItems) : 0

  return (
    <footer className="flex flex-col gap-4 border-t border-[var(--color-border)] px-5 py-4 text-body-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
      <p>
        Menampilkan {startItem}-{endItem} dari {pagination?.totalItems ?? 0} hasil
      </p>
      <div className="flex items-center gap-2">
        <PageButton disabled={!pagination || currentPage <= 1} onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
          &lt;
        </PageButton>
        {buildPages(currentPage, pagination?.totalPages ?? 1).map((page) => (
          <button
            className={`grid size-8 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-label-sm font-bold transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] ${
              page === currentPage ? 'bg-[var(--color-primary)] text-white hover:text-white' : 'bg-white text-[var(--color-text)]'
            }`}
            key={page}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        ))}
        <PageButton disabled={!pagination || currentPage >= pagination.totalPages} onClick={() => onPageChange(Math.min(pagination?.totalPages ?? currentPage, currentPage + 1))}>
          &gt;
        </PageButton>
      </div>
    </footer>
  )
}

function PageButton({ children, disabled, onClick }: { children: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      className="grid size-8 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white text-label-sm font-bold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-50)] disabled:text-[var(--color-neutral-400)] disabled:hover:border-[var(--color-border)]"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function buildPages(currentPage: number, totalPages: number) {
  const visibleCount = Math.min(totalPages, 4)
  const start = Math.min(Math.max(currentPage - 1, 1), Math.max(totalPages - visibleCount + 1, 1))

  return Array.from({ length: visibleCount }, (_, index) => start + index)
}

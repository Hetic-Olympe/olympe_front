interface Props {
  onPrevious: () => void;
  onNext: () => void;
  page: number;
  totalPages: number;
}

export function PaginationTable({
  onPrevious,
  onNext,
  page,
  totalPages,
}: Props) {
  return (
    <div>
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
      <p>
        {page} on {totalPages}
      </p>
    </div>
  );
}

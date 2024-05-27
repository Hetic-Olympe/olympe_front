import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo } from "react";

interface Props {
  onPrevious: () => void;
  onNext: () => void;
  onChangePage: (indexPage: number) => void;
  page: number;
  totalPages: number;
}

export function PaginationTable({
  onPrevious,
  onNext,
  onChangePage,
  page,
  totalPages,
}: Props) {
  const indexPagesList = useMemo(() => {
    const tempIndexPagesList: number[] = [];
    if (totalPages > 5) {
      for (let i = page - 2; i <= page + 2; i++) {
        tempIndexPagesList.push(i);
      }
      let maxIndex = tempIndexPagesList[tempIndexPagesList.length - 1];
      let minIndex = tempIndexPagesList[0];

      for (let i = 0; i <= tempIndexPagesList.length; i++) {
        if (tempIndexPagesList[i] <= 0) {
          maxIndex++;
          tempIndexPagesList[i] = maxIndex;
        }
        if (tempIndexPagesList[i] >= totalPages + 1) {
          minIndex--;
          tempIndexPagesList[i] = minIndex;
        }
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        tempIndexPagesList.push(i);
      }
    }
    return tempIndexPagesList.sort((a, b) => a - b);
  }, [page, totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPrevious} />
        </PaginationItem>
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis onClick={() => onChangePage(1)} />
          </PaginationItem>
        )}
        {indexPagesList.map((indexPage) => {
          return (
            <PaginationItem>
              <PaginationLink
                onClick={() => onChangePage(indexPage)}
                isActive={page === indexPage}
              >
                {indexPage}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {page < totalPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis onClick={() => onChangePage(totalPages)} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={onNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

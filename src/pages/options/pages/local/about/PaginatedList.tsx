import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const PaginatedList = ({
  children,
  maxPerPage,
}: {
  children: React.ReactNode[];
  maxPerPage: number;
}) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(children.length / maxPerPage);

  const pageButtons: React.ReactNode[] = [];
  for (let i = 0; i < totalPages; i++) {
    pageButtons.push(
      <Button
        key={i}
        variant={i === page ? "secondary" : "ghost"}
        onClick={() => setPage(i)}
      >
        {i + 1}
      </Button>
    );
  }

  return (
    <div className={"h-full flex flex-col"}>
      <div className={"flex flex-col gap-1 basis-full"}>
        {children.slice(
          page * maxPerPage,
          Math.min((page + 1) * maxPerPage, children.length)
        )}
      </div>
      <div className={"flex gap-1 items-center justify-center"}>
        <Button
          variant={"ghost"}
          className={"px-3"}
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          <ChevronLeft />
        </Button>
        {pageButtons}
        <Button
          variant={"ghost"}
          className={"px-3"}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

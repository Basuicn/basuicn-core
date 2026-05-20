import * as React from 'react';
import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@components/ui/pagination/Pagination";

const PaginationDemo = () => {
  const [page, setPage] = React.useState(3);
  const total = 10;

  const getPages = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
    if (page > 3) pages.push('ellipsis');
      for (let i = Math.max(2, page - 1); i <= Math.min(total - 1, page + 1); i++) pages.push(i);
      if (page < total - 2) pages.push('ellipsis');
      pages.push(total);
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
        </PaginationItem>
        {getPages().map((p, i) => (
          <PaginationItem key={i}>
            {p === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => setPage(p => Math.min(total, p + 1))} disabled={page === total} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const PaginationPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Pagination" description="Pagination with page navigation, previous and next buttons." />

    <ShowcaseCard
      title="Default"
      code={`<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink>1</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink isActive>2</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink>3</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationEllipsis />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationNext />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>`}
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </ShowcaseCard>

    <ShowcaseCard
      title="With Labels"
      code={`<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious label="Previous" />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink>1</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink isActive>2</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink>3</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationNext label="Next" />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>`}
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious label="Previous" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext label="Next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </ShowcaseCard>

    <ShowcaseCard
      title="Interactive Demo"
      code={`const [page, setPage] = React.useState(3);\nconst total = 10;\n\n<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />\n    </PaginationItem>\n    {getPages().map((p) => (\n      <PaginationItem key={p}>\n        <PaginationLink isActive={p === page} onClick={() => setPage(p)}>\n          {p}\n        </PaginationLink>\n      </PaginationItem>\n    ))}\n    <PaginationItem>\n      <PaginationNext onClick={() => setPage(p => Math.min(total, p + 1))} />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>`}
    >
      <PaginationDemo />
    </ShowcaseCard>
  </div>
);

export default PaginationPage;

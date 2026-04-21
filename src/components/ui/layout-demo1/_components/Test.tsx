import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import Main from "../main";

const ContentSkeleton = () => (
  <div className="flex flex-col gap-6 p-6 flex-1">
    {/* Header bar */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-40" />
      <div className="flex gap-2">
        <Skeleton rounded="full" className="h-8 w-8" />
        <Skeleton rounded="full" className="h-8 w-8" />
      </div>
    </div>

    {/* Stats cards */}
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 p-4 border border-border rounded-lg">
          <Skeleton className="h-3 w-12 md:w-16 lg:w-20" variant="muted" />
          <Skeleton className="h-7 w-14 md:w-20 lg:w-24" />
          <Skeleton className="h-3 w-12 md:w-16 lg:w-20" variant="muted" />
        </div>
      ))}
    </div>

    {/* Table */}
    <div className="flex flex-col gap-2">
      {/* Table header */}
      <div className="grid grid-cols-4 gap-4 px-3 py-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-full" variant="muted" />
        ))}
      </div>
      {/* Table rows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 px-3 py-3 border border-border rounded-md">
          <div className="flex items-center gap-2">
            <Skeleton rounded="full" className="h-6 w-6 shrink-0" />
            <Skeleton className="h-3 flex-1" />
          </div>
          <Skeleton className="h-3 w-full" variant="muted" />
          <Skeleton className="h-3 w-3/4" variant="muted" />
          <Skeleton rounded="full" className="h-5 w-16" />
        </div>
      ))}
    </div>
  </div>
);

const Test = () => {
  return (
    <Main>
      <div className="flex h-full -m-6" data-lenis-prevent>
        <ContentSkeleton />
      </div>
    </Main>
  );
};

export default Test;

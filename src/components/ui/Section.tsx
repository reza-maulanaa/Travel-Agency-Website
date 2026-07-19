import { cn } from "@/lib/utils";

export function Section({
  className,
  containerClassName,
  children,
  id,
}: {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("w-full", className)}>
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
      <span className="h-px w-6 bg-emerald-500" />
      {children}
    </span>
  );
}

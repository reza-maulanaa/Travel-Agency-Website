export default function BookingLoading() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Back Link Skeleton */}
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />

          {/* Stepper Skeleton */}
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
                  <div className="hidden h-4 w-16 animate-pulse rounded bg-slate-200 sm:block" />
                </div>
              ))}
            </div>
          </div>

          {/* 2-Column Layout Skeleton */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Mobile Trip Summary */}
              <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
                <div className="h-20 w-20 animate-pulse rounded-xl bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>

              {/* Form Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-56 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
                  </div>
                  <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
                  <div className="h-20 w-full animate-pulse rounded-xl bg-slate-200" />
                </div>
              </div>

              {/* Addon Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-48 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-20 w-full animate-pulse rounded-xl bg-slate-200" />
                  <div className="h-20 w-full animate-pulse rounded-xl bg-slate-200" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Image Skeleton */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="aspect-video w-full animate-pulse bg-slate-200" />
                  <div className="px-5 py-4">
                    <div className="h-2 w-full animate-pulse rounded-full bg-slate-200" />
                  </div>
                </div>

                {/* Price Card Skeleton */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 h-5 w-32 animate-pulse rounded bg-slate-200" />
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                      <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                      <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
                    </div>
                    <div className="border-t border-slate-100 pt-3">
                      <div className="flex justify-between">
                        <div className="h-6 w-16 animate-pulse rounded bg-slate-200" />
                        <div className="h-6 w-28 animate-pulse rounded bg-slate-200" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 h-13 w-full animate-pulse rounded-full bg-slate-200" />
                </div>

                {/* Trust Badge Skeleton */}
                <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

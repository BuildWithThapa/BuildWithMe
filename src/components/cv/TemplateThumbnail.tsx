interface TemplateThumbnailProps {
  slug: string;
}

/**
 * Small visual preview of each of the 4 CV templates, styled to match their
 * real layout in CvPreview.tsx (sidebar position, accent color, section
 * style) so the picker isn't misleading about what you'll actually get.
 */
export function TemplateThumbnail({ slug }: TemplateThumbnailProps) {
  const base = "aspect-[3/4] w-full rounded-lg overflow-hidden shadow-sm text-black bg-white";

  if (slug === "navy-sidebar") {
    return (
      <div className={`${base} flex`}>
        <div className="w-[36%] bg-[#1B2436] p-2 flex flex-col gap-2">
          <div className="mx-auto h-8 w-8 rounded-full bg-white/20 border-2 border-white/40" />
          <div className="h-2.5 rounded-sm bg-white/90 text-center" />
          <div className="space-y-1">
            <div className="h-1.5 w-2/3 rounded-full bg-white/70" />
            <div className="h-1 w-full rounded-full bg-white/25" />
            <div className="h-1 w-full rounded-full bg-white/25" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/2 rounded-full bg-white/70" />
            <div className="h-1 w-full rounded-full bg-white/25" />
            <div className="h-1 w-4/5 rounded-full bg-white/25" />
          </div>
        </div>
        <div className="flex-1 p-2.5">
          <p className="text-[8px] font-bold leading-tight">NAME SURNAME</p>
          <div className="mt-2 h-1.5 w-2/5 rounded-full bg-[#1B2436]" />
          <div className="mt-1 space-y-1">
            <div className="h-1 w-full rounded-full bg-black/10" />
            <div className="h-1 w-full rounded-full bg-black/10" />
          </div>
          <div className="mt-2 h-1.5 w-2/5 rounded-full bg-[#1B2436]" />
          <div className="mt-1 space-y-1">
            <div className="h-1 w-full rounded-full bg-black/10" />
            <div className="h-1 w-4/5 rounded-full bg-black/10" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "sunburst") {
    return (
      <div className={base}>
        <div className="flex">
          <div className="w-[36%] bg-black p-2 pt-6 flex flex-col gap-2">
            <div className="mx-auto h-8 w-8 rounded-full bg-white/15" />
            <div className="mt-1 h-px w-full bg-[#F0A93A]" />
            <div className="space-y-1">
              <div className="h-1.5 w-2/3 rounded-full bg-white/80" />
              <div className="h-1 w-full rounded-full bg-white/25" />
            </div>
            <div className="h-px w-full bg-[#F0A93A]" />
            <div className="space-y-1">
              <div className="h-1.5 w-1/2 rounded-full bg-white/80" />
              <div className="h-1 w-full rounded-full bg-[#F0A93A]/70" />
              <div className="h-1 w-4/5 rounded-full bg-[#F0A93A]/70" />
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-[#F0A93A] p-2">
              <div className="h-2 w-2/3 rounded-sm bg-[#1B2436]" />
              <div className="mt-1 h-1 w-1/2 rounded-full bg-[#1B2436]/60" />
            </div>
            <div className="p-2">
              <div className="h-1.5 w-1/3 rounded-full bg-[#F0A93A]" />
              <div className="mt-1 space-y-1">
                <div className="h-1 w-full rounded-full bg-black/10" />
                <div className="h-1 w-4/5 rounded-full bg-black/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "bold-contrast") {
    return (
      <div className={`${base} bg-[#10182B] flex flex-col`}>
        <div className="flex flex-1">
          <div className="w-[42%] p-2.5">
            <div className="h-10 w-full rounded-sm bg-white/10" />
            <div className="mt-2 h-2.5 w-4/5 rounded-sm bg-[#F5B942]" />
            <div className="mt-1 h-2.5 w-3/5 rounded-sm bg-white" />
            <div className="mt-1.5 h-2 w-2/3 rounded-full bg-[#F5B942]/80" />
          </div>
          <div className="w-[58%] bg-[#F5B942] p-2 m-1.5 rounded-md self-start">
            <div className="h-1.5 w-2/3 rounded-full bg-[#10182B]" />
            <div className="mt-1.5 space-y-1">
              <div className="h-1 w-full rounded-full bg-[#10182B]/40" />
              <div className="h-1 w-full rounded-full bg-[#10182B]/40" />
            </div>
          </div>
        </div>
        <div className="p-2.5 pt-0 grid grid-cols-2 gap-2">
          <div>
            <div className="h-1.5 w-2/3 rounded-full bg-[#F5B942]" />
            <div className="mt-1 space-y-1">
              <div className="h-1 w-full rounded-full bg-white/15" />
              <div className="h-1 w-4/5 rounded-full bg-white/15" />
            </div>
          </div>
          <div>
            <div className="h-1.5 w-2/3 rounded-full bg-[#F5B942]" />
            <div className="mt-1 space-y-1">
              <div className="h-1 w-full rounded-full bg-white/15" />
              <div className="h-1 w-3/5 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // teal-professional
  return (
    <div className={`${base} flex`}>
      <div className="w-[36%] bg-[#2FB6C4] p-2 flex flex-col items-center gap-2 text-center">
        <div className="h-9 w-9 rounded-full bg-white/40 border-2 border-white" />
        <div className="h-1.5 w-3/4 rounded-full bg-white" />
        <div className="h-1 w-1/2 rounded-full bg-white/70" />
        <div className="mt-1 w-full rounded border border-white/50 p-1">
          <div className="h-1 w-2/3 mx-auto rounded-full bg-white/80" />
        </div>
        <div className="w-full rounded border border-white/50 p-1 space-y-0.5">
          <div className="h-1 w-full rounded-full bg-white/70" />
          <div className="h-1 w-full rounded-full bg-white/70" />
        </div>
      </div>
      <div className="flex-1 p-2 space-y-2">
        <div className="h-2 w-1/2 rounded-sm bg-[#2FB6C4]" />
        <div className="space-y-1">
          <div className="h-1 w-full rounded-full bg-black/10" />
          <div className="h-1 w-4/5 rounded-full bg-black/10" />
        </div>
        <div className="h-2 w-2/3 rounded-sm bg-[#2FB6C4]" />
        <div className="space-y-1">
          <div className="h-1 w-full rounded-full bg-black/10" />
          <div className="h-1 w-full rounded-full bg-black/10" />
        </div>
      </div>
    </div>
  );
}

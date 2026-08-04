interface TemplateThumbnailProps {
  slug: string;
}

/**
 * Renders a small visual mockup of each template's layout — styled to look
 * like a miniature real CV (readable-looking text lines, real accent colors,
 * avatar placeholder) rather than plain gray wireframe bars.
 */
export function TemplateThumbnail({ slug }: TemplateThumbnailProps) {
  const base = "aspect-[3/4] w-full rounded-lg bg-white p-3.5 overflow-hidden shadow-sm";
  const textLine = (widthClass: string, extra = "") => (
    <div className={`h-[3px] rounded-full bg-[#1a1d29]/25 ${widthClass} ${extra}`} />
  );

  if (slug === "modern") {
    return (
      <div className={base}>
        <div className="h-3.5 w-3/4 rounded-sm bg-[#0B0E14]" />
        <div className="mt-1.5 h-[3px] w-1/2 rounded-full bg-signal-500" />
        <div className="mt-1 flex gap-1">
          <div className="h-[3px] w-8 rounded-full bg-[#1a1d29]/15" />
          <div className="h-[3px] w-6 rounded-full bg-[#1a1d29]/15" />
        </div>
        <div className="mt-3 h-[4px] w-1/3 rounded-full bg-signal-500" />
        <div className="mt-1.5 space-y-1">
          {textLine("w-full")}
          {textLine("w-full")}
          {textLine("w-4/5")}
        </div>
        <div className="mt-3 h-[4px] w-1/3 rounded-full bg-signal-500" />
        <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1">
          <div className="h-3 rounded-full bg-signal-500/10" />
          <div className="h-3 rounded-full bg-signal-500/10" />
          <div className="h-3 rounded-full bg-signal-500/10" />
          <div className="h-3 rounded-full bg-signal-500/10" />
        </div>
      </div>
    );
  }

  if (slug === "professional") {
    return (
      <div className={base}>
        <div className="text-center">
          <div className="mx-auto h-3 w-2/3 rounded-sm bg-[#1a1d29]" />
          <div className="mx-auto mt-1.5 h-[3px] w-2/5 rounded-full bg-[#1a1d29]/25" />
        </div>
        <div className="mt-3 h-px w-full bg-[#1a1d29]/15" />
        <div className="mt-2.5 h-[4px] w-1/3 rounded-full bg-[#1a1d29]/60" />
        <div className="mt-1.5 space-y-1">
          {textLine("w-full")}
          {textLine("w-full")}
          {textLine("w-5/6")}
        </div>
        <div className="mt-3 h-px w-full bg-[#1a1d29]/15" />
        <div className="mt-2.5 h-[4px] w-1/3 rounded-full bg-[#1a1d29]/60" />
        <div className="mt-1.5 space-y-1">
          {textLine("w-full")}
          {textLine("w-2/3")}
        </div>
      </div>
    );
  }

  if (slug === "creative") {
    return (
      <div className={`${base} flex gap-2.5`}>
        <div className="w-[38%] space-y-2.5 border-r border-[#1a1d29]/10 pr-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-signal-400 to-signal-600" />
          <div className="space-y-1">
            <div className="h-[4px] w-1/2 rounded-full bg-signal-500" />
            {textLine("w-full")}
            {textLine("w-full")}
          </div>
          <div className="space-y-1">
            <div className="h-[4px] w-1/2 rounded-full bg-signal-500" />
            <div className="flex flex-wrap gap-1">
              <div className="h-2.5 w-5 rounded-full bg-signal-500/15" />
              <div className="h-2.5 w-6 rounded-full bg-signal-500/15" />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-2.5 w-3/4 rounded-sm bg-[#0B0E14]" />
          <div className="space-y-1 pt-1">
            {textLine("w-full")}
            {textLine("w-full")}
            {textLine("w-4/5")}
          </div>
          <div className="h-[3px] w-1/3 rounded-full bg-signal-500" />
          <div className="space-y-1">
            {textLine("w-full")}
            {textLine("w-2/3")}
          </div>
        </div>
      </div>
    );
  }

  if (slug === "minimal") {
    return (
      <div className={`${base} flex flex-col justify-center px-5`}>
        <div className="h-4 w-2/3 rounded-sm bg-[#0B0E14]" />
        <div className="mt-1 h-[3px] w-1/3 rounded-full bg-[#1a1d29]/25" />
        <div className="mt-5 space-y-1.5">
          {textLine("w-full")}
          {textLine("w-full")}
          {textLine("w-3/4")}
        </div>
        <div className="mt-5 space-y-1.5">
          {textLine("w-full")}
          {textLine("w-2/3")}
        </div>
      </div>
    );
  }

  return (
    <div className={base}>
      <div className="h-2.5 w-1/2 rounded-sm bg-black" />
      <div className="mt-1 h-[3px] w-1/3 rounded-full bg-black/40" />
      <div className="mt-3 h-[3px] w-1/4 rounded-full bg-black/70" />
      <div className="mt-1.5 space-y-1">
        {textLine("w-full", "bg-black/20")}
        {textLine("w-full", "bg-black/20")}
        {textLine("w-full", "bg-black/20")}
        {textLine("w-3/4", "bg-black/20")}
      </div>
      <div className="mt-3 h-[3px] w-1/4 rounded-full bg-black/70" />
      <div className="mt-1.5 space-y-1">
        {textLine("w-full", "bg-black/20")}
        {textLine("w-full", "bg-black/20")}
      </div>
    </div>
  );
}

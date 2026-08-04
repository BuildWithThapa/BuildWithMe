interface TemplateThumbnailProps {
  slug: string;
}

/**
 * Renders a small visual mockup of each template's layout — uses only
 * standard Tailwind classes already proven elsewhere in the app (no
 * arbitrary bracket values), to rule out any compilation edge case.
 */
export function TemplateThumbnail({ slug }: TemplateThumbnailProps) {
  const base = "aspect-[3/4] w-full rounded-lg bg-white p-4 overflow-hidden shadow-sm";
  const line = (w: string, color = "bg-ink-900/20") => <div className={`h-1 rounded-full ${color} ${w}`} />;

  if (slug === "modern") {
    return (
      <div className={base}>
        <div className="h-4 w-3/4 rounded bg-ink-900" />
        <div className="mt-2 h-1.5 w-1/2 rounded bg-signal-500" />
        <div className="mt-4 h-1.5 w-1/3 rounded bg-signal-500" />
        <div className="mt-2 space-y-1.5">
          {line("w-full")}
          {line("w-full")}
          {line("w-4/5")}
        </div>
        <div className="mt-4 h-1.5 w-1/3 rounded bg-signal-500" />
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <div className="h-4 rounded-full bg-signal-500/10" />
          <div className="h-4 rounded-full bg-signal-500/10" />
          <div className="h-4 rounded-full bg-signal-500/10" />
          <div className="h-4 rounded-full bg-signal-500/10" />
        </div>
      </div>
    );
  }

  if (slug === "professional") {
    return (
      <div className={base}>
        <div className="text-center">
          <div className="mx-auto h-3.5 w-2/3 rounded bg-ink-900" />
          <div className="mx-auto mt-2 h-1 w-2/5 rounded-full bg-ink-900/25" />
        </div>
        <div className="mt-4 h-px w-full bg-ink-900/15" />
        <div className="mt-3 h-1.5 w-1/3 rounded bg-ink-900/60" />
        <div className="mt-2 space-y-1.5">
          {line("w-full")}
          {line("w-full")}
          {line("w-5/6")}
        </div>
        <div className="mt-4 h-px w-full bg-ink-900/15" />
        <div className="mt-3 h-1.5 w-1/3 rounded bg-ink-900/60" />
        <div className="mt-2 space-y-1.5">
          {line("w-full")}
          {line("w-2/3")}
        </div>
      </div>
    );
  }

  if (slug === "creative") {
    return (
      <div className={`${base} flex gap-3`}>
        <div className="w-[38%] space-y-3 border-r border-ink-900/10 pr-2">
          <div className="h-8 w-8 rounded-full bg-signal-500" />
          <div className="space-y-1.5">
            <div className="h-1.5 w-1/2 rounded bg-signal-500" />
            {line("w-full")}
            {line("w-full")}
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-1/2 rounded bg-signal-500" />
            <div className="flex flex-wrap gap-1">
              <div className="h-3 w-6 rounded-full bg-signal-500/15" />
              <div className="h-3 w-7 rounded-full bg-signal-500/15" />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 rounded bg-ink-900" />
          <div className="space-y-1.5 pt-1">
            {line("w-full")}
            {line("w-full")}
            {line("w-4/5")}
          </div>
          <div className="h-1.5 w-1/3 rounded bg-signal-500" />
          <div className="space-y-1.5">
            {line("w-full")}
            {line("w-2/3")}
          </div>
        </div>
      </div>
    );
  }

  if (slug === "minimal") {
    return (
      <div className={`${base} flex flex-col justify-center px-6`}>
        <div className="h-5 w-2/3 rounded bg-ink-900" />
        <div className="mt-2 h-1 w-1/3 rounded-full bg-ink-900/25" />
        <div className="mt-6 space-y-2">
          {line("w-full")}
          {line("w-full")}
          {line("w-3/4")}
        </div>
        <div className="mt-6 space-y-2">
          {line("w-full")}
          {line("w-2/3")}
        </div>
      </div>
    );
  }

  return (
    <div className={base}>
      <div className="h-3 w-1/2 rounded bg-black" />
      <div className="mt-1.5 h-1 w-1/3 rounded-full bg-black/40" />
      <div className="mt-4 h-1 w-1/4 rounded-full bg-black/70" />
      <div className="mt-2 space-y-1.5">
        {line("w-full", "bg-black/20")}
        {line("w-full", "bg-black/20")}
        {line("w-full", "bg-black/20")}
        {line("w-3/4", "bg-black/20")}
      </div>
      <div className="mt-4 h-1 w-1/4 rounded-full bg-black/70" />
      <div className="mt-2 space-y-1.5">
        {line("w-full", "bg-black/20")}
        {line("w-full", "bg-black/20")}
      </div>
    </div>
  );
}

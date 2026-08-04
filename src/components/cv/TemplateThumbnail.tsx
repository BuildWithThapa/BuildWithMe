interface TemplateThumbnailProps {
  slug: string;
}

/**
 * Renders a small visual mockup of each template's layout using plain CSS
 * blocks — gives users a real sense of the structure without needing actual
 * screenshot assets.
 */
export function TemplateThumbnail({ slug }: TemplateThumbnailProps) {
  const base = "aspect-[3/4] w-full rounded-lg bg-white p-3 overflow-hidden";

  if (slug === "modern") {
    return (
      <div className={base}>
        <div className="h-3 w-3/4 rounded bg-ink-900" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded bg-signal-500" />
        <div className="mt-3 space-y-1">
          <div className="h-1 w-full rounded bg-black/10" />
          <div className="h-1 w-full rounded bg-black/10" />
          <div className="h-1 w-4/5 rounded bg-black/10" />
        </div>
        <div className="mt-3 h-1.5 w-1/3 rounded bg-signal-500/70" />
        <div className="mt-1.5 grid grid-cols-2 gap-1">
          <div className="h-1 rounded bg-black/10" />
          <div className="h-1 rounded bg-black/10" />
          <div className="h-1 rounded bg-black/10" />
          <div className="h-1 rounded bg-black/10" />
        </div>
      </div>
    );
  }

  if (slug === "professional") {
    return (
      <div className={base}>
        <div className="text-center">
          <div className="mx-auto h-2.5 w-2/3 rounded bg-ink-900" />
          <div className="mx-auto mt-1 h-1 w-1/3 rounded bg-black/20" />
        </div>
        <div className="mt-3 h-px w-full bg-black/15" />
        <div className="mt-3 space-y-1">
          <div className="h-1 w-full rounded bg-black/10" />
          <div className="h-1 w-full rounded bg-black/10" />
          <div className="h-1 w-5/6 rounded bg-black/10" />
        </div>
        <div className="mt-3 h-px w-full bg-black/15" />
        <div className="mt-3 space-y-1">
          <div className="h-1 w-full rounded bg-black/10" />
          <div className="h-1 w-2/3 rounded bg-black/10" />
        </div>
      </div>
    );
  }

  if (slug === "creative") {
    return (
      <div className={`${base} flex gap-2`}>
        <div className="w-1/3 space-y-2 border-r border-black/10 pr-2">
          <div className="h-6 w-6 rounded-full bg-signal-500" />
          <div className="h-1 w-full rounded bg-black/15" />
          <div className="h-1 w-full rounded bg-black/15" />
          <div className="h-1 w-2/3 rounded bg-black/15" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-3/4 rounded bg-ink-900" />
          <div className="mt-2 h-1 w-full rounded bg-black/10" />
          <div className="h-1 w-full rounded bg-black/10" />
          <div className="h-1 w-4/5 rounded bg-black/10" />
        </div>
      </div>
    );
  }

  if (slug === "minimal") {
    return (
      <div className={`${base} flex flex-col justify-center`}>
        <div className="h-3.5 w-2/3 rounded bg-ink-900" />
        <div className="mt-4 space-y-2">
          <div className="h-0.5 w-full rounded bg-black/10" />
          <div className="h-0.5 w-full rounded bg-black/10" />
          <div className="h-0.5 w-3/4 rounded bg-black/10" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-0.5 w-full rounded bg-black/10" />
          <div className="h-0.5 w-2/3 rounded bg-black/10" />
        </div>
      </div>
    );
  }

  return (
    <div className={base}>
      <div className="h-2 w-1/2 rounded bg-black" />
      <div className="mt-1 h-1 w-1/3 rounded bg-black/30" />
      <div className="mt-3 space-y-1">
        <div className="h-1 w-full rounded bg-black/20" />
        <div className="h-1 w-full rounded bg-black/20" />
        <div className="h-1 w-full rounded bg-black/20" />
        <div className="h-1 w-3/4 rounded bg-black/20" />
      </div>
      <div className="mt-3 space-y-1">
        <div className="h-1 w-full rounded bg-black/20" />
        <div className="h-1 w-full rounded bg-black/20" />
      </div>
    </div>
  );
}

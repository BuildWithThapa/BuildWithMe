interface TemplateThumbnailProps {
  slug: string;
}

/**
 * Renders a small visual mockup of each template's layout using realistic
 * placeholder content (sample name, email, photo circle) so the preview
 * reads like an actual mini resume rather than an abstract wireframe.
 */
export function TemplateThumbnail({ slug }: TemplateThumbnailProps) {
  const base = "aspect-[3/4] w-full rounded-lg bg-white p-4 overflow-hidden shadow-sm text-black";
  const line = (w: string, color = "bg-ink-900/15") => <div className={`h-1 rounded-full ${color} ${w}`} />;
  const Avatar = ({ size = "h-8 w-8" }: { size?: string }) => (
    <div className={`${size} shrink-0 rounded-full bg-signal-500 flex items-center justify-center`}>
      <span className="text-[9px] font-bold text-white">J</span>
    </div>
  );

  if (slug === "modern") {
    return (
      <div className={base}>
        <div className="flex items-center gap-2">
          <Avatar />
          <div>
            <p className="text-[9px] font-bold leading-tight">Jack Wilson</p>
            <p className="text-[6px] text-signal-600 leading-tight">jack@email.com</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-1/3 rounded bg-signal-500" />
        <div className="mt-1.5 space-y-1">
          {line("w-full")}
          {line("w-full")}
          {line("w-4/5")}
        </div>
        <div className="mt-3 h-1.5 w-1/3 rounded bg-signal-500" />
        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
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
          <p className="text-[10px] font-bold leading-tight">Jack Wilson</p>
          <p className="text-[6px] text-ink-900/50 leading-tight mt-0.5">
            jack@email.com &middot; (555) 123-4567
          </p>
        </div>
        <div className="mt-3 h-px w-full bg-ink-900/15" />
        <div className="mt-2.5 text-[6px] font-bold uppercase tracking-wide text-ink-900/70">Experience</div>
        <div className="mt-1.5 space-y-1">
          {line("w-full")}
          {line("w-full")}
          {line("w-5/6")}
        </div>
        <div className="mt-3 h-px w-full bg-ink-900/15" />
        <div className="mt-2.5 text-[6px] font-bold uppercase tracking-wide text-ink-900/70">Education</div>
        <div className="mt-1.5 space-y-1">
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
          <Avatar size="h-9 w-9" />
          <div>
            <p className="text-[8px] font-bold leading-tight">Jack Wilson</p>
            <p className="text-[5.5px] text-ink-900/50 leading-tight">jack@email.com</p>
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
          <div className="text-[7px] font-bold uppercase tracking-wide text-signal-600">Experience</div>
          <div className="space-y-1.5">
            {line("w-full")}
            {line("w-full")}
            {line("w-4/5")}
          </div>
          <div className="text-[7px] font-bold uppercase tracking-wide text-signal-600">Projects</div>
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
        <p className="text-[13px] font-bold tracking-tight leading-none">Jack Wilson</p>
        <p className="text-[6px] text-ink-900/40 mt-1.5">jack@email.com</p>
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
      <p className="text-[10px] font-bold leading-tight">Jack Wilson</p>
      <p className="text-[6px] text-black/50 leading-tight mt-0.5">
        jack@email.com &middot; (555) 123-4567 &middot; New York, NY
      </p>
      <div className="mt-3 text-[6px] font-bold uppercase text-black/80">Experience</div>
      <div className="mt-1.5 space-y-1">
        {line("w-full", "bg-black/20")}
        {line("w-full", "bg-black/20")}
        {line("w-full", "bg-black/20")}
        {line("w-3/4", "bg-black/20")}
      </div>
      <div className="mt-3 text-[6px] font-bold uppercase text-black/80">Education</div>
      <div className="mt-1.5 space-y-1">
        {line("w-full", "bg-black/20")}
        {line("w-full", "bg-black/20")}
      </div>
    </div>
  );
}

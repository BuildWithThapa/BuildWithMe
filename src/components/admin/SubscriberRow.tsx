"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { removeSubscriber } from "@/app/actions/newsletter-admin";

interface Subscriber {
  id: string;
  email: string;
  is_confirmed: boolean;
  created_at: string;
}

export function SubscriberRow({ subscriber }: { subscriber: Subscriber }) {
  const [isPending, startTransition] = useTransition();
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <p className="text-sm font-medium">{subscriber.email}</p>
        <p className="text-xs text-ink-900/45 dark:text-paper/45">
          Subscribed {new Date(subscriber.created_at).toLocaleDateString()}
        </p>
      </div>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const result = await removeSubscriber(subscriber.id);
            if (result.success) setHidden(true);
          })
        }
        className="flex items-center gap-1 rounded-full border border-ink-900/10 px-3 py-1.5 text-xs text-red-500 dark:border-paper/15"
      >
        <Trash2 size={12} /> Remove
      </button>
    </div>
  );
}

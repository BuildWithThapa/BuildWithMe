"use client";

import { useState, useTransition } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { markMessageRead, deleteMessage } from "@/app/actions/messages";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export function MessageRow({ message }: { message: ContactMessage }) {
  const [isPending, startTransition] = useTransition();
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isRead, setIsRead] = useState(message.is_read);

  if (hidden) return null;

  return (
    <div className={`p-4 ${isRead ? "" : "bg-signal-500/[0.03]"}`}>
      <button
        type="button"
        onClick={() => {
          setExpanded((v) => !v);
          if (!isRead) {
            setIsRead(true);
            startTransition(() => {
              markMessageRead(message.id, true);
            });
          }
        }}
        className="flex w-full flex-wrap items-center justify-between gap-2 text-left"
      >
        <div>
          <p className="flex items-center gap-2 font-medium">
            {!isRead && <span className="h-1.5 w-1.5 rounded-full bg-signal-500" />}
            {message.name}
            <span className="text-xs font-normal text-ink-900/45 dark:text-paper/45">
              {message.email}
            </span>
          </p>
          {message.subject && (
            <p className="text-sm text-ink-900/60 dark:text-paper/60">{message.subject}</p>
          )}
        </div>
        <span className="text-xs text-ink-900/40 dark:text-paper/40">
          {new Date(message.created_at).toLocaleDateString()}
        </span>
      </button>

      {expanded && (
        <div className="mt-3 rounded-lg bg-ink-900/[0.03] p-4 text-sm dark:bg-paper/[0.03]">
          <p className="whitespace-pre-line">{message.message}</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                startTransition(() => {
                  setIsRead((v) => !v);
                  markMessageRead(message.id, !isRead);
                })
              }
              className="flex items-center gap-1 rounded-full border border-ink-900/10 px-3 py-1.5 text-xs dark:border-paper/15"
            >
              {isRead ? <Mail size={12} /> : <MailOpen size={12} />}
              Mark as {isRead ? "unread" : "read"}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  const result = await deleteMessage(message.id);
                  if (result.success) setHidden(true);
                })
              }
              className="flex items-center gap-1 rounded-full border border-ink-900/10 px-3 py-1.5 text-xs text-red-500 dark:border-paper/15"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

import { loadSurveyDraft } from "@/lib/survey/storage";

const SHARE_COPY =
  "I contributed anonymously to the 2026 Massachusetts Aesthetic Compensation Report. Help make compensation in Massachusetts aesthetics more transparent.";

async function copyText(value: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export function ShareActions() {
  const [shareUrl, setShareUrl] = useState("/survey");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const draft = loadSurveyDraft();
    const sharePath = draft.anonymousToken
      ? `/survey?ref=${encodeURIComponent(draft.anonymousToken)}`
      : "/survey";

    setShareUrl(new URL(sharePath, window.location.origin).toString());
  }, []);

  async function handleInstagram() {
    const copied = await copyText(`${SHARE_COPY}\n\n${shareUrl}`);
    setFeedback(copied ? "Instagram caption copied." : "Copying is unavailable in this browser.");
  }

  function handleText() {
    if (typeof window !== "undefined") {
      window.location.href = `sms:&body=${encodeURIComponent(`${SHARE_COPY}\n\n${shareUrl}`)}`;
    }

    setFeedback("Text share opened.");
  }

  function handleEmail() {
    if (typeof window !== "undefined") {
      window.location.href = `mailto:?subject=${encodeURIComponent(
        "Massachusetts Aesthetic Compensation Report",
      )}&body=${encodeURIComponent(`${SHARE_COPY}\n\n${shareUrl}`)}`;
    }

    setFeedback("Email draft opened.");
  }

  async function handleCopyLink() {
    const copied = await copyText(shareUrl);
    setFeedback(copied ? "Survey link copied." : "Copying is unavailable in this browser.");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <button className="button-secondary justify-center" onClick={() => void handleInstagram()} type="button">
          Share on Instagram
        </button>
        <button className="button-secondary justify-center" onClick={handleText} type="button">
          Share by text
        </button>
        <button className="button-secondary justify-center" onClick={handleEmail} type="button">
          Share by email
        </button>
        <button className="button-primary justify-center" onClick={() => void handleCopyLink()} type="button">
          Copy survey link
        </button>
      </div>
      <p className="text-sm leading-6 text-[hsl(var(--stone-strong))]">
        {feedback || "Sharing copy stays anonymous and never mentions personal compensation details."}
      </p>
    </div>
  );
}

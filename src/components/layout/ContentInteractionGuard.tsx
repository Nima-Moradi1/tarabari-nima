"use client";

import { useEffect } from "react";

const editableTarget = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));

export function ContentInteractionGuard() {
  useEffect(() => {
    const prevent = (event: Event) => event.preventDefault();
    const preventOutsideFields = (event: Event) => {
      if (!editableTarget(event.target)) event.preventDefault();
    };

    document.addEventListener("copy", prevent, true);
    document.addEventListener("cut", prevent, true);
    document.addEventListener("dragstart", prevent, true);
    document.addEventListener("selectstart", preventOutsideFields, true);
    document.addEventListener("contextmenu", preventOutsideFields, true);

    return () => {
      document.removeEventListener("copy", prevent, true);
      document.removeEventListener("cut", prevent, true);
      document.removeEventListener("dragstart", prevent, true);
      document.removeEventListener("selectstart", preventOutsideFields, true);
      document.removeEventListener("contextmenu", preventOutsideFields, true);
    };
  }, []);

  return null;
}

// components/NotePreview/NotePreview.tsx
"use client";

import css from "./NotePreview.module.css";
import { Note } from "@/types/note";

interface NotePreviewProps {
  note: Note;
  onBack: () => void;
}

export default function NotePreview({ note, onBack }: NotePreviewProps) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <div className={css.content}>{note.content}</div>
        <div className={css.date}>
          {new Date(note.createdAt).toLocaleString()}
        </div>
        <button className={css.backBtn} onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}

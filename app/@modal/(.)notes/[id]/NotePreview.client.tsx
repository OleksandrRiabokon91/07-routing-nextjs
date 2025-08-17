// app/@modal/(.)notes/NotePreview.client.tsx

"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

type Props = { id: string };

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  const handleClose = () => router.back();

  if (isLoading) return <Modal onClose={handleClose}>Загрузка...</Modal>;
  if (isError || !note)
    return <Modal onClose={handleClose}>Ошибка при загрузке заметки</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <button className={css.backBtn} onClick={handleClose}>
            Back
          </button>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}

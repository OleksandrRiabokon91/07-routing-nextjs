// app/notes/page.tsx
"use client";

import css from "@/app/notes/Notes.client.module.css";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import fetchNotes from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

interface NotesClientProps {
  initialData: FetchNotesResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 800);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const { data, isLoading, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", currentPage, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({ page: currentPage, search: debouncedSearchQuery }),
    refetchOnMount: false,

    placeholderData:
      currentPage === 1 && debouncedSearchQuery === ""
        ? initialData
        : keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <div className={css.left}>
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className={css.center}>
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>

        <div className={css.right}>
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </div>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </header>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage message={error?.message ?? "Unknown error"} />
      ) : data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}

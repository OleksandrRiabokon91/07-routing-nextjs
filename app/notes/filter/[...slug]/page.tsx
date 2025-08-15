// app/notes/filter/[...slug]/page.tsx
import fetchNotes from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client"; // путь подкорректируй
import { tagOptions, Tag } from "@/types/note";

type Props = {
  params: { slug?: string[] };
};

export default async function NotesPage({ params }: Props) {
  const maybeTag = params.slug?.[0];
  const tag: Tag | undefined = tagOptions.includes(maybeTag as Tag)
    ? (maybeTag as Tag)
    : undefined;
  const data = await fetchNotes({
    page: 1,
    search: "",
    tag,
  });

  return <NotesClient initialData={data} selectedTag={tag} />;
}

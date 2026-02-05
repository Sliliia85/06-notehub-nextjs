'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import css from './Notes.module.css';
// Імпортуйте ваші компоненти:
// import NoteList from '@/components/NoteList/NoteList';

export default function NotesClient() {
  const { data: notes } = useQuery({ queryKey: ['notes'], queryFn: fetchNotes });

  return (
    <main className={css.main}>
      <div className={css.container}>
        {/* Додайте сюди NoteForm та SearchBox */}
        {/* <NoteList notes={notes || []} /> */}
        <p>Тут буде ваш список нотаток</p>
      </div>
    </main>
  );
}
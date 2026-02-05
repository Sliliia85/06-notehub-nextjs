import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void; // Якщо у вас залишилася функція видалення
}

export const NoteList = ({ notes, onDelete }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.header}>
            <h3 className={css.title}>{note.title}</h3>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>
            {note.content.length > 100 
              ? `${note.content.substring(0, 100)}...` 
              : note.content}
          </p>
          
          <div className={css.actions}>
            {/* 1. Посилання на детальну сторінку (додано згідно з ТЗ) */}
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>

            {/* 2. Кнопка видалення (була в ДЗ-5) */}
            <button 
              onClick={() => onDelete && onDelete(note.id)} 
              className={css.deleteBtn}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
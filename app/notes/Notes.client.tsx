'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import css from './Notes.module.css'; 
import { fetchNotes } from '@/lib/api';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

const NOTES_PER_PAGE = 12;

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  // Дебаунс для пошуку
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  // React Query підхоплює префетч за ключами
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: NOTES_PER_PAGE,
        search: debouncedSearchQuery,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });

  const notes = data?.items || []; 
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / NOTES_PER_PAGE);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <Toaster position="top-right" />
        
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch} />
          
          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}
          
          <button className={css.createButton} onClick={() => setShowModal(true)}>
            Create note +
          </button>
        </header>
        
        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Error fetching notes.</p>}

        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}

        {notes.length === 0 && !isLoading && !isError && (
          <p>No notes found.</p>
        )}
        
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <NoteForm onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </div>
    </main>
  );
}
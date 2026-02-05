import axios from 'axios';
import { Note } from '@/types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api', 
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await instance.get('/notes');
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get(`/notes/${id}`);
  return data;
};

interface CreateNoteParams {
  title: string;
  content: string;
  tag: Note['tag'];
}


export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const response = await instance.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
};

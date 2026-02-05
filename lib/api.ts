import axios from 'axios';
import type { Note } from '@/types/note';

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api';

if (!NOTEHUB_TOKEN) {
  console.warn("NEXT_PUBLIC_NOTEHUB_TOKEN is not set.");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  items: Note[];
  total: number;
  page: number;
  perPage: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: Note['tag'];
}

export const fetchNotes = async ({ page, perPage, search }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, any> = { page, perPage };
  if (search) {
    params.search = search;
  }
  const response = await axiosInstance.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axiosInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const response = await axiosInstance.post<Note>('/notes', newNote);
  return response.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};
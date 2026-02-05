'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createNote } from '../../lib/api';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

interface NoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  tag: Yup.string().required('Tag is required'),
});

const initialValues: NoteData = {
  title: '',
  content: '',
  tag: 'Personal',
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

const createNoteMutation = useMutation({
    mutationFn: (data: NoteData) => createNote(data as any), 
    onSuccess: () => {
      toast.success('Note created successfully!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (values: NoteData) => {
    createNoteMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Title
            <Field className={css.input} name="title" />
            <ErrorMessage className={css.error} name="title" component="div" />
          </label>

          <label className={css.label}>
            Content
            <Field className={css.textarea} as="textarea" name="content" />
            <ErrorMessage className={css.error} name="content" component="div" />
          </label>

          <label className={css.label}>
            Tag
            <Field className={css.select} as="select" name="tag">
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Todo">Todo</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
          </label>

          <div className={css.buttonGroup}>
            <button className={css.submitButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Note'}
            </button>
            <button className={css.cancelButton} type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
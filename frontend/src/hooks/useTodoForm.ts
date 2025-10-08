import { useState } from 'react';
import { type Status, type Priority } from '../services/todoServices';

export interface NewTodoData {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  expiresAt?: string;
  remindAt?: string;
  tags?: string[];
}

const initialFormData: NewTodoData = {
  title: '',
  description: '',
  status: 'NEW' as Status,
  priority: 'MEDIUM' as Priority,
  expiresAt: '',
  remindAt: '',
  tags: []
};

export const useTodoForm = (onSubmit?: (todo: NewTodoData) => void, onClose?: () => void) => {
  const [formData, setFormData] = useState<NewTodoData>(initialFormData);

  const handleChange = (field: keyof NewTodoData) => (
    event: React.ChangeEvent<HTMLInputElement> | { target: { value: unknown } }
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.title.trim()) {
      onSubmit?.(formData);
      // Formular wird nur geschlossen, wenn onSubmit erfolgreich war
      // Das schließen wird vom useCreateTodo Hook gehandhabt
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose?.();
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    handleClose,
    resetForm
  };
};

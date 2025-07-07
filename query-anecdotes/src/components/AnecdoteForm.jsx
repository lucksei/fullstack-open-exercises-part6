import { useContext } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import anecdoteService from '../services/anecdotes';

import NotificationContext, {
  setNotificationHelper,
} from '../context/NotificationContext';

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (anecdote) => {
      setNotificationHelper(
        notificationDispatch,
        `New anecdote: ${anecdote.content}`,
        5000
      );
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: () => {
      setNotificationHelper(
        notificationDispatch,
        'Anecdote must be at least 5 characters long',
        5000
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    newAnecdoteMutation.mutate({
      content: content,
      votes: 0,
    });

    console.log('new anecdote');
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

import { useReducer } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import anecdoteService from './services/anecdotes';

const App = () => {
  const queryClient = useQueryClient();

  const updateNoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => anecdoteService.getAll(),
    retry: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updateNoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    console.log('vote');
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

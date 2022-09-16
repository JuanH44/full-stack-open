import React, { useState } from 'react'

const App = () => {

	const randomNum = () => Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(randomNum)
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
	const mostVotes =  votes.indexOf(Math.max(...votes));
	const handleNext = () => setSelected(randomNum);
	const handleVote = () => setVotes(votes.map((value, index) => index === selected ? value + 1 : value));
	// Seen in the React documentation 
	const mostVotedAnecdote = votes[mostVotes] === 0 ? <p> There is no votes yet </p> : <Anecdote anecdote={anecdotes[mostVotes]} votes={votes[mostVotes]} />;

  return (
    <>
			<Heading text="Anecdotes" h="h1" />

			<Heading text="Anecdote of the day" h="h2" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
			<Button handleClick={handleVote} text="vote" />
			<Button handleClick={handleNext} text="next anecdote" />

			<Heading text="Anecdote with most votes" h="h2" />
			{mostVotedAnecdote} 
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Heading = ({text, h:H}) => <H>{text}</H>;

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
);

const Anecdote = ({ anecdote, votes }) => (
	<div>
		<p>{anecdote}</p>
		<p>has {votes} votes</p>
	</div>
);

export default App;
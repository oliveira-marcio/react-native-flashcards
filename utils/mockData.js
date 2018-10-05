export const mockDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export const mockLog = {
  '2018-09-25T12:00:00.000Z': {
    date: '2018-09-25',
    deck: 'React',
    rate: 0.6667
  },
  '2018-09-23T12:00:00.000Z': {
    date: '2018-09-23T12:00:00.000Z',
    deck: 'JavaScript',
    rate: 0.85
  },
  '2018-09-22T12:00:00.000Z': {
    date: '2018-09-22T12:00:00.000Z',
    deck: 'React',
    rate: 0.5
  }
}

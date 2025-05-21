export const boards = [
  { id: '1', title: '🚀 Product Launch' },
  { id: '2', title: '🐞 Bug Tracker' },
  { id: '3', title: '🎨 Design Roadmap' },
];


export const getAllBoards = () => {
  return boards;
}

export const getBoardById = (id) =>
  boards.find((board) => board.id === id) ?? null;

export const getListsForBoard = (boardId) => [
  { id: 'a', title: 'To Do', boardId },
  { id: 'b', title: 'In Progress', boardId },
  { id: 'c', title: 'Done', boardId },
];


export const cards = [
  {
    id: '1',
    listId: 'a',
    content: 'Research requirements',
    subtasks: [
      { id: '1-1', content: 'Gather user stories', completed: false },
      { id: '1-2', content: 'Define acceptance criteria', completed: false },
    ],
  },
  {
    id: '2',
    listId: 'a',
    content: 'Set up repo & CI',
    subtasks: [
      { id: '2-1', content: 'Initialize Git repo', completed: false },
      { id: '2-2', content: 'Configure GitHub Actions', completed: false },
    ],
  },
  {
    id: '3',
    listId: 'b',
    content: 'Design wireframes',
    subtasks: [
      { id: '3-1', content: 'Sketch low-fidelity layouts', completed: true },
      { id: '3-2', content: 'Create high-fidelity mockups', completed: false },
    ],
  },
  {
    id: '4',
    listId: 'b',
    content: 'Implement drag-and-drop',
    subtasks: [
      { id: '4-1', content: 'Install DnD library', completed: true },
      { id: '4-2', content: 'Wire up DragDropContext', completed: false },
    ],
  },
  {
    id: '5',
    listId: 'c',
    content: 'Deploy to Vercel',
    subtasks: [
      { id: '5-1', content: 'Connect GitHub repo', completed: true },
      { id: '5-2', content: 'Set environment vars', completed: true },
    ],
  },
];

export const getCardsForList = (listId) =>
  cards.filter(card => card.listId === listId);

export const getSubtasksForCard = (cardId) => {
  const card = cards.find(c => c.id === cardId);
  return card?.subtasks ?? [];
};
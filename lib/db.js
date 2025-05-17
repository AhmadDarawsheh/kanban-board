export const boards = [
    { id: '1', title: '🚀 Product Launch' },
    { id: '2', title: '🐞 Bug Tracker' },
    { id: '3', title: '🎨 Design Roadmap' },
  ];


export const getAllBoards = ()=>{
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
    { id: '1', listId: 'a', content: 'Research requirements' },
    { id: '2', listId: 'a', content: 'Set up repo & CI' },
    { id: '3', listId: 'b', content: 'Design wireframes' },
    { id: '4', listId: 'b', content: 'Implement drag-and-drop' },
    { id: '5', listId: 'c', content: 'Deploy to Vercel' },
];

export const getCardsForList = (listId) =>
    cards.filter((card) => card.listId === listId);
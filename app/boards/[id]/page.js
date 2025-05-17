import List from "../../../components/List";
import { getAllBoards, getBoardById, getListsForBoard } from "../../../lib/db";

export const  generateStaticParams = ()=> {
    return getAllBoards().map((b) => ({ id: b.id }));
  }

// Server Component for viewing one board
const boardPage = async ({params}) => {
    const {id} = params;
    const board = getBoardById(id);

    if (!board) {
        return <p className="p-4">🚫 Board not found.</p>;
      }

      const lists = getListsForBoard(id);
  return (
      <main className="p-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">{board.title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
              {lists.map((list) => (
                  <List key={list.id} list={list} />
              ))}
          </div>
      </main>
  )
}

export default boardPage;
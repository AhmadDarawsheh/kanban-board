import BoardView from "../../../components/BoardView.js";
import List from "../../../components/List";
import { getAllBoards, getBoardById, getListsForBoard, getCardsForList, getSubtasksForCard } from "../../../lib/db";

export const generateStaticParams = () => {
    return getAllBoards().map((b) => ({ id: b.id }));
}

// Server Component for viewing one board
const boardPage = async ({ params }) => {
    const { id } = params;
    const board = getBoardById(id);

    if (!board) {
        return <p className="p-4">🚫 Board not found.</p>;
    }

    const listsWithCards = getListsForBoard(id).map(list => ({
        ...list,
        cards: getCardsForList(list.id).map(card => ({
            ...card,
            subtasks: getSubtasksForCard(card.id)  // now every card has a subtasks array
        })),
    }));

    return (
        <main className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6">{board.title}</h1>
            <div className="flex justify-center">
                <BoardView
                    boardId={id}
                    initialLists={listsWithCards}
                />
            </div>
        </main>
    )
}

export default boardPage;
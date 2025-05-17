import BoardList from "../components/BoardList";
import { getAllBoards } from "../lib/db";
const Home = async ()=> {
  const boards = getAllBoards();
  return (
    <main>
      <h1 className="text-3xl font-bold text-center my-8">My Kanban Boards</h1>
      <BoardList boards={boards} />
    </main>
  );
}

export default Home;
import { getCardsForList } from "../lib/db.js"
import Card from "./Card.js";




const List = ({list}) => {
    const cards = getCardsForList(list.id);
  return (
      <div className="w-64 bg-gray-100 rounded p-4 flex-shrink-0 overflow-hidden">
        <h2 className="font-semibold mb-2">{list.title}</h2>
        <div className='w-full h-[2.5px] bg-white rounded-lg mb-3'/>
        {cards.map((card)=>(
            <Card key={card.id} card={card}/>
        ))}
      </div>
  )
}

export default List
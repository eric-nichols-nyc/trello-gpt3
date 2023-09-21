import { useCardStore } from '@/store/CardStore';
import { useModalStore } from '@/store/ModalStore';
import React from 'react'
import { AiOutlineCreditCard } from 'react-icons/ai';

interface Props {
  card: Card;
}
const SearchResultItem = ({
  card,
}:Props) => {
  const {title} = card;
  const [openModal, setType] = useModalStore((state) => [state.openModal, state.setType]);
  const [setCurrCard] = useCardStore((state) => [state.setCurrentCard]);

  const handleCardClick = () => {
    setCurrCard(card)
    setType('CARD')
    openModal()
  }
  return (
    <div 
    className="
    bg-gray-800
    w-[250px]
    flex
    gap-2
    py-2
    px-4
    cursor-pointer
    hover:bg-gray-700
    justify-start
    "
      onClick={handleCardClick}
    >
      <div>
        <AiOutlineCreditCard 
          size={20}
          color='white'
        />
      </div>
  
      <p className="text-slate-100 text-sm ">{title}</p>
    </div>
  )
}

export default SearchResultItem
import React, { useState, useEffect } from 'react'
import { getAllCards } from '../api/Cards'
import { FaEdit } from 'react-icons/fa'
import {FaBoxArchive} from 'react-icons/fa6'
import { Popover, Input, Button } from 'antd'
import { archieveCard } from '../api/Cards'
import { updateCard } from '../api/Cards'
import CardDetails from './CardDetails'

const Cards = ({ listId, cardsCount }) => {

  const [cardDetails, setCardDetails] = useState([])
  const [hoverState, setHoverState] = useState(null)
  const [editCard, setEditCard] = useState(null)
  const [editedCardName, setEditedCardName] = useState('')
  const [completedCards, setCompletedCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
 

  
    const fetchCards = async function () {
      const data = await getAllCards(listId)
      setCardDetails(data)
    }

    useEffect(() => {

      fetchCards()
    }, [listId, cardsCount])


  const handleEdit = (card) => {
    setEditCard(card.id)
    setEditedCardName(card.name)
  }


  const handleSave = async (cardId) => {
    await updateCard(cardId, editedCardName)
    await fetchCards()

    setEditCard(null)
  }


  const handleArchive = async (cardId) => {
    await archieveCard(cardId)
    await fetchCards();
    setEditCard(null)
  }

  const handleComplete = (cardId) => {
    if(completedCards.includes(cardId)) {
      let newArray = [...completedCards]
      let index = newArray.indexOf(cardId)
      newArray.splice(index, 1)
      setCompletedCards(newArray)
    } else {
      setCompletedCards([...completedCards, cardId])
    }
  }


  return (
    <>

      {cardDetails.map((card) => (

        <div
          key={card.id}
          className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer"
          onMouseEnter={() => setHoverState(card.id)}
          onMouseLeave={() => setHoverState(null)}
          onClick = {() => setSelectedCard(card)}
        >

          {hoverState === card.id || editCard === card.id ? (

            <div className="flex justify-between items-center">

              {selectedCard && (
              <CardDetails
                card={selectedCard}
                onClose={() => setSelectedCard(null)}
              />
              )}
              <div className="flex items-center gap-2">
                <input type="checkbox" 
                name="complete" 
                checked={completedCards.includes(card.id)}
                onChange = {() => handleComplete(card.id)}
              
              />
                <span>{card.name}</span>
              </div>

              {completedCards.includes(card.id) ? 
              <Button onClick = {() => handleArchive(card.id)}>
                <FaBoxArchive className = "h-5 w-5" />

              </Button> :
              
            

              <Popover
                trigger="click"
                open={editCard === card.id}
                onOpenChange={(open) => {
                  if (open) {
                    handleEdit(card)
                  } else {
                    setEditCard(null)
                  }
                }}
                content={
                  <div className="flex flex-col gap-3 w-56">

                    <Input
                      value={editedCardName}
                      onChange={(e) => setEditedCardName(e.target.value)}
                      placeholder="Enter card name"
                    />

                    <div className="flex justify-between items-center">

                      <Button
                        type="primary"
                        onClick={() => handleSave(card.id)}
                      >
                        Save
                      </Button>

                      
                        <Button onClick = {() => handleArchive(card.id)}>
                          Archive
                        </Button>
                      

                    </div>

                  </div>
                }
              >

                <FaEdit
                  className="w-5 h-5 cursor-pointer"
                  onClick={(e) => {e.stopPropagation(); handleEdit(card)}}
                />

              </Popover>
          }
      

            </div>

          ) : (

            <span>{card.name}</span>

          )}

        </div>
  
      
      ))}

    </>
  )
}

export default Cards
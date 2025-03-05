/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { words as germanWords } from "../data/germanB2";
import { words as englishWords } from "../data/englishC1";
import { useLocation } from "react-router-dom";

const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const location = useLocation();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const savedCards = localStorage.getItem(location.pathname);
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    } else {
      if (location.pathname === "/german/b2") {
        setCards(germanWords);
      } else if (location.pathname === "/english/c1") {
        setCards(englishWords);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem(location.pathname, JSON.stringify(cards));
    }
  }, [cards, location.pathname]);

  const moveCardToEnd = (index) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const [movedCard] = newCards.splice(index, 1);
      newCards.push(movedCard);
      return newCards;
    });
  };

  const moveCardToTop = (index) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const [movedCard] = newCards.splice(index, 1);
      newCards.unshift(movedCard);
      return newCards;
    });
  };

  return (
    <CardsContext.Provider value={{ cards, moveCardToEnd, moveCardToTop }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => useContext(CardsContext);

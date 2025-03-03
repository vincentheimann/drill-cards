import React from "react";
import { Typography } from "@mui/material";
import FlashCardList from "../components/FlashCardList";

const B2Page = () => {
  const flashcards = [
    { id: 1, word: "Wort1", translation: "Translation1" },
    { id: 2, word: "Wort2", translation: "Translation2" },
    // ...more flashcards
  ];

  return (
    <div>
      <Typography variant="h4">Page B2 - Resources and Exercises</Typography>
      <h2>German B2 Flashcards</h2>
      <FlashCardList flashcards={flashcards} />
    </div>
  );
};

export default B2Page;

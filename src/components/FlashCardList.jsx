import { Grid2 } from "@mui/material";
import Flashcard from "./Flashcard";
import { words } from "../data/words";

export default function FlashcardList() {
  return (
    <Grid2 container spacing={3} padding={2}>
      {words.map((word, index) => (
        <Grid2 item xs={12} sm={6} md={4} key={index}>
          <Flashcard word={word} />
        </Grid2>
      ))}
    </Grid2>
  );
}

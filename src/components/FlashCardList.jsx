import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Flashcard from "./Flashcard";
import { words } from "../data/words";

export default function FlashcardList() {
  return (
    <Box>
      <Grid container spacing={6}>
        {words.map((word, index) => (
          <Grid size="auto" key={index}>
            <Flashcard word={word} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

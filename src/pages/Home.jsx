import Grid from "@mui/material/Grid2";
import FlashcardList from "../components/FlashCardList";

export default function Home() {
  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={12} sm={6} md={4}>
        <h1>My Flashcards</h1>
        <FlashcardList />
      </Grid>
    </Grid>
  );
}

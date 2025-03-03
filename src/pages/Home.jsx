import Grid from "@mui/material/Grid";
import FlashcardList from "../components/FlashcardList";

export default function Home() {
  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={12}>
        <h1>My Flashcards</h1>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FlashcardList />
      </Grid>
    </Grid>
  );
}

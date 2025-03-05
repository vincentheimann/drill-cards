import Grid from "@mui/material/Grid2";
import DrillCardList from "../components/DrillCardList";

export default function Home() {
  return (
    <Grid container spacing={3} padding={2}>
      <Grid item size={12}>
        <h1>My Drill Cards</h1>
      </Grid>
      <Grid item size={12} sm={6} md={4}>
        <DrillCardList />
      </Grid>
    </Grid>
  );
}

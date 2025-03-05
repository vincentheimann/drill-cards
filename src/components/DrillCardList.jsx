import { useState } from "react";
import {
  Box,
  FormGroup,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DrillCard from "./DrillCard";
import { useCards } from "../context/CardsContext";

export default function DrillCardList() {
  const { cards, moveCardToEnd, moveCardToTop } = useCards();

  return (
    <Box>
      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid xs="auto" key={index}>
            <DrillCard
              word={card}
              moveCardToEnd={() => moveCardToEnd(index)}
              moveCardToTop={() => moveCardToTop(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

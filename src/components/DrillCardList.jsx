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
  const [switchAll, setSwitchAll] = useState(false);
  const handleChange = () => {
    setSwitchAll((prev) => !prev);
  };
  const { cards, moveCardToEnd, moveCardToTop } = useCards();

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid size={12}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={switchAll}
                    onChange={handleChange}
                    name="switch-all"
                  />
                }
                label="Switch All Cards"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        {cards.map((card, index) => (
          <Grid size="auto" key={index}>
            <DrillCard
              word={card}
              switchAll={switchAll}
              moveCardToEnd={() => moveCardToEnd(index)}
              moveCardToTop={() => moveCardToTop(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

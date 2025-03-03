import { useState } from "react";
import {
  Box,
  FormGroup,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FlashCard from "./FlashCard";
import { words } from "../data/words";

export default function FlashcardList() {
  const [switchAll, setSwitchAll] = useState(false);
  const handleChange = () => {
    setSwitchAll((prev) => !prev);
  };
  return (
    <Box>
      <Grid container spacing={6}>
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
        {words.map((word, index) => (
          <Grid size="auto" key={index}>
            <FlashCard word={word} switchAll={switchAll} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

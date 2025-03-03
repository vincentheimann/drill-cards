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
import { words } from "../data/words";

export default function DrillCardList() {
  const [switchAll, setSwitchAll] = useState(false);
  const handleChange = () => {
    setSwitchAll((prev) => !prev);
  };
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
        {words.map((word, index) => (
          <Grid size="auto" key={index}>
            <DrillCard word={word} switchAll={switchAll} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

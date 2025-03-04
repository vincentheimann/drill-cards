import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  FormGroup,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DrillCard from "./DrillCard";
import { words as germanWords } from "../data/germanB2";
import { words as englishWords } from "../data/englishC1";

export default function DrillCardList() {
  const location = useLocation();
  const [switchAll, setSwitchAll] = useState(false);
  const handleChange = () => {
    setSwitchAll((prev) => !prev);
  };

  let words = [];
  if (location.pathname === "/german/b2") {
    words = germanWords;
  } else if (location.pathname === "/english/c1") {
    words = englishWords;
  }

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

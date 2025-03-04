import { useState, useEffect } from "react";
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
  const [words, setWords] = useState([]);

  useEffect(() => {
    const savedWords = localStorage.getItem(location.pathname);
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    } else {
      if (location.pathname === "/german/b2") {
        setWords(germanWords);
      } else if (location.pathname === "/english/c1") {
        setWords(englishWords);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (words.length > 0) {
      localStorage.setItem(location.pathname, JSON.stringify(words));
    }
  }, [words, location.pathname]);

  const handleChange = () => {
    setSwitchAll((prev) => !prev);
  };

  const moveCardToEnd = (index) => {
    setWords((prevWords) => {
      const newWords = [...prevWords];
      const [movedWord] = newWords.splice(index, 1);
      newWords.push(movedWord);
      return newWords;
    });
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
            <DrillCard
              word={word}
              switchAll={switchAll}
              moveCardToEnd={() => moveCardToEnd(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

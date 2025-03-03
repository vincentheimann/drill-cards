/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function Flashcard({ word, switchAll }) {
  const [flipped, setFlipped] = useState(switchAll);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setFlipped(switchAll);
  }, [switchAll]);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleFlipped = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <Card
      onMouseEnter={!isTouchDevice ? handleFlipped : undefined}
      onMouseLeave={!isTouchDevice ? handleFlipped : undefined}
      onClick={isTouchDevice ? handleFlipped : undefined}
      style={{
        width: "250px",
        height: "160px",
        backgroundColor: flipped ? "#E3F2FD" : "white", // Light blue if flipped
        margin: "auto",
      }}
    >
      <CardContent>
        {flipped ? (
          <>
            <Typography variant="h6" component="div">
              {word.fr}
            </Typography>
            <Typography variant="caption" color="textSecondary" mt={1}>
              {word.translatedSentence}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" component="div">
              {word.de}
            </Typography>
            <Typography variant="caption" color="textSecondary" mt={1}>
              {word.sentence}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

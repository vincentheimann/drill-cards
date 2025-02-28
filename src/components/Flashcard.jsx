/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function Flashcard({ word }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Card
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{
        width: "250px",
        height: "160px",
        backgroundColor: flipped ? "#E3F2FD" : "white", // Bleu clair si flipped
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

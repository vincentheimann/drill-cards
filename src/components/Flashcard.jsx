import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function Flashcard({ word }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Card
      className="w-64 h-40 text-center p-4 shadow-lg rounded-2xl cursor-pointer"
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
            <Typography variant="h5" component="div">
              {word.fr}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              {word.translatedSentence}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h5" component="div">
              {word.de}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              {word.sentence}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

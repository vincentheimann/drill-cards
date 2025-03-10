/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VerticalAlignTopOutlinedIcon from "@mui/icons-material/VerticalAlignTopOutlined";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";

export default function DrillCard({
  word,
  switchAll,
  moveCardToEnd,
  moveCardToTop,
}) {
  const theme = useTheme();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [flipped, setFlipped] = useState(switchAll);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    setFlipped(switchAll);
  }, [switchAll]);

  const handleFlipped = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <Card
      style={{
        width: "250px",
        height: "160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: flipped
          ? theme.palette.mode === "dark"
            ? "#2A3947" // Muted blue-gray in dark mode
            : "#E3F2FD" // Light blue in light mode
          : theme.palette.background.paper, // Default card color
      }}
    >
      <CardContent
        onMouseEnter={!isTouchDevice ? handleFlipped : undefined}
        onMouseLeave={!isTouchDevice ? handleFlipped : undefined}
        onClick={isTouchDevice ? handleFlipped : undefined}
      >
        {flipped ? (
          <>
            <Typography variant="h6" component="div">
              {word.translatedTitle}
            </Typography>
            <Typography variant="caption" color="textSecondary" mt={1}>
              {word.translatedSentence}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" component="div">
              {word.title}
            </Typography>
            <Typography variant="caption" color="textSecondary" mt={1}>
              {word.sentence}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions style={{ marginTop: "auto" }}>
        <Tooltip title="Move to the Top">
          <IconButton size="small" onClick={moveCardToTop}>
            <VerticalAlignTopOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Move to the End">
          <IconButton size="small" onClick={moveCardToEnd}>
            <VerticalAlignBottomOutlinedIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

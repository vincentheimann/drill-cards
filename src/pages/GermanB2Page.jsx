import { Typography } from "@mui/material";
import DrillCardList from "../components/DrillCardList";

const B2Page = () => {
  const drillcards = [
    { id: 1, word: "Wort1", translation: "Translation1" },
    { id: 2, word: "Wort2", translation: "Translation2" },
    // ...more drill cards
  ];

  return (
    <div>
      <Typography variant="h4">Page B2 - Resources and Exercises</Typography>
      <h2>German B2 Drill Cards</h2>
      <DrillCardList drillcards={drillcards} />
    </div>
  );
};

export default B2Page;

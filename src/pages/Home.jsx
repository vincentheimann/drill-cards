import FlashcardList from "../components/FlashcardList";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Apprenez l'allemand avec des flashcards !</h1>
      <FlashcardList />
    </div>
  );
}

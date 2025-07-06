export const formatGenre = (genre: string) => {
  switch (genre) {
    case "NON_FICTION":
      return "Non-fiction";
    case "FICTION":
      return "Fiction";
    case "SCIENCE":
      return "Science";
    case "HISTORY":
      return "History";
    case "BIOGRAPHY":
      return "Biography";
    case "FANTASY":
      return "Fantasy";
    default:
      return genre;
  }
};

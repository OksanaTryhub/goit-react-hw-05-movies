export const getReleaseYear = releaseDate => {
  const date = new Date(releaseDate);
  return date.getFullYear();
};

export const getReviewDate = updated_at => {
  const date = new Date(updated_at);

  return date.toDateString();
};

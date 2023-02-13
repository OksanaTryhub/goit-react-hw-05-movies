const getReleaseYear = releaseDate => {
  const date = new Date(releaseDate);
  return date.getFullYear();
};

export default getReleaseYear;

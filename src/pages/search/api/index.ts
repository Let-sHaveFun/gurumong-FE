export const search = async (query: string) => {
  const response = await fetch(`https://api.example.com/search?query=${query}`);
  const data = await response.json();
  return data;
};

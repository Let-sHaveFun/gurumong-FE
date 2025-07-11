// "https://dormung.goorm.training/api/tour-spots/search?keyword=%EC%84%B1%EC%82%B0&latitude=33.462147&longitude=126.936424"

export const search = async (query: string) => {
  // const response = await fetch(`https://api.example.com/search?query=${query}`);
  const response = await fetch(`https://dormung.goorm.training/api/tour-spots/search?keyword=${query}`);
  const data = await response.json();
  return data;
};

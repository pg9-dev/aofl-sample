const getData = () => `https://jsonplaceholder.typicode.com/albums/${Math.floor(Math.random() * 40) + 1}/photos`;
const getAPIImage = () => `https://picsum.photos/500/500?random=${Math.floor(Math.random() * 60) + 1}`;

const getCardData = async () => {
  const response = await fetch(getData());
  if (!response) return;
  const jsonResponse = await response.json();
  return {...jsonResponse[1], imageURL: getAPIImage()};
};

export default getCardData;

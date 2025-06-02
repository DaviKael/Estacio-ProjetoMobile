function useNewsService() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  if (!API_URL) {
    throw new Error("API URL is not defined");
  }

  const getNews = async (category: string, page: number = 1, pageSize: number = 10) => {
    try {
      const url = `${API_URL}/${category}?page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to fetch news for category: ${category}`);
      }
      return data;
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  }

  return {
    getNews,
  }
}

export { useNewsService };

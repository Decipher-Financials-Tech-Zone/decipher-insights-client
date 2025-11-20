const fetch_news = async (keyword) => {
    const url = 'https://newsapi.org/v2/everything?' +
        `q=${keyword}&` +
        'from=2025-03-01&' +
        'sortBy=popularity&' +
        'apiKey=49d6443e90d944cabe5a012627ec91ad';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newsData = await response.json();
        return newsData; // Return the news data if needed
    } catch (error) {
        console.error("Error fetching news:", error);
        return null;
    }
};

export default fetch_news;

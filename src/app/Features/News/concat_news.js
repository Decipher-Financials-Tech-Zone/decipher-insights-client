const { default: fetch_news } = require("@/app/api/fetch_news");

const concat_news = async (keyword) => {
    // Fetch the news
    const currentNews = await fetch_news(keyword);

    // Extract articles
    let current_news_articles = currentNews["articles"];

    // Add the `keyword` field to each article
    current_news_articles = current_news_articles.map(article => ({
        ...article,  // Spread the existing properties
        keyword: keyword  // Add the new property
    }));

    return current_news_articles; // Return the modified articles
};


export default concat_news
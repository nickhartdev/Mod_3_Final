import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { fetchArticles, fetchCNNEsArticles } from '../../ApiHelper/ApiHelper';
import Articles from './Articles/Articles';

const Home = ({ interests, readingList, toggleReadingListStatus }) => {
  const [articles, setArticles] = useState([]);
  const {t, i18n} = useTranslation();

  const shuffleArticles = articles => {
    const shuffledArticles = [];

    for (let i = articles.length; i > 0; i--) {
      const randomIndex = Math.round(Math.random * articles.length);
      const randomArticle = articles.splice(randomIndex, 1);

      shuffledArticles.push(randomArticle[0]);
    }

    return shuffledArticles;
  }

  const getArticles = async () => {
    const articlesData = await fetchArticles(i18n.language, interests);
    
    if (i18n.language === 'es') {
      const cnnEsArticlesData = await fetchCNNEsArticles();
      articlesData.concat(cnnEsArticlesData);
    }
    const shuffledArticles = shuffleArticles(articlesData);

    setArticles(shuffledArticles);
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <main>
      <h1>{t('home header')}</h1>
      <Articles 
        articles={ articles } 
        readingList={ readingList }
        toggleReadingListStatus={ toggleReadingListStatus }
      />
    </main>
  );
}

export default Home;
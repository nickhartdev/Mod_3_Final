import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './Article.css';
import moment from 'moment';

const Article = ({ articleToDisplay, readingList, toggleReadingListStatus }) => {
  const { t } = useTranslation();
  const readingListTitles = readingList.map(article => article.title);
  const toggleReadingListText = !readingListTitles.includes(articleToDisplay.title) ? 'add to list' : 'remove from list';
  const callToggleReadingListStatus = () => {
    toggleReadingListStatus(articleToDisplay)
  }

  return (
    <article>
      <div className="image-container">
        <div className="image-overlay"></div>
        <img src={`${articleToDisplay.urlToImage}`} alt="" />
      </div>
      <p className="title">{articleToDisplay.title}</p>
      <p className="time-published">
        {`${t('published on')} ${moment(articleToDisplay.publishedAt).format('MM/DD/YYYY')}`}
      </p>
      <div className="button-container">
        <a className="article-link" href={`${articleToDisplay.url}`}>
          {t("article link")}
        </a>
        <button type="button" className="reading-list-button" onClick={callToggleReadingListStatus}>
          {t(`${toggleReadingListText}`)}
        </button>
      </div>
    </article>
  );
}

Article.propTypes = {
  articleToDisplay: PropTypes.object,
  readingList: PropTypes.array,
  toggleReadingListStatus: PropTypes.func
}

export default Article;
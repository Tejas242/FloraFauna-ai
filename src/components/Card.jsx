import React from 'react';

const Card = ({ image, title, description }) => {
  return (
    <div className="knowledge-card">
      <img src={image} alt={title} className="knowledge-card__image" />
      <div className="knowledge-card__content">
        <h2 className="knowledge-card__title">{title}</h2>
        <p className="knowledge-card__text knowledge-card__text--scientific-name">
          Scientific Name: {description.scientificName}
        </p>
        <p className="knowledge-card__text knowledge-card__text--common-names">
          Common Names: {description.commonNames.join(', ')}
        </p>
        <p className="knowledge-card__text knowledge-card__text--description">
          Description:
        </p>
        <ul className="knowledge-card__list">
          {description.briefDescription.map((desc, index) => (
            <li key={index} className="knowledge-card__item">
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
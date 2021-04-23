import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setFavorite, deleteFavorite } from '../actions';
import '../assets/styles/components/CarouselItem.scss';

import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

const CarouselItem = props => {
   const { id, cover, title, year, contentRating, duration, isList } = props;
   const handleSetFavorite = () => {
      props.setFavorite({
         id, cover, title, year, contentRating, duration
      });
   }
   const handleDeleteFavorite = itemId => {
      props.deleteFavorite(itemId);
   }
   /* 
      Otra forma puede ser asi, no estoy seguro de si es segura pero esta.
      const handleDeleteFavorite = () => {
         props.deleteFavorite(id);
      };
      // ...
      onClick={handleDeleteFavorite} 
   */
   return (
      <div className="carousel-item">
         <img className="carousel-item__img" src={cover} alt={title}  />
         <div className="carousel-item__details">
            <div>
               <Link to={`/player/${id}`}>
                  <img
                     className="carousel-item__details--img"
                     src={playIcon}
                     alt="Play Icon"
                  /> 
               </Link>
               {isList ?
                  <img 
                     className="carousel-item__details--img" 
                     src={plusIcon} 
                     alt="Plus Icon"
                     onClick={handleSetFavorite}
                  /> :
                  <img 
                     className="carousel-item__details--img" 
                     src={removeIcon} 
                     alt="Remove Icon"
                     onClick={() => handleDeleteFavorite(id)}
                  />
               }
            </div>
            <p className="carousel-item__details--title">{title}</p>
            <p className="carousel-item__details--subtitle">
               {`${year} ${contentRating} ${duration} minutos`}
            </p>
         </div>
      </div>
   );
}

CarouselItem.propTypes = {
   id: PropTypes.number.isRequired,
   cover: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   year: PropTypes.number.isRequired,
   contentRating: PropTypes.string.isRequired,
   duration: PropTypes.number.isRequired,
   isList: PropTypes.bool,
   setFavorite: PropTypes.func,
   deleteFavorite: PropTypes.func,
}

const mapDispatchToProps = {
   setFavorite,
   deleteFavorite,
}

export default connect(null, mapDispatchToProps)(CarouselItem);
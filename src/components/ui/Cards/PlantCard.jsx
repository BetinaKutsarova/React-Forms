import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../../ui/Cards/PlantCard.css';

const PlantCard = ({ plant, isPlantFavorited, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onToggleFavorite(plant);
  };

  return (
    <div className="plant-card">
      <Link to={`/plant/${plant.id}`}>
        {plant.image_url && (
          <img 
            src={plant.image_url} 
            alt={plant.common_name || plant.scientific_name}
          />
        )}
        <h2>{plant.common_name || plant.scientific_name}</h2>
        <p className="scientific-name">{plant.scientific_name}</p>
        <p>{plant.family_common_name}</p>
      </Link>
      <button 
        className="heart-button"
        onClick={handleFavoriteClick}
        aria-label={isPlantFavorited(plant) ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isPlantFavorited(plant) ? (
          <FaHeart className="heart-icon filled" />
        ) : (
          <FaRegHeart className="heart-icon" />
        )}
      </button>
    </div>
  );
};

export default PlantCard;
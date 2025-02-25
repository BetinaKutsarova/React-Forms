import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import PlantImage from '../Images/PlantImage';
import '../../ui/Cards/PlantCard.css';


const PlantCard = ({ plant, isPlantFavorited, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onToggleFavorite(plant);
  };

  const plantId = typeof plant.id === 'number' ? plant.id : parseInt(plant.id, 10);

  return (
    <div className="plant-card">
      <Link to={`/plants/${plantId}`}>
        {plant.image_url && (
          <PlantImage
            imageUrl={plant.image_url}
            altText={plant.common_name || plant.scientific_name}
          />
        )}
        <div className="plant-info">
          <h2>{plant.common_name || plant.scientific_name}</h2>
          <p className="scientific-name-home">{plant.scientific_name}</p>
          <p>{plant.family_common_name}</p>
        </div>
      </Link>
      <button
        className="heart-button"
        onClick={handleFavoriteClick}
        aria-label={isPlantFavorited(plant) ? 'Remove from garden favorites' : 'Add to garden favorites'}
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
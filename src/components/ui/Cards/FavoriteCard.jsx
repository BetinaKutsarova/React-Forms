import './FavoriteCard.css'
import { ImCross } from 'react-icons/im'
import { useRemoveFavoriteMutation } from '../../../redux/features/favoritesApi'

function FavoriteCard({ plant }) {
    const [removeFavorite] = useRemoveFavoriteMutation()

    const handleRemove = async () => {
      try {
        await removeFavorite(plant.id)
      } catch (err) {
        console.error('Error removing favorite:', err)
      }
    }
    
  return (
    <div className="favorite-item">
      <div className="plant-image">
        {plant.image_url && (
          <img 
            src={plant.image_url} 
            alt={plant.common_name || plant.scientific_name}
          />
        )}
      </div>
      <div className="plant-info">
        <h2>{plant.common_name || plant.scientific_name}</h2>
        <p className="scientific-name">{plant.scientific_name}</p>
        {plant.family_common_name && (
          <p className="family-name">Family: {plant.family_common_name}</p>
        )}
      </div>
      <button 
        className="remove-button" 
        onClick={handleRemove}
        aria-label="Remove from favorites"
      >
        <ImCross />
      </button>
    </div>
  )
}

export default FavoriteCard
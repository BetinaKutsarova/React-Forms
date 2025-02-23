import { useState } from 'react'
import { useGetPlantsQuery } from '../../redux/features/plantsApi'
import { useAddFavoriteMutation, useGetFavoritesQuery, useRemoveFavoriteMutation} from '../../redux/features/favoritesApi'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import './Home.css'

function Home() {
  console.log("API Key:", import.meta.env.VITE_TREFLE_API_KEY);
  const [page, setPage] = useState(1)
  const {data: favorites = []} = useGetFavoritesQuery()
  const [addFavorite] = useAddFavoriteMutation()
  const [removeFavorite] = useRemoveFavoriteMutation()
  const { data, error, isLoading } = useGetPlantsQuery(page)

  if (isLoading) {
    return <div className="loading">Loading plants...</div>
  }

  if (error) {
    console.log('API Error:', error);
    return <div className="error">
      Error: {error.status} {error.data?.message || error.error}
    </div>;
  }

  const handleToggleFavorite = async (plant) => {
    try {
      const existingFavorite = favorites.find(
        fav => fav.scientific_name === plant.scientific_name
      )
      
      if (existingFavorite) {
        console.log('Removing favorite with ID:', existingFavorite.id)
        await removeFavorite(existingFavorite.id)
      } else {
        console.log('Adding new favorite:', plant.scientific_name)
        await addFavorite({
          common_name: plant.common_name,
          scientific_name: plant.scientific_name,
          image_url: plant.image_url,
          family_common_name: plant.family_common_name
        })
      }
    } catch (err) {
      console.error('Error toggling favorite:', err)
    }
  }

  const isPlantFavorited = (plant) => {
    return favorites.some(fav => fav.scientific_name === plant.scientific_name)
  }

  return (
    <div className="home-container">
      <h1>Plantssssssssss</h1>
      
      <div className="plants-grid">
        {data?.data.map((plant) => (
          <div key={plant.id} className="plant-card">
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
              onClick={(e) => {
                e.preventDefault();
                handleToggleFavorite(plant);
              }}
              aria-label={isPlantFavorited(plant) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isPlantFavorited(plant) ? (
                <FaHeart className="heart-icon filled" />
              ) : (
                <FaRegHeart className="heart-icon" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={!data?.links?.next}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Home;
import { useState } from 'react'
import { useGetPlantsQuery } from '../../redux/features/plantsApi'
import { useAddFavoriteMutation, useGetFavoritesQuery, useRemoveFavoriteMutation} from '../../redux/features/favoritesApi'
import PlantCard from '../../components/ui/Cards/PlantCard'
import './Home.css'
import '../../styles/common.css'
import Loader from '../../components/ui/Loader/Loader'

function Home() {
  console.log("API Key:", import.meta.env.VITE_TREFLE_API_KEY);
  const [page, setPage] = useState(1)
  const {data: favorites = []} = useGetFavoritesQuery()
  const [addFavorite] = useAddFavoriteMutation()
  const [removeFavorite] = useRemoveFavoriteMutation()
  const { data, error, isFetching} = useGetPlantsQuery(page)

  

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
      <h1>Explore Earth&apos;s Gardens</h1>
      
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <div className="plants-grid">
            {data?.data.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                isPlantFavorited={isPlantFavorited}
                onToggleFavorite={handleToggleFavorite}
              />
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
        </>
      )}
    </div>
  )
}

export default Home;
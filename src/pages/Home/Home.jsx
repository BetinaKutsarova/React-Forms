import { useState } from 'react'
import { useGetPlantsQuery } from '../../redux/features/plantsApi'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  console.log("API Key:", import.meta.env.VITE_TREFLE_API_KEY);
  const [page, setPage] = useState(1)
  const { data, error, isLoading } = useGetPlantsQuery(page)

  if (isLoading) {
    return <div className="loading">Loading plants...</div>
  }

  if (error) {
    console.log('API Error:', error); // This will show the full error in console
    return <div className="error">
      Error: {error.status} {error.data?.message || error.error}
    </div>;
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
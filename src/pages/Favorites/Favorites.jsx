import { useGetFavoritesQuery } from '../../redux/features/favoritesApi'
import { Link } from 'react-router-dom'
import FavoriteCard from '../../components/ui/Cards/FavoriteCard'
import './Favorites.css'
import Loader from '../../components/ui/Loader/Loader'
import '../../styles/common.css'


function Favorites() {
    const { data: favorites = [], error, isFetching } = useGetFavoritesQuery()

    if (error) {
        return <div className="error">Error loading favorites: {error.message}</div>
    }

    if (favorites.length === 0) {
        return <div className="no-favorites">
            <h2>Your Garden is empty! <Link to="/home">Go find some plants</Link></h2>
        </div>
    }

    return (
        <div className="favorites-container">
            <h1>Your Garden</h1>

            {isFetching ? (
                <Loader />
            ) : (
                <>
                    <div className="favorites-list">
                        {favorites.map((plant) => (
                            <FavoriteCard key={plant.id} plant={plant} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Favorites
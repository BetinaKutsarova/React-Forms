import { useGetFavoritesQuery } from '../../redux/features/favoritesApi'
import { Link } from 'react-router-dom'
import FavoriteCard from '../../components/ui/Cards/FavoriteCard'
import './Favorites.css'
import Loader from '../../components/ui/Loader/Loader'
import '../../styles/common.css'
import Pagination from '../../components/ui/Pagination/Pagination'
import { useState } from 'react'


function Favorites() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const { data: favorites = [], error, isFetching } = useGetFavoritesQuery()

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFavorites = favorites.slice(startIndex, endIndex);
    const hasMorePages = endIndex < favorites.length;

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
                        {paginatedFavorites.map((plant) => (
                            <FavoriteCard key={plant.id} plant={plant} />
                        ))}
                    </div>

                    {favorites.length > itemsPerPage && (
                        <Pagination 
                        currentPage={page} 
                        onPageChange={setPage} 
                        hasNextPage={hasMorePages} 
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Favorites
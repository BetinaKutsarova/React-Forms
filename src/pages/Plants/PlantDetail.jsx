import { useParams, Link } from 'react-router-dom';
import { useGetPlantDetailsQuery } from '../../redux/features/plantsApi';
import { useAddFavoriteMutation, useGetFavoritesQuery, useRemoveFavoriteMutation } from '../../redux/features/favoritesApi';
import PlantImage from '../../components/ui/Images/PlantImage';
import Loader from '../../components/ui/Loader/Loader';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import './PlantDetail.css';
import NotFound from '../Other/NotFound';

function PlantDetail() {
    const { id } = useParams();
    const plantId = parseInt(id, 10);

    const { data, isFetching } = useGetPlantDetailsQuery(plantId);
    const { data: favorites = [] } = useGetFavoritesQuery();
    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();

    // not sure if that's the best approach but it works
    const getObjectName = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        if (typeof obj === 'object') {
            return obj.name || obj.common_name || JSON.stringify(obj);
        }
        return String(obj);
    };


    if (isFetching) return <Loader />;


    const plant = data?.data;
    if (!plant) {
        return <NotFound />;
    }

    const isPlantFavorited = () => {
        return favorites.some(fav => fav.scientific_name === plant.scientific_name);
    };

    const handleToggleFavorite = async () => {
        try {
            const existingFavorite = favorites.find(
                fav => fav.scientific_name === plant.scientific_name
            );

            if (existingFavorite) {
                await removeFavorite(existingFavorite.id);
            } else {
                await addFavorite({
                    common_name: plant.common_name,
                    scientific_name: plant.scientific_name,
                    image_url: plant.image_url,
                    family_common_name: plant.family_common_name
                });
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    };


    return (
        <div className="plant-detail-container">
            <div className="plant-detail-header">
                <Link to="/home" className="back-button">
                    <FaArrowLeft /> Back to Plants
                </Link>

                <button
                    className="heart-button-detail"
                    onClick={handleToggleFavorite}
                    aria-label={isPlantFavorited() ? 'Remove from garden favorites' : 'Add to garden favorites'}
                >
                    {isPlantFavorited() ? (
                        <FaHeart className="heart-icon filled" />
                    ) : (
                        <FaRegHeart className="heart-icon" />
                    )}
                </button>
            </div>

            <div className="plant-detail-content">
                <div className="plant-detail-main">
                    <div className="plant-detail-image">
                        {plant.image_url && (
                            <PlantImage
                                imageUrl={plant.image_url}
                                altText={plant.common_name || plant.scientific_name}
                            />
                        )}
                        {!plant.image_url && (
                            <div>No image available</div>
                        )}
                    </div>

                    <div className="plant-detail-info">
                        <h1>{plant.common_name || plant.scientific_name || 'Unknown'}</h1>
                        <p className="scientific-name">{plant.scientific_name}</p>

                        {plant.family && (
                            <p className="family-name">
                                Family: {typeof plant.family === 'object' ? plant.family.name : plant.family}
                                {plant.family && typeof plant.family === 'object' && plant.family.common_name &&
                                    ` (${plant.family.common_name})`}
                            </p>
                        )}

                        {plant.genus && (
                            <p className="genus-name">
                                Genus: {typeof plant.genus === 'object' ? plant.genus.name : plant.genus}
                            </p>
                        )}

                        {plant.year && (
                            <p className="year">Year identified: {plant.year}</p>
                        )}
                    </div>
                </div>

                <div className="plant-detail-sections">
                    {plant.main_species && (
                        <div className="detail-section">
                            <h2>Characteristics</h2>
                            <div className="detail-grid">
                                {plant.main_species.specifications?.ligneous_type && (
                                    <div className="detail-item">
                                        <span className="detail-label">Type:</span>
                                        <span>{getObjectName(plant.main_species.specifications.ligneous_type)}</span>
                                    </div>
                                )}

                                {plant.duration && (
                                    <div className="detail-item">
                                        <span className="detail-label">Duration:</span>
                                        <span>{plant.duration}</span>
                                    </div>
                                )}

                                {plant.main_species.specifications?.growth_form && (
                                    <div className="detail-item">
                                        <span className="detail-label">Growth Form:</span>
                                        <span>{getObjectName(plant.main_species.specifications.growth_form)}</span>
                                    </div>
                                )}

                                {plant.main_species.specifications?.growth_habit && (
                                    <div className="detail-item">
                                        <span className="detail-label">Growth Habit:</span>
                                        <span>{getObjectName(plant.main_species.specifications.growth_habit)}</span>
                                    </div>
                                )}

                                {plant.main_species.flower?.color && (
                                    <div className="detail-item">
                                        <span className="detail-label">Flower Color:</span>
                                        <span>{getObjectName(plant.main_species.flower.color)}</span>
                                    </div>
                                )}

                                {plant.observations && (
                                    <div className="detail-item">
                                        <span className="detail-label">Observations:</span>
                                        <span>{plant.observations}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {plant.main_species?.growth && (
                        <div className="detail-section">
                            <h2>Growing Conditions</h2>
                            <div className="detail-grid">
                                {plant.main_species.growth.ph_minimum && plant.main_species.growth.ph_maximum && (
                                    <div className="detail-item">
                                        <span className="detail-label">pH Range:</span>
                                        <span>{plant.main_species.growth.ph_minimum} - {plant.main_species.growth.ph_maximum}</span>
                                    </div>
                                )}

                                {plant.main_species.growth.light && (
                                    <div className="detail-item">
                                        <span className="detail-label">Light:</span>
                                        <span>{getObjectName(plant.main_species.growth.light)}</span>
                                    </div>
                                )}

                                {plant.main_species.growth.atmospheric_humidity && (
                                    <div className="detail-item">
                                        <span className="detail-label">Humidity:</span>
                                        <span>{getObjectName(plant.main_species.growth.atmospheric_humidity)}</span>
                                    </div>
                                )}

                                {plant.main_species.growth.soil_nutriments && (
                                    <div className="detail-item">
                                        <span className="detail-label">Soil Nutrients:</span>
                                        <span>{getObjectName(plant.main_species.growth.soil_nutriments)}</span>
                                    </div>
                                )}

                                {plant.main_species.growth.minimum_temperature && (
                                    <div className="detail-item">
                                        <span className="detail-label">Minimum Temperature:</span>
                                        <span>
                                            {typeof plant.main_species.growth.minimum_temperature === 'object'
                                                ? `${plant.main_species.growth.minimum_temperature.deg_f || 'N/A'}°F / ${plant.main_species.growth.minimum_temperature.deg_c || 'N/A'}°C`
                                                : plant.main_species.growth.minimum_temperature}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {plant.main_species?.distributions?.native &&
                        Array.isArray(plant.main_species.distributions.native) &&
                        plant.main_species.distributions.native.length > 0 && (
                            <div className="detail-section">
                                <h2>Native Distribution</h2>
                                <ul className="distribution-list">
                                    {plant.main_species.distributions.native.map((region, index) => (
                                        <li key={index}>{getObjectName(region)}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );

}

export default PlantDetail;
function PlantImage({ imageUrl, altText, className }) {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'fallbackplant.jpg';
  };

  return (
    <img 
      src={imageUrl} // simulate an error - "https://invalid-url.jpg"
      alt={altText}
      className={className}
      onError={handleImageError}
    />
  );
}

export default PlantImage;
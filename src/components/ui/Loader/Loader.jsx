import './Loader.css';
import { PiPlantFill } from 'react-icons/pi';

function Loader() {
  return (
    <div className="loading-container">
      <div className="leaves-loading">
        <PiPlantFill className="leaf"/>
        <PiPlantFill className="leaf"/>
        <PiPlantFill className="leaf"/>
      </div>
      <div className="loading-text">Loading plants...</div>
    </div>
  );
}

export default Loader;
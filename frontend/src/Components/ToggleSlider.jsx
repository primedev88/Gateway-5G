import './ToggleSlider.css';
import propTypes from 'prop-types'

function ToggleSlider(props) {
  const {isHotspotOn,toggleHotspot}=props;
  return (
    <div className="toggle-slider">
        <input 
            type="checkbox" 
            id="toggle"
            checked={!isHotspotOn}
            onChange={(event)=>toggleHotspot(event)}
        />
        <label htmlFor="toggle" className="slider" />
    </div>
  )
}

export default ToggleSlider;
ToggleSlider.propTypes = {isHotspotOn: propTypes.boolean, toggleHotspot: propTypes.func}
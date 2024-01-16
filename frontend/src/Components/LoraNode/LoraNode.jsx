import "./LoraNode.css";
import propTypes from 'prop-types'

function LoraNode(props) {
    const {bgColor}=props;
  return (
    <div
      className="node"
      style={{backgroundColor:bgColor}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 5 5"
        fill="none"
      >
        <path
          d="M4.3 0.725L4.5 0.525C4.15 0.175 3.7 0 3.25 0C2.8 0 2.35 0.175 2 0.525L2.2 0.725C2.5 0.45 2.875 0.3 3.25 0.3C3.625 0.3 4 0.45 4.3 0.725ZM4.075 0.925C3.85 0.7 3.55 0.575 3.25 0.575C2.95 0.575 2.65 0.7 2.425 0.925L2.625 1.125C2.8 0.95 3.025 0.875 3.25 0.875C3.475 0.875 3.7 0.95 3.875 1.125L4.075 0.925ZM4 2.5H3.5V1.5H3V2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3V4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H4C4.13261 4.5 4.25979 4.44732 4.35355 4.35355C4.44732 4.25979 4.5 4.13261 4.5 4V3C4.5 2.86739 4.44732 2.74021 4.35355 2.64645C4.25979 2.55268 4.13261 2.5 4 2.5ZM1.25 3.75H0.75V3.25H1.25V3.75ZM2.125 3.75H1.625V3.25H2.125V3.75ZM3 3.75H2.5V3.25H3V3.75Z"
          fill="#03334E"
        />
      </svg>
    </div>
  );
}

export default LoraNode;

LoraNode.propTypes = {bgColor:propTypes.string}
import "./PolygonCone.css";

const PolygonCone = ({ isActive }) => {
  return (
    <svg
      className={`polygon-cone ${isActive ? "active" : ""}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="
          M0,0
          L90,0
          L100,50
          L90,100
          L0,100
          Z
        "
        className="polygon-path"
      />
    </svg>
  );
};

export default PolygonCone;

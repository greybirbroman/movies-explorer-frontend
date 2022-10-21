import { Link } from "react-router-dom";
import "./SubmitGroup.css";

function SubmitGroup({ submitName, children, linkName, linkDestination }) {
  return (
    <fieldset className="submit-group">
      <button className="submit-group__btn" type="submit">
        {submitName}
      </button>
      <p className="submit-group__text">
        {children}
        <Link to={linkDestination} className="submit-group__link">
          {linkName || ''}
        </Link>
      </p>
    </fieldset>
  );
}

export default SubmitGroup

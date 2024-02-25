import { Link } from "react-router-dom";

const Button = ({ onClick, children, className, link, linkTo }) => {

  if (link) {
    return (
      <Link to={linkTo} className={className}>
        <button onClick={onClick} className={className}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;

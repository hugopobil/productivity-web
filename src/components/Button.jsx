import { Link } from "react-router-dom";

const Button = ({ onClick, children, className, linkTo }) => {

  if (linkTo) {
    return (
      <Link to={linkTo} className={className}>
          {children} 
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

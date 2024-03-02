import { Link } from "react-router-dom";

const Button = ({ onClick, children, className, linkTo, type }) => {

  if (linkTo) {
    return (
      <Link to={linkTo} className={className}>
          {children} 
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
};

export default Button;

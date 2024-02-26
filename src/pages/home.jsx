import TitleBar from '../components/TitleBar';
import './Home.css'
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="home-container">
        <div className="HomeSquare">
          <Button className="RegisterButton" linkTo="/register">Register</Button>
          <Button className="LoginButton" linkTo="/login">Login</Button>
        </div>
    </div>
  );
};

export default Home;
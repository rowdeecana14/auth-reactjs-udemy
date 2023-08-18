import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';

function Home() {
  const context = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={context.logout}>Logout</Button>
    </Card>
  );
};

export default Home;

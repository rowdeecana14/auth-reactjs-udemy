import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const context = useContext(AuthContext);

  return (
    <>
      <MainHeader />
      <main>
        {!context.isLoggedIn && <Login />}
        {context.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;

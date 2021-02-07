import './App.scss';
import Header from './header/header';
import Footer from './footer/footer';
import Content from './content/content';
import Userbar from './userbar/userbar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../actions/user';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
}, [dispatch])
 
  return (
    <div className="App">
      <div className="App-body">
        <Header />
        <Userbar />
        <Content />
        <Footer />
      </div>
    </div>

  );
}

export default App;

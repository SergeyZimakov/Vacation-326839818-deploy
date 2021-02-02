import './App.css';
import Main from './components/Main';
import { Provider } from 'react-redux';
import appStore from '../src/redux/appStore';


function App() {
  return (
    <div className="App">
      <Provider store = {appStore}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;

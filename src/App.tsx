import logo from './logo.svg';
import './App.css';
import { MainRouter } from './router/MainRouter';
import { ThemeManager } from './contexts/ThemeManager';
import { FastApiManager } from './contexts/FastApiManager';
function App() {

  return (
    <div className="App">
      <FastApiManager>
        <ThemeManager>
          <MainRouter />
        </ThemeManager>
      </FastApiManager>
    </div>
  );
}

export default App;
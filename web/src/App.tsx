import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Novel from './pages/Novel';


function App() {
  return (
    <div>
      <nav className='nav'>
        <ul>
          <li><Link to="/">风雨楼</Link></li>
        </ul>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novel/:id" element={<Novel />} />
      </Routes>
    </div>
  );
}

export default App;

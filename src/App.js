
import './App.css';
import {useState} from "react";
import DuctMain from "./DuctMain";
import PipeMain from "./PipeMain";
import Default from "./Default";

function App() {
  const [page, setPage] = useState('default');

  const handleDuctClick = () => {
    page === 'duct' ? setPage('default') : setPage('duct');
  };

  const handlePipeClick = () => {
    page === 'pipe' ? setPage('default') : setPage('pipe')
  }

  return (
      <div className="AppStyle">
        <div className={"appButtons"}>
          <button className={"appButton"} onClick={handleDuctClick}>DUCT</button>
          <button className={"appButton"} onClick={handlePipeClick}>PIPE</button>
        </div>
        <div>
          {page === 'duct' && <DuctMain/>}
          {page === 'pipe' && <PipeMain/>}
          {page === 'default' && <Default/>}

        </div>

      </div>
  );
}
export default App;

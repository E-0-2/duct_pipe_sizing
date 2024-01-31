
import './App.css';
import React, {useEffect, useState} from "react";
import DuctInput from "./DuctInput";
import PipeMain from "./PipeMain";
import Default from "./Default";
import DuctResultView from "./DuctResultView";


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
          {page === 'duct' &&
              <div>
                <DuctInput/>
              </div>}
          {page === 'pipe' &&
              <div>
                <PipeMain/>
              </div>}
          {page === 'default' && <Default/>}

        </div>
      </div>
  );
}
export default App;
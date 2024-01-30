
import './App.css';
import React, {useEffect, useState} from "react";
import DuctInput from "./DuctInput";
import PipeMain from "./PipeMain";
import Default from "./Default";
import DuctResultView from "./DuctResultView";
import Test from "./Test";


function App() {
  const [page, setPage] = useState('default');

    const [state, setState] = useState({});

    const InputData = (
        materialRoughness, minSize, enter, speed, ducts, windVolume, enterDisable, speedChecked,
        enterChecked, speedDisable, firstH, firstW, firstP, firstV, firstF, secondH, secondW, secondP,
        secondV, secondF, onSwitch
    ) => {
        const newState = {
            materialRoughness, minSize, enter, speed, ducts, windVolume, enterDisable, speedChecked,
            enterChecked, speedDisable, firstH, firstW, firstP, firstV, firstF, secondH, secondW,
            secondP, secondV, secondF, onSwitch
        };

        setState(newState);
    };
  const handleDuctClick = () => {
    page === 'duct' ? setPage('default') : setPage('duct');
  };

  const handlePipeClick = () => {
    page === 'pipe' ? setPage('default') : setPage('pipe')
  }
    useEffect(() => {
        console.log({state});
    }, [state]);

  return (
      <div className="AppStyle">
        <div className={"appButtons"}>
          <button className={"appButton"} onClick={handleDuctClick}>DUCT</button>
          <button className={"appButton"} onClick={handlePipeClick}>PIPE</button>
        </div>
        <div>
            {page === 'duct' &&
                <div>
                <DuctInput InputData={InputData}/>
                <DuctResultView State={state}/>
                </div>}
            {page === 'pipe' &&
                <div>
                <PipeMain/>
                </div>}
          {page === 'default' && <Default/>}

        </div>
          <Test/>
      </div>
  );
}
export default App;

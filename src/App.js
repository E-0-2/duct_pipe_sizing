import './App.css';
import React, {useCallback, useEffect, useReducer, useState} from "react";
import DuctInput from "./DuctInput";
import PipeMain from "./PipeMain";
import Default from "./Default";
import DuctResultView from "./DuctResultView";
import DuctHead from "./DuctHead";

const reducer = (state, action) => {
    switch (action.type) {
        case 'DuctInitData':
            return action.data;
        default:
            return state;
    }
}

export const ductStateContext = React.createContext();

const ductInitData = () => {
    return {
        materialRoughness: 0.16,
        minSize: 50,
        enter: 1,
        speed: 10,
        ducts: "사각덕트",
        windVolume: '',
        enterChecked: true,
        speedChecked: true,
        enterDisable: false,
        speedDisable: false,
        firstH: 0,
        firstW: 0,
        firstD: 0,
        firstP: 0,
        firstV: 0,
        firstF: 0,
        secondH: 0,
        secondW: 0,
        secondD: 0,
        secondP: 0,
        secondV: 0,
        secondF: 0,
        onSwitch: false,
    };
};

function App() {

    const [page, setPage] = useState('default');
    const [data, dispatch] = useReducer(reducer, ductInitData());


    useEffect(() => {
        const initData = ductInitData();
        console.log("Initial data:", initData);
        dispatch({type: "DuctInitData", data: initData});
    }, []);
    const handleDuctClick = () => {
        setPage(page === 'duct' ? 'default' : 'duct');
    };

    const handlePipeClick = () => {
        setPage(page === 'pipe' ? 'default' : 'pipe');
    }

    const ductInput = useCallback((data) => {
        dispatch({type: "DuctInput", data: ductInput(data)});
    }, [dispatch]);

    return (
        <ductStateContext.Provider value={data}>
            <div className="AppStyle">
                <div className={`appButtons`}>
                    <button className={`appButton`} onClick={handleDuctClick}>DUCT</button>
                    <button className={`appButton`} onClick={handlePipeClick}>PIPE</button>
                </div>
                <div>
                    {page === 'duct' && (
                        <div>
                            <div>
                                <DuctHead/>
                            </div>
                            <DuctInput/>
                            <div>
                                <DuctResultView/>
                            </div>
                        </div>
                    )}
                    {page === 'pipe' && (
                        <div>
                            <PipeMain/>
                        </div>
                    )}
                    {page === 'default' && <Default/>}
                </div>
            </div>
        </ductStateContext.Provider>
    );
}

export default App;


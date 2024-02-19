import './App.css';
import React, {useEffect, useReducer, useState} from "react";
import DuctInput from "./DuctInput";
import PipeMain from "./PipeMain";
import Default from "./Default";
import DuctResultView from "./DuctResultView";

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
        windVolume: "",
        enterChecked: true,
        speedChecked: true,
        enterDisable: false,
        speedDisable: false,
        firstH: "",
        firstW: "",
        firstD: "",
        firstP: "",
        firstV: "",
        firstF: "",
        secondH: "",
        secondW: "",
        secondD: "",
        secondP: "",
        secondV: "",
        secondF: "",
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


    return (
        <ductStateContext.Provider value={data}>
            <div className="AppStyle">
                <div className={`appButtons`}>
                    <button className={`appButton`}
                            onClick={handleDuctClick}>DUCT
                    </button>
                    <button className={`appButton`}
                            onClick={handlePipeClick}>PIPE
                    </button>
                </div>
                <div>
                    {page === 'duct' && (
                        <div>
                            <DuctInput/>
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
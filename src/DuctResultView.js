import React, {useContext, useEffect} from 'react';
import {ductStateContext} from './App';

const DuctResultView = () => {
    // 컨텍스트에서 데이터 받아오기
    const data = useContext(ductStateContext);
    console.log("data: ", data);

    useEffect(() => {

        console.log('data: ', data);
    }, [data]);


    const {windVolume, firstH, firstW, firstP, firstV, firstD, ducts} = data;

    return (
        <div className="DuctResultView">
            <h2>Result</h2>
            <div>
                <div>풍량: {windVolume || "N/A"}</div>
                <div>{ducts === "원형덕트" ? "D(mm): " : "W(mm): "}{ducts === "원형덕트" ? firstD || "N/A" : firstW || "N/A"}</div>
                {!ducts || ducts !== "원형덕트" ?
                    <div>H(mm): {firstH || "N/A"}</div> : null}
                <div>P(pa/m): {firstP || "N/A"}</div>
                <div>V(m/s): {firstV || "N/A"}</div>
            </div>
        </div>
    );
};

export default DuctResultView;
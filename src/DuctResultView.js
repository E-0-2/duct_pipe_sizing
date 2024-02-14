import React, {useEffect, useState} from 'react';
import {duct_cal03} from "./DuctCals";


const DuctResultView = ({data}) => {

    const [state, setState] = useState(data);
    const [result, setResult] = useState([]);


    useEffect(() => {
        console.log(data);
        setState(data);
        setResult(prev => [...prev, data]);
        if (result.length >= 8) {
            setResult([]);
        }
    }, [data]);

    return (
        <div className={"DuctInputListClass"}>
            <table border={1} className={"info"}>
                <tbody>
                <tr>
                    <th className="info-item">Q(CMH)</th>
                    <th className="info-item">H(mm)</th>
                    <th className="info-item">{`${state.ducts === "원형덕트" ? "D(mm)" : "W(mm)"}`}</th>
                    <th className="info-item">P(Pa/m)</th>
                    <th className="info-item">V(m/s)</th>
                </tr>
                {result.map((item, index) => (
                    <tr key={index}>
                        <td>{item.windVolume}</td>
                        <td>{item.firstH}</td>
                        <td>{item.ducts === "원형덕트" ? item.firstD : item.firstW}</td>
                        <td>{item.firstP}</td>
                        <td>{item.firstF}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(DuctResultView);
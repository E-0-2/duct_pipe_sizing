import React, {useEffect, useState} from 'react';

const DuctResultView = ({data}) => {
    const [state, setState] = useState(data);
    const [result, setResult] = useState([]);
    const [prevWindVolume, setPrevWindVolume] = useState(null);
    const [prevFirstH, setPrevFirstH] = useState(null);

    useEffect(() => {
        setState(data);
    }, [data]);

    useEffect(() => {
        if (prevWindVolume !== null && prevFirstH !== null) {
            setResult(prev => [...prev, state]);
        }
        if (state.windVolume && prevWindVolume === null) {
            setPrevWindVolume(state.windVolume);
        }
        if (state.firstH && prevFirstH === null) {
            setPrevFirstH(state.firstH);
        }
    }, [state]);

    useEffect(() => {
        if (result.length >= 8) {
            setResult([]);
        }
    }, [result]);

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
                        <td>{item.firstV}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(DuctResultView);
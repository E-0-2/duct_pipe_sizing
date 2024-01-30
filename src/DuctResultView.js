import {useEffect, useLayoutEffect, useState} from "react";

const DuctResultView = ({State}) => {
    const windVolume = State.windVolume;
    useLayoutEffect(() => {
        State.windVolume++;
    }, [State]);
    return (
        <div className="DiaryList">
            <h2>Result</h2>
            {
                <div>
                <div>{windVolume}</div>
                <div>{State.firstH}</div>
                <div>{State.firstW}</div>
                <div>{State.firstP}</div>
                <div>{State.firstV}</div>
                </div>
            }
        </div>
)
}
export default DuctResultView;
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {duct_cal03, duct_cal04} from "./DuctCals";
import {ductStateContext} from "./App";
import DuctHead from "./DuctHead";
import DuctResultView from "./DuctResultView";


// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_STATE':
//             return { ...state, onSwitch: false, [action.name]: action.value };
//         case 'CALCULATE':
//             return duct_cal03(state);
//         default:
//             return state;
//     }
// };


const DuctInput = () => {

    const data = useContext(ductStateContext);
    const [state, setState] = useState(data);
    const useRefs = {
        materialRoughness: useRef(),
        minSize: useRef(),
        enter: useRef(),
        speed: useRef(),
        windVolume: useRef(),
        firstH: useRef(),
        secondH: useRef(),
        secondW: useRef(),
    }
    const [view, setView] = useState({
        windVolume: state.windVolume,
        firstH: state.firstH,
        ducts: state.ducts,
        firstW: state.firstW,
        firstD: state.firstD,
        firstP: state.firstP,
        firstV: state.firstV,
    });


    // state 값 변경 메서드
    const handleChange = useCallback((e) => {
        const eTName = e.target.name;
        const eTValue = e.target.value;
        const validInputRegex = /^[.0-9]*$/;
        let validInputRegex_2 = /^[0-9]*$/;
        const defaultState = {...state, onSwitch: false, [eTName]: eTValue};
        const onSwitchStates = {
            onSwitchTrueAndInsertSpace: setState({...state, onSwitch: true, [eTName]: ""}),
            onSwitchTrueAndInsert1: setState({...state, onSwitch: true, [eTName]: 1}),
            onSwitchTrueAndInsert10: setState({...state, onSwitch: true, [eTName]: 10}),
            onSwitchFalseAndInsertSpace: setState({...state, [eTName]: ""}),
            onSwitchFalseAndInsert1: setState({...state, [eTName]: 1}),
        }

        if (eTName === 'materialRoughness') {
            let value = parseFloat(eTValue);
            // 소수점 또는 숫자로 시작하는지 확인하는 정규식

            if (!validInputRegex.test(eTValue) || isNaN(value)) {
                if (e.target.value !== '') {
                    useRefs.materialRoughness.current.focus();
                    setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                    return;
                }
            } else if (value < 0) {
                useRefs.materialRoughness.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value >= 5) {
                useRefs.materialRoughness.current.focus();
                setState(onSwitchStates.onSwitchFalseAndInsertSpace);
                return;
            }
        }


        if (eTName === 'minSize') {
            let value = parseFloat(eTValue);// 숫자로만 구성되어 있는지 확인하는 정규식

            if (!validInputRegex_2.test(eTValue)) {
                useRefs.minSize.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value < 0) {
                useRefs.minSize.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value >= 100) {
                useRefs.minSize.current.focus();
                setState(onSwitchStates.onSwitchFalseAndInsertSpace);
                return;

            }
        }
        if (eTName === 'enter') {            // 완료
            let value = parseFloat(eTValue);
            if (!validInputRegex.test(eTValue) || isNaN(value) && eTValue !== '') {
                useRefs.enter.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsert1);
                return;
            } else if (value < 0) {
                useRefs.enter.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsert1);
                return;
            } else if (value >= 10) {
                useRefs.enter.current.focus();
                setState(onSwitchStates.onSwitchFalseAndInsert1);
                return;
            }
        }
        if (eTName === 'speed') {            // 완료
            let value = parseFloat(eTValue);
            // state 가 false 가 되는 조건도 추가 해야함
            if (!validInputRegex.test(eTValue) || isNaN(value) && eTValue !== '') {
                useRefs.speed.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsert10);
                return;
            } else if (value < 0) {
                useRefs.speed.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsert10);
                return;
            } else if (value > 30) {
                useRefs.speed.current.focus();
                setState(onSwitchStates.onSwitchFalseAndInsert1);
                return;
            }
        }
        if (eTName === 'windVolume') {            // 완료
            let value = parseFloat(eTValue);
            // state 가 false 가 되는 조건도 추가 해야함
            if (!validInputRegex_2.test(eTValue)) {
                useRefs.windVolume.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value < 0) {
                useRefs.windVolume.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value > 999999) {
                useRefs.windVolume.current.focus();
                setState(onSwitchStates.onSwitchFalseAndInsertSpace);
                return;
            }
        }
        if (eTName === 'firstH') {         //완료
            let value = parseFloat(eTValue);
            // state 가 false 가 되는 조건도 추가 해야함
            if (!validInputRegex_2.test(eTValue)) {
                useRefs.firstH.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value < 0) {
                useRefs.firstH.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value > 10000) {
                useRefs.firstH.current.focus();
                setState(onSwitchStates.onSwitchFalseAndInsertSpace);
                return;
            }
        }
        if (eTName === 'secondH') {         //완료
            let value = parseFloat(eTValue);
            // state 가 false 가 되는 조건도 추가 해야함
            if (!validInputRegex_2.test(eTValue)) {
                useRefs.secondH.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value < 0) {
                useRefs.secondH.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value > 10000) {
                useRefs.secondH.current.focus();
                setState(onSwitchStates.onSwitchFalseAndInsertSpace);
                return;
            }
        }

        if (eTName === 'secondW' || eTName === 'secondD') {                                       //완료
            let value = parseFloat(eTValue);
            // state 가 false 가 되는 조건도 추가 해야함ㄹㄹ
            if (!validInputRegex_2.test(eTValue)) {
                useRefs.secondW.current.focus();
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value < 0) {
                useRefs.secondW.current.focus()
                setState(onSwitchStates.onSwitchTrueAndInsertSpace);
                return;
            } else if (value > 10000000) {
                useRefs.secondW.current.focus();
                setState(onSwitchStates.onSwitchFalseAndInsertSpace);
                return;
            }
        }
        if (eTName === 'ducts') {
            switch (eTValue) {
                case "사각덕트":
                case "원형덕트":
                case "오발덕트":
                    setState({...state, [eTName]: eTValue});
                    return;
                default:
                    break;
            }
        }


        if (eTName === 'secondH' || eTName === 'secondD' || eTName === 'secondW') {


            let newState = duct_cal04(defaultState);


            return setState(newState);

        }
        setState(defaultState);
        setView({
            windVolume: state.windVolume,
            firstH: state.firstH,
            ducts: state.ducts,
            firstW: state.firstW,
            firstD: state.firstD,
            firstP: state.firstP,
            firstV: state.firstV,
        });
    }, [state]);

    const handleCheckboxChange = (e) => {
        const name = e.target.name; // Checkbox name
        const checked = e.target.checked; // Checkbox status

        if (name === 'enterChecked') {
            setState(prevState => ({
                ...prevState,
                enterChecked: checked,
                enterDisable: !checked,
                value: !checked ? null : prevState.value
            }));
        } else if (name === 'speedChecked') {
            setState(prevState => ({
                ...prevState,
                speedChecked: checked,
                speedDisable: !checked,
                value: !checked ? null : prevState.value
            }));
        }

    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            let newState = duct_cal03(state);
            setState(newState);
            setView({
                windVolume: newState.windVolume,
                firstH: newState.firstH,
                ducts: newState.ducts,
                firstW: newState.firstW,
                firstD: newState.firstD,
                firstP: newState.firstP,
                firstV: newState.firstV,
            });
        }
    };
    return (
        <div className={"DuctInputClass"} onKeyDown={handleKeyDown}>
            <div>
                <DuctHead/>
            </div>
            <div className={"heading3"}>
                <h3>Duct Selection</h3>
            </div>
            <form className={"form-container"}>
                <div className={"form-field"}>
                    {/*0미만 x 콤마(,) x*/}
                    {/*숫자 기입을 하지 않거나 혹은 숫자 이외 다른 문자를 넣으면 g1은 on*/}
                    <span>재료조도</span>
                    <input ref={useRefs.materialRoughness} className={"DuctInput"} value={state.materialRoughness}
                           onChange={handleChange}
                           name={"materialRoughness"} onKeyDown={handleChange} required/>
                </div>
                <div className="form-field">
                    {/*0미만 x 콤마(,) x 닷(.)*/}
                    <span>최소크기</span>
                    <input className={"DuctInput"} value={state.minSize} onChange={handleChange} name={"minSize"}
                           onKeyDown={handleChange} ref={useRefs.minSize} required/>
                </div>
                <div className="form-field">
                    <p className="no-wrap">
                        <span className={"info"}>
                            철판 덕트 : 0.15 ~ 0.18<br/>
                        플렉시블<br/>
                            덕트 : 0.60 ~ 0.80<br/>
                        벽돌 덕트 : 3.00 ~ 5.00<br/>
                        콘크리트<br/>
                        덕트 : 1.00 ~ 3.00<br/>
                        목재 덕트 : 0.20 ~ 1.00
                        </span>
                    </p>
                </div>
            </form>
            <br/>
            <div className={"checkBoxing"}>
                <div className="checkbox-wrapper">
                    {/*체크 해제 되면 리스트에 나열된 Result 를 모두 삭제*/}
                    <input type={"checkbox"} checked={state.enterChecked} name={'enterChecked'}
                           onChange={handleCheckboxChange}/>
                    {/*10 이상 일 경우 혹은 0 미만일 경우에는 자동으로 1로 변경*/}
                    {/*g1 이 on 일 경우에는 자동으로 1 대입*/}
                    <span> 압력 (Pa / m) </span>
                    <input className={`checkBoxInputenter ${state.enterDisable ? 'enterDisabled' : ''}`}
                           value={state.enter} onChange={handleChange} disabled={state.enterDisable} name={"enter"}
                           onKeyDown={handleChange} ref={useRefs.enter} required/>
                </div>
                <br/>
                <div className="checkbox-wrapper">
                    {/*체크 해제 되면 리스트에 나열된 Result 를 모두 삭제*/}
                    <input type={"checkbox"} checked={state.speedChecked} name={'speedChecked'}
                           onChange={handleCheckboxChange}/>
                    <span>속도 (m / s )</span>
                    {/*30 이상 일 경우 혹은 0 미만일 경우에는 자동으로 1로 변경*/}
                    {/*g1 이 on 일 경우에는 자동으로 10 대입*/}
                    <input className={`checkBoxInputspeed ${state.speedDisable ? 'speedDisabled' : ''}`}
                           value={state.speed} onChange={handleChange} disabled={state.speedDisable} name={"speed"}
                           onKeyDown={handleChange} ref={useRefs.speed} required/>
                    <br/>
                </div>
                <div className={"DuctInputSelectClass"}>
                    <div className={"SelectPart"}>
                        <label>

                            <span className="ductType">덕트종류 </span>
                            <select name={"ducts"} onChange={handleChange} value={state.ducts}>
                                <option value={"사각덕트"}>사각덕트</option>
                                <option value={"원형덕트"}>원형덕트</option>
                                <option value={"오발덕트"}>오발덕트</option>
                            </select>
                        </label>
                        <label className="CMHInput">
                            {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                            {/*999999이상 0 미만이면 "" 빈문자열 */}
                            <span className="airspeed">풍량(CMH) </span>
                            <input name={"windVolume"} value={state.windVolume} onChange={handleChange}
                                   onKeyDown={handleChange} ref={useRefs.windVolume} required/>
                        </label>
                    </div>
                    <div>
                        {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                        {/*10000이상 0 미만이면 "" 빈문자열 */}
                        <span>H(mm)</span>
                        <input name={"firstH"} value={state.ducts === "원형덕트" ? " " : state.firstH}
                               onChange={handleChange} onKeyDown={handleChange}
                               disabled={state.ducts === "원형덕트"} ref={useRefs.firstH} required/>
                        <span>{state.ducts === "원형덕트" ? "D(mm)" : "W(mm)"}</span>
                        <input readOnly value={state.ducts === "원형덕트" ? state.firstD : state.firstW}/>
                        <span>P(Pa/m)</span>
                        <input className={"paInputBox"} readOnly value={state.firstP}/>
                        <span>V(m/s)</span>
                        <input className={"vInputBox"} readOnly value={state.firstV}/>
                        <span>f</span>
                        <input readOnly value={state.firstF}/>
                    </div>

                    <div>
                        {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                        {/*10000이상 0 미만이면 "" 빈문자열    asds */}
                        <span>H(mm)</span>
                        <input name={"secondH"} value={state.ducts === "원형덕트" ? " " : state.secondH}
                               onChange={handleChange}
                               onKeyDown={handleChange}
                               disabled={state.ducts === "원형덕트"} ref={useRefs.secondH} required/>
                        {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                        {/*10000000이상 0 미만이면 "" 빈문자열 */}
                        <span>{state.ducts === "원형덕트" ? "D(mm)" : "W(mm)"}</span>
                        <input name={state.ducts === "원형덕트" ? "secondD" : "secondW"}
                               value={state.ducts === "원형덕트" ? state.secondD : state.secondW} onChange={handleChange}
                               onKeyDown={handleChange} ref={useRefs.secondW} required/>
                        <span>P(Pa/m)</span>
                        <input className={"paInputBox"} readOnly value={state.secondP}/>
                        <span>V(m/s)</span>
                        <input className={"vInputBox"} readOnly value={state.secondV}/>
                        <span>f</span>
                        <input readOnly value={state.secondF}/>
                    </div>
                </div>
            </div>
            <div>
                <DuctResultView data={view}/>
            </div>
        </div>
    )
};

export default React.memo(DuctInput);
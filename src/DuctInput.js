import React, {useCallback, useContext, useEffect, useState} from "react";
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
        const alerts = {
            alertNumAndDot: () => alert('숫자와 소수점(.)만 입력해주세요 -주의- (숫자 다음에 소수점을 입력할 수 있음'),
            alertNum: () => alert('숫자만 입력해주세요'),
        }

        if (eTName === 'materialRoughness') {
            let value = parseFloat(eTValue);
            // 소수점 또는 숫자로 시작하는지 확인하는 정규식

            if (!validInputRegex.test(eTValue) || isNaN(value)) {
                if (e.target.value !== '') {
                    alerts.alertNumAndDot();
                    return onSwitchStates.onSwitchTrueAndInsertSpace
                }
            } else if (value < 0) {
                alert('재료조도의 값을 0 이상으로 작성해주세요');
                return onSwitchStates.onSwitchTrueAndInsertSpace
            } else if (value >= 5) {
                alert('재료조도의 값을 5 미만으로 작성해주세요');
                return onSwitchStates.onSwitchFalseAndInsertSpace
            }
        }


        if (eTName === 'minSize') {
            let value = parseFloat(eTValue);// 숫자로만 구성되어 있는지 확인하는 정규식

            if (!validInputRegex_2.test(eTValue)) {
                alerts.alertNum();
                return onSwitchStates.onSwitchTrueAndInsertSpace;
            } else if (value < 0) {
                alert('최소크기의 값을 0 이상으로 작성해주세요');
                return onSwitchStates.onSwitchTrueAndInsertSpace;
            } else if (value >= 100) {
                alert('최소크기의 값을 100 미만으로 작성해주세요');
                return onSwitchStates.onSwitchFalseAndInsertSpace;
            }
        }
        if (eTName === 'enter') {            // 완료
            let value = parseFloat(eTValue);
            if (!validInputRegex.test(eTValue) || isNaN(value) && eTValue !== '') {
                alerts.alertNumAndDot();
                return onSwitchStates.onSwitchTrueAndInsert1;
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return onSwitchStates.onSwitchTrueAndInsert1;
            } else if (value >= 10) {
                alert('입력 값을 10 미만으로 작성해주세요');
                return onSwitchStates.onSwitchFalseAndInsert1;
            }
        }
        if (eTName === 'speed') {            // 완료
            let value = parseFloat(eTValue);
            // state 가 false 가 되는 조건도 추가 해야함
            if (!validInputRegex.test(eTValue) || isNaN(value) && eTValue !== '') {
                alerts.alertNumAndDot();
                return onSwitchStates.onSwitchTrueAndInsert10;
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return onSwitchStates.onSwitchTrueAndInsert10;
            } else if (value > 30) {
                alert('입력 값을 31 미만으로 작성해주세요');
                return onSwitchStates.onSwitchFalseAndInsert1;
            }
        }
        if (eTName === 'windVolume') {            // 완료
            let value = parseFloat(eTValue);
            // state 가 false 가 되는 조건도 추가 해야함
            if (!validInputRegex_2.test(eTValue)) {
                alerts.alertNum();
                return onSwitchStates.onSwitchTrueAndInsertSpace;
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return onSwitchStates.onSwitchTrueAndInsertSpace;
            } else if (value > 999999) {
                alert('입력 값을 1000000 미만으로 작성해주세요');
                return onSwitchStates.onSwitchFalseAndInsertSpace;
            }
        }
        if (eTName === 'firstH' || eTName === 'secondH') {         //완료
            let value = parseFloat(eTValue);
            // state 가 false 가 되는 조건도 추가 해야함
            if (!validInputRegex_2.test(eTValue)) {
                alerts.alertNum();
                return onSwitchStates.onSwitchTrueAndInsertSpace;
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return onSwitchStates.onSwitchTrueAndInsertSpace;
            } else if (value > 10000) {
                alert('입력 값을  10001 미만으로 작성해주세요');
                return onSwitchStates.onSwitchFalseAndInsertSpace
            }
        }

        if (eTName === 'secondW' || eTName === 'secondD') {                                       //완료
            let value = parseFloat(eTValue);
            // state 가 false 가 되는 조건도 추가 해야함ㄹㄹ
            if (!validInputRegex_2.test(eTValue)) {
                alerts.alertNum();
                return onSwitchStates.onSwitchTrueAndInsertSpace
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return onSwitchStates.onSwitchTrueAndInsertSpace
            } else if (value > 10000000) {
                alert('입력 값을  10000001 미만으로 작성해주세요');
                return onSwitchStates.onSwitchFalseAndInsertSpace
            }
        }
        if (eTName === 'ducts') {
            switch (eTValue) {
                case "사각덕트":
                case "원형덕트":
                case "오발덕트":
                    return setState({...state, [eTName]: eTValue});
                default:
                    break;
            }
        }

        setState(prevState => {
            const newState = {...prevState, ...defaultState};
            duct_cal03(newState);
            return newState;
        });

        if (eTName === 'secondH' || eTName === 'secondD' || eTName === 'secondW') {
            let newState = duct_cal04(defaultState);
            setState(newState);
        }
        // 체크 박스 누르면 input 사용 불가 다시 한번더 누르면 사용 가능.
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

    const onClickButton = () => {
        let newState = duct_cal03(state);
        setState(newState);
    };
    useEffect(() => {
        console.log(state);
    }, [DuctInput]);// state가 변경될 때마다 useEffect가 실행

    return (
        <div className={"DuctInputClass"}>
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
                    <input className={"DuctInput"} value={state.materialRoughness} onChange={handleChange}
                           name={"materialRoughness"} onKeyDown={handleChange}/>
                </div>
                <div className="form-field">
                    {/*0미만 x 콤마(,) x 닷(.)*/}
                    <span>최소크기</span>
                    <input className={"DuctInput"} value={state.minSize} onChange={handleChange} name={"minSize"}
                           onKeyDown={handleChange}/>
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
                           onKeyDown={handleChange}/>
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
                           onKeyDown={handleChange}/>
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
                                   onKeyDown={handleChange}/>
                        </label>
                    </div>
                    <div>
                        {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                        {/*10000이상 0 미만이면 "" 빈문자열 */}
                        <span>H(mm)</span>
                        <input name={"firstH"} value={state.ducts === "원형덕트" ? " " : state.firstH}
                               onChange={handleChange} onKeyDown={handleChange}
                               disabled={state.ducts === "원형덕트"}/>
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
                               disabled={state.ducts === "원형덕트"}/>
                        {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                        {/*10000000이상 0 미만이면 "" 빈문자열 */}
                        <span>{state.ducts === "원형덕트" ? "D(mm)" : "W(mm)"}</span>
                        <input name={state.ducts === "원형덕트" ? "secondD" : "secondW"}
                               value={state.ducts === "원형덕트" ? state.secondD : state.secondW} onChange={handleChange}
                               onKeyDown={handleChange}/>
                        <span>P(Pa/m)</span>
                        <input className={"paInputBox"} readOnly value={state.secondP}/>
                        <span>V(m/s)</span>
                        <input className={"vInputBox"} readOnly value={state.secondV}/>
                        <span>f</span>
                        <input readOnly value={state.secondF}/>
                    </div>
                </div>
                <div>
                    <button onClick={onClickButton}>계산</button>
                </div>
            </div>
            <div>
                <DuctResultView data={state}/>
            </div>
        </div>
    )
};

export default React.memo(DuctInput);
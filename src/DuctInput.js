import {useEffect, useState} from "react";
import DuctHead from "./DuctHead";



const DuctInput = ({InputData}) => {
    const [state, setState] = useState({
        materialRoughness:0.16, // 재료조도     (TextBoxc1)
        minSize:50,             // 최소크기     (TextBoxc12)
        enter:1,                // 압력       (TextBoxc2)
        speed:10,               // 속도       (TextBoxc3)
        ducts : "",             // 덕트종류     (CBc3)
        windVolume : "",         // 풍량       (TextBoxc4)
        enterChecked:true,      // 체크박스 항시 체크  (CBc1)
        speedChecked:true,      // 체크박스 항시 체크  (CBc2)
        enterDisable:false,     // 체크박스 해제 하면 input 비활성화
        speedDisable:false,     // 체크박스 해제 하면 input 비활성화
        firstH : 500,            // 첫번째 H(mm)        (TextBoxc5)
        firstW : "",            // 첫번째 W(mm)        (Labelc6)
        firstP : "",            // 첫번째  P(pa/m)     (Labelc7)
        firstV : "",            // 첫번째  V(m/s)      (Labelc8)
        firstF : "",            // 첫번째  f           (Labelc9)
        secondH : "",           // 두번째 H(mm)        (TextBoxc10)
        secondW  : "",          // 두번째 W(mm)       (TextBoxc11)
        secondP : "",           // 두번째  P(pa/m)     (Labelc12)
        secondV : "",           // 두번째  V(m/s)      (Labelc13)
        secondF : "",           // 두번째  f           (Labelc14)
        onSwitch:false,           // (g1 on/off)
    });
    // state 값 변경 메서드
    const handlesetState = (e) => {
        // state 가 false 가 되는 조건도 추가 해야함
        if (e.target.name === 'materialRoughness') {        // 완료
            let value = parseFloat(e.target.value);
            let invalidValues = ['-', '+', '=', '*', '/'];

// ..
            if (isNaN(value) ||invalidValues.includes(e.target.value) ) {
                if (e.target.value !== '') {

                    alert('숫자 와 소수점(.)만 입력해주세요 -주의- (숫자 다음 소수점을 입력을 할수 있음)');
                    return setState({...state, onSwitch : true , [e.target.name] : ""});
                }
            } else if (value < 0) {
                alert('재료조도의 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch : true , [e.target.name] : ""});
            } else if (value > 5) {
                alert('재료조도의 값을 6 미만으로 작성해주세요');
                return setState({...state, [e.target.name] : ""})
            }
        }
        if (e.target.name === 'minSize'){               // 완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            // Check if the value is not a number and not an empty string
            if(isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setState({...state, onSwitch : true , [e.target.name] : ""});
            }else if(value < 0){
                alert('최소크기의 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch : true , [e.target.name] : ""});
            }else if(value >= 100){
                alert('최소크기의 값을 100 미만으로 작성해주세요');
                return setState({...state, [e.target.name] : ""})
            }

        }
        if (e.target.name === 'enter') {            // 완료
            let value = parseFloat(e.target.value);
            if (isNaN(value)) {
                if (e.target.value !== '') {
                    alert('숫자 와 소수점(.)만 입력해주세요 -주의- (숫자 다음 소수점을 입력을 할수 있음)');
                    return setState({...state, onSwitch : true, [e.target.name] : 1 });
                }
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                setState({...state, [e.target.name]: 1});
                return setState({...state, onSwitch : true, [e.target.name] : 1 });
            } else if (value >= 10) {
                alert('입력 값을 10 미만으로 작성해주세요');
                return setState({...state, [e.target.name] : 1 });
            }
        }
        if (e.target.name === 'speed') {            // 완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if (isNaN(value) && e.target.value !== '') {
                alert('숫자 와 소수점(.)만 입력해주세요 -주의- (숫자 다음 소수점을 입력을 할수 있음)');
                return  setState({...state, onSwitch: true , [e.target.name]: 10});
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true , [e.target.name]: 10});
            } else if (value > 30){
                alert('입력 값을 31 미만으로 작성해주세요');
                return setState({...state, [e.target.name]: 1});
            }
        }
        if (e.target.name === 'windVolume'){            // 완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if(isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setState({...state, onSwitch: true , [e.target.name]: "" });
            } else if(value < 0 ){
                alert('입력 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true , [e.target.name]: "" });
            }else if (value > 999999) {
                alert('입력 값을 1000000 미만으로 작성해주세요');
                setState({...state,[e.target.name] : "" });
                return;
            }
        }
        if (e.target.name === 'firstH' || e.target.name === 'secondH'){         //완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if(isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: "" });
            } else if(value < 0 ){
                alert('입력 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: "" });
            }else if (value > 10000) {
                alert('입력 값을  10001 미만으로 작성해주세요');
                return setState({...state,[e.target.name] : "" });
            }
        }

        if (e.target.name === 'secondW'){                                       //완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if(isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if(value < 0 ){
                alert('입력 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            }else if (value > 10000000) {
                alert('입력 값을  10000001 미만으로 작성해주세요');
                return setState({...state,[e.target.name] : "" });
            }
        }
        if (e.target.name === 'ducts' && e.target.value ==="사각덕트") {
            return setState({...state, [e.target.name] : e.target.value})
        }else if (e.target.name === 'ducts' && e.target.value ==="원형덕트") {
            return setState({...state, [e.target.name]: e.target.value});
        }else if (e.target.name === 'ducts' && e.target.value ==="오발덕트") {
            return setState({...state, [e.target.name]: e.target.value});
        }

        setState({...state, onSwitch:false, [e.target.name] : e.target.value})

    }
    // 체크 박스 누르면 input 사용 불가 다시 한번더 누르면 사용 가능.

    const handleCheckboxChange = (e) => {
        const name = e.target.name; // Checkbox name
        const checked = e.target.checked; // Checkbox status

        if(name === 'enterChecked') {
            setState(prevState => ({
                ...prevState,
                enterChecked: checked,
                enterDisable: !checked,
                value: !checked ? null : prevState.value
            }));
        } else if(name === 'speedChecked') {
            setState(prevState => ({
                ...prevState,
                speedChecked: checked,
                speedDisable: !checked,
                value: !checked ? null : prevState.value
            }));
        }
    }

    const handler = (e) => {
        InputData(state.materialRoughness, state.minSize, state.enter, state.speed, state.ducts, state.windVolume,
            state.enterDisable, state.speedChecked, state.enterChecked, state.speedDisable, state.firstH, state.firstW,
            state.firstP, state.firstV, state.firstF, state.secondH, state.secondW, state.secondP, state.secondV,
            state.secondF, state.onSwitch);
        handlesetState(e);
        handleCheckboxChange(e);


    }
    return(
        <div className={"DuctInputClass"}>
            <DuctHead/>
            <div>
                <h3>Duct Selection</h3>
            </div>
            <form>
                <div >
                    {/*0미만 x 콤마(,) x*/}
                    {/*숫자 기입을 하지 않거나 혹은 숫자 이외 다른 문자를 넣으면 g1은 on*/}
                    <span>재료조도</span>
                    <input className={"DuctInput"} value={state.materialRoughness} onChange={handler}
                           name={"materialRoughness"} onKeyDown={handler}/>
                </div>
                <div className="form-field">
                    {/*0미만 x 콤마(,) x 닷(.)*/}
                    <span>최소크기</span>
                    <input className={"DuctInput"} value={state.minSize} onChange={handler} name={"minSize"}
                           onKeyDown={handler}/>
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
                    <input type={"checkbox"} checked={state.enterChecked} name={'enterChecked'} onChange={handler}/>
                    {/*10 이상 일 경우 혹은 0 미만일 경우에는 자동으로 1로 변경*/}
                    {/*g1 이 on 일 경우에는 자동으로 1 대입*/}
                    <span> 압력 (Pa / m) </span>
                    <input className={`checkBoxInputenter ${state.enterDisable ? 'enterDisabled' : ''}`}
                           value={state.enter} onChange={handler} disabled={state.enterDisable} name={"enter"}
                           onKeyDown={handler}/>
                </div>
                <br/>
                <div className="checkbox-wrapper">
                    {/*체크 해제 되면 리스트에 나열된 Result 를 모두 삭제*/}
                    <input type={"checkbox"} checked={state.speedChecked} name={'speedChecked'} onChange={handler}/>
                    <span>속도 (m / s )</span>
                    {/*30 이상 일 경우 혹은 0 미만일 경우에는 자동으로 1로 변경*/}
                    {/*g1 이 on 일 경우에는 자동으로 10 대입*/}
                    <input className={`checkBoxInputspeed ${state.speedDisable ? 'speedDisabled' : ''}`}
                           value={state.speed} onChange={handler} disabled={state.speedDisable} name={"speed"}
                           onKeyDown={handler}/>
                    <br/>
                </div>
                <label>
                    <span className="ductType">덕트종류 </span>
                    <select name={"ducts"} onChange={handler} value={state.ducts}>
                        <option value={"사각덕트"}>사각덕트</option>
                        <option value={"원형덕트"}>원형덕트</option>
                        <option value={"오발덕트"}>오발덕트</option>
                    </select>
                </label>
                <label className="CMHInput">
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*999999이상 0 미만이면 "" 빈문자열 */}
                    <span className="airspeed">풍량(CMH) </span>
                    <input name={"windVolume"} value={state.windVolume} onChange={handler}
                           onKeyDown={handler}/>
                </label>
                <div>
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*10000이상 0 미만이면 "" 빈문자열 */}
                    <span>H(mm)</span>
                    <input name={"firstH"} value={state.firstH} onChange={handler} onKeyDown={handler}/>
                    <span>W(mm)</span>
                    <input readOnly value={state.firstW}/>
                    <span>P(Pa/m)</span>
                    <input className={"paInputBox"} readOnly value={state.firstP}/>
                    <span>V(m/s)</span>
                    <input className={"vInputBox"} readOnly value={state.firstV}/>
                    <span>f</span>
                    <input readOnly value={state.firstF}/>
                </div>

                <div>
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*10000이상 0 미만이면 "" 빈문자열 */}
                    <span>H(mm)</span>
                    <input name={"secondH"} value={state.secondH} onChange={handler} onKeyDown={handler}/>
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*10000000이상 0 미만이면 "" 빈문자열 */}
                    <span>W(mm)</span>
                    <input name={"secondW"} value={state.secondW} onChange={handler} onKeyDown={handler}/>
                    <span>P(Pa/m)</span>
                    <input className={"paInputBox"} readOnly value={state.secondP}/>
                    <span>V(m/s)</span>
                    <input className={"vInputBox"} readOnly value={state.secondV}/>
                    <span>f</span>
                    <input readOnly value={state.secondF}/>
                </div>
            </div>
        </div>
    )
}
export default DuctInput;
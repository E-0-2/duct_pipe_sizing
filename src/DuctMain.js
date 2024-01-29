import {useEffect, useState} from "react";
import DuctResultView from "./DuctResultView";
import DuctHead from "./DuctHead";

const GoalSeekAI = (r6, u7, ai7, x6) => {
    if (r6 === undefined || r6 === null || u7 === undefined || u7 === null) return "";

    var part1 = (ai7 / 1000) ** 5 * (3.141592 / (4 * r6 / 3600)) ** 2 * 2 / 1.2;
    var part2 = 0.0055 * (1 + (20000 * x6 / ai7 + 1.5 * 3.141592 * ai7 / 1000 * 10 / (4 * r6 / 3600)) ** (1/3));

    var result = u7 * part1 - part2;
    return result;

};

const GoalSeekAG = (r6, u7, ai7) => {
    // Validate input
    if (r6 === undefined || r6 === null || r6 === "" || u7 === undefined || u7 === null || u7 === "") return "";

    var part1 = (ai7 / 1000) ** 5 * (3.141592 / (4 * r6 / 3600)) ** 2 * 2 / 1.2;
    var part2 = 64 * 3.141592 * ai7 / 1000 / (4 * r6 / 3600) * 1.5 * 10 ** -5;

    var result = u7 * part1 - part2;

    return result;
};

const GoalSeekAJ = (r6, u7, ak7, al7, ai7) => {
    // Validate input
    if (r6 === undefined || r6 === null || r6 === "" ||
        u7 === undefined || u7 === null || u7 === "" ||
        ai7 === undefined || ai7 === null || ai7 === "") return "";

    var result = 1.3 * ((ak7 * al7) ** 5 / (ak7 + al7) ** 2) ** (1/8) / ai7;

    return result;
};
const GoalSeekAM = (r6, u7, an7, ao7, ai7)=> {
    // Validate input
    if (r6 === "" || u7 === "") return "";

    let result;
    if(an7 > ao7) {
        result = 1.55 * ((3.141592 / 4 * Math.pow(ao7, 2) + ao7 * (an7 - ao7)) ** 0.625 / (3.141592 * ao7 + 2 * (an7 - ao7)) ** 0.25 / ai7);
    } else {
        result = 1.55 * ((3.141592 / 4 * Math.pow(an7, 2) + an7 * (ao7 - an7)) ** 0.625 / (3.141592 * an7 + 2 * (ao7 - an7)) ** 0.25 / ai7);
    }

    return result;
}

const DuctMain = () => {
    const [data, setData] = useState({
        materialRoughness:0.16, // 재료조도     (TextBoxc1)
        minSize:50,             // 최소크기     (TextBoxc12)
        enter:1,                // 압력       (TextBoxc2)
        speed:10,               // 속도       (TextBoxc3)
        ducts : "",             // 덕트종류     (CBc3)
        windVolume :"",         // 풍량       (TextBoxc4)
        enterChecked:true,      // 체크박스 항시 체크  (CBc1)
        speedChecked:true,      // 체크박스 항시 체크  (CBc2)
        enterDisable:false,     // 체크박스 해제 하면 input 비활성화
        speedDisable:false,     // 체크박스 해제 하면 input 비활성화
        firstH : 500,            // 첫번째 H(mm)    (TextBoxc5)
        firstW : "",
        firstP : "",
        firstV : "",
        firstF : "",
        secondH : "",           // 두번째 H(mm)    (TextBoxc10)
        secondW  : "",           // 첫번째 W(mm)   (TextBoxc11)
        secondP : "",
        secondV : "",
        secondF : "",
        switch:false,           // (g1 on/off)


    });
    const  FirstAndSecondSet = () =>{
        setData({
            ...data,
            firstW: "",
            firstP: "",
            firstV: "",
            firstF: "",
            secondH: "",
            secondW: "",
            secondP: "",
            secondV: "",
            secondF: "",
        });
    }


   //계산 메서드
    const calculate = () =>{
        let a1,b,d,d0,d1,d2,e,f,k,p,p1,v,v1,h,w,q,re,r,r1,t,t1,icont,cwd;
        let u7 = 1.0;
        let v7 = 10.00;
        let w7 = 10;
        let ai7 = 0;
        let ak7 = 0;
        let al7 = 0;
        const WS = {};
        const ductcal = {
            ...data
        };
        const duct = {};

        if((ductcal.enterChecked === false && ductcal.speedChecked=== false) || ductcal.windVolume === "" || ductcal.minSize === ""
            || (ductcal.enterChecked === true && parseInt(ductcal.enter) === 0) || (ductcal.speedChecked === true && parseInt(ductcal.speed) === 0)
            || (!ductcal.ducts === "원형덕트" && parseInt(ductcal.firstH) === 0)
        ) {
           FirstAndSecondSet();
        }
        r1 = 7;
        r  = 0;
        t1 = 0;

        u7 = 0;
        v7 = 0;
        w7 = 0;

        ai7 = 0;
        ak7 = 0;
        al7 = 0;


        let windvolumeValue = ductcal.windVolume;
        let speedValue = ductcal.speed;

        e = ductcal.materialRoughness;
        t = ductcal.minSize;

        d  = 0;
        d0 = 0;
        d1 = 0;
        d2 = 0;

        ai7 = 1;
        al7 = 1;

        let an7 = 1;

        u7 = ductcal.enter;
        v7 = ductcal.speed;
        w7 = ductcal.firstH;

        q = ductcal.windVolume;

        if(ductcal.enterChecked === true){
            GoalSeekAI(2400,u7,383.951907857738,0.16);
            d1 = ai7;
            if(d1 <= 0 ){
                FirstAndSecondSet();
            }
        }
        v = 4 * (q / 3600) / (3.141592 * (d1 / 1000) ^ 2);
        let re2 = v * d1 * 100 / 1.5
        if (re2 >= 4000) {
            f = 0.0055 * (1 + (20000 * e / d1 + 10 ^ 6 / re2) ^ (1 / 3));
        }else {
            GoalSeekAG(2400,u7,383.951907857738);
            d1 = ai7;

            if (d1 <= 0) {
                FirstAndSecondSet();

                v = 4 * (q / 3600) / (3.141592 * (d1 / 1000) ^ 2);
                re2 = v * d1 * 100 / 1.5;
                f = 64 / re2;
            }
        }
        p1 = f / (2 * d1 / 1000) * 1.2 * v * 2;

        if(ductcal.ducts === "사각덕트") {
            ak7 = w7;
            GoalSeekAJ(2400, u7, ak7, al7, ai7);
            w = Math.round(al7);
            v = (q / 3600) / (ak7 / 1000 * w / 1000);
        }else if (ductcal.ducts === "오발덕트") {
                let ao7 = w7;
                h = w7;
                GoalSeekAM(2400, u7, an7, ao7, ai7);
                w = Math.round(an7);
                if (w < h) {
                    w = h;
                }
                v = (q / 3600) / ((3.141592 * (h / 1000) ^ 2 / 4) + (h / 1000) * (w / 1000 - h / 1000))
            }

        if (ductcal.enterChecked === false && ductcal.speedChecked === true) {
            v = v7;
            d2 = (4 * (q / 3600) / (3.141592 * v)) ^ 0.5 * 1000
        }
        d0 = Math.max(d1, d2);

        // Duct _ 재계산


        if (ductcal.ducts === "원형덕트"){
            d = Math.ceil(d0/t) * t + t1;
            v1 = 4 * (q / 3600) / (3.141592 * (d / 1000) ^ 2);
        } else if(ductcal.ducts === "사각덕트"){
            b = w7;
            if (d1 > d2) {
                a1 = Math.ceil(w / t) * t + t1;
            } else {
                v1 = v7;
                a1 = Math.ceil(((q / 3600) / ((b / 1000) * v1) * 1000 / t)) * t;
            }
        }

    }

    // state 값 변경 메서드
    const handleSetData = (e) => {
        // state 가 false 가 되는 조건도 추가 해야함
        if (e.target.name === 'materialRoughness') {        // 완료
            let value = parseFloat(e.target.value);
            if (isNaN(value)) {
                if (e.target.value !== '') {

                    alert('숫자 와 소수점(.)만 입력해주세요 -주의- (숫자 다음 소수점을 입력을 할수 있음)');
                    return setData({...data, switch : true , [e.target.name] : ""});
                }
            } else if (value < 0) {
                alert('재료조도의 값을 0 이상으로 작성해주세요');
                return setData({...data, switch : true , [e.target.name] : ""});
            } else if (value > 5) {
                alert('재료조도의 값을 6 미만으로 작성해주세요');
                return setData({...data, [e.target.name] : ""})
            }
        }
        if (e.target.name === 'minSize'){               // 완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            // Check if the value is not a number and not an empty string
            if(isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setData({...data, switch : true , [e.target.name] : ""});
            }else if(value < 0){
                alert('최소크기의 값을 0 이상으로 작성해주세요');
                return setData({...data, switch : true , [e.target.name] : ""});
            }else if(value >= 100){
                alert('최소크기의 값을 100 미만으로 작성해주세요');
                return setData({...data, [e.target.name] : ""})
            }

        }
        if (e.target.name === 'enter') {            // 완료
            let value = parseFloat(e.target.value);
            if (isNaN(value)) {
                if (e.target.value !== '') {
                    alert('숫자 와 소수점(.)만 입력해주세요 -주의- (숫자 다음 소수점을 입력을 할수 있음)');
                    return setData({...data, switch : true, [e.target.name] : 1 });
                }
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                setData({...data, [e.target.name]: 1});
                return setData({...data, switch : true, [e.target.name] : 1 });
            } else if (value >= 10) {
                alert('입력 값을 10 미만으로 작성해주세요');
                return setData({...data, [e.target.name] : 1 });
            }
        }
        if (e.target.name === 'speed') {            // 완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if (isNaN(value) && e.target.value !== '') {
                alert('숫자 와 소수점(.)만 입력해주세요 -주의- (숫자 다음 소수점을 입력을 할수 있음)');
                return  setData({...data, switch: true , [e.target.name]: 10});
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return setData({...data, switch: true , [e.target.name]: 10});
            } else if (value > 30){
                alert('입력 값을 31 미만으로 작성해주세요');
                return setData({...data, [e.target.name]: 1});
            }
        }
        if (e.target.name === 'windVolume'){            // 완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if(isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setData({...data, switch: true , [e.target.name]: "" });
            } else if(value < 0 ){
                alert('입력 값을 0 이상으로 작성해주세요');
                return setData({...data, switch: true , [e.target.name]: "" });
            }else if (value > 999999) {
                alert('입력 값을 1000000 미만으로 작성해주세요');
                setData({...data,[e.target.name] : "" });
                return;
            }
        }
        if (e.target.name === 'firstH' || e.target.name === 'secondH'){         //완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if(isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setData({...data, switch: true, [e.target.name]: "" });
            } else if(value < 0 ){
                alert('입력 값을 0 이상으로 작성해주세요');
                return setData({...data, switch: true, [e.target.name]: "" });
            }else if (value > 10000) {
                alert('입력 값을  10001 미만으로 작성해주세요');
                return setData({...data,[e.target.name] : "" });
            }
        }

        if (e.target.name === 'secondW'){                                       //완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if(isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setData({...data, switch: true, [e.target.name]: ""});
            } else if(value < 0 ){
                alert('입력 값을 0 이상으로 작성해주세요');
                return setData({...data, switch: true, [e.target.name]: ""});
            }else if (value > 10000000) {
                alert('입력 값을  10000001 미만으로 작성해주세요');
                return setData({...data,[e.target.name] : "" });
            }
        }
            setData({...data, switch: false, [e.target.name] : e.target.value });

    }
    // 체크 박스 누르면 input 사용 불가 다시 한번더 누르면 사용 가능.
    const enterDisable = () => {
        const newChecked = !data.enterChecked;
        if (!newChecked) {
            setData({...data, enterChecked: newChecked, value: null, enterDisable: true});
        } else {
            setData({...data, enterChecked: newChecked, enterDisable: false});
        }
    };
    const speedDisable = () => {
        const newChecked = !data.speedChecked;
        if (!newChecked) {
            setData({...data, speedChecked: newChecked, value: null ,speedDisable: true});
        } else {
            setData({...data, speedChecked: newChecked, speedDisable: false});
        }
    }
    useEffect(() => {
        console.log({...data});
    }, [data]);

    return(
        <div className={"DuctInputClass"}>
            <DuctHead/>
            <div className={"heading3"}>
                <h3>Duct Selection</h3>
            </div>
            <form className="form-container">
                <div className="form-field">
                    {/*0미만 x 콤마(,) x*/}
                    {/*숫자 기입을 하지 않거나 혹은 숫자 이외 다른 문자를 넣으면 g1은 on*/}
                    <span>재료조도</span>
                    {console.log(GoalSeekAJ(2400,data.enter,500,253.78
                    ,383.951907857738))}
                    <input className={"DuctInput"} value={data.materialRoughness} onChange={handleSetData}
                           name={"materialRoughness"} onKeyDown={handleSetData}/>
                </div>
                <div className="form-field">
                    {/*0미만 x 콤마(,) x 닷(.)*/}
                    <span>최소크기</span>
                    <input className={"DuctInput"} value={data.minSize} onChange={handleSetData} name={"minSize"}
                           onKeyDown={handleSetData}/>
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
                    <input type={"checkbox"} checked={data.enterChecked} onChange={enterDisable}/>
                    {/*10 이상 일 경우 혹은 0 미만일 경우에는 자동으로 1로 변경*/}
                    {/*g1 이 on 일 경우에는 자동으로 1 대입*/}
                    <span> 압력 (Pa / m) </span>
                    <input className={`checkBoxInputenter ${data.enterDisable ? 'enterDisabled' : ''}`}
                           value={data.enter} onChange={handleSetData} disabled={data.enterDisable} name={"enter"}
                           onKeyDown={handleSetData}/>
                </div>
                <br/>
                <div className="checkbox-wrapper">
                    {/*체크 해제 되면 리스트에 나열된 Result 를 모두 삭제*/}
                    <input type={"checkbox"} checked={data.speedChecked} onChange={speedDisable}/>
                    <span>속도 (m / s )</span>
                    {/*30 이상 일 경우 혹은 0 미만일 경우에는 자동으로 1로 변경*/}
                    {/*g1 이 on 일 경우에는 자동으로 10 대입*/}
                    <input className={`checkBoxInputspeed ${data.speedDisable ? 'speedDisabled' : ''}`}
                           value={data.speed} onChange={handleSetData} disabled={data.speedDisable} name={"speed"}
                           onKeyDown={handleSetData}/>
                    <br/>
                </div>
                <label>
                    <span className="ductType">덕트종류 </span>
                    <select name={"ducts"} onChange={handleSetData}>
                        <option value={"사각덕트"}>사각덕트</option>
                        <option value={"원형덕트"}>원형덕트</option>
                        <option value={"오발덕트"}>오발덕트</option>
                    </select>
                </label>
                <label className="CMHInput">
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*999999이상 0 미만이면 "" 빈문자열 */}
                    <span className="airspeed">풍량(CMH) </span>
                    <input name={"windVolume"} value={data.windVolume} onChange={handleSetData}
                           onKeyDown={handleSetData}/>
                </label>
                <div>
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*10000이상 0 미만이면 "" 빈문자열 */}
                    <span>H(mm)</span>
                    <input name={"firstH"} value={data.firstH} onChange={handleSetData} onKeyDown={handleSetData}/>
                    <span>W(mm)</span>
                    <input readOnly/>
                    <span>P(Pa/m)</span>
                    <input className={"paInputBox"} readOnly/>
                    <span>V(m/s)</span>
                    <input className={"vInputBox"} readOnly/>
                    <span>f</span>
                    <input readOnly/>
                </div>

                <div>
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*10000이상 0 미만이면 "" 빈문자열 */}
                    <span>H(mm)</span>
                    <input name={"secondH"} value={data.secondH} onChange={handleSetData} onKeyDown={handleSetData}/>
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*10000000이상 0 미만이면 "" 빈문자열 */}
                    <span>W(mm)</span>
                    <input name={"secondW"} value={data.secondW} onChange={handleSetData} onKeyDown={handleSetData}/>
                    <span>P(Pa/m)</span>
                    <input className={"paInputBox"} readOnly/>
                    <span>V(m/s)</span>
                    <input className={"vInputBox"} readOnly/>
                    <span>f</span>
                    <input readOnly/>
                </div>
            </div>
            <DuctResultView/>
        </div>
    )
}
export default DuctMain;
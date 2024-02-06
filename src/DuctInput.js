import {useCallback, useEffect, useState} from "react";
import DuctHead from "./DuctHead";
import DuctResultView from "./DuctResultView";




const DuctInput = () => {
    const [state, setState] = useState({
        materialRoughness:0.16, // 재료조도     (TextBoxc1)
        minSize:50,             // 최소크기     (TextBoxc12)
        enter:1,                // 압력       (TextBoxc2)
        speed:10,               // 속도       (TextBoxc3)
        ducts : "사각덕트",             // 덕트종류     (CBc3)
        windVolume : '',         // 풍량       (TextBoxc4)
        enterChecked:true,      // 체크박스 항시 체크  (CBc1)
        speedChecked:true,      // 체크박스 항시 체크  (CBc2)
        enterDisable:false,     // 체크박스 해제 하면 input 비활성화
        speedDisable:false,     // 체크박스 해제 하면 input 비활성화
        firstH : '',            // 첫번째 H(mm)        (TextBoxc5)
        firstW :' ',            // 첫번째 W(mm)        (Labelc6)
        firstD : '',            // 첫번째  D(mm)     (Labelc7)
        firstP : '',            // 첫번째  P(pa/m)     (Labelc7)
        firstV : '',            // 첫번째  V(m/s)      (Labelc8)
        firstF :'' ,            // 첫번째  f           (Labelc9)
        secondH :'' ,           // 두번째 H(mm)        (TextBoxc10)
        secondW  : '',          // 두번째 W(mm)       (TextBoxc11)
        secondD : '',           // 두번째  D(mm)     (Labelc10)
        secondP : '',           // 두번째  P(pa/m)     (Labelc12)
        secondV :'' ,           // 두번째  V(m/s)      (Labelc13)
        secondF : '',           // 두번째  f           (Labelc14)
        onSwitch:false,           // (g1 on/off)
    });

    const PI = Math.PI

// GoalSeekAI 함수는 주어진 매개 변수 값을 이용해 계산 결과를 디스플레이합니다.

    const err1 = () => {
     return    setState({
            ...state,
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

    const AH7GoalSeekAI7 = (r6, u7, ai7, x6) => {
        if (r6 === "" || u7 === "") {
            return "";
        } else {
            return u7 * Math.pow((ai7 / 1000), 5) * Math.pow((Math.PI / (4 * r6 / 3600)), 2) * 2 / 1.2
                - 0.0055 * (1 + Math.pow((20000 * x6 / ai7 + 1.5 * Math.PI * ai7 / 1000 * 10 / (4 * r6 / 3600)), 1 / 3));
        }
    }

    const  AH7GoalSeekAI7_2 = (r6, u7,ai7,x6) => {

        let precision = 0.00041;  // 원하는 정확도 설정
        let stepSize = 0.01;  // "ai" 값 조정 단계 설정
        let ai = ai7;  // 초기 "ai" 값 설정
        let ah = AH7GoalSeekAI7(r6, u7, ai, x6);  // 초기 "ah" 값 계산

        // "ah" 값이 목표치인 0에 가까워지는 동안 "ai" 값 조정
        while (Math.abs(ah) > precision) {
            ai += stepSize; // "ai" 값 조정
            ah = AH7GoalSeekAI7(r6, u7, ai, x6);  // 새로운 "ah" 값 계산
        }

        // 최적화된 "ai" 값 반환
        return ai;
    }
    const AG7GoalSeekAI7 = (r6, u7, ai7) => {
        if (r6 === "" || u7 === "") {
            return "";
        } else {
            return u7 * Math.pow((ai7 / 1000), 5) * Math.pow((Math.PI / (4 * r6 / 3600)), 2) * 2 / 1.2 - 64 * Math.PI * ai7 / 1000 / (4 * r6 / 3600) * 1.5 * Math.pow(10, -5);
        }
    }

    const AG7GoalSeekAI7_2 = (r6, u7, ai7) => {
        let precision = 0.00041;  // 원하는 정확도 설정
        let stepSize = 0.01;  // "ai" 값 조정 단계 설정
        let ai = ai7;  // 초기 "ai" 값 설정
        let ag = AG7GoalSeekAI7(r6, u7, ai);  // 초기 "ag" 값 계산

        while (Math.abs(ag) > precision) { // "ag" 값이 0에 가까워지는 동안 "ai" 값 조정
            ai += stepSize; // "ai" 값 조정
            ag = AG7GoalSeekAI7(r6, u7, ai);  // 새로운 "ag" 값 계산
        }

        return ai; // 조정된 "ai" 값 반환
    }
    const AJ7GoalSeekAL7 = (r6, u7, ak7,al7, ai7) => {
        if (r6 === "" || u7 === "") {
            return "";
        } else {
            //  1.3*((AK7*AL7)^5/(AK7+AL7)^2)^(1/8)/(AI7)
            //const ret =1.3 * Math.pow((Math.pow(ak7 * al7, 5) / Math.pow(ak7 + al7, 2)), (1 / 8) / ai7);
            let result = 1.3 * Math.pow((ak7 * al7), 5) / Math.pow((ak7 + al7), 2);
            result = Math.pow(result, 1/8) / ai7;
            return  result;

        }
    }

    const AJ7GoalSeekAL7_2 = (r6, u7,ak7, ai7) => {
       // "al" 값을 조정하는 단계 설정
        // 초기 "al" 값 설정
        let aj = 0;
        // "aj" 값이 324.915272797088에 가까워지도록 "al" 값 조정
        let min = 50;
        let max = 10000;
        let al = (min + max) / 2;
        while (Math.abs(aj - 1) > 0.0001){
            aj = AJ7GoalSeekAL7(r6, u7, ak7,al, ai7);
            if (aj > 1) {
                max = al;
            }else{
                min = al;
            }
            al = (min + max) / 2;
        }
        // 새로운 "aj" 값 계산

        // 조정된 "al" 값 반환
        return al;
    }


    const AM7GoalSeekAN7 = (r6, u7, an7, ao7, ai7) => {
        if (r6 === "" || u7 === "") {
            return "";
        } else {
            return an7 > ao7
                ? 1.55 * Math.pow((Math.PI/4 * Math.pow(ao7, 2) + ao7 * (an7 - ao7)), 0.625)
                / Math.pow((Math.PI * ao7+ 2 * (an7 - ao7)), 0.25) / ai7
                : 1.55 * Math.pow((Math.PI/4 * Math.pow(an7, 2) + an7 * (ao7 - an7)), 0.625)
                / Math.pow((Math.PI * an7 + 2 * (ao7 - an7)), 0.25) / ai7;
        }
    }

    const AM7GoalSeekAN7_2 = (r6, u7, an7, ao7, ai7) => {
        let precision = 0.001;  // 원하는 정확도 설정
        let stepSize = 0.01;  // "an" 값 조정 단계 설정
        let an = an7;  // 초기 "an" 값 설정
        let am = AM7GoalSeekAN7(r6, u7, an, ao7, ai7);  // 초기 "am" 값 계산

        while (Math.abs(am - 1) > precision) { // "am" 값이 1에 가까워지는 동안 "an" 값 조정
            an += stepSize; // "an" 값 조정
            am = AM7GoalSeekAN7(r6, u7, an, ao7, ai7);  // 새로운 "am" 값 계산
        }

        return an; // 조정된 "an" 값 반환
    }
    const duct_cal03 = (state) => {

        const x6 = 0.16;
        let a1, b, d, d0, d1, d2, e, f, k, p, p1, v, v1, h, w, q, re, r, r1, t, t1, icont, cwd,re2,r6,ah;
        let u7, v7, w7, ai7, ak7, al7, ao7, an7,ah7,am7,aj7;
        const WS = {};
        const duct = {};
        p1 = 0;
        if ((state.enterChecked === false && state.speedChecked === false) || state.windVolume === "" || state.minSize === ""
            || (state.enterChecked && parseInt(state.enter) === 0) || (state.speedChecked && parseInt(state.speed) === 0)
            || (state.ducts !== "원형덕트" && parseInt(state.firstH) === 0)
        ) {
            err1();
            return state;
        }
        r1 = 7;
        r = 0;
        t1 = 0;

        u7 = 0;
        v7 = 0;
        w7 = 0;

        ai7 = 0;
        ak7 = 0;
        al7 = 0;


        e = state.materialRoughness;
        t = state.minSize;

        d = 0;
        d0 = 0;
        d1 = 0;
        d2 = 0;

        ai7 = 1;
        al7 = 1;

        an7 = 1;

        u7 = state.enter;
        v7 = state.speed;
        w7 = state.firstH;

        q = state.windVolume;

        r6 = q;




        if (state.enterChecked === true) {

           ai7 = AH7GoalSeekAI7_2(r6, u7, ai7, x6);
            console.log(ai7);
            d1 = ai7;
            if (d1 <= 0) {
                err1();
                return;
            }

            v = 4 * (q / 3600) / (3.141592 * (d1 / 1000) ** 2);
            re2 = v * d1 * 100 / 1.5;

            if (re2 >= 4000) {
                f = 0.0055 * (1 + Math.pow((20000 * e / d1 + Math.pow(10, 6) / re2), 1 / 3));
            } else {
                ai7 = AG7GoalSeekAI7_2(r6, u7, ai7);
                d1 = ai7;
                console.log("ag" ,ai7);
                if (d1 <= 0) {
                    err1();
                    return state;
                }
                v = 4 * (q / 3600) / (3.141592 * Math.pow((d1 / 1000), 2));
                re2 = v * d1 * 100 / 1.5;
                f = 64 / re2;
            }
            p1 = f / (2 * d1 / 1000) * 1.2 * v ** 2;
            if (state.ducts === "사각덕트") {
                ak7 = w7;
                console.log("폭: ",AJ7GoalSeekAL7_2(500, 1, 200, 211.92));
                console.log(r6, u7, ak7, ai7);
                console.log(AJ7GoalSeekAL7_2(r6, u7, ak7, ai7));
                al7 = AJ7GoalSeekAL7_2(r6, u7, ak7, ai7);

                console.log("al", al7);
                w = Math.ceil(al7);
                v = (q / 3600) / (ak7 / 1000 * w / 1000);
            } else if (state.ducts === "오발덕트") {
                ao7 = w7;
                h = w7;
                an7 = AM7GoalSeekAN7_2(r6, u7, an7, ao7, ai7);
                console.log("an", an7);
                w = Math.ceil(an7);
                if (w < h) {
                    w = h;
                }
                v = (q / 3600) / ((3.141592 * (h / 1000) ** 2 / 4) + (h / 1000) * (w / 1000 - h / 1000));
            }

        }
            if (state.enterChecked === false && state.speedChecked === true) {
                console.log("Debug Point 1");
                v = v7;
                d2 = (4 * (q / 3600) / (3.141592 * v)) ** 0.5 * 1000
                console.log("Debug Point 2");
            }
            d0 = Math.max(d1, d2);



        // Duct _ 재계

        const rcl1 = (state) => {
            let n = 0;

            while (n < 7) {
                if (state.ducts === "원형덕트") {
                    d = Math.ceil(d0 / t) * t + t1;
                    v1 = 4 * (q / 3600) / (3.141592 * (d / 1000) ** 2);

                } else if (state.ducts === "사각덕트") {
                    b = w7;
                    if (d1 > d2) {
                        a1 = Math.ceil(w / t) * t + t1;
                    } else {
                        v1 = v7;
                        a1 = Math.ceil(((q / 3600) / ((b / 1000) * v1) * 1000 / t)) * t;
                    }

                    v1 = (q / 3600) / (a1 / 1000 * b / 1000);
                    d = 1.3 * ((a1 * b) ** 5 / (a1 + b) ** 2) ** 0.125;

                } else if (state.ducts === "오발덕트") {
                    b = w7;
                    if (d1 > d2) {
                        a1 = Math.ceil(w / t) * t + t1;
                        if (a1 < b) {
                            a1 = b;
                        }
                    } else {
                        v1 = v7;
                        a1 = Math.ceil(((((q / 3600) / v1 - (b / 1000) ** 2 / PI) / (b / 1000) + (b / 1000)) * 1000 / t)) * t;
                        if (a1 < b) {
                            a1 = b;
                        }
                    }

                    v1 = (q / 3600) / ((3.141592 * (b / 1000) ** 2 / 4) + b / 1000 * (a1 / 1000 - b / 1000));
                    d = 1.55 * (3.141592 * b ** 2 / 4 + b * (a1 - b)) ** 0.625 / (3.141592 * b + 2 * (a1 - b)) ** 0.25;
                }

                if (d === 0) {
                    err1();
                    return state;
                }

                v = 4 * (q / 3600) / (3.141592 * (d / 1000) ** 2);
                re2 = v * d * 100 / 1.5;
                if (re2 >= 4000) {
                    f = 0.0055 * (1 + Math.pow((20000 * e / d + Math.pow(10, 6) / re2), 1 / 3));
                } else {
                    f = 64 / re2;
                }

                p1 = f / (2 * d / 1000) * 1.2 * Math.pow(v, 2);

                if (state.ducts === "원형덕트") {
                    console.log("원형덕트", d);
                    state.firstD = Math.round(d);
                } else if (state.ducts === "사각덕트" || state.ducts === "오발덕트") {
                    console.log("사각오발", a1);
                    state.firstW = a1;
                }

                console.log("Calculated values: ", {d, a1, v1, p1, f});

                let updatedState = {
                    ...state,
                    firstD: Math.round(d),
                    firstW: a1,
                    firstP: parseFloat(p1).toFixed(3),
                    firstV: parseFloat(v1).toFixed(2),
                    firstF: parseFloat(f).toFixed(5),
                    secondH: state.firstH,
                    secondW: state.firstW,
                    secondP: state.firstP,
                    secondV: state.firstV,
                    secondF: state.firstF,
                };
                setState(updatedState);

                if (state.enterChecked === true && state.speedChecked === true && v1 > v7) {
                    n++;
                } else {
                    break;
                }
            }
            return state;
        }

        return rcl1(state);
    };

    const duct_cal04 = (state) => {
        // 필수 입력 값이 없거나 0인 경우 초기화하고 리턴
        if (
            (state.enterChecked === false && state.speedChecked === false) ||
            state.materialRoughness === "" ||
            state.windVolume === "" ||
            state.secondW === "" ||
            state.minSize === "" ||
            (state.enterChecked === true && parseFloat(state.enter) === 0) ||
            (state.speedChecked === true && parseFloat(state.speed) === 0) ||
            (state.ducts !== "원형덕트" && parseFloat(state.secondH) === 0)
        ) {
            setState({
                ...state,
                secondP: "",
                secondV: "",
                secondF: "",
            });
            return state;
        }

        let a1, b, d, e, f, v, v1, q, p1,re2,re,w,k,p;

        e = parseFloat(state.materialRoughness);
        q = parseFloat(state.windVolume);

        if (state.ducts === "원형덕트") {
            d = parseFloat(state.secondW);
            v1 = 4 * (q / 3600) / (Math.PI * Math.pow(d / 1000, 2));
        } else if (state.ducts === "사각덕트") {
            b = parseFloat(state.secondW);
            a1 = parseFloat(state.secondH);
            v1 = (q / 3600) / (a1 / 1000 * b / 1000);
            d = 1.3 * Math.pow((Math.pow(a1 * b, 5) / Math.pow(a1 + b, 2)), 0.125);
        } else if (state.ducts === "오발덕트") {
            b = parseFloat(state.secondH);
            a1 = parseFloat(state.secondW);
            if (a1 < b) {
                a1 = b;
                setState({
                    ...state,
                    secondW: a1.toString(),
                });
            }
            v1 = (q / 3600) / ((Math.PI * Math.pow(b / 1000, 2) / 4) + (b / 1000) * (a1 / 1000 - b / 1000));
            d = 1.55 * Math.pow((Math.PI * Math.pow(b, 2) / 4 + b * (a1 - b)), 0.625) / Math.pow((Math.PI * b + 2 * (a1 - b)), 0.25);
        }

        if (d === 0) {
            err();
            return state;
        }

        v = 4 * (q / 3600) / (Math.PI * Math.pow(d / 1000, 2));
        re2 = v * d * 100 / 1.5;

        if (re2 >= 4000) {
            f = 0.0055 * (1 + Math.pow((20000 * e / d + Math.pow(10, 6) / re2), 1 / 3));
        } else {
            f = 64 / re2;
        }
            p1 = f / (2 * d / 1000) * 1.2 * Math.pow(v, 2);
        // 결과값을 state에 업데이트
        let updatedState = {
            ...state,
            secondP: p1,
            secondV: v1,
            secondF: f,
        };
        setState(updatedState);

        return updatedState;
    };

    const  err = () => {
       return  setState({
            ...state,
            secondP : "",
            secondV : "",
            secondF : "",
        });

    }
// You need to define or import goalSeekImplementation() and handleError() functions

// ... the rest of the code block ...


    // state 값 변경 메서드
    const handleChange = useCallback((e) => {
        if (e.target.name === 'materialRoughness') {
            let value = parseFloat(e.target.value);
            let validInputRegex = /^[.0-9]*$/;  // 소수점 또는 숫자로 시작하는지 확인하는 정규식

            if (!validInputRegex.test(e.target.value) || isNaN(value)) {
                if (e.target.value !== '') {
                    alert('숫자와 소수점(.)만 입력해주세요 -주의- (숫자 다음에 소수점을 입력할 수 있음)');
                    return setState({...state, onSwitch: true, [e.target.name]: ""});
                }
            } else if (value < 0) {
                alert('재료조도의 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if (value >= 5) {
                alert('재료조도의 값을 5 미만으로 작성해주세요');
                return setState({...state, [e.target.name]: ""});
            }
        }


        if (e.target.name === 'minSize') {               // 완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            // Check if the value is not a number and not an empty string
            if (isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if (value < 0) {
                alert('최소크기의 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if (value >= 100) {
                alert('최소크기의 값을 100 미만으로 작성해주세요');
                return setState({...state, [e.target.name]: ""})
            }

        }
        if (e.target.name === 'enter') {            // 완료
            let value = parseFloat(e.target.value);
            if (isNaN(value)) {
                if (e.target.value !== '') {
                    alert('숫자 와 소수점(.)만 입력해주세요 -주의- (숫자 다음 소수점을 입력을 할수 있음)');
                    return setState({...state, onSwitch: true, [e.target.name]: 1});
                }
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                setState({...state, [e.target.name]: 1});
                return setState({...state, onSwitch: true, [e.target.name]: 1});
            } else if (value >= 10) {
                alert('입력 값을 10 미만으로 작성해주세요');
                return setState({...state, [e.target.name]: 1});
            }
        }
        if (e.target.name === 'speed') {            // 완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if (isNaN(value) && e.target.value !== '') {
                alert('숫자 와 소수점(.)만 입력해주세요 -주의- (숫자 다음 소수점을 입력을 할수 있음)');
                return setState({...state, onSwitch: true, [e.target.name]: 10});
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: 10});
            } else if (value > 30) {
                alert('입력 값을 31 미만으로 작성해주세요');
                return setState({...state, [e.target.name]: 1});
            }
        }
        if (e.target.name === 'windVolume') {            // 완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if (isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if (value > 999999) {
                alert('입력 값을 1000000 미만으로 작성해주세요');
                setState({...state, [e.target.name]: ""});
                return;
            }
        }
        if (e.target.name === 'firstH' || e.target.name === 'secondH') {         //완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if (isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if (value > 10000) {
                alert('입력 값을  10001 미만으로 작성해주세요');
                return setState({...state, [e.target.name]: ""});
            }
        }

        if (e.target.name === 'secondW') {                                       //완료
            let value = parseFloat(e.target.value);
            // state 가 false 가 되는 조건도 추가 해야함
            if (isNaN(value) && e.target.value !== '' || e.target.value.includes('.')) {
                alert('숫자만 입력해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if (value < 0) {
                alert('입력 값을 0 이상으로 작성해주세요');
                return setState({...state, onSwitch: true, [e.target.name]: ""});
            } else if (value > 10000000) {
                alert('입력 값을  10000001 미만으로 작성해주세요');
                return setState({...state, [e.target.name]: ""});
            }
        }
        if (e.target.name === 'ducts' && e.target.value === "사각덕트") {
            return setState({...state, [e.target.name]: e.target.value})
        } else if (e.target.name === 'ducts' && e.target.value === "원형덕트") {
            return setState({...state, [e.target.name]: e.target.value});
        } else if (e.target.name === 'ducts' && e.target.value === "오발덕트") {
            return setState({...state, [e.target.name]: e.target.value});
        }


        setState({...state, onSwitch: false, [e.target.name]: e.target.value})

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


    // const duct_clst = useCallback(() => {
    //     // state를 직접 참조하여 사용하도록 변경
    //
    //     const {
    //         materialRoughness,
    //         minSize,
    //         enterChecked,
    //         speedChecked,
    //         enter,
    //         speed,
    //         ducts,
    //         windVolume,
    //         firstH,
    //         firstW,
    //         firstP,
    //         firstV,
    //         firstF,
    //         secondH,
    //         secondW,
    //         secondP,
    //         secondV,
    //         secondF,
    //     } = state;
    //
    //     if (
    //         parseFloat(firstW) + parseFloat(firstP) + parseFloat(firstV) + parseFloat(firstF) !== 0
    //     ) {
    //         // e.target.name에 값을 할당하는 부분이 이해하기 어려워 수정 필요
    //         // 여기서 e는 어디서 왔는지, e.target은 무엇인지, name 속성을 가진 곳은 어디인지 명확하지 않습니다.
    //         // 필요에 따라 수정이 필요합니다.
    //     }
    // }, [state]);



    const handleButtonClick = () => {
        // 시작 시 state는 반드시 설정되어야 합니다. 여기서 state는 현재 세트 설정값이어야 합니다.
        let currentState = {...state};

        // duct_cal03 함수를 호출하고 그 결과를 newState1에 저장
        // 여기서는 함수의 반환 값을 적절히 처리했다고 가정합니다.
        let newState1 = duct_cal03(currentState);

        // 만약 duct_cal03가 정의되지 않은 값을 반환할 경우, duct_cal04 함수를 호출하는데 문제가 발생합니다.
        if (newState1) {
            // newState1이 정의되어 있으면, 이 값을 사용해 duct_cal04 함수를 호출합니다.
            let newState2 = duct_cal04(newState1);

            if (newState2) {
                // 새 state를 설정
                setState(newState2);
            } else {
                console.error('Error: duct_cal03 returned an undefined or null state.');
            }
        } else {
            console.error('Error: duct_cal04 returned an undefined or null state.');
        }
    };
    useEffect(() => {
        console.log(state);
    }, [state]); // state가 변경될 때마다 useEffect가 실행

    return(
        <div className={"DuctInputClass"}>
            <DuctHead/>
            <div>
                <h3>Duct Selection</h3>
            </div>
            <form>
                <div>
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
                <div>
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*10000이상 0 미만이면 "" 빈문자열 */}
                    <span>H(mm)</span>
                    <input name={"firstH"} value={state.firstH} onChange={handleChange} onKeyDown={handleChange} disabled={ state.ducts === "원형덕트"} />
                    <span>{state.ducts === "원형덕트" ? "D(mm)" : "W(mm)"}</span>
                    <input readOnly value={state.ducts === "원형덕트" ? state.firstD  : state.firstW} />
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
                    <input name={"secondH"} value={state.secondH} onChange={handleChange} onKeyDown={handleChange} disabled={ state.ducts === "원형덕트"}/>
                    {/*g1 이 on 일 경우에는 자동으로  "" 빈문자열 대입*/}
                    {/*10000000이상 0 미만이면 "" 빈문자열 */}
                    <span>{state.ducts === "원형덕트" ? "D(mm)" : "W(mm)"}</span>
                    <input name={state.ducts === "원형덕트" ? "secondD" : "secondW"} value={state.ducts === "원형덕트" ? state.secondD : state.secondW} onChange={handleChange} onKeyDown={handleChange}/>
                    <span>P(Pa/m)</span>
                    <input className={"paInputBox"} readOnly value={state.secondP}/>
                    <span>V(m/s)</span>
                    <input className={"vInputBox"} readOnly value={state.secondV}/>
                    <span>f</span>
                    <input readOnly value={state.secondF}/>
                </div>
            </div>
            <div>
                <div> {JSON.stringify(state)} </div>
            </div>
            <div>
                <button onClick={handleButtonClick}>Calculate</button>
            </div>
            <DuctResultView State={state}/>
        </div>
    )
}

export default DuctInput;




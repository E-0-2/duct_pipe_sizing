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
        firstH : "",            // 첫번째 H(mm)        (TextBoxc5)
        firstW : "",            // 첫번째 W(mm)        (Labelc6)
        firstD : "",            // 첫번째  D(mm)     (Labelc7)
        firstP : "",            // 첫번째  P(pa/m)     (Labelc7)
        firstV : "",            // 첫번째  V(m/s)      (Labelc8)
        firstF : "",           // 첫번째  f           (Labelc9)
        secondH : "",           // 두번째 H(mm)        (TextBoxc10)
        secondW : "",          // 두번째 W(mm)       (TextBoxc11)
        secondD : "",           // 두번째  D(mm)     (Labelc10)
        secondP : "",           // 두번째  P(pa/m)     (Labelc12)
        secondV : "",           // 두번째  V(m/s)      (Labelc13)
        secondF : "",           // 두번째  f           (Labelc14)
        onSwitch:false,           // (g1 on/off)
    });


// GoalSeekAI 함수는 주어진 매개 변수 값을 이용해 계산 결과를 디스플레이합니다.
    const GoalSeekAI = (r6, u7, ai7, x6) => {
        if (r6 === "" || u7 === "") {
            return "";
        } else {
            return u7 * Math.pow((ai7 / 1000), 5) * Math.pow((Math.PI / (4 * r6 / 3600)), 2) * 2 / 1.2 - 0.0055 *
                Math.pow(1 + ((20000 * x6 / ai7 + 1.5 * Math.PI * ai7 / 1000 * 10 / (4 * r6 / 3600))), (1/3));
        }
    };

    const GoalSeekAG = (r6, u7, ai7) => {
        if (r6 === "" || u7 === "") {
            return "";
        } else {
            return u7 * Math.pow((ai7 / 1000), 5) * Math.pow((Math.PI / (4 * r6 / 3600)), 2) * 2 / 1.2 - 64 * Math.PI * ai7 / 1000 / (4 * r6 / 3600) * 1.5 * Math.pow(10, -5);
        }
    };


// GoalSeekAJ 함수는 주어진 매개 변수 값을 이용해 계산 결과를 디스플레이합니다.
    const GoalSeekAJ = (r6, u7, ak7, al7, ai7) => {
        if (r6 === "" || u7 === "") {
            return "";
        } else {
            return 1.3 * Math.pow((ak7 * al7), 5) / Math.pow((ak7 + al7), 2) ** (1/8) / ai7;
        }
    };


// GoalSeekAM 함수는 너비와 높이를 비교한 후 나머지 변수를 이용해 계산 결과를 화면에 출력합니다.
    const GoalSeekAM = (r6, u7, an7, ao7, ai7) => {
        if (r6 === "" || u7 === "") {
            return "";
        } else if (an7 > ao7) {
            return 1.55 * Math.pow((Math.PI / 4 * Math.pow(ao7, 2) + ao7 * (an7 - ao7)), 0.625) / Math.pow((Math.PI * ao7 + 2 * (an7 - ao7)), 0.25) / ai7;
        } else {
            return 1.55 * Math.pow((Math.PI / 4 * Math.pow(an7, 2) + an7 * (ao7 - an7)), 0.625) / Math.pow((Math.PI * an7 + 2 * (ao7 - an7)), 0.25) / ai7;
        }
    }

    const err1 = () => {
        setState({
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

        const newStateAfterCal03 = () => duct_cal03(state);

        // duct_cal03 함수에서 반환된 newStateAfterCal03를 이용하여 duct_cal04 함수 호출
        duct_cal04(newStateAfterCal03);

        setState({...state, onSwitch: false, [e.target.name]: e.target.value})

        // 체크 박스 누르면 input 사용 불가 다시 한번더 누르면 사용 가능.
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

    const duct_cal03 = (state) => {

        const x6 = 0.16;
        let a1, b, d, d0, d1, d2, e, f, k, p, p1, v, v1, h, w, q, re, r, r1, t, t1, icont, cwd,r6,re2;
        let u7, v7, w7, ai7, ak7, al7;
        const WS = {};
        const duct = {};
        p1 = 0;
        if ((state.enterChecked === false && state.speedChecked === false) || state.windVolume === "" || state.minSize === ""
            || (state.enterChecked && parseInt(state.enter) === 0) || (state.speedChecked && parseInt(state.speed) === 0)
            || (state.ducts !== "원형덕트" && parseInt(state.firstH) === 0)
        ) {
            err1();
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

        let an7 = 1;

        u7 = state.enter;
        v7 = state.speed;
        w7 = state.firstH;

        q = state.windVolume;

        r6 = state.windVolume;

        if (state.enterChecked === true) {

            GoalSeekAI(r6, u7, ai7, x6);



            d1 = ai7;
            if (d1<= 0) {
                return err1();
            }
        }
// GoalSeekAI 이후 d1 값을 업데이트
        // GoalSeekAI 이후 d1 값을 업데이트
        v = 4 * (q / 3600) / (3.141592 * (d1 / 1000) ** 2);
         re2 = v * d1 * 100 / 1.5;

        if (re2 >= 4000) {
            f = 0.0055 * (1 + (20000 * e / d1 + 10 ** 6 / re2) ** (1 / 3));
        } else {

            GoalSeekAG(r6, u7, ai7);

            // GoalSeekAG 이후 d1 값을 업데이트
            d1 = ai7;
            if (d1 <= 0) {
                return err1();
            }
            v = 4 * (q / 3600) / (3.141592 * Math.pow((d1 / 1000), 2));
            let re2 = v * d1 * 100 / 1.5;
            f = 64 / re2;
        }
        p1 = f / (2 * d1 / 1000) * 1.2 * v * 2;

        if (state.ducts === "사각덕트") {
            ak7 = w7;

            GoalSeekAJ(r6, u7, ak7, al7, ai7)


            w = Math.round(al7);
            v = (q / 3600) / (ak7 / 1000 * w / 1000);
        } else if (state.ducts === "오발덕트") {
            let ao7 = w7;
            h = w7;

            GoalSeekAM(r6, u7, an7, ao7, ai7)


            w = Math.round(an7);
            if (w < h) {
                w = h;
            }
            v = (q / 3600) / ((3.141592 * (h / 1000) ^ 2 / 4) + (h / 1000) * (w / 1000 - h / 1000))
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
            let t1 = 0; // You must initialize t1
            let maxIterations = 1000;
            let iteration = 0; // Counter variable for the loop
            while(iteration < maxIterations) {
                if (state.ducts === "원형덕트") {
                    d = Math.ceil(d0 / t) * t + t1;
                    v1 = 4 * (q / 3600) / (Math.PI * Math.pow((d / 1000), 2));
                } else if (state.ducts === "사각덕트") {
                    b = parseInt(w7);

                    if (d1 > d2) {
                        a1 = Math.ceil(w / t) * t + t1;
                    } else {
                        a1 = Math.ceil((q / 3600) / ((b / 1000) * v7) * 1000 / t) * t;
                    }

                    v1 = (q / 3600) / ((a1 / 1000) * (b / 1000));
                    d = 1.3 * Math.pow( Math.pow((a1 * b), 5) / Math.pow((a1 + b), 2), 0.125);
                } else if(state.ducts === "오발덕트") {
                    b = parseInt(w7);
                    if (d1 > d2) {
                        a1 = Math.ceil(w / t) * t + t1;
                        if (a1 < b) {
                            a1 = b;
                        }
                    } else {
                        a1 = Math.ceil((((q / 3600) / v7 - Math.pow((b / 1000), 2) / Math.PI) / (b / 1000) + (b / 1000)) * 1000 / t) * t;
                        if (a1 < b) {
                            a1 = b;
                        }
                    }
                    v1 = (q / 3600) / ((Math.PI * Math.pow((b / 1000), 2) / 4) + (b / 1000) * (a1 / 1000 - b / 1000));
                    if(a1 >= b) {
                        d = calculateD(a1, b);
                    }

                }
                if (state.enterChecked === true && state.speedChecked === true) {
                    if (v1 > parseInt(v7)) {
                        t1 = t1 + t;
                        iteration++;
                        continue;
                    }
                }
                iteration++;
                if (d === 0) {
                    err1();
                    break;
                }



                v = 4 * (q / 3600) / (Math.PI * Math.pow((d / 1000), 2));
                re2 = v * d * 100 / 1.5;

                if (re2 >= 4000) {
                    f = 0.0055 * (1 + Math.pow((20000 * e / d + Math.pow(10, 6) / re2), (1 / 3)));
                } else {
                    f = 64 / re2;
                }
                p1 = f / (2 * d / 1000) * 1.2 * Math.pow(v, 2);


                if (state.ducts === "원형덕트") {
                    console.log("원형덕트", d);
                    state.firstW = Math.round(d);
                } else if (state.ducts === "사각덕트" || state.ducts === "오발덕트") {
                    console.log("사각오발", a1);
                    state.firstW = a1;
                }


                console.log("Calculated values: ", {d, a1, v1, p1, f});

                setState((prevState) => {
                    const updatedState = {
                        ...prevState,
                        firstW: state.ducts === "원형덕트" ? Math.round(d) : a1,
                        firstP: parseFloat(p1).toFixed(3),  // 소수점 이하 3자리까지 표시
                        firstV: parseFloat(v1).toFixed(2),  // 소수점 이하 3자리까지 표시
                        firstF: parseFloat(f).toFixed(5),   // 소수점 이하 3자리까지 표시
                        secondH: prevState.firstH,
                        secondW: prevState.firstW,
                        secondP: Number(prevState.firstP),
                        secondV: Number(prevState.firstV),
                        secondF: Number(prevState.firstF)
                        // 추가로 업데이트할 내용이 있다면 여기에 작성
                    };


                    // Access the updated state values here, if needed


                    return updatedState;
                });


                return rcl1(state);



            }
            rcl1(state);
    }
    }
    function calculateD(a1, b) {
        return 1.55 * Math.pow((Math.PI * Math.pow(b, 2) / 4 + b * (a1 - b)), 0.625) / Math.pow((Math.PI * b + 2 * (a1 - b)), 0.25);
    }

        const duct_cal04 = (state) => {
            // 필수 입력 값이 없거나 0인 경우 초기화하고 리턴
            state = {...state};
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
                return;
            }

            let a1, b, d, e, f, v, v1, q, p1;

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
                a1 = (q / 3600) / ((Math.PI * Math.pow(b / 1000, 2) / 4) + (b / 1000) * (a1 / 1000 - b / 1000));
                d = 1.55 * Math.pow((Math.PI * Math.pow(b, 2) / 4 + b * (a1 - b)), 0.625) / Math.pow((Math.PI * b + 2 * (a1 - b)), 0.25);
            }

            if (d === 0) {
                err();
                return;
            }

            v = 4 * (q / 3600) / (Math.PI * Math.pow(d / 1000, 2));
            let Re2 = v * d * 100 / 1.5;

            if (Re2 >= 4000) {
                p1 = 0.0055 * (1 + Math.pow((20000 * e / d + Math.pow(10, 6) / Re2), 1 / 3));
            } else {
                p1 = 64 / Re2;
            }

            // 결과값을 state에 업데이트
            setState({
                ...state,
                secondP: p1,// 소수점 3자리까지
                secondV: v1,// 소수점 2자리까지
                secondF: f, // 소수점 5자리까지
            });
        };

        const  err = () => {
            setState({
                ...state,
                secondP : "",
                secondV : "",
                secondF : "",
            });

        }
    const duct_clst = useCallback(() => {
        // state를 직접 참조하여 사용하도록 변경

        const {
            materialRoughness,
            minSize,
            enterChecked,
            speedChecked,
            enter,
            speed,
            ducts,
            windVolume,
            firstH,
            firstW,
            firstP,
            firstV,
            firstF,
            secondH,
            secondW,
            secondP,
            secondV,
            secondF,
        } = state;

        if (
            parseFloat(firstW) + parseFloat(firstP) + parseFloat(firstV) + parseFloat(firstF) !== 0
        ) {
            // e.target.name에 값을 할당하는 부분이 이해하기 어려워 수정 필요
            // 여기서 e는 어디서 왔는지, e.target은 무엇인지, name 속성을 가진 곳은 어디인지 명확하지 않습니다.
            // 필요에 따라 수정이 필요합니다.
        }
    }, [state]);



    // ECMAScript 2015(ES6) syntax

    const handleButtonClick = () => {
        // 입력 값을 연산하고 그 결과를 얻기 위해 calculate 함수를 호출
        const ducts = duct_cal03(state);

        duct_cal04(ducts);


        // newState를 이용하여 다른 동작 수행 가능 (예: 결과 출력, 저장 등)

        // 결과를 어떻게 사용할 것인지 여기서 // 결과를 이용한 다른 동작 수행 가능

        // 새로운 상태를 반환하여 컴포넌트 상태를 갱신

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
                    <input readOnly value={state.ducts === "원형덕트" ? state.secondD : state.secondW} />
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
                <button onClick={handleButtonClick}>Calculate</button>
            </div>
            <DuctResultView State={state}/>
        </div>
    )
}

export default DuctInput;
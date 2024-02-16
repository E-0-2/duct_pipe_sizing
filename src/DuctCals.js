import {err, err1} from "./Error";
import {AH7GoalSeekAI7_2, AG7GoalSeekAI7_2, AJ7GoalSeekAL7_2, AM7GoalSeekAN7_2} from "./GoalSeek";

export const duct_cal03 = (state) => {
    const x6 = 0.16;
    let a1, b, d, d0, d1, d2, e, f, k, p, p1, v, v1, h, w, q, re, r, r1, t, t1, icont, cwd, re2, r6, ah;
    let u7, v7, w7, ai7, ak7, al7, ao7, an7, ah7, am7, aj7;
    const WS = {};
    const duct = {};

    if (!state.hasOwnProperty('enterChecked') || !state.hasOwnProperty('speedChecked') ||
        !state.hasOwnProperty('windVolume') || !state.hasOwnProperty('minSize') ||
        !state.hasOwnProperty('enter') || !state.hasOwnProperty('speed') ||
        !state.hasOwnProperty('ducts') || !state.hasOwnProperty('firstH')) {
        console.error('Missing necessary properties in the state object');
        return;
    }
    if ((state.enterChecked === false && state.speedChecked === false) || state.windVolume === "" || state.minSize === ""
        || (state.enterChecked && parseInt(state.enter) === 0) || (state.speedChecked && parseInt(state.speed) === 0)
        || (state.ducts !== "원형덕트" && parseInt(state.firstH) === 0)
    ) {
        err1(state);
    }
    p1 = 0;
    r1 = 7;
    r = 0;
    t1 = 0;
    u7 = 0;
    v7 = 0;
    w7 = 0;
    e = state.materialRoughness;
    t = state.minSize;
    d = 0;
    d0 = 0;
    d1 = 0;
    d2 = 0;
    ai7 = 1;
    al7 = 0;
    ak7 = 1;
    an7 = 0;
    u7 = Number(state.enter);
    v7 = Number(state.speed);
    w7 = Number(state.firstH);
    q = Number(state.windVolume);
    r6 = q;
    if (state.enterChecked === true) {

        // eslint-disable-next-line no-undef
        ai7 = AH7GoalSeekAI7_2(r6, u7, ai7, x6);
        d1 = ai7;
        if (d1 <= 0) {
            err1(state);
        }

        v = 4 * (q / 3600) / (3.141592 * (d1 / 1000) ** 2);
        re2 = v * d1 * 100 / 1.5;

        if (re2 >= 4000) {
            f = 0.0055 * (1 + Math.pow((20000 * e / d1 + Math.pow(10, 6) / re2), 1 / 3));
        } else {
            // eslint-disable-next-line no-undef
            ai7 = AG7GoalSeekAI7_2(r6, u7, ai7);
            d1 = ai7;

            if (d1 <= 0) {
                // eslint-disable-next-line no-undef
                err1(state);

            }
            v = 4 * (q / 3600) / (3.141592 * Math.pow((d1 / 1000), 2));
            re2 = v * d1 * 100 / 1.5;
            f = 64 / re2;
        }
        p1 = f / (2 * d1 / 1000) * 1.2 * v ** 2;
        if (state.ducts === "사각덕트") {
            ak7 = w7;

            // eslint-disable-next-line no-undef
            al7 = AJ7GoalSeekAL7_2(r6, u7, ak7, al7, ai7);
            w = Math.ceil(al7);
            v = (q / 3600) / (ak7 / 1000 * w / 1000);
        } else if (state.ducts === "오발덕트") {
            ao7 = w7;
            h = w7;// eslint-disable-next-line no-undef
            an7 = AM7GoalSeekAN7_2(r6, u7, an7, ao7, ai7);
            w = Math.ceil(an7);
            if (w < h) {
                w = h;
            }
            v = (q / 3600) / ((3.141592 * (h / 1000) ** 2 / 4) + (h / 1000) * (w / 1000 - h / 1000));
        }

    }
    if (state.enterChecked === false && state.speedChecked === true) {
        v = v7;
        d2 = (4 * (q / 3600) / (3.141592 * v)) ** 0.5 * 1000
    }
    d0 = Math.max(d1, d2);
    // Duct _ 재계산
    const rcl1 = (state) => {
        for (let n = 0; n < 1; n++) {
            if (state.ducts === "원형덕트") {
                d = Math.ceil(d0 / t) * t + t1;
                v1 = 4 * (q / 3600) / (Math.PI * Math.pow((d / 1000), 2));

            } else if (state.ducts === "사각덕트") {
                b = w7;
                if (d1 > d2) {
                    a1 = Math.ceil(w / t) * t + t1;
                } else {
                    v1 = v7;
                    a1 = Math.ceil(((q / 3600) / (b / 1000 * v1) * 1000 / t)) * t;
                }

                v1 = (q / 3600) / (a1 / 1000 * b / 1000);
                d = 1.3 * Math.pow((Math.pow(a1 * b, 5) / Math.pow(a1 + b, 2)), 0.125);
            } else if (state.ducts === "오발덕트") {
                b = w7;
                if (d1 > d2) {
                    a1 = Math.ceil(w / t) * t + t1;
                    if (a1 < b) {
                        a1 = b;
                    }
                } else {
                    v1 = v7;
                    a1 = Math.ceil(((((q / 3600) / v1 - Math.pow((b / 1000), 2) / Math.PI) / (b / 1000) + (b / 1000)) * 1000 / t)) * t;
                    if (a1 < b) {
                        a1 = b;
                    }
                }
                v1 = (q / 3600) / ((3.141592 * (b / 1000) ** 2 / 4) + b / 1000 * (a1 / 1000 - b / 1000));
                d = 1.55 * (3.141592 * b ** 2 / 4 + b * (a1 - b)) ** 0.625 / (3.141592 * b + 2 * (a1 - b)) ** 0.25;
            }
            if (d === 0) {
                // eslint-disable-next-line no-undef
                err1(state);
            }
            v = 4 * (q / 3600) / (Math.PI * Math.pow(d / 1000, 2));
            re2 = v * d * 100 / 1.5;
            if (re2 >= 4000) {
                f = 0.0055 * (1 + Math.pow((20000 * e / d + Math.pow(10, 6) / re2), 1 / 3));
            } else {
                f = 64 / re2;
            }
            p1 = f / (2 * d / 1000) * 1.2 * Math.pow(v, 2);
            if (state.ducts === "원형덕트") {
                state.firstD = Math.round(d);
            } else if (state.ducts === "사각덕트" || state.ducts === "오발덕트") {
                state.firstW = a1;
            }
            if (typeof p1 !== 'number' || isNaN(p1) || p1 < 0) {
                p1 = 0;
            }
            if (typeof v1 !== 'number' || isNaN(v1) || v1 < 0) {
                v1 = 0;
            }
            if (typeof f !== 'number' || isNaN(f) || f < 0) {
                f = 0;
            }
            console.log("p1 : ", p1, "v1 : ", v1, "f : ", f);
            let updatedState = {
                ...state,
                firstP: parseFloat(Number(p1).toFixed(3)),
                firstV: parseFloat(Number(v1).toFixed(2)),
                firstF: parseFloat(Number(f).toFixed(5)),
                firstW: a1,
                secondH: state.firstH,
                secondW: state.firstW, // 소수점 아래 2자리에서 반올림 // 소수점 아래 2자리에서 반올림
                secondP: parseFloat(Number(p1).toFixed(3)),
                secondV: parseFloat(Number(v1).toFixed(2)),
                secondF: parseFloat(Number(f).toFixed(5)),
            };
            if (state.ducts === "원형덕트") {
                updatedState = {
                    ...updatedState,
                    firstDD: Math.round(d),
                    secondD: Math.round(d),
                }
            }
            return state ? updatedState : {};
        }

    }
    return rcl1(state);
};
export const duct_cal04 = (state) => {
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
        return ({
            ...state,
            secondP: "",
            secondV: "",
            secondF: "",
        });
    }

    let a1, b, d, e, f, v, v1, q, p1, re2, re, w, k, p;

    e = parseFloat(state.materialRoughness);
    q = parseFloat(state.windVolume);

    if (state.ducts === "원형덕트") {
        d = parseFloat(state.secondD);
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
            return ({
                ...state,
                secondW: a1.toString(),
            });
        }
        v1 = (q / 3600) / ((Math.PI * Math.pow(b / 1000, 2) / 4) + (b / 1000) * (a1 / 1000 - b / 1000));
        d = 1.55 * Math.pow((Math.PI * Math.pow(b, 2) / 4 + b * (a1 - b)), 0.625) / Math.pow((Math.PI * b + 2 * (a1 - b)), 0.25);
    }

    if (d === 0) {
        // eslint-disable-next-line no-undef
        err(state);
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
        secondP: parseFloat(Number(p1).toFixed(3)),
        secondV: parseFloat(Number(v1).toFixed(2)),
        secondF: parseFloat(Number(f).toFixed(5)),
    };

    console.log(state.secondP);
    console.log(state.secondV);
    console.log(state.secondF);

    return updatedState;
};
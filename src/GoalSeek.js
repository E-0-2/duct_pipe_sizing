export const AH7GoalSeekAI7 = (r6, u7, ai7, x6) => {
    if (r6 === "" || u7 === "") {
        return "";
    } else {
        return u7 * Math.pow((ai7 / 1000), 5) * Math.pow((Math.PI / (4 * r6 / 3600)), 2) * 2 / 1.2
            - 0.0055 * (1 + Math.pow((20000 * x6 / ai7 + 1.5 * Math.PI * ai7 / 1000 * 10 / (4 * r6 / 3600)), 1 / 3));
    }
}

// eslint-disable-next-line no-unused-vars
export const AH7GoalSeekAI7_2 = (r6, u7, ai7, x6) => {

    let precision = 0.0004;  // 원하는 정확도 설정
    let stepSize = 1;  // "ai" 값 조정 단계 설정
    let ai = ai7;  // 초기 "ai" 값 설정
    let ah = AH7GoalSeekAI7(r6, u7, ai, x6);  // 초기 "ah" 값 계산
    let i = 0;
    // "ah" 값이 목표치인 0에 가까워지는 동안 "ai" 값 조정
    while (Math.abs(ah) > precision) {
        ai += stepSize; // "ai" 값 조정
        ah = AH7GoalSeekAI7(r6, u7, ai, x6);  // 새로운 "ah" 값 계산
        i++;
        console.log("i", i);
    }

    return ai;
}
export const AG7GoalSeekAI7 = (r6, u7, ai7) => {
    if (r6 === "" || u7 === "") {
        return "";
    } else {
        return u7 * Math.pow((ai7 / 1000), 5) * Math.pow((Math.PI / (4 * r6 / 3600)), 2) * 2 / 1.2 - 64 * Math.PI * ai7 / 1000 / (4 * r6 / 3600) * 1.5 * Math.pow(10, -5);
    }
}

export const AG7GoalSeekAI7_2 = (r6, u7, ai7) => {
    let precision = 0.0004;  // 원하는 정확도 설정
    let stepSize = 0.1;  // "ai" 값 조정 단계 설정
    let ai = ai7;  // 초기 "ai" 값 설정
    let ag = AG7GoalSeekAI7(r6, u7, ai);  // 초기 "ag" 값 계산

    while (Math.abs(ag) > precision) { // "ag" 값이 0에 가까워지는 동안 "ai" 값 조정
        ai += stepSize; // "ai" 값 조정
        ag = AG7GoalSeekAI7(r6, u7, ai);  // 새로운 "ag" 값 계산
    }

    return ai; // 조정된 "ai" 값 반환
}
export const AJ7GoalSeekAL7 = (r6, u7, ak7, al7, ai7) => {
    // Make sure r6 and u7 are numbers
    r6 = parseFloat(r6);
    u7 = parseFloat(u7);

    // Check for a valid number
    if (isNaN(r6) || isNaN(u7)) return 0;

    // Use the same formula as in the VBA code
    const result = 1.3 * Math.pow((Math.pow(ak7 * al7, 5) / Math.pow(ak7 + al7, 2)), 1 / 8);
    return result / ai7;
};

export const AJ7GoalSeekAL7_2 = (r6, u7, ak7, al7, ai7) => {
    let precision = 0.0001;  // 원하는 정확도 설정 수정
    let stepSize = 0.1;  // "al" 값 조정 단계 설정
    let al = al7;  // 초기 "al" 값 설정
    let aj = AJ7GoalSeekAL7(r6, u7, ak7, al, ai7);  // 초기 "aj" 값 계산

    while (Math.abs(aj - 1) > precision) { // "aj" 값이 1에 가까워지는 동안 "al" 값 조정
        al += stepSize; // "al" 값을 조정
        aj = AJ7GoalSeekAL7(r6, u7, ak7, al, ai7);  // 새로운 "aj" 값 계산
    }

    // 조정된 "al" 값 출력;
    return al; // 조정된 "al" 값 반환
}
export const AM7GoalSeekAN7 = (r6, u7, an7, ao7, ai7) => {
    if (r6 === "" || u7 === "") {
        return "";
    } else {
        return an7 > ao7
            ? 1.55 * Math.pow((Math.PI / 4 * Math.pow(ao7, 2) + ao7 * (an7 - ao7)), 0.625)
            / Math.pow((Math.PI * ao7 + 2 * (an7 - ao7)), 0.25) / ai7
            : 1.55 * Math.pow((Math.PI / 4 * Math.pow(an7, 2) + an7 * (ao7 - an7)), 0.625)
            / Math.pow((Math.PI * an7 + 2 * (ao7 - an7)), 0.25) / ai7;
    }
}

// eslint-disable-next-line no-unused-vars
export const AM7GoalSeekAN7_2 = (r6, u7, an7, ao7, ai7) => {
    let precision = 0.0001;  // 원하는 정확도 설정
    let stepSize = 0.1;  // "an" 값 조정 단계 설정
    let an = an7;  // 초기 "an" 값 설정
    let am = AM7GoalSeekAN7(r6, u7, an, ao7, ai7);  // 초기 "am" 값 계산
    while (Math.abs(am - 1) > precision) { // "am" 값이 1에 가까워지는 동안 "an" 값 조정
        an += stepSize; // "an" 값 조정
        am = AM7GoalSeekAN7(r6, u7, an, ao7, ai7);  // 새로운 "am" 값 계산
    }

    return an; // 조정된 "an" 값 반환
}
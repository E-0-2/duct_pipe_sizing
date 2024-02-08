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
console.log("폭: ",AJ7GoalSeekAL7_2(500, 1, 200, 211.92));


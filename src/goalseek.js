//  ChangingCell 의 수식 반영



function calculateFunctionValue(x) {

    AI7 = x;

    // 주어진 수식에 AI7 값을 대입하여 AH7 계산

    const R6 = 5000;  // 풍량

    const U7 = 1.0; // 압력

    const X6 = 0.16; // x6 = 0.16



    if (R6 === "" || U7 === "") {

        return 0;

    }



    return (

        U7 * (Math.pow(AI7 / 1000.0, 5.0) * (3.141592 / (4.0 * (R6 / 3600.0))) ** 2 * (2 / 1.2) -

            0.0055 * (1 + (20000 * X6 / AI7 + 1.5 * 3.141592 * AI7 / 1000 * 10 / (4 * (R6 / 3600))) ** (1 / 3))

        ));

}



// goal: 목표값

// x0: 찾고자 하는 값의 초기값

function goalSeek(changingCell, goal, x0, tolerance = 0.0001) {

    let x = x0;

    let y  = changingCell(x); // 주어진 함수의 값 계산    

    const dx = 0.01;

    while (Math.abs(y - goal) > tolerance) {

        const derivative = (changingCell(x+dx)-changingCell(x))/dx; // 함수의 도함수 값 계산            

        x = x - (y - goal) / derivative;

        y = changingCell(x);

    }



    return x;

}



const foundAI7 = goalSeek(calculateFunctionValue, 0, 300 );  // 변경되는 셀의 함수, 목표값, 시작값

console.log(foundAI7);
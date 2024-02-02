const DuctResultView = (props) => {
    const { windVolume, firstH, firstW, firstP, firstV ,firstD,ducts} = props.State;

    return (
        <div className="DiaryList">
            <h2>Result</h2>
            <div>
                <div>풍량 : {windVolume}</div>
                <div>H(mm) :{ducts === "원형덕트" ? "" : firstH}</div>
                <div>{ducts === "원형덕트" ? "D(mm) : " : "W(mm) : " }{ducts === "원형덕트" ? firstD : firstW}</div>
                <div>P(pa/m) :{firstP}</div>
                <div>V(m/s) :{firstV}</div>
            </div>
        </div>
    );
};

export default DuctResultView;

const DuctResultView = (props) => {
    const { windVolume, firstH, firstW, firstP, firstV ,firstD,ducts} = props.State;

    return (
        <div className="DiaryList">
            <h2>Result</h2>
            <div>
                <div>{windVolume}</div>
                <div>{ducts === "원형덕트" ? "" : firstH}</div>
                <div>{ducts === "원형덕트" ? firstD : firstW}</div>
                <div>{firstP}</div>
                <div>{firstV}</div>
            </div>
        </div>
    );
};

export default DuctResultView;

const DuctResultView = (props) => {
    const { windVolume, firstH, firstW, firstP, firstV } = props.State;

    return (
        <div className="DiaryList">
            <h2>Result</h2>
            <div>
                <div>{windVolume}</div>
                <div>{firstH}</div>
                <div>{firstW}</div>
                <div>{firstP}</div>
                <div>{firstV}</div>
            </div>
        </div>
    );
};

export default DuctResultView;

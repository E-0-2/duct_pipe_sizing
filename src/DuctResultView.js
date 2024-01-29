import {useEffect, useState} from "react";

const DuctResultView = (props) => {
    const [data,setData] = useState(
        {
            ...props.data,
        }
    )
    useEffect(() => {
        // 예시: 2초마다 랜덤한 값으로 업데이트
        const intervalId = setInterval(() => {
            setData((prevData) => ({
                ...prevData,
                windVolume: Math.random().toFixed(2).toString(),
            }));
        }, 1000);

        // 컴포넌트가 언마운트되면 clearInterval로 인터벌 정리
        return () => clearInterval(intervalId);
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행


    return (
        <div className={"DuctInputListClass"}>
            <table border={1} className={"info"}>
                <tbody>
                <tr>
                    <th className="info-item">Q(CMH)</th>
                    <th className="info-item">H(mm)</th>
                    <th className="info-item">W(mm)</th>
                    <th className="info-item">P(Pa/m)</th>
                    <th className="info-item">V(m/s)</th>
                </tr>
                {[...Array(20)].map((_, index) => (
                    <tr key={index}>
                        {[...Array(5)].map((_, subIndex) => (
                            <td key={subIndex}>{data.windVolume}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default DuctResultView;
import styled from "styled-components";

const Overlay = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const PastBox = styled.div`
    position: fixed;
    width: 600px;
    height: 600px;
    background-color: white;
    z-index: 1000;
`;

interface PastProps {
    onClose: () => void;
    dateId: string;
}

function Past({ onClose, dateId }: PastProps) {
    return (
        <>
            <Overlay onClick={onClose}>
                <PastBox>
                    {/* 과거 데이터 표시 */}
                    <div>{dateId}</div>
                </PastBox>
            </Overlay>
        </>
    )
}

export default Past;
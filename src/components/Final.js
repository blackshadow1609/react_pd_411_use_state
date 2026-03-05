import './Final.css';

function Final({ totalQuestions, correctAnswers, onRestart }) {
    return (
        <div className='question'>
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Всего вопросов:</div>
                <div>{totalQuestions}</div>
            </h2>
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Правильных ответов:</div>
                <div>{correctAnswers}</div>
            </h2>

            {/* Кнопка перезапуска */}
            <button
                onClick={onRestart}
                style={{
                    display: "block",
                    margin: "20px auto 0",
                    padding: "10px 20px",
                    backgroundColor: "#00CCFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}>Пройти тест заново</button>
        </div>
    )
}
export default Final;
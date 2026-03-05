import './Question.css';
import ProgressBar from './ProgressBar';

function Question({ question, onClickVariant, step, totalQuestions, selectedAnswer, isAnswered }) {
    const percentage = Math.round(step / totalQuestions * 100);
    const getVariantClass = (index) => {
        if (selectedAnswer === null) return '';
        if (index === question.correct) return 'correct';
        if (index === selectedAnswer && index !== question.correct) return 'incorrect';
        return '';
    };

    return (
        <div className='question'>
            <ProgressBar percentage={percentage} />
            <h3>{question.title}</h3>
            <ul>
                {
                    question.variants.map((text, index) => (
                        <li
                            key={index}
                            onClick={() => !isAnswered && onClickVariant(index)}
                            className={getVariantClass(index)}
                        >
                            {text}
                        </li>
                    ))
                }
            </ul>
            {isAnswered && (
                <div className="answer-feedback">
                    {selectedAnswer === question.correct ? '✓ Правильно!' : '✗ Неправильно!'}
                </div>
            )}
        </div>
    )
}

export default Question;
import './App.css';
import { useState } from 'react';
import Question from './components/Question';
import Final from './components/Final';

const questions = [
  {
    title: "Какой язык программирования самый быстрый?",
    variants: ["C", "C++", "Assembler", "C#", "Python"],
    correct: 2
  },
  {
    title: "Какой язык программирования является процедурным?",
    variants: ["C", "C++", "C#", "Java"],
    correct: 0
  },
  {
    title: "Что такое функция?",
    variants: [
      "Именованная область памяти, содержимое которой может изменяться во время выполнения программы",
      "Именованная область памяти, содержимое которой не может изменяться во время выполнения программы",
      "Именованная область кода, которую можно вызвать при необходимости"
    ],
    correct: 2
  },
  {
    title: "Что такое переменная?",
    variants: [
      "Именованная область памяти, содержимое которой может изменяться во время выполнения программы",
      "Именованная область памяти, содержимое которой не может изменяться во время выполнения программы",
      "Именованная область кода, которую можно вызвать при необходимости"
    ],
    correct: 0
  },
  {
    title: "Что такое метод?",
    variants: [
      "Переменная внутри класса",
      "Функция внутри класса",
      "Реализация алгоритма"
    ],
    correct: 1
  },
  {
    title: "Какая структура данных обеспечивает добавление/удаление элементов за константное время?",
    variants: [
      "Массив",
      "Список",
      "Дерево"
    ],
    correct: 1
  },
  {
    title: "Какая структура данных обеспечивает доступ к элементам за константное время?",
    variants: [
      "Массив",
      "Список",
      "Дерево"
    ],
    correct: 0
  },
]

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Функция для перемешивания вопросов и ответов
const shuffleQuestions = (originalQuestions) => {
  const shuffled = shuffleArray(originalQuestions);

  return shuffled.map(question => {
    const variantsWithIndices = question.variants.map((variant, index) => ({
      text: variant,
      originalIndex: index
    }));

    const shuffledVariants = shuffleArray(variantsWithIndices);
    const newCorrectIndex = shuffledVariants.findIndex(
      v => v.originalIndex === question.correct
    );

    return {
      ...question,
      variants: shuffledVariants.map(v => v.text),
      correct: newCorrectIndex
    };
  });
};

function App() {
  // Хранения перемешанных вопросов
  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    shuffleQuestions(questions)
  );

  const totalQuestions = shuffledQuestions.length;
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const restartTest = () => {
    // Перемешивание вопросов при перезапуске
    setShuffledQuestions(shuffleQuestions(questions));
    setStep(0);
    setCorrect(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  let question = shuffledQuestions[step];

  const onClickVariant = (variant) => {
    // Блокировка повторного выбора
    if (isAnswered) return;

    // Ответ выбран
    setIsAnswered(true);
    setSelectedAnswer(variant);

    // Проверка на правильность ответа
    const isCorrect = variant === question.correct;
    if (isCorrect) setCorrect(correct + 1);

    // Таймер для перехода к следующему вопросу
    setTimeout(() => {
      setStep(step + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1000);
  }

  return (
    <div className="main">
      {step < totalQuestions ?
        <Question
          question={question}
          onClickVariant={onClickVariant}
          step={step}
          totalQuestions={totalQuestions}
          selectedAnswer={selectedAnswer}
          isAnswered={isAnswered}
        />
        :
        <Final
          totalQuestions={totalQuestions}
          correctAnswers={correct}
          onRestart={restartTest}
        />
      }
    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";

const allQuestions = {
  python: [
    { question: "Which of the following is used to create a tuple in Python?", options: ["()", "[]", "{}", "<>",], answer: "()" },
    { question: "What does the `len()` function do in Python?", options: ["Returns the length of a string", "Returns the number of arguments passed", "Returns the index of an element", "Returns the type of an object"], answer: "Returns the length of a string" },
    { question: "Which of the following is used to create a dictionary in Python?", options: ["()", "[]", "{}", "<>",], answer: "{}" },
    { question: "How do you handle exceptions in Python?", options: ["try-except", "catch-finally", "if-else", "raise"], answer: "try-except" },
    { question: "What does the `range()` function do in Python?", options: ["Generates a sequence of numbers", "Sorts a list", "Finds the length of a list", "Splits a string into a list"], answer: "Generates a sequence of numbers" },
    { question: "Which method is used to remove an element from a list by value in Python?", options: ["remove()", "pop()", "del", "discard()"], answer: "remove()" },
    { question: "What keyword is used to define a function in Python?", options: ["function", "def", "define", "func"], answer: "def" },
    { question: "Which of the following data structures is immutable?", options: ["List", "Dictionary", "Set", "Tuple"], answer: "Tuple" },
    { question: "What will `bool([])` return in Python?", options: ["True", "False", "None", "Error"], answer: "False" },
    { question: "What is the output of `print(type(3/2))`?", options: ["int", "float", "double", "str"], answer: "float" },
  ],
  javascript: [
    { question: "Which method is used to convert a string to lowercase in JavaScript?", options: ["toLowerCase()", "toLower()", "lowerCase()", "convertLowerCase()"], answer: "toLowerCase()" },
    { question: "Which of the following methods can be used to find the index of an element in an array?", options: ["findIndex()", "indexOf()", "getIndex()", "searchIndex()"], answer: "indexOf()" },
    { question: "What does the `filter()` function do in JavaScript?", options: ["Creates a new array with all elements that pass a test", "Sorts an array", "Iterates over an array", "Flattens an array"], answer: "Creates a new array with all elements that pass a test" },
    { question: "What is the result of `2 + '2'` in JavaScript?", options: ["'22'", "4", "Error", "'2 + 2'"], answer: "'22'" },
    { question: "What will be the output of the following code? `console.log('5' - 3);`", options: ["8", "2", "NaN", "5"], answer: "2" },
    { question: "Which of the following methods adds one or more elements to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
    { question: "Which keyword is used to declare a variable in JavaScript?", options: ["var", "let", "const", "All of the above"], answer: "All of the above" },
    { question: "What does `typeof NaN` return?", options: ["number", "NaN", "undefined", "object"], answer: "number" },
  ],
  sql: [
    { question: "Which SQL statement is used to retrieve data from a database?", options: ["GET", "SELECT", "FETCH", "EXTRACT"], answer: "SELECT" },
    { question: "What is the default sorting order of SQL results?", options: ["Descending", "Random", "Ascending", "Unordered"], answer: "Ascending" },
    { question: "Which SQL clause is used to filter the results of a query?", options: ["WHERE", "HAVING", "FILTER", "ORDER BY"], answer: "WHERE" },
    { question: "Which SQL keyword is used to sort the result set?", options: ["SORT BY", "ORDER BY", "GROUP BY", "FILTER BY"], answer: "ORDER BY" },
    { question: "How do you count the number of rows in a table in SQL?", options: ["COUNT()", "SUM()", "ROWS()", "NUM()"], answer: "COUNT()" },
    { question: "What is the purpose of the `JOIN` clause in SQL?", options: ["To combine rows from two or more tables based on a related column", "To select only one table", "To order the results", "To update a table"], answer: "To combine rows from two or more tables based on a related column" },
    { question: "What does the `DISTINCT` keyword do in SQL?", options: ["Returns only unique values", "Orders the results", "Filters the results", "Deletes duplicate records"], answer: "Returns only unique values" },
    { question: "Which SQL statement is used to insert new records into a table?", options: ["INSERT INTO", "ADD NEW", "NEW ENTRY", "INSERT RECORD"], answer: "INSERT INTO" },
    { question: "Which SQL command is used to remove all records from a table without deleting the table structure?", options: ["DELETE", "REMOVE", "TRUNCATE", "DROP"], answer: "TRUNCATE" },
  ]
};


const CodeSyntaxQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [category, setCategory] = useState(null);
  const [timer, setTimer] = useState(30); // Default 30 seconds for each question
  const [timeTaken, setTimeTaken] = useState(0); // Track time taken for each question
  const [timerInterval, setTimerInterval] = useState(null); // Store interval reference to clear later

  const handleCategorySelection = (category) => {
    setCategory(category);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setScore(0);
    setWrongAnswers([]);
  };

  const handleAnswer = (option) => {
    const timeLeft = timer;
    setSelectedAnswer(option);

    // Calculate score based on the time taken (faster answers get more points)
    const timeBonus = timeLeft >= 25 ? 10 :
                  timeLeft >= 10 ? 5 :
                  timeLeft >= 5 ? 1 : 3;

    if (option === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1 + timeBonus); // Add bonus points for faster answers
    } else {
      setWrongAnswers([...wrongAnswers, { question: shuffledQuestions[currentQuestion].question, correctAnswer: shuffledQuestions[currentQuestion].answer }]);
    }

    // Proceed to next question after a delay
    setTimeout(() => {
      if (currentQuestion + 1 < shuffledQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizFinished(true);
      }
      setSelectedAnswer(null);
      setTimer(30); // Reset timer
      setTimeTaken(0); // Reset time taken for the next question
    }, 1000);
  };

  const handleSkipQuestion = () => {
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(30); // Reset timer
      setTimeTaken(0); // Reset time taken for the next question
    }
  };

  const handleEndQuiz = () => {
    setQuizFinished(true);
  };

  const handleMainMenu = () => {
    setCategory(null);
    setCurrentQuestion(0);
    setScore(0);
    setWrongAnswers([]);
    setQuizFinished(false);
    setTimer(30); // Reset timer
    setTimeTaken(0); // Reset time taken
  };

  useEffect(() => {
    if (category) {
      let selectedQuestions = [];
      if (category === "all") {
        selectedQuestions = [
          ...allQuestions.python,
          ...allQuestions.javascript,
          ...allQuestions.sql,
        ];
      } else {
        selectedQuestions = allQuestions[category];
      }

      const shuffled = [...selectedQuestions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
    }
  }, [category]);

  useEffect(() => {
    if (currentQuestion < shuffledQuestions.length) {
      setTimer(30); // Reset timer for each question

      // Start countdown timer for each question
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            handleAnswer(shuffledQuestions[currentQuestion].answer); // Automatically answer after time runs out
          }
          return prevTimer - 1;
        });
      }, 1000);

      setTimerInterval(interval);
    }
    return () => clearInterval(timerInterval); // Cleanup interval on unmount or when question changes
  }, [currentQuestion, shuffledQuestions]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6">
      {category === null ? (
        <div className="bg-white text-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg border-4 border-gray-600 text-center">
          <h1 className="text-3xl font-extrabold mb-6">Welcome to the CodeStorm</h1>
          <p className="mb-6 font-semibold">The Faster you answer - the more points you will get!</p>
          <button onClick={() => handleCategorySelection("python")} className="font-semibold mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg w-full max-w-md cursor-pointer hover:bg-blue-700 flex items-center justify-center gap-3">
            <img src="/python.png" alt="Python" className="w-8 h-8 object-contain" />
            <span>Python</span>
          </button>

          <button onClick={() => handleCategorySelection("javascript")} className="font-semibold mb-4 px-6 py-3 bg-yellow-600 text-white rounded-lg w-full max-w-md cursor-pointer hover:bg-yellow-700 flex items-center justify-center gap-3">
            <img src="/java-script.png" alt="JavaScript" className="w-8 h-8 object-contain" />
            <span>JavaScript</span>
          </button>

          <button onClick={() => handleCategorySelection("sql")} className="font-semibold mb-4 px-6 py-3 bg-green-600 text-white rounded-lg w-full max-w-md cursor-pointer hover:bg-green-700 flex items-center justify-center gap-3">
            <img src="/database.png" alt="SQL" className="w-8 h-8 object-contain" />
            <span>SQL</span>
          </button>

          <button onClick={() => handleCategorySelection("all")} className="font-semibold mb-4 px-6 py-3 bg-red-600 text-white rounded-lg w-full max-w-md cursor-pointer hover:bg-red-700 flex items-center justify-center gap-3">
            <img src="/computer.png" alt="All Categories" className="w-8 h-8 object-contain" />
            <span>All Categories</span>
          </button>
        </div>
      ) : quizFinished ? (
        <div className="bg-white text-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg border-4 border-gray-600 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg">Your Score: {score} </p>
          {wrongAnswers.length > 0 && (
            <div className="mt-6 text-left">
              <h3 className="text-xl font-bold">Incorrect Answers:</h3>
              <ul className="mt-3 space-y-2">
                {wrongAnswers.map((item, index) => (
                  <li key={index} className="bg-red-100 text-red-800 p-3 rounded-lg border border-red-400">
                    <p className="font-semibold">{item.question}</p>
                    <p>Correct Answer: <span className="font-bold">{item.correctAnswer}</span></p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={handleMainMenu} className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">Restart Quiz</button>
        </div>
      ) : (
        <div className="bg-white text-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg border-4 border-gray-600">
          <p className="mb-6 text-xl font-semibold">{shuffledQuestions[currentQuestion]?.question}</p>
          <div className="space-y-3">
            {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`block w-full p-3 rounded-lg text-lg font-medium transition-all border-2 border-gray-300 ${selectedAnswer === option ? (option === shuffledQuestions[currentQuestion].answer ? "bg-green-400 text-white border-green-600" : "bg-red-400 text-white border-red-600") : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-6 text-lg font-bold">Score: {score}</p>
          <p className="mt-2 text-sm">Time Left: {timer}s</p>
          <div className="mt-6 flex gap-4 place-content-between">
            <button onClick={handleMainMenu} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 w-1/3">Main Menu</button>
            <button onClick={handleSkipQuestion} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-1/3">Skip Question</button>
            <button onClick={handleEndQuiz} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-1/3">End Quiz</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeSyntaxQuiz;

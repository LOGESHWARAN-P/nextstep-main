// src/components/SkillAssessmentPage.js
import React, { useState, useEffect } from 'react';
import './SkillAssessmentPage.css'; // Create this CSS file for styling

const SkillAssessmentPage = () => {
    // State to hold the questions
    const [questions, setQuestions] = useState([]);
    // State to hold user's answers (keyed by question ID)
    const [userAnswers, setUserAnswers] = useState({});
    // State to track if the assessment has been submitted
    const [submitted, setSubmitted] = useState(false);
    // State for score and feedback
    const [score, setScore] = useState(null);
    const [feedback, setFeedback] = useState('');

    // Simulate fetching questions from an API
    useEffect(() => {
        // In a real application, you would make an API call here:
        // fetch('/api/assessments/programming-basics')
        //   .then(response => response.json())
        //   .then(data => setQuestions(data))
        //   .catch(error => console.error('Error fetching questions:', error));

        const fetchedQuestions = [
            {
                id: 'q1',
                text: 'What is the primary purpose of `useState` in React?',
                type: 'multiple-choice',
                options: [
                    { value: 'a', text: 'To perform HTTP requests' },
                    { value: 'b', text: 'To manage component lifecycle' },
                    { value: 'c', text: 'To add state to functional components' },
                    { value: 'd', text: 'To handle routing' }
                ],
                correctAnswer: 'c',
                skill: 'React Basics'
            },
            {
                id: 'q2',
                text: 'Which hook is used for side effects in React functional components?',
                type: 'multiple-choice',
                options: [
                    { value: 'a', text: '`useContext`' },
                    { value: 'b', text: '`useReducer`' },
                    { value: 'c', text: '`useEffect`' },
                    { value: 'd', text: '`useCallback`' }
                ],
                correctAnswer: 'c',
                skill: 'React Advanced'
            },
            {
                id: 'q3',
                text: 'What does JSX stand for?',
                type: 'multiple-choice',
                options: [
                    { value: 'a', text: 'JavaScript XML' },
                    { value: 'b', text: 'JSON X-change' },
                    { value: 'c', text: 'JavaScript Extension' },
                    { value: 'd', text: 'Java Standard eXtension' }
                ],
                correctAnswer: 'a',
                skill: 'React Basics'
            },
            {
                id: 'q4',
                text: 'How do you pass data from a parent component to a child component in React?',
                type: 'multiple-choice',
                options: [
                    { value: 'a', text: 'Using state' },
                    { value: 'b', text: 'Using props' },
                    { value: 'c', text: 'Using context API (only)' },
                    { value: 'd', text: 'Direct DOM manipulation' }
                ],
                correctAnswer: 'b',
                skill: 'React Basics'
            },
        ];
        setQuestions(fetchedQuestions);
    }, []); // Empty dependency array means this runs once on mount

    // Handler for when a radio button (option) is selected
    const handleOptionChange = (questionId, value) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    };

    // Handler for assessment submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Basic validation: Check if all questions are answered
        if (Object.keys(userAnswers).length !== questions.length) {
            alert('Please answer all questions before submitting.');
            return;
        }

        let correctCount = 0;
        questions.forEach(q => {
            if (userAnswers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const calculatedScore = (correctCount / questions.length) * 100;
        setScore(calculatedScore);

        let feedbackMessage = '';
        if (calculatedScore >= 80) {
            feedbackMessage = 'Excellent work! Your React skills are strong.';
        } else if (calculatedScore >= 50) {
            feedbackMessage = 'Good effort! You have a solid foundation, but there\'s room for improvement in React.';
        } else {
            feedbackMessage = 'Keep learning! Reviewing React fundamentals will help you grow significantly.';
        }
        setFeedback(feedbackMessage);

        setSubmitted(true);
        // In a real app, you'd send these results to your backend
        // fetch('/api/assessments/submit', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ userId: 'currentUserId', answers: userAnswers, score: calculatedScore })
        // })
        // .then(response => response.json())
        // .then(data => console.log('Results saved:', data))
        // .catch(error => console.error('Error submitting assessment:', error));
    };

    return (
        <div className="assessment-container">
            <h1>Assess Your React Skills</h1>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="assessment-form">
                    {questions.length === 0 ? (
                        <p>Loading questions...</p>
                    ) : (
                        questions.map((q) => (
                            <div key={q.id} className="question-block">
                                <p>{q.text}</p>
                                <div className="options">
                                    {q.options.map((option) => (
                                        <label key={option.value}>
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={option.value}
                                                checked={userAnswers[q.id] === option.value}
                                                onChange={() => handleOptionChange(q.id, option.value)}
                                                required // HTML5 validation
                                            />
                                            {option.text}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                    <button type="submit" className="submit-btn">Submit Assessment</button>
                </form>
            ) : (
                <div className="results">
                    <h2>Your Assessment Results</h2>
                    <p className="score-display">You scored: {score.toFixed(2)}%</p>
                    <p className="feedback-display">{feedback}</p>
                    <p style={{ fontStyle: 'italic', fontSize: '0.9em', marginTop: '20px' }}>
                        (This is a basic client-side assessment. For advanced personalized recommendations and skill gap analysis,
                        a backend integration with AI capabilities is essential for a platform like NEXTSTEP.)
                    </p>
                    {/* Optionally, add a button to retake or explore learning paths */}
                    <button className="retake-btn" onClick={() => {
                        setSubmitted(false);
                        setUserAnswers({});
                        setScore(null);
                        setFeedback('');
                    }}>Retake Assessment</button>
                    {/* Add a link/button to "Explore React Learning Paths" */}
                    <button className="learning-paths-btn" onClick={() => alert('Navigate to React Learning Paths!')}>
                        Explore React Learning Paths
                    </button>
                </div>
            )}
        </div>
    );
};

export default SkillAssessmentPage;
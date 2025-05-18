import React, { useState } from 'react';

interface Question {
  id: number;
  category: string;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
  };
}

const questions: Question[] = [
  {
    id: 1,
    category: "Personality and Communication Preferences",
    text: "I generally feel most comfortable with communication that:",
    options: {
      A: "Is supportive and encouraging.",
      B: "Is direct and straightforward.",
      C: "Is creative or humorous."
    }
  },
  {
    id: 2,
    category: "Personality and Communication Preferences",
    text: "Messages are most appealing to me when they:",
    options: {
      A: "Provide concise and clear directions.",
      B: "Offer detailed context or explanations.",
      C: "Recognise my past accomplishments."
    }
  },
  {
    id: 3,
    category: "Personality and Communication Preferences",
    text: "The tone of messages that motivates me best is:",
    options: {
      A: "Professional and neutral.",
      B: "Friendly and conversational.",
      C: "Formal and authoritative."
    }
  },
  {
    id: 4,
    category: "Personality and Communication Preferences",
    text: "Communication resonates with me more if it:",
    options: {
      A: "Highlights positive outcomes.",
      B: "Mentions potential challenges.",
      C: "Clearly states expectations without additional commentary."
    }
  },
  {
    id: 5,
    category: "Personality and Communication Preferences",
    text: "Messages engage me primarily when they:",
    options: {
      A: "Are visually appealing.",
      B: "Are clear and text-focused.",
      C: "Connect emotionally or intuitively."
    }
  },
  {
    id: 6,
    category: "Motivation",
    text: "I'm most engaged in tasks that:",
    options: {
      A: "Align with my personal values and goals.",
      B: "Offer specific incentives or recognition.",
      C: "Help avoid negative outcomes or challenges."
    }
  },
  {
    id: 7,
    category: "Motivation",
    text: "I feel more inclined to complete tasks when they:",
    options: {
      A: "Emphasise long-term achievements.",
      B: "Highlight immediate rewards.",
      C: "Focus on preventing issues."
    }
  },
  {
    id: 8,
    category: "Motivation",
    text: "I prefer receiving information about tasks:",
    options: {
      A: "Regularly and consistently.",
      B: "Close to the deadlines.",
      C: "At times I control."
    }
  },
  {
    id: 9,
    category: "Motivation",
    text: "My willingness to engage increases significantly when communication:",
    options: {
      A: "Clearly explains the importance of tasks.",
      B: "Trusts my judgment and autonomy.",
      C: "Connects tasks to team objectives."
    }
  },
  {
    id: 10,
    category: "Motivation",
    text: "Personalised communication (mentioning my name or past successes):",
    options: {
      A: "Strongly engages me.",
      B: "Has minimal impact.",
      C: "Is slightly distracting or irritating."
    }
  },
  {
    id: 11,
    category: "Well-being measures",
    text: "Communication typically makes me feel:",
    options: {
      A: "Supported and reassured.",
      B: "Slightly pressured but productive.",
      C: "Annoyed or overwhelmed."
    }
  },
  {
    id: 12,
    category: "Well-being measures",
    text: "Receiving messages at certain times:",
    options: {
      A: "Makes me more receptive.",
      B: "Has no significant effect.",
      C: "Makes me less receptive."
    }
  },
  {
    id: 13,
    category: "Well-being measures",
    text: "Messages subtly acknowledging my current workload:",
    options: {
      A: "Enhance my motivation and cooperation.",
      B: "Have minimal impact.",
      C: "Make me uncomfortable or resistant."
    }
  },
  {
    id: 14,
    category: "Well-being measures",
    text: "Supportive or affirming language in communication:",
    options: {
      A: "Is helpful and motivating.",
      B: "Feels unnecessary.",
      C: "Is distracting or irritating."
    }
  },
  {
    id: 15,
    category: "Well-being measures",
    text: "When busy, communication that works best for me:",
    options: {
      A: "Provides quick solutions or resources.",
      B: "Clearly states expectations.",
      C: "Allows flexibility and autonomy."
    }
  },
  {
    id: 16,
    category: "Well-being measures",
    text: "At night I sleep:",
    options: {
      A: "Fine, no issues falling a sleep or waking up at night",
      B: "ok, but I either have issues falling asleep or wake up during a night due to stressful thoughts",
      C: "Badly."
    }
  },
  {
    id: 17,
    category: "Communication",
    text: "Messages resonate deeply when they:",
    options: {
      A: "Clearly define next steps.",
      B: "Reference my past successes positively.",
      C: "Use imagery or metaphors."
    }
  },
  {
    id: 18,
    category: "Communication",
    text: "Ideal communication feels more like:",
    options: {
      A: "Interactive conversations.",
      B: "Simple notifications.",
      C: "Gentle prompts with minimal interaction."
    }
  },
  {
    id: 19,
    category: "Communication",
    text: "I remember messages best when they are:",
    options: {
      A: "Visually engaging and brief.",
      B: "Clear and easy to understand.",
      C: "Emotionally engaging or intuitive."
    }
  },
  {
    id: 20,
    category: "Flexibility and Autonomy",
    text: "Allowing flexibility in timing or frequency of communication:",
    options: {
      A: "Significantly reduces my stress.",
      B: "Is nice but not crucial.",
      C: "Is irrelevant to me."
    }
  },
  {
    id: 21,
    category: "Flexibility and Autonomy",
    text: "Subtly providing immediate support options:",
    options: {
      A: "Makes me feel reassured and supported.",
      B: "Has little impact.",
      C: "Is unnecessary—I prefer to seek support independently."
    }
  }
];

const PersonalityQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (option: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Here you would typically send the answers to your backend
    console.log('Submitted answers:', answers);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank you for completing the quiz!</h2>
          <p className="text-gray-600">Your responses have been recorded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Personality and Communication Preferences Quiz</h1>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {questions[currentQuestion].category}
            </span>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {questions[currentQuestion].text}
          </h2>

          <div className="space-y-4">
            {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
              <label
                key={key}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  answers[currentQuestion] === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={key}
                  checked={answers[currentQuestion] === key}
                  onChange={() => handleAnswer(key)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-md ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== questions.length}
              className={`px-6 py-2 rounded-md ${
                Object.keys(answers).length !== questions.length
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className={`px-4 py-2 rounded-md ${
                !answers[currentQuestion]
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalityQuiz; 
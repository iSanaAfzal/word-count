import inquirer from 'inquirer';
import chalk from 'chalk';

// Define the Question interface
interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

// Define the array of questions
const questions: Question[] = [
    {
        question: 'What is the capital of France?',
        options: ['A. London', 'B. Paris', 'C. Berlin', 'D. Rome'],
        correctAnswer: 'B',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['A. Venus', 'B. Mars', 'C. Jupiter', 'D. Saturn'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the largest mammal?',
        options: ['A. Elephant', 'B. Blue Whale', 'C. Giraffe', 'D. Gorilla'],
        correctAnswer: 'B',
    },
    // Add more questions as needed
];

// Function to display questions and get user input using inquirer
async function displayQuestions(questions: Question[]): Promise<string[]> {
    const userAnswers: string[] = [];

    for (const [index, question] of questions.entries()) {
        console.log(`${index + 1}. ${question.question}`);
        question.options.forEach((option) => console.log(option));

        const answerPrompt = await inquirer.prompt([
            {
                type: 'input',
                name: 'userAnswer',
                message: 'Your answer:',
                validate: (input) => /^[A-D]$/i.test(input.trim()),
            },
        ]);

        userAnswers.push(answerPrompt.userAnswer.toUpperCase());
    }

    return userAnswers;
}

// Function to evaluate answers and calculate the score
function evaluateAnswers(questions: Question[], userAnswers: string[]): number {
    let score = 0;

    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });

    return score;
}

// Main execution
async function main() {
    console.log(chalk.bold.green.underline('***Welcome to the Quiz!***\n'));

    const userAnswers = await displayQuestions(questions);
    const score = evaluateAnswers(questions, userAnswers);

    console.log(chalk.bold.red(`\nYour score: ${score} out of ${questions.length}`));
}

// Run the main function
main();

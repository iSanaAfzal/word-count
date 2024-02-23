import inquirer from 'inquirer';
import chalk from 'chalk';
 const answers: {
        sentence: string,
    } = await inquirer.prompt([{
        name: "sentence",
        type: "input",
        message: chalk.yellow("****Enter Your Sentence to count the words****\n"),
    }]);

    const words = answers.sentence.trim().split(" ");
    console.log(chalk.green(`Your sentence has ${chalk.bold(words.length)} words.`));




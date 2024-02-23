import inquirer from "inquirer";
import chalk from "chalk";

class Player {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel -= 25;
        if (this.fuel < 0) {
            this.fuel = 0;
        }
    }

    fuelIncrease() {
        this.fuel = 100;
    }
}

class Opponent {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel -= 25;
        if (this.fuel < 0) {
            this.fuel = 0;
        }
    }

    fuelIncrease() {
        this.fuel = 100;
    }
}

const player2 = await inquirer.prompt([{
    type: "input",
    name: "name",
    message: "Enter Your Name?\n"
}]);

const opponent2 = await inquirer.prompt([{
    type: "list",
    name: "select",
    message: "Select Your Opponent?\n",
    choices: ["Skeleton", "Zombie", "Assassin"]
}]);

const p2 = new Player(player2.name);
const o2 = new Opponent(opponent2.select.toLowerCase());

while (true) {
    const ask = await inquirer.prompt([{
        type: "list",
        name: "opt",
        message: "Select Your Action:\n",
        choices: ["Attack", "Drink Potion", "Run for Your Life"]
    }]);

    switch (ask.opt) {
        case "Attack":
            performAttack(p2, o2);
            break;
        case "Drink Potion":
            p2.fuelIncrease();
            console.log(chalk.bold.italic.green(`You drink a Health Potion. Your Fuel is ${p2.fuel}`));
            break;
        case "Run for Your Life":
            console.log(chalk.bold.italic.red('Better Luck For the Next Time'));
            process.exit();
            break;
        default:
            console.log(chalk.bold.red("Invalid choice. Please choose a valid option."));
            break;
    }
}

function performAttack(player: Player, opponent: Opponent) {
    const num = Math.floor(Math.random() * 2);

    if (num > 0) {
        player.fuelDecrease();
        console.log(chalk.bold.green(`${player.name}'s fuel is ${chalk.red(player.fuel)}`));
        console.log(chalk.bold.green(`${opponent.name}'s fuel is ${chalk.red(opponent.fuel)}`));

        if (player.fuel <= 0) {
            console.log(chalk.bold.italic.red('Better Luck For the Next Time'));
            process.exit();
        }
    } else {
        opponent.fuelDecrease();
        console.log(chalk.bold.green(`${player.name}'s fuel is ${chalk.red(player.fuel)}`));
        console.log(chalk.bold.green(`${opponent.name}'s fuel is ${chalk.red(opponent.fuel)}`));

        if (opponent.fuel <= 0) {
            console.log(chalk.bold.green('Winner'));
            process.exit();
        }
    }
}

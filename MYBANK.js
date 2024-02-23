import chalk from 'chalk';
import inquirer from 'inquirer';
class Customer {
    customerId;
    name;
    constructor(customerId, name) {
        this.customerId = customerId;
        this.name = name;
    }
    getCustomerId() {
        return this.customerId;
    }
    getName() {
        return this.name;
    }
}
class Account {
    accountId;
    balance;
    customer;
    constructor(accountId, initialBalance, customer) {
        this.accountId = accountId;
        this.balance = initialBalance;
        this.customer = customer;
    }
    getAccountId() {
        return this.accountId;
    }
    getBalance() {
        return this.balance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(chalk.green(`Deposited $${amount}. New balance: $${this.balance}`));
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.yellow(`Withdrawn $${amount}. New balance: $${this.balance}`));
        }
        else {
            console.log(chalk.red("Insufficient funds!"));
        }
    }
}
class Bank {
    accounts = [];
    async createAccountInteractive() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'customerId',
                message: 'Enter customer ID:',
                validate: (value) => !isNaN(parseInt(value, 10)) || 'Please enter a valid number',
            },
            {
                type: 'input',
                name: 'customerName',
                message: 'Enter customer name:',
                validate: (value) => value.trim() !== '' || 'Please enter a valid name',
            },
            {
                type: 'input',
                name: 'accountId',
                message: 'Enter account ID:',
                validate: (value) => !isNaN(parseInt(value, 10)) || 'Please enter a valid number',
            },
            {
                type: 'input',
                name: 'initialBalance',
                message: 'Enter initial balance:',
                validate: (value) => !isNaN(parseFloat(value)) || 'Please enter a valid number',
            },
        ]);
        const customer = new Customer(parseInt(answers.customerId, 10), answers.customerName);
        this.createAccount(parseInt(answers.accountId, 10), parseFloat(answers.initialBalance), customer);
        console.log(chalk.green('Account created successfully!'));
    }
    async performTransaction() {
        const transactionTypeAnswer = await inquirer.prompt({
            type: 'list',
            name: 'transactionType',
            message: 'Select transaction type:',
            choices: ['Deposit', 'Withdraw'],
        });
        const accountIdAnswer = await inquirer.prompt({
            type: 'input',
            name: 'accountId',
            message: 'Enter account ID:',
            validate: (value) => !isNaN(parseInt(value, 10)) || 'Please enter a valid number',
        });
        const amountAnswer = await inquirer.prompt({
            type: 'input',
            name: 'amount',
            message: 'Enter amount:',
            validate: (value) => !isNaN(parseFloat(value)) || 'Please enter a valid number',
        });
        const accountId = parseInt(accountIdAnswer.accountId, 10);
        const amount = parseFloat(amountAnswer.amount);
        if (transactionTypeAnswer.transactionType === 'Deposit') {
            this.deposit(accountId, amount);
        }
        else {
            this.withdraw(accountId, amount);
        }
    }
    createAccount(accountId, initialBalance, customer) {
        const account = new Account(accountId, initialBalance, customer);
        this.accounts.push(account);
        console.log(chalk.blue(`Account created for ${customer.getName()}. Account ID: ${account.getAccountId()}`));
    }
    getAccountBalance(accountId) {
        const account = this.accounts.find(acc => acc.getAccountId() === accountId);
        return account ? account.getBalance() : undefined;
    }
    deposit(accountId, amount) {
        const account = this.accounts.find(acc => acc.getAccountId() === accountId);
        if (account) {
            account.deposit(amount);
        }
        else {
            console.log(chalk.red("Account not found!"));
        }
    }
    withdraw(accountId, amount) {
        const account = this.accounts.find(acc => acc.getAccountId() === accountId);
        if (account) {
            account.withdraw(amount);
        }
        else {
            console.log(chalk.red("Account not found!"));
        }
    }
}
(async () => {
    const bank = new Bank();
    await bank.createAccountInteractive();
    await bank.performTransaction();
})();

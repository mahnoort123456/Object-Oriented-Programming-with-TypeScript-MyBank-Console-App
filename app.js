import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.bold.green("*********Welcome to HBL Bank***********"));
const accounts = [];
async function createAccount() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        },
        {
            type: 'number',
            name: 'initialDeposit',
            message: 'Enter initial deposit amount:',
            validate(value) {
                if (isNaN(value) || value <= 0) {
                    return 'Please enter a valid amount';
                }
                return true;
            }
        }
    ]);
    const account = {
        name: answers.name,
        balance: answers.initialDeposit,
    };
    accounts.push(account);
    console.log(`Account created for ${answers.name} with balance ${answers.initialDeposit}`);
}
async function deposit() {
    const { name, amount } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        },
        {
            type: 'number',
            name: 'amount',
            message: 'Enter amount to deposit:',
            validate(value) {
                if (isNaN(value) || value <= 0) {
                    return 'Please enter a valid amount';
                }
                return true;
            }
        }
    ]);
    const account = accounts.find(acc => acc.name === name);
    if (account) {
        account.balance += amount;
        console.log(`Deposited ${amount}. New balance is ${account.balance}`);
    }
    else {
        console.log('Account not found');
    }
}
async function withdraw() {
    const { name, amount } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        },
        {
            type: 'number',
            name: 'amount',
            message: 'Enter amount to withdraw:',
            validate(value) {
                if (isNaN(value) || value <= 0) {
                    return 'Please enter a valid amount';
                }
                return true;
            }
        }
    ]);
    const account = accounts.find(acc => acc.name === name);
    if (account) {
        if (account.balance >= amount) {
            account.balance -= amount;
            console.log(`Withdrew ${amount}. New balance is ${account.balance}`);
        }
        else {
            console.log('Insufficient funds');
        }
    }
    else {
        console.log('Account not found');
    }
}
async function checkBalance() {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        }
    ]);
    const account = accounts.find(acc => acc.name === name);
    if (account) {
        console.log(`Balance for ${name} is ${account.balance}`);
    }
    else {
        console.log('Account not found');
    }
}
async function mainMenu() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Create Account', 'Deposit', 'Withdraw', 'Check Balance', 'Exit'],
        },
    ]);
    switch (answer.action) {
        case 'Create Account':
            await createAccount();
            break;
        case 'Deposit':
            await deposit();
            break;
        case 'Withdraw':
            await withdraw();
            break;
        case 'Check Balance':
            await checkBalance();
            break;
        case 'Exit':
            console.log('Goodbye!');
            return;
    }
    await mainMenu(); // Loop back to the main menu after an action
}
mainMenu().catch((error) => console.error(error));

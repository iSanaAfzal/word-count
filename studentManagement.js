import inquirer from 'inquirer';
import chalk from 'chalk';
class Student {
    static lastStudentID = 5;
    name;
    studentID;
    courses;
    balance;
    constructor(name, courses) {
        this.name = name;
        this.studentID = ++Student.lastStudentID;
        this.courses = courses;
        this.balance = 0;
    }
    enrollInCourses(selectedCourses) {
        this.courses = selectedCourses;
        console.log(chalk.green('Enrollment successful!'));
    }
    viewBalance() {
        console.log(chalk.blue(`Current Balance: $${this.balance}`));
    }
    payTuitionFees(amount) {
        this.balance += amount;
        console.log(chalk.yellow(`Payment successful! Remaining Balance: $${this.balance}`));
    }
    showStatus() {
        console.log(chalk.cyan(`
      Student Details:
      Name: ${chalk.bold(this.name)}
      ID: ${this.studentID}
      Courses Enrolled: ${this.courses.join(', ')}
      Balance: $${this.balance}
    `));
    }
}
async function addNewStudent() {
    const studentDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:',
        },
        {
            type: 'checkbox',
            name: 'courses',
            message: 'Select courses to enroll:',
            choices: ['Math', 'English', 'Science'],
        },
    ]);
    const newStudent = new Student(studentDetails.name, studentDetails.courses);
    console.log(chalk.green(`New student added with ID: ${newStudent.studentID}`));
    return newStudent;
}
async function main() {
    const students = [];
    while (true) {
        const choice = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Add New Student', 'Enroll in Courses', 'View Balance', 'Pay Tuition Fees', 'Show Status', 'Exit'],
            },
        ]);
        switch (choice.action) {
            case 'Add New Student':
                const newStudent = await addNewStudent();
                students.push(newStudent);
                break;
            case 'Enroll in Courses':
                const studentIDToEnroll = await inquirer.prompt({
                    type: 'number',
                    name: 'studentID',
                    message: 'Enter student ID to enroll in courses:',
                });
                const studentToEnroll = students.find(student => student.studentID === studentIDToEnroll.studentID);
                if (studentToEnroll) {
                    const selectedCourses = await inquirer.prompt({
                        type: 'checkbox',
                        name: 'courses',
                        message: 'Select courses to enroll:',
                        choices: ['Math', 'English', 'Science'],
                    });
                    studentToEnroll.enrollInCourses(selectedCourses.courses);
                }
                else {
                    console.log(chalk.red('Student not found!'));
                }
                break;
            case 'View Balance':
                const studentIDToViewBalance = await inquirer.prompt({
                    type: 'number',
                    name: 'studentID',
                    message: 'Enter student ID to view balance:',
                });
                const studentToViewBalance = students.find(student => student.studentID === studentIDToViewBalance.studentID);
                if (studentToViewBalance) {
                    studentToViewBalance.viewBalance();
                }
                else {
                    console.log(chalk.red('Student not found!'));
                }
                break;
            case 'Pay Tuition Fees':
                const studentIDToPayFees = await inquirer.prompt({
                    type: 'number',
                    name: 'studentID',
                    message: 'Enter student ID to pay tuition fees:',
                });
                const studentToPayFees = students.find(student => student.studentID === studentIDToPayFees.studentID);
                if (studentToPayFees) {
                    const tuitionAmount = await inquirer.prompt({
                        type: 'number',
                        name: 'amount',
                        message: 'Enter tuition fees amount:',
                    });
                    studentToPayFees.payTuitionFees(tuitionAmount.amount);
                }
                else {
                    console.log(chalk.red('Student not found!'));
                }
                break;
            case 'Show Status':
                const studentIDToShowStatus = await inquirer.prompt({
                    type: 'number',
                    name: 'studentID',
                    message: 'Enter student ID to show status:',
                });
                const studentToShowStatus = students.find(student => student.studentID === studentIDToShowStatus.studentID);
                if (studentToShowStatus) {
                    studentToShowStatus.showStatus();
                }
                else {
                    console.log(chalk.red('Student not found!'));
                }
                break;
            case 'Exit':
                console.log(chalk.yellow('Exiting Student Management System.'));
                return;
        }
    }
}
main();

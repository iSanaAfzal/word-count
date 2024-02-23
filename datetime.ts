import { differenceInSeconds } from 'date-fns';
import inquirer from 'inquirer'; 

const res = await inquirer.prompt([{
    type: "input",
    name: "userinput",
    message: "please Enter the amount of seconds?",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please Enter Valid Number"
        }
        else if (input > 60) {
            return "seconds must be in 60"
        }
        else {
            return true
        }
    }
}])
let input = res.userinput;
function starttime(val: number) {
    const inttime = new Date().setSeconds(new Date().getSeconds() + val);
const intervalTime=new Date(inttime)
    setInterval((() => {
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log('Timer has expired');
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor((timeDiff % 60))
        console.log(`${min.toString().padStart(2,"0")}:${sec}`)
    }), 1000)

}
starttime(input);



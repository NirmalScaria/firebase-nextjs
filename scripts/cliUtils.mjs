import chalk from "chalk";
import ora from 'ora';
import readline from "readline";

const clearLines = (lines) => {
    readline.moveCursor(process.stdout, 0, -lines);
    readline.clearScreenDown(process.stdout);
};

export function showStepsStatus(currentStep, steps) {
    clearLines(steps.length + 100)
    console.log("🤞🏻 NextFireJS Setup Steps. 🤞🏻")
    steps.forEach((step, index) => {
        if (index < currentStep) {
            console.log(chalk.green("✓ " + steps[index].description));
        } else if (index === currentStep) {
            console.log(chalk.blueBright("⠋"), ` ${steps[index].description}`);
        } else {
            console.log(chalk.gray(`• ${steps[index].description}`));
        }
    });
};
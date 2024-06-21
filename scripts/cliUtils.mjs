import chalk from "chalk";
import readline from "readline";

const steps = [
    "Install authentication components",
    "Setup GCloud",
    "Setup Firebase Project",
    "Generate Service Account",
    "Set Web App",
    "Enable Auth"
]

const clearLines = (lines) => {
    readline.moveCursor(process.stdout, 0, -lines);
    readline.clearScreenDown(process.stdout);
};

export function showStepsStatus(currentStep) {
    clearLines(steps.length + 100)
    console.log("🤞🏻 NextFireJS Setup Steps. 🤞🏻")
    steps.forEach((step, index) => {
        if (index < currentStep) {
            console.log(chalk.green("✓ " + step));
        } else if (index === currentStep) {
            console.log(chalk.blueBright("⠋ "), step);
        } else {
            console.log(chalk.gray(`• ${step}`));
        }
    });
};
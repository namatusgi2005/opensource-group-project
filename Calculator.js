const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let history = []; 
// nura ali bala - CIS/STE/22/1024
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }

function power(x, y) {
    return Math.pow(x, y);
}

function squareRoot(x) {
    if (x < 0) {
        return "Error: Cannot calculate square root of a negative number";
    }
    return Math.sqrt(x);
}

function divide(a, b) {
    const numA = validateNumber(a);
    const numB = validateNumber(b);

    if (!numA.valid) return numA.message;
    if (!numB.valid) return numB.message;

    if (numB.value === 0) {
        return "Error: Cannot divide by zero!";
    }

    return numA.value / numB.value;
}
// Muhammad Adam - CIS/STE/22/1031
function validateNumber(value) {
    const num = Number(value);

    if (value === null || value === undefined || value === "") {
        return { valid: false, message: "Input cannot be empty!" };
    }

    if (isNaN(num)) {
        return { valid: false, message: "Invalid number entered!" };
    }

    return { valid: true, value: num };
}
// 📐 UI Helper: Draws a perfectly padded line inside the box
function drawLine(text, colorizer = chalk.white) {
    let paddedText = text;
    // Truncate if too long, pad with spaces if too short
    if (paddedText.length > 36) {
        paddedText = paddedText.substring(0, 33) + "...";
    } else {
        paddedText = paddedText.padEnd(36, " ");
    }
    // Print: Left Border -> Space -> Colored Text -> Space -> Right Border
    console.log(chalk.cyan("║ ") + colorizer(paddedText) + chalk.cyan(" ║"));
}

// 🎨 UI Menu
function showMenu() {
    console.clear();

    // Top Border
    console.log(chalk.cyan("╔" + "═".repeat(38) + "╗"));
    
    // Title (Manually padded because emojis mess up standard string length)
    console.log(chalk.cyan("║") + chalk.bold.yellow("        🧮 SIMPLE CALCULATOR          ") + chalk.cyan("║"));
    
    // Divider
    console.log(chalk.cyan("╠" + "═".repeat(38) + "╣"));

    // Menu Content
    drawLine("Select an operation:", chalk.green);
    drawLine("", chalk.white); // Empty line for spacing
    drawLine("  1 ➜ Addition (+)", chalk.blue);
    drawLine("  2 ➜ Subtraction (-)", chalk.blue);
    drawLine("  3 ➜ Multiplication (×)", chalk.blue);
    drawLine("  4 ➜ Division (÷)", chalk.blue);
    drawLine("  5 ➜ Clear History", chalk.blue);
    // nura ali bala cis/ste/22/1024
    drawLine(" 6 ➜ Power (^)", chalk.blue);
    drawLine(" 7 ➜ Square Root (√)", chalk.blue);
    
    // History Panel inside the box
    if (history.length > 0) {
        console.log(chalk.cyan("╟" + "─".repeat(38) + "╢"));
        drawLine("--- RECENT HISTORY ---", chalk.cyan);
        history.slice(-5).forEach(item => {
            drawLine(`  ${item}`, chalk.gray);
        });
    }

    // Bottom Border
    console.log(chalk.cyan("╚" + "═".repeat(38) + "╝\n"));
}

function askQuestion() {
    showMenu();

    rl.question(chalk.magenta("👉 Enter your choice (1-5): "), (choice) => {

        if (choice === "5") {
            history = [];
            console.log(chalk.green("\n✅ History cleared successfully!\n"));
            return setTimeout(askQuestion, 1500); 
        }

        if (!["1", "2", "3", "4"].includes(choice)) {
            console.log(chalk.red("\n❌ Invalid choice. Try again.\n"));
            return setTimeout(askQuestion, 1500); 
        }

        rl.question(chalk.yellow("Enter first number: "), (num1) => {
            rl.question(chalk.yellow("Enter second number: "), (num2) => {

                num1 = parseFloat(num1);
                num2 = parseFloat(num2);

                if (isNaN(num1) || isNaN(num2)) {
                    console.log(chalk.red("\n❌ Please enter valid numbers.\n"));
                    return setTimeout(askQuestion, 1500);
                }

                let result;
                let symbol;

                switch (choice) {
                    case "1": result = add(num1, num2); symbol = "+"; break;
                    case "2": result = subtract(num1, num2); symbol = "-"; break;
                    case "3": result = multiply(num1, num2); symbol = "×"; break;
                    case "4": result = divide(num1, num2); symbol = "÷"; break;
                        // nura ali bala cis/ste/22/1024
                     case "6": result = power(num1, num2); symbol = "^"; break;
                    case "7": result = squareRoot(num1); symbol = "√"; break;
                }

                const outputString = `${num1} ${symbol} ${num2} = ${result}`;
                history.push(outputString);

                // 📦 Result presented in its own mini-box
                console.log(chalk.cyan("\n╔" + "═".repeat(38) + "╗"));
                drawLine(`Result: ${outputString}`, chalk.green.bold);
                console.log(chalk.cyan("╚" + "═".repeat(38) + "╝\n"));

                rl.question(chalk.magenta("Do you want to continue? (y/n): "), (answer) => {
                    if (answer.toLowerCase() === "y") {
                        askQuestion();
                    } else {
                        console.log(chalk.yellow("\n👋 Thanks for using the calculator!"));
                        rl.close();
                    }
                });
            });
        });
    });
}

askQuestion();

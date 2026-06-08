
// MEMBER 12: Continuous Loop Mode

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function runCalculator() {
  console.log("====================================");
  console.log("   Welcome to the Group Calculator  ");
  console.log("  [Continuous Loop Mode - Member 12]");
  console.log("====================================");

  let keepRunning = true;

  while (keepRunning) {
    console.log("\n--- Select an Operation ---");
    console.log("1. Add");
    console.log("2. Subtract");
    console.log("3. Multiply");
    console.log("4. Divide");
    console.log("0. Exit");

    const choice = await question("\nEnter your choice: ");

    if (choice === "0") {
      console.log("\nThank you for using the calculator. Goodbye!");
      keepRunning = false;
      break;
    }

    if (!["1","2","3","4"].includes(choice)) {
      console.log("Invalid choice. Please try again.");
      continue;
    }

    const num1 = parseFloat(await question("Enter first number: "));
    const num2 = parseFloat(await question("Enter second number: "));

    if (isNaN(num1) || isNaN(num2)) {
      console.log("Invalid input. Please enter valid numbers.");
      continue;
    }

    let result;
    switch (choice) {
      case "1":
        result = num1 + num2;
        console.log(`Result: ${num1} + ${num2} = ${result}`);
        break;
      case "2":
        result = num1 - num2;
        console.log(`Result: ${num1} - ${num2} = ${result}`);
        break;
      case "3":
        result = num1 * num2;
        console.log(`Result: ${num1} * ${num2} = ${result}`);
        break;
      case "4":
        if (num2 === 0) {
          console.log("Error: Cannot divide by zero.");
        } else {
          result = num1 / num2;
          console.log(`Result: ${num1} / ${num2} = ${result}`);
        }
        break;
    }

    const again = await question("\nDo another calculation? (yes/no): ");
    if (again.toLowerCase() !== "yes" && again.toLowerCase() !== "y") {
      console.log("\nThank you for using the calculator. Goodbye!");
      keepRunning = false;
    }
  }

  rl.close();
}

runCalculator();
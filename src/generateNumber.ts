export function generateRandomNumber() {
    // console.log("Function run");

    const randomNum = weightedRandomNum();

    // Set the generated number to the h1 element
    const randomNumberElement = document.getElementById("randomNumber");
    if (randomNumberElement) {
        randomNumberElement.innerText = randomNum.toString();
    }
}

// Explicitly attach to the global window object
declare global {
    interface Window {
        generateRandomNumber: () => void;
    }
}

window.generateRandomNumber = generateRandomNumber;

function weightedRandomNum(): number {
    const rand = Math.random();

    if (rand < 1 / 36) return 2;
    if (rand < 3 / 36) return 3;
    if (rand < 6 / 36) return 4;
    if (rand < 10 / 36) return 5;
    if (rand < 15 / 36) return 6;
    if (rand < 21 / 36) return 7;
    if (rand < 26 / 36) return 8;
    if (rand < 30 / 36) return 9;
    if (rand < 33 / 36) return 10;
    if (rand < 35 / 36) return 11;
    return 12;
}

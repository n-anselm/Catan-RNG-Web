const historyList: number[] = []; // Initialize history list
let isGenerating = false; // Flag to prevent re-entry

export function generateRandomNumber() {

    // Trigger device vibration if supported
    vibrate();

    if (isGenerating) return; // Prevent multiple entries
    isGenerating = true;

    const generateButton = document.getElementById("generateButton") as HTMLButtonElement | null;
    if (generateButton) generateButton.disabled = true;

    let randomNum = weightedRandomNum();
    console.log("Random: " + randomNum); // DEBUG
    // randomNum = smoothRandom(randomNum);
    // console.log("Smooth random: " + randomNum); // DEBUG

    // Ensure that the new number is not the same as the previous one
    while (historyList.length > 0 && randomNum === historyList[historyList.length - 1]) {
        console.warn("Duplicate detected, regenerating...");
        randomNum = weightedRandomNum();
        console.log("Random: " + randomNum); // DEBUG
        // randomNum = smoothRandom(randomNum);
        // console.log("Smooth random: " + randomNum); // DEBUG
    }
    
    // Set the generated number to the h1 element
    const randomNumberElement = document.getElementById("randomNumber");
    if (randomNumberElement) {
        randomNumberElement.innerText = randomNum.toString();
    }

    // Add the new valid number to the history list
    historyList.push(randomNum);

    // console.log("History list: ", historyList); // DEBUG

    // Re-enable the button after a short delay
    setTimeout(() => {
        if (generateButton) generateButton.disabled = false;
        isGenerating = false;
    }, 100);
}

function vibrate() {
    if (navigator.vibrate) {
        navigator.vibrate(120); // Vibrate for 200ms
    }
    // else {
    //     console.warn("Vibration API not supported.");
    // }
}

// Explicitly attach to the global window object
declare global {
    interface Window {
        generateRandomNumber: () => void;
        showHistory: () => void;
    }
}

window.generateRandomNumber = generateRandomNumber;
window.showHistory = showHistory;

// Generate a weighted random number using a cumulative distribution function
function weightedRandomNum(): number {
    const rand = Math.random();

    if (rand < 1 / 36) return 2;       // 2.8%  probability
    if (rand < 3 / 36) return 3;       // 5.6%  probability
    if (rand < 6 / 36) return 4;       // 8.3%  probability
    if (rand < 10 / 36) return 5;      // 11.1% probability
    if (rand < 15 / 36) return 6;      // 13.9% probability
    if (rand < 21 / 36) return 7;      // 16.7% probability
    if (rand < 26 / 36) return 8;      // 13.9% probability
    if (rand < 30 / 36) return 9;      // 11.1% probability
    if (rand < 33 / 36) return 10;     // 8.3%  probability
    if (rand < 35 / 36) return 11;     // 5.6%  probability
    return 12;                         // 2.8%  probability
}

function smoothRandom(num: number): number {

    const smoothingFactor = 0.77;
    
    // Move closer to the mean (7 is the midpoint of 2-12)
    let smoothedRandom = Math.round(num * smoothingFactor + 7 * (1 - smoothingFactor));
    // Round to nearest int
    return Math.round(smoothedRandom);
}

function showHistory() {
    if (historyList.length === 0) {
        alert("No history yet.");
    } else {
        alert("History:\n" + historyList.join(", "));
    }
}

const ones = {
    "0": "",
    "1": "One",
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine"
};

const teens = {
    "10": "Ten",
    "11": "Eleven",
    "12": "Twelve",
    "13": "Thirteen",
    "14": "Fourteen",
    "15": "Fifteen",
    "16": "Sixteen",
    "17": "Seventeen",
    "18": "Eighteen",
    "19": "Nineteen"
};

const tens = {
    "2": "Twenty",
    "3": "Thirty",
    "4": "Forty",
    "5": "Fifty",
    "6": "Sixty",
    "7": "Seventy",
    "8": "Eighty",
    "9": "Ninety"
};

function pressDigit(digit) {
    const inputField = document.getElementById("currencyInput");
    const outputField = document.getElementById("wordOutput");
  
    if (inputField.value.includes('.') && digit === '.') {
      return;
    }
  
    if (inputField.value.length >= 6) {
      outputField.value = "Can only accept up to 999.99";
      return;
    }
  
    if (digit === '.') {
      inputField.value += digit;
    } else if (inputField.value.includes('.')) {
      const decimalPart = inputField.value.split('.')[1] || '';
      if (decimalPart.length < 2) {
        inputField.value += digit;
      }
    } else if (inputField.value.length < 3) {
      inputField.value += digit;
    }
  }

function translateMoneyToWords() {
    const input = document.getElementById("currencyInput").value;
    const output = document.getElementById("wordOutput");

    if (input === "" || input === ".") {
        output.value = "Please enter a valid amount";
        return;
    }

    if (!/^\d{1,3}(\.\d{1,2})?$/.test(input)) {
        output.value = "Invalid format. Use up to 3 digits before and 2 digits after decimal.";
        return;
    }

    const [dollars, cents = "00"] = input.split('.');
    let words = [];

    if (parseInt(dollars) === 0) {
        words.push("Zero Dollars");
    } else {
        words.push(convertThreeDigitNumber(dollars) + " Dollars");
    }

    if (parseInt(cents) > 0) {
        words.push(convertTwoDigitNumber(cents) + " Cents");
    }

    output.value = words.join(" and ");
}

function convertTwoDigitNumber(number) {
    if (number.length === 1) {
        return ones[number];
    } else if (number[0] === "1") {
        return teens[number];
    } else if (number[0] === "0") {
        return ones[number[1]];
    } else {
        return tens[number[0]] + (number[1] !== "0" ? " " + ones[number[1]] : "");
    }
}

function convertThreeDigitNumber(number) {
    let word = "";

    if (number.length === 3 && number[0] !== "0") {
        word += ones[number[0]] + " Hundred ";
    }

    const lastTwoDigits = number.slice(-2);
    word += convertTwoDigitNumber(lastTwoDigits);

    return word.trim();
}

function clearDisplay() {
    document.getElementById("currencyInput").value = "";
    document.getElementById("wordOutput").value = "";
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function calculateResult() {
    try {
        let result = eval(document.getElementById("display").value);
        document.getElementById("display").value = result;
    } catch (error) {
        alert("Invalid Input");
        clearDisplay();
    }
}



document.addEventListener('keydown', function(event) {
    const key = event.key;
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace', 'Escape','='];

    if (allowedKeys.includes(key)) {
        event.preventDefault(); // Prevent default behavior

        if (key === 'Enter' || key === '=') {
            calculateResult();
        } else if (key === 'Backspace') {
            document.getElementById("display").value = document.getElementById("display").value.slice(0, -1);
        } else if (key === 'Escape') {
            clearDisplay();
        } else {
            appendToDisplay(key);
        }
    }
});
let input = "" //in word right spot, IN WORD WRONG SPOT, _ letter was incorrect
let wrong_chars = []
let valid = true
let words = []
let file

fetch('/MushyPotato.github.io/valid-wordle-words.txt')
    .then(response => response.text())
    .then(data => {
        file = data.trim().split("\n");
    })
    .catch(error => console.error('Error fetching file:', error));

function word_reader() {
    console.log(input);
    if (!file) {
        console.error('Word list file not loaded')
        return
    }
    for (i = 0; i < file.length; i++) {
        valid = true
        if (!wrong_chars.some(char => file[i].includes(char))) {
            for (x = 0; x < input.length; x++) {
                if (input.charAt(x) !== "_" && input.charAt(x).toLowerCase() == input.charAt(x)) {
                    if (file[i].charAt(x) !== input.charAt(x)) {
                        valid = false
                        break
                    }
                }
            }
            for (y = 0; y < input.length; y++) {
                if (input.charAt(y) !== "_" && input.charAt(y).toLowerCase() !== input.charAt(y)) {
                    if (!file[i].includes(input.charAt(y).toLowerCase()) || file[i].charAt(y) == input.charAt(y).toLowerCase()) {
                        valid = false
                        break
                    }
                }
            }
            if (valid == true) {
                words.push(file[i])
            }
        }
    }
    if (words.length > 0) {
        const groupedWords = [];
        for (let i = 0; i < words.length; i += 3) {
            const group = words.slice(i, i + 3).join(' ');
            groupedWords.push(group);
        }
        document.getElementById("button").innerHTML = groupedWords.join('<br>');
    } else {
        document.getElementById("button").innerHTML = "No words fit these rules";
    }
}

function click_func() {
    let word = prompt("Please enter the word", "Word");
    input = word
    word_reader()
}

class QuizGame {
    constructor() {
        this.questions = [
            // Single Choice Questions (1-5)
            {
                id: 1,
                type: 'single',
                question: 'Which HTML element is used for the largest heading?',
                options: ['<h1>', '<h6>', '<header>', '<heading>'],
                correct: [0],
                explanation: '<h1> represents the largest/most important heading in HTML.'
            },
            {
                id: 2,
                type: 'single',
                question: 'What does CSS stand for?',
                options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
                correct: [1],
                explanation: 'CSS stands for Cascading Style Sheets.'
            },
            {
                id: 3,
                type: 'single',
                question: 'Which CSS property is used to change the text color?',
                options: ['text-color', 'color', 'font-color', 'text-style'],
                correct: [1],
                explanation: 'The "color" property is used to set the text color in CSS.'
            },
            {
                id: 4,
                type: 'single',
                question: 'What is the correct way to create a function in JavaScript?',
                options: ['function = myFunction() {}', 'function myFunction() {}', 'create myFunction() {}', 'function:myFunction() {}'],
                correct: [1],
                explanation: 'Functions in JavaScript are declared with the "function" keyword followed by the function name.'
            },
            {
                id: 5,
                type: 'single',
                question: 'Which HTML attribute is used to define inline styles?',
                options: ['class', 'style', 'styles', 'css'],
                correct: [1],
                explanation: 'The "style" attribute is used to apply inline CSS styles to HTML elements.'
            },
            
            // Multiple Choice Questions (6-10)
            {
                id: 6,
                type: 'multiple',
                question: 'Which of the following are valid CSS selectors? (Select all that apply)',
                options: ['.class-name', '#id-name', 'element', '*'],
                correct: [0, 1, 2, 3],
                explanation: 'All options are valid CSS selectors: class (.class), ID (#id), element (tag), and universal (*).'
            },
            {
                id: 7,
                type: 'multiple',
                question: 'Which JavaScript data types are considered primitive? (Select all that apply)',
                options: ['string', 'number', 'object', 'boolean', 'undefined'],
                correct: [0, 1, 3, 4],
                explanation: 'Primitive types in JavaScript include: string, number, boolean, undefined, null, symbol, and bigint. Object is not primitive.'
            },
            {
                id: 8,
                type: 'multiple',
                question: 'Which HTML elements are semantic elements? (Select all that apply)',
                options: ['<article>', '<div>', '<section>', '<span>', '<header>'],
                correct: [0, 2, 4],
                explanation: 'Semantic elements have meaning: <article>, <section>, <header>. <div> and <span> are generic containers.'
            },
            {
                id: 9,
                type: 'multiple',
                question: 'Which CSS properties affect the box model? (Select all that apply)',
                options: ['margin', 'padding', 'border', 'color', 'width'],
                correct: [0, 1, 2, 4],
                explanation: 'Box model properties include: margin, padding, border, width, and height. Color affects text/background color.'
            },
            {
                id: 10,
                type: 'multiple',
                question: 'Which methods can be used to select DOM elements? (Select all that apply)',
                options: ['getElementById()', 'querySelector()', 'getElementsByClassName()', 'selectElement()'],
                correct: [0, 1, 2],
                explanation: 'Valid DOM selection methods: getElementById(), querySelector(), getElementsByClassName(). selectElement() does not exist.'
            },
            
            // Fill in the Blanks Questions (11-15) - Easy Questions
            {
                id: 11,
                type: 'fill',
                question: 'Complete the HTML tag: <___ href="https://google.com">Visit Google</___>',
                blanks: ['a', 'a'],
                explanation: 'The <a> tag creates hyperlinks. The href attribute specifies the URL destination.'
            },
            {
                id: 12,
                type: 'fill',
                question: 'Complete the CSS property: p { color: ___; font-size: ___px; }',
                blanks: ['red', '16'],
                explanation: 'The color property sets text color, and font-size sets the size of text in pixels.'
            },
            {
                id: 13,
                type: 'fill',
                question: 'Complete the JavaScript variable: var name = "___"; let age = ___;',
                blanks: ['John', '25'],
                explanation: 'JavaScript variables can store strings (in quotes) and numbers (without quotes).'
            },
            {
                id: 14,
                type: 'fill',
                question: 'Complete the HTML form: <input type="___" placeholder="Enter your ___">',
                blanks: ['text', 'name'],
                explanation: 'Input type="text" creates a text field, placeholder shows hint text inside the input.'
            },
            {
                id: 15,
                type: 'fill',
                question: 'Complete the CSS class: .___ { background-color: ___; }',
                blanks: ['header', 'blue'],
                explanation: 'CSS classes start with a dot (.) and background-color sets the background color of elements.'
            }
        ];
        
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.score = 0;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showInstructions();
    }
    
    bindEvents() {
        document.getElementById('startQuiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('submitBtn').addEventListener('click', () => this.submitQuiz());
        document.getElementById('restartQuiz').addEventListener('click', () => this.restartQuiz());
        document.getElementById('showAnswers').addEventListener('click', () => this.showAnswerReview());
        document.getElementById('backToResults').addEventListener('click', () => this.showResults());
    }
    
    showInstructions() {
        this.hideAllScreens();
        document.getElementById('instructions').classList.add('active');
    }
    
    startQuiz() {
        this.currentQuestion = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.score = 0;
        this.hideAllScreens();
        document.getElementById('quiz').classList.add('active');
        this.displayQuestion();
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        
        // Update progress bar
        document.querySelector('.progress-fill').style.width = progress + '%';
        
        // Update question info
        document.getElementById('questionNumber').textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;
        document.getElementById('questionType').textContent = this.getQuestionTypeLabel(question.type);
        document.getElementById('questionText').textContent = question.question;
        
        // Clear previous options
        const optionsContainer = document.getElementById('answerOptions');
        optionsContainer.innerHTML = '';
        
        // Add a small delay to ensure DOM is updated
        setTimeout(() => {
            // Display answer options based on question type
            if (question.type === 'single') {
                this.displaySingleChoice(question, optionsContainer);
            } else if (question.type === 'multiple') {
                this.displayMultipleChoice(question, optionsContainer);
            } else if (question.type === 'fill') {
                this.displayFillInBlanks(question, optionsContainer);
            }
            
            // Restore previous answers after options are rendered
            setTimeout(() => {
                this.restoreAnswers();
            }, 50);
        }, 50);
        
        // Update navigation buttons
        document.getElementById('prevBtn').style.display = this.currentQuestion === 0 ? 'none' : 'inline-block';
        document.getElementById('nextBtn').style.display = this.currentQuestion === this.questions.length - 1 ? 'none' : 'inline-block';
        document.getElementById('submitBtn').style.display = this.currentQuestion === this.questions.length - 1 ? 'inline-block' : 'none';
    }
    
    displaySingleChoice(question, container) {
        console.log('Displaying single choice for question:', question);
        question.options.forEach((option, index) => {
            console.log(`Option ${index}: ${option}`);
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            
            const radioId = `q${question.id}_option${index}`;
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `question${question.id}`;
            radioInput.value = index;
            radioInput.id = radioId;
            
            const label = document.createElement('label');
            label.htmlFor = radioId;
            label.textContent = option;
            
            optionDiv.appendChild(radioInput);
            optionDiv.appendChild(label);
            
            // Add click event to the entire option div
            optionDiv.addEventListener('click', (e) => {
                // Prevent double-clicking if clicking directly on radio button
                if (e.target.type !== 'radio') {
                    radioInput.checked = true;
                }
                this.saveAnswer([index]);
                this.updateOptionStyles();
            });
            
            // Add change event to the radio input
            radioInput.addEventListener('change', () => {
                this.saveAnswer([index]);
                this.updateOptionStyles();
            });
            
            container.appendChild(optionDiv);
        });
    }
    
    displayMultipleChoice(question, container) {
        console.log('Displaying multiple choice for question:', question);
        question.options.forEach((option, index) => {
            console.log(`Option ${index}: ${option}`);
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            
            const checkboxId = `q${question.id}_option${index}`;
            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.name = `question${question.id}`;
            checkboxInput.value = index;
            checkboxInput.id = checkboxId;
            
            const label = document.createElement('label');
            label.htmlFor = checkboxId;
            label.textContent = option;
            
            optionDiv.appendChild(checkboxInput);
            optionDiv.appendChild(label);
            
            // Add click event to the entire option div
            optionDiv.addEventListener('click', (e) => {
                // Prevent double-clicking if clicking directly on checkbox
                if (e.target.type !== 'checkbox') {
                    checkboxInput.checked = !checkboxInput.checked;
                }
                this.saveMultipleAnswer();
                this.updateOptionStyles();
            });
            
            // Add change event to the checkbox input
            checkboxInput.addEventListener('change', () => {
                this.saveMultipleAnswer();
                this.updateOptionStyles();
            });
            
            container.appendChild(optionDiv);
        });
    }
    
    displayFillInBlanks(question, container) {
        const fillContainer = document.createElement('div');
        fillContainer.className = 'fill-blank-container';
        
        let questionText = question.question;
        const blanks = question.blanks;
        let blankIndex = 0;
        
        // Replace ___ with input fields
        questionText = questionText.replace(/___/g, () => {
            return `<input type="text" class="blank-input" data-blank="${blankIndex++}" placeholder="Type answer...">`;
        });
        
        fillContainer.innerHTML = `<div class="fill-blank-question">${questionText}</div>`;
        container.appendChild(fillContainer);
        
        // Add event listeners to inputs
        const inputs = fillContainer.querySelectorAll('.blank-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.saveFillAnswer());
        });
    }
    
    saveAnswer(answer) {
        this.userAnswers[this.currentQuestion] = answer;
    }
    
    saveMultipleAnswer() {
        const checkboxes = document.querySelectorAll(`input[name="question${this.questions[this.currentQuestion].id}"]:checked`);
        const selectedValues = Array.from(checkboxes).map(cb => parseInt(cb.value));
        this.userAnswers[this.currentQuestion] = selectedValues;
    }
    
    saveFillAnswer() {
        const inputs = document.querySelectorAll('.blank-input');
        const answers = Array.from(inputs).map(input => input.value.trim().toLowerCase());
        this.userAnswers[this.currentQuestion] = answers;
    }
    
    restoreAnswers() {
        const savedAnswer = this.userAnswers[this.currentQuestion];
        if (!savedAnswer) return;
        
        const question = this.questions[this.currentQuestion];
        
        if (question.type === 'single') {
            if (savedAnswer.length > 0) {
                const radio = document.getElementById(`q${question.id}_option${savedAnswer[0]}`);
                if (radio) radio.checked = true;
            }
        } else if (question.type === 'multiple') {
            savedAnswer.forEach(value => {
                const checkbox = document.getElementById(`q${question.id}_option${value}`);
                if (checkbox) checkbox.checked = true;
            });
        } else if (question.type === 'fill') {
            const inputs = document.querySelectorAll('.blank-input');
            inputs.forEach((input, index) => {
                if (savedAnswer[index]) {
                    input.value = savedAnswer[index];
                }
            });
        }
        
        this.updateOptionStyles();
    }
    
    updateOptionStyles() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            const input = option.querySelector('input');
            if (input && input.checked) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    }
    
    submitQuiz() {
        this.calculateScore();
        this.showResults();
    }
    
    calculateScore() {
        this.score = 0;
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            if (!userAnswer) return;
            
            if (question.type === 'single') {
                if (userAnswer.length > 0 && question.correct.includes(userAnswer[0])) {
                    this.score++;
                }
            } else if (question.type === 'multiple') {
                const correctSet = new Set(question.correct);
                const userSet = new Set(userAnswer);
                if (correctSet.size === userSet.size && 
                    [...correctSet].every(x => userSet.has(x))) {
                    this.score++;
                }
            } else if (question.type === 'fill') {
                let allCorrect = true;
                question.blanks.forEach((correctAnswer, blankIndex) => {
                    if (!userAnswer[blankIndex] || 
                        userAnswer[blankIndex].toLowerCase() !== correctAnswer.toLowerCase()) {
                        allCorrect = false;
                    }
                });
                if (allCorrect) {
                    this.score++;
                }
            }
        });
    }
    
    showResults() {
        this.hideAllScreens();
        document.getElementById('results').classList.add('active');
        
        // Display final score
        document.getElementById('finalScore').textContent = `${this.score}/${this.questions.length}`;
        
        // Calculate breakdown scores
        const singleScore = this.calculateCategoryScore('single', 0, 5);
        const multipleScore = this.calculateCategoryScore('multiple', 5, 10);
        const fillScore = this.calculateCategoryScore('fill', 10, 15);
        
        document.getElementById('singleScore').textContent = `${singleScore}/5`;
        document.getElementById('multipleScore').textContent = `${multipleScore}/5`;
        document.getElementById('fillScore').textContent = `${fillScore}/5`;
        
        // Display score message
        const percentage = (this.score / this.questions.length) * 100;
        const scoreMessage = this.getScoreMessage(percentage);
        document.getElementById('scoreMessage').textContent = scoreMessage;
    }
    
    calculateCategoryScore(type, startIndex, endIndex) {
        let categoryScore = 0;
        for (let i = startIndex; i < endIndex; i++) {
            const question = this.questions[i];
            const userAnswer = this.userAnswers[i];
            
            if (!userAnswer) continue;
            
            if (type === 'single') {
                if (userAnswer.length > 0 && question.correct.includes(userAnswer[0])) {
                    categoryScore++;
                }
            } else if (type === 'multiple') {
                const correctSet = new Set(question.correct);
                const userSet = new Set(userAnswer);
                if (correctSet.size === userSet.size && 
                    [...correctSet].every(x => userSet.has(x))) {
                    categoryScore++;
                }
            } else if (type === 'fill') {
                let allCorrect = true;
                question.blanks.forEach((correctAnswer, blankIndex) => {
                    if (!userAnswer[blankIndex] || 
                        userAnswer[blankIndex].toLowerCase() !== correctAnswer.toLowerCase()) {
                        allCorrect = false;
                    }
                });
                if (allCorrect) {
                    categoryScore++;
                }
            }
        }
        return categoryScore;
    }
    
    getScoreMessage(percentage) {
        if (percentage >= 90) return "Outstanding! You're a frontend development expert! 🎉";
        if (percentage >= 80) return "Excellent work! You have strong frontend skills! 👏";
        if (percentage >= 70) return "Good job! You're on the right track! 👍";
        if (percentage >= 60) return "Not bad! Keep practicing to improve! 📚";
        return "Keep learning! Practice makes perfect! 💪";
    }
    
    showAnswerReview() {
        this.hideAllScreens();
        document.getElementById('answerReview').classList.add('active');
        
        const reviewContent = document.getElementById('reviewContent');
        reviewContent.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-question';
            
            const userAnswer = this.userAnswers[index];
            const isCorrect = this.isAnswerCorrect(question, userAnswer);
            
            reviewDiv.innerHTML = `
                <h3>Question ${index + 1}: ${question.question}</h3>
                <div class="review-answer">
                    <strong>Your Answer:</strong> 
                    <span class="user-answer">${this.formatUserAnswer(question, userAnswer)}</span>
                    <span class="answer-status ${isCorrect ? 'status-correct' : 'status-incorrect'}">
                        ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                </div>
                <div class="review-answer">
                    <strong>Correct Answer:</strong> 
                    <span class="correct-answer">${this.formatCorrectAnswer(question)}</span>
                </div>
                <div class="review-answer">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;
            
            reviewContent.appendChild(reviewDiv);
        });
    }
    
    isAnswerCorrect(question, userAnswer) {
        if (!userAnswer) return false;
        
        if (question.type === 'single') {
            return userAnswer.length > 0 && question.correct.includes(userAnswer[0]);
        } else if (question.type === 'multiple') {
            const correctSet = new Set(question.correct);
            const userSet = new Set(userAnswer);
            return correctSet.size === userSet.size && 
                   [...correctSet].every(x => userSet.has(x));
        } else if (question.type === 'fill') {
            return question.blanks.every((correctAnswer, index) => 
                userAnswer[index] && 
                userAnswer[index].toLowerCase() === correctAnswer.toLowerCase()
            );
        }
        return false;
    }
    
    formatUserAnswer(question, userAnswer) {
        if (!userAnswer) return 'No answer provided';
        
        if (question.type === 'single') {
            return userAnswer.length > 0 ? question.options[userAnswer[0]] : 'No answer';
        } else if (question.type === 'multiple') {
            return userAnswer.length > 0 ? 
                   userAnswer.map(index => question.options[index]).join(', ') : 
                   'No answers selected';
        } else if (question.type === 'fill') {
            return userAnswer.join(', ');
        }
        return 'No answer';
    }
    
    formatCorrectAnswer(question) {
        if (question.type === 'single') {
            return question.options[question.correct[0]];
        } else if (question.type === 'multiple') {
            return question.correct.map(index => question.options[index]).join(', ');
        } else if (question.type === 'fill') {
            return question.blanks.join(', ');
        }
        return '';
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.score = 0;
        this.startQuiz();
    }
    
    getQuestionTypeLabel(type) {
        switch(type) {
            case 'single': return 'Single Choice';
            case 'multiple': return 'Multiple Choice';
            case 'fill': return 'Fill in the Blanks';
            default: return 'Question';
        }
    }
    
    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }
}

// Initialize the quiz when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
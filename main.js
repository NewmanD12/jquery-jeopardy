let tableHeader = document.querySelector('#headers-row')
let row200 = document.querySelector('#row-200')
let row400 = document.querySelector('#row-400')
let row600 = document.querySelector('#row-600')
let row800 = document.querySelector('#row-800')
let row1000 = document.querySelector('#row-1000')
let question = document.querySelector('#question')
let submitButton = document.querySelector('#submitAnswer')
let userAnswer = document.querySelector('#answer')
let htmlScore = document.querySelector('#score')
let score = 0
let currentQuestion = ''
let currentQuestionValue = 0
let correctAnswer = ''


let readJeopardyData = async () => {
    let rawJeopardyData = await fetch('jeopardy.json')
    let data = await rawJeopardyData.json()
    let groupDataByEpisode = _.groupBy(data, 'showNumber')
    let showNumbers = Object.keys(groupDataByEpisode)
    let randomNum = Math.floor(Math.random() * showNumbers.length)
    let episodeNum = showNumbers[randomNum]
    let episode = groupDataByEpisode[episodeNum]
    let episodeRounds = _.groupBy(episode, 'round')
    let jeopardyRoundQuestions = episodeRounds['Jeopardy!']
    let jeopardyRoundCategories = _.groupBy(jeopardyRoundQuestions, 'category')
    let jeopardyRoundCategoriesList = Object.keys(jeopardyRoundCategories)
    for(let category of jeopardyRoundCategoriesList){
        let header = document.createElement('th')
        header.innerText = category
        tableHeader.appendChild(header)
        let question200 = jeopardyRoundCategories[category][0]
        let question400 = jeopardyRoundCategories[category][1]
        let question600 = jeopardyRoundCategories[category][2]
        let question800 = jeopardyRoundCategories[category][3]
        let question1000 = jeopardyRoundCategories[category][4]
        let square200 = document.createElement('td')
        let square400 = document.createElement('td')
        let square600 = document.createElement('td')
        let square800 = document.createElement('td')
        let square1000 = document.createElement('td')
        square200.innerText = '$200'
        square200.addEventListener('click', () =>{
            console.log(question200.answer)
            currentQuestion = ''
            clearInput()
            currentQuestion += question200.question
            question.innerText = currentQuestion
            correctAnswer = question200.answer.toLowerCase()
            currentQuestionValue = question.innerText === 'This square has already been answered, choose again!' ? 0 : 200
            square200.innerText = ''
            question200.answer = ''
            question200.question = 'This square has already been answered, choose again!'
        })
        square400.innerText = '$400'
        square400.addEventListener('click', () =>{
            console.log(question400.answer)
            currentQuestion = ''
            clearInput()
            currentQuestion += question400.question
            question.innerText = currentQuestion
            correctAnswer = question400.answer.toLowerCase()
            currentQuestionValue = question.innerText === 'This square has already been answered, choose again!' ? 0 : 400
            square400.innerText = ''
            question400.answer = ''
            question400.question = 'This square has already been answered, choose again!'
        })
        square600.innerText = '$600'
        square600.addEventListener('click', () =>{
            console.log(question600.answer)
            currentQuestion = ''
            clearInput()
            currentQuestion += question600.question
            question.innerText = currentQuestion
            correctAnswer = question600.answer.toLowerCase()
            currentQuestionValue = question.innerText === 'This square has already been answered, choose again!' ? 0 : 600
            square600.innerText = ''
            question600.answer = ''
            question600.question = 'This square has already been answered, choose again!'
        })
        square800.innerText = '$800'
        square800.addEventListener('click', () =>{
            console.log(question800.answer)
            currentQuestion = ''
            clearInput()
            currentQuestion += question800.question
            question.innerText = currentQuestion
            correctAnswer = question800.answer.toLowerCase()
            currentQuestionValue = question.innerText === 'This square has already been answered, choose again!' ? 0 : 800
            square800.innerText = ''
            question800.answer = ''
            question800.question = 'This square has already been answered, choose again!'
        })
        square1000.innerText = '$1000'
        square1000.addEventListener('click', () =>{
            console.log(question1000.answer)
            currentQuestion = ''
            clearInput()
            currentQuestion += question1000.question
            currentQuestionValue = question1000.value
            question.innerText = currentQuestion
            correctAnswer = question1000.answer.toLowerCase()            
            currentQuestionValue = question.innerText === 'This square has already been answered, choose again!' ? 0 : 1000
            // console.log(currentQuestionValue)
            square1000.innerText = ''
            question1000.answer = ''
            question1000.question = 'This square has already been answered, choose again!'
        })
        row200.appendChild(square200)
        row400.appendChild(square400)
        row600.appendChild(square600)
        row800.appendChild(square800)
        row1000.appendChild(square1000)

    }

    submitButton.addEventListener('click', () => {
        if(currentQuestion.length < 1){
            question.innerText = 'You must select a question first.'
        } else {
            if(userAnswer.value.toLowerCase() === correctAnswer){
                question.innerText = `That is correct! You are awarded $${currentQuestionValue}`
                userAnswer.value = ''
                score += currentQuestionValue
                htmlScore.innerText = score
            }
            else{
                question.innerText = `Sorry, the correct answer is ${correctAnswer}`
                userAnswer.value = ''
            }
        }
    })
}

function clearInput(){
    userAnswer.value = ''
}

readJeopardyData()
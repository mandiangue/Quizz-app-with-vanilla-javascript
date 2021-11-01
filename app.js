            const questions = [
              {
                id: 1, question: "A quel écrivain doit-on le personnage de Boule-de-Suif ?",
                reponses: { a: "Guy de Maupassant", b: "Victor Hugo", c: "Honoré de Balzac" },
                correct: "Guy de Maupassant"
              },


              {
                id: 2, question: "Quel conseil régional est présidé par Ségolène Royal depuis 2004 ?",

                reponses: { a: "Charentes-maritime", b: "Poitou-Charentes", c: "Haut-de-France" },
                correct: "Poitou-Charentes"
              },

              {
                id: 3, question: "De quel pays Tirana est-elle la capitale ?",
                reponses: { a: "le Kossovo", b: "L'Albanie", c: "L'Ukraine" },
                correct: "L'Albanie"
              },

              {
                id: 4, question: "En géométrie, combien de côtés possède un losange ?",
                reponses: { a: "7", b: "3", c: "4" },
                correct: "4"
              },

              {
                id: 5, question: "Quel est l'impératif du verbe peindre à la 2e personne du pluriel ?",
                reponses: { a: "Pegnez", b: "Peigniez", c: "Peignez" },
                correct: "Peignez"
              }

            ];

            // ButtonS selector

            const centerSide = document.querySelector('.center-side')
            const topInside = document.querySelector('.top-inside')
            const laQuestion = document.querySelector('.lesQuestions')
            const topResult = document.querySelector('.top-result')
            const goodResponse = document.querySelector('.good-response')
            const badResponse = document.querySelector('.bad-response')
            const responseChoice = document.querySelector('.response-choice')
            const btnModal = document.querySelector('.modal')
            const btnClose = document.querySelector('.close-btn')
            const reponsesQuestions = document.querySelector('.responses')
            const bonneReponseSelectionner = document.querySelector('.selection')
            const scorePoint = document.querySelector('.score')

            //Button next and prev
            const BtnNext = document.querySelector('.btn-next')
            const BtnPrev = document.querySelector('.btn-prev')

            //BUTTON EVENTS LISTENER
            BtnNext.addEventListener('click', nextQuestion)
            BtnPrev.addEventListener('click', previewQuestion)
            //list.addEventListener('click', choisirReponse)
            reponsesQuestions.addEventListener('click', showGoodResponse)

            //EVENTS LISTENER
            window.addEventListener('DOMContentLoaded', loadQuestions)

            let currentQuestions = 0
            let bonneReponse = 0
            let bonneAnswer = 0

            //FUNCTION LOAD QUESTIONS
            function loadQuestions() {
              showQuestions(currentQuestions)
              showGoodResponse(bonneReponse)

            }
            //FUNCTION SHOW QUESTIONS
            function showQuestions(question) {
              const item = questions[question]

              topInside.textContent = `Question N° ${item.id}/${questions.length}`
              laQuestion.textContent = item.question
              bonneReponseSelectionner.textContent = "Selectionnez votre réponse"
              const response = []
              for (const letter in item.reponses) {
                response.push(
                  `<button type="button" class="reponses">
                      ${item.reponses[letter]}
                    </button>`
                )
                reponsesQuestions.innerHTML = response.join("")

              }

            }

            //GET RESPONSES
            function showGoodResponse(reponse) {

              const bnreponse = questions[reponse]

              const paragraf = reponsesQuestions.querySelectorAll('button')

              paragraf.forEach(data => {
                data.addEventListener('click', (e) => {
               
                    data.style.pointerEvents= 'none'
                  const targetP = e.currentTarget.textContent.trim()
                  if (targetP === bnreponse.correct) {
                    bonneAnswer++
                    goodResponse.style.display = "block"
                    goodResponse.classList.add('good-response')
                    data.style.backgroundColor = "green"
                    data.style.color = "white"
                    setTimeout(() => {
                      goodResponse.style.display = "none"
                    }, 1000)
                    disableBtn()
                  }
                 
                  if (targetP !== bnreponse.correct) {
                    bonneAnswer += 0
                    badResponse.style.display = "block"
                    badResponse.classList.add('bad-response')
                    data.style.backgroundColor = "red"
                    data.style.color = "white"
                    bonneReponseSelectionner.innerHTML = `La bonne réponse est: <span class="reponseGood">${bnreponse.correct}</span> `
                
                    setTimeout(() => {
                      badResponse.style.display = "none"
                    }, 1000)
                    disableBtn()
                  }
                 
                })
               
              })
              scorePoint.innerHTML = `<h4>SCORE: ${bonneAnswer}/${questions.length}</h4>`
            }

            // DISABLE OTHERS BUTTONS AFTER STARTING THE QUIZZ
             function disableBtn() {
             const btnDisabled= reponsesQuestions.querySelectorAll('button')
             btnDisabled.forEach(btn=>{
               btn.style.pointerEvents= 'none'
             })
            }
           
            //BUTTON NEXT AND PREVIEW FUNCTION
            function nextQuestion() {
              currentQuestions++
              bonneReponse++
              if (currentQuestions > questions.length - 1) {
                currentQuestions = 0
                bonneAnswer = 0
                bonneReponse= 0
              }

              showQuestions(currentQuestions)
              showGoodResponse(bonneReponse)
            }

            function previewQuestion() {
              currentQuestions--
              bonneReponse--
              if (currentQuestions < 0) {
                currentQuestions = questions.length - 1
              }

              showQuestions(currentQuestions)
              showGoodResponse(bonneReponse)
            }



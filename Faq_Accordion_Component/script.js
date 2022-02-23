'use strict'

const question_box = document.querySelector('.question-box')

question_box.addEventListener('click',evt => {

    if (evt.target.classList.contains('fa-chevron-down') || evt.target.classList.contains('question-head-text')){
      evt.target.closest('.question').classList.toggle('active')
    }
})
'use strict'


const btn = document.querySelector('.btn');
const form = document.querySelector('.form')
const input = document.querySelector('.mailinput')
const error = document.querySelector('.error p')
const erricon = document.querySelector('.error-icon')


 form.addEventListener('submit',evt => {
     evt.preventDefault()
     if (!input.checkValidity() || input.validity.valueMissing) {
         error.textContent = 'Please provide a valid email'
         error.classList.add('show')
         erricon.classList.add('show')
     }else if(!input.validity.valueMissing){
         error.classList.remove('show')
         error.textContent = ''
         erricon.classList.remove('show')
     }
     console.log(input.validity)




 })

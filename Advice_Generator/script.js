'use strict'

const title = document.querySelector('.advice-title')
const desc = document.querySelector('.advice-text')
const btn = document.querySelector('.btn')



const getAdvice = async () =>{
    try{
        const response = await fetch('https://api.adviceslip.com/advice?t=' + Math.random());
        if (!response.ok){
            throw new Error('Api connection problem')
        }
        const responseJson = await response.json();
        const data = responseJson.slip;
        const id = `ADVICE #${data.id}`;
        const advice = `"${data.advice}"`;
        title.textContent = id;
        desc.textContent = advice;

    }
    catch (e) {
        console.error(e)
    }

}
window.addEventListener('DOMContentLoaded',()=>  getAdvice())


btn.addEventListener('click', () => {
    getAdvice()
})

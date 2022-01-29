'use strict'
const sharebtn = document.querySelector('.btn-container');
const sharebox = document.querySelector('.share-box')

sharebtn.addEventListener('click',function (e){
    e.preventDefault()
    sharebox.classList.toggle('hidden')

})
document.addEventListener('keydown',function (e){
    if (e.key == 'Escape'){
        sharebox.classList.add('hidden')

    }
})
document.body.addEventListener('click',function (e){
/*    console.log(e.target)
    console.log(!(e.target.classList.contains('evn')))*/

    if (!(e.target.classList.contains('evn')) && !(e.target.classList.contains('share-btn'))){
        sharebox.classList.add('hidden')
    }
})


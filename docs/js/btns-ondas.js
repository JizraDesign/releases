const btns = document.querySelectorAll('.btn');

for(let i = 0; i < btns.length; i++){
// btns.forEach(boton => {
    btns[i].addEventListener('click', e => {

        if(btns[i].href ){
            e.preventDefault();
        };
        let x = e.clientX - btns[i].getBoundingClientRect().left;
        let y = e.clientY - btns[i].getBoundingClientRect().top;

        let ondas = document.createElement('span');
        ondas.setAttribute('class', 'ondas');
        ondas.style.left = x +'px';
        ondas.style.top = y + 'px';
        btns[i].appendChild(ondas);
        setTimeout(()=>{
            ondas.remove();
            if(btns[i].href ){
                window.location.href = btns[i].href;
            };
        },1000);
    });
};
// Light box Gallery ceada por Jizra Diseño Web® para https://jizratest.eu5.org todos los derechos reservados©
// >>>>> -->>>>> ----- funcion para estructurar galeria ----- <<<<<-- <<<<<

//     Uso
//   ------
//   Cuatro parámetros :
//   'parent' = el elemento que necesita ser envuelto
//   'wrapper' = el elemento que envolverá al parent
//   'atributo' = el atributo que necesita que tenga este elemento
//   'attributevalue' = el valor del atributo que acaba de crear
 
//   Ejemplo
//   -------
//   wrapInner ('body', 'div', 'class', 'my-class');
console.log('%c versionde de desarrollo','background: #ff0000; color: #fff');
console.log('%c If you have to ask, you\'ll never know. If you know, you need only ask.','background: #000; color: #fff');
console.log('%c Gallery Light Box by https://fb.me/jizradesign','background: #000; color: #fff');
// >>>>> -->>>>> ----- estructura de galleria ----- <<<<<-- <<<<<

const imgFront = document.querySelectorAll(".jd-front__img__gallery");
class Gallery{
    constructor(imagen, i){
        this._imagen = imagen,
        this._item = i;
    };

    crearGallery(){
        if(this._imagen.hasAttribute("src")){
            const contGall = document.querySelector("#jd-cont__gallery");
            this.wrapInner(contGall, 'section', 'class', `jd-front__item__gallery`);
            let jdGallery = document.querySelectorAll('.jd-front__item__gallery');
            let img = jdGallery[this._item].appendChild(document.createElement('img'));
                img.setAttribute('loading', 'lazy');
                fetch(this._imagen.src)
                .then(res => res.blob())
                .then(data => {
                    let imgen = URL.createObjectURL(data);
                    img.setAttribute('src', imgen);
                });
                if(this._imagen.dataset.urlImg != ""){
                    fetch(this._imagen.dataset.urlImg)
                    .then(res => res.blob())
                    .then(data => {
                        let imgen = URL.createObjectURL(data);
                        img.setAttribute('data-url-img', imgen);
                    });
                }else{
                    img.setAttribute('data-url-img',"");
                };
                img.setAttribute('data-title-img', this._imagen.dataset.titleImg);
                img.setAttribute('data-desc-img', this._imagen.dataset.descImg);
                img.setAttribute('alt', this._imagen.alt);
            this._imagen.remove();
        };
    };

    wrapInner(parent, wrapper, attribute, attributevalue) {
        if(typeof wrapper === "string") {
            wrapper = parent.appendChild(document.createElement(wrapper));
            wrapper.setAttribute(attribute, attributevalue);
        };
    };
    
};

imgFront.forEach( (img, i) => {
    let newImagen = new Gallery(img, i);
    newImagen.crearGallery();
});

// >>>>> -->>>>> ----- light box ----- <<<<<-- <<<<<
class LightBox{
    constructor(imagen, i){
        this._imagen = imagen,
        this._item = i;
    };

    lightBox(){

        let lightBoxPadre = document.querySelector('body').appendChild(document.createElement('section'));
            lightBoxPadre.setAttribute("id","jd-light-box");
            lightBoxPadre.setAttribute("class","center");

        const lightBox = document.querySelector('#jd-light-box');


        let lightBoxCont = document.createElement('section'),
            dataUrl = this._imagen.dataset.urlImg,
            dataTitle = this._imagen.dataset.titleImg,
            dataDesc = this._imagen.dataset.descImg,
            ubicacionImg = "";
        
        if(dataUrl!==""){
            ubicacionImg=dataUrl;
        }else{
            ubicacionImg=this._imagen.src;
        };

        let panel=` <div id="btn-clouse-lbox"class="center"title="Cerrar"><i class="far fa-times-circle"></i></div>
                    <img id="img-panel"src="${ubicacionImg}">
                    <div class="descripcion">
                        <p class="data-title">${dataTitle}</p>
                        <p class="data-desc">${dataDesc}</p>
                        <p class="data-cont">Imagen ${this._item+1} de ${imgGallery.length}</p>
                        <span class="e-firm">Gallery by <a href="https://jizratest.eu5.org">Jizra</a></span>
                    </div>
                    <div id="derecha"class="flecha"title="Derecha"><i class="fas fa-chevron-right"></i></div>
                    <div id="izquierda"class="flecha"title="Izquierda"><i class="fas fa-chevron-left"></i></div>
                    <section class="cont__pre-loader">
                        <section class="loader">
                            <span class="loader__span"></span>
                            <span class="loader__span"></span>
                            <section class="jizra__logo">
                                <img loading="lazy" src="https://jizratest.eu5.org/img/diseno-jizra-logo.png" alt="Jizra Logo" class="jizra__logo__img">
                            </section>
                        </section>
                        <section class="loader__texto">
                            <span class="loader__texto__span">L</span>
                            <span class="loader__texto__span">O</span>
                            <span class="loader__texto__span">A</span>
                            <span class="loader__texto__span">D</span>
                            <span class="loader__texto__span">I</span>
                            <span class="loader__texto__span">N</span>
                            <span class="loader__texto__span">G</span>
                            <span class="loader__texto__span">.</span>
                            <span class="loader__texto__span">.</span>
                            <span class="loader__texto__span">.</span>
                        </section>
                    </setion>`;

        if(!document.querySelector('#jd-light-box-cont')){

            lightBox.classList.add('active');
            lightBoxCont.setAttribute("id","jd-light-box-cont");
            lightBoxCont.setAttribute("class","jd-light-box-cont center");
            lightBoxCont.innerHTML=panel;
            lightBox.appendChild(lightBoxCont);

            let imgPanel=document.querySelector('#img-panel');
            imgPanel.addEventListener('load',()=>{
                document.querySelector('.cont__pre-loader').style.display='none';
                setTimeout(function(){
                    document.querySelector('#img-panel').classList.add('active');
                    document.querySelector('.descripcion').style.width = '100%';
                    let flecha = document.querySelectorAll('.flecha');
                    flecha.forEach(flechaI => {
                        flechaI.style.display = 'flex';
                    })
                },300);
            });
            
            document.querySelector('#btn-clouse-lbox').addEventListener('click',()=>{
                this.borrarlightbox();
            });
            document.querySelector('#derecha').addEventListener('click',()=>{
                if(this._imagen.parentNode.nextElementSibling){
                    this.avance(this._imagen.parentNode.nextElementSibling.querySelector('img'),this._item + 1 );
                };
            });
            document.querySelector('#izquierda').addEventListener('click',()=>{
                if(this._imagen.parentNode.previousElementSibling){
                    this.avance(this._imagen.parentNode.previousElementSibling.querySelector('img'),this._item - 1);
                };
            });
            window.addEventListener('keyup', e => {    
                this.teclas(e);
            });
        };

        let letra = document.querySelectorAll('.loader__texto__span');
        
        for(let i = 0; i < letra.length; i++){
            letra[i].style = `animation: texto 2s ease-in-out ${0.1 * i}s infinite;`
        };

    };

    // >>>>> -->>>>> ----- controles ----- <<<<<-- <<<<<
    
    borrarlightbox(){
        const lightBox = document.querySelector('#jd-light-box');
        lightBox.classList.remove('active');
        setTimeout(() => {
            document.querySelector('#jd-light-box').remove();
        },500);
    };

    avance(element, i){
        let res = element;
        this.borrarlightbox();
        if(res){
            setTimeout(() => {
                let imagen = new LightBox(res, i);
                imagen.lightBox();
            }, 500);
        };
    };

    teclas(e){    
        if(e.keyCode==27){
            this.borrarlightbox();
        };
    };


};

const imgGallery = document.querySelectorAll('.jd-front__item__gallery');

imgGallery.forEach((img, i) => {
    img.addEventListener("click", e => {
        let imagen = new LightBox(e.target, i);
            imagen.lightBox();
    });
});


// >>>>> -->>>>> ----- animaciones ----- <<<<<-- <<<<<

window.addEventListener('load', e => {
    let img = document.querySelectorAll('.jd-front__item__gallery img');
    img.forEach(imagen => {
        imagen.addEventListener('mouseenter', e => {
            for(imagenes of img){
                imagenes.style.filter = 'grayscale(100%)';
            };
            imagen.style.transform = 'scale(1.5)';
            imagen.style.filter = 'grayscale(0%)';
        });
        imagen.addEventListener('mouseleave', e => {
            for(imagenes of img){
                imagenes.style.filter = 'grayscale(0%)';
            };
            imagen.style.transform = 'scale(1)';
        });
    });
});
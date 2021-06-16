/**
 * Clase para crear un slider
 */
 class JdSlider{
    /**
     * Constructor
     * @param {String} padre Contenedor padre del Slider se requiere el id del elemento padre
     * @param {String} item Item de slider, requiere la clase de los elementos hijo
     */
    constructor(padre, item){
        this._padre=padre,
        this._item=item;
    };

    /**
     * Metodo para inicializar el slider
     * @param {Boolean} auto Si el atributo es true el slider trabajara automaticamente
     * @param {Number} timer tiempo de trancicion en milisegundos
     */
    run(auto, timer){
        
        const carrusel = document.querySelector(this._padre);
        let itemCarrusel = carrusel.querySelectorAll(`.${this._item}`);
        
        carrusel.style="position:relative; display:flex; flex-wrap: nowrap; justify-content: flex-start; overflow: hidden; width:100%";
        itemCarrusel.forEach(item=>item.style.minWidth='100%');
        
        const firstClone = itemCarrusel[0].cloneNode(true),
            lastClone = itemCarrusel[itemCarrusel.length -1].cloneNode(true);

            firstClone.classList.add("first-clone");
            lastClone.classList.add("last-clone");
            carrusel.append(firstClone);
            carrusel.prepend(lastClone);
            
        // >>>>> -->>>>> ----- controles ----- <<<<<-- <<<<<
        let controlls = carrusel.appendChild(document.createElement('div'));
            controlls.setAttribute('id', 'jd-nav__carrusel--'+this._item);
            controlls.setAttribute('class', 'center');
        let arrow = controlls.appendChild(document.createElement('div'));
            arrow.setAttribute('id','jd-btn-prev__carrusel--'+this._item);
        let icon = arrow.appendChild(document.createElement('i'));
            icon.setAttribute('class','fas fa-angle-double-left');
            arrow.innerHTML += 'Prev';
        let cotnCircles = controlls.appendChild(document.createElement('div'));
            cotnCircles.setAttribute('id', 'jd-cont__circle__carrusel--'+this._item);
            cotnCircles.setAttribute('class','center');
        for(let i = 0; i < itemCarrusel.length; i++){
            let circles = cotnCircles.appendChild(document.createElement('div'));
            circles.setAttribute('class', 'jd-circles__carruscel--'+this._item);
        };
        arrow = controlls.appendChild(document.createElement('div'));
            arrow.setAttribute('id','jd-btn-next__carrusel--'+this._item);
            arrow.innerHTML = 'Next';
        icon = arrow.appendChild(document.createElement('i'));
            icon.setAttribute('class','fas fa-angle-double-right');
        // >>>>> -->>>>> ----- dedo ----- <<<<<-- <<<<<
        let contDedo = carrusel.appendChild(document.createElement('div'));
            contDedo.setAttribute('class', 'dedo-swipe animacion');
        let dedo = contDedo.appendChild(document.createElement('div'));
            dedo.setAttribute('class', 'dedo');
        let iconDedo = dedo.appendChild(document.createElement('i'));
            iconDedo.setAttribute('class', 'fas fa-hand-point-up');

        // >>>>> -->>>>> ----- contador ----- <<<<<-- <<<<<
        let indexCarrusel = 1,
            mov;
        movimiento(this._item);

        let next = carrusel.querySelector('#jd-btn-next__carrusel--'+this._item),
            prev = carrusel.querySelector('#jd-btn-prev__carrusel--'+this._item), 
            circleItems = carrusel.querySelectorAll('.jd-circles__carruscel--'+this._item);

        next.addEventListener('click', ()=> movimiento(this._item,'next'));
        prev.addEventListener('click', ()=> movimiento(this._item,'prev'));

        circleItems.forEach( ( circle, i ) => {
            circle.addEventListener('click', ()=> {
                indexCarrusel = i +1;
                movimiento(this._item);
            });
        })

        // >>>>> -->>>>> ----- swipe ----- <<<<<-- <<<<<

        var inicioX;
        // punto inicial del swipe
        for(let i = 0; i < itemCarrusel.length; i++){
            itemCarrusel[i].addEventListener('touchstart', (event)=>{
                inicioX = event.touches[0].clientX;
            });
        };
        // swipe
        for(let i = 0; i < itemCarrusel.length; i++){
            itemCarrusel[i].addEventListener('touchmove', (event)=>{
                var toque = event.touches[0];
                var swipe = inicioX - toque.clientX;
                // var pantalla = screen.width / 8;
                itemCarrusel.forEach( item => {
                    let pixels = itemCarrusel[i].clientWidth * indexCarrusel;
                    itemCarrusel[0].style.marginLeft=`-${pixels + (swipe*2)}px`;
                });
                
            });
        };
        // punto final del swipe
        for(let i = 0; i < itemCarrusel.length; i++){
            itemCarrusel[i].addEventListener('touchend', (event)=>{
                var swipe = inicioX - event.changedTouches[0].clientX;
                var pantalla = screen.width / 3;
                if(swipe > pantalla){
                    if(indexCarrusel < itemCarrusel.length-2){
                        movimiento(this._item,'next');
                    }else{
                        itemCarrusel[0].style.marginLeft=`-${indexCarrusel * 100}%`;
                    };
                }else if(swipe < -1 -pantalla){
                    if(indexCarrusel > 0){
                        movimiento(this._item,'prev');
                    }else{
                        itemCarrusel[0].style.marginLeft=`-${indexCarrusel * 100}%`;
                    };
                }else{
                    itemCarrusel[0].style.marginLeft=`-${indexCarrusel * 100}%`;
                };
            });
        };

        /**
         * Funcion para el movimiento del Slider
         * @param {String} item Item de Slider
         * @param {String} direccion next | prev
         */
        function movimiento( item, direccion ){            
            itemCarrusel = carrusel.querySelectorAll(`.${item}`);
            itemCarrusel[0].style.transition = 'all 0.3s ease';
            
            // >>>>> -->>>>> ----- validar direcion de movimiento ----- <<<<<-- <<<<<
            
            if(direccion === 'next'){
                if(indexCarrusel <= itemCarrusel.length -2 ){
                    indexCarrusel++
                }else{
                    indexCarrusel = 1;
                };
            }else if(direccion === 'prev'){
                if(indexCarrusel >= 1){
                    indexCarrusel--;
                }else{
                    indexCarrusel = itemCarrusel.length-2;
                };
            };
            // >>>>> -->>>>> ----- validar los clones ----- <<<<<-- <<<<<
           
            if(itemCarrusel[indexCarrusel].classList.contains("last-clone")){
                
                setTimeout(() => {
                    itemCarrusel[0].style.transition = 'none';
                    indexCarrusel = itemCarrusel.length -2;
                    itemCarrusel[0].style.marginLeft=`-${indexCarrusel * 100}%`;
                }, 300);
            }else if(itemCarrusel[indexCarrusel].classList.contains("first-clone")){
               
                setTimeout(() => {
                    itemCarrusel[0].style.transition = 'none';
                    indexCarrusel = 1;
                    itemCarrusel[0].style.marginLeft=`-${indexCarrusel * 100}%`;
                }, 300);
            };
            // >>>>> -->>>>> ----- hacer movimiento ----- <<<<<-- <<<<<
            
            itemCarrusel[0].style.marginLeft=`-${indexCarrusel * 100}%`;
            // >>>>> -->>>>> ----- circulos ----- <<<<<-- <<<<<
            
            let circleItems = carrusel.querySelectorAll('.jd-circles__carruscel--'+item),
                iCircle = indexCarrusel -1;
            // >>>>> -->>>>> ----- remover circulo activo ----- <<<<<-- <<<<<
            
            circleItems.forEach(circle=>circle.classList.remove('active'));
            
            // >>>>> -->>>>> ----- validar circulos vs imagenes ----- <<<<<-- <<<<<
            
            if(indexCarrusel < 1){
                iCircle = circleItems.length -1;
            }else if(indexCarrusel > circleItems.length){
                iCircle = 0;
            };
            // >>>>> -->>>>> ----- agregar circulo activo ----- <<<<<-- <<<<<
            circleItems[iCircle].classList.add('active');
        };
        setTimeout(()=>{
            carrusel.querySelector('.dedo-swipe').classList.remove('animacion');
            carrusel.querySelector('.dedo-swipe').style.display='none';
        },5000);

        if(auto === true ){
            
            if(timer && typeof(timer) === "number"){
                /**
                 * Funcion para movimiento automatico del slier
                 * @param {Number} timer Tiempo de trancicion
                 * @param {String} item Item de Slider
                */
                function autoplay(timer, item){

                    mov = setInterval(()=>{
                        movimiento(item,'next');
                    }, timer);

                };

                carrusel.addEventListener('mouseenter', () => {
                    clearInterval(mov);
                });

                carrusel.addEventListener('mouseleave', ()=> {
                    autoplay(timer, this._item);
                });

                autoplay(timer, this._item);
            }else{

                console.error("Error in run() if the first parameter is true, the second must be of type number. timer = " + timer +" typeof " + typeof(timer) )

            };
            
        };
    };
};
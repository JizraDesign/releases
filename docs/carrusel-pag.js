const carrusel=document.querySelector('#jd-carrusel');let itemCarrusel=document.querySelectorAll('.jd-item__carrusel');const firstClone=itemCarrusel[0].cloneNode(true),lastClone=itemCarrusel[itemCarrusel.length-1].cloneNode(true);firstClone.id='first-clone';lastClone.id='last-clone';carrusel.append(firstClone);carrusel.prepend(lastClone);let controlls=carrusel.appendChild(document.createElement('div'));controlls.setAttribute('id','jd-nav__carrusel');controlls.setAttribute('class','center');let arrow=controlls.appendChild(document.createElement('div'));arrow.setAttribute('id','jd-btn-prev__carrusel');let icon=arrow.appendChild(document.createElement('i'));icon.setAttribute('class','fas fa-angle-double-left');arrow.innerHTML+='Prev';let cotnCircles=controlls.appendChild(document.createElement('div'));cotnCircles.setAttribute('id','jd-cont__circle__carrusel');cotnCircles.setAttribute('class','center');for(let i=0;i<itemCarrusel.length;i++){let circles=cotnCircles.appendChild(document.createElement('div'));circles.setAttribute('class','jd-circles__carruscel');};arrow=controlls.appendChild(document.createElement('div'));arrow.setAttribute('id','jd-btn-next__carrusel');arrow.innerHTML='Next';icon=arrow.appendChild(document.createElement('i'));icon.setAttribute('class','fas fa-angle-double-right');let indexCarrusel=1,mov;movimiento();window.addEventListener('load',()=>{let next=document.querySelector('#jd-btn-next__carrusel'),prev=document.querySelector('#jd-btn-prev__carrusel'),circleItems=document.querySelectorAll('.jd-circles__carruscel');next.addEventListener('click',()=>movimiento('next'));prev.addEventListener('click',()=>movimiento('prev'));for(let i=0;i<circleItems.length;i++){circleItems[i].addEventListener('click',()=>{indexCarrusel=i+1;movimiento();});};});var inicioX;for(let i=0;i<itemCarrusel.length;i++){itemCarrusel[i].addEventListener('touchstart',(event)=>{inicioX=event.touches[0].clientX;});}
for(let i=0;i<itemCarrusel.length;i++){itemCarrusel[i].addEventListener('touchmove',(event)=>{var toque=event.touches[0];var swipe=inicioX-toque.clientX;var pantalla=screen.width / 8;for(let i=0;i<itemCarrusel.length;i++){let pixels=itemCarrusel[i].clientWidth*indexCarrusel;itemCarrusel[0].style.marginLeft=`-${(indexCarrusel*100)+pixels+swipe}px`;};});}
for(let i=0;i<itemCarrusel.length;i++){itemCarrusel[i].addEventListener('touchend',(event)=>{var swipe=inicioX-event.changedTouches[0].clientX;var pantalla=screen.width / 3;if(swipe>pantalla){if(indexCarrusel<itemCarrusel.length-2){movimiento('next');}else{itemCarrusel[0].style.marginLeft=`-${indexCarrusel*100}%`;};}else if(swipe<-1-pantalla){if(indexCarrusel>0){movimiento('prev');}else{itemCarrusel[0].style.marginLeft=`-${indexCarrusel*100}%`;};}else{itemCarrusel[0].style.marginLeft=`-${indexCarrusel*100}%`;};});}
function movimiento(direccion){itemCarrusel=document.querySelectorAll('.jd-item__carrusel');itemCarrusel[0].style.transition='all 0.3s ease';if(direccion==='next'){if(indexCarrusel<=itemCarrusel.length-2){indexCarrusel++}else{indexCarrusel=1;}}else if(direccion==='prev'){if(indexCarrusel>=1){indexCarrusel--;}else{indexCarrusel=itemCarrusel.length-2;}};if(itemCarrusel[indexCarrusel].id==="last-clone"){setTimeout(()=>{itemCarrusel[0].style.transition='none'
indexCarrusel=itemCarrusel.length-2;itemCarrusel[0].style.marginLeft=`-${indexCarrusel*100}%`;},300);}else if(itemCarrusel[indexCarrusel].id==="first-clone"){setTimeout(()=>{itemCarrusel[0].style.transition='none'
indexCarrusel=1;itemCarrusel[0].style.marginLeft=`-${indexCarrusel*100}%`;},300);};itemCarrusel[0].style.marginLeft=`-${indexCarrusel*100}%`;let circleItems=document.querySelectorAll('.jd-circles__carruscel'),iCircle=indexCarrusel-1;circleItems.forEach(circle=>circle.classList.remove('active'));if(indexCarrusel<1){iCircle=circleItems.length-1;}else if(indexCarrusel>circleItems.length){iCircle=0;}
circleItems[iCircle].classList.add('active');};setTimeout(function(){document.querySelector('.dedo-swipe').classList.remove('animacion');document.querySelector('.dedo-swipe').style.display='none';},5000)
function autoplay(){mov=setInterval(()=>{movimiento('next');},3000);};carrusel.addEventListener('mouseenter',()=>clearInterval(mov));carrusel.addEventListener('mouseleave',autoplay);autoplay();
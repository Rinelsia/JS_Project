'use strict'
     // объявление переменных
        var control=document.getElementById("control");
        var infoResurs=document.getElementById("infoResurs"),   infoArm=document.getElementById("infoArm");
        var pole = document.getElementById("pole"),
            mapKart = document.getElementById("mapKart"), map=document.getElementById("map");  
        var textZamok = ['Замок','Казармы','Селение','Добыча ресурсов'];
        var textArmy = ['Пехота','Лучники','Конные','Осадные орудия'];
        var kolArm = [0, 0, 0, 0], ur=[1, 1, 1, 1], nResrved=[200, 250, 150, 100, 10, 15, 25, 50];// чилса по порядку в nResrved - начальный набор ресурсов для развития [Замок, Казармы, Селение, Добыча ресурсов, пехота, Лучники, Конные, Осадные орудия]
        var strMenuZamok='',  strMenuKazarma ='', strMenuRes='';
        var kolvoArmy = ['','','',''], nameArmy = [''];
        var res = 10000;
        
        // запускаем функции подсчета войск и выведение в левое информационное окно
        // нижнее меню замка и функцию создания блоков изображения строений замка
        nArmy();
        clickMenuControlZamok();
        domoy();
        
        
        
        // Функция смены на карту
        function clickMap (){
            var strVilag='';
            for (i=0; i<2; i++){
                strVilag+="<div id='vilag"+i+"' class='cursor' style='height:40px; width: 40px;'></div>";
            }            
           var strMap="<div class='mapKarta'>"+strVilag+"</div>";
            pole.innerHTML = strMap;
            
                // поиск элементов, деревни на карте
            var vilag0=document.getElementById("vilag0");
            var vilag1=document.getElementById("vilag1");
            var vilag2=document.getElementById("vilag2");
            var vilag3=document.getElementById("vilag3");
            //вешаем слушателя на каждого из них
            vilag0.addEventListener("click",domoy,false);
            vilag1.addEventListener("click",clickMenuControlAtaka,false);
            vilag2.addEventListener("click",domoy,false);
            vilag3.addEventListener("click",domoy,false);
        }
        
         // функция возврата в меню замка создание блоков расположения строений замка
        function domoy (){
            var strVilag='<div id="zamok" class="cursor"></div><div id="kazarma" class="cursor"></div><div id="selo" class="cursor"></div>            <div id="resurs" class="cursor"></div>';
            pole.innerHTML = strVilag;
//            var control=document.getElementById("control");
            var zamok = document.getElementById("zamok");
            var kazarma = document.getElementById("kazarma");
            var selo = document.getElementById("selo");
            var resurs = document.getElementById("resurs");
            
            //слушатель на кватдрате замок            
            zamok.addEventListener("click", clickMenuControlZamok, false);
            //слушатель на квадрате казарма
            kazarma.addEventListener("click",clickMenuControlKazarma, false);
            //слушатель на иконке карта
            map.addEventListener("click", clickMap, false);
        }
        
        // добыча ресурсов с определенным интервалом времени
        setInterval(function resTime(){
           res=res+Math.ceil(ur[3]*1.2);
            console.log(res);
            strMenuRes=strMenuRes+"<span>"+res+"</span>"
            infoResurs.innerHTML = strMenuRes;
            strMenuRes='';
            },2000);
        
        //функция меню атаки на другие замки на карте
       function clickMenuControlAtaka () {
           var strTablAtt="<div id='menuAtaka'><div class='floatt'><p style='margin-bottom: 10px'>Армия |</p>";
             var strP='';
             var strDivOff1 ='</div><div class="floatt">';
             var strTabP1 =' <p>Доступно</p> <table>';
             var strTabP2 ='<p>Отправить</p><table>';
             var strTabOff='</table>';
             var divOff2 ='</div></div>'
             var strTabl1 =''; 
             var strTabl2 =''
               for (i=0;i<textArmy.length; i++){
                   strP=strP+"<p>"+textArmy[i]+"</p>";
                   strTabl1=strTabl1+'<tr><td>1</td></tr>';
                   strTabl2=strTabl2+'<tr><td>2</td></tr>';
               }
             control.innerHTML = strTablAtt+strP+strDivOff1+strTabP1+strTabl1+strTabOff+strDivOff1+strTabP2+strTabl2+strTabOff+divOff2;
       }
        //функция клика на иконке замок
        function clickMenuControlZamok(event){            
                for (var i=0; i<4; i++){
                    
                    strMenuZamok += "<div><span>"+textZamok[i]+"</span><span id='ur"+i+"'>  "+ur[i]+" Уровень </span><button onclick='func"+i+"()'>|^|</button><span id='reserved"+i+"'> Нужно ресурсов "+nResrved[i]+" </span> </div>";
                    control.innerHTML = strMenuZamok;
                    
                }
            strMenuZamok = '';
        }
        
        //функция клика на иконке казармы
        function clickMenuControlKazarma (event){
            
                for (var i=0; i<4;i++){
                    strMenuKazarma +="<div id='army'>"+
                "<div id='nameArmy"+i+"' style='background-color: aqua;height: 73%;'>"+textArmy[i]+"</div> <div  style='background-color: aqua;height: 21%;    margin-top: 3%;'><span id='kolvoArmy"+i+"' >"+kolArm[i]+"</span></div>"+
                "</div>";
//                    var a = String(i);
//                     kolvoArmy[i] = ('kolvoArmy'+a);
//                     nameArmy[i] = 'nameArmy'+a;
//                    nameArmy[i]=document.getElementById("nameArmy"+i)
////                   
//                    console.log(kolvoArmy);
//                    console.log(nameArmy);
                    
                control.innerHTML = strMenuKazarma;
                }
            // вешаем обработчик на набор войск
            var nameArmy0=document.getElementById("nameArmy0");
            var nameArmy1=document.getElementById("nameArmy1");
            var nameArmy2=document.getElementById("nameArmy2");
            var nameArmy3=document.getElementById("nameArmy3");
            nameArmy0.addEventListener("click",kolArmy0, false);
            nameArmy1.addEventListener("click",kolArmy1, false);
            nameArmy2.addEventListener("click",kolArmy2, false);
            nameArmy3.addEventListener("click",kolArmy3, false);
            strMenuKazarma = '';
        }
        
        //функция понятия уровня замка и защиты
       function func0 (){
           
           if (res<nResrved[0]){
               alert('Не достаточно ресурсов');
           } else {
               res=res-nResrved[0];
               nResrved[0]=Math.ceil(nResrved[0]*1.2);
               ur[0] = ur[0]+1;
               span0=document.getElementById("ur0");
               span=document.getElementById("reserved0")   
               span0.outerHTML = "<span id='ur0'> "+ur[0]+" Уровень</span>";
               span.outerHTML = "<span id='reserved0'> Нужно ресурсов "+nResrved[0]+" </span>"
           console.log(ur);
           }
       }
        //функция поднять уровень казармы. Чем выше уровень тем меньше ресурсов требуется для набора войск
        function func1 (){
              if (res<nResrved[1]){
               alert('Не достаточно ресурсов');
           } else {
               res=res-nResrved[1];
               nResrved[1]=Math.ceil(nResrved[1]*1.2);
               ur[1] = ur[1]+1;
               span0=document.getElementById("ur1");
               span=document.getElementById("reserved1");
                span0.outerHTML = "<span id='ur1'> "+ur[1]+" Уровень </span>";
                span.outerHTML = "<span id='reserved1'> Нужно ресурсов "+nResrved[1]+" </span>"
           }
       }
        
        // функция поднять уровень поселения
        function func2 (){
             if (res<nResrved[2]){
               alert('Не достаточно ресурсов');
           } else {
               res=res-nResrved[2];
               nResrved[2]=Math.ceil(nResrved[2]*1.2);
           ur[2] = ur[2]+1;
           span0=document.getElementById("ur2");
            span=document.getElementById("reserved2")
           span0.outerHTML = "<span id='ur2'> "+ur[2]+" Уровень </span>";
               span.outerHTML = "<span id='reserved2'> Нужно ресурсов "+nResrved[2]+" </span>"
           }
       }
        
        // функция добычи ресурсов, поднимаем уровень
        function func3 (){
            if (res<nResrved[3]){
               alert('Не достаточно ресурсов');
           } else {
                res=res-nResrved[3];
               nResrved[3]=Math.ceil(nResrved[3]*1.5);
              
           ur[3] = ur[3]+1;
           span0=document.getElementById("ur3");
            span=document.getElementById("reserved3")
            span0.outerHTML = "<span id='ur3'> "+ur[3]+" Уровень</span>";
            span.outerHTML = "<span id='reserved3'> Нужно ресурсов "+nResrved[3]+" </span>"
           }
       }
        // далее работа с функциями набора вида войск
        //пехота
        function kolArmy0 (){
            if (res<nResrved[4]){
               alert('Не достаточно ресурсов');
           } else {
               res=res-nResrved[4];
            kolArm[0]=kolArm[0]+1;
            span=document.getElementById("kolvoArmy0");
            span.outerHTML = "<span id='kolvoArmy0'>"+kolArm[0]+"</span>";
            console.log(kolArm);
               nArmy();
           }
        }
        //лучники
        function kolArmy1 (){
             if (res<nResrved[5]){
               alert('Не достаточно ресурсов');
           } else {
               res=res-nResrved[5];
            kolArm[1]=kolArm[1]+1;
            span=document.getElementById("kolvoArmy1");
            span.outerHTML = "<span id='kolvoArmy1'> "+kolArm[1]+" </span>";
            console.log(kolArm);
                nArmy();
           }
        }
        //конные
        function kolArmy2 (){
            if (res<nResrved[6]){
               alert('Не достаточно ресурсов');
           } else {
               res=res-nResrved[6];
            kolArm[2]=kolArm[2]+1;
            span=document.getElementById("kolvoArmy2");
            span.outerHTML = "<span id='kolvoArmy2'> "+kolArm[2]+" </span>";
            console.log(kolArm);
             nArmy();
           }
        }
        //Осадные орудия
        function kolArmy3 (){
            if (res<nResrved[7]){
               alert('Не достаточно ресурсов');
           } else {
               res=res-nResrved[7];
            kolArm[3]=kolArm[3]+1;
            span=document.getElementById("kolvoArmy3");
            span.outerHTML = "<span id='kolvoArmy3'> "+kolArm[3]+" </span>";
            console.log(kolArm);
             nArmy();
           }
        }
        // Подсчет войск и выведение их в левое информационное окно
        function nArmy () {
            var n =0;
            for (i=0; i<kolArm.length; i++){
                n=n+kolArm[i];
            }
            infoArm.innerHTML = "<div><p>Пех "+kolArm[0]+"</p><p>Луч "+kolArm[1]+"</p><p>Кон "+kolArm[2]+"</p><p>Оса "+kolArm[3]+"</p><p>Число войск</p><p>"+n+"</p></div>"
        }
        
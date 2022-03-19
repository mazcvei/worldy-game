//Api palabras: https://palabras-aleatorias-public-api.herokuapp.com/random-by-length?length=4
//https://palabras-aleatorias-public-api.herokuapp.com/random

//const app = (() => {
     let length_word = 6;
     const attempts = 6;
     let current_attemp = 0;
     let current_letter = 0;
     let word_hidden='';
     let word_current_written = '';
     const btns_letter = document.getElementsByClassName('letter');
     let letters_clicked = 0;
     for(btn of btns_letter){
         btn.addEventListener('click',(e)=>{
            let letter_click;
             if(e.target.nodeName=='P'){
                letter_click=e.target.parentElement.dataset.letter;
                insertar_letra(letter_click)
                current_letter++;
            
             }else{
                letter_click=e.target.dataset.letter;
                insertar_letra(letter_click)
                current_letter++;
               
             }
                console.log(letter_click);
         })
    
     }

     const obtener_palaba = (length_word)=>{
      fetch(`https://palabras-aleatorias-public-api.herokuapp.com/random-by-length?length=${length_word}`)
      .then(response => response.json())
      .then((data) => {
         word_hidden = data['body']['Word'];
         iniciar_juego()
      })
      .catch(function(error) {
         console.log('Hubo un problema con la petición Fetch: ' + error.message);
       });
     }

     const validar_palabra = (palabra_introducida)=>{
      let validacion = false;
      fetch(`https://palabras-aleatorias-public-api.herokuapp.com/palabras-aleatorias?Word=${palabra_introducida}`)
      .then(response => response.json())
      .then((data) => {
         //console.log(data);
         //console.log(data['body']);
         if(data['body'][0]['Word']){
            validacion = true;
         }
         console.log(validacion);
         if(validacion){
            comprobar_palabra(palabra_introducida);
         }
         
         // iniciar_juego()
      })
      .catch(function(error) {
         console.log(validacion);
         console.log('Hubo un problema con la petición Fetch: ' + error.message);
       });
     }
     const comprobar_palabra = (palabra_introducida)=>{
      console.log('Comprobando palabra...');
        for (letra in palabra_introducida){
           if(word_hidden.includes(palabra_introducida[letra])){
              console.log('La palabra oculta incluye esta letra');
           }
           if(word_hidden[letra]==palabra_introducida[letra]){
              console.log('Letra y posicion correta');
           }
           console.log(palabra_introducida[letra]);
        }
         
      }

     const iniciar_juego = ()=>{

     }

     const crear_bloques = (length_word)=>{
           const content_all_blocks = document.getElementById('content_blocks')
            for(i=0;i<attempts;i++){
               let div_content_row = document.createElement('div')
               div_content_row.id=`attemp_${i}`;
               div_content_row.className='row_letters';
               for(j=0;j<length_word;j++){
                  let block_letter = document.createElement('div')
                  block_letter.className='block_letter';
                  block_letter.id=`letter_${j}`;
                  div_content_row.appendChild(block_letter)
               }
               content_all_blocks.appendChild(div_content_row)
               if(i==0){
                  div_content_row.classList.add('row_letters_active')
               }
               
            }
     }

     const insertar_letra = (letter_click)=>{
         let bloques_fila_actual = document.querySelector(`#attemp_${current_attemp} #letter_${current_letter}`);
         bloques_fila_actual.innerHTML = `<p>${letter_click}</p>`
         word_current_written+=letter_click;
         console.log(word_current_written)
         if(current_letter==length_word-1){
            validar_palabra(word_current_written.toLowerCase())
         }
      
     }
  

     crear_bloques(length_word)
     obtener_palaba(length_word);
     


     
// })();


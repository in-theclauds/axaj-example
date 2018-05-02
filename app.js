$(document).ready(function(){

  $('.submit-button').click(function(){
    
     const whichPoke = $(".which-poke").val();

     console.log(whichPoke)

    
    axios({
      method: "GET",
      url: `https://www.pokeapi.co/api/v2/pokemon/${whichPoke}` 
      // params: "URL parameters to be sent with the request" ,
    })
    .then(theThingWeGetBackFromApi => {
      //Here we can do whatever we want with the response object
      console.log(theThingWeGetBackFromApi.data)
      $('.pokeinfo').append(`
      <h3> Name: ${theThingWeGetBackFromApi.data.name}</h3>
      <h4> Height: ${theThingWeGetBackFromApi.data.height}</h4>
      <h4> Weight: ${theThingWeGetBackFromApi.data.weight}</h4>
      
      
      
      
      `)
      
      
    })
    .catch(err => {
      //Here we catch the error and display it
      
      
      
      console.log(err);
    })
    
  }) //end pokebutton click


    $('.characters-button').click(function(){

      axios.get(`https://ih-crud-api.herokuapp.com/characters`)
        // params: "URL parameters to be sent with the re
      .then(response => {
        $('.iron-characters').empty();
        response.data.forEach(function(oneCharacter){
            // console.log(oneCharacter.name)
            $('.iron-characters').append(`
              <h3>Name: ${oneCharacter.name}</h3>
              <p>Occupation: ${oneCharacter.occupation}</p>
              <p>Weapon: ${oneCharacter.weapon}</p>
              <p>Debt: ${oneCharacter.debt}</p>
            
            `)
        })
      })
      .catch(err => {
        console.log(err);
        //Here we catch the error and display
      })


 })


 $('.new-char-button').click(function(){
  // console.log("new char button clicked")
  const name = $('.char-name').val();
  const occupation = $('.char-occ').val();
  const weapon = $('.char-weapon').val();
  
  const charInfo = {
    name: $('.char-name').val(),
    occupation: $('.char-occ').val(),
    weapon: $('.char-weapon').val()
  }

  axios.post(`https://ih-crud-api.herokuapp.com/characters/`, charInfo) 
    .then(response => {
      console.log("character successfully created", response)
    })
    .catch(err => {
        console.log(err)

    })
  }) //end new char link

  $('.char-edit-button').click(function(){
    const whichCharacter = $('.which-character').val()
    const charInfo = {
      name: $('.char-name').val(),
      occupation: $('.char-occ').val(),
      weapon: $('.char-weapon').val()
    }
      axios.put(`https://ih-crud-api.herokuapp.com/characters/${whichCharacter}`, charInfo)
      .then(response => {
        console.log("success", response)
      })
      .catch(error => {
        console.log(error);
      })
  });

  
    $('.which-character').change(function(){
      const whichCharacter = $('.which-character').val()

      axios.get(`https://ih-crud-api.herokuapp.com/characters/${whichCharacter}`)
      .then(response => {
        // console.log(response.data)
        //info below inserts itself into the input when we click edit character
        $('.char-name').val(response.data.name)
        $('.char-occ').val(response.data.occupation)
        $('.char-weapon').val(response.data.weapon)
      })
      .catch(err => {
        console.log(err)
      })
    })
});





 //end document ready
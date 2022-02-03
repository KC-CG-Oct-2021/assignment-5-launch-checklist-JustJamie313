// const { myFetch } = require("./scriptHelper.js");

window.addEventListener("load", function() {

//    let listedPlanets;
//    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
//    let listedPlanetsResponse;
//    listedPlanetsResponse.then(function (result) {
//        listedPlanets = result;
//        console.log(listedPlanets);
//    }).then(function () {
//        console.log(listedPlanets);
//        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
//    })
   
   let form = document.querySelector('form');
   form.addEventListener('submit',function(event){
        let doc = document;
        let list;
        let pilot = doc.querySelector('#pilotName').value;
        let coPilot = doc.querySelector('input[name=copilotName]').value;
        let fuelLevel = doc.querySelector('input[name=fuelLevel]').value;
        let cargoMass = doc.querySelector('input[name=cargoMass]').value;
        let valid = formSubmission(doc,list,pilot,coPilot,fuelLevel,cargoMass);
        if(!valid){
            event.preventDefault();
        }
        event.preventDefault();
   });
});
try{
   const { myFetch } = require("./scriptHelper.js");
} catch (error){
   
}

window.addEventListener("load", function(e) {
    
    let listedPlanets;
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
    }).then(function () {
       let chosenPlanet = pickPlanet(listedPlanets);
       addDestinationInfo(document,chosenPlanet['name'],chosenPlanet['diameter'],chosenPlanet['star'],chosenPlanet['distance'],chosenPlanet['moons'],chosenPlanet['image']);
    })
   
   let form = document.querySelector('form');
   form.addEventListener('submit',function(event){
        let doc = document;
        let w = doc.defaultView || doc.parentWindow;
        w.name = 'launchReport';
        let list = doc.querySelector('#faultyItems');
        let pilot = doc.querySelector('#pilotName').value;
        let coPilot = doc.querySelector('input[name=copilotName]').value;
        let fuelLevel = doc.querySelector('input[name=fuelLevel]').value;
        let cargoMass = doc.querySelector('input[name=cargoMass]').value;
        let valid = formSubmission(doc,list,pilot,coPilot,fuelLevel,cargoMass,w);
        if(!valid){
            event.preventDefault();
        }
        event.preventDefault();
   });
   document.querySelector('#faultyItems').style.visibility = 'hidden';
});
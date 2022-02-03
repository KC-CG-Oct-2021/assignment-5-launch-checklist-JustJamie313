// Write your helper functions here!
// require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

function validateInput(testInput) {
   if(testInput !== ''){
       if(isNaN(testInput)){
           return "Not a Number";
       }
       return "Is a Number";
   }
   return "Empty";
}
function formSubmission(doc, list, pilot, copilot, fuelLevel, cargoLevel) {
    let valid = true;
    let msg = '';
    for(let a=2;a<arguments.length;a++){
        let result = validateInput(arguments[a]);
        switch (a){
            case 2:
                switch (result){
                    case ('Not a Number'):
                        updatePilotStatus(doc,`${arguments[a]}`,'Ready.');
                    break;
                    case ('Is a Number'):
                        valid = false;
                        updatePilotStatus(doc,'',`Pilot Name cannot be a number. Not Ready`);
                    break;
                    case ('Empty'):
                        valid = false;
                        msg = 'All fields are required.';
                        updatePilotStatus(doc,`${arguments[a]}`,'Pilot Name cannot be empty. Not Ready.');
                    break;
                }
            break;
            case 3:
                switch (result){
                    case ('Not a Number'):
                        updateCopilotStatus(doc,`${arguments[a]}`,`Ready.`);
                    break;
                    case ('Is a Number'):
                        valid = false;
                        updateCopilotStatus(doc,'',`Co-Pilot Name cannot be a number. Not Ready`);
                    break;
                    case ('Empty'):
                        valid = false;
                        msg = 'All fields are required.';
                        updateCopilotStatus(doc,`${arguments[a]}`,'Co-Pilot Name cannot be empty. Not Ready.');
                    break;
                }
            break;
            case 4:
                switch (result){
                    case ('Not a Number'):
                        valid = false;
                        updateFuelStatus(doc,'Fuel Level must be a number. Not Ready.');
                    break;
                    case ('Is a Number'):
                        if(arguments[a]<10000){
                            valid = false;
                            updateFuelStatus(doc,'Insufficient fuel for this journey.  Not Ready');
                        } else {
                            updateFuelStatus(doc,'Fuel Ready.');
                        }
                    break;
                    case ('Empty'):
                        valid = false;
                        msg = 'All fields are required.';
                        updateFuelStatus(doc,'Fuel Level cannot be empty. Not Ready.');
                    break;
                }
            break;
            case 5:
                switch (result){
                    case ('Not a Number'):
                        valid = false;
                        updateCargoStatus(doc,'Cargo Mass must be a number. Not Ready');
                    break;
                    case ('Is a Number'):
                        if(arguments[a]>10000){
                            valid = false;
                            updateCargoStatus(doc,'Cargo Mass exceeds shuttle capacity.  Not Ready');
                        } else {
                            updateCargoStatus(doc,'Cargo Ready.');
                        }
                    break;
                    case ('Empty'):
                        valid = false;
                        msg = 'All fields are required.';
                        updateCargoStatus(doc,'Cargo Mass cannot be empty (enter 0 for no cargo). Not Ready.');
                    break;
                }
            break;
        }
    }
    if(valid === false){
        if(msg){
            window.alert(msg);
        }
        showFaultyItems(doc);
        updateStatus(doc,"Shuttle not ready for launch");
    } else {
        hideFaultyItems(doc);
        updateStatus(doc,"Shuttle is ready for launch");
    }
    return valid;
}
function updateStatus(doc,status){
    let statusReport = doc.querySelector('#launchStatus');
    statusReport.innerHTML = status;
    switch(status){
        case ("Shuttle is ready for launch"):
            statusReport.style.color = 'green';
        break;
        default:
            statusReport.style.color = 'red';
    }
}
function updatePilotStatus(doc,pilot,status){
    let p = doc.querySelector('#pilotStatus');
    p.innerHTML = `${pilot} ${status}`;
}
function updateCopilotStatus(doc,pilot,status){
    let cp = doc.querySelector('#copilotStatus');
    cp.innerHTML = `${pilot} ${status}`;
}
function updateFuelStatus(doc,status){
    let f = doc.querySelector('#fuelStatus');
    f.innerHTML = status;
}
function updateCargoStatus(doc,status){
    let c = doc.querySelector('#cargoStatus');
    c.innerHTML = status;
}
function showFaultyItems(doc){
    doc.querySelector('#faultyItems').style.visibility = 'visible';
}
function hideFaultyItems(doc){
    doc.querySelector('#faultyItems').style.visibility = 'hidden';
}
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch().then( function(response) {
        });

    return planetsReturned;
}

function pickPlanet(planets) {
}

// module.exports.addDestinationInfo = addDestinationInfo;
// module.exports.validateInput = validateInput;
// module.exports.formSubmission = formSubmission;
// module.exports.pickPlanet = pickPlanet; 
// module.exports.myFetch = myFetch;

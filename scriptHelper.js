try{
    require('isomorphic-fetch');
} catch(error){}
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let target = document.querySelector('#missionTarget');
    target.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src='${imageUrl}'>
    `;
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
function formSubmission(doc, list, pilot, copilot, fuelLevel, cargoLevel,w) {
    hideFaultyItems(list);
    let statusObj = {
        'pilot':pilot,
        'pilotStatus':function(){
            if(validateInput(this.pilot) === "Empty"){
                this.launchStatus = 'Shuttle Not Ready for Launch';
                return 'Pilot Name cannot be empty. Not Ready.';
            } else if(validateInput(this.pilot) === "Is a Number"){
                this.launchStatus = 'Shuttle Not Ready for Launch';
                return 'Pilot Name cannot be a number. Not Ready';
            } else {
                if(this.launchStatus === ''){
                    this.launchStatus = 'Shuttle is Ready for Launch';
                }
                return `Pilot ${this.pilot} is ready for launch`;
            }
        },
        'copilot':copilot,
        'copilotStatus':function(){
            if(validateInput(this.copilot) === "Empty"){
                this.launchStatus = 'Shuttle Not Ready for Launch';
                return 'Co-Pilot Name cannot be empty. Not Ready.';
            } else if(validateInput(this.copilot) === "Is a Number"){
                this.launchStatus = 'Shuttle Not Ready for Launch';
                return 'Co-Pilot Name cannot be a number. Not Ready';
            } else {
                if(this.launchStatus === ''){
                    this.launchStatus = 'Shuttle is Ready for Launch';
                }
                return `Co-pilot ${this.copilot} is ready for launch`;
            }
        },
        'fuelLevel':fuelLevel,
        'fuelStatus':function(){
            if(validateInput(this.fuelLevel) === "Empty"){
                this.launchStatus = 'Shuttle Not Ready for Launch';
                return 'Fuel Level cannot be empty.  Not Ready.';
            } else if(validateInput(this.fuelLevel) === "Not a Number"){
                this.launchStatus = 'Shuttle Not Ready for Launch';
                return 'Fuel Level must be a number.  Not Ready.';
            } else {
                if(this.fuelLevel<10000){
                    this.launchStatus = 'Shuttle Not Ready for Launch';
                    return 'Fuel level too low for launch';
                } else {
                    if(this.launchStatus === ''){
                        this.launchStatus = 'Shuttle is Ready for Launch';
                    }
                    return 'Fuel level high enough for launch';
                }
            }
        },
        'cargoLevel':cargoLevel,
        'cargoStatus': function(){
            if(validateInput(this.cargoLevel) === "Empty"){
                this.launchStatus = 'Shuttle Not Ready for Launch';
                return 'Cargo Level cannot be empty.  Not Ready';
            } else if(validateInput(this.cargoLevel) === "Not a Number"){
                this.launchStatus = 'Shuttle Not Ready for Launch';
                return 'Cargo Mass must be a number. Not Ready';
            } else {
                if(this.cargoLevel>10000){
                    this.launchStatus = 'Shuttle Not Ready for Launch';
                    return 'Cargo mass too heavy for launch';
                } else {
                    if(this.launchStatus === ''){
                        this.launchStatus = 'Shuttle is Ready for Launch';
                    }
                    return 'Cargo mass low enough for launch';
                }
            }
        },
        'launchStatus':''
    }
    showStatus(doc,statusObj);
    updateStatusColor(doc);
    showFaultyItems(list);
    if(statusObj.launchStatus.includes("Not")){
        showAlert(statusObj);
    }
    //return valid;
}
function showStatus(doc, statusObj){
    doc.querySelector('#pilotStatus').innerHTML = statusObj.pilotStatus();
    doc.querySelector('#copilotStatus').innerHTML = statusObj.copilotStatus();
    doc.querySelector('#fuelStatus').innerHTML = statusObj.fuelStatus();
    doc.querySelector('#cargoStatus').innerHTML = statusObj.cargoStatus();
    doc.querySelector('#launchStatus').innerHTML = statusObj.launchStatus;
}
function updateStatusColor(doc){
    let statusReport = doc.querySelector('#launchStatus');
    switch(statusReport.innerHTML){
        case ("Shuttle is Ready for Launch"):
            statusReport.style.color = 'rgb(65, 159, 106)';
        break;
        default:
            statusReport.style.color = 'rgb(199, 37, 78)';
    }
}
function showAlert(statusObj){
    let msg = `${statusObj.pilotStatus()}\n${statusObj.copilotStatus()}\n${statusObj.fuelStatus()}\n${statusObj.cargoStatus()}`;
    try{
        window.alert(msg);
    } catch(error){}
}
function showFaultyItems(list){
    list.style.visibility = 'visible';
}
function hideFaultyItems(list){
    list.style.visibility = '';
}
async function myFetch() {
    let planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(response => response.json()).then(function(data) {
        return data;
        });
    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)];
}
try{
    module.exports.addDestinationInfo = addDestinationInfo;
    module.exports.validateInput = validateInput;
    module.exports.formSubmission = formSubmission;
    module.exports.pickPlanet = pickPlanet; 
    module.exports.myFetch = myFetch;
} catch(error){}


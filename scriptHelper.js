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
    class StatObj {
        constructor(id,value){
            this.id = id;
            this.value = value;
            this.validInput = validateInput(this.value);
            this.status = createStatus(this.id,this.value,this.validInput);
        }
    }
    
    let statusArray = [
        new StatObj('Pilot',pilot),
        new StatObj('Co-pilot',copilot),
        new StatObj('Fuel level',fuelLevel),
        new StatObj('Cargo mass',cargoLevel)
    ]
    let launchStat = getLaunchStatus(statusArray);
    statusArray.push(launchStat);
    showStatus(doc,statusArray);
    updateStatusColor(doc);
    if(list.style.visibility === 'hidden'){
        toggleVisibility(list);
    }
}
function getLaunchStatus(statusArray){
    let returnStatus;
    for(let a=0;a<statusArray.length;a++){
        if(statusArray[a].status.includes('is ready for launch')||statusArray[a].status.includes('Fuel level high enough for launch')||statusArray[a].status.includes('Cargo mass low enough for launch')){
            if(returnStatus === undefined){
                returnStatus = 'Shuttle is Ready for Launch';
            }
        } else {
            returnStatus = 'Shuttle Not Ready for Launch';
        }
    }
    return returnStatus;
}
function createStatus(id,value,inputType){
    switch(inputType){
        case ('Empty'):
            return `${id} cannot be empty. Not Ready`;
        break;
        case ('Is a Number'):
            switch(id){
                case 'Pilot':
                case 'Co-pilot':
                    return `${id} cannot be a number. Not Ready`;
                break;
                case ('Fuel level'):
                    if(value < 10000){
                        return `Fuel level too low for launch`;
                    }
                    return `Fuel level high enough for launch`;
                break;
                case ('Cargo mass'):
                    if(value > 10000){
                        return 'Cargo mass too heavy for launch';
                    }
                    return `Cargo mass low enough for launch`
                break;
            }
        break;
        case ('Not a Number'):
            switch(id){
                case 'Pilot':
                case 'Co-pilot':
                    return `${id} ${value} is ready for launch`;
                break;
                case 'Fuel level':
                case 'Cargo mass':
                    return `${id} must be a number. Not Ready`
                break;
            }
        break;
    }
}
function showStatus(doc, statusArray){
    doc.querySelector('#pilotStatus').innerHTML =statusArray[0].status;
    doc.querySelector('#copilotStatus').innerHTML = statusArray[1].status;
    doc.querySelector('#fuelStatus').innerHTML = statusArray[2].status;
    doc.querySelector('#cargoStatus').innerHTML = statusArray[3].status;
    doc.querySelector('#launchStatus').innerHTML = statusArray[4];
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
function toggleVisibility(el){
    if (el.style.visibility === 'visible'){
        el.style.visibility = 'hidden';
    } else {
        el.style.visibility = 'visible';
    }
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


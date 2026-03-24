"use strict"

let details = {}

const params = new URLSearchParams(window.location.search)
const id = params.get("id");
console.log("unit id:", id);

async function getDetails() {
    try{
        const response = await fetch(`http://localhost:5050/api/units/${id}`)
        details = await response.json()
        displayDetails(details)
        console.log(details)
    } catch(error) {
            console.error("Can't load unit details");
        }
    }
    getDetails()

    const unitDetails = document.getElementById("unit-details")

      function displayDetails(unit){
       unitDetails.innerHTML += `<div class="details-card"> 
       <h2>Unit: ${unit.unitNumber}</h2>
       <p>Floor: ${unit.floorPlan} </p>
       <p>SF:    ${unit.sf}</p>
       <p>Rent:  ${unit.rent}</p>
       <p>Status: ${unit.status}</p>
       <p>Lease Start: ${unit.leaseStart}</p>
       <p>Lease End:   ${unit.leaseEnd}</p>
       `
       

        
      }
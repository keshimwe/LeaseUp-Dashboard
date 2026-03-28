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


    let notes = {}
    const notesArea = document.getElementById("note-input")
     console.log(notesArea.value,"hey")

    const noteButton = document.getElementById("note-submit")
    noteButton.addEventListener("click", function() {
       const comment = notesArea.value
      if (!notes[id]) {
        notes[id] = []
      }
       notes[id].push(comment)

       localStorage.setItem("notes", JSON.stringify(notes))
       
       displayNotes()
       notesArea.value = ""   
    })

    function displayNotes(){
        const savedNotes = document.getElementById("notes-saved")
        savedNotes.innerHTML = ""
      const unitNotes = notes[id] || []
        unitNotes.forEach(notes =>{
            savedNotes.innerHTML += 
            ` <p>${notes}</p>`

        })
    }

    const savedNotes = localStorage.getItem("notes")
       if ( savedNotes) {
        notes = JSON.parse(savedNotes)
        
       }

    displayNotes()
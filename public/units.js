"use strict"

let details = {}

const params = new URLSearchParams(window.location.search)
const id = params.get("id");
console.log("unit id:", id);

/* unit api end point*/
async function getDetails() {
    try{
        const response = await fetch(`http://localhost:5050/api/units/${id}`)
        details = await response.json()

        const savedChanges = localStorage.getItem("applicants-" + id)
             if(savedChanges) {
               details.applicants = JSON.parse(savedChanges)
             }

        displayDetails(details)
        displayApplicants(details)
           
    } catch(error) {
            console.error("Can't load unit details");
        }
    }
    getDetails()

    /* render function for unit detail*/
    const unitDetails = document.getElementById("unit-details")

      function displayDetails(unit){
       unitDetails.innerHTML += 
  `<div class="summary"> 
       
      <div class="units-value">
         <h3 class="unit-smry">Unit Summary</h3>
       <div class="units-info">
         <p>Unit: ${unit.unitNumber}</p>
         <p>Floor: ${unit.floorPlan} </p>
         <p>SF:    ${unit.sf}</p>
         <p>Rent:  ${unit.rent}</p>
       </div>
      </div>
    
      <div class="unit-values">
          <h3 class="occupancy-smry">Occupancy Summary</h3>
        <div class="unit-info">
          <p>Resident: ${unit.resident}</p>
          <p>Status: ${unit.status}</p>
          <p>Lease Start: ${unit.leaseStart}</p>
          <p>Lease End:   ${unit.leaseEnd}</p>
       </div>
      </div>
   </div> `
    }

  
    function displayApplicants(details) {
        const appList = document.getElementById("applicant-list")
        appList.innerHTML = ""

      if (!details.applicants || details.applicants.length === 0) {

        appList.innerHTML = "<p>No applicants</p>"
    } else {
       
        appList.innerHTML = `
         
              <h3 class="app-name">Applicants</h3>
             
          `
        details.applicants.forEach((app, index )=> {
            const status = app.status.toLowerCase()
           appList.innerHTML +=  ` 
          <div class="app-row-status">
            <h4>Name</h4>
             <span>${app.name} </span>
             <button  class="remove-btn" id="remove-btn" onclick="removeApplicants(${index})">Remove Applicant</button>
            <h5>Status</h5>
            <select id="applicant-status">
             <option value="select">Select</option>
             <option value="application-received" ${status === "application-received" ? "selected": ""}>Application Received</option>
             <option value="screening" ${status === "screening" ? "selected": ""}>Screening</option>
             <option value="approved" ${status === "approved" ? "selected": ""}>Approved</option>
             <option value="denied"   ${status === "denied" ? "selected": ""}>Denied</option>
             <option value="withdrew" ${status === "withdrew" ? "selected": ""}>Withdrew</option>

            </select> <br>

            
          </div>
                 
                    
              
                `
        })
      }
      
    }
       function removeApplicants(index){
        details.applicants.splice(index, 1);
        displayApplicants(details)
       }


    const addBtn = document.getElementById("add-btn")
        addBtn.addEventListener("click", function() {
        displayAppForm()

    })


    const appForm = document.getElementById("applicant-form")
    function displayAppForm() {
        appForm.style.display = "block"
    }
    
    const nameInput = document.getElementById("applicant-name")
    const statusInput = document.getElementById("new-app-status")
    const confirmBtn = document.getElementById("confirm-add")

    confirmBtn.addEventListener("click", function() {
 
        const name = nameInput.value
        const status = statusInput.value

      if(!details.applicants) {
        details.applicants = []
       } 
         
       details.applicants.push({
            name: name,
            status: statusInput.value
        })
     console.log(status)
     
      displayApplicants(details)

    console.log(status)
      nameInput.value = ""
      statusInput.value = ""
      document.getElementById("applicant-form").style.display="none"
    }) 

    let notes = {}
     
    const notesArea = document.getElementById("note-input")
     console.log(notesArea.value,"hey")

     /* click function to push unit notes*/
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

    /* render function for notes*/
    function displayNotes(){
        const savedNotes = document.getElementById("notes-saved")
        savedNotes.innerHTML = ""
      const unitNotes = notes[id] || []
        unitNotes.forEach(notes =>{
            savedNotes.innerHTML += 
            ` <p class="notes-saved">${notes}</p>`

        })
    }

    /* rendering notes from localStorage*/
    const savedNotes = localStorage.getItem("notes")
       if(savedNotes) {
        notes = JSON.parse(savedNotes)
       }
    displayNotes()


     const saveBtn = document.getElementById("save-btn")

     saveBtn.addEventListener("click", function(){
        localStorage.setItem("applicants-" + id, JSON.stringify(details.applicants))
console.log(saveBtn)

       displayApplicants(details)
console.log(details)
     })

        
                
            displayApplicants(details)


Project Title - 
LeaseUp-Dashboard 

Project Description -
A leased up dashboard to help manage apartment units and track applicants
The application fetches unit datafrom an API and dynamically renders it onn the dashboard
On the dashboard users can view all units or filter units by unit number or unit status and view unit details page
Each unit has a detail unit page
On the units details page users can view unit details, manage applicants, update status, add notes and save using localStorage

Project Features -
Created API to serve unit data
Integrated API into frontend using fetch to dynamically render data
Analyze unit data that is stored in arrays, objects
Persist applicant data using localStorage


Installation -
Clone the repository
Run npm install

Project Usage-
Run server using node server.js
Open index.html in your browser

AI Usage -
Used AI to assist with pushing notes, storing it in localstorage and getting the data from localStorage.
Code
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

    const savedNotes = localStorage.getItem("notes")
       if(savedNotes) {
        notes = JSON.parse(savedNotes)
       }
    displayNotes()


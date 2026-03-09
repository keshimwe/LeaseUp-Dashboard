"use strict"



const dashboardElement = document.getElementById("unit-dashboard")


async function getUnits() {
    const url = `http://localhost:5050/api/units`;

 try{
     const response = await fetch(url)
    if(!response.ok){
        throw new Error("Error loading content");
    }
 const unit = await response.json();

 dashboardElement.innerhtml = "";
   unit.forEach(unit => {
dashboardElement.innerHTML += `<div class="unit-dashboard"> 
<p>${unit.unitNumber}</p>
<p>${unit.status}</p>
<p class="edit-button">View/Edit</p>
`;
 });
 
 } catch(error){
    console.error("Error loading data")
 }
    
}
 getUnits()
    
  
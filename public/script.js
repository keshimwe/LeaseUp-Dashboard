"use strict"

let units = [];

/*API end point*/
async function getUnits() {
    const url = `http://localhost:5050/api/units`;
 try{
     const response = await fetch(url)
    if(!response.ok){
        throw new Error("Error loading content");
       }
  units = await response.json()
   displayUnits(units)
 
 } catch(error){
    console.error("Error loading data")
 }   
}
getUnits()

   /*Dashboard render/ Render function*/
const dashboardElement = document.getElementById("unit-dashboard")

 function displayUnits(unitList) {
 dashboardElement.innerHTML = "";
   unitList.forEach(unit => {
dashboardElement.innerHTML += `<tr class="unit-row"> 
<td class="unit-nmbr">${unit.unitNumber}</td>
<td class="${unit.status.toLowerCase()}">${unit.status}</td>
<td class="view-edit"><a href="/units.html?id=${unit.id}"> View/Edit </a> </td> </tr>`
});
 }
  
 /*Status button */
  const statusButton = document.querySelectorAll("#filter-status button")
  console.log(statusButton)

   statusButton.forEach(button => {
     button.addEventListener("click", function()   {

      statusButton.forEach(button => button.classList.remove("active"))
      button.classList.add("active")
      
      const status = button.id;
      console.log("clicked", status);

      if (status === "all") {
         displayUnits(units)
         console.log(units)
         } else {

         const filterUnits = units.filter(unit => unit.status.toLowerCase() === status);
        
          displayUnits(filterUnits)
         }  
     });
     });
         
    /* Search button */ 
 const searchInput = document.getElementById("search-input")
 console.log(searchInput);

 searchInput.addEventListener("input", function() {

  const value = searchInput.value.toLowerCase();
  console.log("input", value)

 const filterUnits = units.filter(unit => unit.unitNumber.toString().includes(value));
 displayUnits(filterUnits)
})
    
  
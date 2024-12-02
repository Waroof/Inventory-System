// Get reference to the "+" button
const addButton = document.getElementById("add-item");
const addForm = document.getElementById("add-form");
const insert = document.getElementById("insert");

const testList = [
    { ID: 1, name: "Hammer", quantity: 12 },
    { ID: 2, name: "Screwdriver", quantity: 13 },
    { ID: 3, name: "Wrench", quantity: 8 },
    { ID: 4, name: "Pliers", quantity: 15 },
    { ID: 5, name: "Drill", quantity: 7 },
    { ID: 6, name: "Saw", quantity: 10 },
    { ID: 7, name: "Chisel", quantity: 5 },
    { ID: 8, name: "Tape Measure", quantity: 20 },
    { ID: 9, name: "Level", quantity: 14 },
    { ID: 10, name: "Sander", quantity: 9 },
    { ID: 11, name: "Paint Brush", quantity: 25 },
    { ID: 12, name: "Socket Wrench", quantity: 6 },
    { ID: 13, name: "Utility Knife", quantity: 18 },
    { ID: 14, name: "Toolbox", quantity: 3 },
    { ID: 15, name: "Clamp", quantity: 30 },
    { ID: 16, name: "Safety Goggles", quantity: 22 },
    { ID: 17, name: "Gloves", quantity: 27 },
    { ID: 18, name: "Workbench", quantity: 1 },
    { ID: 19, name: "Flashlight", quantity: 12 },
    { ID: 20, name: "Extension Cord", quantity: 8 },
];



function testTable(listObj){
    //Grab table body to append new rows to it
    const grabBodyId= document.getElementById("table-body");

    //cycle thru each object in the list
    for (obj of listObj){
        //create new row for each object
        let newRow =document.createElement("tr");
        grabBodyId.appendChild(newRow)

        //create a data element for each of the key/values in the object
        let newId = document.createElement("td");
        let newItem = document.createElement("td");
        let newQuantity = document.createElement("td");

        //set the value of each new data
        newId.textContent=obj.ID;
        newItem.textContent=obj.name;
        newQuantity.textContent=obj.quantity;

        //append it to the row
        newRow.appendChild(newId);
        newRow.appendChild(newItem);
        newRow.appendChild(newQuantity);

    }

}

testTable(testList)




// Function to display the popup
function showPopup() {
    const popup = document.createElement("div");
    popup.textContent = "Added!";
    popup.className = "popup";

    document.body.appendChild(popup);

    const buttonRect = addButton.getBoundingClientRect();
    popup.style.left = `${buttonRect.right + 10}px`;
    popup.style.top = `${buttonRect.top}px`; 

    
    popup.addEventListener("animationend", () => {
        popup.remove();
    });
}
function clearForm(idName) {
    const formInput = document.getElementById(idName); 
    
    if (formInput) {
        formInput.value = ""; 
    }
}

function handleSubmit(e){
    if (e.key==='Enter'){
        e.preventDefault();
        showPopup();
        
    }
    }



addButton.addEventListener("click",(e)=>{
    e.preventDefault()
    showPopup();
    

});

addForm.addEventListener("keydown",handleSubmit);


insert.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const formData = {
        name:addForm.value,
        quantity:1}
        
        console.log(formData)
        clearForm('add-form');
})

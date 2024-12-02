// Get reference to the "+" button
const addButton = document.getElementById("add-item");
const addForm = document.getElementById("add-form");
const insert = document.getElementById("insert");
const quantityAdd = document.getElementById("quantity-add");
const searchForm = document.getElementById("search-form");






async function generateTable(){
    const data =await getInventory();
    testTable(data);
    
}

function clearTable(){
    const grabBodyId = document.getElementById("table-body");
    grabBodyId.innerHTML="";
}








function testTable(listObj) {
  //Grab table body to append new rows to it
    const grabBodyId = document.getElementById("table-body");

  //cycle thru each object in the list
    for (obj of listObj) {
    //create new row for each object
    let newRow = document.createElement("tr");
    grabBodyId.appendChild(newRow);

    //create a data element for each of the key/values in the object
    let newId = document.createElement("td");
    let newItem = document.createElement("td");
    let newQuantity = document.createElement("td");

    //set the value of each new data
    newId.textContent = obj.id;
    newItem.textContent = obj.name;
    newQuantity.textContent = obj.quantity;

    //append it to the row
    newRow.appendChild(newId);
    newRow.appendChild(newItem);
    newRow.appendChild(newQuantity);
    }
}

generateTable();

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
function clearForm() {
    if (addForm) {
        addForm.value = "";
    }
    if (quantityAdd) {
        quantityAdd.value = 1;
    }
}

function handleSubmit(e) {
    if (e.key === "Enter") {
        showPopup();
    }
}

addButton.addEventListener("click", (e) => {
    showPopup();
});

addForm.addEventListener("keydown", handleSubmit);

insert.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
    name: addForm.value,
    quantity: quantityAdd.value,
    };

    try{
        const response = await fetch("http://localhost:3005/inventory",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData)
        })
        const data = await response.json()
        if (data){
            clearTable()
            generateTable();
            
        }
        
    }
    catch(error){
        console.log("this is THE error: "+error);
    }
    console.log(formData);
    clearForm();
});



async function getInventory(){
    try{
        const inventoryData = await fetch("http://localhost:3005/inventory");
    const data = inventoryData.json();
    
    return data;
    }
    catch(error){
        console.log("This is the error: "+ error);
    }
    
}

searchForm.addEventListener("keydown",(e)=>{
    const searchLetters = searchForm.value;
})
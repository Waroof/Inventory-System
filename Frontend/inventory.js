// Get reference to the "+" button
const addButton = document.getElementById("add-item");
const addForm = document.getElementById("add-form");
const insert = document.getElementById("insert");
const quantityAdd = document.getElementById("quantity-add");
const searchForm = document.getElementById("search-form");


let TABLEDATA = [];

async function initialize(){
    TABLEDATA =await getInventory();
    generateTable(TABLEDATA)
}

initialize()

async function generateTable(data){
    testTable(data);
    
}

function clearTable(){
    const grabBodyId = document.getElementById("table-body");
    grabBodyId.innerHTML="";
}

async function deleteItem(id,row){
    try{
        const response = await fetch(`http://localhost:3005/inventory/${id}`,{
            method:"DELETE"
        });
        if (response.ok){
            row.remove()
        }
    }
    catch(error){
        console.log("This is the error: "+ error);
    }

}

async function editItem(row){
    const itemName = row.children[1].textContent;
    const quantityNumber = row.children[2].textContent;
    document.getElementById(row.id).innerHTML = 
    `
    <td>${row.id}</td>
    <td><input class='edit-form' type="text" id="name-eidt" name="name-edit" minlength=3 value=${itemName}></td>
    <td><input class='edit-form' type="number" id="quantity-edit" min="1" max="10000" value=${quantityNumber}></td>
    <td><i class='fas fa-times' style="cursor:pointer;margin-right:25px;font-size:30px"></i><i style="font-size:30px" class='fas fa-check'></i></td>
    `;
}




function testTable(listObj) {
  //Grab table body to append new rows to it
    const grabBodyId = document.getElementById("table-body");

  //cycle thru each object in the list
    for (let obj of listObj) {
    //create new row for each object
    let newRow = document.createElement("tr");
    grabBodyId.appendChild(newRow);
    newRow.id=obj.id;
    //create a data element for each of the key/values in the object
    let newId = document.createElement("td");
    let newItem = document.createElement("td");
    let newQuantity = document.createElement("td");
    let actions = document.createElement("td");
    
    
    
    //set the value of each new data
    newId.textContent = obj.id;
    newItem.textContent = obj.name;
    newQuantity.textContent = obj.quantity;
    //add delete button
    const trashIcon= document.createElement("i")
    trashIcon.className="fas fa-trash";
    trashIcon.style.cursor='pointer';
    trashIcon.style.marginRight='30px'; 
    trashIcon.addEventListener('click',() => deleteItem(obj.id, newRow))
    actions.appendChild(trashIcon)

    //add edit button
    const editIcon =document.createElement("i");
    editIcon.className="fas fa-edit";
    editIcon.style.cursor='pointer';
    editIcon.addEventListener('click',()=>editItem(newRow))
    actions.appendChild(editIcon);


    //append it to the row
    newRow.appendChild(newId);
    newRow.appendChild(newItem);
    newRow.appendChild(newQuantity);
    newRow.appendChild(actions);
    
    }
}




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


addForm.addEventListener("submit", handleSubmit);

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
            showPopup();
            clearTable();
            const updatedTableData = await getInventory();
            generateTable(updatedTableData);
            
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

searchForm.addEventListener("keyup",(e)=>{
    const searchLetters = searchForm.value.toLowerCase();
    const filterData = TABLEDATA.filter((row)=>{
        return row.name.toLowerCase().includes(searchLetters);
    })
    clearTable();
    generateTable(filterData);
})
//  Making query Selector:
const mainToDoElem = document.querySelector(".to-do-list");
const inputValue =  document.getElementById("inputValue");


// Now Adding Click Event:

// Array Creation for local Storage:

const getToDoListFromLocalStorage = () => {
    // convert array into string again!
    return JSON.parse(localStorage.getItem("ToDoList:"));
};

// if there is no data in local storage then empty array will be created.
let localToDoLists = getToDoListFromLocalStorage() || [];

const addToDoDynamicElement = (currElem) => {
    
    // ab har yeh currElem ko Vaha show krna h yeh to already likh chuke h ham:

    const divElement = document.createElement("div"); 
    divElement.classList.add("to-do-list-elem");
    divElement.innerHTML = `<li> ${currElem}</li> <button class="deleteBtn">Delete </button>`;
    mainToDoElem.append(divElement);

};

const addToDoList = (e) => {
    e.preventDefault(); // Prevents the default action of the event.
    
    // console.log("Tetsing Btn clicked!");
        
    const toDoListValue = inputValue.value.trim();
    inputValue.value = ""; // Empty the input field after adding the task.

    if( toDoListValue !== "" && !localToDoLists.includes(toDoListValue)){

        localToDoLists.push(toDoListValue); 
        
        // For Eliminating Duplicate Tasks AGain and again:
        //! Spread opr: ...new Set(localToDoLists)
        localToDoLists = [...new Set(localToDoLists)]; // Set is used to eliminate duplicates.
        
        console.log(localToDoLists);
        
        // Now Storing in Local Storage: convert array into string using .stringify
        localStorage.setItem("ToDoList:", JSON.stringify(localToDoLists));
        
        addToDoDynamicElement(toDoListValue); // function is called!

    }
   
};

//! Even on refreshing the page contents should be there always! unless deleted !
const showToDoList = () => {
    localToDoLists.forEach((currElem) => {
        addToDoDynamicElement(currElem);       
    })
}; 

showToDoList();     // function is called!


const removeToDoList = (e) => {
    
    const toRemove = e.target.previousElementSibling.innerText; 
    
    console.log( "To Delete: "+ toRemove);      // for testing purpose
    
    //* Now Local Storage and array me dhundh ke remove krdenge:

    localToDoLists = localToDoLists.filter((currElem) => {
        return currElem !==  toRemove; // removing the element from the array. 
    });

    console.log(localToDoLists);    // Array Check Printing
    
    //! Now Storing in Local Storage: convert array into string using .stringify
    localStorage.setItem("ToDoList:", JSON.stringify(localToDoLists));

    // Now Page se bhi to hatana padega!
    // that is To Remove from the DOM!
    e.target.parentElement.remove(); // removing the parent element of the delete button.
};



mainToDoElem.addEventListener("click", (e)=>{

    //* Prevents the default action of the event.
    e.preventDefault(); 

    //! console.log(e.target.classList);
    //! console.log(e.target);
    
    if(e.target.classList.contains("deleteBtn")){
        removeToDoList(e); // function is called!
    }
});




const addbtn = document.querySelector(".btn");
addbtn.addEventListener("click", (e) => {
    addToDoList(e);
    //* when dealing with forms ,have to put this "e" inside paramaeter!
});








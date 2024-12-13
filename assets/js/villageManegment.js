//import { dataVillage } from './data/dataVillage.js';
//console.log("Initial gallery from localStorage:", dataVillage);

let dataVillage= [
    {  id:1, name:"Jabalia", Region:"- Gaza Strip", land:10 , Latitude:31.6 , Longitude:65.2245 ,Tags:"undifined" , img:""  , population:"4", age:"50", gender:10 , growthRate:31.6  } ,
    {  id:2, name:"Beit Lahia", Region:"- Gaza Strip", land:15 , Latitude:51.33 , Longitude:35.2245 ,Tags:"undifined" , img:""  ,population:"3", age:"4", gender:20 , growthRate:38  } ,
    {  id:3, name:"Quds", Region:"- West Bank", land:17 , Latitude:78.33 , Longitude:57.2245 ,Tags:"undifined" , img:"" , population:"6", age:"58", gender:50 , growthRate:64.01  } ,
    {  id:4, name:"Shejaiya", Region:"- Gaza Strip", land:33 , Latitude:65.33 , Longitude:35.2245 ,Tags:"undifined" , img:"" ,  population:"11", age:"78", gender:90 , growthRate:8.3   } 

];




 function readAll()
{
    for(var i=0;i<dataVillage.length;i++)
    {   console.log("the data stored in ",i, dataVillage[i]);
    }


     localStorage.setItem("object",JSON.stringify(dataVillage));
     var dataShow =document.querySelector(".village-item-container");

     var object = localStorage.getItem('object');
     var objectData =JSON.parse(object);
     var element ="";
     console.log("Object Data:", objectData);
     
     objectData.map(record =>{
        //here problem in vieo after update
        //record known
        console.log("Data in localStorage:", JSON.parse(localStorage.getItem("object")));
        console.log("Record:", record);

        element +=`
     <div class="village-item">
          <span>${record.name} ${record.Region}</span>
                <div class="buttons">
                 
                        <button class="view" onclick="viewModal()" >View</button>
                        <button class="update" onclick="updateModal(${record.id})" >Update Village</button>                
                        <button class="delete" onclick="deleteVillage(${record.id})" >Delete Village</button>
                        <button class="update-data" onclick="viewDemographicUpdate(${record.id})">Update Demographic Data</button>
                    
                </div>
      </div>
        
        `
});

             console.log("the element "+element);

     dataShow.innerHTML=element; 
}


//sort &search box
function searchBox() {
    const searchInput = document.querySelector(".search-box");
    const villageItems = Array.from(document.querySelectorAll(".village-item")); 
    
    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            const searchText = event.target.value.toLowerCase().trim(); 
            villageItems.forEach(item => {
                const villageName = item.querySelector("span").textContent.toLowerCase().trim(); 

                item.style.display = villageName.includes(searchText) ? "flex" : "none";
            });
        });
    } else {
        console.log("Search box not found!");
    }
}

function clearList() {
    if (document.querySelector(".village-item-container")) {
        document.querySelector(".village-item-container").innerHTML = ""; 
    }
    searchBox();
}

function sortByAlpha() {
    const villageItemsContainer = document.querySelector(".village-item-container");
    const sortSelect = document.querySelector("#sort");

    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            const sortValue = sortSelect.value;
            if (sortValue === "name") {

                dataVillage.sort((a, b) => a.name.localeCompare(b.name));
            } else {

                dataVillage.sort((a, b) => a.id - b.id);
            }
            clearList(); 
            readAll(); 
            searchBox();
        });
    }
}



//add new village 
function showAddModel(){
    document.getElementById("add-village-modal").classList.add('show');
    document.getElementById("add-village-modal").style.display="block";
}
function closeAddModal(){
    document.getElementById("add-village-modal").style.display="none";
}
/////////////////////////////
//update Demographic Data 
function viewDemographicUpdate(id){
    document.getElementById("update_Demographic-village-modal").classList.add('show');
    document.getElementById("update_Demographic-village-modal").style.display="block";

    
    const obj =dataVillage.find(record => record.id === id);

    document.querySelector('.update-village-Population').value=obj.population;
    document.querySelector('.update-Age').value=obj.age;
    document.querySelector('.update-Gender').value=obj.gender;
    document.querySelector('.update-Growth-Population').value=obj.growthRate;

    
    //to pass ID of village 
    document.querySelector('.id-of-update-Population-village-form').value=obj.id;
    
}

function closeDemographic(){
    document.getElementById("update_Demographic-village-modal").style.display="none";
}

//update All Data
function updateModal(id){
    document.getElementById("update-village-modal").classList.add('show');
    document.getElementById("update-village-modal").style.display="block";

    const obj =dataVillage.find(record => record.id === id);
    document.querySelector('.update-village-name').value=obj.name;
    document.querySelector('.update-region-district').value=obj.Region;
    document.querySelector('.update-land-area').value=obj.land;
    document.querySelector('.update-latitude').value=obj.Latitude;
    document.querySelector('.update-longitude').value=obj.Longitude;
    //to pass ID of village 
    document.querySelector('.id-of-update-village-form').value=obj.id;

}
function closeUpdateModal(){
    document.getElementById("update-village-modal").style.display="none";
}

//view details
function viewModal(){
    document.getElementById("view-village-modal").classList.add('show');
    document.getElementById("view-village-modal").style.display="block";
    viewingProcess();
}
function closeViewModal(){
    document.getElementById("view-village-modal").style.display="none";
}


function saveAddedDataToLocal(event) {
    event.preventDefault(); 

    const name=document.getElementById("village-name").value ;
    const region=document.getElementById("region-district").value ;
    const land=document.getElementById("Land Area (sq Km)").value ;
    const Latitude=document.getElementById("Latitude").value ;
    const Longitude=document.getElementById("Longitude").value ;
    const imgFile=document.getElementById("village-file").value ;
    const tag=document.getElementById("Categories/Tags").value ;

    const newObject=     {  id:dataVillage.length+1 , name:name, Region:region, land:land , Latitude:Latitude , Longitude:Longitude ,Tags:tag , img:imgFile ,  population:"", age:"", gender:0 , growthRate:0   } ;
    dataVillage.push(newObject);

  
    readAll();
    localStorage.setItem("object", JSON.stringify(dataVillage));
    readAll();
    closeAddModal();
    searchBox(); 
    sortByAlpha();
    console.log("Village added successfully!");
}

function viewingProcess() {

    for(var i=0;i<dataVillage.length;i++)
        {   console.log("the data stored in ",i, dataVillage[i]);
        }

    let object = localStorage.getItem("object");
    let villages = JSON.parse(object);

    let viewModal = document.getElementById("view-village-modal");
    let viewModalContent = document.querySelector("#view-village-modal-content");
    let viewButtons = document.querySelectorAll(".view");

    viewButtons.forEach((button, index) => {
        button.addEventListener("click", () => {

            var village = villages[index];

            console.log("the village in vieo",village);
            if (village) {
                //here problem in vieo after update
                viewModalContent.innerHTML = `
                    <p><strong>Village Name:</strong> ${village.name}</p>
                    <p><strong>Region/District:</strong> ${village.Region}</p>
                    <p><strong>Land Area (sq km):</strong> ${village.land}</p>
                    <p><strong>Latitude:</strong> ${village.Latitude}</p>
                    <p><strong>Longitude:</strong> ${village.Longitude}</p>
                    <p><strong>Tags:</strong> ${village.Tags}</p>
                    <p><strong>Village Image:</strong><br><img src="${village.img}" alt="Village Image" style="width:100%; max-width:400px;"></p>
                `;

                viewModal.style.display = "block";
            } else {
                console.error("Village data not found!");
            }
        });
    });
}


function updateProcess(event) {
    event.preventDefault();
    console.log("Village updated here");

    const id = parseInt(document.querySelector('.id-of-update-village-form').value);
    const name = document.querySelector('.update-village-name').value || dataVillage.find(rec => rec.id === id).name;
    const Region = document.querySelector('.update-region-district').value || dataVillage.find(rec => rec.id === id).Region;
    const land = parseInt(document.querySelector('.update-land-area').value) || dataVillage.find(rec => rec.id === id).land;
    const Latitude = parseFloat(document.querySelector('.update-latitude').value) || dataVillage.find(rec => rec.id === id).Latitude;
    const Longitude = parseFloat(document.querySelector('.update-longitude').value) || dataVillage.find(rec => rec.id === id).Longitude;
    const img = document.querySelector('.update-image').value || dataVillage.find(rec => rec.id === id).img;


    const index = dataVillage.findIndex(rec => rec.id === id);
    console.log(dataVillage[index] + " the old data");

    dataVillage[index] = {
        id,
        name,
        Region,
        land,
        Latitude,
        Longitude,
        Tags: dataVillage[index].Tags,
        img
    };

    console.log("the new data stored is", dataVillage[index]);

    closeUpdateModal();

    readAll();
    searchBox();
    sortByAlpha();
    viewingProcess();
}




function demographicUpdate(event) {
    event.preventDefault();

    const id = parseInt(document.querySelector('.id-of-update-Population-village-form').value);

    const index = dataVillage.findIndex(rec => rec.id === id);

    if (index === -1) {
        console.error("Village not found!");
        return;
    }

    const currentVillage = dataVillage[index];

    const population = document.querySelector('.update-village-Population').value || currentVillage.population;
    const age = document.querySelector('.update-Age').value || currentVillage.age;
    const gender = document.querySelector('.update-Gender').value || currentVillage.gender;
    const growthRate = document.querySelector('.update-Growth-Population').value || currentVillage.growthRate;


    dataVillage[index] = {
        ...currentVillage, 
        population: population,
        age: age,
        gender: gender,
        growthRate: growthRate
    };


    closeDemographic();
    readAll();
    searchBox();
    sortByAlpha();
}




function deleteVillage(id) {
    const index = dataVillage.findIndex(record => record.id === id);
        if (index !== -1) {
        dataVillage.splice(index, 1);
        localStorage.setItem("object", JSON.stringify(dataVillage));
        
        console.log(`Village with ID ${id} deleted successfully.`);
        readAll();
        searchBox();
        sortByAlpha();
    } else {
        console.error("Village not found!");
    }
}







readAll();
searchBox();
sortByAlpha();
viewingProcess();

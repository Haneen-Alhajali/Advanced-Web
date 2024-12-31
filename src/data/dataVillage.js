const dataVillage= JSON.parse(localStorage.getItem("dataVillage")) || [
    {  id:1, name:"Jabalia", Region:"- Gaza Strip", land:10 , Latitude:31.6 , Longitude:65.2245 ,Tags:"undifined" , img:"https://via.placeholder.com/100"  , population:"4", age:"50", gender:10 , growthRate:31.6  } ,
    {  id:2, name:"Beit Lahia", Region:"- Gaza Strip", land:15 , Latitude:51.33 , Longitude:35.2245 ,Tags:"undifined" , img:"https://via.placeholder.com/100"  ,population:"3", age:"4", gender:20 , growthRate:38  } ,
    {  id:3, name:"Quds", Region:"- West Bank", land:17 , Latitude:78.33 , Longitude:57.2245 ,Tags:"undifined" , img:"https://via.placeholder.com/100" , population:"6", age:"58", gender:50 , growthRate:64.01  } ,
    {  id:4, name:"Shejaiya", Region:"- Gaza Strip", land:33 , Latitude:65.33 , Longitude:35.2245 ,Tags:"undifined" , img:"https://via.placeholder.com/100" ,  population:"11", age:"78", gender:90 , growthRate:8.3   } 

]

// Save dataVillage to localStorage
if (!localStorage.getItem("dataVillage")) {
  localStorage.setItem("dataVillage", JSON.stringify(dataVillage));
}
export { dataVillage };
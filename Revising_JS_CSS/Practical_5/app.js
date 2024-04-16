

submit.addEventListener("click",()=>{
let showDeatail = document.getElementById("showInfo");

showDeatail.textContent = "Name: " + document.getElementById("name").value + "\n";
showDeatail.textContent += "Email : "+ document.getElementById("email").value + "\n";
showDeatail.textContent += "Mobile NO : "+ document.getElementById("mobile").value + "\n";
showDeatail.textContent += "Gender : "+ document.querySelector('input[name="gender"]:checked').value + "\n";
showDeatail.textContent += "Favorite Color : " + document.getElementById("color").value + "\n";
let submit = document.getElementById("submit").value + "\n";

});

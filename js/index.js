

document.querySelector("#subBtn").addEventListener("click", function(ev)
{
var email = document.getElementById("Email").value;
var password = document.getElementById("Password").value;

if(email == "admin@test.com" && password == "123")
{
    location.href = "../ElancoFrontend/userDash.html";

} 

else 
{
    alert("WRONG DETAILS");
}
})

document.querySelector("#regBtn").addEventListener("click", function(ev)
{
    location.href = "../ElancoFrontend/register.html";
})


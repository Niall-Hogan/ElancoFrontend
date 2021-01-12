function previewFile(){
    const preview = document.getElementById('imgPrev');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    preview.style.display = "inline";

    reader.addEventListener("load", function(){
        //convert image file to base64 string
        preview.src = reader.result;
    }, false);

    if(file){
        reader.readAsDataURL(file);
    }
}

document.querySelector("#logout").addEventListener("click", function(ev)
{
    location.href = "../ElancoFrontend/index.html";
})

document.querySelector("#back").addEventListener("click", function(ev)
{
    location.href = "../ElancoFrontend/userDash.html";
})
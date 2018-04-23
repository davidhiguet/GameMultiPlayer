window.addEventListener('DOMContentLoaded', function () {

    var formValidation = function (name, avatarChoosen) {
    var messageError = document.getElementById('errorMessage')
    
    if (name !== '' && avatarChoosen !== undefined) {

    return true, avatarChoosen;

    } else {

        if (name === '') {
            messageError.innerHTML= "Veuillez rentrer un pseudo";
        } 
        if (avatarChoosen === undefined){
            messageError.innerHTML= "Veuillez séléctionner votre avatar";
        }
        
    return false;
    }
}


document.getElementById('pseudo').addEventListener('keyup', function () {
    var avatarChoosen;
    var avatar1 = document.getElementById("avatar1");
    var avatar2 = document.getElementById("avatar2");

    if (avatar1.checked) {
        avatarChoosen = document.getElementById("avatar1").value;
    }
    if (avatar2.checked) {
        avatarChoosen = document.getElementById("avatar2").value;
    }     
    var name = this.value.trim().toUpperCase();
    formValidation (name, avatarChoosen);
});
var verificationFormulaire = document.getElementById('formulaire');
verificationFormulaire.addEventListener('submit', function (event) {
    event.preventDefault();

    var avatarChoosen;
    var avatar1 = document.getElementById("avatar1");
    var avatar2 = document.getElementById("avatar2");

        if (avatar1.checked) {
            avatarChoosen = document.getElementById("avatar1").value;
        }
        if (avatar2.checked) {
            avatarChoosen = document.getElementById("avatar2").value;
        }        

        var name = document.getElementById('pseudo').value.trim().toUpperCase();
            if (formValidation(name, avatarChoosen)){
            document.getElementById('pseudo').value= name;
            document.querySelector("input[name=avatar]:checked").value;

                this.submit();
            }
    });
});
let user_email_elem = document.getElementById('user_email');
let user_pass_elem = document.getElementById('user_pass');
let form = document.getElementById('user_login_form');
let action = document.getElementsByName('action')[0];
var divElem = document.getElementById('msg');
var button = document.getElementById('user_login');

var pass_valid = { value: false };
var email_valid = { value: false };
// var user_name_valid = {value: false}; 

$(document).ready(() => {

    $('#user_login_form').on('submit', async (e) => {
        e.preventDefault();
        removeStyles(user_email_elem);
        removeStyles(user_pass_elem);
        hideErrorMsg(user_email_elem);
        hideErrorMsg(user_pass_elem);
        let body = {
            email: user_email_elem.value,
            password: user_pass_elem.value
        }


        // console.log(user_email_elem);
        // console.log(user_pass_elem);


        await sendDataToPage(body)
            .then((data) => {
                console.log(data.data);
                if (data.data.success == 1) {
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("email", data.data.data.email);
                    localStorage.setItem("uid", data.data.data.uid);
                    localStorage.setItem("gender", data.data.data.gender);
                    localStorage.setItem("number", data.data.data.number);
                    localStorage.setItem("first_name", data.data.data.firstName);
                    localStorage.setItem("last_name", data.data.data.lastName);
                    localStorage.setItem("password", data.data.data.password);

                    window.location.href = "index.html";
                } else if (data.data.success == 0) {

                    showError(user_pass_elem);
                    showErrorMsg(user_pass_elem, data.data.message);

                }

            })


    });


});



const sendDataToPage = async (formdata) => {
    let api = axios.create({ basicurl: 'http://localhost:3001' })
    return api.post("/api/users/login", formdata)
}

//=================== functions ======================
function removeStyles(elem) {
    elem.classList.remove('highlight-error');
    elem.classList.remove('highlight-valid');
}
function showError(elem) {
    removeStyles(elem);
    elem.classList.add('highlight-error');

}

function displayLoading(loadingElem, msg, color = 'grey') {
    loadingElem.style.color = color;
    loadingElem.innerText = msg;


}
function showErrorMsg(elem, msg) {
    var div = elem.nextElementSibling;
    var loadingElem = div.firstElementChild;
    displayLoading(loadingElem, msg, 'red');

}

function hideErrorMsg(elem) {
    var div = elem.nextElementSibling;
    var loadingElem = div.firstElementChild;
    displayLoading(loadingElem, "", 'grey');

}
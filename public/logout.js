$(() => {
    $(".logout").on('click', async (e) => {


        setTimeout(() => {
            localStorage.setItem("token", "");
            localStorage.setItem("email", "");
            localStorage.setItem("uid", "");
            localStorage.setItem("gender", "");
            localStorage.setItem("number", "");
            localStorage.setItem("first_name", "");
            localStorage.setItem("last_name", "");
            localStorage.setItem("password", "");
            window.location.href = "index.html"
        }, 0)

    });
})

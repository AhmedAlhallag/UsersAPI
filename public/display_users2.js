$(() => {
    var token = localStorage.getItem('token')
    console.log(token);
    // var dataTable = $("#users_data_table");

    var dataTable = $("#users_data_table").DataTable({
        "processing": true,
        "serverSide": true,
        "order": [],
        "ajax": {
            url: 'http://localhost:3001/api/users/',
            method: "GET",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
        },
        "columns": [
            { data: "uid" },
            { data: "firstName" },
            { data: "lastName" },
            { data: "gender" },
            { data: "email" },
            { data: "password" },
            { data: "number" },
            { data: `delete` }

        ],
        "columnDefs": [
            {
                "targets": [7],
                "orderable": false,
            },
        ]
    });
    // delete

    $("table").on('click', ".delete", async (e) => {
        // e.preventDefault();
        let text;
        if (confirm("Access Granted.\nAre you sure want to delete this user?") == true) {
            var DeleteBtn = e.currentTarget;
            var user_id = $(DeleteBtn).attr('name')
            console.log("fdgjndhjkl");
            console.log(user_id);


            $.ajax({
                url: 'http://localhost:3001/api/users/' + user_id,
                method: "DELETE",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                },
                "xhrFields": {
                    "withCredentials": true
                },

            });
            dataTable.ajax.reload();
            location.reload()

        }

        // window.location.href = "operations.html";
        // success: function (data) {
        //     // dataTable.empty();
        //     console.log(data.data);
        //     if (data.data.success == 1) {
        //         // window.location.href = "operations.html";                

        //     }
        // }
        // dat

        // let axioxParams = {
        //     config: {
        //         headers: { Authorization: `Bearer ${token}` }
        //     }
        // };
        // await deleteData(user_id, axioxParams)
        //     .then((data) => {
        //         console.log(data.data);
        //         console.log(data.data);
        //         if (data.data.success == 1) {
        //             // window.location.href = "operations.html";                
        //             dataTable.ajax.reload();

        //         }

        //     })


    });







    const deleteData = async (param, config) => {
        let api = axios.create({ basicurl: 'http://localhost:3001' })
        return api.delete("/api/users/" + param, "", config)
    }
});
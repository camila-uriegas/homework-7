$(function () {
    // *********************************************************************
    // Feel free to modify/remove the JS objects below.
    // *********************************************************************

    let username = "UTRGV Vaqueros";

    // const customers = [
    //     {
    //         "name": "Alice Johnson",
    //         "email": "alice@example.com",
    //         "status": "Active",
    //         "joined": "09/10/2026"
    //     },
    //     {
    //         "name": "Robert Smith",
    //         "email": "robert@example.com",
    //         "status": "Pending",
    //         "joined": "09/12/2026"
    //     },
    //     {
    //         "name": "Maria Garcia",
    //         "email": "maria@example.com",
    //         "status": "Active",
    //         "joined": "09/15/2026"
    //     }
    // ];

    const sales = [
        {
            "product": "Product A",
            "quantity": "124",
            "revenue": "$12,400"
        },
        {
            "product": "Product B",
            "quantity": "98",
            "revenue": "$9,800"
        },
        {
            "product": "Product C",
            "quantity": "75",
            "revenue": "$7,500"
        },
    ];

    const activities = [
        {
            "message" : "New customer registered"
        },
        {
            "message" : "Order #10482 completed"
        },
        {
            "message" : "Payment received"
        },
        {
            "message" : "Support ticket created"
        }
    ];



    // There are 13 requirements to implement. 
    const userNameObj = $("#username");
    userNameObj.append(`${username}`);

    // const tableBody = $("#customerTableBody");

    // customers.forEach(customer => {
    //     const row = $("<tr>");

    //     var statusClass;
    //         if (customer.status.toLowerCase() === "active"){
    //             statusClass = "status-active";
    //         } else {
    //             statusClass = "status-pending";
    //         }
    //     row.html(`
    //         <td>${customer.name}</td>
    //         <td>${customer.email}</td>
    //         <td>
    //             <span class="status ${statusClass}">
    //                 ${customer.status}
    //             </span>
    //         </td>
    //         <td>${customer.joined}</td>
    //     `);

    //     tableBody.append(row);
    // });

   

    const activityList = $("#activity-list");

    activities.forEach(activity => {
        const li = $("<li>");
        li.html(`${activity.message}`);
        activityList.append(li);
    });



    // All six jQuery UI functions

    $("button").button();
       
    $("#dashboardTabs").tabs();

    $("#customerDate").datepicker();

    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });

    $("#customerDialog").dialog({
        autoOpen: false,
        modal: true,
        width: 450,
        buttons: {
            "Create Customer": function () {
                var name = $("#customerName").val();
                var email = $("#customerEmail").val();
                if (!name || !email) {
                    alert(
                        "Please enter a name and email."
                    );
                    return;
                }

                alert("Customer created: " + name);
                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }

    });


    $("#newCustomerButton").on(
        "click",
        function () {
            $("#customerDialog").dialog("open");
        }
    );



       


    });

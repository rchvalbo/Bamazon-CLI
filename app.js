var mySQL = require("mysql");
var Inquirer = require("inquirer");
var Customer = require("./customer");
var Admin = require("./admin");


var connection = mySQL.createConnection({
    host: "127.0.0.1",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "RJFtco2007",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    
    //Get current Inventory should be the first thing we do, regardless of account type, so it only makes sense to create a function that will be launched separate from Admin or Customer modules.
    
    Inquirer.prompt({
        name: "accType",
        type: "list",
        message: "Who are you?",
        choices: ["Admin", "Customer"]
    }).then(function (answer) {
        var type = answer.accType;
        if(type === "Admin"){
            
        }
        else {
            
        }
    })
    
    Customer.getCurrentInventory(connection);

});

//curInteraction.showInventory();

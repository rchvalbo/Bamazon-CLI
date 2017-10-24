var Inquirer = require("inquirer");
var mySQL = require("mysql");

exports.Customer = function (username) {

    this.username = username;
    var cart = [];
    this.totalPrice;
    var choices = [];

    var question = [{
        name: "cart",
        message: "Choose an item you want to add to your cart. (Select 'GO TO CART' to checkout) ",
        type: "list",
        choices: choices
            }];
    
    var cart = [{
        
    }]

    this.getCurrentInventory = function (connection) {

        connection.query("SELECT * FROM products", function (err, res) {
            if (err) {
                throw err;
            };

            var inventory = res;
            console.log("This is the inventory: " + inventory);
            return showFunction(inventory);
        });
    };

    //this.cart.push(newCart);
    //console.log(this.cart);


    //gets current item objects from mySQL and stores them in a function-local array.


    this.addToCart = function (item) {
        this.cart.push(item);
        this.totalPrice += item.price;
    }

    this.removeFromCart = function (item) {
        if (this.cart.length === 0) {
            return this.emptyCart();
        };

        var index = this.cart.indexOf(item);
        this.totalPrice -= this.cart[index].price;
        this.cart.splice(index, 1);

    };

    this.updatePrice = function () {
        var newPrice = 0;

        for (var i = 0; i < this.cart.length; i++) {
            newPrice += this.cart[i].price;
        }

        this.totalPrice = newPrice;
    };

    this.emptyCart = function () {
        console.log("No items in your cart!");
        return showInventory();
    };


    function askQuestion(answer) {

        console.log("Made it into the nextQuestion!");
        if (answer.cart == "toCart") {
            return console.log(cart);
        } else if (answer.cart === "empty") {
            return "empty";
        };
        cart.push(answer.cart);
        console.log(answer.cart.product_name + " added to cart!");
        //                console.log(cart);
        return Inquirer.prompt(question).then(askQuestion);
    };

    //Presents this information to the user using Inquirer.
    function showInventory(question) {
        Inquirer.prompt(question).then(askQuestion);

    };


    function showFunction(inventory) {
        var choicesArray = [];
        for (var i = 0; i < inventory.length; i++) {
            var string = "ITEM: " + inventory[i].product_name + " | " + "PRICE: " + inventory[i].price + " | " + inventory[i].department_name;

            var item = {
                value: inventory[i],
                name: string
            };
            choices.push(item);
        }

        choices.push({
            value: "toCart",
            name: "GO TO CART"
        });

        //        var question = [{
        //            name: "cart",
        //            message: "Choose an item you want to add to your cart. (Select 'GO TO CART' to checkout) ",
        //            type: "list",
        //            choices: choicesArray
        //            }];

        return showInventory(question);
    }
};

//exports.interaction = interaction;

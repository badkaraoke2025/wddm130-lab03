// Lab 3 - Client-Side Order Table
// Joseph Collin Richard (n01773477)

var orderCount = 0;
var totalQty = 0;
var totalRevenue = 0;

function getPrice(productType)
{
    var price = 0;

    if (productType == "Laptop")
        price = 1000;
    else if (productType == "Tablet")
        price = 600;
    else if (productType == "Phone")
        price = 400;

    return price;
}

function calculateDiscount(subTotal, quantity, promoCode)
{
    var discount = 0;

    if (quantity >= 3)
        discount = subTotal * 0.10;

    promoCode = promoCode.trim();
    promoCode = promoCode.toUpperCase();

    if (promoCode == "SAVE20")
        discount = discount + 20;

    return discount;
}

function calculateFinalTotal(subTotal, discount)
{
    var afterDiscount = subTotal - discount;
    var tax = afterDiscount * 0.13;
    var finalTotal = afterDiscount + tax;

    return finalTotal;
}

function updateSummary()
{
    document.getElementById("totalOrders").innerHTML = orderCount;
    document.getElementById("totalQuantity").innerHTML = totalQty;
    document.getElementById("totalRevenue").innerHTML = totalRevenue.toFixed(2);
}

function addOrder()
{
    var name = document.getElementById("customerName").value;
    var productType = document.getElementById("productType").value;
    var qtyStr = document.getElementById("quantity").value;
    var promoCode = document.getElementById("promoCode").value;

    var msg = document.getElementById("messageArea");
    msg.innerHTML = "";

    // Customer Name validation (loop required)
    name = name.trim();

    var goodChars = 0;
    for (var i = 0; i < name.length; i++)
    {
        if (name.charAt(i) != " ")
            goodChars++;
    }

    if (goodChars < 2)
    {
        msg.innerHTML = "Customer name must be at least 2 characters (not spaces).";
        return;
    }

    // Quantity validation
    if (qtyStr == "")
    {
        msg.innerHTML = "Quantity is required.";
        return;
    }

    var quantity = parseInt(qtyStr, 10);

    if (isNaN(quantity))
    {
        msg.innerHTML = "Quantity must be a whole number.";
        return;
    }

    if (quantity < 1)
    {
        msg.innerHTML = "Quantity must be at least 1.";
        return;
    }

    if (qtyStr.indexOf(".") != -1)
    {
        msg.innerHTML = "Quantity must be a whole number.";
        return;
    }

    // Calculations
    var price = getPrice(productType);
    var subTotal = price * quantity;
    var discount = calculateDiscount(subTotal, quantity, promoCode);

    if (discount > subTotal)
        discount = subTotal;

    var finalTotal = calculateFinalTotal(subTotal, discount);

    // Running totals (no arrays/objects)
    orderCount++;
    totalQty = totalQty + quantity;
    totalRevenue = totalRevenue + finalTotal;

    // Add a row (table string style like class examples)
    var row = "";
    row += "<tr>";
    row += "<td>" + orderCount + "</td>";
    row += "<td>" + name + "</td>";
    row += "<td>" + productType + "</td>";
    row += "<td>" + quantity + "</td>";
    row += "<td>$" + subTotal.toFixed(2) + "</td>";
    row += "<td>$" + discount.toFixed(2) + "</td>";
    row += "<td>$" + finalTotal.toFixed(2) + "</td>";
    row += "</tr>";

    document.getElementById("ordersBody").innerHTML =
        document.getElementById("ordersBody").innerHTML + row;

    updateSummary();

    msg.innerHTML = "Order added.";

    document.getElementById("orderForm").reset();
    document.getElementById("customerName").focus();
}

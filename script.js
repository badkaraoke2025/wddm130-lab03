// Global variables for tracking totals
let orderCount = 0;
let totalQty = 0;
let totalRevenue = 0;

function getPrice(productType) {
    if (productType === "Laptop") {
        return 1000;
    } else if (productType === "Tablet") {
        return 600;
    } else if (productType === "Phone") {
        return 400;
    } else {
        return 0;
    }
}

function calculateDiscount(subTotal, quantity, promoCode) {
    let discount = 0;

 // Bulk discount: 10% if quantity >= 3
    if (quantity >= 3) {
        discount = subTotal * 0.10;
    }

 // Promo code: subtract $20 if code is SAVE20
    if (promoCode === "SAVE20") {
        discount = discount + 20;
    }

    return discount;
}

function calculateFinalTotal(subTotal, discount) {
    let afterDiscount = subTotal - discount;
    let tax = afterDiscount * 0.13;
    let finalTotal = afterDiscount + tax;
    return finalTotal;
}

function updateSummary() {
    document.getElementById("totalOrders").textContent = orderCount;
    document.getElementById("totalQuantity").textContent = totalQty;
    document.getElementById("totalRevenue").textContent = totalRevenue.toFixed(2);
}

function addOrder() {
 // Get input values
    let name = document.getElementById("customerName").value;
    let product = document.getElementById("productType").value;
    let qtyInput = document.getElementById("quantity").value;
    let promoCode = document.getElementById("promoCode").value.trim().toUpperCase();

    let messageArea = document.getElementById("messageArea");

 // Validation: Customer Name
 // Trim spaces
    name = name.trim();

 // Check if empty
    if (name === "") {
        messageArea.textContent = "Error: Customer name cannot be empty.";
        messageArea.className = "error";
        return;
    }

 // Check minimum 2 characters using a loop
    let charCount = 0;
    for (let i = 0; i < name.length; i++) {
        charCount = charCount + 1;
    }

    if (charCount < 2) {
        messageArea.textContent = "Error: Customer name must be at least 2 characters.";
        messageArea.className = "error";
        return;
    }

 // Validation: Product Type
    if (product === "") {
        messageArea.textContent = "Error: Please select a product type.";
        messageArea.className = "error";
        return;
    }

 // Validation: Quantity
    let qty = parseInt(qtyInput);

    if (isNaN(qty)) {
        messageArea.textContent = "Error: Quantity must be a number.";
        messageArea.className = "error";
        return;
    }

    if (qty < 1) {
        messageArea.textContent = "Error: Quantity must be at least 1.";
        messageArea.className = "error";
        return;
    }

    if (qty !== parseFloat(qtyInput)) {
        messageArea.textContent = "Error: Quantity must be a whole number.";
        messageArea.className = "error";
        return;
    }

 // All validation passed - perform calculations
    let unitPrice = getPrice(product);
    let subTotal = unitPrice * qty;
    let discount = calculateDiscount(subTotal, qty, promoCode);
    let finalTotal = calculateFinalTotal(subTotal, discount);

 // Increment order count
    orderCount = orderCount + 1;

 // Add row to table
    let tableBody = document.getElementById("ordersBody");
    let newRow = tableBody.insertRow();

    newRow.insertCell(0).textContent = orderCount;
    newRow.insertCell(1).textContent = name;
    newRow.insertCell(2).textContent = product;
    newRow.insertCell(3).textContent = qty;
    newRow.insertCell(4).textContent = "$" + subTotal.toFixed(2);
    newRow.insertCell(5).textContent = "$" + discount.toFixed(2);
    newRow.insertCell(6).textContent = "$" + finalTotal.toFixed(2);

 // Update global totals
    totalQty = totalQty + qty;
    totalRevenue = totalRevenue + finalTotal;

 // Update summary display
    updateSummary();

 // Show success message
    messageArea.textContent = "Order added successfully!";
    messageArea.className = "success";

 // Clear form inputs
    document.getElementById("customerName").value = "";
    document.getElementById("productType").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("promoCode").value = "";
}

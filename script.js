// Running totals (multiple purchases)
let purchaseCount = 0;
let totalTicketsSold = 0;
let vipTicketsSold = 0;
let grandTotal = 0;

// Button events
document.getElementById("purchaseBtn").addEventListener("click", addPurchase);
document.getElementById("finishBtn").addEventListener("click", showSummary);

function addPurchase() {
  // We'll read inputs and validate them first
  let type;
  let quantity;
  let promo;

  // Ticket type validation (use do-while because validation depends on input)
  do {
    type = document.getElementById("ticketType").value.trim().toUpperCase();

    // Only allow REG, STU, VIP (case-insensitive)
    if (type !== "REG" && type !== "STU" && type !== "VIP") {
      alert("Invalid ticket type. Enter REG, STU, or VIP.");
      return; // stop - do not update totals
    }
  } while (false);

  // Quantity validation (whole number >= 1)
  do {
    // NOTE: Number("") becomes 0, so blanks will fail the < 1 check too.
    quantity = Number(document.getElementById("quantity").value);

    // Reject blanks, decimals, negatives, non-numbers
    if (!Number.isInteger(quantity) || quantity < 1) {
      alert("Quantity must be a whole number (1 or more).");
      return; // stop - do not update totals
    }
  } while (false);

  // Promo code is optional
  promo = document.getElementById("promo").value.trim().toUpperCase();

  // 1) Determine price
  let price = getPrice(type);

  // 2) Subtotal
  let subtotal = price * quantity;

  // 3) Bulk discount: qty >= 5 -> 10% off subtotal
  let discount = 0;
  if (quantity >= 5) {
    discount = subtotal * 0.10;
  }

  // 4) VIP fee: VIP and qty >= 2 -> add $5 once
  let vipFee = 0;
  if (type === "VIP" && quantity >= 2) {
    vipFee = 5.00;
  }

  // Subtotal after discount + fee (before promo)
  let beforePromo = subtotal - discount + vipFee;

  // 5) Promo SAVE5: subtract $5 (min $0 before tax)
  let promoDiscount = 0;
  if (promo === "SAVE5") {
    promoDiscount = 5.00;
    beforePromo = beforePromo - promoDiscount;
    if (beforePromo < 0) beforePromo = 0;
  }

  // 6) Apply 13% tax (after discounts/fees/promo)
  let tax = beforePromo * 0.13;

  // 7) Final total
  let total = beforePromo + tax;

  // Update running totals (multiple purchases)
  purchaseCount++;
  totalTicketsSold += quantity;
  if (type === "VIP") vipTicketsSold += quantity;
  grandTotal += total;

  // Output a receipt to the page
  addReceipt(type, quantity, price, subtotal, discount, vipFee, promoDiscount, tax, total);

  // (Optional) live summary update after each purchase
  showSummary();
}

function getPrice(type) {
  // Ticket types and base prices
  if (type === "REG") return 12.50;
  if (type === "STU") return 9.00;
  return 25.00; // VIP
}

function addReceipt(type, qty, price, subtotal, discount, vipFee, promo, tax, total) {
  // Add one receipt per purchase
  document.getElementById("receipt").innerHTML += `
    <table>
      <tr><th colspan="2">Receipt</th></tr>
      <tr><td>${type} Tickets</td><td>${qty} x $${price.toFixed(2)}</td></tr>
      <tr><td>Sub Total</td><td>$${subtotal.toFixed(2)}</td></tr>
      <tr><td>Discount</td><td>-$${discount.toFixed(2)}</td></tr>
      <tr><td>VIP Fee</td><td>$${vipFee.toFixed(2)}</td></tr>
      <tr><td>Promo</td><td>-$${promo.toFixed(2)}</td></tr>
      <tr><td>Taxes</td><td>$${tax.toFixed(2)}</td></tr>
      <tr><td><strong>Total</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr>
    </table><br>
  `;
}

function showSummary() {
  // Show final totals (or current totals if clicked anytime)
  document.getElementById("summary").innerHTML = `
    <p>Purchases: ${purchaseCount}</p>
    <p>Total Tickets Sold: ${totalTicketsSold}</p>
    <p>VIP Tickets Sold: ${vipTicketsSold}</p>
    <p>Grand Total: $${grandTotal.toFixed(2)}</p>
  `;
}

function navigateToCreate() {
    window.location.href = "/public/new-order.html";
}

function viewOrders() {
    window.location.href = "purchase_order.html#view";
}

function editOrder() {
    const orderId = document.getElementById("editOrderId").value.trim();
    if (!orderId) {
        alert("Please enter Order ID");
        return;
    }
    window.location.href = `purchase_order.html?edit=${orderId}`;
}

function deleteOrder() {
    const orderId = document.getElementById("deleteOrderId").value.trim();
    if (!orderId) {
        alert("Please enter Order ID");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("purchaseOrders")) || [];
    const index = orders.findIndex(o => o.id === orderId);

    if (index === -1) {
        alert("Order ID not found");
        return;
    }

    if (confirm("Are you sure you want to delete this order?")) {
        orders.splice(index, 1);
        localStorage.setItem("purchaseOrders", JSON.stringify(orders));
        alert("Order deleted successfully");
    }
}

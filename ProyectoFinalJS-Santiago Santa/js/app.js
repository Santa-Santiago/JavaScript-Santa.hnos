const TAX_RATE = 0.21;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const products = [
    { id: 1, name: "Bolsa de Cemento", price: 12000 },
    { id: 2, name: "Ladrillos Rojos", price: 450000 },
    { id: 3, name: "Pintura Blanca", price: 65000 },
    { id: 4, name: "Varillas de Acero", price: 80000 },
    { id: 5, name: "Arena de Construcción", price: 15000 },
    { id: 6, name: "Cemento Prefabricado", price: 55000 },
    { id: 7, name: "Escalera De Aluminio", price: 149000 },
    { id: 8, name: "Taladro Diamante", price: 55000 }
];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let quantity = prompt(`¿Cuántas unidades de ${product.name} desea añadir al carrito?`, "1");
    quantity = parseInt(quantity);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
        return;
    }

    let confirmAdd = confirm(`¿Confirma añadir ${quantity} unidad(es) de ${product.name} al carrito?`);
    if (confirmAdd) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ id: productId, name: product.name, price: product.price, quantity: quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`${quantity} unidad(es) de ${product.name} añadida(s) al carrito.`);
        alert(`${quantity} unidad(es) de ${product.name} añadida(s) al carrito.`);
        updateCartMenu();
    }
}

function calculateTotal(discount = 0) {
    let total = 0;
    for (let item of cart) {
        total += item.price * item.quantity;
    }
    let tax = total * TAX_RATE;
    let discountAmount = total * discount;
    let grandTotal = total + tax - discountAmount; // Fixed: Ensure discount is subtracted

    return { total, tax, discountAmount, grandTotal };
}

function checkCart() {
    let name = prompt("Ingrese su nombre para revisar el carrito:");
    if (!name) {
        alert("Nombre no válido. Intente de nuevo.");
        return;
    }

    if (cart.length === 0) {
        alert(`Hola ${name}, tu carrito está vacío.`);
        console.log(`Carrito vacío para ${name}.`);
        return;
    }

    let totalItems = 0;
    let summary = `Hola ${name}, tu carrito contiene:\n`;
    for (let item of cart) {
        summary += `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toLocaleString()}\n`;
        totalItems += item.quantity;
    }

    let discount = totalItems >= 5 ? 0.1 : 0;
    if (discount > 0) {
        alert("¡Felicidades! Obtienes un 10% de descuento por comprar 5 o más ítems.");
    }

    const { total, tax, discountAmount, grandTotal } = calculateTotal(discount);
    console.log(summary);
    console.log(`Subtotal: $${total.toLocaleString()}`);
    console.log(`Impuestos (21%): $${tax.toLocaleString()}`);
    if (discount > 0) {
        console.log(`Descuento (${discount * 100}%): -$${discountAmount.toLocaleString()}`);
    }
    console.log(`Total a pagar: $${grandTotal.toLocaleString()}`);
    alert(`Resumen del carrito:\n${summary}Subtotal: $${total.toLocaleString()}\nImpuestos (21%): $${tax.toLocaleString()}${discount > 0 ? `\nDescuento (${discount * 100}%): -$${discountAmount.toLocaleString()}` : ''}\nTotal a pagar: $${grandTotal.toLocaleString()}`);
}

function toggleCartMenu() {
    const cartMenu = document.getElementById('cartMenu');
    if (cartMenu) {
        cartMenu.classList.toggle('show');
        updateCartMenu();
    }
}

function updateCartMenu() {
    const cartItemsDiv = document.getElementById('cartItems');
    const summaryDiv = document.getElementById('cartSummary');
    if (!cartItemsDiv) return;

    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
        if (summaryDiv) {
            summaryDiv.innerHTML = '';
        }
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price.toLocaleString()} x </span>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">–</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="delete-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    if (summaryDiv) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const discount = totalItems >= 5 ? 0.1 : 0;
        const { total, tax, discountAmount, grandTotal } = calculateTotal(discount);
        summaryDiv.innerHTML = `
            <div class="summary-item">
                <span>Subtotal</span>
                <span>$${total.toLocaleString()}</span>
            </div>
            <div class="summary-item">
                <span>Impuestos (21%)</span>
                <span>$${tax.toLocaleString()}</span>
            </div>
            ${discount > 0 ? `
            <div class="summary-item">
                <span>Descuento (${discount * 100}%)</span>
                <span>-$${discountAmount.toLocaleString()}</span>
            </div>` : ''}
            <div class="total">
                <span>Total</span>
                <span>$${grandTotal.toLocaleString()}</span>
            </div>
        `;
    }
}

function updateQuantity(itemId, change) {
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== itemId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartMenu();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartMenu();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartMenu();
});
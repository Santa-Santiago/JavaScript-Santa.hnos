        const TAX_RATE = 0.21; 
        let cart = [];
        const products = [
            { name: "Bolsa de Cemento", price: 12000 },
            { name: "Ladrillos Rojos", price: 450000 },
            { name: "Pintura Blanca", price: 65000 },
            { name: "Varillas de Acero", price: 80000 },
            { name: "Arena de Construcción", price: 15000 },
            { name: "Cemento Prefabricado", price: 55000 },
            { name: "Escalera De Aluminio", price: 149000 },
            { name: "Taladro Diamante", price: 55000 }
        ];

        function addToCart(productName, price) {
            let quantity = prompt(`¿Cuántas unidades de ${productName} desea añadir al carrito?`, "1");
            quantity = parseInt(quantity);

            if (isNaN(quantity) || quantity <= 0) {
                alert("Por favor, ingrese una cantidad válida.");
                return;
            }

            let confirmAdd = confirm(`¿Confirma añadir ${quantity} unidad(es) de ${productName} al carrito?`);
            if (confirmAdd) {
                cart.push({ name: productName, price: price, quantity: quantity });
                console.log(`${quantity} unidad(es) de ${productName} añadida(s) al carrito.`);
                alert(`${quantity} unidad(es) de ${productName} añadida(s) al carrito.`);
            }
        }

        function calculateTotal(discount = 0) {
            let total = 0;
            for (let i = 0; i < cart.length; i++) {
                total += cart[i].price * cart[i].quantity;
            }
            let tax = total * TAX_RATE;
            let discountAmount = total * discount;
            let grandTotal = total + tax - discountAmount;

            console.log(`Subtotal: $${total.toLocaleString()}`);
            console.log(`Impuestos (19%): $${tax.toLocaleString()}`);
            if (discount > 0) {
                console.log(`Descuento (${discount * 100}%): $${discountAmount.toLocaleString()}`);
            }
            console.log(`Total a pagar: $${grandTotal.toLocaleString()}`);
            alert(`Resumen del carrito:\nSubtotal: $${total.toLocaleString()}\nImpuestos (19%): $${tax.toLocaleString()}${discount > 0 ? `\nDescuento (${discount * 100}%): $${discountAmount.toLocaleString()}` : ''}\nTotal a pagar: $${grandTotal.toLocaleString()}`);
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

            let discount = 0;
            if (totalItems >= 5) {
                discount = 0.1; 
                alert("¡Felicidades! Obtienes un 10% de descuento por comprar 5 o más ítems.");
            }

            console.log(summary);
            alert(summary);
            if (discount > 0) {
                console.log(`Descuento aplicado: ${discount * 100}%`);
            }
            calculateTotal(discount);
        }

        
        document.addEventListener("DOMContentLoaded", () => {
            let checkCartPrompt = confirm("¿Desea revisar su carrito ahora?");
            if (checkCartPrompt) {
                checkCart();
            }
        });


const productTable = document.getElementById('productTable');

const fetchProducts=()=>{
    fetch('http://localhost:5000/products')
    .then(response => response.json())
    .then(data => {
        productTable.innerHTML = '';
        data.forEach((product) => {
            
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.supplier}</td>
                <button>edit</button>
                <button onClick="deleteProduct(${product.id},this)">delete</button>
            `;
            
            productTable.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching products:', error)
);
}

fetchProducts();

const deleteProduct=(id, buttonElement)=>{
 console.log("deleted:", id)
 fetch(`http://localhost:5000/products/${id}`,{
    method:'DELETE'
 }).then(response=>{
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
    return response.json();
 }).then(data=>{
    console.log(data.message)

    const row = buttonElement.closest('tr');
    row.remove();
   
 })
 .catch(error => console.error('Error deleting product:', error));
}

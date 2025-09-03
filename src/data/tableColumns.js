const tableColumns = {
 //Inventory table
  inventory: [
    { key: "itemName", label: "Item Name" },
    { key: "category", label: "Category" },
    { key: "sku", label: "SKU" },
    { key: "stock", label: "Stock" },
    { key: "price", label: "Price ($)" }
  ],

  // Sales table
  sales: [
    { key: "customerName", label: "Customer" },       
    { key: "itemsList", label: "Items" },          
    { key: "totalAmount", label: "Total ($)" },
    { key: "paidAmount", label: "Paid ($)" },
    { key: "dueAmount", label: "Due ($)" },
    { key: "paymentType", label: "Payment Type" },
    // { key: "createdAt", label: "Date" }
  ],

  // Customers table
  customer: [
    { key: "customerName", label: "Name" },
    { key: "customerPhone", label: "Phone" },
    { key: "customerEmail", label: "Email" },
    { key: "customerAddress", label: "Address" },
    { key: "creditBalance", label: "Credit Balance ($)" }
  ]
};



export default tableColumns;
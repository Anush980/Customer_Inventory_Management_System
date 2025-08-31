export const tableVariants = {
  sales: {
    title: "Recent Orders",
    columns: [
      { label: "Order ID", key: "id" },
      { label: "Customer", key: "customer" },
      { label: "Time", key: "time" },
      { label: "Amount", key: "amount" },
      { label: "Status", key: "status" },
    ],
    data: [
      {
        id: "#ORD-1001",
        customer: "Anush Shrestha",
        time: "",
        amount: "Rs. 245",
        status: "Completed",
      },
      {
        id: "#ORD-1002",
        customer: "tangusuwang",
        time: "May 12, 2024",
        amount: "Rs. 2445",
        status: "Completed",
      },
      {
        id: "#ORD-1003",
        customer: "Mohan katuwal",
        time: "May 11, 2024",
        amount: "Rs. 455",
        status: "Pending",
      },
      {
        id: "#ORD-1004",
        customer: "dahal bhau",
        time: "May 11, 2024",
        amount: "Rs. 575",
        status: "Completed",
      },
      {
        id: "#ORD-1005",
        customer: "ching chag",
        time: "May 10, 2024",
        amount: "Rs. 459",
        status: "Cancelled",
      },
    ],
  },
  inventory: {
    title: "Inventory",
    columns: [
      { label: "Product", key: "item" },
      { label: "SKU", key: "id" },
      { label: "Category", key: "category" },
      { label: "Stock", key: "stock" },
      { label: "Price", key: "price" },
    ],
    data: [
      {
        id: "WH-1001",
        item: "Wireless Headphones",
        stock: 50,
        price: "$1000",
        category:"Electronics"
      },
      {
        id: "SW-2005",
        item: "Smart Watch",
        stock: 200,
        price: "$25",
        category:"Electronics"
      },
      {
        id: "BS-3012",
        item: "Bluetooth Speaker",
        stock: 150,
        price: "$45",   
        category:"Electronics"
      },
    ],
  },
};

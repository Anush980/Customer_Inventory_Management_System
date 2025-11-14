const categoryOptions = [
  {
    value: "",
    label: "All categories",
  },
  {
    value: "accessories",
    label: "Accessories",
  },
  {
    value: "kitchen-appliances",
    label: "Kitchen Appliances",
  },
  {
    value: "home-goods",
    label: "Home Goods",
  },
  {
    value: "others",
    label: "Others",
  },
];

const statusOptions = [
  {
    value: "",
    label: "All Stock",
  },
  {
    value: "low",
    label: "Low stock",
  },
  {
    value: "out",
    label: "Out of Stock",
  },
];

module.exports = { statusOptions, categoryOptions };

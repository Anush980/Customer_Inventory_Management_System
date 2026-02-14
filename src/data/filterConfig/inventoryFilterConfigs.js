const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "mobiles", label: "Mobiles & Accessories" },
  { value: "computers", label: "Computer & Parts" },
  { value: "home", label: "Home Appliances" },
  { value: "gaming", label: "Gaming" },
  { value: "office", label: "Office Electronics" },
  { value: "audio", label: "Audio & Music" },
  { value: "others", label: "Others" }
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

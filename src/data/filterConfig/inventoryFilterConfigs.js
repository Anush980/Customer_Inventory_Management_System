const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "laptops-computers", label: "Laptops & Computers" },
  { value: "computer-accessories", label: "Computer Accessories" },
  { value: "pc-components", label: "PC Components" },
  { value: "networking", label: "Networking Devices" },
  { value: "smartphones-tablets", label: "Smartphones & Tablets" },
  { value: "audio", label: "Audio Devices" },
  { value: "gaming", label: "Gaming" },
  { value: "home-appliances", label: "Home Appliances" },
  { value: "office-electronics", label: "Office Electronics" },
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

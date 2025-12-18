const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "laptops-computers", label: "Computers" },
  { value: "computer-acces", label: "Computer Accessories" },
  { value: "pc-components", label: "PC Components" },
  { value: "networking", label: "Networking Devices" },
  { value: "mobiles", label: "Mobiles" },
  { value: "audio", label: "Audio Devices" },
  { value: "gaming", label: "Gaming" },
  { value: "home-appliances", label: "Home Appliances" },
  { value: "office-electronics", label: "Office" },
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


const categoryOptions = [
  { value: "", label: "All Users" },
  { value: "admin", label: "Admin" },
  { value: "staff", label: "Staff" },
  { value: "owner", label: "Owner" },
];
const sortOptions = [
   { value: "latest", label: "Latest Users" },
  { value: "oldest", label: "Oldest Users" },
 
  
];

module.exports = { sortOptions,categoryOptions };

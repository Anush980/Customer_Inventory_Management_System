const BASE_URL = `${process.env.REACT_APP_API_URL}/api/inventory`;

// Fetch inventory with filters
export const getItems = async ({ search = "", category = "", sort = "newest", stock = "" } = {}) => {
    const query = new URLSearchParams();
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (sort) query.append("sort", sort);
    if (stock) query.append("stock", stock);

    const res = await fetch(`${BASE_URL}?${query.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch items.");
    return res.json();
};

// Create or update item 
export const saveItem = async (item) => {
    const method = item._id ? "PUT" : "POST";
    const url = item._id ? `${BASE_URL}/${item._id}` : BASE_URL;

    const formData = new FormData();

    // Append all item fields
    for (const key in item) {
        if (key !== "imageFile") formData.append(key, item[key]);
    }

    // Append image file if provided
    if (item.imageFile) {
        formData.append("image", item.imageFile);
    }

    const res = await fetch(url, {
        method,
        body: formData, // NO HEADERS — browser sets multipart automatically
    });

    if (!res.ok) throw new Error("Failed to save item.");

    return res.json();
};

// Delete item
export const deleteItem = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete item.");

    return res.json();
};

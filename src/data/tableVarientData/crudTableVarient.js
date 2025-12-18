const crudTableVarient = {
    sales:[
        
        {
            heading:"Sales",
            name:{label:"Product Name",type:"text"},
            category:{label:"Category" ,type:"select",options:["Electronics","Mobile & tablets","Laptops & accessories","Home Supplies","Others"] },
            price:{label:"Price",type:"number"}
        }

    ],
    inventory:[
        {
            heading:"Item",
            name:{label:"Product Name" ,type:"text"},
            sku:{label:"SKU",type:"text"},
            category:{label:"Category",type:"select",options:["Mobile & tablets","Laptops & accessories","Home Supplies","Others"] },
            stock:{label:"Stock",type:"number"},
            price:{label:"Price", type:"number"}

        }
    ],
    customer:[{
            heading:"Customer",
            name:{label:"Customer Name",type:"text"},
            phone:{label:"Phone", type:"number"},
            email:{label:"Email", type:"email"},
            address:{label:"Address",type:"text"}

        }
    ],
     staff:[{
            heading:"Staff",
            name:{label:"Staff Name",type:"text"},
            phone:{label:"Phone", type:"number"},
            email:{label:"Email", type:"email"},
            address:{label:"Address",type:"text"}

        }
    ]
}
export default crudTableVarient;
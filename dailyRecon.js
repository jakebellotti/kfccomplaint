function createDividerRow(name) {
    let row = document.createElement("tr");
    row.classList.add("divider-row");
    let td = document.createElement("td");
    td.innerText = name;
    td.setAttribute("colspan", "7");
    row.appendChild(td);
    return row;
}

function createTableEntry(name) {
    let row = document.createElement("tr");

    let nameTD = document.createElement("td");
    nameTD.innerText = name;
    nameTD.classList.add("name-td");

    let openTD = document.createElement("td");
    let receivedTD = document.createElement("td");
    let wastedTD = document.createElement("td");
    let totalTD = document.createElement("td");
    let closedTD = document.createElement("td");
    let soldTD = document.createElement("td");

    row.appendChild(nameTD);
    row.appendChild(openTD);
    row.appendChild(receivedTD);
    row.appendChild(wastedTD);
    row.appendChild(totalTD);
    row.appendChild(closedTD);
    row.appendChild(soldTD);

    return row;
}

function createTableEntries() {
    let products = document.getElementById("products");
    //TODO dividers
    products.appendChild(createDividerRow("Chicken"));
    products.appendChild(createTableEntry("Original Recipe"));
    products.appendChild(createTableEntry("Hot & Spicy"));
    products.appendChild(createTableEntry("Original Fillets"));
    products.appendChild(createTableEntry("Zinger Fillets"));
    products.appendChild(createTableEntry("Wicked Wings"));

    products.appendChild(createDividerRow("Freezer"));
    products.appendChild(createTableEntry("Chicken Nuggets"));
    products.appendChild(createTableEntry("Popcorn Chicken"));
    products.appendChild(createTableEntry("Chips"));
    products.appendChild(createTableEntry("Bacon"));
    products.appendChild(createTableEntry("Chocolate Mousse"));

    products.appendChild(createDividerRow("Salads"));
    products.appendChild(createTableEntry("Diced Tomato"));
    products.appendChild(createTableEntry("Lettuce"));
    products.appendChild(createTableEntry("Coleslaw (Small)"));
    products.appendChild(createTableEntry("Coleslaw (Large)"));

    products.appendChild(createDividerRow("Breads"));
    products.appendChild(createTableEntry("Burger Buns"));
    products.appendChild(createTableEntry("Dinner Rolls"));
    products.appendChild(createTableEntry("Flatbread"));
    products.appendChild(createTableEntry("Tortillas"));

    //TODO handle promo different
    products.appendChild(createDividerRow("Misc"));
    products.appendChild(createTableEntry("Promo"));

}

createTableEntries();
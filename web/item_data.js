const allProductsData = [
    {
        itemID: "506843",
        itemIdentifier: "hot_rods",
        itemNamePref: "Hot Rods",
        itemNameFull: "Hot Rods",
        category: "chicken",
        availability: "promotion",
        unit: "KG",
        storageCase: {
            name: "Crates",
            quantity: "200"
        },
        // storageInner: {
        //     name: "",
        //     quantity: ""
        // },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Pieces", method: "individual"}]
    },
    {
        itemID: "507029",
        itemIdentifier: "original_recipe_fillets",
        itemNamePref: "Original Fillets",
        itemNameFull: "Original Recipe Fillets",
        category: "chicken",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Crates",
            quantity: 120
        },
        storageInner: {
            name: "Bags",
            quantity: 10
        },
        storageUnit: {
            name: "Individual",
            quantity: 1
        },
        calculationMethods: [{name: "Fillets", method: "individual"}]
    },
    {
        itemID: "506932",
        itemIdentifier: "zinger_fillets",
        itemNamePref: "Zinger Fillets",
        itemNameFull: "Zinger Fillets",
        category: "chicken",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Crates",
            quantity: 120
        },
        storageInner: {
            name: "Bags",
            quantity: 10
        },
        storageUnit: {
            name: "Individual",
            quantity: 1
        },
        calculationMethods: [{name: "Zingers", method: "individual"}]
    },
    {
        itemID: "507521",
        itemIdentifier: "original_recipe_fillets_frozen",
        itemNamePref: "Frozen OR Fillet",
        itemNameFull: "Frozen Original Recipe Fillet",
        category: "frozen_chicken",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Box",
            quantity: "120"
        },
        storageInner: {
            name: "Bag",
            quantity: "30"
        },
        calculationMethods: [{name: "Fillets", method: "individual"}]
    },
    {
        itemID: "505854",
        itemIdentifier: "original_recipe_cob",
        itemNamePref: "Original Recipe",
        itemNameFull: "Original Recipe COB",
        category: "chicken",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Crates",
            quantity: 108
        },
        storageInner: {
            name: "Bags",
            quantity: 18
        },
        storageUnit: {
            name: "Individual",
            quantity: 1
        },
        calculationMethods: [{name: "Pieces", method: "individual"}, {name: "Head", method: "head"}]
    },
    {
        itemID: "505476",
        itemIdentifier: "hot_and_spicy_cob",
        itemNamePref: "Hot & Spicy",
        itemNameFull: "Hot & Spicy COB",
        category: "chicken",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Crates",
            quantity: 108
        },
        storageInner: {
            name: "Bags",
            quantity: 18
        },
        storageUnit: {
            name: "Individual",
            quantity: 1
        },
        calculationMethods: [{name: "Pieces", method: "individual"}, {name: "Head", method: "head"}]
    },
    {
        itemID: "504136",
        itemIdentifier: "original_recipe_cob_frozen",
        itemNamePref: "Original Recipe Frozen",
        itemNameFull: "Original Recipe COB Frozen",
        category: "frozen_chicken",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Crates",
            quantity: "108"
        },
        storageInner: {
            name: "Bags",
            quantity: "18"
        },
        calculationMethods: [{name: "Pieces", method: "individual"}, {name: "Head", method: "head"}]
    },
    {
        itemID: "507030",
        itemIdentifier: "original_tenders",
        itemNamePref: "Tenders",
        itemNameFull: "Original Recipe Tenders",
        category: "chicken",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Crates",
            quantity: "300"
        },
        storageInner: {
            name: "Bags",
            quantity: "20"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Tenders", method: "individual"}]
    },
    {
        itemID: "505849",
        itemIdentifier: "wicked_wings",
        itemNamePref: "Wicked Wings",
        itemNameFull: "Wicked Wings",
        category: "chicken",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Crates",
            quantity: "225"
        },
        storageInner: {
            name: "Bags",
            quantity: "25"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Wings", method: "individual"}]
    },
    {
        itemID: "506259",
        itemIdentifier: "chicken_nuggets",
        itemNamePref: "Chicken Nuggets",
        itemNameFull: "Chicken Nuggets",
        category: "freezer",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Boxes",
            quantity: "720"
        },
        storageInner: {
            name: "Bags",
            quantity: "36"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{
            name: "Nuggets",
            method: "individual"
        }]
    },
    {
        itemID: "506868",
        itemIdentifier: "popcorn_chicken",
        itemNamePref: "Popcorn Chicken",
        itemNameFull: "Popcorn Chicken",
        category: "freezer",
        availability: "always",
        unit: "KG",
        storageCase: {
            name: "Boxes",
            quantity: "12"
        },
        storageInner: {
            name: "Bags",
            quantity: "1"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "KG", method: "individual"}]
    },
    {
        itemID: "502677",
        itemIdentifier: "chips_aviko",
        itemNamePref: "Chips (Aviko)",
        itemNameFull: "Chips (Aviko)",
        category: "freezer",
        availability: "",
        unit: "KG",
        storageCase: {
            name: "Boxes",
            quantity: "14"
        },
        storageInner: {
            name: "Bags",
            quantity: "2"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "KG", method: "individual"}]
    },
    {
        itemID: "504993",
        itemIdentifier: "coleslaw_small",
        itemNamePref: "Coleslaw (Small)",
        itemNameFull: "Coleslaw (Small) 110gm",
        category: "salads",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Boxes",
            quantity: "36"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Pieces", method: "individual"}]
    },
    {
        itemID: "504991",
        itemIdentifier: "coleslaw_large",
        itemNamePref: "Coleslaw (Large)",
        itemNameFull: "Coleslaw (Large) 450gm",
        category: "salads",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Boxes",
            quantity: "24"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "pieces", method: "individual"}]
    },
    {
        itemID: "504994",
        itemIdentifier: "lettuce",
        itemNamePref: "Lettuce",
        itemNameFull: "Lettuce",
        category: "salads",
        availability: "always",
        unit: "KG",
        storageCase: {
            name: "Boxes",
            quantity: "10"
        },
        storageInner: {
            name: "Bags",
            quantity: "2.5"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "KG", method: "individual"}]
    },
    {
        itemID: "504990",
        itemIdentifier: "diced_tomato",
        itemNamePref: "Diced Tomato",
        itemNameFull: "Diced Tomato",
        category: "salads",
        availability: "always",
        unit: "KG",
        storageCase: {
            name: "Boxes",
            quantity: "5"
        },
        storageInner: {
            name: "Bags",
            quantity: "2.5"
        },
        storageUnit: {
            name: "Individual",
            quantity: 1
        },
        calculationMethods: [{name: "KG", method: "individual"}]
    },
    {
        //TODO get real id
        itemID: "?",
        itemIdentifier: "bacon_streaky",
        itemNamePref: "Bacon",
        itemNameFull: "Bacon (Streaky)",
        category: "misc",
        availability: "always",
        unit: "KG",
        storageCase: {
            name: "Boxes",
            quantity: "10"
        },
        storageInner: {
            name: "Bags",
            quantity: "2.5"
        },
        calculationMethods: [{name: "KG", method: "individual"}]
    },
    {
        //TODO get identifier
        itemID: "?",
        itemIdentifier: "chocolate_mousse",
        itemNamePref: "Chocolate Mousse",
        itemNameFull: "Chocolate Mousse",
        category: "misc",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Boxes",
            quantity: "45"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Pieces", method: "individual"}]
    },
    {
        itemID: "503449",
        itemIdentifier: "burger_buns_arby",
        itemNamePref: "Burger Buns",
        itemNameFull: "Burger Buns",
        category: "bread",
        availability: "always",
        unit: "EA",
        //TODO is this correct?
        // storageCase: {
        //     name: "",
        //     quantity: ""
        // },
        storageInner: {
            name: "Bags",
            quantity: "12"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Buns", method: "individual"}]
    },
    {
        itemID: "506875",
        itemIdentifier: "flatbread",
        itemNamePref: "Flatbread",
        itemNameFull: "Flatbread Sliders",
        category: "bread",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Boxes",
            quantity: "96"
        },
        storageInner: {
            name: "Bags",
            quantity: "8"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Sliders", method: "individual"}]
    },
    {
        itemID: "502265",
        itemIdentifier: "dinner_rolls",
        itemNamePref: "Dinner Rolls",
        itemNameFull: "Dinner Rolls",
        category: "bread",
        availability: "always",
        unit: "EA",
        //TODO dinner roll crate
        // storageCase: {
        //     name: "",
        //     quantity: ""
        // },
        storageInner: {
            name: "Bags",
            quantity: "12"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Rolls", method: "individual"}]
    },
    {
        itemID: "506787",
        itemIdentifier: "tortillas",
        itemNamePref: "Tortillas",
        itemNameFull: "Tortillas",
        category: "bread",
        availability: "always",
        unit: "EA",
        storageCase: {
            name: "Boxes",
            quantity: "192"
        },
        storageInner: {
            name: "Bags",
            quantity: "12"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Tortillas", method: "individual"}]
    },
    {
        //TODO get item ID
        itemID: "???",
        itemIdentifier: "hash_browns",
        itemNamePref: "Hash Browns",
        itemNameFull: "Hash Browns",
        category: "freezer",
        availability: "promotion",
        unit: "EA",
        storageCase: {
            name: "Boxes",
            quantity: "168"
        },
        storageInner: {
            name: "Bags",
            quantity: "28"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Hash Browns", method: "individual"}]
    },
    {
        //TODO get the id
        itemID: "????",
        itemIdentifier: "hot_and_crispy_boneless",
        itemNamePref: "Boneless",
        itemNameFull: "Hot & Crispy Boneless",
        category: "chicken",
        availability: "promotion",
        unit: "EA",
        storageCase: {
            name: "Crates",
            quantity: "240"
        },
        storageInner: {
            name: "Bags",
            quantity: "20"
        },
        storageUnit: {
            name: "Individual",
            quantity: "1"
        },
        calculationMethods: [{name: "Pieces", method: "individual"}]
    }
];

//TODO hot rods
//TODO make sure to include name in calculation method
//TODO should we declare on reconciliation what to prefer (e.g. head over pieces)
//TODO here
//TODO go through item id again and make sure they are good
//TODO maybe just add frozen later since it takes forever
class ItemData {
//    TODO add utility methods
//    TODO method to get all for category


    static getDataForIdentifier(identifier) {
        for (const data of this.getAllItemsData()) {
            if (data.itemIdentifier === identifier) {
                return data;
            }
        }
    }


    static getAllItemsData() {
        return allProductsData;
    }

    static getUniqueCategories() {
        let toReturn = [];
        for (const item of this.getAllItemsData()) {
            if (toReturn.indexOf(item.category) === -1) {
                toReturn.push(item.category);
            }
        }
        return toReturn;
    }

    static getAllBreadItems() {
        return this.getAllItemsForCategory("bread");
    }

    static getAllMiscItems() {
        return this.getAllItemsForCategory("misc");
    }

    static getAllSaladItems() {
        return this.getAllItemsForCategory("salads");
    }

    static getAllFreezerItems() {
        return this.getAllItemsForCategory("freezer");
    }

    static getAllFrozenChickenItems() {
        return this.getAllItemsForCategory("frozen_chicken");
    }

    static getAllChickenItems() {
        return this.getAllItemsForCategory("chicken");
    }

    static getAllItemsForCategory(category) {
        let toReturn = [];
        for (const item of this.getAllItemsData()) {
            if (item.category === category) {
                toReturn.push(item);
            }
        }
        return toReturn;
    }

    static setItemDataStorage(json) {
        localStorage.setItem("item_data", JSON.stringify(json));
    }

    static setItemActivationOverride(itemIdentifier, bool) {
        let itemDataStorage = this.getItemDataStorage();

        let newOverride = {
            itemIdentifier: itemIdentifier,
            active: bool
        };

        for (const override of itemDataStorage.itemActivationOverride) {
            if (override.itemIdentifier === itemIdentifier) {
                let index = itemDataStorage.itemActivationOverride.indexOf(override);
                itemDataStorage.itemActivationOverride[index] = newOverride;
                this.setItemDataStorage(itemDataStorage);
                return;
            }
        }
        itemDataStorage.itemActivationOverride.push(newOverride);
        this.setItemDataStorage(itemDataStorage);
    }

    static getItemDataStorage() {
        let itemDataStorage = localStorage.getItem("item_data");
        if (itemDataStorage === null) {
            let newData = JSON.stringify({
                itemActivationOverride: []
            });
            itemDataStorage = newData;
            localStorage.setItem("item_data", newData);
        }

        return JSON.parse(itemDataStorage);
    }

    static isItemActive(itemData) {
        //    TODO query local storage
        //TODO if doesn't exist, create
        let itemDataStorage = this.getItemDataStorage();
        //    TODO if override is present, return, otherwise calculate default (promo isn;t active by default, available alewyas is alswyd sacfitgv
        for (const override of itemDataStorage.itemActivationOverride) {
            if (override.itemIdentifier === itemData.itemIdentifier) {
                return override.active;
            }
        }
        if (itemData.availability === "always") {
            return true;
        } else if (itemData.availability === "promotion") {
            return false;
        }
        return true;
    }

}
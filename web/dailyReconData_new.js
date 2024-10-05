//TODO redo this. make one object, keys are identifiers,

let cobStructure = {
    case: {
        name: "Crates",
        quantity: 108,
        unitName: "EA"
    },
    inner: {
        name: "Bags",
        quantity: 18,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Pieces",
            calculationMethod: "individual"
        },
        {
            name: "Head",
            calculationMethod: "heads"
        }
    ]
};

let template = {
    case: {
        name: "",
        quantity: 0,
        unitName: ""
    },
    inner: {
        name: "",
        quantity: 0,
        unitName: ""
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Pieces",
            calculationMethod: "heads"
        }
    ]
};

let filletsStructure = {
    case: {
        name: "Crates",
        quantity: 120,
        unitName: "EA"
    },
    inner: {
        name: "Bags",
        quantity: 10,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Pieces",
            calculationMethod: "individual"
        }
    ]
};

let hotAndCrispyBonelessStructure = {
    case: {
        name: "Crates",
        quantity: 240,
        unitName: "EA"
    },
    inner: {
        name: "Bags",
        quantity: 20,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Pieces",
            calculationMethod: "individual"
        }
    ]
};

let tendersStructure = {
    case: {
        name: "Crates",
        quantity: 300,
        unitName: "EA"
    },
    inner: {
        name: "Bags",
        quantity: 20,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Pieces",
            calculationMethod: "individual"
        }
    ]
};

let wickedWingsStructure = {
    case: {
        name: "Crates",
        quantity: 225,
        unitName: "EA"
    },
    inner: {
        name: "Bags",
        quantity: 25,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Pieces",
            calculationMethod: "individual"
        }
    ]
};

let nuggetsStructure = {
    case: {
        name: "Boxes",
        quantity: 720,
        unitName: "EA"
    },
    inner: {
        name: "Bags",
        quantity: 36,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Nuggets",
            calculationMethod: "individual"
        }
    ]
};

let popcornChickenStructure = {
    case: {
        name: "Boxes",
        quantity: 12,
        unitName: "KG"
    },
    inner: {
        name: "Bags",
        quantity: 1,
        unitName: "KG"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "KG"
    },
    total: [
        {
            name: "KG",
            calculationMethod: "individual"
        }
    ]
};

let chipsStructure = {
    case: {
        name: "Boxes",
        quantity: 14,
        unitName: "KG"
    },
    inner: {
        name: "Bags",
        quantity: 2,
        unitName: "KG"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "KG"
    },
    total: [
        {
            name: "KG",
            calculationMethod: "individual"
        }
    ]
};

let smallColeslawStructure = {
    case: {
        name: "Boxes",
        quantity: 36,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Pieces",
            calculationMethod: "individual"
        }
    ]
};

let largeColeslawStructure = {
    case: {
        name: "Boxes",
        quantity: 24,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Pieces",
            calculationMethod: "individual"
        }
    ]
};

let lettuceStructure = {
    case: {
        name: "Boxes",
        quantity: 10,
        unitName: "KG"
    },
    inner: {
        name: "Bags",
        quantity: 2.5,
        unitName: "KG"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "KG"
    },
    total: [
        {
            name: "KG",
            calculationMethod: "individual"
        }
    ]
};

//TODO for units with decimal points, validate

let tomatoStructure = {
    case: {
        name: "Boxes",
        quantity: 5,
        unitName: "KG"
    },
    inner: {
        name: "Bags",
        quantity: 2.5,
        unitName: "KG"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "KG"
    },
    total: [
        {
            name: "KG",
            calculationMethod: "individual"
        }
    ]
};

let lettuceSlawStructure = {
    case: {
        name: "Boxes",
        quantity: 4,
        unitName: "KG"
    },
    inner: {
        name: "Bags",
        quantity: 1,
        unitName: "KG"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "KG"
    },
    total: [
        {
            name: "KG",
            calculationMethod: "individual"
        }
    ]
};

let baconStructure = {
    case: {
        name: "Boxes",
        quantity: 10,
        unitName: "KG"
    },
    inner: {
        name: "Bags",
        quantity: 2.5,
        unitName: "KG"
    },
    total: [
        {
            name: "KG",
            calculationMethod: "individual"
        }
    ]
};

let chocolateMousseStructure = {
    case: {
        name: "Boxes",
        quantity: 36,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Pieces",
            calculationMethod: "individual"
        }
    ]
};


let burgerBunsStructure = {
    inner: {
        name: "Bags",
        quantity: 12,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Buns",
            calculationMethod: "individual"
        }
    ]
};

let flatbreadSlidersStructure = {
    case: {
        name: "Boxes",
        quantity: 96,
        unitName: "EA"
    },
    inner: {
        name: "Bags",
        quantity: 8,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Sliders",
            calculationMethod: "individual"
        }
    ]
};

let dinnerRollsStructure = {
    inner: {
        name: "Bags",
        quantity: 12,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Rolls",
            calculationMethod: "individual"
        }
    ]
};

let tortillasStructure = {
    case: {
        name: "Boxes",
        quantity: 192,
        unitName: "EA"
    },
    inner: {
        name: "Bags",
        quantity: 12,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Tortillas",
            calculationMethod: "individual"
        }
    ]
};

let hashBrownsStructure = {
    case: {
        name: "Boxes",
        quantity: 168,
        unitName: "EA"
    },
    inner: {
        name: "Bags",
        quantity: 28,
        unitName: "EA"
    },
    unit: {
        name: "Individual",
        quantity: 1,
        unitName: "EA"
    },
    total: [
        {
            name: "Hash Browns",
            calculationMethod: "individual"
        }
    ]
};

let allStructures = [
    {
        name: "Chicken",
        structures: [
            {
                name: "Original Recipe",
                identifier: "original_recipe_cob",
                data: cobStructure,
                returnType: "head"
            },
            {
                name: "Hot & Spicy",
                identifier: "hot_and_spicy_cob",
                data: cobStructure,
                returnType: "head"
            },
            {
                name: "Original Fillets",
                identifier: "original_recipe_fillets",
                data: filletsStructure,
                returnType: "each"
            },
            {
                name: "Zinger Fillets",
                identifier: "zinger_fillets",
                data: filletsStructure,
                returnType: "each"
            },
            {
                name: "Tenders",
                identifier: "original_tenders",
                data: tendersStructure,
                returnType: "each"
            },
            {
                name: "Wicked Wings",
                identifier: "wicked_wings",
                data: wickedWingsStructure,
                returnType: "each"
            },
            {
                name: "Hot & Crispy Boneless",
                identifier: "hot_and_crispy_boneless",
                data: hotAndCrispyBonelessStructure,
                returnType: "each"
            }
        ]
    },
    {
        name: "Freezer",
        structures: [
            {
                name: "Chicken Nuggets",
                identifier: "chicken_nuggets",
                data: nuggetsStructure,
                returnType: "each"
            },
            {
                name: "Popcorn Chicken",
                identifier: "popcorn_chicken",
                data: popcornChickenStructure,
                returnType: "each"
            },
            {
                name: "Chips",
                identifier: "chips_aviko",
                data: chipsStructure,
                returnType: "each"
            },
            {
                name: "Bacon",
                identifier: "bacon_streaky",
                data: baconStructure,
                returnType: "each"
            },
            {
                name: "Chocolate Mousse",
                identifier: "chocolate_mousse",
                data: chocolateMousseStructure,
                returnType: "each"
            }, {
                name: "Hash Browns",
                identifier: "hash_browns",
                data: hashBrownsStructure,
                returnType: "each"
            }
        ]
    },
    {
        name: "Salads",
        structures: [
            {
                name: "Diced Tomato",
                identifier: "diced_tomato",
                data: tomatoStructure,
                returnType: "each"
            },

            {
                name: "Salad Lettuce Slaw",
                identifier: "lettuce_slaw",
                data: lettuceSlawStructure,
                returnType: "each"
            },

            {
                name: "Lettuce",
                identifier: "lettuce",
                data: lettuceStructure,
                returnType: "each"
            },
            {
                name: "Coleslaw (Small)",
                identifier: "coleslaw_small",
                data: smallColeslawStructure,
                returnType: "each"
            },
            {
                name: "Coleslaw (Large)",
                identifier: "coleslaw_large",
                data: largeColeslawStructure,
                returnType: "each"
            }
        ]
    },
    {
        name: "Breads",
        structures: [
            {
                name: "Burger Buns",
                identifier: "burger_buns_arby",
                data: burgerBunsStructure,
                returnType: "each"
            },
            {
                name: "Dinner Rolls",
                identifier: "dinner_rolls",
                data: dinnerRollsStructure,
                returnType: "each"
            },
            {
                name: "Flatbread",
                identifier: "flatbread",
                data: flatbreadSlidersStructure,
                returnType: "each"
            },
            {
                name: "Tortillas",
                identifier: "tortillas",
                data: tortillasStructure,
                returnType: "each"
            }
        ]
    }
];
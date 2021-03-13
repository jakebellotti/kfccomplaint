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
            calculationMethod: "divideByNine"
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
            calculationMethod: "individual"
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
        unitName: "EA"
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
        quantity: 45,
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
    case: {
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
    case: {
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

let allStructures = [
    {
        name: "Chicken",
        structures: [
            {
                name: "Original Recipe",
                data: cobStructure,
                returnType: "head"
            },
            {
                name: "Hot & Spicy",
                data: cobStructure,
                returnType: "head"
            },
            {
                name: "Original Fillets",
                data: filletsStructure,
                returnType: "each"
            },
            {
                name: "Zinger Fillets",
                data: filletsStructure,
                returnType: "each"
            },
            {
                name: "Tenders",
                data: tendersStructure,
                returnType: "each"
            },
            {
                name: "Wicked Wings",
                data: wickedWingsStructure,
                returnType: "each"
            }
        ]
    },
    {
        name: "Freezer",
        structures: [
            {
                name: "Chicken Nuggets",
                data: nuggetsStructure,
                returnType: "each"
            },
            {
                name: "Popcorn Chicken",
                data: popcornChickenStructure,
                returnType: "each"
            },
            {
                name: "Chips",
                data: chipsStructure,
                returnType: "each"
            },
            {
                name: "Bacon",
                data: baconStructure,
                returnType: "each"
            },
            {
                name: "Chocolate Mousse",
                data: chocolateMousseStructure,
                returnType: "each"
            }
        ]
    },
    {
        name: "Salads",
        structures: [
            {
                name: "Diced Tomato",
                data: tomatoStructure,
                returnType: "each"
            },
            {
                name: "Lettuce",
                data: lettuceStructure,
                returnType: "each"
            },
            {
                name: "Coleslaw (Small)",
                data: smallColeslawStructure,
                returnType: "each"
            },
            {
                name: "Coleslaw (Large)",
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
                data: burgerBunsStructure,
                returnType: "each"
            },
            {
                name: "Dinner Rolls",
                data: dinnerRollsStructure,
                returnType: "each"
            },
            {
                name: "Flatbread",
                data: flatbreadSlidersStructure,
                returnType: "each"
            },
            {
                name: "Tortillas",
                data: tortillasStructure,
                returnType: "each"
            }
        ]
    }
];
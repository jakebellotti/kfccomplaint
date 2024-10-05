//TODO implement this, then generate
//TODO each index is a new line
let countAreas = [
    //This is a line
    [
        {
            areaName: "Front Fridge",
            countItems: [
                {
                    identifier: "coleslaw_small",
                    includeCase: false,
                    includeInner: false,
                    includeUnit: true
                },
                {
                    identifier: "coleslaw_large",
                    includeCase: false,
                    includeInner: false,
                    includeUnit: true
                },
                {
                    identifier: "chocolate_mousse",
                    includeCase: false,
                    includeInner: false,
                    includeUnit: true
                }
            ]
        },
        {
            areaName: "Drive Thru Fridge",
            countItems: [
                {
                    identifier: "coleslaw_small",
                    includeCase: false,
                    includeInner: false,
                    includeUnit: true
                },
                {
                    identifier: "coleslaw_large",
                    includeCase: false,
                    includeInner: false,
                    includeUnit: true
                },
                {
                    identifier: "chocolate_mousse",
                    includeCase: false,
                    includeInner: false,
                    includeUnit: true
                }
            ]
        }
    ],
    //Line 2
    [
        {
            areaName: "Coolroom (Salads)",
            countItems: [
                {
                    identifier: "coleslaw_small",
                    includeCase: true,
                    includeInner: false,
                    includeUnit: true
                },

                {
                    identifier: "lettuce_slaw",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: false
                },

                {
                    identifier: "coleslaw_large",
                    includeCase: true,
                    includeInner: false,
                    includeUnit: true
                },
                // {
                //     identifier: "diced_tomato",
                //     includeCase: true,
                //     includeInner: true,
                //     includeUnit: false
                // },
                {
                    identifier: "lettuce",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: false
                },
                {
                    identifier: "bacon_streaky",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: false
                }
            ]
        },
        {
            areaName: "Coolroom (Chicken)",
            countItems: [
                {
                    identifier: "original_recipe_cob",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "hot_and_spicy_cob",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                },
                {
                  identifier: "hot_and_crispy_boneless",
                  includeCase: true,
                  includeInner: true,
                  includeUnit: true
                },
                {
                    identifier: "wicked_wings",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "zinger_fillets",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "original_recipe_fillets",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "original_tenders",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                }
            ]
        }
    ],
    //Line 3
    //TODO add support for frozen!
    [
        {
            areaName: "Freezer (Walk In)",
            countItems: [
                {
                    identifier: "chips_aviko",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "popcorn_chicken",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "chicken_nuggets",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "bacon_streaky",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: false
                },
                {
                    identifier: "tortillas",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: false
                },
                {
                    identifier: "flatbread",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: false
                },
                {
                    identifier: "chocolate_mousse",
                    includeCase: true,
                    includeInner: false,
                    includeUnit: true
                },
                {
                    identifier: "hash_browns",
                    includeCase: true,
                    includeInner: true,
                    includeUnit: true
                }
            ]
        },
        {
            areaName: "Freezer (Drive Thru)",
            countItems: [
                {
                    identifier: "chips_aviko",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "popcorn_chicken",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "chicken_nuggets",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "hash_browns",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                }
            ]
        }
    ],
    //Line 4
    [
        {
            areaName: "Bread (Drive Thru)",
            countItems: [
                {
                    identifier: "burger_buns_arby",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "dinner_rolls",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "tortillas",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "flatbread",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                }
            ]
        },
        {
            areaName: "Bread (Back Of Store)",
            countItems: [
                {
                    identifier: "burger_buns_arby",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "dinner_rolls",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "tortillas",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                },
                {
                    identifier: "flatbread",
                    includeCase: false,
                    includeInner: true,
                    includeUnit: true
                }
            ]
        }
    ]
    //This is another line
];
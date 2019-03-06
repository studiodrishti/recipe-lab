const { prisma } = require('../server/generated/prisma-client');
const cuid = require('cuid');

async function main() {
  await prisma.deleteManyUsers({});
  await prisma.deleteManyRecipes({});

  await prisma.createUser({
    email: 'jay@schooledlunch.club',
    emailVerified: true,
    name: 'Jay',
    password: '$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m', // "secret42"
    recipes: {
      create: [
        {
          title: 'Spaghetti and Meatballs',
          time: 'medium',
          skill: 'easy',
          description:
            "It's spaghett! This super easy recipe is delcious, nutritious, and sure to be a crowd pleaser. Rice noodles done right are practically indistinguishable from their glutenfull counterparts.",
          course: 'main',
          items: {
            create: [
              {
                id: cuid(),
                name: 'Marinara Sauce',
                steps: {
                  create: [
                    {
                      id: cuid(),
                      directions:
                        "Heat a large pot over medium-high heat. Add 2 tablespoons of the avocado oil, and when it's warm, saute the onion until it's brown and translucent",
                      notes:
                        'Try to cook the onions longer than you think will be necessary. Get them real carmelized. Yum Yum.',
                      ingredients: {
                        create: [
                          {
                            id: cuid(),
                            name: 'avocado oil',
                            quantity: 2,
                            unit: 'tbsp'
                          },
                          {
                            id: cuid(),
                            name: 'medium onion',
                            quantity: 1,
                            processing: 'chopped'
                          }
                        ]
                      }
                    },
                    {
                      id: cuid(),
                      directions:
                        'Add the garlic and italian seasoning. Briefly stir and fry until the mixture is fragrant.',
                      notes: '',
                      ingredients: {
                        create: [
                          {
                            id: cuid(),
                            name: 'garlic cloves',
                            quantity: 2,
                            processing: 'minced'
                          },
                          {
                            id: cuid(),
                            name: 'italian seasoning',
                            quantity: 2,
                            unit: 'tsp'
                          }
                        ]
                      }
                    },
                    {
                      id: cuid(),
                      directions:
                        'Add a 1 cup of red wine and simmer the mixture until the liquid has reduced by half.',
                      notes: '',
                      ingredients: {
                        create: [
                          {
                            id: cuid(),
                            name: 'red wine',
                            quantity: 1,
                            unit: 'cup'
                          }
                        ]
                      }
                    },
                    {
                      id: cuid(),
                      directions:
                        'Add the remaining red wine, chicken stock, and tomato puree.',
                      notes: '',
                      ingredients: {
                        create: [
                          {
                            id: cuid(),
                            name: 'red wine',
                            quantity: 1,
                            unit: 'cup'
                          },
                          {
                            id: cuid(),
                            name: 'chicken stock',
                            quantity: 0.5,
                            unit: 'cup'
                          },
                          {
                            id: cuid(),
                            name: '28-ounce can whole peeled tomatoes',
                            quantity: 1,
                            processing: 'blended into a puree'
                          }
                        ]
                      }
                    },
                    {
                      id: cuid(),
                      directions:
                        'Make spaghetti noodles according to package instructions.',
                      notes: '',
                      ingredients: {
                        create: [
                          {
                            id: cuid(),
                            name: 'gulten-free spaghetti',
                            quantity: 1,
                            unit: 'lb'
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                id: cuid(),
                name: 'Meatballs',
                steps: {
                  create: [
                    {
                      id: cuid(),
                      directions: 'Preheat the oven to 350 F'
                    },
                    {
                      id: cuid(),
                      directions:
                        'Stir together all the ingredients for the meatballs until they are well combined.',
                      ingredients: {
                        create: [
                          {
                            id: cuid(),
                            quantity: 1,
                            unit: 'lb',
                            name: 'ground beef'
                          },
                          {
                            id: cuid(),
                            quantity: 0.25,
                            unit: 'cup',
                            name: 'onion',
                            processing: 'minced'
                          },
                          {
                            id: cuid(),
                            quantity: 1,
                            name: 'egg'
                          },
                          {
                            id: cuid(),
                            quantity: 1,
                            unit: 'tbsp',
                            name: 'chia seeds'
                          },
                          {
                            id: cuid(),
                            quantity: 2,
                            unit: 'tbsp',
                            name: 'almond flour'
                          },
                          {
                            id: cuid(),
                            quantity: 0.25,
                            unit: 'cup',
                            name: 'parsley'
                          },
                          {
                            id: cuid(),
                            quantity: 2,
                            unit: 'tsp',
                            name: 'sea salt'
                          },
                          {
                            id: cuid(),
                            quantity: 0.25,
                            unit: 'tsp',
                            name: 'black pepper',
                            processing: 'freshly ground'
                          }
                        ]
                      }
                    },
                    {
                      id: cuid(),
                      directions:
                        'Using your hands, form even size balls, about the size of golf balls, and set them aside. Heat another few tablespoons of avocado oil in an ovenproof saute pan. When the oil is hot, add the meatballs and brown them about 2 minutes on each side before transferring the pan to the oven. Cook them for about 10 minutes.',
                      ingredients: {
                        create: [
                          {
                            id: cuid(),
                            quantity: 2,
                            unit: 'tbsp',
                            name: 'avocado oil'
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  });

  await prisma.createUser({
    email: 'emma@schooledlunch.club',
    emailVerified: true,
    name: 'Emma',
    password: '$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m' // "secret42"
  });
}

main();

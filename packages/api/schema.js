const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar DateTime
  scalar Upload

  enum OrderByInput {
    asc
    desc
  }

  input RecipeOrderByInput {
    updatedAt: OrderByInput
  }

  type Query {
    sessionUser: User
    recipes(
      where: RecipesWhereInput
      orderBy: RecipeOrderByInput
      take: Int
    ): [Recipe!]!
    recipe(slug: String!): Recipe
    user(slug: String!): User
    modification(uid: ID!): Modification
  }

  type Mutation {
    signup(
      email: String!
      password: String!
      name: String
      modifications: [ModificationInput!]
    ): AuthPayload!
    login(
      email: String!
      password: String!
      modifications: [ModificationInput!]
    ): AuthPayload!
    avatarUpload(userId: ID!, file: Upload!): User!
    avatarDelete(userId: ID!): User!
    updateUser(
      userId: ID!
      name: String!
      bio: String!
      slug: String!
      role: String
      password: String
      email: String!
    ): User!
    createRecipe(
      title: String!
      time: String!
      servingAmount: String!
      servingType: String!
      description: String!
    ): Recipe!
    saveModification(
      recipeId: ID!
      userId: ID!
      removals: [ID!]!
      sortings: [SortingInput!]!
      alterations: [AlterationInput!]!
      items: [ItemAdditionInput!]!
      steps: [StepAdditionInput!]!
      ingredients: [IngredientAdditionInput!]!
    ): Modification!
    publishRecipe(recipeId: ID!): Recipe!
    recipePhotoUpload(file: Upload!, recipeId: ID!): Recipe!
    recipePhotoDelete(recipeId: ID!): Recipe!
  }

  type Modification {
    id: ID!
    createdAt: String!
    updatedAt: String!
    user: User!
    recipe: Recipe!
    sortings: [Sorting!]!
    alterations: [Alteration!]!
    removals: [ID!]!
    additions: [Addition!]!
    itemAdditions: [ItemAddition!]!
    stepAdditions: [StepAddition!]!
    ingredientAdditions: [IngredientAddition!]!
  }

  input ModificationInput {
    recipeId: ID!
    removals: [ID!]!
    sortings: [SortingInput!]!
    alterations: [AlterationInput!]!
    items: [ItemAdditionInput!]!
    steps: [StepAdditionInput!]!
    ingredients: [IngredientAdditionInput!]!
  }

  type Sorting {
    uid: ID!
    parentId: ID!
    order: [ID!]!
  }

  input SortingInput {
    uid: ID
    parentId: ID!
    order: [ID!]!
  }

  type Alteration {
    uid: ID!
    sourceId: ID!
    field: String!
    value: String!
  }

  input AlterationInput {
    uid: ID!
    sourceId: ID!
    field: String!
    value: String!
  }

  interface Addition {
    uid: ID!
    parentId: ID!
    kind: String!
  }

  type ItemAddition implements Addition {
    uid: ID!
    parentId: ID!
    kind: String!
    name: String!
  }

  input ItemAdditionInput {
    uid: ID!
    parentId: ID!
    name: String!
  }

  type StepAddition implements Addition {
    uid: ID!
    parentId: ID!
    kind: String!
    directions: String!
  }

  input StepAdditionInput {
    uid: ID
    parentId: ID!
    directions: String!
  }

  type IngredientAddition implements Addition {
    uid: ID!
    parentId: ID!
    kind: String!
    name: String!
    quantity: String!
    unit: String!
    processing: String!
  }

  input IngredientAdditionInput {
    uid: ID
    parentId: ID!
    name: String!
    quantity: String!
    unit: String!
    processing: String!
  }

  type User {
    id: ID!
    createdAt: DateTime!
    email: String!
    name: String!
    avatar: String
    slug: String!
    emailVerified: Boolean!
    role: String!
    recipes: [Recipe!]!
    recipeCount: Int!
    modifiedRecipeCount: Int!
    bio: String!
  }

  type AuthPayload {
    token: String!
    user: User!
    recipeModsCreated: [ID!]
    recipeModsInConflict: [ID!]
  }

  type Recipe {
    uid: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    author: User!
    slug: String!
    title: String!
    time: String!
    servingAmount: String!
    servingType: String!
    description: String!
    items: [Item!]!
    modification(user: ID): Modification
    photo: String
  }

  input StringFilter {
    equals: String
    not: String
    in: [String!]
  }

  input UserWhereInput {
    slug: StringFilter
  }

  input ModificationWhereInput {
    user: UserWhereInput
  }

  input ModificationFilter {
    some: ModificationWhereInput
  }

  input RecipesWhereInput {
    uid: StringFilter
    author: UserWhereInput
    modifications: ModificationFilter
  }

  type Step {
    uid: ID!
    directions: String!
    ingredients: [Ingredient!]!
  }

  type Item {
    uid: ID!
    name: String!
    steps: [Step!]!
  }

  type Ingredient {
    uid: ID!
    name: String!
    quantity: String!
    unit: String!
    processing: String!
  }
`;

module.exports = typeDefs;

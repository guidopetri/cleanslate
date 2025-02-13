import React from 'react'
import { deleteRecipeOnCloud } from '../../../helpers/recipes/deleteRecipeOnCloud'
import { Recipe } from '../../../models/recipe'
import { Item } from '../../item/Item'

export const RecipeItem: React.FC<{ recipe: Recipe }> = (props) => {
  const { recipe } = props
  const { createdAt, id, name, type } = recipe

  const onDelete = () => {
    deleteRecipeOnCloud(id, () => {})
  }

  return (
    <Item
      item={{
        alias: null,
        amount: null,
        barcode: null,
        basicFood: null,
        childRecipe: null,
        consumed: null,
        createdAt,
        food: null,
        id,
        meal: null,
        name,
        onDelete,
        onUpdate: null,
        profile: recipe.recipeToProfile,
        recipe: null,
        src: null,
        type,
        unit: null,
      }}
    />
  )
}

import {
  calculateFoodDensities,
  calculateRecipeDensities,
} from '../components/macros/helpers/calculateDensities'
import { calculatePerMacroPerRecipe } from '../components/macros/helpers/calculateMacros'
import { Category } from '../constants/categories'
import { Food } from '../models/food'
import { Recipe } from '../models/recipe'

export const categoriesToIgnore = [
  'Beverage',
  'Nut milk',
  'Sauce',
  'Spice',
  'Stock',
  'Sweetener',
  'Vinegar',
] as Category[]

export const sortByCaloricDensity = (items: (Food | Recipe)[]) => {
  return items
    .sort((itemsA, itemsB) => {
      const A =
        itemsA.type === 'food'
          ? calculateFoodDensities(itemsA)[0]
          : calculateRecipeDensities(
              1,
              calculatePerMacroPerRecipe(itemsA, 'CALORIE', 1),
              calculatePerMacroPerRecipe(itemsA, 'PROTEIN', 1),
              itemsA
            )[0]

      const B =
        itemsB.type === 'food'
          ? calculateFoodDensities(itemsB)[0]
          : calculateRecipeDensities(
              1,
              calculatePerMacroPerRecipe(itemsB, 'CALORIE', 1),
              calculatePerMacroPerRecipe(itemsB, 'PROTEIN', 1),
              itemsB
            )[0]

      return A - B
    })
    .filter((food) => {
      if (food.type === 'food' && categoriesToIgnore.includes(food.category)) {
        return false
      } else {
        return true
      }
    })
}

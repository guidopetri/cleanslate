import { Unit } from '../../../constants/units'

export const convertFromGramsToWeight = (unit: Unit, grams: number): number => {
  if (unit === 'LBS') {
    return grams / 453
  } else if (unit === 'OZ') {
    return (grams / 453) * 16
  } else {
    return grams
  }
}

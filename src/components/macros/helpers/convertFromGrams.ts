import { countUnits, volumeUnits, weightUnits } from '../../../constants/units'
import { Unit } from '../../../constants/units'
import { convertFromGramsToCount } from './convertFromGramsToCount'
import { convertFromGramsToVolume } from './convertFromGramsToVolume'
import { convertFromGramsToWeight } from './convertFromGramsToWeight'

export const convertFromGrams = (
  grams: number,
  unit: Unit,
  countToGram: number | null | undefined,
  tbspToGram: number | null | undefined,
  servingPerContainer: number | null | undefined
) => {
  const isVolume = volumeUnits.includes(unit)
  const isWeight = weightUnits.includes(unit)
  const isCount = countUnits.includes(unit)

  if (isVolume && tbspToGram) {
    return convertFromGramsToVolume(unit, grams, tbspToGram)
  } else if (isWeight) {
    return convertFromGramsToWeight(unit, grams)
  } else if (isCount && countToGram) {
    return convertFromGramsToCount(
      grams,
      unit,
      countToGram,
      servingPerContainer
    )
    // The base case. Should never fire.
  } else {
    return grams
  }
}

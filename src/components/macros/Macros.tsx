import { css } from '@emotion/react'
import React from 'react'
import { useStoreon } from 'storeon/react'
import CalMini from '../../assets/common/calmini.svg'
import Density from '../../assets/common/density.svg'
import ProteinMini from '../../assets/common/proteinmini.svg'
import { Log } from '../../models/log'
import { Profile } from '../../models/profile'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { Image } from '../image/Image'
import { calculateFoodOrRecipeDensities } from './helpers/calculateDensities'
import { calculateMacros } from './helpers/calculateMacros'

type props = {
  log: Log
  profile: Profile
}

export const Macros: React.FC<props> = ({ log, profile }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()

  const [caloriesConsumed, proteinConsumed] = calculateMacros([log]).map((v) =>
    Math.round(v)
  )

  const densities = calculateFoodOrRecipeDensities(
    log.amount,
    log.barcode || log.logToFood || log.logToRecipe,
    caloriesConsumed,
    proteinConsumed
  )

  let caloricDensity: number | null = null
  let proteinDensity: number | null = null
  let combinedDensity: number | null = null

  if (densities) {
    caloricDensity = densities[0]
    proteinDensity = densities[1]
    combinedDensity = densities[2]

    if (Number.isNaN(caloricDensity)) {
      caloricDensity = 0
    }
    if (Number.isNaN(proteinDensity)) {
      proteinDensity = 0
    }
    if (Number.isNaN(combinedDensity)) {
      combinedDensity = 0
    }
  }

  const macros = css`
    font-size: 12px;
    margin-left: auto;
    white-space: nowrap;
    margin-top: 3px;

    img {
      margin: 0px 6px;
      margin-left: 0px;
    }

    span {
      margin-right: 6px;
    }
  `

  if (caloriesConsumed >= 0) {
    return (
      <div id="macros" css={macros}>
        <div className="fr">
          <div>
            <Image width={10} height={10} alt="Fire" src={CalMini} />
            <span>{caloriesConsumed}</span>
          </div>
          <div>
            <Image
              width={10}
              height={10}
              alt="Strong arm flexing"
              src={ProteinMini}
            />
            <span>{proteinConsumed}</span>
          </div>
          {densities && profile.showDensities && (
            <div
              onClick={() =>
                dispatch(
                  'openInformationModal',
                  <div>
                    <strong>
                      {caloricDensity}/{proteinDensity}
                    </strong>{' '}
                    stands for caloric density ({caloricDensity}) and protein
                    density ({proteinDensity}). To learn more about them, first
                    navigate to{' '}
                    <a
                      href="https://cleanslate.sh/weight-loss"
                      target="_blank"
                      rel="noreferrer"
                    >
                      here
                    </a>
                    . Then, read the third and fourth sections.
                    <br />
                    <br />
                    If you would like to see a reference table of all basic
                    foods by caloric and protein density, navigate to{' '}
                    <a href="/foods" target="_blank" rel="noreferrer">
                      here
                    </a>
                    .
                  </div>
                )
              }
            >
              <Image
                css={css`
                  position: relative;
                  top: 1px;
                `}
                width={10}
                height={10}
                alt="Little balls pressed together"
                src={Density}
              />
              <span>
                {caloricDensity}/{proteinDensity}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

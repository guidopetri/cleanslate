/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react'
import React from 'react'
import { useStoreon } from 'storeon/react'
import Barcode from '../../assets/common/barcode.svg'
import Exercise from '../../assets/common/exercise.svg'
import Rocket from '../../assets/common/fast.svg'
import Hamburger from '../../assets/common/hamburger.svg'
import Search from '../../assets/common/magnify.svg'
import { Profile } from '../../models/profile'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { colors } from '../../theme'
import { HiddenInput } from '../buttons/HiddenInput'

type props = { profile: Profile }
export const BottomBarButtons: React.FC<props> = ({ profile }) => {
  const {
    dispatch,
  }: {
    dispatch: Dispatch<AllEvents>
  } = useStoreon()

  const buttons = css`
    border-top: 1px solid ${colors.white};
    button {
      flex: 1;
      height: 64px;
      padding: 0;
      position: relative;

      > img {
        height: 28px;
        width: 28px;
      }
    }
  `

  return (
    <div id="footer" css={buttons} className={`frc w100`}>
      <button
        type="button"
        onClick={() => {
          dispatch('openMenu')
        }}
      >
        <img alt="Open icon for navbar" src={Hamburger.src} />
      </button>
      {profile.showCalories && (
        <button
          type="button"
          onClick={() => {
            dispatch('openExerciseModal')
          }}
        >
          <img alt="Person running" src={Exercise.src} />
        </button>
      )}

      {profile.showCalories && (
        <button
          type="button"
          onClick={() => {
            if (profile.enablePlanning) {
              dispatch('openFoodFormModal')
            } else {
              dispatch('openQuickAddModal')
            }
          }}
        >
          {!profile.enablePlanning && (
            <HiddenInput type="text" inputMode="decimal" />
          )}
          <img alt="Rocket" src={Rocket.src} />
        </button>
      )}

      {profile.showCalories && (
        <button
          type="button"
          onClick={() => {
            dispatch('openCameraModal')
          }}
        >
          <img alt="Barcode" src={Barcode.src} />
        </button>
      )}

      <button
        id="BottomBarSearchButton"
        type="button"
        onClick={() => {
          dispatch('openModal')
        }}
      >
        <HiddenInput />
        <img alt="Magnifying glass" src={Search.src} />
      </button>
    </div>
  )
}

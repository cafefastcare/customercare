import type { BuildingInput, EvaluationResult } from './types'
import { evaluateGroup1 } from './evaluate/group1'
import { evaluateGroup2 } from './evaluate/group2'
import { evaluateGroup3 } from './evaluate/group3'
import { evaluateGroup4 } from './evaluate/group4'
import { evaluateGroup5 } from './evaluate/group5'
import { evaluateGroup6 } from './evaluate/group6'
import { evaluateGroup7 } from './evaluate/group7'
import { evaluateGroup8 } from './evaluate/group8'
import { BUILDING_TYPES } from './data'

export function evaluate(input: BuildingInput): EvaluationResult {
  const bt = BUILDING_TYPES.find((t) => t.id === input.buildingType)

  return {
    groupCode: bt?.group ?? '',
    groupLabel: bt?.groupLabel ?? '',
    extinguisher:      evaluateGroup1(input),
    alarm:             evaluateGroup2(input),
    hoseReel:          evaluateGroup3(input),
    sprinkler:         evaluateGroup4(input),
    smokeControl:      evaluateGroup5(input),
    emergencyLighting: evaluateGroup6(input),
    waterSupply:       evaluateGroup7(input),
    evacuationRoutes:  evaluateGroup8(input),
    notes: [],
  }
}

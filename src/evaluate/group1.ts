import type { BuildingInput, SystemResult } from '../types'

/** Nhóm 1: Phương tiện chữa cháy ban đầu (bình chữa cháy xách tay)
 *  Tham chiếu: QCVN 06:2023/BXD Phụ lục E + TCVN 3890:2009 */
export function evaluateGroup1(input: BuildingInput): SystemResult {
  const { buildingType, totalArea } = input

  const isHazardAB = buildingType === 'kho-hang-ab' || buildingType === 'nha-xuong-ab'
  const isWarehouseFactory = buildingType.startsWith('kho-') || buildingType.startsWith('nha-xuong-')
  const isGara = buildingType === 'gara-o-to'

  let equipment: string[]

  if (isHazardAB) {
    equipment = [
      'Bình bột ABC ≥ 8kg: 1 bình / 50m²',
      'Xe đẩy chữa cháy 35kg' + (totalArea >= 500 ? ' (bắt buộc vì S ≥ 500m²)' : ' (nếu S ≥ 500m²)'),
    ]
  } else if (isWarehouseFactory) {
    equipment = [
      'Bình bột ABC ≥ 8kg: 1 bình / 150m²',
      ...(totalArea >= 500 ? ['Xe đẩy chữa cháy 35kg'] : []),
    ]
  } else if (isGara) {
    equipment = [
      'Bình bột ABC ≥ 4kg: 1 bình / 50m²',
      'Bình CO₂: đặt tại tủ điện, phòng kỹ thuật',
      ...(totalArea >= 500 ? ['Xe đẩy chữa cháy 35kg'] : []),
    ]
  } else {
    equipment = [
      'Bình bột ABC ≥ 4kg: 1 bình / 50m²',
      'Bình CO₂: đặt tại tủ điện, phòng máy chủ (nếu có)',
    ]
  }

  return {
    status: 'required',
    reason: 'Bắt buộc với mọi công trình (không có ngoại lệ)',
    equipment,
    references: ['QCVN 06:2023/BXD – Phụ lục E, Mục E.1', 'TCVN 3890:2009 – Phương tiện PCCC'],
  }
}

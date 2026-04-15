import type { BuildingInput, SystemResult } from '../types'

/** Nhóm 3: Hệ thống chữa cháy vách tường (Hose Reel)
 *  Tham chiếu: QCVN 06:2023/BXD – Phụ lục E, Bảng E.2 */
export function evaluateGroup3(input: BuildingInput): SystemResult {
  const { buildingType: bt, floors, height, totalArea, seats } = input

  let required = false
  let reason = ''

  switch (bt) {
    case 'nha-o-rieng-le':
      required = floors >= 7
      reason = 'Nhà ở riêng lẻ ≥ 7 tầng'
      break
    case 'chung-cu':
      required = floors >= 7 || height >= 22
      reason = 'Chung cư ≥ 7 tầng hoặc H ≥ 22m'
      break
    case 'nha-o-ket-hop-kd':
      required = floors >= 5
      reason = 'Nhà ở + KD ≥ 5 tầng'
      break
    case 'khach-san':
      required = floors >= 5
      reason = 'Khách sạn ≥ 5 tầng'
      break
    case 'van-phong':
      required = floors >= 5 || totalArea >= 1500
      reason = 'Văn phòng ≥ 5 tầng hoặc S ≥ 1500m²'
      break
    case 'tttm-sieu-thi':
      required = totalArea >= 500
      reason = 'TTTM/siêu thị có S ≥ 500m²'
      break
    case 'cho':
      required = totalArea >= 1000
      reason = 'Chợ có S ≥ 1000m²'
      break
    case 'nha-hang':
      required = totalArea >= 500
      reason = 'Nhà hàng có S ≥ 500m²'
      break
    case 'benh-vien':
    case 'phong-kham':
    case 'co-so-xa-hoi':
      required = floors >= 3
      reason = 'Cơ sở y tế / xã hội ≥ 3 tầng'
      break
    case 'truong-mam-non':
    case 'truong-hoc':
      required = floors >= 3
      reason = 'Trường học ≥ 3 tầng'
      break
    case 'rap-chieu-phim':
      required = seats >= 300
      reason = 'Rạp / nhà hát ≥ 300 chỗ'
      break
    case 'karaoke-vu-truong':
      required = true
      reason = 'Karaoke/vũ trường: luôn bắt buộc'
      break
    case 'the-thao':
      required = seats >= 3000
      reason = 'Công trình thể thao ≥ 3000 chỗ'
      break
    case 'kho-hang-ab':
      required = totalArea >= 500
      reason = 'Kho hạng A,B có S ≥ 500m²'
      break
    case 'kho-hang-cde':
      required = totalArea >= 1000
      reason = 'Kho hạng C,D,E có S ≥ 1000m²'
      break
    case 'nha-xuong-ab':
      required = totalArea >= 1000
      reason = 'Xưởng hạng A,B có S ≥ 1000m²'
      break
    case 'nha-xuong-cde':
      required = totalArea >= 3000
      reason = 'Xưởng hạng C,D,E có S ≥ 3000m²'
      break
    case 'gara-o-to':
      required = true
      reason = 'Gara ô tô: luôn bắt buộc'
      break
  }

  if (!required) {
    return {
      status: 'not-required',
      reason: `Không bắt buộc: ${reason || 'chưa đạt ngưỡng quy định'}`,
      equipment: [],
      references: ['QCVN 06:2023/BXD – Phụ lục E, Bảng E.2'],
    }
  }

  return {
    status: 'required',
    reason,
    equipment: [
      'Tủ chữa cháy vách tường tại mỗi tầng (cách nhau ≤ 50m)',
      'Họng chữa cháy trong nhà DN50',
      'Vòi chữa cháy dài ≥ 20m + lăng phun',
      'Van góc chặn nước',
      'Bơm tăng áp nếu áp lực mạng cấp nước không đủ (≥ 0.2 MPa)',
    ],
    references: ['QCVN 06:2023/BXD – Phụ lục E, Bảng E.2', 'TCVN 5760:1993 – Hệ thống chữa cháy'],
  }
}

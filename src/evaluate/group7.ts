import type { BuildingInput, SystemResult } from '../types'

/** Nhóm 7: Cấp nước chữa cháy ngoài nhà
 *  Tham chiếu: QCVN 06:2023/BXD – Điều 9.1, TCVN 2622:1995 */
export function evaluateGroup7(input: BuildingInput): SystemResult {
  const { buildingType: bt, floors, totalArea } = input

  let required = false
  let reason = ''
  let flowRate = ''

  switch (bt) {
    case 'nha-o-rieng-le':
      required = floors >= 5 || totalArea >= 500
      reason = 'Nhà ở riêng lẻ ≥ 5 tầng hoặc S ≥ 500m²'
      flowRate = '10 l/s'
      break
    case 'chung-cu':
    case 'nha-o-ket-hop-kd':
      required = floors >= 3
      reason = 'Chung cư / nhà ở + KD ≥ 3 tầng'
      flowRate = floors >= 10 ? '20 l/s' : '15 l/s'
      break
    case 'khach-san':
    case 'van-phong':
    case 'tttm-sieu-thi':
    case 'cho':
    case 'nha-hang':
    case 'benh-vien':
    case 'phong-kham':
    case 'co-so-xa-hoi':
    case 'truong-mam-non':
    case 'truong-hoc':
    case 'rap-chieu-phim':
    case 'karaoke-vu-truong':
    case 'the-thao':
      required = totalArea >= 500
      reason = 'Công trình công cộng có S ≥ 500m²'
      flowRate = totalArea >= 5000 ? '25 l/s' : '15 l/s'
      break
    case 'kho-hang-ab':
    case 'kho-hang-cde':
    case 'nha-xuong-ab':
    case 'nha-xuong-cde':
      required = totalArea >= 500
      reason = 'Kho / xưởng có S ≥ 500m²'
      flowRate = totalArea >= 3000 ? '25 l/s' : '15 l/s'
      break
    case 'gara-o-to':
      required = true
      reason = 'Gara ô tô: luôn bắt buộc'
      flowRate = '15 l/s'
      break
  }

  if (!required) {
    return {
      status: 'not-required',
      reason: `Không bắt buộc: ${reason || 'chưa đạt ngưỡng'}`,
      equipment: [],
      references: ['QCVN 06:2023/BXD – Điều 9.1', 'TCVN 2622:1995'],
    }
  }

  return {
    status: 'required',
    reason,
    equipment: [
      `Trụ cấp nước chữa cháy ngoài nhà (cách công trình ≤ 150m, lưu lượng ≥ ${flowRate})`,
      'Đường kính ống cấp nước ≥ DN100',
      'Bể dự trữ nước chữa cháy nếu mạng cấp nước đô thị không đủ áp/lưu lượng',
      'Thời gian dự trữ ≥ 3 giờ chữa cháy liên tục',
    ],
    references: ['QCVN 06:2023/BXD – Điều 9.1', 'TCVN 2622:1995 – Phòng cháy, chữa cháy cho nhà và công trình'],
  }
}

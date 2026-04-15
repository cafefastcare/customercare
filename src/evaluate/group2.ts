import type { BuildingInput, SystemResult } from '../types'

/** Nhóm 2: Hệ thống báo cháy tự động (AFA)
 *  Tham chiếu: QCVN 06:2023/BXD – Phụ lục E, Bảng E.1 */
export function evaluateGroup2(input: BuildingInput): SystemResult {
  const { buildingType: bt, floors, basementFloors, height, totalArea, rooms, seats } = input

  let required = false
  let reason = ''

  switch (bt) {
    case 'nha-o-rieng-le':
      required = floors >= 7 || height > 22
      reason = 'Nhà ở riêng lẻ ≥ 7 tầng hoặc H > 22m'
      break
    case 'chung-cu':
      required = floors >= 5 || totalArea >= 500
      reason = 'Chung cư ≥ 5 tầng hoặc tổng S ≥ 500m²'
      break
    case 'nha-o-ket-hop-kd':
      required = floors >= 3 || totalArea >= 300
      reason = 'Nhà ở + KD ≥ 3 tầng hoặc S ≥ 300m²'
      break
    case 'khach-san':
      required = floors >= 3 || rooms >= 10
      reason = 'Khách sạn ≥ 3 tầng hoặc ≥ 10 phòng'
      break
    case 'van-phong':
      required = floors >= 3 || totalArea >= 300
      reason = 'Văn phòng ≥ 3 tầng hoặc S ≥ 300m²'
      break
    case 'tttm-sieu-thi':
      required = true
      reason = 'TTTM/siêu thị: luôn bắt buộc'
      break
    case 'cho':
      required = totalArea >= 1000
      reason = 'Chợ có S ≥ 1000m²'
      break
    case 'nha-hang':
      required = seats >= 50 || totalArea >= 200
      reason = 'Nhà hàng ≥ 50 chỗ hoặc S ≥ 200m²'
      break
    case 'benh-vien':
    case 'co-so-xa-hoi':
      required = true
      reason = 'Bệnh viện / cơ sở xã hội: luôn bắt buộc'
      break
    case 'phong-kham':
      required = totalArea >= 500
      reason = 'Phòng khám có S ≥ 500m²'
      break
    case 'truong-mam-non':
      required = true
      reason = 'Trường mầm non: luôn bắt buộc'
      break
    case 'truong-hoc':
      required = floors >= 3 || totalArea >= 1000
      reason = 'Trường học ≥ 3 tầng hoặc S ≥ 1000m²'
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
      required = totalArea >= 200
      reason = 'Kho hạng A,B có S ≥ 200m²'
      break
    case 'kho-hang-cde':
      required = totalArea >= 500
      reason = 'Kho hạng C,D,E có S ≥ 500m²'
      break
    case 'nha-xuong-ab':
      required = totalArea >= 500
      reason = 'Xưởng hạng A,B có S ≥ 500m²'
      break
    case 'nha-xuong-cde':
      required = totalArea >= 1500
      reason = 'Xưởng hạng C,D,E có S ≥ 1500m²'
      break
    case 'gara-o-to':
      required = basementFloors >= 1 || input.cars >= 10
      reason = 'Gara có ≥ 1 tầng hầm hoặc ≥ 10 chỗ đỗ'
      break
  }

  if (!required) {
    return {
      status: 'not-required',
      reason: `Không bắt buộc: ${reason || 'chưa đạt ngưỡng quy định'}`,
      equipment: [],
      references: ['QCVN 06:2023/BXD – Phụ lục E, Bảng E.1'],
    }
  }

  return {
    status: 'required',
    reason,
    equipment: [
      'Đầu báo khói / đầu báo nhiệt (tùy khu vực)',
      'Nút ấn báo cháy thủ công tại mỗi tầng / lối thoát',
      'Trung tâm báo cháy (fire alarm control panel)',
      'Chuông báo cháy + đèn cảnh báo tại mỗi tầng',
      'Đường truyền tín hiệu về trung tâm giám sát PCCC',
    ],
    references: ['QCVN 06:2023/BXD – Phụ lục E, Bảng E.1', 'TCVN 5738:2021 – Hệ thống báo cháy tự động'],
  }
}

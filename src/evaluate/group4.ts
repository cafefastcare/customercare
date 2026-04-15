import type { BuildingInput, SystemResult } from '../types'

/** Nhóm 4: Hệ thống chữa cháy tự động (Sprinkler / AFS)
 *  Tham chiếu: QCVN 06:2023/BXD – Phụ lục E, Bảng E.3 */
export function evaluateGroup4(input: BuildingInput): SystemResult {
  const { buildingType: bt, floors, basementFloors, height, totalArea, beds, seats } = input

  let required = false
  let reason = ''

  switch (bt) {
    case 'nha-o-rieng-le':
      required = floors >= 10 || height >= 28
      reason = 'Nhà ở riêng lẻ ≥ 10 tầng hoặc H ≥ 28m'
      break
    case 'chung-cu':
      required = floors >= 10 || height >= 28
      reason = 'Chung cư ≥ 10 tầng hoặc H ≥ 28m'
      break
    case 'nha-o-ket-hop-kd':
      required = floors >= 5 || height >= 15
      reason = 'Nhà ở + KD ≥ 5 tầng hoặc H ≥ 15m'
      break
    case 'khach-san':
      required = floors >= 7 || height >= 22
      reason = 'Khách sạn ≥ 7 tầng hoặc H ≥ 22m'
      break
    case 'van-phong':
      required = floors >= 7 || totalArea >= 3500
      reason = 'Văn phòng ≥ 7 tầng hoặc S ≥ 3500m²'
      break
    case 'tttm-sieu-thi':
      required = totalArea >= 3500
      reason = 'TTTM/siêu thị có S ≥ 3500m²'
      break
    case 'cho':
      required = totalArea >= 3500
      reason = 'Chợ có S ≥ 3500m²'
      break
    case 'nha-hang':
      required = seats >= 200 || totalArea >= 800
      reason = 'Nhà hàng ≥ 200 chỗ hoặc S ≥ 800m²'
      break
    case 'benh-vien':
      required = floors >= 3 || beds >= 100
      reason = 'Bệnh viện ≥ 3 tầng hoặc ≥ 100 giường'
      break
    case 'phong-kham':
      required = floors >= 5
      reason = 'Phòng khám ≥ 5 tầng'
      break
    case 'co-so-xa-hoi':
      required = floors >= 5 || beds >= 50
      reason = 'Cơ sở xã hội ≥ 5 tầng hoặc ≥ 50 giường'
      break
    case 'truong-mam-non':
      required = floors >= 5
      reason = 'Trường mầm non ≥ 5 tầng'
      break
    case 'truong-hoc':
      required = floors >= 5 || totalArea >= 3500
      reason = 'Trường học ≥ 5 tầng hoặc S ≥ 3500m²'
      break
    case 'rap-chieu-phim':
      required = seats >= 500
      reason = 'Rạp / nhà hát ≥ 500 chỗ'
      break
    case 'karaoke-vu-truong':
      required = totalArea >= 300
      reason = 'Karaoke/vũ trường có S ≥ 300m²'
      break
    case 'the-thao':
      required = seats >= 5000
      reason = 'Công trình thể thao ≥ 5000 chỗ'
      break
    case 'kho-hang-ab':
      required = totalArea >= 1500
      reason = 'Kho hạng A,B có S ≥ 1500m²'
      break
    case 'kho-hang-cde':
      required = totalArea >= 3500
      reason = 'Kho hạng C,D,E có S ≥ 3500m²'
      break
    case 'nha-xuong-ab':
      required = totalArea >= 2000
      reason = 'Xưởng hạng A,B có S ≥ 2000m²'
      break
    case 'nha-xuong-cde':
      required = totalArea >= 5000
      reason = 'Xưởng hạng C,D,E có S ≥ 5000m²'
      break
    case 'gara-o-to':
      required = basementFloors >= 2 || input.cars >= 50
      reason = 'Gara ≥ 2 tầng hầm hoặc ≥ 50 chỗ đỗ'
      break
  }

  if (!required) {
    return {
      status: 'not-required',
      reason: `Không bắt buộc: ${reason || 'chưa đạt ngưỡng quy định'}`,
      equipment: [],
      references: ['QCVN 06:2023/BXD – Phụ lục E, Bảng E.3'],
    }
  }

  return {
    status: 'required',
    reason,
    equipment: [
      'Đầu phun sprinkler (che phủ ≤ 12m² / đầu phun)',
      'Đường ống phân phối nước áp lực',
      'Van kiểm tra dòng chảy + chuông báo động thủy lực',
      'Bơm chữa cháy chính + bơm dự phòng (diesel)',
      'Bơm bù áp Jockey',
      'Bể dự trữ nước chữa cháy (dung tích theo tính toán)',
    ],
    references: [
      'QCVN 06:2023/BXD – Phụ lục E, Bảng E.3',
      'TCVN 7336:2021 – Hệ thống sprinkler tự động',
    ],
  }
}

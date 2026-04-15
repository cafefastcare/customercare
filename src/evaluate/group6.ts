import type { BuildingInput, SystemResult } from '../types'

/** Nhóm 6: Chiếu sáng sự cố & biển chỉ dẫn thoát nạn
 *  Tham chiếu: QCVN 06:2023/BXD – Điều 6.8, Phụ lục E */
export function evaluateGroup6(input: BuildingInput): SystemResult {
  const { buildingType: bt, floors, totalArea, seats, beds } = input

  // Công trình công cộng: luôn bắt buộc
  const publicBuildings: typeof bt[] = [
    'khach-san', 'van-phong', 'tttm-sieu-thi', 'cho', 'nha-hang',
    'benh-vien', 'phong-kham', 'co-so-xa-hoi',
    'truong-mam-non', 'truong-hoc',
    'rap-chieu-phim', 'karaoke-vu-truong', 'the-thao',
    'gara-o-to',
  ]

  if (publicBuildings.includes(bt)) {
    return {
      status: 'required',
      reason: 'Công trình công cộng: luôn bắt buộc',
      equipment: equipment(),
      references: refs(),
    }
  }

  // Kho / xưởng: khi có người làm việc thường xuyên
  if (['kho-hang-ab', 'kho-hang-cde', 'nha-xuong-ab', 'nha-xuong-cde'].includes(bt) && totalArea >= 500) {
    return {
      status: 'required',
      reason: 'Kho / xưởng có S ≥ 500m² (có người làm việc)',
      equipment: equipment(),
      references: refs(),
    }
  }

  // Nhà ở: khi ≥ 3 tầng hoặc ≥ 50 người
  const isResidential = ['nha-o-rieng-le', 'chung-cu', 'nha-o-ket-hop-kd'].includes(bt)
  if (isResidential && (floors >= 3 || seats >= 50 || beds >= 50)) {
    return {
      status: 'required',
      reason: 'Nhà ở ≥ 3 tầng hoặc ≥ 50 người sử dụng',
      equipment: equipment(),
      references: refs(),
    }
  }

  return {
    status: 'not-required',
    reason: 'Nhà ở thấp tầng, ít người: không bắt buộc',
    equipment: [],
    references: refs(),
  }
}

function equipment(): string[] {
  return [
    'Đèn exit (màu xanh lá) tại mỗi lối ra thoát nạn',
    'Biển chỉ hướng thoát nạn có mũi tên phản quang',
    'Đèn chiếu sáng sự cố dọc hành lang / cầu thang (tự động bật khi mất điện)',
    'Nguồn điện ắc quy dự phòng duy trì ≥ 1 giờ',
  ]
}

function refs(): string[] {
  return [
    'QCVN 06:2023/BXD – Điều 6.8',
    'TCVN 3978:2004 – Chiếu sáng nhân tạo',
  ]
}

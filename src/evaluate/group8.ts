import type { BuildingInput, SystemResult } from '../types'

/** Nhóm 8: Lối thoát nạn & buồng thang thoát nạn (yêu cầu kiến trúc)
 *  Tham chiếu: QCVN 06:2023/BXD – Điều 3.4, Chương 4 */
export function evaluateGroup8(input: BuildingInput): SystemResult {
  const { buildingType: bt, floors, basementFloors, height, seats } = input

  const notes: string[] = []

  // Số lối thoát tối thiểu
  if (floors >= 2 || basementFloors >= 1) {
    notes.push('Cần ≥ 2 lối thoát nạn độc lập')
  }
  if (seats >= 50 || ['tttm-sieu-thi', 'rap-chieu-phim', 'the-thao'].includes(bt)) {
    notes.push('Cần ≥ 2 lối thoát nạn (do đông người)')
  }

  // Loại buồng thang thoát nạn
  if (height >= 50) {
    notes.push('Buồng thang loại N1 hoặc N3 (H ≥ 50m – nhà siêu cao tầng)')
  } else if (height >= 28 || floors >= 10) {
    notes.push('Buồng thang loại N2 – có tiền sảnh, tăng áp cơ học (H ≥ 28m)')
  } else if (height >= 15 || floors >= 5) {
    notes.push('Buồng thang loại N2 khuyến nghị (H ≥ 15m)')
  }

  // Khoảng cách tối đa đến lối thoát
  notes.push('Khoảng cách đến lối thoát: ≤ 25m (hành lang cụt) / ≤ 40m (2 hướng)')

  // Gara hầm
  if (bt === 'gara-o-to' && basementFloors >= 1) {
    notes.push('Gara hầm: thang thoát nạn riêng, không đi qua khu đỗ xe')
  }

  // Chiều rộng tối thiểu
  notes.push('Chiều rộng cửa thoát nạn ≥ 0.9m; chiều rộng hành lang ≥ 1.2m')

  if (notes.length === 0) {
    return {
      status: 'not-required',
      reason: 'Nhà 1 tầng ít người: không có yêu cầu đặc biệt về thang thoát nạn',
      equipment: [],
      references: ['QCVN 06:2023/BXD – Chương 4'],
    }
  }

  return {
    status: 'required',
    reason: 'Yêu cầu kiến trúc – cần kiểm tra trên bản vẽ thiết kế',
    equipment: notes,
    references: [
      'QCVN 06:2023/BXD – Điều 3.4, Chương 4 (Thoát nạn)',
      'QCVN 06:2023/BXD – Phụ lục C (Buồng thang thoát nạn N1, N2, N3)',
    ],
  }
}

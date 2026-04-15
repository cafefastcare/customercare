import type { BuildingInput, SystemResult } from '../types'

/** Nhóm 5: Hệ thống kiểm soát khói (Smoke Control)
 *  Tham chiếu: QCVN 06:2023/BXD – Điều 6.6, Phụ lục E */
export function evaluateGroup5(input: BuildingInput): SystemResult {
  const { buildingType: bt, floors, basementFloors, height, totalArea, seats } = input

  const reasons: string[] = []

  // Nhà cao tầng: H ≥ 28m → bắt buộc hút khói + tăng áp
  if (height >= 28) reasons.push('Công trình H ≥ 28m (nhà cao tầng)')

  // Hành lang tối: ≥ 5 tầng không có cửa sổ tự nhiên
  if (floors >= 5) reasons.push('≥ 5 tầng (hành lang cần hút khói nếu không có thông gió tự nhiên)')

  // Tăng áp buồng thang thoát nạn
  if (floors >= 7 && ['chung-cu', 'khach-san', 'van-phong', 'nha-o-ket-hop-kd'].includes(bt)) {
    reasons.push('≥ 7 tầng → tăng áp buồng thang thoát nạn N2')
  }

  // Gara hầm: luôn cần hút khói cơ học
  if (bt === 'gara-o-to' && basementFloors >= 1) reasons.push('Gara có tầng hầm → hút khói cơ học bắt buộc')
  if (bt === 'gara-o-to' && basementFloors === 0) reasons.push('Gara nổi ≥ 2 tầng → hút khói cơ học')

  // Kho / xưởng lớn
  if ((bt === 'kho-hang-ab' || bt === 'kho-hang-cde') && totalArea >= 5000) {
    reasons.push('Kho có S ≥ 5000m² → hút khói mái')
  }
  if ((bt === 'nha-xuong-ab' || bt === 'nha-xuong-cde') && totalArea >= 5000) {
    reasons.push('Xưởng có S ≥ 5000m² → hút khói mái')
  }

  // Rạp / karaoke phòng kín
  if (bt === 'rap-chieu-phim' && seats >= 300) reasons.push('Rạp ≥ 300 chỗ kín → hút khói phòng khán giả')
  if (bt === 'karaoke-vu-truong') reasons.push('Karaoke/vũ trường phòng kín → hút khói cơ học')

  // TTTM tầng hầm hoặc lớn
  if (bt === 'tttm-sieu-thi' && (basementFloors >= 1 || totalArea >= 3500)) {
    reasons.push('TTTM có tầng hầm hoặc S ≥ 3500m²')
  }

  const required = reasons.length > 0

  if (!required) {
    return {
      status: 'not-required',
      reason: 'Chưa đạt ngưỡng yêu cầu hệ thống kiểm soát khói',
      equipment: [],
      references: ['QCVN 06:2023/BXD – Điều 6.6'],
    }
  }

  const equipment: string[] = [
    'Quạt hút khói cơ học (tại tầng hầm, hành lang, phòng kín)',
    'Cửa chống khói tự động (thường mở / thường đóng)',
    'Van khói trên ống gió',
  ]

  if (floors >= 7 && ['chung-cu', 'khach-san', 'van-phong', 'nha-o-ket-hop-kd'].includes(bt)) {
    equipment.push('Hệ thống tăng áp buồng thang thoát nạn (quạt + van điều áp)')
  }
  if (height >= 28) {
    equipment.push('Hệ thống tăng áp tiền sảnh thang máy (nhà siêu cao tầng)')
  }

  return {
    status: 'required',
    reason: reasons.join('; '),
    equipment,
    references: [
      'QCVN 06:2023/BXD – Điều 6.6 & Phụ lục E',
      'TCVN 6160:1996 – Phòng cháy chữa cháy nhà cao tầng',
    ],
  }
}

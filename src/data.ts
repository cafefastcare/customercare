import type { BuildingTypeInfo } from './types'

// Danh sách loại công trình theo QCVN 06:2023/BXD
export const BUILDING_TYPES: BuildingTypeInfo[] = [
  // ── Nhóm F1 – Nhà ở ─────────────────────────────────────────────
  {
    id: 'nha-o-rieng-le',
    group: 'F1',
    groupLabel: 'Nhà ở',
    label: 'Nhà ở riêng lẻ (biệt thự, liền kề, nhà phố)',
  },
  {
    id: 'chung-cu',
    group: 'F1',
    groupLabel: 'Nhà ở',
    label: 'Nhà chung cư, căn hộ tập thể',
  },
  {
    id: 'nha-o-ket-hop-kd',
    group: 'F1',
    groupLabel: 'Nhà ở',
    label: 'Nhà ở kết hợp kinh doanh thương mại',
  },

  // ── Nhóm F2 – Giải trí ──────────────────────────────────────────
  {
    id: 'rap-chieu-phim',
    group: 'F2',
    groupLabel: 'Giải trí & Văn hóa',
    label: 'Rạp chiếu phim, nhà hát, sân khấu biểu diễn',
    showSeats: true,
  },
  {
    id: 'karaoke-vu-truong',
    group: 'F2',
    groupLabel: 'Giải trí & Văn hóa',
    label: 'Karaoke, vũ trường, bar, discotheque',
    showSeats: true,
  },
  {
    id: 'the-thao',
    group: 'F2',
    groupLabel: 'Giải trí & Văn hóa',
    label: 'Công trình thể thao (sân vận động, nhà thi đấu)',
    showSeats: true,
  },

  // ── Nhóm F3 – Thương mại & Dịch vụ ─────────────────────────────
  {
    id: 'khach-san',
    group: 'F3',
    groupLabel: 'Thương mại & Dịch vụ',
    label: 'Khách sạn, nhà nghỉ, ký túc xá',
    showRooms: true,
  },
  {
    id: 'van-phong',
    group: 'F3',
    groupLabel: 'Thương mại & Dịch vụ',
    label: 'Văn phòng, trụ sở cơ quan, ngân hàng',
  },
  {
    id: 'tttm-sieu-thi',
    group: 'F3',
    groupLabel: 'Thương mại & Dịch vụ',
    label: 'Trung tâm thương mại, siêu thị, cửa hàng tiện lợi',
  },
  {
    id: 'cho',
    group: 'F3',
    groupLabel: 'Thương mại & Dịch vụ',
    label: 'Chợ (dân sinh, đầu mối)',
  },
  {
    id: 'nha-hang',
    group: 'F3',
    groupLabel: 'Thương mại & Dịch vụ',
    label: 'Nhà hàng, quán ăn, căn tin, café',
    showSeats: true,
  },

  // ── Nhóm F4 – Giáo dục & Y tế ───────────────────────────────────
  {
    id: 'truong-mam-non',
    group: 'F4',
    groupLabel: 'Giáo dục & Y tế',
    label: 'Trường mầm non, mẫu giáo, nhà trẻ',
  },
  {
    id: 'truong-hoc',
    group: 'F4',
    groupLabel: 'Giáo dục & Y tế',
    label: 'Trường phổ thông, đại học, trung tâm đào tạo',
  },
  {
    id: 'benh-vien',
    group: 'F4',
    groupLabel: 'Giáo dục & Y tế',
    label: 'Bệnh viện, cơ sở y tế có giường bệnh nội trú',
    showBeds: true,
  },
  {
    id: 'phong-kham',
    group: 'F4',
    groupLabel: 'Giáo dục & Y tế',
    label: 'Phòng khám, trung tâm y tế không nội trú',
  },
  {
    id: 'co-so-xa-hoi',
    group: 'F4',
    groupLabel: 'Giáo dục & Y tế',
    label: 'Nhà dưỡng lão, trại trẻ mồ côi, cơ sở bảo trợ xã hội',
    showBeds: true,
  },

  // ── Nhóm F5 – Sản xuất & Kho ────────────────────────────────────
  {
    id: 'nha-xuong-ab',
    group: 'F5',
    groupLabel: 'Sản xuất & Kho',
    label: 'Nhà xưởng sản xuất hạng A, B (chất lỏng/khí dễ cháy, bụi nổ)',
  },
  {
    id: 'nha-xuong-cde',
    group: 'F5',
    groupLabel: 'Sản xuất & Kho',
    label: 'Nhà xưởng sản xuất hạng C, D, E (gỗ, giấy, kim loại, vật liệu không cháy)',
  },
  {
    id: 'kho-hang-ab',
    group: 'F5',
    groupLabel: 'Sản xuất & Kho',
    label: 'Kho hàng hạng A, B (chất lỏng/khí dễ cháy, hóa chất nguy hiểm)',
  },
  {
    id: 'kho-hang-cde',
    group: 'F5',
    groupLabel: 'Sản xuất & Kho',
    label: 'Kho hàng hạng C, D, E (hàng tiêu dùng, nông sản, vật liệu xây dựng)',
  },
  {
    id: 'gara-o-to',
    group: 'F5',
    groupLabel: 'Sản xuất & Kho',
    label: 'Gara ô tô, bãi đỗ xe (ngầm hoặc nổi)',
    showCars: true,
  },
]

export const BUILDING_GROUPS = Array.from(
  new Map(BUILDING_TYPES.map((t) => [t.group, { code: t.group, label: t.groupLabel }])).values()
)

// ============================================================
// QCVN 06:2023/BXD - Quy chuẩn kỹ thuật quốc gia về an toàn
// cháy cho nhà và công trình
// ============================================================

export type BuildingTypeId =
  // F1 - Nhà ở
  | 'nha-o-rieng-le'        // Nhà ở riêng lẻ (đơn lập, liền kề)
  | 'chung-cu'              // Chung cư, nhà ở tập thể
  | 'nha-o-ket-hop-kd'      // Nhà ở kết hợp kinh doanh
  // F2 - Giải trí
  | 'rap-chieu-phim'        // Rạp chiếu phim, nhà hát, sân khấu
  | 'karaoke-vu-truong'     // Karaoke, vũ trường, bar, discotheque
  | 'the-thao'              // Công trình thể thao
  // F3 - Thương mại & dịch vụ
  | 'khach-san'             // Khách sạn, nhà nghỉ, ký túc xá
  | 'van-phong'             // Văn phòng, trụ sở cơ quan
  | 'tttm-sieu-thi'         // Trung tâm thương mại, siêu thị
  | 'cho'                   // Chợ, chợ đầu mối
  | 'nha-hang'              // Nhà hàng, quán ăn, café
  // F4 - Giáo dục & Y tế
  | 'truong-mam-non'        // Trường mầm non, mẫu giáo, nhà trẻ
  | 'truong-hoc'            // Trường phổ thông, đại học, trung tâm đào tạo
  | 'benh-vien'             // Bệnh viện, cơ sở y tế điều trị nội trú
  | 'phong-kham'            // Phòng khám, cơ sở y tế không nội trú
  | 'co-so-xa-hoi'          // Nhà dưỡng lão, trại trẻ mồ côi
  // F5 - Sản xuất & Kho
  | 'nha-xuong-ab'          // Nhà xưởng sản xuất hạng A, B (nguy hiểm cao)
  | 'nha-xuong-cde'         // Nhà xưởng sản xuất hạng C, D, E
  | 'kho-hang-ab'           // Kho hàng hạng A, B (chất lỏng/khí dễ cháy)
  | 'kho-hang-cde'          // Kho hàng hạng C, D, E (hàng thông thường)
  | 'gara-o-to'             // Gara ô tô, bãi đỗ xe ngầm/nổi
  | '';

export interface BuildingTypeInfo {
  id: BuildingTypeId;
  label: string;
  group: string;
  groupLabel: string;
  // Các trường nhập bổ sung cần hiển thị
  showRooms?: boolean;   // số phòng lưu trú (khách sạn)
  showBeds?: boolean;    // số giường bệnh
  showSeats?: boolean;   // số chỗ ngồi
  showCars?: boolean;    // số chỗ đỗ xe
}

export interface BuildingInput {
  buildingType: BuildingTypeId;
  floors: number;            // số tầng nổi
  basementFloors: number;    // số tầng hầm
  height: number;            // chiều cao công trình (m)
  totalArea: number;         // tổng diện tích sàn xây dựng (m²)
  rooms: number;             // số phòng lưu trú
  beds: number;              // số giường bệnh
  seats: number;             // số chỗ ngồi
  cars: number;              // số chỗ đỗ xe
}

export type RequirementStatus = 'required' | 'not-required' | 'need-info';

export interface SystemResult {
  status: RequirementStatus;
  /** Lý do ngắn gọn */
  reason: string;
  /** Danh sách thiết bị/hạng mục cụ thể cần trang bị */
  equipment: string[];
  /** Điều khoản QCVN 06:2023 */
  references: string[];
}

export interface EvaluationResult {
  groupCode: string;
  groupLabel: string;
  /** Bình chữa cháy xách tay */
  extinguisher: SystemResult;
  /** Hệ thống báo cháy tự động */
  alarm: SystemResult;
  /** Hệ thống chữa cháy vách tường */
  hoseReel: SystemResult;
  /** Hệ thống chữa cháy tự động (sprinkler) */
  sprinkler: SystemResult;
  /** Hệ thống hút/kiểm soát khói */
  smokeControl: SystemResult;
  /** Chiếu sáng sự cố & biển chỉ dẫn thoát nạn */
  emergencyLighting: SystemResult;
  /** Cấp nước chữa cháy ngoài nhà */
  waterSupply: SystemResult;
  /** Lối thoát nạn & buồng thang thoát nạn */
  evacuationRoutes: SystemResult;
  /** Ghi chú bổ sung */
  notes: string[];
}

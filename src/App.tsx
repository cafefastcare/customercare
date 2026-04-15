import { useState } from 'react'
import { BUILDING_TYPES, BUILDING_GROUPS } from './data'
import { evaluate } from './evaluate'
import type { BuildingInput, EvaluationResult, SystemResult } from './types'

const EMPTY_INPUT: BuildingInput = {
  buildingType: '',
  floors: 0,
  basementFloors: 0,
  height: 0,
  totalArea: 0,
  rooms: 0,
  beds: 0,
  seats: 0,
  cars: 0,
}

const SYSTEM_LABELS: { key: keyof EvaluationResult; label: string; icon: string }[] = [
  { key: 'extinguisher',      label: 'Bình chữa cháy xách tay',            icon: '🧯' },
  { key: 'alarm',             label: 'Hệ thống báo cháy tự động (AFA)',    icon: '🔔' },
  { key: 'hoseReel',          label: 'Hệ thống chữa cháy vách tường',      icon: '🚿' },
  { key: 'sprinkler',         label: 'Hệ thống sprinkler / AFS',           icon: '💧' },
  { key: 'smokeControl',      label: 'Hệ thống kiểm soát khói',            icon: '💨' },
  { key: 'emergencyLighting', label: 'Chiếu sáng sự cố & biển thoát nạn', icon: '🚨' },
  { key: 'waterSupply',       label: 'Cấp nước chữa cháy ngoài nhà',      icon: '🚒' },
  { key: 'evacuationRoutes',  label: 'Lối & buồng thang thoát nạn',       icon: '🚪' },
]

export default function App() {
  const [input, setInput] = useState<BuildingInput>(EMPTY_INPUT)
  const [result, setResult] = useState<EvaluationResult | null>(null)

  const selectedType = BUILDING_TYPES.find((t) => t.id === input.buildingType)

  function handleChange(field: keyof BuildingInput, value: string | number) {
    setInput((prev) => ({ ...prev, [field]: value }))
    setResult(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.buildingType) return
    setResult(evaluate(input))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-orange-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <h1 className="text-xl font-bold leading-tight">Tra cứu yêu cầu PCCC</h1>
              <p className="text-orange-200 text-sm mt-0.5">
                QCVN 06:2023/BXD – Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Form nhập liệu ─────────────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4 h-fit"
        >
          <h2 className="font-semibold text-gray-800 text-base border-b pb-2">Thông tin công trình</h2>

          {/* Loại công trình */}
          <div>
            <label className="label">Loại công trình *</label>
            <select
              className="input-field"
              value={input.buildingType}
              onChange={(e) => handleChange('buildingType', e.target.value)}
              required
            >
              <option value="">-- Chọn loại công trình --</option>
              {BUILDING_GROUPS.map((g) => (
                <optgroup key={g.code} label={`Nhóm ${g.code} – ${g.label}`}>
                  {BUILDING_TYPES.filter((t) => t.group === g.code).map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Số tầng nổi + hầm */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Số tầng nổi</label>
              <input
                type="number" min={0} className="input-field"
                value={input.floors || ''}
                onChange={(e) => handleChange('floors', Number(e.target.value))}
                placeholder="VD: 5"
              />
            </div>
            <div>
              <label className="label">Số tầng hầm</label>
              <input
                type="number" min={0} className="input-field"
                value={input.basementFloors || ''}
                onChange={(e) => handleChange('basementFloors', Number(e.target.value))}
                placeholder="VD: 1"
              />
            </div>
          </div>

          {/* Chiều cao */}
          <div>
            <label className="label">Chiều cao công trình (m)</label>
            <input
              type="number" min={0} step={0.1} className="input-field"
              value={input.height || ''}
              onChange={(e) => handleChange('height', Number(e.target.value))}
              placeholder="VD: 22.5"
            />
          </div>

          {/* Tổng diện tích sàn */}
          <div>
            <label className="label">Tổng diện tích sàn (m²)</label>
            <input
              type="number" min={0} className="input-field"
              value={input.totalArea || ''}
              onChange={(e) => handleChange('totalArea', Number(e.target.value))}
              placeholder="VD: 1200"
            />
          </div>

          {/* Fields điều kiện */}
          {selectedType?.showRooms && (
            <div>
              <label className="label">Số phòng lưu trú</label>
              <input
                type="number" min={0} className="input-field"
                value={input.rooms || ''}
                onChange={(e) => handleChange('rooms', Number(e.target.value))}
                placeholder="VD: 20"
              />
            </div>
          )}
          {selectedType?.showBeds && (
            <div>
              <label className="label">Số giường bệnh / lưu trú</label>
              <input
                type="number" min={0} className="input-field"
                value={input.beds || ''}
                onChange={(e) => handleChange('beds', Number(e.target.value))}
                placeholder="VD: 100"
              />
            </div>
          )}
          {selectedType?.showSeats && (
            <div>
              <label className="label">Số chỗ ngồi</label>
              <input
                type="number" min={0} className="input-field"
                value={input.seats || ''}
                onChange={(e) => handleChange('seats', Number(e.target.value))}
                placeholder="VD: 200"
              />
            </div>
          )}
          {selectedType?.showCars && (
            <div>
              <label className="label">Số chỗ đỗ xe</label>
              <input
                type="number" min={0} className="input-field"
                value={input.cars || ''}
                onChange={(e) => handleChange('cars', Number(e.target.value))}
                placeholder="VD: 50"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!input.buildingType}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300
                       text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Tra cứu yêu cầu PCCC
          </button>
        </form>

        {/* ── Kết quả ────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-3">
          {!result && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-gray-400">
              <div className="text-5xl mb-3">🏗️</div>
              <p className="text-sm">Nhập thông tin công trình và nhấn <strong>Tra cứu</strong> để xem kết quả</p>
            </div>
          )}

          {result && (
            <>
              {/* Tiêu đề kết quả */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                    Nhóm {result.groupCode}
                  </span>
                  <h3 className="font-semibold text-gray-800">{selectedType?.label}</h3>
                </div>
                <SummaryBadge result={result} />
              </div>

              {/* Cards từng hệ thống */}
              {SYSTEM_LABELS.map(({ key, label, icon }) => {
                const sys = result[key] as SystemResult | undefined
                if (!sys) return null
                return (
                  <SystemCard key={key} icon={icon} label={label} sys={sys} />
                )
              })}

              {/* Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800">
                <strong>⚠️ Lưu ý:</strong> Kết quả chỉ mang tính tham khảo dựa trên các ngưỡng chính của
                QCVN 06:2023/BXD. Yêu cầu PCCC cụ thể phụ thuộc vào thiết kế chi tiết, đặc tính vật liệu
                và cần được xác nhận bởi kỹ sư PCCC có chứng chỉ hành nghề.
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

/* ── Sub-components ────────────────────────────────────────────── */

function SummaryBadge({ result }: { result: EvaluationResult }) {
  const systems = SYSTEM_LABELS.map(({ key }) => result[key] as SystemResult | undefined)
  const requiredCount = systems.filter((s) => s?.status === 'required').length
  return (
    <span className="text-sm font-semibold text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
      {requiredCount} / {systems.length} hệ thống bắt buộc
    </span>
  )
}

function SystemCard({ icon, label, sys }: { icon: string; label: string; sys: SystemResult }) {
  const [open, setOpen] = useState(false)

  const isRequired = sys.status === 'required'
  const isNotRequired = sys.status === 'not-required'

  const borderColor = isRequired ? 'border-red-200' : isNotRequired ? 'border-green-200' : 'border-yellow-200'
  const headerBg   = isRequired ? 'bg-red-50'   : isNotRequired ? 'bg-green-50'   : 'bg-yellow-50'
  const badgeCls   = isRequired
    ? 'bg-red-100 text-red-700'
    : isNotRequired
    ? 'bg-green-100 text-green-700'
    : 'bg-yellow-100 text-yellow-700'
  const badgeText  = isRequired ? 'Bắt buộc' : isNotRequired ? 'Không cần' : 'Cần xem xét'

  return (
    <div className={`rounded-xl border ${borderColor} overflow-hidden shadow-sm`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full ${headerBg} px-4 py-3 flex items-center justify-between text-left`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium text-gray-800">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeCls}`}>
            {badgeText}
          </span>
          <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="px-4 py-3 space-y-2 bg-white text-sm">
          <p className="text-gray-600 italic">{sys.reason}</p>

          {sys.equipment.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 mb-1">Thiết bị / hạng mục:</p>
              <ul className="space-y-1">
                {sys.equipment.map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-700">
                    <span className="text-orange-500 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sys.references.length > 0 && (
            <div className="pt-1 border-t border-gray-100">
              {sys.references.map((ref, i) => (
                <span key={i} className="inline-block text-xs text-gray-400 mr-3">{ref}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

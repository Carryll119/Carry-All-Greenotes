'use client'

import { useState } from 'react'

interface ProvinceData {
  id: string
  name: string
  nameZh: string
  industries: string[]
  color: string
  path: string
  labelX: number
  labelY: number
}

interface CityData {
  name: string
  nameZh: string
  x: number
  y: number
  provinceId: string
}

const provinces: ProvinceData[] = [
  {
    id: 'bc',
    name: 'British Columbia',
    nameZh: '卑詩省',
    industries: ['科技業', '林業', '清潔能源'],
    color: '#EF4444',
    path: 'M150,180 L280,150 L380,160 L420,200 L400,280 L320,320 L240,340 L180,320 L140,280 L120,240 Z',
    labelX: 260,
    labelY: 240,
  },
  {
    id: 'ab',
    name: 'Alberta',
    nameZh: '阿伯達省',
    industries: ['石油天然氣', '可再生能源轉型'],
    color: '#A78BFA',
    path: 'M420,200 L560,180 L640,220 L620,320 L540,360 L420,340 L400,280 Z',
    labelX: 520,
    labelY: 270,
  },
  {
    id: 'sk',
    name: 'Saskatchewan',
    nameZh: '薩斯喀徹溫省',
    industries: ['農業', '鉀肥', '新興科技'],
    color: '#A78BFA',
    path: 'M640,220 L840,200 L920,240 L900,360 L760,380 L640,360 L620,320 Z',
    labelX: 780,
    labelY: 290,
  },
  {
    id: 'mb',
    name: 'Manitoba',
    nameZh: '曼尼托巴省',
    industries: ['農業', '製造業', '水電'],
    color: '#60A5FA',
    path: 'M920,240 L1080,220 L1160,260 L1140,400 L1000,420 L920,380 L900,360 Z',
    labelX: 1040,
    labelY: 330,
  },
  {
    id: 'on',
    name: 'Ontario',
    nameZh: '安大略省',
    industries: ['金融科技', '汽車業', '清潔技術'],
    color: '#14B8A6',
    path: 'M1160,260 L1400,240 L1480,280 L1460,480 L1320,500 L1160,460 L1140,400 Z',
    labelX: 1320,
    labelY: 370,
  },
  {
    id: 'qc',
    name: 'Quebec',
    nameZh: '魁北克省',
    industries: ['清潔技術', '航空', '水電'],
    color: '#FCD34D',
    path: 'M1480,280 L1720,260 L1800,300 L1760,520 L1640,540 L1480,500 L1460,480 Z',
    labelX: 1640,
    labelY: 400,
  },
  {
    id: 'nb',
    name: 'New Brunswick',
    nameZh: '新不倫瑞克省',
    industries: ['海洋科技', '可再生能源'],
    color: '#86EFAC',
    path: 'M1720,260 L1800,250 L1840,290 L1820,360 L1760,380 L1720,340 Z',
    labelX: 1780,
    labelY: 320,
  },
  {
    id: 'ns',
    name: 'Nova Scotia',
    nameZh: '新斯科舍省',
    industries: ['海洋科技', '可再生能源'],
    color: '#86EFAC',
    path: 'M1800,250 L1880,240 L1920,280 L1900,340 L1840,360 L1800,320 Z',
    labelX: 1860,
    labelY: 290,
  },
  {
    id: 'pei',
    name: 'Prince Edward Island',
    nameZh: '愛德華王子島',
    industries: ['海洋科技', '可再生能源'],
    color: '#86EFAC',
    path: 'M1760,380 L1800,375 L1820,395 L1800,410 L1760,405 Z',
    labelX: 1790,
    labelY: 392,
  },
  {
    id: 'nl',
    name: 'Newfoundland and Labrador',
    nameZh: '紐芬蘭與拉布拉多省',
    industries: ['海上風電', '傳統能源'],
    color: '#86EFAC',
    path: 'M1880,240 L2000,230 L2040,280 L2000,400 L1920,410 L1880,360 L1900,340 Z',
    labelX: 1960,
    labelY: 320,
  },
  {
    id: 'yt',
    name: 'Yukon',
    nameZh: '育空領地',
    industries: ['關鍵礦物', '清潔能源'],
    color: '#93C5FD',
    path: 'M200,80 L380,60 L420,120 L380,180 L280,200 L200,160 L180,120 Z',
    labelX: 300,
    labelY: 130,
  },
  {
    id: 'nt',
    name: 'Northwest Territories',
    nameZh: '西北領地',
    industries: ['關鍵礦物', '清潔能源'],
    color: '#FDE68A',
    path: 'M420,120 L640,100 L720,140 L680,240 L560,260 L420,220 L380,180 Z',
    labelX: 570,
    labelY: 190,
  },
  {
    id: 'nu',
    name: 'Nunavut',
    nameZh: '努納武特領地',
    industries: ['關鍵礦物', '清潔能源'],
    color: '#86EFAC',
    path: 'M720,140 L1080,120 L1160,160 L1120,320 L960,340 L720,300 L680,240 Z',
    labelX: 940,
    labelY: 230,
  },
]

const cities: CityData[] = [
  { name: 'Vancouver', nameZh: '溫哥華', x: 320, y: 240, provinceId: 'bc' },
  { name: 'Victoria', nameZh: '維多利亞', x: 280, y: 280, provinceId: 'bc' },
  { name: 'Calgary', nameZh: '卡加利', x: 520, y: 280, provinceId: 'ab' },
  { name: 'Edmonton', nameZh: '艾蒙頓', x: 540, y: 240, provinceId: 'ab' },
  { name: 'Saskatoon', nameZh: '沙士加通', x: 760, y: 300, provinceId: 'sk' },
  { name: 'Regina', nameZh: '利載拿', x: 780, y: 320, provinceId: 'sk' },
  { name: 'Winnipeg', nameZh: '溫尼伯', x: 1000, y: 360, provinceId: 'mb' },
  { name: 'Toronto', nameZh: '多倫多', x: 1320, y: 420, provinceId: 'on' },
  { name: 'Ottawa', nameZh: '渥太華', x: 1400, y: 400, provinceId: 'on' },
  { name: 'Montreal', nameZh: '滿地可', x: 1640, y: 440, provinceId: 'qc' },
]

export default function CanadaMap() {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null)
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null)

  const handleProvinceClick = (province: ProvinceData) => {
    setSelectedProvince(selectedProvince?.id === province.id ? null : province)
  }

  return (
    <div className="my-8 w-full max-w-3xl mx-auto">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        {/* 地图容器 */}
        <div className="w-full map-container" style={{ height: '500px' }}>
          <svg
            viewBox="0 0 2200 600"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* 背景 */}
            <rect width="2200" height="600" fill="#FFFFFF" className="dark:fill-gray-900" />

            {/* 省份路径 */}
            {provinces.map((province) => {
              const isHovered = hoveredProvince === province.id
              const isSelected = selectedProvince?.id === province.id

              return (
                <g key={province.id}>
                  <path
                    d={province.path}
                    fill={
                      isSelected
                        ? province.color
                        : isHovered
                          ? `${province.color}DD`
                          : `${province.color}AA`
                    }
                    stroke="#E5E7EB"
                    strokeWidth="1.5"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => handleProvinceClick(province)}
                    onMouseEnter={() => setHoveredProvince(province.id)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    style={{
                      filter: isHovered || isSelected ? 'brightness(1.1)' : 'none',
                    }}
                  />
                  {/* 省份名称标签 */}
                  <text
                    x={province.labelX}
                    y={province.labelY}
                    className="text-sm font-medium fill-gray-800 dark:fill-gray-200 pointer-events-none"
                    textAnchor="middle"
                    style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9)' }}
                  >
                    {province.nameZh}
                  </text>
                </g>
              )
            })}

            {/* 城市标记 */}
            {cities.map((city) => (
              <g key={city.name}>
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="6"
                  fill="#FFFFFF"
                  stroke="#374151"
                  strokeWidth="2"
                  className="pointer-events-none"
                />
                <text
                  x={city.x}
                  y={city.y - 12}
                  className="text-xs font-medium fill-gray-800 dark:fill-gray-200 pointer-events-none"
                  textAnchor="middle"
                  style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9)' }}
                >
                  {city.nameZh}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* 信息卡片 */}
        {selectedProvince && (
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {selectedProvince.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{selectedProvince.nameZh}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProvince.industries.map((industry, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedProvince(null)}
                className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="关闭"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* 图例 */}
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-700">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">操作提示</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">点击省份查看详情</p>
        </div>
      </div>

      {/* 移动端响应式样式 */}
      <style jsx>{`
        @media (max-width: 640px) {
          .map-container {
            height: 400px !important;
          }
        }
      `}</style>
    </div>
  )
}

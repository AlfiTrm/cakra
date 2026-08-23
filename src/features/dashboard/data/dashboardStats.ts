import type { AttentionSku, DashboardStat, LatestAnalysis } from '../types/dashboard'

export const dashboardStats: DashboardStat[] = [
  {
    change: '+ 8 SKU baru bulan ini',
    description: 'Aktif dipantau sistem AI',
    label: 'Total SKU Dianalisis',
    tone: 'primary',
    value: '24 SKU',
  },
  {
    change: 'Cukup untuk 2 minggu',
    description: 'Cukup untuk 18 analisis SKU',
    label: 'Sisa Kredit',
    tone: 'success',
    value: '18 Kredit',
  },
  {
    change: '+ 1 dari minggu lalu',
    description: 'Perlu perhatian segera',
    label: 'Risiko Stockout',
    tone: 'danger',
    value: '3 SKU',
  },
  {
    change: '+ 2.1% dari bulan lalu',
    description: 'Berdasarkan histori penjualan',
    label: 'Rata-rata Akurasi',
    tone: 'info',
    value: '94.2%',
  },
]

export const latestAnalyses: LatestAnalysis[] = [
  {
    category: 'Kebutuhan Pokok',
    date: '12 Mar 2026',
    id: '383002',
    rop: 45,
    roq: 120,
    skuName: 'Minyak Goreng Bimoli 2L',
    status: 'Hampir Habis',
  },
  {
    category: 'Makanan Instan',
    date: '11 Mar 2026',
    id: '398131',
    rop: 150,
    roq: 400,
    skuName: 'Indomie Goreng Spesial',
    status: 'Normal',
  },
  {
    category: 'Kebutuhan Pokok',
    date: '10 Mar 2026',
    id: '734723',
    rop: 30,
    roq: 90,
    skuName: 'Gula Pasir Gulaku 1kg',
    status: 'Hampir Habis',
  },
  {
    category: 'Perawatan Tubuh',
    date: '09 Mar 2026',
    id: '119169',
    rop: 15,
    roq: 40,
    skuName: 'Sabun Mandi Lifebuoy 100g',
    status: 'Stok Mati',
  },
  {
    category: 'Minuman',
    date: '08 Mar 2026',
    id: '458348',
    rop: 80,
    roq: 200,
    skuName: 'Teh Pucuk Harum 350ml',
    status: 'Normal',
  },
  {
    category: 'Minuman',
    date: '07 Mar 2026',
    id: '931740',
    rop: 120,
    roq: 350,
    skuName: 'Air Mineral Aqua 600ml',
    status: 'Hampir Habis',
  },
]

export const attentionSkus: AttentionSku[] = [
  {
    message: 'Stok diperkirakan habis dalam 2 hari ke depan.',
    skuName: 'Minyak Goreng Bimoli 2L',
    tone: 'danger',
  },
  {
    message: 'Stok diperkirakan habis dalam 3 hari ke depan.',
    skuName: 'Gula Pasir Gulaku 1kg',
    tone: 'danger',
  },
  {
    message: 'Kecepatan penjualan naik drastis minggu ini.',
    skuName: 'Air Mineral Aqua 600ml',
    tone: 'warning',
  },
]

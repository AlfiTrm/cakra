import type { PreviewErrorRow, PreviewValidRow } from '../types/analysis'

export const previewValidRows: PreviewValidRow[] = [
  { date: '2026-02-15', name: 'Indomie Goreng', no: 1, price: '3.500', quantity: '24' },
  { date: '2026-02-16', name: 'Indomie Goreng', no: 2, price: '3.500', quantity: '18' },
  { date: '2026-02-17', name: 'Indomie Goreng', no: 3, price: '3.500', quantity: '31' },
  { date: '2026-02-18', name: 'Indomie Goreng', no: 4, price: '3.500', quantity: '22' },
  { date: '2026-02-19', name: 'Indomie Goreng', no: 5, price: '3.500', quantity: '27' },
]

export const previewErrorRows: PreviewErrorRow[] = [
  {
    date: '2026-04-01',
    error: 'Nilai penjualan tidak valid. Harus berupa angka nol atau lebih.',
    name: 'Indomie Goreng',
    no: 45,
    price: '3.500',
    quantity: '-3',
  },
  {
    date: '15/06/2026',
    error: 'Format tanggal tidak valid. Gunakan format YYYY-MM-DD.',
    name: 'Indomie Goreng',
    no: 72,
    price: '3.500',
    quantity: '20',
  },
  {
    date: '2026-06-15',
    error: 'Ditemukan tanggal ganda pada baris 73. Gabungkan menjadi satu baris per tanggal.',
    name: 'Indomie Goreng',
    no: 73,
    price: '3.500',
    quantity: '20',
  },
  {
    date: '-',
    error: 'Tanggal tidak boleh kosong.',
    name: 'Indomie Goreng',
    no: 98,
    price: '3.500',
    quantity: '15',
  },
  {
    date: '2026-09-22',
    error: 'Nilai bukan angka.',
    name: 'Indomie Goreng',
    no: 156,
    price: '3.500',
    quantity: 'abc',
  },
]

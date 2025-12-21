// data/product.tsx

export interface Product {
  id: number;
  name: string;
  spec: string;
  img: string;
}

export const products: Product[] = [
  { id: 1, name: "SM Rice Premiumm", spec: "Export Quality • XXXL • 100%", img: "/rice-1.png" },
  { id: 2, name: "SM 1121 Kainat Steam Rice", spec: "XXXL • 100%", img: "/rice-2.png" },
  { id: 3, name: "Nayab Rice", spec: "XXL • 70%", img: "/rice-3.png" },
  { id: 4, name: "Samaj 1121 Kainat Steam", spec: "XL • 50/50", img: "/rice-4.png" },
  { id: 5, name: "Kainat White Rice", spec: "XXXL", img: "/rice-5.png" },
  { id: 6, name: "Super Basmati", spec: "XXXL", img: "/rice-6.png" },
  { id: 7, name: "SM Kainat Sella", spec: "XXXL", img: "/rice-7.png" },
  { id: 8, name: "Nayab Kainat Sella", spec: "XXL • 70%", img: "/rice-8.png" },
  { id: 9, name: "Samaj Kainat Sella", spec: "XL • 50%", img: "/rice-9.png" },
  { id: 10, name: "B1 Kainat Rice", spec: "Short Grain", img: "/rice-10.png" },
  { id: 11, name: "B2 Kainat Rice", spec: "Short Grain", img: "/rice-11.png" },
  { id: 12, name: "Short Bean Rice", spec: "Economy Grade", img: "/rice-12.png" },
];

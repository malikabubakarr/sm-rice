import Image from "next/image";

type ProductProps = {
  name: string;
  bag: string;
  image: string;
};

export default function ProductCard({ name, bag, image }: ProductProps) {
  return (
    <div className="bg-white border border-[#E5D3B3] rounded-xl shadow-md p-6 hover:scale-105 transition">
      <div className="relative h-56 mb-4">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>
      <h2 className="text-2xl font-semibold text-[#5B3A1E]">
        {name}
      </h2>
      <p className="text-[#6B5135]">{bag}</p>
    </div>
  );
}

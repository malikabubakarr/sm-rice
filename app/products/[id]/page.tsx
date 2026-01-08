// app/products/[id]/page.tsx
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import ProductActions from "../../../components/ProductActions"; // client component

export const dynamic = "force-dynamic";

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  // Unwrap params (Next.js 16 App Router requires this)
  const { id } = await params;

  if (!id || !ObjectId.isValid(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-[#F5F0E6]">
        <h1 className="text-3xl font-bold text-red-500">Invalid product ID</h1>
      </div>
    );
  }

  const client = await clientPromise;
  const db = client.db("SmRice");

  const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-[#F5F0E6]">
        <h1 className="text-3xl font-bold text-red-500">Product not found</h1>
      </div>
    );
  }

  const productData = {
    _id: product._id.toString(),
    name: product.name,
    spec: product.spec,
    img: product.img ?? "",
    price: product.price ?? 0,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3] py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-8">
        
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-96 md:h-auto bg-[#f9f5f0] flex items-center justify-center p-4">
          <Image
            src={productData.img || "/rice-product-feature.png"}
            alt={productData.name}
            fill
            className="object-contain rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#5B3A1E] mb-4">{productData.name}</h1>
            <p className="text-[#6B5135] text-lg mb-6">{productData.spec}</p>
            <p className="text-2xl font-semibold text-[#6B4A2E] mb-6">
              PKR {productData.price.toLocaleString()}
            </p>
          </div>

          {/* Client-side Actions */}
          <div className="mt-4">
            <ProductActions product={productData} />
          </div>
        </div>
      </div>
    </main>
  );
}

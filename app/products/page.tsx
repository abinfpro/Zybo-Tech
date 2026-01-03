import CardContainer from "@/components/product/CardContainer";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

export default async function ProductsPage() {
  const data = await getProducts();
  const testProduct: Product = {
    id: "1b69c55c-c35f-4c01-afa1-5426ab0fb086",
    name: "Test Air Force",
    slug: "test-air-force",
    mrp: 4799,
    sale_price: 3799,
    discount: 21,
    new: true,
    out_of_stock: false,
    product_images: [
      {
        product_image:
          "https://pngfile.net/files/preview/1280x1126/11701941830k8nqxsglsd3gv3rwh0zbwfvtjk9nwcsr465npxij1wwycdxdkklslc7946ixsus8gcutcbunhvf1e4h4uuzhuvhxt7rbe0jr8a5e.png?type=free",
      },
    ],
    variation_colors: [
      {
        color_id: 2,
        color_name: "White",
        color_images: [
          "https://pngfile.net/files/preview/1280x1126/11701941830k8nqxsglsd3gv3rwh0zbwfvtjk9nwcsr465npxij1wwycdxdkklslc7946ixsus8gcutcbunhvf1e4h4uuzhuvhxt7rbe0jr8a5e.png?type=free",
          "https://skilltestnextjs.evidam.zybotechlab.com/media/variation_product_images/Component_10.jpg",
        ],
        status: true,
        sizes: [
          {
            size_id: 1,
            variation_product_id: 89,
            size_name: "6",
            status: true,
            price: 3988,
          },
          {
            size_id: 2,
            variation_product_id: 90,
            size_name: "7",
            status: true,
            price: 3820,
          },
          {
            size_id: 3,
            variation_product_id: 91,
            size_name: "8",
            status: true,
            price: 3852,
          },
          {
            size_id: 4,
            variation_product_id: 92,
            size_name: "9",
            status: true,
            price: 3953,
          },
        ],
      },
    ],
  };

  const products = [testProduct, ...data];
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold">Men&apos;s Jordan Shoes</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <CardContainer key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

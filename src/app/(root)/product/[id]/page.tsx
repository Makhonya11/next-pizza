import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma-client";
import { Container } from "@/components/shared/container";
import ProductImage from "@/components/shared/pizza-image";
import { Title } from "@/components/shared/title";
import GroupVariants from "@/components/shared/group-variants";
import ProductForm from "@/components/shared/product-form";
import { FunctionComponent } from "react";





export const ProductPage = async ({params:{id}} : {params:{id : string}}) => {

    const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });
    
    if(!product) {
        return notFound()
    }

    return (  

        <Container className="flex flex-col my-10">
            <ProductForm
            product={product}
            />

        </Container>
    );
}
 
export default ProductPage;
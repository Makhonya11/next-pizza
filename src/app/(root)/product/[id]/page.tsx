import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma-client";
import { Container } from "@/components/shared/container";
import ProductImage from "@/components/shared/product-image";
import { Title } from "@/components/shared/title";
import GroupVariants from "@/components/shared/group-variants";


interface ProductPageProps {
    
}


export const ProductPage: FunctionComponent<ProductPageProps> = async ({params:{id}} : {params:{id : string}}) => {

    const product = await prisma.product.findUnique({where:{id: Number(id)}})
    
    if(!product) {
        return notFound()
    }

    return (  

        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <ProductImage
                imageUrl={product.imageUrl}
                size={40}
                
                />

                <div className="w-[490px] bg-[#f7f6f5] p-7">
                    <Title
                    text={product.name}
                    size='md'
                    className='font-extrabold mb-1'
                    />
                    <p className="text-gray-400"> Loremchik ispum</p>

                    <GroupVariants
                    className=""
                    selectedValue='2'
                    items={[
                        {
                            name: 'Small',
                            value: '1'
                        },
                         {
                            name: 'Small',
                            value: '2'
                        },
                         {
                            name: 'Small',
                            value: '3',
                            disabled: true
                        }
                    ]}
                    />
                </div>

            </div>

        </Container>
    );
}
 
export default ProductPage;
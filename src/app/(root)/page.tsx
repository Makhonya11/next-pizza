
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import Categories from "@/components/shared/categories";
import SortPopup from "@/components/shared/sort-popup";
import TopBar from "@/components/shared/top-bar";
import Filters from "@/components/shared/filters";
import ProductCard from "@/components/shared/product-card";
import ProductGroupList from "@/components/shared/product-group-list";
import { prisma } from "../../../prisma/prisma-client";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";

export default async function Home({searchParams}: {searchParams: GetSearchParams}) {

    const categories = await findPizzas(searchParams)

  return (
    <>
    <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"/>
    </Container>
        <TopBar categories={categories.filter(cat => cat.products.length > 0)}/>
        
        <Container className="pb-14 mt-10">
            <div className="flex gap-[60px]">
                <div className="w-[250px]">
                    <Filters/>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col gap-16">
                       {
                        categories.map(cat => (
                            cat.products.length > 0 && (
                                <ProductGroupList
                                    key={cat.id}
                                    title={cat.name}
                                    items={cat.products}
                                    categoryId={cat.id}
                                />
                            )
                        ))
                       } 
                       
                       
                    </div>
                </div>
            </div>
        </Container>
    </>
  );
}

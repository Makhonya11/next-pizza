
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

export default function Home() {
  return (
    <>
    <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"/>
    </Container>
        <TopBar/>
        
        <Container className="pb-14 mt-10">
            <div className="flex gap-[60px]">
                <div className="w-[250px]">
                    <Filters/>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col gap-16">
                        <ProductGroupList
                        title="Пиццы"
                        items={[
                            {
                                id: 1,
                                name: 'random',
                                imageUrl: 'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                                price: 550,
                                items: [{price:550}],
                            },
                             {
                                id: 2,
                                name: 'random',
                                imageUrl: 'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                                price: 550,
                                items: [{price:550}],
                            },
                             {
                                id: 3,
                                name: 'random',
                                imageUrl: 'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                                price: 550,
                                items: [{price:550}],
                            },
                              {
                                id: 4,
                                name: 'random',
                                imageUrl: 'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                                price: 550,
                                items: [{price:550}],
                            },
                             {
                                id: 5,
                                name: 'random',
                                imageUrl: 'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                                price: 550,
                                items: [{price:550}],
                            },
                             
                        ]}
                        categoryId={1}/>
                          <ProductGroupList
                        title="Комбо"
                        items={[
                            {
                                id: 1,
                                name: 'random',
                                imageUrl: 'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                                price: 550,
                                items: [{price:550}],
                            },
                             {
                                id: 2,
                                name: 'random',
                                imageUrl: 'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                                price: 550,
                                items: [{price:550}],
                            },
                            
                        ]}
                        categoryId={2}/>
                          <ProductGroupList
                        title="Закуски"
                        items={[
                            {
                                id: 1,
                                name: 'random',
                                imageUrl: 'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                                price: 550,
                                items: [{price:550}],
                            },
                             {
                                id: 2,
                                name: 'random',
                                imageUrl: 'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                                price: 550,
                                items: [{price:550}],
                            },
                            
                        ]}
                        categoryId={3}/>
                       
                    </div>
                </div>
            </div>
        </Container>
    </>
  );
}

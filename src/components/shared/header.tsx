
import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart, User } from "lucide-react"; 
import Link from "next/link";
import SearchInput from "./search-input";
import CartButton from "./cart-button";

export const Header = ({className, hasSearch}) => {
    return(
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                <Link href={'/'}>
                <div className="flex items-center gap-4">
                    <Image src='/logo.png' alt="logo" width={35} height={35}/>
                    <div>
                        <h1 className="text-2xl uppercase font-black">Next pizza</h1>
                        <p className="text-sm text-gray-400 leading-3"> вкуснее уже некуда</p>
                    </div>
                </div>
                </Link>

                {hasSearch && 
                <div className="flex rounded-2xl flex-1 justify-between relative h-11">
                    <SearchInput/>
                </div>
                }

                <div className="flex items-center gap-3">
                    <Button variant={'outline'} className="flex items-center gap-1">
                        <User size={16}/>
                        Войти
                    </Button>
                    <CartButton/>
                </div>
            </Container>
        </header>
    )
}
import { cn } from "@/lib/utils";
import Categories from "./categories";
import { Container } from "./container";
import SortPopup from "./sort-popup";
import { FunctionComponent } from "react";

interface TopBarProps {
    className:string
}
 
const TopBar: FunctionComponent<TopBarProps> = ({className}) => {
    return (
        <div className={cn('sticky top-0 db-white py-5 shadow-lg shadow-black/5 z-10', className)}>
        <Container className="flex items-center justify-between">
        <Categories className={""} />
        <SortPopup/>
    </Container>
        </div>
     );
}
 
export default TopBar;
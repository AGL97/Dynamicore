import { ItemList } from "@/infraestructure/types";
import { createContext, ReactNode, useContext, useState } from "react";
import uuid from "react-native-uuid";

interface ListItemProps {
  list: ItemList[];
  addItem: (item: string) => void;
  clearlist: () => void;
}

const ListContext = createContext<ListItemProps>({
    list:[],
    addItem:()=>{},
    clearlist:()=>{},
})

export const ListProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [list,setList] = useState<ItemList[]>([])

    const addItem = (value:string) => {
        setList([...list,{id:uuid.v4(),value:value}])
    }

    const clearlist = () => {
        setList([])
    }

    return <ListContext.Provider value={{list,addItem,clearlist}}>{children}</ListContext.Provider>
}

export const useList = () => useContext(ListContext)
import React, { useEffect, useState } from "react";
import PanigationType from "./Type";
 const Panigation: React.FC<PanigationType> = ({ numPage, indexChoose, setIndex,setNumpage }) => {
    const [map, setMap] = useState<number[]>([]);
    const nextIndex=(index:number)=>{
        if(indexChoose+index>=1 &&indexChoose+index<=numPage){
            setIndex(indexChoose+index)
        } 
    }
    useEffect(()=>{
        if(numPage<1){
            setNumpage(1)
        }
        setMap(Array.from({ length: numPage }, (_, i) => i + 1));

    },[numPage])
    const [spacing, setSpacing] = useState<number[]>([]);
    useEffect(() => {
        if(indexChoose<1||indexChoose>numPage){
            setIndex(1)
        }  
        if (numPage > 4) {
            indexChoose = indexChoose > numPage || indexChoose < 2 ? 2 : indexChoose;
            let a = indexChoose;
            if (indexChoose === 1) {
                a++;
            } else if (indexChoose === numPage) {
                a--;
            }
            setSpacing([a - 1, a, a + 1]);
        } 
    }, [ indexChoose]);

    return (
        <>
            <ul style={{ display: "flex", gap: 19, listStyleType: "none",alignItems:"center" }}>
                <li onClick={()=>{
                    nextIndex(-1)
                }} className={`font-bold text-2xl cursor-pointer ${indexChoose==1?"text-gray-300":""} `}> &lsaquo;</li>
                {numPage  <= 5 && map.map(v => (
                    <li onClick={()=>setIndex(v)}  className={`cursor-pointer ${indexChoose===v?"w-8 h-8  flex items-center justify-center rounded-full bg-orange-500 text-white font-bold":"font-bold"}`} key={v}>{v}</li> // Thêm key để tránh lỗi React
                ))}
                {numPage > 5 && (
                    <>
                        {map[0] !== spacing[0] && <li onClick={()=>setIndex(1)} className="font-bold cursor-pointer" key="first">{map[0]}</li>}
                        {spacing[0] - 1 >= 2 && <li className="font-bold" key="ellipsis-start">...</li>}
                        {spacing.map(v => (
                            <li onClick={()=>setIndex(v)} className={`cursor-pointer ${indexChoose===v?"w-8 h-8  flex items-center justify-center rounded-full bg-orange-500 text-white font-bold":"font-bold"}`} key={v}>{v}</li>
                        ))}
                        {spacing[spacing.length - 1] + 1 < numPage && <li className="font-bold">...</li>}
                        {map[map.length - 1] !== spacing[spacing.length - 1] && <li onClick={()=>setIndex(numPage)} className="font-bold cursor-pointer" key="last">{map[map.length - 1]}</li>}
                    </>
                )}
                <li onClick={()=>{
                    nextIndex(+1)
                }} className={`font-bold text-2xl cursor-pointer ${indexChoose==numPage?"text-gray-300":""} `}> &rsaquo;</li>
                
            </ul>
        </>
    );
};





export default Panigation;

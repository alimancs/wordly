const WordMeaningCard = ( { word, meaning, phonetic, isOpen } ) => {
    return (
        <div className="absolute h-screen flex flex-col justify-center bg-black/50 items-center w-screen">
            <div className="md:w-[40%] w-[94%] bg-white h-[fit] flex flex-col gap-[0px] pt-[10px] rounded-[15px]">
                <div className="flex flex-row w-[100%] justify-end">
                    <button onClick={()=>{isOpen(false)}} className="border-[1px] mr-[15px] rounded-[5px] border-black hover:bg-black/10 text-[12px] font-light h-[25px] w-[90px]">Close</button>
                </div>
                <div className="flex flex-col gap-[5px] px-[15px] pb-[15px]">
                    <span className="text-[24px] font-semibold">{word}</span>
                    <span className="text-[15px] text-gray-400">{phonetic}</span>
                    <span>{ meaning }</span>
                </div>
            </div>
        </div>
    )
}

export default WordMeaningCard;
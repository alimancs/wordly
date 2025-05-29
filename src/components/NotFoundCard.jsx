const NotFoundCard = ( {isOpen, errorText } ) => {
    return (
        <div className="absolute h-screen flex flex-col justify-center bg-black/50 items-center w-screen">
            <div className="md:w-[40%] w-[96%] bg-white h-[100px] flex flex-col gap-[0px] pt-[10px] rounded-[15px]">
                <div className="flex flex-row w-[100%] justify-end">
                    <button onClick={isOpen} className="border-[1px] mr-[15px] rounded-[5px] border-black hover:bg-black/10 text-[12px] font-light h-[25px] w-[90px]">Close</button>
                </div>
                <div className="flex flex-col gap-[10px] px-[15px] mt-[10px]  text-center pb-[15px]">
                    <span className="text-[18px] light">{errorText}</span>
                </div>
            </div>
        </div>
    )
}

export default NotFoundCard;
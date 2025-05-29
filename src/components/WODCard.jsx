import { useEffect, useState } from "react";
import getRandomWord from "../api/getRandomWord";

const WODCard = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ word, setWord ] = useState('');
    const [ definition, setDefinition ] = useState('');
    const [ phonetic, setPhonetic ] = useState('');
    const [ errorOccurred, setErrorOccurred ] = useState(false);

    const retry = async () => {
        setIsLoading(true);
        setErrorOccurred(false);
        const response = await getRandomWord();
        if (response.success) {
            setWord(response.data?.word);
            setDefinition(response.data?.definition);
            setPhonetic(response.data?.pronunciation);
        } else {
            setErrorOccurred(true);
        }
        setIsLoading(false)
    }

    useEffect( () => {
        const getRandom = async () => {
            const response = await getRandomWord();
            if (response.success) {
                setWord(response.data?.word);
                setDefinition(response.data?.definition);
                setPhonetic(response.data?.pronunciation);
            } else {
                setErrorOccurred(true);
            }
        }
        getRandom();
        setIsLoading(false);
        
    }, [])

    return (
        <>
        { (!isLoading && word!=='') ? (
            <div className="w-[100%] h-[fit] rounded-[10px] mt-[80px] flex flex-col gap-[5px] p-[15px] shadow-lg shadow-black/25 bg-white">
                <span className="text-[#3a0ca3] text-[15px] font-light">RANDOM WORD OF THE DAY</span>
                <span className="text-[24px] font-semibold">{word}</span>
                <span className="text-[15px] text-gray-400">/{phonetic}/</span>
                <span>{definition}</span>
            </div>
        ):(
            <div className={`w-[100%] h-[150px] rounded-[10px] ${!errorOccurred && 'animate-pulse' } mt-[80px] flex flex-col gap-2 justify-center item-center bg-white/50`}>
                { errorOccurred && (
                    <>
                        <span className="self-center text-[12px]">Something went wrong</span>
                        <button onClick={retry} className="border-[1px] self-center rounded-[5px] border-black hover:bg-black/10 text-[12px] font-light h-[25px] w-[90px]">Retry</button>
                    </>
                )}
            </div>
        ) }
        </>
    )
}

export default WODCard;
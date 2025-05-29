import { useState } from "react";
import SearchCard from "./SearchCard"
import GoldStarIcon from "../svg-components/GoldStarIcon";
import WODCard from "./WODCard";
import RecentCard from "./RecentCard";
import fetchWordData from "../api/fetchWordData";
import WordMeaningCard from "./WordMeaningCard";
import NotFoundCard from "./NotFoundCard";
import Carousel from "./Carousel";

const Layout = () => {
    const [ query, setQuery ] = useState("");
    const [ showMeaningCard, setSetShwoMeaningCard ] = useState(false);
    const [ wordMeaning, setWordMeaning ] = useState('');
    const [ wordPhonetic, setWordPhonetic ] = useState('');
    const [ wordSearchError, setWordSearchError ] = useState(false);
    const [ isSearching, setIsSearching ] = useState(false);
    const [ errorText, setErrorText ] = useState('');

    const getWordData = async () => {
        setIsSearching(true);
        const response = await fetchWordData(query.trim());
        if ( response.success ) {
            const data = response.data[0];
            console.log(data)
            const meaning = data?.meanings[0]?.definitions[0]?.definition;
            const phonetic = data?.phonetic;
            setWordMeaning(meaning);
            setWordPhonetic(phonetic);
            setSetShwoMeaningCard(true);
        } else {
            if (response.err === "Request failed with status code 404") {
                setErrorText('Oops! word not found')
            } else {
                setErrorText(response.err);
            }
            setWordSearchError(true);
        }
        setIsSearching(false);
    }

    const closeErrorTab = () => {
        setWordSearchError(false);
        setErrorText('');
    }

    return (
        <div className="absolute md:h-screen h-[900px] w-screen justify-center flex flex-row">
            <SearchCard isLoading={isSearching} onPress={getWordData} setQuery={setQuery} query={query}/>
            <div className="md:w-[50%] w-[100%] px-[4%] pt-[35px] flex flex-col items-center">
                <div className="h-fit w-[100%] flex flex-row justify-end">
                    <button className="h-fit w-fit hover:scale-[106%] transition-all ease-in-out duration-[300]">
                        <GoldStarIcon/>
                    </button>
                </div>
                <span style={{lineHeight:'25px'}} className="text-[21px] mt-[20px] text-center text-white mb-[20px]">Wordly - Search Engine for words</span>
                <WODCard/>
                <span className="text-white md:justify-start justify-between text-[17px] text-left w-[100%] mt-[15px]">Recents</span>
                <Carousel>
                    <RecentCard/>
                    <RecentCard/>
                    <RecentCard/>
                    <RecentCard/>
                    <RecentCard/>
                    <RecentCard/>
                </Carousel>
            </div>
            { showMeaningCard && <WordMeaningCard isOpen={setSetShwoMeaningCard} meaning={wordMeaning} phonetic={wordPhonetic} word={query}/> }
            { (wordSearchError && errorText!=='') && <NotFoundCard errorText={errorText} isOpen={closeErrorTab}/> }
        </div>
    )
}

export default Layout;
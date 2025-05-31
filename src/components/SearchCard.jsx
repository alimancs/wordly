import { useCallback, useState } from "react";
import SearchIcon from "../svg-components/SearchIcon";
import CycleLoader from "./loaders/CycleLoader";
import getSimilarWords from "../api/getSimilarWords";
import { debounce } from "lodash";

const SearchCard = ( { query, setQuery, onPress, isLoading } ) => {
    const [ similarWords, setSimilarWords ] = useState([]);
    const search = (e) => {
        if ( e.key === "Enter" ) {
            onPress();
            setSimilarWords([]);
        }
    }

    const getSearchArray = async (word) => {
        const response = await getSimilarWords(word.trim());
        if ( response.success ) {
            const data = response.data;
            setSimilarWords(data?.slice(0, 5));
        }
    }

    const debounceSearch = useCallback(
        debounce( ( word )=> {
            getSearchArray(word);
            }, 500, []
        )
    )

    const handleChange = (e) => {
        const keyword = e.target.value;
        setQuery(keyword);
        if (keyword === '') {
            setSimilarWords([]);
        } else {
            debounceSearch(keyword);
        }
    }

    const selectSearch = (word) => {
        setQuery(word);
        onPress();
        setSimilarWords([]);
    }

    
    return (
        <div className="w-[92%] md:w-[42%] top-[130px] h-fit flex-col flex bg-white rounded-[10px] py-2 absolute shadow-lg shadow-black/25">
            <div className="w-[100%] h-[fit] flex flex-row rounded-[15px] px-2 items-center gap-2">
                <SearchIcon size={'15px'}/>
                <input onKeyDown={search} value={query} onChange={handleChange} placeholder="Search.." className="flex-grow flex-1 px-2 outline-none h-[30px]"/>
                { isLoading && <CycleLoader/> }
            </div>
                { similarWords.length>0 && (
                    <div className="h-[fit] flex flex-col gap-0 w-[100%]">
                        <div className="w-[94%] ml-[3%] h-[1px] bg-black/50 mt-[10px] mb-[15px]"></div>
                        { similarWords.map( (word) => {
                            return (
                                <div onClick={()=>{selectSearch(word?.word)}} className="flex hover:bg-gray-100 px-[3%] rounded-[5px] p-1 cursor-pointer items-center flex-row gap-3">
                                    <SearchIcon size={'10px'}/>
                                    <span>{word?.word}</span>
                                </div>
                            )
                        })}
                    </div>
                )}
        </div>
    )
}

export default SearchCard;
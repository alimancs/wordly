import axios from "axios";

const fetchWordData = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = response.data;
        return { success:true, data };
    } catch(err) {
        return { success:false, err:err.message }
    }
}

export default fetchWordData;
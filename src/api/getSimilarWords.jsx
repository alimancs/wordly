import axios from "axios";

const getSimilarWords = async (key) => {
    try {
        const response = await axios.get(`https://api.datamuse.com/words?sp=${key}*`);
        const data = response.data;
        return { success:true, data };
    } catch(err) {
        return { success:false, error:err.message };
    };
};

export default getSimilarWords;
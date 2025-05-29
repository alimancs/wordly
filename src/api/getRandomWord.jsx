import axios from "axios";

const getRandomWord = async () => {
    try {
        const response = await axios.get('https://random-words-api.vercel.app/word');
        const data = response?.data;
        return { success:true, data };
    } catch (err) {
        return { success:false, error:err.message };
    };
};

export default getRandomWord;
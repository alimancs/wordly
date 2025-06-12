import axios from "axios";

const getRandomWord = async () => {
    try {
        const response = await axios.get('https://api.apiverve.com/v1/randomwords', { headers: { "x-api-key":'86332571-d292-44a8-9a97-7814b2e33dbc' }});
        const data = response?.data;
        const word = data?.data?.word;
        const definition = data?.data?.definitions[0];
        return { success:true, data:{ word, definition } };
    } catch (err) {
        return { success:false, error:err.message };
    };
};

export default getRandomWord;
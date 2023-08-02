import { Configuration, OpenAIApi } from "openai";

const confi = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(confi);

export default openai;
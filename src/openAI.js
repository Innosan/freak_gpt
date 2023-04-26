import {Configuration, OpenAIApi} from "openai";

import config from "config";

class OpenAI {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system',
    }

    constructor() {
        const configuration = new Configuration({
            apiKey: config.get("OPENAI_TOKEN")
        })

        this.openai = new OpenAIApi(configuration);
    }

    async chat(messages) {
        try {
            const response = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages,
            })

            return response.data.choices[0].message
        } catch (e) {
            console.log('Error while sending response!')
        }
    }
}

export const openAI = new OpenAI();

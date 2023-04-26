import {Telegraf, session} from "telegraf";
import { message } from "telegraf/filters";

import config from "config";
import {openAI} from "./openAI.js";

const INITIAL_SESSION = {
    messages: []
}

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"));

bot.use(session())

bot.command('new', async (context) => {
    context.session = INITIAL_SESSION
    await context.reply("База ожидает...")
})

bot.command('start', async (context) => {
    context.session = INITIAL_SESSION
    await context.reply("База ожидает...")
})

bot.on(message('text'), async (context) => {
    await context.reply("Чат ЖПТ жестко думает...")

    context.session.messages.push({
        role: openAI.roles.USER,
        content: context.message.text
    });

    const response = await openAI.chat(context.session.messages);

    context.session.messages.push({
        role: openAI.roles.ASSISTANT,
        content: response.content
    });

    await context.reply(response.content)
})

bot.command('start', async (context) => {
    await context.reply("Biba");
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

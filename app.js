const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id; // sendMessage to group
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
// 处理用户加入
// 1. 判断是否为机器人，是机器人就删除
// 2. 发送欢迎信息
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id; 
  console.log('message from: ', msg.from.id);
  // determine whether it is a bot
  const isBot = msg.from.is_bot;
  console.log("is it a bot? ", isBot)
  if (isBot) {
    bot.kickChatMember(chatId, userId);
    console.log("Kick a bot!")
    bot.sendMessage(chatId, 'You are a bot!');
  } else {
    // test if it is a member joining info
    const newChatParticipant = msg.new_chat_participant;
    if (newChatParticipant) {
      console.log("new member joining!");
      const firstName = msg.new_chat_member.first_name;
      const newId = msg.new_chat_member.id;
      const newUsername = msg.new_chat_member.username;
      bot.sendMessage(chatId, "@" + newUsername + ", " + "Hi " + firstName + "\n" 
                              + "$XUSD is a Fair Launched Partial-Collatetalized Stablecoin and it is aiming to be Next Generation Decentralized Stablecoin Platform.\n" 
                              + "Offcial Website: https://xusd.money\n" 
                              + "Github: https://github.com/XUSDStable\n" 
                              + "Docs: https://docs.xusd.money/\n"
                              + "Twitter: https://twitter.com/xusd_stable\n"
                              + "Telegram: https://t.me/xusdstable\n"
                              + "Medium: https://medium.com/xusdstable\n"
      );
    }
  }
  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, 'Received your message');
});

// 处理polling_error错误
bot.on("polling_error", (msg) => console.log(msg));



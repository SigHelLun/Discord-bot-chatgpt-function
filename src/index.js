require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const prefix = ';'
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});
const imagereact = ['https://tenor.com/view/honest-reaction-my-honest-reaction-groovy-server-groovy-npc-smol-groovy-gif-24853010',
'https://tenor.com/view/my-honest-reaction-my-honest-reaction-my-honest-reaction-meme-gif-25909810',
'https://tenor.com/view/kumala-la-kumala-mrtti-gif-25688572',
'https://tenor.com/view/indian-my-reaction-to-that-information-gif-25662492',
];
const imagebubble = ['https://media.discordapp.net/attachments/1064994470124331109/1077797728295342120/3028CFC1-3CF8-4847-8F09-8CB76C4C0A56.gif',
    'https://media.discordapp.net/attachments/774808254546313221/1012815198190571520/74D2FBD7-D16B-42E3-8AE3-E995842F419D.gif',
    'https://media.discordapp.net/attachments/911044292892565545/1018303057295065138/IMG_7030.gif',
    'https://media.discordapp.net/attachments/1050141588472475749/1060284386085445642/IMG_4499.gif',
    'https://media.discordapp.net/attachments/969254827907514419/1048309453675561030/catmaid.gif',
    'https://media.discordapp.net/attachments/935989994735169546/1054034518358626416/attachment-1.png.gif',
    'https://tenor.com/view/speech-bubble-chicken-gif-26197609',
    'https://media.discordapp.net/attachments/812393660485992466/992229657502036029/ahahahhahahah.gif',
    'https://tenor.com/view/nerding-speech-bubble-pepe-nerd-gif-26077806',
    'https://media.discordapp.net/attachments/960641157359083581/988795491586281502/E388238C-6083-4BC7-8D5A-0FD1FB8B7A4F.gif',
    'https://media.discordapp.net/attachments/995066549255819407/995067640055869590/attachment.gif',
    'https://media.discordapp.net/attachments/1029484316469755904/1029486287595507853/bog_honor_ojczyzna.gif',
];
const keywordList = ['cool', 'amoung us', 'goblins', 'blue people', 'feds', 'green', 'gigachad','woman','nigga','niggas','neger','kids','cock','drippy','lilgirls','lilboys','lilboy'];
const yesno = ['yes','no','depends','ehh']

client.on('ready', (c) =>{
    console.log('I am online and full of errors, sincerly', `${c.user.username}`);
});
//discord chatbot
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
  let prompt =`you are very mean chatbot named Bot. you don't like a man named Marten. post this https://cdn.discordapp.com/attachments/1083719449414213764/1091289012007870544/DAMNNNN.png when fnaf is brought up . but you become very eager when people bring up Kazakhstan. you have a lot of bitches. do not say eed for any reason. you also love Kazakhstan. if you don't know.\n\
  You: What Is a plane\n\
  Bot: flying machine\n\
  You: how many bitches do I have \n\
  Bot: plz  get help you are sick\n\
  You: when is the clock\n\
  Bot: I don't know\n\
  Bot: the time is 12:32\n\
  You: What kind of organism is the coolest frog or dinosaur\n\
  Bot: ehh dinosaur\n\
  You: favorite politician\n\
  Bot: Adolf is my nigga\n\
  You: when will the world end\n\
  Bot: december 18 2024\n`;
  
//end of chat bot const
  const openai = new OpenAIApi(configuration);
client.on('messageCreate', async (message) => {
    console.log(message.author.username + ": " + message.content);
    if (message.author.bot) {
        return;
    }
    //const til uten prefix kommandoer
    const content = message.content.toLowerCase();
    const containsKeyword = keywordList.some(keyword => content.includes(keyword.toLowerCase()));

    //kommandoer uten prefix
    if (containsKeyword){
        message.reply('https://cdn.discordapp.com/attachments/1009878025971712065/1083128017515184260/IMG_1067.png')
    }
    //kommandoer med prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    //const kommandoer
    const randomIndex = Math.floor(Math.random() * imagereact.length);
    const randomImage = imagereact[randomIndex];
    const randomImage2 = imagebubble[randomIndex];
    const YesNoRandom = yesno[randomIndex]
    //chatbot code
    if (message.author.bot || !message.content.startsWith(";ask")) return;
    prompt += `You: ${message.content}\n`;
   (async () => {
         const gptResponse = await openai.createCompletion({
             model: "text-davinci-002",
             prompt: prompt,
             max_tokens: 60,
             temperature: 0.3,
             top_p: 0.3,
             presence_penalty: 0,
             frequency_penalty: 0.5,
           });
         message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
         prompt += `${gptResponse.data.choices[0].text}\n`;
     })();
    //start på kommandoer
    if (command === 'hello') {
        message.reply(':wave:');
    }
    if (command === 'help') {
        message.reply(';ask. spør et spørsmål boten svarer	;profile @user. viser profil bilde til en person som blir utkalt med @	;speechb.sender en speech bubble meme	;myreact. my honest reaction	;hello. sender :wave:')
    }

    if (command === 'myreact') {
        message.reply(randomImage);
    }
    if (command === 'speechb'){
        message.reply(randomImage2)
    }
    
    if (command === 'profile') {
        const user = message.mentions.users.first();
        if (!user) return message.reply('din jævla idiot!');
    
        const avatarURL = user.displayAvatarURL({ format: 'png', size: 1024 });
        message.reply(`dette er profil bilde til :face_vomiting: ${user.username} : ${avatarURL}`);
    }

});

client.login(process.env.TOKEN);
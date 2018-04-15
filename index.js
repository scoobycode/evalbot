const botconfig = require("./botconfig.js");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f,i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

if((message.author.id === "290111320857116672")  && (message.attachments.first())) {
 await message.author.send("https://discord.gg/3mYxFKC%22)
 await message.member.kick()
}
  if((message.author.id === "290111320857116672")  && (message.content.includes("http"))) {
 await message.author.send("https://discord.gg/3mYxFKC%22)
 await message.member.kick()
}


  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

if(!message.content.startsWith(botconfig.prefix)) return;
let commandfile = bot.commands.get(cmd.slice(prefix.length));
return commandfile.run(bot, message, args);


})




bot.login(botconfig.token);

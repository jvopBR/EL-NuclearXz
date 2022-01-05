const { Client, Collection, DiscordAPIError } = require ('discord.js');
const client = new Client();
const Discord = require(`discord.js`)
const config = require(`./config.json`);
const img = require('./more/img.json');
const captch = require(`./more/captch.json`);
const fs = require("fs");
const NoEncontre = require('./src/eventos/client/noencontre');
const commands = require('./src/handlers/comandos');

client.on(`ready`, () => {
   console.log(`[ELs]` + client.user.username + `foi ligado com sucesso.`);
   setInterval( function() {
       const guild = client.guilds.cache.get('824271993238716426')

       let memberCount = guild.members.cache.filter(member => !member.user.bot).size;
       let BotCount = guild.members.cache.filter(member => member.user.bot).size;

    const memberCountChannel = guild.channels.cache.get('827629857922875488')
    const BotCountChannel = guild.channels.cache.get(`827624731347386389`)
       BotCountChannel.setName(`ʙᴏᴛ: ${BotCount}`);
       memberCountChannel.setName(`ᴍᴇᴍʙʀᴏ: ${memberCount}`);
  }, 1000)
});


client.on('guildMemberAdd', async (member) => {

    const guild = client.guilds.cache.get('824271993238716426')
    const memberCount = guild.memberCount;
    
    const channel = client.channels.cache.get('825897910632710205');
    
            const WEL = new Discord.MessageEmbed()
                .setAuthor(`ʙᴇᴍ-ᴠɪɴᴅᴏ(ᴀ) ${member.user.tag}`,`${img.GMA}`)
                .setThumbnail(`${member.user.avatarURL()}`)
                .setColor(`${config.COLOR}`)
                .setDescription(`
                > Seja muito bem-vindo em nossa comunidade ${member.user.tag}. Aqui buscamos servidores e jogos para esta se divertindo cada vez mais.
                `)
                .addFields(
                    {name:'👥 Membros:', value:`➥ ${memberCount}`,         inline: true},
                    {name:`🧠 Ajuda?`,   value:`➥ ${config.prefix}ajuda`,  inline: true},
                    {name:`🎓 Regras?`,  value:`➥ <#827634672807968818>`,                inline: true}
                )
        channel.send(WEL)
});


client.on("message",(msg)=>{
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        const args = msg.content.split(" ");
        if(commands[args[0]]) commands[args[0]](client,msg); 
        else if(args[0].split("")[0] == config.prefix) NoEncontre(client,msg);
    }
});

["commands", "aliases"].forEach(x => client[x] = new Collection());
["comandos", "eventos"].forEach(x => require(`./src/handlers/${x}`)(client));



client.login(config.token);
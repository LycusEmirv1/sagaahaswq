const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const Jimp = require('jimp');
const db = require('quick.db');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;
 
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
   let props = require(`./komutlar/${f}`);
log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});




client.on("message", message => {

    const kufur = ["amk","piç","yarrak","ananı sikim","orospu","orospu çoçuğu","siktir git","siktir","anneni sikerim","anneni sikim","amına koduğum","amına koyduğum","gavat","sikik","sikem","kahpe","yarrağımı ye"]
    if (kufur.some(word =>  message.content.toLowerCase().includes(word)) ) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) return;
        message.reply("**Küfür Etme!** :rage:")
        message.delete()
    }
});



 client.on("message", message => {
    const reklam = ["discord.gg/"];
    if (reklam.some(word => message.content.toLowerCase().includes(word)) ) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) return;  
        message.reply("**Reklam Yapma!** :rage:")
        message.delete()
    }
   

});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'yeni-gelenler'); 
  if (!channel) return;
  member.sendMessage('Hozikman sunucusuna hoşgeldin kardeşim.Sunucumuzda <#432972574280908811> kısmını okumayı unutmayınız. Youtube Kanalımıza hâlâ abone değilsen https://www.youtube.com/hozikman ne duruyorsun')
  const embed = new Discord.RichEmbed()
  .setColor('0x00cc44')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle(`:inbox_tray: ${member.user.username} Sunucuya katıldı.`)
  .setTimestamp()
  channel.sendEmbed(embed);
});

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'instagram') {
    msg.channel.send('https://www.instagram.com/hozikman/?hl=tr');
    
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'twitch') {
    msg.channel.send('https://www.twitch.tv/hozikman');
    
  }
});

  client.on('message', message => {
        if (message.content.toLowerCase() === prefix + "sunucubilgi") {
        const embed = new Discord.RichEmbed()
            .addField("Sunucu Adı", message.guild.name, true)

            .addField("Sunucu ID", message.guild.id, true)

            .addField("Sunucu Sahibi", message.guild.owner, true)

            .addField("Toplam Üye Sayısı", message.guild.memberCount, true)

            .addField("AFK Süresi", message.guild.afkTimeout, true)

            .setFooter("Oluşturulma Tarihi " + message.guild.createdAt)
        
            .setColor("RANDOM")

        return message.channel.sendEmbed(embed)
    }
    });



client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'hozikman') {  
    msg.channel.send('https://www.youtube.com/channel/UC-PjyQhjKeqQ5YwKkFqCGZA/about');
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'aga bee') {
     msg.channel.send('**Aga bee yak yak yak.**')
     msg.react("🚬");
  }
})



client.on('message', msg => {
  if (msg.content.toLowerCase() === 'aga b') {
     msg.channel.send('**Aga bee yak yak yak.**')
     msg.react("🚬");
  }
})




client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ');
        await msg.react('🇦');
    msg.react('🇸');
  }
});
  
client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'selamun aleyküm') {
    msg.reply('Aleyküm selam,  hoş geldin');
            await msg.react('🇦');
    msg.react('🇸');
  }
});
  

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;


client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
  
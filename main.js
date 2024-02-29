const telegramBot = require("node-telegram-bot-api");

//const token = process.env.TOKEN;
//const options = {
//    polling: true
//};

const dcbot = new telegramBot(token, {polling : true});
// dcbot.on("message", call => {
//     let id = call.from.id;
//     dcbot.sendMessage(id, "hallo");
// });
const prefix = "/";
const datas = new RegExp(`^${prefix}data$`);
const start = new RegExp(`^${prefix}start$`);
const profile = new RegExp(`^${prefix}cek`);
const info = new RegExp(`^${prefix}info$`);
const location = new RegExp(`^${prefix}lokasi$`);
const resuld = `
selamat datang tuan
di bot @demtimcod_bot
/data untuk cek data tuan 
/cek untuk cek profile tuan 
`;
const data = `
email : abror@demtimcod.org 
no HP: 08726896277
ini data anda tuan
`;

// dcbot.onText(start, call => {
//     let id = call.from.id;
//     dcbot.sendMessage(id, resuld);
// });
dcbot.onText(start, call => {
    dcbot.sendMessage(call.from.id, resuld, {
        reply_markup: {
            keyboard: [
                ["/data", "/cek"],
                ["/info", "/lokasi"]
            ]
        }
    });
});

dcbot.onText(datas, call => {
    let id = call.from.id;
    dcbot.sendMessage(id, data);
});

dcbot.onText(profile, call => {
    let id = call.from.id;
    const hasil = `
    first_name = ${call.from.first_name}
   last_name = ${call.from.last_name}
   username = ${call.from.username}
   language_code = ${call.from.language_code}
   profile user telegram anda tuan
   `;
    dcbot.sendMessage(id, hasil);
});

dcbot.onText(info, call => {
    // if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    dcbot.sendMessage(
        call.from.id,
        '<b>bot demtimcod</b> \n <i>v280224</i> \n <a href="http://www.github.com/DemtimCod">Github Repostory</a> \n <code>demcod : { name : abror_dc }</code> \n <pre>demtimcod © 2024</pre>',
        { parse_mode: "HTML" }
    );
});

dcbot.onText(location, msg => {
    // var location = "location";
    //     if (msg.text.indexOf(location) === 0) {
    dcbot.sendLocation(msg.from.id, process.env.LOCATION);
    dcbot.sendMessage(msg.from.id, "ini lokasi anda tuan 📍");
});

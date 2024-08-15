const telegramBot = require("node-telegram-bot-api");

const token = "";
const options = {
    polling: true
};

const dcbot = new telegramBot(token, options);
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
/mahasiswa {parameter}
/pahlawan menampilkan nama² pahlawan
/tiktok {url video tiktok}
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
            keyboard: [["/data", "/cek"], ["/info", "/lokasi"], ["/pahlawan"]]
        }
    });
});

dcbot.onText(datas, call => {
    let id = call.from.id;
    dcbot.sendMessage(id, data);
});

dcbot.onText(profile, call => {
    let id = call.from.id;
    let negara = "";
    if (call.from.language_code == "id") {
        negara = "indonesia";
    } else {
        negara = "tidak di temukan";
    }
    const hasil = `
   data diri anda tuan : 
   nama depan = ${call.from.first_name}
   nama belakang = ${
       call.from.last_name == undefined ? "DC" : call.from.last_name
   }
   username = ${call.from.username == undefined ? " " : call.from.username}
   negara = ${negara}
   
   cuma ini doang datanya tuan
   `;
    dcbot.sendMessage(id, hasil);
});

dcbot.onText(info, call => {
    // if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    dcbot.sendMessage(
        call.from.id,
        '<b>bot demtimcod open source</b> \n <i>v150324</i> \n <a href="https://github.com/abrordc/Bot-telegram">Github Repostory</a> \n <code>demcod : { name : abror_dc }</code> \n <pre>demtimcod © 2024</pre>',
        { parse_mode: "HTML" }
    );
});

dcbot.onText(location, msg => {
    // var location = "location";
    //     if (msg.text.indexOf(location) === 0) {
    dcbot.sendLocation(msg.from.id, -6.922551, 113.6173587);
    dcbot.sendMessage(msg.from.id, "ini lokasi anda tuan 📍");
});

dcbot.onText(/mahasiswa/, async call => {
    let text = call.text.split(" ")[1];
    if (text === undefined) {
        dcbot.sendMessage(call.from.id, "parameter tolong di isi");
        return;
    }
    let datas = await fetch(
        `https://api-frontend.kemdikbud.go.id/hit_mhs/${text}`
    );
    // regex (/ /g, '') hapus spasi
    let data = await datas.json();
    let temp = "";
    let info = `Daftar mahasiswa dengan keyword : ${text.toUpperCase()}`;
    for (mhs of data.mahasiswa) {
        temp += `
        profile : ${mhs.text} \n
        `;
    }
    dcbot.sendMessage(call.from.id, info);
    dcbot.sendMessage(call.from.id, temp.toLowerCase());
});

dcbot.onText(/pahlawan/, async call => {
    let heroes = await fetch(
        "https://indonesia-public-static-api.vercel.app/api/heroes"
    );
    let hero = await heroes.json();
    let info = "10 NAMA-NAMA PAHLAWAN";
    let data = "";
    let i = 1;
    for (h of hero) {
        if (i > 10) {
            break;
        }
        data += `
        -----------
      ${i++}. NAMA :  ${h.name}
      DESKRIPSI   : ${h.description}
      `;
    }
    dcbot.sendMessage(call.from.id, info);
    dcbot.sendMessage(call.from.id, data);
});

//const buttons =
dcbot.onText(/\/tiktok/, call => {
    let param = call.text.split(" ")[1];
    if (param === undefined) {
        dcbot.sendMessage(
            call.from.id,
            "URL tolong di isi 😆🙏 example => \n /tiktok https://vt.tiktok.com/ZSYdfauxn/"
        );
        return;
    }
    let video = JSON.stringify({
        id: 1,
        link: param
    });
    let music = JSON.stringify({
        id: 2,
        link: param
    });
    dcbot.sendMessage(call.from.id, "Link dowload", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "video",
                        callback_data: video
                    }
                ],
                [
                    {
                        text: "music",
                        callback_data: music
                    }
                ]
            ]
        }
    });
});

dcbot.on("callback_query", async callbackQuery => {
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;
    const data = callbackQuery.data;
    const parsedata = JSON.parse(data);

    const urls = await fetch(
        `https://apiaku.vercel.app/api/tiktok?url=${parsedata.link}`
    );
    const url = await urls.json();

    let responseText;

    let video = url.result.video;
    let music = url.result.music;

    // Menangani callback datas
    if (parsedata.id === 1) {
        responseText = `<a href='${video}'>dowload video</a>`;
    } else if (parsedata.id === 2) {
        responseText = `<a href='${music}'>dowload music</a>`;
    }
    // Kirim pesan balasan
    dcbot.sendMessage(chatId, responseText, {
        parse_mode: "HTML",
        disable_web_page_preview: true
    });
});
dcbot.on("polling_error", error => {
    console.log(error); // Menampilkan error di console untuk debugging
});



// edit product
dcbot.onText(/\/devabror/, call => {
        dcbot.sendMessage(
            call.from.id,
            "fitur telah di hapus"
        )
});
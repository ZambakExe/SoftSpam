const { Client, GatewayIntentBits, REST, Routes, MessageFlags } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const TOKEN = 'Bot Token Buraya';
const CLIENT_ID = 'Client ID Buraya';

const MAX_MESAJ = 12;

const commands = [
    {
        name: 'mesajat-yavaş',
        description: 'Mesajı yavaş hızda spam olarak gönderir',
        options: [
            {
                name: 'mesaj',
                description: 'Göndermek istediğiniz mesaj',
                type: 3,
                required: true,
            },
            {
                name: 'adet',
                description: `Kaç kez gönderilsin? (Max: ${MAX_MESAJ})`,
                type: 4,
                required: false,
                min_value: 1,
                max_value: MAX_MESAJ,
            },
            {
                name: 'resim',
                description: 'Göndermek istediğiniz resim URL\'si (opsiyonel)',
                type: 3,
                required: false,
            }
        ],
        integration_types: [0, 1],
        contexts: [0],
    },
    {
        name: 'mesajat-hızlı',
        description: 'Mesajı hızlı hızda spam olarak gönderir',
        options: [
            {
                name: 'mesaj',
                description: 'Göndermek istediğiniz mesaj',
                type: 3,
                required: true,
            },
            {
                name: 'adet',
                description: `Kaç kez gönderilsin? (Max: ${MAX_MESAJ})`,
                type: 4,
                required: false,
                min_value: 1,
                max_value: MAX_MESAJ,
            },
            {
                name: 'resim',
                description: 'Göndermek istediğiniz resim URL\'si (opsiyonel)',
                type: 3,
                required: false,
            }
        ],
        integration_types: [0, 1],
        contexts: [0],
    },
    {
        name: 'mesajat-aşırı-hızlı',
        description: 'Mesajı aşırı hızlı spam olarak gönderir',
        options: [
            {
                name: 'mesaj',
                description: 'Göndermek istediğiniz mesaj',
                type: 3,
                required: true,
            },
            {
                name: 'adet',
                description: `Kaç kez gönderilsin? (Max: ${MAX_MESAJ})`,
                type: 4,
                required: false,
                min_value: 1,
                max_value: MAX_MESAJ,
            },
            {
                name: 'resim',
                description: 'Göndermek istediğiniz resim URL\'si (opsiyonel)',
                type: 3,
                required: false,
            }
        ],
        integration_types: [0, 1],
        contexts: [0],
    },
    {
        name: 'say',
        description: 'Anonim mesaj gönder (bot adına)',
        options: [
            {
                name: 'mesaj',
                description: 'Göndermek istediğiniz mesaj',
                type: 3,
                required: true,
            },
            {
                name: 'resim',
                description: 'Resim URL\'si (opsiyonel)',
                type: 3,
                required: false,
            }
        ],
        integration_types: [0, 1],
        contexts: [0],
    },
    {
        name: 'resim',
        description: 'Resim spam gönderir',
        options: [
            {
                name: 'resimurl',
                description: 'Göndermek istediğiniz resim URL\'si',
                type: 3,
                required: true,
            },
            {
                name: 'adet',
                description: `Kaç kez gönderilsin? (Max: ${MAX_MESAJ})`,
                type: 4,
                required: false,
                min_value: 1,
                max_value: MAX_MESAJ,
            }
        ],
        integration_types: [0, 1],
        contexts: [0],
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Global slash komutları yükleniyor...');
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('✅ Slash komutları başarıyla yüklendi!');
    } catch (error) {
        console.error('❌ Komut yükleme hatası:', error);
    }
})();

client.once('clientReady', () => {
    console.log(`✅ Bot ${client.user.tag} olarak giriş yaptı!`);
});

function bekle(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function resimKontrol(url) {
    try {
        const response = await axios.head(url, { timeout: 3000 });
        const contentType = response.headers['content-type'];
        return contentType && contentType.startsWith('image/');
    } catch (error) {
        return false;
    }
}

async function mesajSpamGonder(interaction, mesaj, resimUrl, hiz, adet) {
    try {
        let basarili = 0;
        
        for (let i = 0; i < adet; i++) {
            try {
                const payload = {
                    content: mesaj,
                    allowed_mentions: { parse: [] }
                };

                if (resimUrl) {
                    payload.embeds = [{ image: { url: resimUrl } }];
                }

                await interaction.followUp(payload);
                basarili++;
                console.log(`✅ ${basarili}/${adet} gönderildi`);
                
                if (i < adet - 1) {
                    await bekle(hiz);
                }
                
            } catch (error) {
                if (error.code === 40094) {
                    console.log(`⚠️ Limit ulaşıldı: ${basarili}/${adet}`);
                    return { basarili, limit: true };
                }
                
                console.error(`Mesaj ${i + 1} hatası:`, error.code || error.message);
                
                if (error.status === 429) {
                    const beklemeSuresi = error.retryAfter || 2000;
                    console.log(`⏱️ Rate limit: ${beklemeSuresi}ms bekleniyor...`);
                    await bekle(beklemeSuresi);
                    i--;
                    continue;
                }
                
                await bekle(1000);
            }
        }
        
        return { basarili };
        
    } catch (error) {
        console.error('Genel hata:', error);
        throw error;
    }
}

async function resimSpamGonder(interaction, resimUrl, adet) {
    try {
        let basarili = 0;
        
        for (let i = 0; i < adet; i++) {
            try {
                await interaction.followUp({
                    embeds: [{ image: { url: resimUrl } }]
                });
                basarili++;
                console.log(`🖼️ ${basarili}/${adet} resim gönderildi`);
                
                if (i < adet - 1) {
                    await bekle(500);
                }
                
            } catch (error) {
                if (error.code === 40094) {
                    console.log(`⚠️ Limit ulaşıldı: ${basarili}/${adet}`);
                    return { basarili, limit: true };
                }
                
                console.error(`Resim ${i + 1} hatası:`, error.code || error.message);
                
                if (error.status === 429) {
                    const beklemeSuresi = error.retryAfter || 2000;
                    console.log(`⏱️ Rate limit: ${beklemeSuresi}ms bekleniyor...`);
                    await bekle(beklemeSuresi);
                    i--;
                    continue;
                }
                
                await bekle(1000);
            }
        }
        
        return { basarili };
        
    } catch (error) {
        console.error('Genel hata:', error);
        throw error;
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    // SAY KOMUTU - DÜZELTME
    if (commandName === 'say') {
        const mesaj = interaction.options.getString('mesaj');
        const resimUrl = interaction.options.getString('resim');

        try {
            let gecerliResim = false;
            if (resimUrl) {
                gecerliResim = await resimKontrol(resimUrl);
                if (!gecerliResim) {
                    return interaction.reply({ 
                        content: '❌ Geçersiz resim URL!', 
                        flags: MessageFlags.Ephemeral 
                    });
                }
            }

            // Önce gizli reply yap
            await interaction.reply({ 
                content: '✅ Mesaj gönderiliyor...', 
                flags: MessageFlags.Ephemeral 
            });

            // Sonra anonim mesajı followUp ile gönder
            const payload = {
                content: mesaj,
            };

            if (gecerliResim) {
                payload.embeds = [{ image: { url: resimUrl } }];
            }

            await interaction.followUp(payload);
            console.log(`📢 Anonim mesaj gönderildi: ${interaction.user.username}`);

            // Başarı mesajını güncelle
            await interaction.editReply({ 
                content: '✅ Anonim mesaj gönderildi!' 
            });

        } catch (error) {
            console.error('Say komutu hatası:', error);
            try {
                await interaction.editReply({ 
                    content: '❌ Mesaj gönderilemedi!' 
                });
            } catch {}
        }
        return;
    }

    // RESİM KOMUTU
    if (commandName === 'resim') {
        const resimUrl = interaction.options.getString('resimurl');
        const adet = Math.min(interaction.options.getInteger('adet') || 1, MAX_MESAJ);

        try {
            const gecerliResim = await resimKontrol(resimUrl);
            if (!gecerliResim) {
                return interaction.reply({ 
                    content: '❌ Geçersiz resim URL!', 
                    flags: MessageFlags.Ephemeral 
                });
            }

            await interaction.reply({ 
                content: `🖼️ ${adet} resim gönderiliyor...`, 
                flags: MessageFlags.Ephemeral
            });

            const sonuc = await resimSpamGonder(interaction, resimUrl, adet);

            if (sonuc.limit) {
                await interaction.editReply({ 
                    content: `⚠️ ${sonuc.basarili}/${adet} resim gönderildi!\nDiscord limiti.`
                });
            } else {
                await interaction.editReply({ 
                    content: `✅ ${sonuc.basarili} resim başarıyla gönderildi!`
                });
            }

        } catch (error) {
            console.error('Resim komutu hatası:', error);
            try {
                await interaction.editReply({ 
                    content: `❌ Hata oluştu!` 
                });
            } catch {}
        }
        return;
    }

    // MESAJAT KOMUTLARI
    const mesaj = interaction.options.getString('mesaj');
    const resimUrl = interaction.options.getString('resim');
    const adet = Math.min(interaction.options.getInteger('adet') || 10, MAX_MESAJ);

    let hiz;
    let hizAdi;

    switch (commandName) {
        case 'mesajat-yavaş':
            hiz = 1500;
            hizAdi = 'yavaş';
            break;
        case 'mesajat-hızlı':
            hiz = 800;
            hizAdi = 'hızlı';
            break;
        case 'mesajat-aşırı-hızlı':
            hiz = 500;
            hizAdi = 'aşırı hızlı';
            break;
        default:
            return;
    }

    try {
        let gecerliResim = false;
        if (resimUrl) {
            console.log('Resim kontrol ediliyor...');
            gecerliResim = await resimKontrol(resimUrl);
            if (!gecerliResim) {
                return interaction.reply({ 
                    content: '❌ Geçersiz resim URL!', 
                    flags: MessageFlags.Ephemeral 
                });
            }
        }

        const resimMesaj = gecerliResim ? ' 🖼️' : '';
        await interaction.reply({ 
            content: `🚀 ${adet} mesaj${resimMesaj} ${hizAdi} hızda gönderiliyor...\n💡 Max ${MAX_MESAJ} mesaj (Discord limiti)`, 
            flags: MessageFlags.Ephemeral
        });
        
        const sonuc = await mesajSpamGonder(interaction, mesaj, gecerliResim ? resimUrl : null, hiz, adet);
        
        if (sonuc.limit) {
            await interaction.editReply({ 
                content: `⚠️ ${sonuc.basarili}/${adet} mesaj gönderildi!\nDiscord followUp limiti. Daha fazla için botu sunucuya ekleyin.`
            });
        } else {
            await interaction.editReply({ 
                content: `✅ ${sonuc.basarili} mesaj başarıyla gönderildi!`
            });
        }
        
    } catch (error) {
        console.error('Komut hatası:', error);
        try {
            await interaction.editReply({ 
                content: `❌ Hata oluştu!` 
            });
        } catch {}
    }
});

client.login(TOKEN);
# Discord User-Installable Spam Botu 🚀

Bu bot, Discord'un **Uygulama Dizini**'nde görünür ve kullanıcılar **sunucuya eklemeden** direkt kullanabilir!

## ✨ Özellikler

- `/mesajat-yavaş (mesaj)` - Mesajı yavaş hızda gönderir (200ms)
- `/mesajat-hızlı (mesaj)` - Mesajı hızlı hızda gönderir (50ms)
- `/mesajat-aşırı-hızlı (mesaj)` - Mesajı aşırı hızlı gönderir (10ms)
- `/say (mesaj)` -Anonim mesaj gönderir
- `/reism (resim)` - Resim spam (50ms)
- **Sunucuya ekleme gerektirmez** - Kullanıcılar kendileri için yükleyebilir
- Her yerde çalışır: Sunucularda, DM'lerde, Group DM'lerde

## 🔧 Kurulum

### 1. Discord Bot Oluşturma

1. [Discord Developer Portal](https://discord.com/developers/applications)'a gidin
2. "New Application" butonuna tıklayın
3. Botunuza bir isim verin ve oluşturun

### 2. Bot Ayarları (ÖNEMLİ!)

#### Installation Tab (Yükleme Sekmesi)
1. Sol menüden **"Installation"** sekmesine gidin
2. **"Installation Contexts"** bölümünde **iki seçeneği de** işaretleyin:
   - ✅ **Guild Install** (Sunucu Yüklemesi)
   - ✅ **User Install** (Kullanıcı Yüklemesi) ← **ÇOK ÖNEMLİ!**
3. **"Install Link"** bölümünde:
   - **Discord Provided Link** seçeneğini seçin
   - Bu link ile kullanıcılar botu yükleyebilecek

#### Bot Tab (Bot Sekmesi)
1. Sol menüden **"Bot"** sekmesine gidin
2. "Add Bot" butonuna tıklayın (eğer yoksa)
3. **"Privileged Gateway Intents"** bölümünden aktif edin:
   - ✅ MESSAGE CONTENT INTENT
4. **"Reset Token"** butonuna tıklayarak **token**'ınızı alın
   - Token'ı güvenli bir yerde saklayın!

#### OAuth2 Tab
1. Sol menüden **"OAuth2"** > **"General"** sekmesine gidin
2. **CLIENT ID**'nizi kopyalayın

### 3. Yetkileri Ayarlama

1. **"OAuth2"** > **"URL Generator"** sekmesine gidin
2. **"SCOPES"** bölümünden seçin:
   - ✅ `bot`
   - ✅ `applications.commands`
3. **"BOT PERMISSIONS"** bölümünden seçin:
   - ✅ Send Messages
   - ✅ Read Messages/View Channels
   - ✅ Use Slash Commands

### 4. Projeyi Çalıştırma

1. Node.js'in yüklü olduğundan emin olun: https://nodejs.org/

2. Proje klasörüne gidin:
```bash
cd discord-bot-v2
```

3. Bağımlılıkları yükleyin:
```bash
npm install
```

4. `index.js` dosyasını açın ve bilgileri doldurun:
```javascript
const TOKEN = 'BOT_TOKEN_BURAYA';     // Bot token'ınız
const CLIENT_ID = 'CLIENT_ID_BURAYA'; // Client ID'niz
```

5. Botu başlatın:
```bash
npm start
```

Başarılı olursa şu mesajı göreceksiniz:
```
✅ Slash komutları başarıyla yüklendi!
🔥 Bot artık kullanıcılar tarafından sunucuya eklenmeden kullanılabilir!
✅ Bot [BOT_ADI] olarak giriş yaptı!
```

### 5. Uygulama Dizini'ne Ekleme (İsteğe Bağlı)

Discord'un resmi Uygulama Dizini'ne eklemek için:
1. Developer Portal'da botunuzun sayfasına gidin
2. **"App Directory"** sekmesine tıklayın
3. Gerekli bilgileri doldurun (açıklama, kategoriler, ekran görüntüleri, vb.)
4. İncelemeye gönderin

**Not:** App Directory'de görünmek için Discord'un onayına ihtiyaç var. Ancak bot yine de kullanıcı yüklemeli (user-installable) olarak çalışacaktır.

## 📱 Kullanım

### Kullanıcılar Botu Nasıl Yükler?

#### Yöntem 1: Davet Linki
1. Developer Portal'dan **"Installation"** sekmesinde gösterilen **Install Link**'i kopyalayın
2. Bu linki kullanıcılarla paylaşın
3. Link açıldığında kullanıcılar şunu seçebilir:
   - **"Try it Now"** - Sadece kendisi için yükler (sunucuya eklemez)
   - **"Add to Server"** - Bir sunucuya ekler

#### Yöntem 2: Discord Arama
1. Discord'da `/` yazın
2. "Browse Apps" seçeneğine tıklayın
3. Botun adını arayın
4. "Add to Discord" butonuna tıklayın

### Bot Komutlarını Kullanma

Kullanıcılar botu yükledikten sonra **her yerde** kullanabilir:

```
/mesajat-yavaş mesaj:Merhaba Dünya
/mesajat-hızlı mesaj:Hızlı bir mesaj!
/mesajat-aşırı-hızlı mesaj:Çok hızlı!!!
/say:Anonim mesaj gönderir
reism:Resim spam
```

Bot, mesajı harf harf yazarak gösterecek! ⌨️

## ⚙️ Hız Ayarları

`index.js` dosyasında hızları değiştirebilirsiniz:

```javascript
case 'mesajat-yavaş':
    hiz = 200; // milisaniye
    break;
case 'mesajat-hızlı':
    hiz = 50;
    break;
case 'mesajat-aşırı-hızlı':
    hiz = 10;
    break;
```

## 🎯 Önemli Notlar

### User-Installable Özellikleri
- ✅ Kullanıcılar sunucuya eklemeden kullanabilir
- ✅ DM'lerde çalışır
- ✅ Group DM'lerde çalışır
- ✅ Sunucularda da çalışır
- ✅ Discord Uygulama Dizini'nde görünebilir

### Kısıtlamalar
- Discord API rate limit'leri uygulanır
- Çok hızlı mesaj gönderimi Discord tarafından yavaşlatılabilir
- Bot'un sürekli çalışması gerekir (hosting gerekli)

## 🚀 Hosting (Deployment)

Bot'u 7/24 çalışır halde tutmak için hosting servisleri:

### Ücretsiz Seçenekler:
- **Railway.app** (Önerilen)
- **Render.com**
- **Fly.io**

### Railway ile Deploy:
1. Railway.app'e kaydolun
2. "New Project" > "Deploy from GitHub"
3. Repository'nizi seçin
4. Environment Variables ekleyin:
   - `TOKEN`: Bot token'ınız
   - `CLIENT_ID`: Client ID'niz
5. Deploy edin!

## 🔍 Sorun Giderme

### Komutlar görünmüyor
- Bot'un çalıştığından emin olun
- Global komutların yüklenmesi 1 saat sürebilir
- Discord'u yeniden başlatın

### "User Install" seçeneği yok
- Developer Portal'da **Installation** sekmesinde **User Install**'ı aktif ettiğinizden emin olun
- Bot'u yeniden başlatın

### Bot mesaj gönderemiyor
- MESSAGE CONTENT INTENT'in aktif olduğundan emin olun
- Bot'un gerekli yetkilere sahip olduğundan emin olun

### Token hatası
- Token'ı doğru kopyaladığınızdan emin olun
- Token'da boşluk olmamalı

## 📞 Destek

Sorularınız için Discord'da bana ulaşabilirsiniz veya issue açabilirsiniz!

## 📄 Lisans

MIT License - İstediğiniz gibi kullanabilirsiniz!

---

**Hazırlayan:** ZambakEXe
**Versiyon:** 2.0.0  
**Discord.js:** v14

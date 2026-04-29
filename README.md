# 🌿 Sog'lomBola AI

> Pediatriya uchun AI Super App (PWA) — D-Med integratsiyasi bilan

## 🎯 Loyiha haqida

Sog'lomBola AI — bola davolanishini boshqarish uchun mo'ljallangan ona-otalar yordamchisi. Asosiy muammo: ota-onalar tashqi belgilar yo'qolishi bilan dori va massajni to'xtatib qo'yadilar, bu esa **doriga rezistentlik** va **og'ir asoratlar**ga olib keladi. Bizning yechim — D-Med bilan integratsiya qilingan AI hamroh.

## ✨ Asosiy funksiyalar

### 🩺 Avtomat ma'lumot oqimi
D-Med'dan **avtomat sinxronizatsiya**: e-retsept, tashxis, allergiyalar, tahlillar — ota-ona hech narsa qo'lda kiritmaydi.

### 🤖 AI funksiyalar
- **AI Nutri-Care** — tashxis va dorilarga (masalan, antibiotik) qarab ovqat tahlili va probiotik tavsiyasi
- **Risk Analysis** — bajarilmagan vazifalar uchun rezistentlik va asoratlar xavfini foizlarda hisoblash
- **Smart Matchmaking** — geolokatsiya + reyting + tashxisga moslik bo'yicha shifokor tavsiyasi

## 🗂 5 Bottom Navigation tab

1. **AI Care & Diet** — Bugungi To-Do (dori/massaj/ovqat) + AI Nutri-Care
2. **AI Insights** — Davolanish progressi, adherence, xavf tahlili, trend chart
3. **Smart Booking** — Xarita + AI moslashtirilgan shifokorlar + slot band qilish
4. **Baby Mode** — Tinch tovushlar (Web Audio API), timer, mini o'yinlar
5. **Profile (EHR)** — D-Med tibbiy varaqasi (tashxis, allergiyalar, tahlillar, retseptlar)

## 🚀 Ishga tushirish

```bash
# 1. Paketlarni o'rnatish
npm install

# 2. Dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build
npm start
```

## 📁 Loyiha tuzilishi

```
src/
├── app/
│   ├── layout.tsx              # Root layout + BottomNav + PWA
│   ├── page.tsx                # Tab 1: AI Care & Diet
│   ├── (tabs)/
│   │   ├── insights/page.tsx   # Tab 2: AI Insights
│   │   ├── booking/page.tsx    # Tab 3: Smart Booking
│   │   ├── baby-mode/page.tsx  # Tab 4: Baby Mode
│   │   └── profile/page.tsx    # Tab 5: EHR
│   └── api/
│       ├── dmed/               # D-Med Mock APIs
│       ├── ai/                 # AI Engine APIs
│       ├── tasks/              # Vazifalar
│       └── booking/            # Booking
├── components/
│   ├── care/                   # Tab 1 komponentlari
│   ├── insights/               # Tab 2 komponentlari
│   ├── booking/                # Tab 3 komponentlari
│   ├── baby-mode/              # Tab 4 komponentlari
│   ├── profile/                # Tab 5 komponentlari
│   └── ui/                     # Toast, Skeleton
├── hooks/                      # 6 custom hook
├── lib/
│   ├── ai-engine.ts            # AI mantig'i
│   └── dmed-client.ts          # API client
├── types/                      # TypeScript tiplar
└── data/                       # Mock D-Med data
```

## 🎨 Dizayn

- **Palette**: Iliq krem-terrakota (FDF6EC, C9663D), bola-do'st, klinik-sovuq emas
- **Tipografiya**: Fraunces serif (sarlavhalar) + Manrope sans (matn)
- **Motion**: Pulslayotgan AI dot, animatsiyali progress ring, slide-up modal, float animatsiyalar
- **Mobile-first**: 440px max kenglik, safe area inset, floating bottom-nav

## 🔌 D-Med integratsiyasi

Hozir mock API'lar `/api/dmed/*` da, lekin real D-Med API bilan ulash uchun faqat `dmed-client.ts` ichidagi `fetch()` URL'larini almashtirish kerak. Ma'lumotlar tuzilmasi (`Patient`, `Prescription`, `Diagnosis`) D-Med standartiga mos.

## 📱 PWA xususiyatlari

- ✅ `manifest.json` — telefonga "Bosh ekranga qo'shish"
- ✅ Service Worker — offline rejim
- ✅ Push notifications (kelajak uchun)
- ✅ App shortcuts — telefon ikonasi orqali tezkor kirish
- ✅ Theme color, viewport-fit safe area

## 🧪 Test foydalanuvchi

- **Bola**: Aziza Karimova, 20 oylik
- **Tashxis**: O'tkir bronxit (J20.9)
- **Davolanish**: 21 kun (hozir 14-kun)
- **Dorilar**: Cefixim, Linex, Vitamin D3, Ibuprofen
- **Allergiya**: Penitsillin, tuxum oqsili

## 📝 Litsenziya

MIT — xakaton uchun yaratilgan. Kommertsiya foydalanish uchun D-Med bilan rasmiy shartnoma kerak.
"# medai" 

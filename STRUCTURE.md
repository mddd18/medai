# 🌿 Sog'lomBola AI — Loyiha Strukturasi (Next.js 14 App Router)

```
sog-lom-bola-ai/
│
├── 📁 public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── apple-touch-icon.png
│   ├── sounds/
│   │   ├── white-noise.mp3
│   │   ├── lullaby.mp3
│   │   ├── rain.mp3
│   │   └── ocean.mp3
│   ├── animations/
│   │   ├── baby-calm.json        # Lottie animatsiyalar
│   │   └── celebration.json
│   ├── manifest.json              # PWA manifest
│   └── sw.js                      # Service Worker
│
├── 📁 src/
│   │
│   ├── 📁 app/                                 # ⭐ App Router
│   │   │
│   │   ├── layout.tsx                          # Root layout (BottomNav bilan)
│   │   ├── page.tsx                            # / → AI Care & Diet (asosiy)
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── globals.css                         # Tailwind + custom variables
│   │   │
│   │   ├── 📁 (tabs)/                          # 5 ta bottom nav bo'limi
│   │   │   ├── care/
│   │   │   │   └── page.tsx                    # 1. AI Care & Diet
│   │   │   ├── insights/
│   │   │   │   └── page.tsx                    # 2. AI Insights (Risk)
│   │   │   ├── booking/
│   │   │   │   ├── page.tsx                    # 3. Smart Booking (xarita)
│   │   │   │   └── [doctorId]/
│   │   │   │       └── page.tsx                # Shifokor sahifasi
│   │   │   ├── baby-mode/
│   │   │   │   └── page.tsx                    # 4. Baby Mode (o'yin/shovqin)
│   │   │   └── profile/
│   │   │       └── page.tsx                    # 5. Profile (EHR D-Med)
│   │   │
│   │   ├── 📁 onboarding/
│   │   │   ├── page.tsx                        # D-Med login
│   │   │   └── sync/page.tsx                   # Ma'lumotlar sinxronizatsiyasi
│   │   │
│   │   └── 📁 api/                             # ⭐ Mock API Routes
│   │       │
│   │       ├── dmed/                           # D-Med integratsiya
│   │       │   ├── patient/route.ts            # GET bola ma'lumotlari
│   │       │   ├── prescriptions/route.ts      # GET e-retseptlar
│   │       │   ├── diagnosis/route.ts          # GET tashxis
│   │       │   ├── allergies/route.ts          # GET allergiyalar
│   │       │   └── lab-results/route.ts        # GET tahlillar
│   │       │
│   │       ├── ai/                             # AI xizmatlar
│   │       │   ├── nutri-care/route.ts         # POST ovqatlanish tavsiyasi
│   │       │   ├── risk-analysis/route.ts      # POST xavf tahlili
│   │       │   ├── drug-interaction/route.ts   # POST dori ta'sirlashuvi
│   │       │   └── recommendations/route.ts    # POST kunlik tavsiyalar
│   │       │
│   │       ├── tasks/                          # Vazifalar (To-Do)
│   │       │   ├── route.ts                    # GET, POST kunlik vazifalar
│   │       │   └── [id]/
│   │       │       └── route.ts                # PATCH (bajarildi), DELETE
│   │       │
│   │       ├── booking/                        # Smart Booking
│   │       │   ├── doctors/route.ts            # GET shifokorlar (matchmaking)
│   │       │   ├── massagists/route.ts         # GET massajistlar
│   │       │   ├── slots/route.ts              # GET vaqt slotlari
│   │       │   └── reserve/route.ts            # POST band qilish
│   │       │
│   │       └── notifications/route.ts          # Push xabarlar
│   │
│   ├── 📁 components/                          # ⭐ React komponentlar
│   │   │
│   │   ├── layout/
│   │   │   ├── BottomNav.tsx                   # 5 ta tab navigatsiya
│   │   │   ├── TopBar.tsx                      # Header (avatar, profile)
│   │   │   ├── PageHeader.tsx
│   │   │   └── SafeAreaWrapper.tsx
│   │   │
│   │   ├── care/                               # AI Care & Diet
│   │   │   ├── HeroCard.tsx                    # Bugungi salomlashish
│   │   │   ├── DailyTimeline.tsx               # Vaqt jadvali
│   │   │   ├── TaskItem.tsx                    # Bitta vazifa kartochkasi
│   │   │   ├── TaskList.tsx                    # Vazifalar ro'yxati
│   │   │   ├── MedicineCard.tsx                # Dori kartochkasi
│   │   │   ├── MassageCard.tsx                 # Massaj kartochkasi
│   │   │   ├── NutriCareCard.tsx               # AI ovqatlanish
│   │   │   ├── DietPlan.tsx                    # Ovqat ratsioni
│   │   │   └── ForbiddenFoods.tsx              # Mumkin emas ro'yxati
│   │   │
│   │   ├── insights/                           # AI Insights
│   │   │   ├── RiskGauge.tsx                   # Doiraviy xavf ko'rsatkichi
│   │   │   ├── ProgressRing.tsx                # Davolanish progressi
│   │   │   ├── RiskAlert.tsx                   # AI ogohlantirish
│   │   │   ├── ResistanceChart.tsx             # Rezistentlik grafigi
│   │   │   └── TrendChart.tsx                  # Recharts grafigi
│   │   │
│   │   ├── booking/                            # Smart Booking
│   │   │   ├── MapView.tsx                     # Mapbox/Leaflet
│   │   │   ├── DoctorCard.tsx
│   │   │   ├── MatchScore.tsx                  # AI match foizi
│   │   │   ├── TimeSlotPicker.tsx
│   │   │   └── BookingConfirm.tsx
│   │   │
│   │   ├── baby-mode/                          # Baby Mode
│   │   │   ├── AnimatedScene.tsx               # Lottie animatsiyalar
│   │   │   ├── SoundPlayer.tsx                 # White noise pleyer
│   │   │   ├── BubbleGame.tsx                  # Pufak o'yin
│   │   │   ├── ColorTap.tsx                    # Rang bosish o'yini
│   │   │   └── MassageTimer.tsx                # Massaj timer
│   │   │
│   │   ├── profile/                            # EHR
│   │   │   ├── PatientHeader.tsx
│   │   │   ├── DiagnosisCard.tsx
│   │   │   ├── AllergyList.tsx
│   │   │   ├── PrescriptionHistory.tsx
│   │   │   ├── LabResults.tsx
│   │   │   └── DMedSyncBadge.tsx               # ✅ D-Med bilan sinxron
│   │   │
│   │   └── ui/                                 # Asosiy UI primitivlar
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Toast.tsx
│   │       ├── Modal.tsx
│   │       ├── Skeleton.tsx
│   │       ├── EmptyState.tsx
│   │       └── Avatar.tsx
│   │
│   ├── 📁 lib/                                 # ⭐ Yordamchi utilitlar
│   │   ├── dmed-client.ts                      # D-Med API mijoz
│   │   ├── ai-engine.ts                        # AI mantiq (mock)
│   │   ├── risk-calculator.ts                  # Xavf hisoblash algoritmi
│   │   ├── matchmaking.ts                      # Shifokor moslashtirish
│   │   ├── date-utils.ts
│   │   ├── api.ts                              # fetch wrapper
│   │   └── constants.ts
│   │
│   ├── 📁 hooks/                               # ⭐ Custom React hooks
│   │   ├── useDMedSync.ts                      # D-Med sinxronizatsiya
│   │   ├── useTasks.ts                         # Vazifalar boshqaruvi
│   │   ├── useRiskAnalysis.ts                  # Xavf tahlili
│   │   ├── useGeolocation.ts                   # Joylashuv
│   │   ├── useNutriCare.ts                     # AI ovqatlanish
│   │   └── useNotifications.ts                 # Push
│   │
│   ├── 📁 store/                               # ⭐ State (Zustand)
│   │   ├── useAppStore.ts                      # Asosiy state
│   │   ├── useTaskStore.ts                     # Vazifalar
│   │   └── usePatientStore.ts                  # Bemor ma'lumotlari
│   │
│   ├── 📁 types/                               # ⭐ TypeScript tiplar
│   │   ├── dmed.ts                             # D-Med tiplar
│   │   ├── patient.ts
│   │   ├── prescription.ts
│   │   ├── task.ts
│   │   ├── doctor.ts
│   │   └── ai.ts
│   │
│   ├── 📁 data/                                # ⭐ Mock ma'lumotlar
│   │   ├── mock-patient.ts                     # Test bola ma'lumotlari
│   │   ├── mock-prescriptions.ts               # Test retseptlar
│   │   ├── mock-doctors.ts                     # Test shifokorlar
│   │   ├── mock-foods.ts                       # Ovqat bazasi
│   │   ├── drug-food-rules.ts                  # Dori-ovqat o'zaro ta'siri
│   │   └── massage-protocols.ts
│   │
│   └── 📁 styles/
│       └── tailwind-tokens.css                 # Dizayn tokenlari
│
├── 📄 .env.local                               # Maxfiy kalitlar
│   # NEXT_PUBLIC_DMED_API=https://api.dmed.uz
│   # OPENAI_API_KEY=...
│   # NEXT_PUBLIC_MAPBOX_TOKEN=...
│
├── 📄 next.config.js                           # PWA konfiguratsiya
├── 📄 tailwind.config.ts                       # Dizayn tizimi
├── 📄 tsconfig.json
├── 📄 package.json
└── 📄 README.md
```

## 🔑 Asosiy ma'lumot oqimi (Data Flow)

```
D-Med API (real)
     ↓
/api/dmed/* (mock proxy)
     ↓
useDMedSync() hook
     ↓
Zustand store
     ↓
React komponentlar (UI)
     ↓ + foydalanuvchi xatti-harakati
/api/ai/risk-analysis
     ↓
AI ogohlantirish va tavsiyalar
```

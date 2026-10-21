# PawSathi 🐾 — Every Paw Deserves Care

> **A Smart Street Dog Care, Feeding, Donation & Rescue Platform**  
> Community-driven animal welfare platform built for India's indie street dogs, connecting caring citizens, neighborhood daily feeders, donation hub hosts, and emergency veterinary rescuers.

---

## 🌟 Implemented Features

### 1. Interactive Street Dog Map (`/dog-map`)
* **Interactive OpenStreetMap + Leaflet Engine:** 100% free and open-source map engine with zero required paid API keys.
* **Custom Marker Categories:**
  * 🐾 **Dog Location:** Sighted and monitored neighborhood indie dogs.
  * 🍚 **Food Needed:** Locations where indies need daily meals or feeding coordination.
  * 💧 **Water Needed:** Locations where clean drinking water bowls need summer refilling.
  * ❤️ **Street Dogs Donation Points:** Physically approved community supply drop hubs. *(Replaces legacy Food Drop Points entirely)*.
  * 🆘 **Emergency Assistance:** Pulsing real-time markers for injured dogs or road accidents.
* **Map & List Toggle:** Easily toggle between geographic map pins and searchable list cards.
* **Locality Search & Category Filters:** Real-time client filtering by neighborhood (e.g. Indiranagar, Domlur, Koramangala).
* **GPS "Locate Me":** Graceful location permission handling with manual search fallback.

### 2. Street Dog Reporting (`/report-dog`)
* Multi-step reporting for food needed, water needed, injured dogs, sick dogs, and abandoned puppies.
* Privacy-safe approximate location landmarks (private house addresses are never exposed).
* Photograph previews with one-click demo presets.
* Auto-creates corresponding **Feeding Tasks** and **Emergency Rescue Cases**.
* Celebratory confetti animation and unique tracking ID generation.

### 3. Street Dogs Donation Points (`/donation-points`, `/add-donation-point`, `/donation-points/:id`)
* Dedicated hub connecting donors to trusted neighborhood animal shelters, clinics, and supply drops.
* Displays accepted items: dog kibble, clean water bowls, stainless feeding bowls, blankets, tick powders, veterinary first-aid supplies.
* **Intended Supply Drop Form:** Donors can register planned drops and generate verifiable receipts.
* **Admin Verification Protocol:** New submissions remain pending until an authorized administrator verifies the physical premises.

### 4. Feeding Coordination — "Help a Dog" (`/feeding-tasks`)
* Claiming workflow preventing duplicate claims on the same task.
* Task lifecycle: `Available` ➔ `Claimed` ➔ `In Progress` ➔ `Completed`.
* Record completed feeding with observations, notes, and photographic proof.
* Responsible feeding guidelines (feeding away from traffic lanes, zero plastic littering).

### 5. Emergency Rescue & First Aid (`/emergency`)
* Rapid reporting for injured dogs, vehicular trauma, or puppies in distress.
* Rescuer triage workflow (`Reported` ➔ `Review Required` ➔ `Rescuer Assigned` ➔ `In Progress` ➔ `Referred to Vet Clinic` ➔ `Resolved`).
* Critical medical notice clarifying PawSathi is a volunteer coordination network, not an ambulance service.

### 6. Street Dog Profiles (`/dog-profiles`)
* Detailed profiles with Anti-Rabies Vaccination (ARV) ear-notch verification.
* Historical feeding logs and health observations.

### 7. Donation Campaigns & Contributions (`/campaigns`)
* Active welfare campaigns (e.g., Summer Hydration Drive, Indie Puppy Shelter Fund).
* Simulated instant contribution workflow in Demo Mode with generated receipt codes (`REC-2024-XXXX`).
* Transparent contribution audit ledger.

### 8. Volunteer Network & Leaderboard (`/volunteers`, `/volunteer-dashboard`)
* Volunteer registration with interests (Feeding, Water, First-aid, Transport, Hub Host).
* Activity-based community leaderboard (rewarding consistency and verified care, **never money**).

### 9. Persona Switcher & Demo Mode
* Top notification banner disclosing fictional demonstration dataset for Bengaluru indies.
* **1-Click Persona Switcher:** Instant switching between **Volunteer**, **Admin**, **Rescuer**, **Donation Host**, and **Public User** to test all permission tiers immediately.
* "Reset Demo Data" button restoring clean state at any time.

### 10. Administrator Moderation Console (`/admin`)
* Review and approve/reject pending donation points.
* Triage street dog reports and update visibility.
* Traceable audit log recording every sensitive action with actor metadata.

---

## 📁 Project Structure

```
street-dog/
├── public/                 # Favicon and static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── DemoBanner.tsx          # Top demo mode banner & 1-click persona switcher
│   │   ├── DogCard.tsx             # Dog profile summary card
│   │   ├── DonationPointCard.tsx   # Verified donation drop point card
│   │   ├── FeedingTaskCard.tsx     # Feeding coordination card & completion modal
│   │   ├── Footer.tsx              # Brand footer & medical emergency disclaimer
│   │   ├── Logo.tsx                # Custom paw + heart PawSathi logo
│   │   ├── MapView.tsx             # Leaflet interactive map with custom SVG pins
│   │   ├── MobileBottomNav.tsx     # Mobile bottom 5-tab navigation bar
│   │   ├── Navbar.tsx              # Top navigation with role badges & notification counter
│   │   ├── ReportForm.tsx          # Comprehensive dog sighting reporting form
│   │   ├── ScrollToTop.tsx         # Route change viewport reset
│   │   └── ToastContainer.tsx      # Floating toast notification system
│   ├── context/
│   │   └── AppContext.tsx          # React Context providing global state & actions
│   ├── pages/              # All 22 Required Application Pages
│   │   ├── Home.tsx                # Homepage with impact counters & workflow
│   │   ├── About.tsx               # About PawSathi & Indian animal welfare law
│   │   ├── DogMap.tsx              # Dedicated interactive care map
│   │   ├── ReportDog.tsx           # Sighting report page
│   │   ├── DogProfiles.tsx         # Dog profiles directory & medical logs
│   │   ├── FeedingTasks.tsx        # Help a Dog feeding coordination board
│   │   ├── DonationPoints.tsx      # Street Dogs Donation Points directory
│   │   ├── DonationPointDetails.tsx# Detailed donation point view & drop registration
│   │   ├── AddDonationPoint.tsx    # Register new donation point (pending review)
│   │   ├── Campaigns.tsx           # Donation management & campaigns
│   │   ├── Volunteers.tsx          # Volunteer registration & leaderboard
│   │   ├── VolunteerDashboard.tsx  # Volunteer duty board & claimed routes
│   │   ├── Emergency.tsx           # Emergency rescue triage center
│   │   ├── Notifications.tsx       # Activity alerts & notification center
│   │   ├── Dashboard.tsx           # Personalized user dashboard
│   │   ├── Login.tsx               # Sign in & 1-click demo logins
│   │   ├── Register.tsx            # Account registration
│   │   ├── Profile.tsx             # Profile settings & notification preferences
│   │   ├── Privacy.tsx             # Privacy policy & address obfuscation rules
│   │   ├── Terms.tsx               # Terms of use & safe feeding guidelines
│   │   ├── AdminDashboard.tsx      # Admin moderation & approval console
│   │   └── NotFound.tsx            # 404 Not Found fallback
│   ├── services/
│   │   ├── firebase.ts             # Firebase initialization & live/demo detection
│   │   ├── sampleData.ts           # Rich fictional demonstration dataset
│   │   └── store.ts                # Reactive localStorage data store & event bus
│   ├── test/
│   │   ├── pawsathi.test.ts        # Comprehensive Vitest test suite
│   │   └── setup.ts                # Test environment & localStorage mocks
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces and data models
│   ├── App.tsx                     # React Router configuration
│   ├── index.css                   # Tailwind CSS base and Leaflet styles
│   └── main.tsx                    # React entry point
├── .env.example            # Environment variable template
├── firestore.rules         # Cloud Firestore security rules
├── storage.rules           # Firebase Storage security rules
├── package.json            # Dependencies and npm scripts
├── tailwind.config.js      # PawSathi brand theme configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite & Vitest configuration
```

---

## 🚀 Instructions to Run Locally

### 1. Prerequisites
* Node.js v18+ or v20+
* npm v9+

### 2. Installation
```bash
# Clone or navigate into the workspace
cd "street dog"

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`. PawSathi will start in **Demo Mode** with full interactivity, realistic sample records, and instant role switching.

### 4. Run Test Suite
```bash
npm test
```
Runs the automated Vitest suite verifying 8 critical care, security, and state workflows.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Environment Variables & Configuration

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description | Default / Demo Behavior |
| :--- | :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | If unset, activates Demo Mode |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `YOUR_PROJECT.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Cloud Firestore Project ID | Connects to Cloud Firestore |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Connects to Firebase Storage |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`| FCM Sender ID | Optional push notification sender |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | Web App identifier |
| `VITE_MAP_PROVIDER` | Map engine provider | Set to `leaflet` (Free OpenStreetMap) |
| `VITE_RAZORPAY_KEY_ID` | Razorpay Key ID | If unset, simulates transactions with verified demo receipts |

---

## 🔒 Security & Backend Setup

### Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication** (Email/Password, Google).
3. Enable **Cloud Firestore** in production mode.
4. Enable **Firebase Storage**.
5. Copy your web app config into `.env`.
6. Deploy the included security rules:
   ```bash
   firebase deploy --only firestore:rules,storage
   ```

### Map Provider
* PawSathi uses **OpenStreetMap tile servers through Leaflet**.
* **Zero payment or Google Maps billing required** to run all map interactions locally or in production.

---

## 🧪 Demo Mode vs. Live Production

| Feature | In Demo Mode | In Live Mode (Firebase Configured) |
| :--- | :--- | :--- |
| **Data Storage** | Reactive LocalStorage with event bus | Cloud Firestore collections |
| **Authentication** | 1-Click Persona switcher (Admin, Volunteer, Rescuer, Host, Citizen) | Firebase Auth with email/password & tokens |
| **Image Uploads** | Instant demo presets or external Unsplash indie dog images | Firebase Cloud Storage with 5MB validation |
| **Monetary Donations**| Simulated transactions with instant verified receipt code | Gateway (e.g. Razorpay) server-side verification |
| **Public Map** | Fictional Bengaluru indie dog records | Live verified community database records |

---

## 🛡️ Animal Care & Safety Compliance
* **No AI Diagnostics:** PawSathi never attempts to automatically diagnose diseases or rabies from photos. Medical conditions require veterinary examination.
* **Anti-Rabies (ARV) Verification:** Verified statuses are recorded from physical municipal ear-notches or volunteer vaccination certificates.
* **Anti-Harassment Address Masking:** Exact residential flat numbers or private house addresses are never published.

---

*PawSathi — Every Paw Deserves Care.* 🐾

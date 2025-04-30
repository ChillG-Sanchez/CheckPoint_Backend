# 🛠️ Fejlesztői dokumentáció – CheckPoint
 
**Projekt neve:** CheckPoint  
**Készítők neve:** Csillag Csaba, Nagy Dorina Laura
 
---
 
## 🎯 Cél
 
Funkcionális, reszponzív webalkalmazás, amely az alábbi core funkciókat valósítja meg:
- Felhasználói regisztráció és hitelesítés (JWT)
- Bejelentkezés / kijelentkezés
- Főoldal / tartalom letöltése
- Kapcsolatfelvétel űrlap
 
A rendszer célja egy beléptetési rendszer prototípusának megvalósítása modern technológiákkal.
 
---
 
## 🧰 Fejlesztői környezet
 
- **IDE:** Visual Studio Code  
- **Verziókövetés:** Git + GitHub  
- **API-tesztelés:** Flashpost  
- **Konfiguráció:** `.env` alapú környezetkezelés (`DATABASE_URL`, `SECRET_KEY` stb.)
 
---
 
## 💻 Frontend Technológiai stack
 
- React (w/ Vite)  
- TypeScript  
- React Router  
- Tailwind CSS  
- Lucide Icons  
- Fetch API (async kommunikáció)
 
---
 
## 🖥️ Backend Technológiai stack
 
- NestJS (TypeScript alapú REST API)  
- MySQL (relációs adatbázis)  
- Prisma ORM  
- JWT (authentikáció)  
- Argon2 (jelszóhash-elés)  
- Swagger – automatikus API dokumentáció (`/api` endpointon)
 
---
 
## ⚙️ Telepítés / Futtatás
 
🔹 Frontend
 
Klónozás:
git clone https://github.com/Dorolesz/CheckPoint_Frontend.git
 
Könyvtárváltás:
cd CheckPoint_Frontend
 
Függőségek telepítése:
npm install
 
Fejlesztői szerver indítása:
npm run dev
____________
🔹 Backend
 
Klónozás:
git clone https://github.com/ChillG-Sanchez/CheckPoint_Backend.git
 
Könyvtárváltás:
cd CheckPoint_Backend
 
Függőségek telepítése:
npm install
 
.env fájl létrehozása a projekt gyökerében az alábbi tartalommal:
 
DATABASE_URL="mysql://root@localhost:3306/CheckPoint"
SECRET_KEY="yourSuperSecretKey"
 
Adatbázis feltöltés:
npx prisma db push
 
Seedelés (adatfeltöltés):
npx ts-node prisma/seed.ts
 
Backend indítása:
npm run start:dev
 
## 🔒 Auth és biztonság
JWT token alapú authentikáció
 
Hash-elés: Argon2
 
Role alapú jogosultságkezelés – előkészítve későbbi bővítéshez
 
## 📘 Swagger API dokumentáció
A teljes backend API dokumentáció elérhető böngészőben:
👉 http://localhost:3000/api
(NestJS Swagger integrációval)
(A backendnek futnia kell)

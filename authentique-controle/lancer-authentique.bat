@echo off
title Authentique Controle - Serveur Local & Mobile
color 0B
echo ====================================================================
echo      AUTHENTIQUE CONTROLE - HEBERGEMENT LOCAL & MOBILE
echo ====================================================================
echo.
echo 1. Lancement du serveur Node.js / SQLite...
cd /d "%~dp0"
start "Serveur Authentique Controle" /min node server.js
timeout /t 2 /nobreak >nul

echo 2. Lancement du tunnel mobile securise...
start "Tunnel Mobile Cloudflare" /min cloudflared.exe tunnel --url http://localhost:3000

echo 3. Ouverture de l'application dans votre navigateur...
start http://localhost:3000

echo.
echo ====================================================================
echo   Application active sur Ordinateur et Smartphone !
echo   Pour arreter le serveur, fermez cette fenetre.
echo ====================================================================
echo.
pause

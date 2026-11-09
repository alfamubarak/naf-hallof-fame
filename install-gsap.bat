@echo off
setlocal
cd /d "%~dp0"
echo Downloading the official GSAP runtime for offline use.
echo This is a ONE-TIME step requiring internet access on this computer.
echo Once installed, the museum operates fully offline.
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-gsap.ps1"
echo.
echo Press any key to close this setup window.
pause >nul
endlocal

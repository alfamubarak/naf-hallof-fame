@echo off
setlocal EnableExtensions DisableDelayedExpansion
set "ROOT=%~dp0"
cd /d "%ROOT%" || (echo [ERROR] Cannot enter the kiosk directory.& exit /b 2)
set /a FAIL=0
set /a WARN=0

echo ======================================================
echo NIGERIAN AIR FORCE MUSEUM - OFFLINE READINESS CHECK
echo ======================================================
echo Folder: "%ROOT%"
echo.
call :CHECK "index.html"
call :CHECK "css\style.css"
call :CHECK "js\data.js"
call :CHECK "js\main.js"
call :CHECK "js\motion.js"
call :CHECK "js\animations.js"
call :CHECK "js\gallery.js"
call :CHECK "js\cursor.js"
call :CHECK "js\interactions.js"
call :CHECK "js\immersive.js"
call :CHECK "css\immersive.css"
call :CHECK "css\glass-studio.css"
call :CHECK "js\glass-studio.js"
call :CHECK "install-gsap.ps1"
call :CHECK "assets\logos\nigerian-air-force-logo.png"
call :CHECK "assets\images\photos\01-chiefs\23-sunday-kelvin-aneke-portrait.jpg"
call :CHECK "assets\images\photos\01-chiefs\22-hasan-bala-abubakar-portrait.jpg"
call :CHECK "assets\images\college\college-hq.jpg"
call :CHECK_OPTIONAL_GSAP "libs\gsap\gsap.min.js"
call :CHECK_OPTIONAL_GSAP "libs\gsap\ScrollTrigger.min.js"
call :CHECK_OPTIONAL "assets\videos\intro.mp4"
call :CHECK_OPTIONAL "assets\videos\lineage.mp4"
call :CHECK_OPTIONAL "assets\videos\sixty.mp4"
call :CHECK_OPTIONAL "assets\videos\hercules.mp4"
call :CHECK_OPTIONAL "assets\videos\war.mp4"
call :CHECK_OPTIONAL "assets\videos\birth.mp4"
call :CHECK_OPTIONAL "assets\videos\jaji.mp4"

echo.
set "EDGE="
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not defined EDGE if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not defined EDGE if exist "%LocalAppData%\Microsoft\Edge\Application\msedge.exe" set "EDGE=%LocalAppData%\Microsoft\Edge\Application\msedge.exe"
if not defined EDGE for /f "delims=" %%E in ('where msedge.exe 2^>nul') do if not defined EDGE set "EDGE=%%E"
if defined EDGE (echo [OK] Microsoft Edge found: "%EDGE%") else (echo [ERROR] Microsoft Edge not found. Install Edge before running the kiosk.& set /a FAIL+=1)
where powershell.exe >nul 2>nul
if errorlevel 1 (echo [ERROR] PowerShell not found. Required to safely encode paths for Edge.& set /a FAIL+=1) else (echo [OK] Windows PowerShell available)
echo.
if %FAIL% GTR 0 (
 echo [FAILED] %FAIL% missing file(s) or required system component(s).
 echo Check the extracted ZIP folder. All files must remain together.
 endlocal & exit /b 1
)
echo [READY] Files and required Windows components found.
if %WARN% GTR 0 (echo [NOTE] %WARN% optional video file(s) are missing. The rest of the exhibition can start; extract all video packs for full film playback.)
echo [NOTE] Visual, media and Edge kiosk acceptance tests must be run on this Windows computer.
endlocal & exit /b 0

:CHECK
if exist "%ROOT%%~1" (
 echo [OK] %~1
) else (
 echo [MISSING] %~1
 set /a FAIL+=1
)
exit /b 0

:CHECK_OPTIONAL
if exist "%ROOT%%~1" (
 echo [OK] %~1
) else (
 echo [OPTIONAL VIDEO MISSING] %~1
 set /a WARN+=1
)
exit /b 0

:CHECK_OPTIONAL_GSAP
if exist "%ROOT%%~1" (echo [OK] GSAP installed: %~1) else (echo [MOTION NOTE] %~1 not yet installed. Run install-gsap.bat once while online for GSAP motion; native fallback remains available offline.)
exit /b 0

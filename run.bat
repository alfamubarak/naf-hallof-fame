@echo off
setlocal EnableExtensions DisableDelayedExpansion
set "KIOSK_ROOT=%~dp0"
cd /d "%KIOSK_ROOT%" || (echo [ERROR] Could not open the kiosk folder.& pause & exit /b 2)
call "%KIOSK_ROOT%prepare.bat"
if errorlevel 1 (echo.& echo [ERROR] Readiness check failed. Resolve the listed issues.& pause & exit /b 1)
set "EDGE="
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not defined EDGE if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not defined EDGE if exist "%LocalAppData%\Microsoft\Edge\Application\msedge.exe" set "EDGE=%LocalAppData%\Microsoft\Edge\Application\msedge.exe"
if not defined EDGE for /f "delims=" %%E in ('where msedge.exe 2^>nul') do if not defined EDGE set "EDGE=%%E"
if not defined EDGE (echo [ERROR] Edge executable could not be found.& pause & exit /b 1)
set "KIOSK_URL="
for /f "usebackq delims=" %%U in (`powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$p=Join-Path $env:KIOSK_ROOT 'index.html'; $f=(Get-Item -LiteralPath $p).FullName; ([System.Uri]::new($f)).AbsoluteUri"`) do set "KIOSK_URL=%%U"
if not defined KIOSK_URL (echo [ERROR] Failed to convert the local file path to a file URL.& pause & exit /b 1)
echo.
echo [LAUNCHING] Microsoft Edge - full-screen digital signage mode
echo Address: %KIOSK_URL%
echo.
start "NAF Museum Kiosk" "%EDGE%" --kiosk "%KIOSK_URL%" --edge-kiosk-type=fullscreen --no-first-run --user-data-dir="%TEMP%\NAF_Museum_Kiosk_Profile"
if errorlevel 1 (echo [ERROR] Failed to start Edge. & pause & exit /b 1)
echo [OK] Launch command submitted.
echo [NOTE] Use authorised Windows kiosk exit controls to close the browser session.
endlocal & exit /b 0

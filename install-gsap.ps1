# One-time GSAP library installation for a completely offline exhibition.
# Run on a connected computer BEFORE moving the kiosk to its offline location.
param([switch]$Quiet)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$folder = Join-Path $root 'libs\gsap'
New-Item -ItemType Directory -Force -Path $folder | Out-Null
$files = @(
  @{ File='gsap.min.js'; URL='https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js'; Min=35000 },
  @{ File='ScrollTrigger.min.js'; URL='https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js'; Min=15000 }
)
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
foreach ($entry in $files) {
  $out = Join-Path $folder $entry.File
  if((Test-Path -LiteralPath $out) -and (Get-Item -LiteralPath $out).Length -ge $entry.Min){
    Write-Host "[OK] Already installed: $($entry.File)" -ForegroundColor Green
    continue
  }
  Write-Host "[DOWNLOAD] GSAP: $($entry.File)" -ForegroundColor Cyan
  $tmp = $out + '.download'
  try {
    Invoke-WebRequest -Uri $entry.URL -OutFile $tmp -UseBasicParsing -TimeoutSec 35
    $bytes=(Get-Item -LiteralPath $tmp).Length
    $head = Get-Content -LiteralPath $tmp -TotalCount 1
    if ($bytes -lt $entry.Min -or $head -notmatch 'GSAP|ScrollTrigger|greensock|!') {
      throw "The download did not look like the expected GSAP file ($bytes bytes)."
    }
    Move-Item -LiteralPath $tmp -Destination $out -Force
    Write-Host "[OK] $($entry.File) - $bytes bytes" -ForegroundColor Green
  }
  catch {
    Remove-Item -LiteralPath $tmp -ErrorAction SilentlyContinue
    Write-Warning "Could not download $($entry.File). $($_.Exception.Message)"
    Write-Warning "The museum can still run offline with its native animation fallback."
  }
}
Write-Host 'One-time library setup finished. You can now run the kiosk without internet.'

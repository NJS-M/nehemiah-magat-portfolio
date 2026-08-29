# Changes the site's public URL everywhere it appears.
# Usage (PowerShell, from inside this folder):
#   .\set-domain.ps1 https://your-real-domain.com
param([Parameter(Mandatory=$true)][string]$NewUrl)

$NewUrl = $NewUrl.TrimEnd('/')
$old = (Select-String -Path .\sitemap.xml -Pattern 'https?://[^<]+' | Select-Object -First 1).Matches[0].Value.TrimEnd('/')

if (-not $old) { Write-Error "Could not detect the current URL."; exit 1 }
Write-Host "Replacing $old  ->  $NewUrl"

foreach ($f in @('index.html','robots.txt','sitemap.xml')) {
  (Get-Content $f -Raw) -replace [regex]::Escape($old), $NewUrl | Set-Content $f -NoNewline -Encoding UTF8
  Write-Host "  updated $f"
}
Write-Host "Done. Commit and push (or re-upload) to publish."

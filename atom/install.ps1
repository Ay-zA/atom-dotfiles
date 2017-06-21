param (
    [switch]$font = $false
)

Get-ChildItem $PSScriptRoot | Where-Object {$_.Extension -match "cson|less"} | Copy-Item -Destination "$env:USERPROFILE\.atom" -Verbose

if($font) {
  & ".\font.ps1"
}

echo "Installation Compelete"

echo "Press a key..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

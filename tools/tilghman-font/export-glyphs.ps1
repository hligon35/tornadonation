$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path "$PSScriptRoot\..\.." | Select-Object -ExpandProperty Path
$srcPng = Join-Path $repoRoot 'assets\fonts\pthsCapFont.png'
$outDir = Join-Path $PSScriptRoot 'glyphs'

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

Add-Type -AssemblyName System.Drawing

$cell = 64
$cols = 16

$bmp = [System.Drawing.Bitmap]::FromFile($srcPng)
try {
  for ($i = 0; $i -lt 26; $i++) {
    $ch = [char]([int][char]'A' + $i)
    $col = $i % $cols
    $row = [Math]::Floor($i / $cols)
    $x0 = $col * $cell
    $y0 = $row * $cell

    $rects = New-Object System.Collections.Generic.List[string]

    for ($y = 0; $y -lt $cell; $y++) {
      $runStart = -1
      $runLen = 0

      for ($x = 0; $x -lt $cell; $x++) {
        $px = $bmp.GetPixel($x0 + $x, $y0 + $y)
        $filled = $px.A -ge 10

        if ($filled) {
          if ($runStart -lt 0) { $runStart = $x; $runLen = 1 } else { $runLen++ }
        } else {
          if ($runStart -ge 0) {
            $svgY = ($cell - 1) - $y
            $rects.Add(('<rect x="{0}" y="{1}" width="{2}" height="1" />' -f $runStart, $svgY, $runLen))
            $runStart = -1
            $runLen = 0
          }
        }
      }

      if ($runStart -ge 0) {
        $svgY = ($cell - 1) - $y
        $rects.Add(('<rect x="{0}" y="{1}" width="{2}" height="1" />' -f $runStart, $svgY, $runLen))
      }
    }

    $svg = @()
    $svg += ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {0} {0}">' -f $cell)
    $svg += '<g fill="#000">'
    $svg += $rects
    $svg += '</g>'
    $svg += '</svg>'

    $outPath = Join-Path $outDir "$ch.svg"
    [System.IO.File]::WriteAllLines($outPath, $svg)
  }
}
finally {
  $bmp.Dispose()
}

Write-Output "Wrote 26 glyph SVGs to $outDir"

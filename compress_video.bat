@echo off
REM Script para comprimir o vídeo Forest Tech usando ffmpeg

echo Comprimindo Forest_Tech_Fusion_Video_Generation.mp4...
echo.

REM Verifica se ffmpeg está instalado
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: ffmpeg nao esta instalado!
    echo.
    echo Baixe em: https://www.gyan.dev/ffmpeg/builds/
    echo.
    echo OU use um compressor online:
    echo - videosmaller.com
    echo - cloudconvert.com
    echo.
    pause
    exit /b 1
)

REM Comprime o vídeo
ffmpeg -i "videos\Forest_Tech_Fusion_Video_Generation.mp4" -vcodec h264 -crf 28 -preset slow -vf scale=1920:1080 -an "assets\hero-forest.mp4"

echo.
echo Compressao concluida! Arquivo salvo em assets\hero-forest.mp4
pause

from PIL import Image
import os

# Mapeamento: Origem (Artifacts) -> Destino (Assets)
images_map = {
    "uploaded_image_0_1766713424457.png": "project_replan_solar.png",   # Solar
    "uploaded_image_1_1766713424457.png": "project_consulting.png",     # Office
    "uploaded_image_2_1766713424457.png": "project_rpbc.png",           # Industrial
    "uploaded_image_3_1766713424457.jpg": "project_gaslub.png",         # Reforestation
    "uploaded_image_4_1766713424457.jpg": "project_rio_doce.png"        # River
}

artifacts_dir = r"C:\Users\vinil\.gemini\antigravity\brain\65f277ba-dd2a-4011-bbff-179b33d39c01"
assets_dir = r"c:\Site portifolio\assets"

# Pixels to cut from bottom (watermark removal)
BOTTOM_CROP = 60 

print("Iniciando processamento de imagens...")

for src_name, dest_name in images_map.items():
    src_path = os.path.join(artifacts_dir, src_name)
    dest_path = os.path.join(assets_dir, dest_name)
    
    try:
        if os.path.exists(src_path):
            img = Image.open(src_path)
            w, h = img.size
            
            # Cortar 60px de baixo para remover marca dagua
            # Verifica se a imagem é grande o suficiente
            if h > 100:
                img_cropped = img.crop((0, 0, w, h - BOTTOM_CROP))
                
                # Salvar na pasta assets (converter para PNG se necessário ou manter formato)
                # Vamos salvar tudo como PNG para padronizar ou manter original? 
                # O browser aceita ambos. Vamos salvar com a extensão do destination.
                img_cropped.save(dest_path)
                print(f"Sucesso: {src_name} -> {dest_name} (Recortada)")
            else:
                print(f"Erro: Imagem muito pequena {src_name}")
        else:
            print(f"Arquivo nao encontrado: {src_path}")
            
    except Exception as e:
        print(f"Erro ao processar {src_name}: {e}")

print("Concluido.")

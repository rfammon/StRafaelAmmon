from PIL import Image
import os

src_path = r"C:\Users\vinil\.gemini\antigravity\brain\65f277ba-dd2a-4011-bbff-179b33d39c01\uploaded_image_1766714651816.png"
dest_path = r"c:\Site portifolio\assets\project_revap.png"
BOTTOM_CROP = 60

try:
    if os.path.exists(src_path):
        img = Image.open(src_path)
        w, h = img.size
        
        if h > 100:
            img_cropped = img.crop((0, 0, w, h - BOTTOM_CROP))
            img_cropped.save(dest_path)
            print(f"Sucesso: REVAP image processed to {dest_path}")
        else:
            print("Erro: Imagem muito pequena")
    else:
        print(f"Arquivo nao encontrado: {src_path}")
        
except Exception as e:
    print(f"Erro: {e}")

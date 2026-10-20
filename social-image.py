from PIL import Image, ImageOps, ImageDraw, ImageFont
from pathlib import Path

root=Path(r'C:\Users\erosj\OneDrive\Escritorio\spa\spa')
out=Path(__file__).parent/'public/img'
photo=ImageOps.fit(Image.open(root/'public/img/optimized/hero-desktop.webp').convert('RGB'),(1200,630),centering=(.65,.5))
overlay=Image.new('RGBA',(1200,630))
d=ImageDraw.Draw(overlay)
for x in range(1200):
    alpha=int(245 - 105 * (x/1199))
    d.line([(x,0),(x,630)],fill=(15,22,16,alpha))
canvas=Image.alpha_composite(photo.convert('RGBA'),overlay)
d=ImageDraw.Draw(canvas)
gold='#dfb777'; cream='#f5f0e7'
serif=ImageFont.truetype('C:/Windows/Fonts/georgia.ttf',58)
sans=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',24)
small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',21)
brand=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',26)
d.rounded_rectangle((56,54,1144,576),radius=22,outline=(223,183,119,100),width=1)
d.text((92,92),'COCTELEROS',font=brand,fill=gold)
d.multiline_text((88,160),'El brindis que tu\nevento merece.',font=serif,fill=cream,spacing=12)
d.text((92,340),'Barras móviles · Coctelería para eventos',font=sans,fill=cream)
d.text((92,385),'Bodas · XV años · Celebraciones',font=small,fill='#c6cbbf')
d.line((92,458,760,458),fill=(223,183,119,110),width=1)
d.text((92,488),'Tlaxcala y alrededores',font=small,fill=gold)
d.text((92,526),'coctelerostlx.com',font=small,fill=cream)
canvas.convert('RGB').save(out/'cocteleros-social-v1.jpg',quality=88,optimize=True,progressive=True)
logo=Image.open(root/'public/img/logo.png').convert('RGBA')
icon=Image.new('RGBA',(180,180),'#171b16')
logo.thumbnail((150,150),Image.Resampling.LANCZOS)
icon.alpha_composite(logo,((180-logo.width)//2,(180-logo.height)//2))
icon.convert('RGB').save(out/'apple-touch-icon.png',optimize=True)
print((out/'cocteleros-social-v1.jpg').stat().st_size)

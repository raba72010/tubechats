from PIL import Image,ImageDraw
import math,random,os
W,H=900,450; BG=(249,247,240); INK=(45,57,49); LINE=(122,128,120); GREEN=(12,80,47)
out=os.environ.get('OUT','.')
def base():
 im=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(im); random.seed(4)
 for _ in range(650):
  x=random.randrange(W);y=random.randrange(H);v=random.randrange(180,220);d.point((x,y),fill=(v,v,v))
 return im,d
def ln(d,p,w=3,c=INK): d.line(p,fill=c,width=w,joint='curve')
def ar(d,b,s=0,e=360,w=3,c=LINE): d.arc(b,s,e,fill=c,width=w)
def save(n,fn):
 im,d=base(); fn(d); im.save(os.path.join(out,n),quality=65,optimize=True,progressive=True)
def travel(d):
 ln(d,[(25,315),(145,250),(240,305),(340,235),(430,305),(570,220),(695,295),(870,245)],2,LINE);ar(d,(80,55,720,360),200,335,4,GREEN);d.ellipse((115,235,127,247),fill=GREEN);d.ellipse((700,140,712,152),fill=GREEN);ln(d,[(300,225),(480,210),(565,150),(588,152),(557,207),(765,216),(790,230),(558,238),(485,287),(465,285),(495,237),(310,242),(285,234),(300,225)],4)
def work(d):
 ln(d,[(70,325),(830,325)],4);ln(d,[(215,170),(485,170),(515,318),(190,318),(215,170)],4);ln(d,[(180,334),(530,334)],4);ln(d,[(550,70),(820,70),(820,300),(550,300),(550,70)],2,LINE)
 for x,h in [(575,95),(610,135),(650,80),(690,155),(735,110),(780,165)]: d.rectangle((x,300-h,x+20,300),outline=LINE,width=2)
 ar(d,(680,235,760,315),0,360,3);ar(d,(748,252,790,292),280,80,2)
def home(d):
 ln(d,[(80,290),(255,105),(500,105),(655,285)],3,LINE);ln(d,[(255,105),(255,385),(655,385),(655,285)],4);ln(d,[(350,190),(485,190),(485,385),(350,385),(350,190)],4);d.ellipse((454,288,465,299),fill=GREEN);ar(d,(620,245,710,335),0,360,6,GREEN);ln(d,[(706,290),(840,290),(840,320),(805,320),(805,305),(780,305)],6,GREEN)
def buying(d):
 ln(d,[(145,70),(530,70),(530,380),(145,380),(145,70)],4)
 for y,w in [(130,270),(175,310),(220,250),(265,295)]: ln(d,[(195,y),(195+w,y)],2,LINE)
 ln(d,[(200,325),(245,300),(280,335),(325,295),(365,325)],3,GREEN);ar(d,(480,130,720,370),0,360,7);ln(d,[(650,305),(820,425)],11)
def digital(d):
 d.rounded_rectangle((260,45,600,405),radius=38,outline=INK,width=5);d.rounded_rectangle((295,85,565,365),radius=22,outline=LINE,width=2);pts=[(430,150),(500,180),(492,265),(430,322),(368,265),(360,180),(430,150)];ln(d,pts+[pts[0]],5,GREEN);ln(d,[(398,230),(425,255),(470,195)],6,GREEN)
 for r in (70,110,150): ar(d,(650-r//3,90-r//3,650+r,90+r),205,320,2,LINE)
def saudi(d):
 for y,a in [(320,38),(365,28),(410,18)]: ln(d,[(x,y+math.sin(x/90)*a) for x in range(0,W+1,20)],2,LINE)
 ln(d,[(210,385),(210,200)],5);ar(d,(210,55,535,300),180,360,5);ln(d,[(535,200),(535,385)],5);ln(d,[(620,365),(620,170),(645,140),(670,170),(670,365)],3,LINE);ln(d,[(645,140),(645,95)],2,LINE)
def events(d):
 for x in (270,450,630): ln(d,[(x,25),(x,105)],2,LINE);ar(d,(x-40,80,x+40,155),180,360,2)
 ln(d,[(160,295),(740,295)],5);ln(d,[(230,295),(200,420)],4);ln(d,[(670,295),(700,420)],4)
 for x in (310,450,590): ar(d,(x-34,245,x+34,313),0,360,2,LINE)
def family(d):
 ln(d,[(120,290),(380,60),(690,290)],3,LINE);ln(d,[(185,250),(185,400),(625,400),(625,250)],2,LINE)
 for cx,cy,r in [(335,180,32),(455,180,32),(395,240,24)]: d.ellipse((cx-r,cy-r,cx+r,cy+r),outline=INK,width=3)
 for p in [[(335,212),(310,340),(360,340)],[(455,212),(430,340),(480,340)],[(395,264),(372,350),(418,350)]]: ln(d,p,4)
 ln(d,[(690,245),(790,245),(812,385),(670,385),(690,245)],4,GREEN);ar(d,(705,205,775,280),190,350,3,GREEN)
def custom(d):
 ln(d,[(190,65),(590,65),(590,390),(190,390),(190,65)],4)
 for y in (145,205,265,325): ln(d,[(260,y),(515,y)],2,LINE)
 for y in (145,205,265): d.ellipse((225,y-6,237,y+6),outline=GREEN,width=2)
 ln(d,[(620,335),(810,130)],9,GREEN)
for n,f in [('art-travel.jpg',travel),('art-work.jpg',work),('art-home.jpg',home),('art-buying.jpg',buying),('art-digital.jpg',digital),('art-saudi.jpg',saudi),('art-events.jpg',events),('art-family.jpg',family),('art-custom.jpg',custom)]: save(n,f)

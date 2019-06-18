# -*- coding:utf-8 -*-
import urllib
import urllib.request  

#choose "Network" tag in "Inspect Element" menuitem in right-click menu
#select the XHR, you can see the response type is html
url = "http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E7%BE%8E%E5%A5%B3&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&hd=&latest=&copyright=&word=%E7%BE%8E%E5%A5%B3&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&expermode=&force=&cg=girl&pn=60&rn=30&gsm=3c&1560864185740="
#request header 
header = {
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36',
}

request = urllib.request.Request(url,headers=header)

response = urllib.request.urlopen(request)

content = response.read()

with open('girls.json','wb+') as f:
    f.write(content)

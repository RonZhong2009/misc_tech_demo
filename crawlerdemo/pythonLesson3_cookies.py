# -*- coding:utf-8 -*-
from http import cookiejar
import urllib.request  
import http.cookiejar

# create a CookieJar instance to store cookie
cookiejar = cookiejar.CookieJar()

# get HTTPCookieProcessor with CookieJar
handler=urllib.request.HTTPCookieProcessor(cookiejar)

# get a generic opener
opener = urllib.request.build_opener(handler)

opener.open("https://github.com/RonZhong2009")

## get it out
cookieStr = ""
for item in cookiejar:
    cookieStr = cookieStr + item.name + "=" + item.value + ";\n"

## remove the last charater semi comma
print(cookieStr[:-1])


#################phase 2################################

filename = 'cookie.txt'

# MozillaCookieJar can save cookies file
#     cookiejar2 = cookiejar.MozillaCookieJar(filename)
# AttributeError: 'CookieJar' object has no attribute 'MozillaCookieJar'
# that's why use http.cookiejar
cookiejar2 = http.cookiejar.MozillaCookieJar(filename)

# get HTTPCookieProcessor with CookieJar
handler2=urllib.request.HTTPCookieProcessor(cookiejar2)

# cookie = http.cookiejar.MozillaCookieJar(cookie_filename)
# cookie.load(cookie_filename, ignore_discard=True, ignore_expires=True)

# get a generic opener
opener2 = urllib.request.build_opener(handler2)

opener2.open("https://github.com/RonZhong2009")

cookiejar2.save()


#################phase 3################################

#test try except
requset = urllib.request.Request('https://github.com/RonZhong2009/unexpecterror')

try:
    urllib.request.urlopen(requset)
# #except urllib.request.HTTPError, err:, error msg: ", variable" not allowed in 3.x - use "as variable" instead.
except urllib.request.HTTPError as err:
    print (err.code)

except urllib.request.URLError as err:
    print (err)

else:
    print ("Well Done\n")

################phase 4#########################################

# user-defined data request
#http_handler = urllib.request..HTTPHandler(debuglevel=1) can open debug mode
#http_handler = urllib.request.HTTPHandler(), nothing different seems
http_handler = urllib.request.HTTPHandler(debuglevel=1)
https_handler = urllib.request.HTTPSHandler()

opener = urllib.request.build_opener(http_handler)

#think about we can use == 
# urllib.request.Request('https://www.baidu.com')
# what's the difference b/w those two ways
response = opener.open('https://www.baidu.com')

print(response.read())


#################phase 5##############################################

ftp_server = '192.168.1.100'
username = 'root'
password = '123'


#pass_mgr
pass_mgr = urllib.request.HTTPPasswordMgrWithDefaultRealm()
pass_mgr.add_password(None,ftp_server,username,password)

http_auth_handler = urllib.request.HTTPBasicAuthHandler(pass_mgr)

#
request =  urllib.request.Request('https://github.com/RonZhong2009')

#
opener =  urllib.request.build_opener(http_auth_handler)

response = opener.open(request)

# 
content = response.read()

print(content)
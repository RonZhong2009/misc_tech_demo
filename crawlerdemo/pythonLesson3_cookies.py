# -*- coding:utf-8 -*-
from http import cookiejar
import urllib.request  

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
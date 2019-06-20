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

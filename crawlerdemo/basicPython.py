# -*- coding:utf-8 -*-

import urllib.request

response=urllib.request.urlopen('https://cn.bing.com/search?q=ronzhong')
content=response.read()
print(content)

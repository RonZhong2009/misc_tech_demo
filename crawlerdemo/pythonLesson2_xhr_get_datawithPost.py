# -*- coding:utf-8 -*-
import urllib
import urllib.parse
import urllib.request  

#reference to https://www.jb51.net/article/92818.htm
url = 'https://movie.douban.com/j/new_search_subjects?sort=T&range=0,10'

#post data
submit_data = {
    'start':20,
    'tags':'动作'
}
#Convert a mapping object or a sequence of two-element tuples, 
# which may contain str or bytes objects, to a percent-encoded 
# ASCII text string. If the resultant string is to be used as 
# a data for POST operation with the urlopen() function, then 
# it should be encoded to bytes, otherwise it would result in a TypeError.
data = urllib.parse.urlencode(submit_data)
data.encode
binary_data = data.encode('utf-8')

headers = {
    "Accept" : "application/json, text/plain, */*",
    "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.7 Safari/537.36",
    "Accept-Language" : "zh-CN,zh;q=0.8"
}

#note taht: if we set data, pass data in the second argument means it's POST method
request = urllib.request.Request(url,binary_data,headers)

response = urllib.request.urlopen(request)

content = response.read()

with open('ActionMovies.json','wb+') as f:
    f.write(content)
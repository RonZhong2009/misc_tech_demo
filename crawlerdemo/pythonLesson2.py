# -*- coding:utf-8 -*-

#import the module needed
import urllib 
import urllib.request  

#learned from https://www.jianshu.com/p/8e024066f05a

#define a function to get the page against the url
def load_url(url,file_name):
    '''
    function: retrive the data with specific url 
    :param url: the target web page href
    :param file_name: the result file which store the web page
    :return: the web page data
    '''
    print('start to retireve the content into %s '%file_name)
    #retireve the web page
    my_headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36',
    }
    request = urllib.request.Request(url,headers=my_headers)
    content = urllib.request.urlopen(request).read()
    print('finish to retieve the content of %s！'%file_name)
    return content

#define a function to save data into a file
def save_data(data,file_name):
    '''
    function: store the data
    :param data: the data will be saved
    :param file_name: the file which being used to save data
    :return: none
    '''
    print('start to save %s'%file_name)

    with open(file_name,'wb+') as f:
        f.write(data)
    print('saved the content into %s！'%file_name)


#define a function to configure the crawler
def spider(url,begin,end):
    '''
    dispatch the core tasks
    :param url: the target url 
    :param begin: start page number
    :param end: end page number
    :return: none
    '''
    for page in range(begin,end+1):
        #cacatenate the full url 
        full_url = url + str(page)
        #define a file name to save the web page
        file_name = 'savedWebPage'+str(page) +'.html'
        #call the real function to retrieve data
        html=load_url(full_url,file_name)
        #save the data into file
        save_data(html,file_name)

#the main entry for program
if __name__ == '__main__':
    #client input the data
    url='http://www.ditiezu.com/forum.php?mod=forumdisplay&fid=39&typeid=320&typeid=320&filter=typeid&page='
    begin = int(input('please enter the starting number of web page：'))
    end = int(input('please enter the ending number of web page：'))

    #start to launch the spider with the inputs
    spider(url,begin,end)
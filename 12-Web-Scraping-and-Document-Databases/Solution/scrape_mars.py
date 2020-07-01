from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
import datetime as datetime 
import time
import re
import json

def scrape_all():
    #Setup
    executable_path = {'executable_path': r"C:\Users\Maxi\Desktop\chromedriver_win32\chromedriver.exe"}
    browser = Browser('chrome', **executable_path, headless=False)
    
    url = 'https://mars.nasa.gov/news/'
    browser.visit(url)
    
    html = browser.html
    soup = BeautifulSoup(html, "lxml")
    
    #NASA Mars News class
    news_titles = soup.find_all(class_="content_title")
    subheader = soup.find_all(class_="article_teaser_body")
    
    first = "" 
    for news in news_titles:
        if news.a:
            first = news
            break
            
    title = first.a.text.strip()
    texts = subheader[0].text.strip()
    link_nasa = "https://mars.nasa.gov" + first.a['href']
    
    # JPL Mars Space Images - Featured Image
    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, "lxml")
    
    featured_image = soup.find_all(class_="carousel_item")
    image_url = 'https://www.jpl.nasa.gov' + featured_image[0]["style"].split(" ")[1].split("'")[1]
    
    # Mars Weather
    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, "lxml")
    
    twitter = soup.find_all("span")
    tweeterText = ""
    for tweet in twitter:
        if tweet.text:
            if "InSight sol" in tweet.text:
                tweeterText = tweet.text
                break


    twitter_url = soup.find_all("a")
    url = ""
    for link in twitter_url:
        if link['href']:
            if "status" in link["href"]:
                url = "https://www.twitter.com" + link["href"]
                break
    
    # Mars Facts
    url = 'https://space-facts.com/mars/'
    browser.visit(url)
    html = browser.html
    
    dfs = pd.read_html(html)
    stats = dfs[0]
    stats.columns = ["Attribute", "Value"]
    
    data_html = stats.to_html(index=True)
    data_stats = json.loads(stats.to_json(orient="records"))
    
    browser.quit()
    
    # Dictionary
    dictionary = {
        "title": title,
        "text": texts,
        "link": link_nasa,
        "featureImageURL": image_url,
        "tweeterWeatherURL": url,
        "tweetWeather": tweeterText,
        "marsStatsHTML": data_html,
        "marsStats": data_stats,
        "active": 1,
        "dateScraped": datetime.datetime.now()
    }
    
    return dictionary

if __name__ == "__main__":

    print(scrape_all())
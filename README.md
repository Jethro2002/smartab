# 欢迎使用便捷的Smartab！
在主流浏览器上高效收藏文本。
****

## 更新日志
更新日志请跳转至：[http://test.jieck.cn/index.php/archives/10/](http://test.jieck.cn/index.php/archives/10/)  

## 制作背景
一天我仍旧写着我的垃圾代码，相信很多人都有同样的经历，一段很常用的代码也会经常忘记，例如HTML中CSS/JS的引入，我常常要去百度其格式。Chrome浏览器的新标签页没有收藏夹和搜索框，因为它们集成在了浏览器顶部，即便我之前给文档网页设置了收藏，因为收藏的网址太多，常常需要找半天，而重新百度搜索又太烦。  
  
为了一口气彻底解决这个问题，我制作了Smartab的初始版本，当时不断寻找HTML5中收藏文本的最佳方法，cookie有时间过期限制，并且管理起来不怎么方便，后来经朋友推荐，使用了HTML5中的localStorage，它可以将数据永久储存。于是花了一个下午时间，用localStorage制作出了Smartab初代，当时也并没有取名叫Smartab，单纯叫“收藏夹”。  
  
![图片加载失败](https://raw.githubusercontent.com/Jieck2002/smartab/master/screenshots/0.png "Smartab初代")  

初代的版本是没有搜索框的，在原来Chrome新标签页中，可以自动获取焦点到顶部地址栏直接搜索。设置自定义新标签页后因为Smartab目录占用了地址栏，所以无法自动对焦，于是我做了一个百度的搜索框，利用JS在打开新标签页的时候获取对焦到搜索框，这样就出现了Smartab 1.0版本。  
  
![图片加载失败](https://raw.githubusercontent.com/Jieck2002/smartab/master/screenshots/10.png "Smartab 1.0")  

随着标签的增加，这个新标签页变得和收藏夹一样繁杂，随后我寻找到了解决方案：更改常用标签的颜色使其变得更显眼。与此同时，通过Smart和tab的结合，命名这个项目为Smartab，推出Smartab 1.1版本。这个版本支持将标签设置为红色。  

![图片加载失败](https://raw.githubusercontent.com/Jieck2002/smartab/master/screenshots/11.png "Smartab 1.1")  
  
Smartab，聪明的标签，不仅仅使用于网址收藏，在1.1.5更新界面加入Bootstrap后，1.2版本新增“记事标签”和“复制标签”，“记事标签”可以帮使用者记录各种文本，并且可以显示HTML代码，“复制标签”则可以在点击标签后，复制之前设置的内容。同时，这个版本支持将标签设置为红色和蓝色。  
  
![图片加载失败](https://raw.githubusercontent.com/Jieck2002/smartab/master/screenshots/12.png "Smartab 1.2")  
  
## 未来发展
未来我会持续更新Smartab，并将其作为一个主要开发项目。目前的1.2.2版本中，拥有了beta中的历史记录显示，在之后的版本会将其优化补全。预计在1.3版本，支持标签的信息更改。同时预计在1.4版本，会支持标签的位置改动。  
  
## 赞助作者
![图片加载失败](https://raw.githubusercontent.com/Jieck2002/smartab/master/screenshots/alipay.jpg "支付宝")  
![图片加载失败](https://raw.githubusercontent.com/Jieck2002/smartab/master/screenshots/wechat_pay.png "微信支付")  
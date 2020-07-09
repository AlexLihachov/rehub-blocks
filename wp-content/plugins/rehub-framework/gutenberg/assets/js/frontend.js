var frontend=function(e){function t(r){if(i[r])return i[r].exports;var n=i[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,r){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=402)}({402:function(e,t,i){"use strict";window.NodeList&&!window.NodeList.prototype.forEach&&(window.NodeList.prototype.forEach=Array.prototype.forEach);var r=i(403);r.keys().forEach(function(e){return r(e)})},403:function(e,t,i){function r(e){return i(n(e))}function n(e){var t=s[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var s={"./slider/frontend.js":404};r.keys=function(){return Object.keys(s)},r.resolve=n,e.exports=r,r.id=403},404:function(e,t,i){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(i(405));window.rehubSlider=function(){function e(e){this.sliderNode=e,this.currentSlideIndex=0,this.setupElements()}var t=e.prototype;return t.setupElements=function(){this.$prevArrow=jQuery(this.sliderNode).find(".rh-slider-arrow--prev"),this.$nextArrow=jQuery(this.sliderNode).find(".rh-slider-arrow--next"),this.$items=jQuery(this.sliderNode).find(".rh-slider-item"),this.$thumbs=jQuery(this.sliderNode).find(".rh-slider-thumbs-item"),this.$dots=jQuery(this.sliderNode).find(".rh-slider-dots__item")},t.getSlideIndex=function(e){return"right"===e?(this.$items.length===this.currentSlideIndex+1&&(this.currentSlideIndex=-1),this.currentSlideIndex+=1):(0===this.currentSlideIndex&&(this.currentSlideIndex=this.$items.length),this.currentSlideIndex-=1),this.currentSlideIndex},t.removeActiveClasses=function(){this.$items.each(function(e,t){jQuery(t).removeClass("rh-slider-item--visible")}),this.$thumbs.each(function(e,t){jQuery(t).removeClass("rh-slider-thumbs-item--active")}),this.$dots.each(function(e,t){jQuery(t).removeClass("rh-slider-dots__item--active")})},t.moveSlide=function(e){this.removeActiveClasses(),this.$items.eq(e).addClass("rh-slider-item--visible"),this.$thumbs.eq(e).addClass("rh-slider-thumbs-item--active"),this.$dots.eq(e).addClass("rh-slider-dots__item--active")},t.addListeners=function(){var e=this,t=this;this.$prevArrow.on("click.bind",function(t){t.preventDefault(),e.moveSlide(e.getSlideIndex())}),this.$nextArrow.on("click.bind",function(t){t.preventDefault(),e.moveSlide(e.getSlideIndex("right"))}),this.$thumbs.each(function(e,i){jQuery(i).on("click.bind",function(i){i.preventDefault(),t.currentSlideIndex=e,t.moveSlide(e)})}),this.$dots.each(function(e,i){jQuery(i).on("click.bind",function(i){i.preventDefault(),t.currentSlideIndex=e,t.moveSlide(e)})})},t.removeListeners=function(){this.$prevArrow.off("click.bind"),this.$nextArrow.off("click.bind"),this.$thumbs.each(function(e,t){jQuery(t).off("click.bind")}),this.$dots.each(function(e,t){jQuery(t).off("click.bind")})},t.swipeDetect=function(){var e,t,i,r=this,n=this.sliderNode.querySelectorAll(".rh-slider-item img");Array.prototype.forEach.call(n,function(n){n.addEventListener("touchstart",function(i){var r=i.changedTouches[0];e="none",t=r.pageX,i.preventDefault()},!1),n.addEventListener("touchmove",function(e){e.preventDefault()},!1),n.addEventListener("touchend",function(n){if(n.target.className.indexOf("rh-slider-arrow--prev")>=0)return void r.$prevArrow.trigger("click.bind");if(n.target.className.indexOf("rh-slider-arrow--next")>=0)return void r.$nextArrow.trigger("click.bind");var s=n.changedTouches[0];i=s.pageX-t,Math.abs(i)>=100&&(e=i<0?"right":"left"),r.moveSlide(r.getSlideIndex(e)),n.preventDefault()},!1)})},t.init=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.$items.eq(e).addClass("rh-slider-item--visible"),this.$thumbs.eq(e).addClass("rh-slider-thumbs-item--active"),this.$dots.eq(e).addClass("rh-slider-dots__item--active"),this.addListeners(),this.swipeDetect()},t.update=function(){this.removeActiveClasses(),this.removeListeners(),this.setupElements(),this.init(this.currentSlideIndex)},t.destroy=function(){this.removeActiveClasses(),this.removeListeners()},e}(),(0,r.default)(function(){var e=jQuery(".js-hook__slider");if(0===e.length)return!1;e.each(function(e,t){new window.rehubSlider(t).init()})})},405:function(e,t,i){"use strict";function r(e){if("complete"===document.readyState||"interactive"===document.readyState)return void e();document.addEventListener("DOMContentLoaded",e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r}});
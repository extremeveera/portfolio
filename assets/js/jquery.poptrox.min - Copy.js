'use strict';
!function($) {
  /**
   * @return {?}
   */
  $.fn.poptrox_disableSelection = function() {
    return $(this).css("user-select", "none").css("-khtml-user-select", "none").css("-moz-user-select", "none").css("-o-user-select", "none").css("-webkit-user-select", "none");
  };
  /**
   * @param {?} base
   * @return {?}
   */
  $.fn.poptrox = function(base) {
    /**
     * @return {undefined}
     */
    function refresh() {
      i = $(window).width();
      resampleValue = $(window).height() + options.windowHeightPad;
      /** @type {number} */
      var nC = Math.abs($this.width() - $this.outerWidth());
      /** @type {number} */
      var tap = Math.abs($this.height() - $this.outerHeight());
      /** @type {number} */
      var bottom_px = (item.width(), item.height(), i - 2 * options.windowMargin - nC);
      /** @type {number} */
      var meterPos = resampleValue - 2 * options.windowMargin - tap;
      $this.css("min-width", options.popupWidth).css("min-height", options.popupHeight);
      $elm.children().css("max-width", bottom_px).css("max-height", meterPos);
    }
    if (0 == this.length) {
      return $(this);
    }
    if (this.length > 1) {
      /** @type {number} */
      var i = 0;
      for (; i < this.length; i++) {
        $(this[i]).poptrox(base);
      }
      return $(this);
    }
    var i;
    var resampleValue;
    var options = $.extend({
      preload : false,
      baseZIndex : 1e3,
      fadeSpeed : 300,
      overlayColor : "#000000",
      overlayOpacity : .6,
      overlayClass : "poptrox-overlay",
      windowMargin : 50,
      windowHeightPad : 0,
      selector : "a",
      caption : null,
      parent : "body",
      popupSpeed : 300,
      popupWidth : 200,
      popupHeight : 100,
      popupIsFixed : false,
      useBodyOverflow : false,
      usePopupEasyClose : true,
      usePopupForceClose : false,
      usePopupLoader : true,
      usePopupCloser : true,
      usePopupCaption : false,
      usePopupNav : false,
      usePopupDefaultStyling : true,
      popupBackgroundColor : "#FFFFFF",
      popupTextColor : "#000000",
      popupLoaderTextSize : "2em",
      popupCloserBackgroundColor : "#000000",
      popupCloserTextColor : "#FFFFFF",
      popupCloserTextSize : "20px",
      popupPadding : 10,
      popupCaptionHeight : 60,
      popupCaptionTextSize : null,
      popupBlankCaptionText : "(untitled)",
      popupCloserText : "&#215;",
      popupLoaderText : "&bull;&bull;&bull;&bull;",
      popupClass : "poptrox-popup",
      popupSelector : null,
      popupLoaderSelector : ".loader",
      popupCloserSelector : ".closer",
      popupCaptionSelector : ".caption",
      popupNavPreviousSelector : ".nav-previous",
      popupNavNextSelector : ".nav-next",
      onPopupClose : null,
      onPopupOpen : null
    }, base);
    var field = $(this);
    var $body = $("body");
    var self = $('<div class="' + options.overlayClass + '"></div>');
    var $window = $(window);
    /** @type {!Array} */
    var list = [];
    /** @type {number} */
    var current = 0;
    /** @type {boolean} */
    var swapFrontSource = false;
    /** @type {!Array} */
    var f = new Array;
    if (!options.usePopupLoader) {
      /** @type {null} */
      options.popupLoaderSelector = null;
    }
    if (!options.usePopupCloser) {
      /** @type {null} */
      options.popupCloserSelector = null;
    }
    if (!options.usePopupCaption) {
      /** @type {null} */
      options.popupCaptionSelector = null;
    }
    if (!options.usePopupNav) {
      /** @type {null} */
      options.popupNavPreviousSelector = null;
      /** @type {null} */
      options.popupNavNextSelector = null;
    }
    var $this;
    $this = $(options.popupSelector ? options.popupSelector : '<div class="' + options.popupClass + '">' + (options.popupLoaderSelector ? '<div class="loader">' + options.popupLoaderText + "</div>" : "") + '<div class="pic"></div>' + (options.popupCaptionSelector ? '<div class="caption"></div>' : "") + (options.popupCloserSelector ? '<span class="closer">' + options.popupCloserText + "</span>" : "") + (options.popupNavPreviousSelector ? '<div class="nav-previous"></div>' : "") + (options.popupNavNextSelector ? 
    '<div class="nav-next"></div>' : "") + "</div>");
    var $elm = $this.find(".pic");
    var item = $();
    var preview = $this.find(options.popupLoaderSelector);
    var container = $this.find(options.popupCaptionSelector);
    var el = $this.find(options.popupCloserSelector);
    var $outline = $this.find(options.popupNavNextSelector);
    var rect = $this.find(options.popupNavPreviousSelector);
    var $elem = $outline.add(rect);
    if (options.usePopupDefaultStyling && ($this.css("background", options.popupBackgroundColor).css("color", options.popupTextColor).css("padding", options.popupPadding + "px"), container.length > 0 && ($this.css("padding-bottom", options.popupCaptionHeight + "px"), container.css("position", "absolute").css("left", "0").css("bottom", "0").css("width", "100%").css("text-align", "center").css("height", options.popupCaptionHeight + "px").css("line-height", options.popupCaptionHeight + "px"), options.popupCaptionTextSize && 
    container.css("font-size", popupCaptionTextSize)), el.length > 0 && el.html(options.popupCloserText).css("font-size", options.popupCloserTextSize).css("background", options.popupCloserBackgroundColor).css("color", options.popupCloserTextColor).css("display", "block").css("width", "40px").css("height", "40px").css("line-height", "40px").css("text-align", "center").css("position", "absolute").css("text-decoration", "none").css("outline", "0").css("top", "0").css("right", "-40px"), preview.length > 
    0 && preview.html("").css("position", "relative").css("font-size", options.popupLoaderTextSize).on("startSpinning", function(canCreateDiscussions) {
      var $img = $("<div>" + options.popupLoaderText + "</div>");
      $img.css("height", Math.floor(options.popupHeight / 2) + "px").css("overflow", "hidden").css("line-height", Math.floor(options.popupHeight / 2) + "px").css("text-align", "center").css("margin-top", Math.floor(($this.height() - $img.height() + (container.length > 0 ? container.height() : 0)) / 2)).css("color", options.popupTextColor ? options.popupTextColor : "").on("xfin", function() {
        $img.fadeTo(300, .5, function() {
          $img.trigger("xfout");
        });
      }).on("xfout", function() {
        $img.fadeTo(300, .05, function() {
          $img.trigger("xfin");
        });
      }).trigger("xfin");
      preview.append($img);
    }).on("stopSpinning", function(canCreateDiscussions) {
      var $welem = preview.find("div");
      $welem.remove();
    }), 2 == $elem.length)) {
      $elem.css("font-size", "75px").css("text-align", "center").css("color", "#fff").css("text-shadow", "none").css("height", "100%").css("position", "absolute").css("top", "0").css("opacity", "0.35").css("cursor", "pointer").css("box-shadow", "inset 0px 0px 10px 0px rgba(0,0,0,0)").poptrox_disableSelection();
      var rightMargin;
      var fg_color;
      if (options.usePopupEasyClose) {
        /** @type {string} */
        rightMargin = "100px";
        /** @type {string} */
        fg_color = "100px";
      } else {
        /** @type {string} */
        rightMargin = "75%";
        /** @type {string} */
        fg_color = "25%";
      }
      $outline.css("right", "0").css("width", rightMargin).html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; right: 0; margin-top: -50px;">&gt;</div>');
      rect.css("left", "0").css("width", fg_color).html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; left: 0; margin-top: -50px;">&lt;</div>');
    }
    return $window.on("resize orientationchange", function() {
      refresh();
    }), container.on("update", function(canCreateDiscussions, o) {
      if (!(o && 0 != o.length)) {
        o = options.popupBlankCaptionText;
      }
      container.html(o);
    }), el.css("cursor", "pointer").on("click", function(event) {
      return event.preventDefault(), event.stopPropagation(), $this.trigger("poptrox_close"), true;
    }), $outline.on("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      $this.trigger("poptrox_next");
    }), rect.on("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      $this.trigger("poptrox_previous");
    }), self.css("position", "fixed").css("left", 0).css("top", 0).css("z-index", options.baseZIndex).css("width", "100%").css("height", "100%").css("text-align", "center").css("cursor", "pointer").appendTo(options.parent).prepend('<div style="display:inline-block;height:100%;vertical-align:middle;"></div>').append('<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:' + options.overlayColor + ";opacity:" + options.overlayOpacity + ";filter:alpha(opacity=" + 100 * options.overlayOpacity + 
    ');"></div>').hide().on("touchmove", function(canCreateDiscussions) {
      return false;
    }).on("click", function(event) {
      event.preventDefault();
      event.stopPropagation();
      $this.trigger("poptrox_close");
    }), $this.css("display", "inline-block").css("vertical-align", "middle").css("position", "relative").css("z-index", 1).css("cursor", "auto").appendTo(self).hide().on("poptrox_next", function() {
      var next = current + 1;
      if (next >= list.length) {
        /** @type {number} */
        next = 0;
      }
      $this.trigger("poptrox_switch", [next]);
    }).on("poptrox_previous", function() {
      /** @type {number} */
      var next = current - 1;
      if (0 > next) {
        /** @type {number} */
        next = list.length - 1;
      }
      $this.trigger("poptrox_switch", [next]);
    }).on("poptrox_reset", function() {
      refresh();
      $this.data("width", options.popupWidth).data("height", options.popupHeight);
      preview.hide().trigger("stopSpinning");
      container.hide();
      el.hide();
      $elem.hide();
      $elm.hide();
      item.attr("src", "").detach();
    }).on("poptrox_open", function(canCreateDiscussions, data) {
      return swapFrontSource ? true : (swapFrontSource = true, options.useBodyOverflow && $body.css("overflow", "hidden"), options.onPopupOpen && options.onPopupOpen(), $this.addClass("loading"), void self.fadeTo(options.fadeSpeed, 1, function() {
        $this.trigger("poptrox_switch", [data, true]);
      }));
    }).on("poptrox_switch", function(canCreateDiscussions, val, isSlidingUp) {
      var data;
      if (!isSlidingUp && swapFrontSource) {
        return true;
      }
      if (swapFrontSource = true, $this.addClass("loading").css("width", $this.data("width")).css("height", $this.data("height")), container.hide(), item.attr("src") && item.attr("src", ""), item.detach(), data = list[val], item = data.object, item.off("load"), $elm.css("text-indent", "-9999px").show().append(item), "ajax" == data.type ? $.get(data.src, function(dashboardPageTemplate) {
        item.html(dashboardPageTemplate);
        item.trigger("load");
      }) : item.attr("src", data.src), "image" != data.type) {
        var n;
        var a;
        n = data.width;
        a = data.height;
        if ("%" == n.slice(-1)) {
          /** @type {number} */
          n = parseInt(n.substring(0, n.length - 1)) / 100 * $window.width();
        }
        if ("%" == a.slice(-1)) {
          /** @type {number} */
          a = parseInt(a.substring(0, a.length - 1)) / 100 * $window.height();
        }
        item.css("position", "relative").css("outline", "0").css("z-index", options.baseZIndex + 100).width(n).height(a);
      }
      preview.trigger("startSpinning").fadeIn(300);
      $this.show();
      if (options.popupIsFixed) {
        $this.removeClass("loading").width(options.popupWidth).height(options.popupHeight);
        item.load(function() {
          item.off("load");
          preview.hide().trigger("stopSpinning");
          container.trigger("update", [data.captionText]).fadeIn(options.fadeSpeed);
          el.fadeIn(options.fadeSpeed);
          $elm.css("text-indent", 0).hide().fadeIn(options.fadeSpeed, function() {
            /** @type {boolean} */
            swapFrontSource = false;
          });
          /** @type {number} */
          current = val;
          $elem.fadeIn(options.fadeSpeed);
        });
      } else {
        item.load(function() {
          refresh();
          item.off("load");
          preview.hide().trigger("stopSpinning");
          var width = item.width();
          var height = item.height();
          /**
           * @return {undefined}
           */
          var complete = function() {
            container.trigger("update", [data.captionText]).fadeIn(options.fadeSpeed);
            el.fadeIn(options.fadeSpeed);
            $elm.css("text-indent", 0).hide().fadeIn(options.fadeSpeed, function() {
              /** @type {boolean} */
              swapFrontSource = false;
            });
            /** @type {number} */
            current = val;
            $elem.fadeIn(options.fadeSpeed);
            $this.removeClass("loading").data("width", width).data("height", height).css("width", "auto").css("height", "auto");
          };
          if (width == $this.data("width") && height == $this.data("height")) {
            complete();
          } else {
            $this.animate({
              width : width,
              height : height
            }, options.popupSpeed, "swing", complete);
          }
        });
      }
      if ("image" != data.type) {
        item.trigger("load");
      }
    }).on("poptrox_close", function() {
      return swapFrontSource && !options.usePopupForceClose ? true : (swapFrontSource = true, $this.hide().trigger("poptrox_reset"), options.onPopupClose && options.onPopupClose(), void self.fadeOut(options.fadeSpeed, function() {
        if (options.useBodyOverflow) {
          $body.css("overflow", "auto");
        }
        /** @type {boolean} */
        swapFrontSource = false;
      }));
    }).trigger("poptrox_reset"), options.usePopupEasyClose ? (container.on("click", "a", function(event) {
      event.stopPropagation();
    }), $this.css("cursor", "pointer").on("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      $this.trigger("poptrox_close");
    })) : $this.on("click", function(event) {
      event.stopPropagation();
    }), $window.keydown(function(event) {
      if ($this.is(":visible")) {
        switch(event.keyCode) {
          case 37:
          case 32:
            if (options.usePopupNav) {
              return $this.trigger("poptrox_previous"), false;
            }
            break;
          case 39:
            if (options.usePopupNav) {
              return $this.trigger("poptrox_next"), false;
            }
            break;
          case 27:
            return $this.trigger("poptrox_close"), false;
        }
      }
    }), field.find(options.selector).each(function(data) {
      var data;
      var result;
      var item = $(this);
      var s = item.find("img");
      var e = item.data("poptrox");
      if ("ignore" != e && item.attr("href")) {
        if (data = {
          src : item.attr("href"),
          captionText : s.attr("title"),
          width : null,
          height : null,
          type : null,
          object : null,
          options : null
        }, options.caption) {
          if ("function" == typeof options.caption) {
            c = options.caption(item);
          } else {
            if ("selector" in options.caption) {
              var $link;
              $link = item.find(options.caption.selector);
              if ("attribute" in options.caption) {
                c = $link.attr(options.caption.attribute);
              } else {
                c = $link.html();
                if (options.caption.remove === true) {
                  $link.remove();
                }
              }
            }
          }
        } else {
          c = s.attr("title");
        }
        if (data.captionText = c, e) {
          var args = e.split(",");
          if (0 in args) {
            data.type = args[0];
          }
          if (1 in args) {
            result = args[1].match(/([0-9%]+)x([0-9%]+)/);
            if (result && 3 == result.length) {
              data.width = result[1];
              data.height = result[2];
            }
          }
          if (2 in args) {
            data.options = args[2];
          }
        }
        if (!data.type) {
          switch(result = data.src.match(/\/\/([a-z0-9\.]+)\/.*/), (!result || result.length < 2) && (result = [false]), result[1]) {
            case "api.soundcloud.com":
              /** @type {string} */
              data.type = "soundcloud";
              break;
            case "youtu.be":
              /** @type {string} */
              data.type = "youtube";
              break;
            case "vimeo.com":
              /** @type {string} */
              data.type = "vimeo";
              break;
            case "wistia.net":
              /** @type {string} */
              data.type = "wistia";
              break;
            case "bcove.me":
              /** @type {string} */
              data.type = "bcove";
              break;
            default:
              /** @type {string} */
              data.type = "image";
          }
        }
        switch(result = data.src.match(/\/\/[a-z0-9\.]+\/(.*)/), data.type) {
          case "iframe":
            data.object = $('<iframe src="" frameborder="0"></iframe>');
            data.object.on("click", function(event) {
              event.stopPropagation();
            }).css("cursor", "auto");
            if (!(data.width && data.height)) {
              /** @type {string} */
              data.width = "600";
              /** @type {string} */
              data.height = "400";
            }
            break;
          case "ajax":
            data.object = $('<div class="poptrox-ajax"></div>');
            data.object.on("click", function(event) {
              event.stopPropagation();
            }).css("cursor", "auto").css("overflow", "auto");
            if (!(data.width && data.height)) {
              /** @type {string} */
              data.width = "600";
              /** @type {string} */
              data.height = "400";
            }
            break;
          case "soundcloud":
            data.object = $('<iframe scrolling="no" frameborder="no" src=""></iframe>');
            /** @type {string} */
            data.src = "//w.soundcloud.com/player/?url=" + escape(data.src) + (data.options ? "&" + data.options : "");
            /** @type {string} */
            data.width = "600";
            /** @type {string} */
            data.height = "166";
            break;
          case "youtube":
            data.object = $('<iframe src="" frameborder="0" allowfullscreen="1"></iframe>');
            /** @type {string} */
            data.src = "//www.youtube.com/embed/" + result[1] + (data.options ? "?" + data.options : "");
            if (!(data.width && data.height)) {
              /** @type {string} */
              data.width = "800";
              /** @type {string} */
              data.height = "480";
            }
            break;
          case "vimeo":
            data.object = $('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>');
            /** @type {string} */
            data.src = "//player.vimeo.com/video/" + result[1] + (data.options ? "?" + data.options : "");
            if (!(data.width && data.height)) {
              /** @type {string} */
              data.width = "800";
              /** @type {string} */
              data.height = "480";
            }
            break;
          case "wistia":
            data.object = $('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>');
            /** @type {string} */
            data.src = "//fast.wistia.net/" + result[1] + (data.options ? "?" + data.options : "");
            if (!(data.width && data.height)) {
              /** @type {string} */
              data.width = "800";
              /** @type {string} */
              data.height = "480";
            }
            break;
          case "bcove":
            data.object = $('<iframe src="" frameborder="0" allowFullScreen="1" width="100%"></iframe>');
            /** @type {string} */
            data.src = "//bcove.me/" + result[1] + (data.options ? "?" + data.options : "");
            if (!(data.width && data.height)) {
              /** @type {string} */
              data.width = "640";
              /** @type {string} */
              data.height = "360";
            }
            break;
          default:
            if (data.object = $('<img src="" alt="" style="vertical-align:bottom" />'), options.preload) {
              /** @type {!Element} */
              result = document.createElement("img");
              result.src = data.src;
              f.push(result);
            }
            data.width = item.attr("width");
            data.height = item.attr("height");
        }
        if ("file:" == window.location.protocol && data.src.match(/^\/\//)) {
          /** @type {string} */
          data.src = "http:" + data.src;
        }
        list.push(data);
        s.removeAttr("title");
        item.removeAttr("href").css("cursor", "pointer").css("outline", 0).on("click", function(event) {
          event.preventDefault();
          event.stopPropagation();
          $this.trigger("poptrox_open", [data]);
        });
      }
    }), field.prop("_poptrox", options), field;
  };
}(jQuery);

!function(a){a.fn.extend({muffingroup_menu:function(s){var l=a(this),n={addLast:!1,animation:"fade",arrows:!1,delay:100,hoverClass:"hover"};s=a.extend(n,s),l.find("li:has(ul)").addClass("submenu").append("<span class='menu-toggle'>"),l.children("li:has(ul.mfn-megamenu)").addClass("mfn-megamenu-parent"),a(".submenu ul li:last-child",l).addClass("last-item"),s.addLast&&a("> li:last-child",l).addClass("last").prev().addClass("last"),s.arrows&&l.find("li ul li:has(ul) > a").append("<i class='menu-arrow icon-right-open'></i>"),l.find("> li, ul:not(.mfn-megamenu) li").hover(function(){a(this).stop(!0,!0).addClass(s.hoverClass),"fade"===s.animation?a(this).children("ul").stop(!0,!0).fadeIn(s.delay):"toggle"===s.animation&&a(this).children("ul").stop(!0,!0).slideDown(s.delay)},function(){a(this).stop(!0,!0).removeClass(s.hoverClass),"fade"===s.animation?a(this).children("ul").stop(!0,!0).fadeOut(s.delay):"toggle"===s.animation&&a(this).children("ul").stop(!0,!0).slideUp(s.delay)})}})}(jQuery);
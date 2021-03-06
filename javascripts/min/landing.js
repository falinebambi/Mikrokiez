var home = {
    init: function() {
        $about = $("#about"), this.anim = $("#anim"), this.eye = $("#london-eye"), this.landmark = $("#landmark-cities"), this.wh_elements = $("#banner, #share_links"), this.planes = $("#planes"), this.city_svg = $(".city-svg"), this.banner = $("#banner"), this.header = $("header"), this.img = this.city_svg.find("img,svg"), self = home, $(window).resize(this.resize), this.resize(), $(".trigger__about").on("click", function(e) {
            $about.fadeIn()
        }), $(".trigger__close").click(function() {
            $about.fadeOut()
        }), $("#arrow-down").click(function() {
            $("html,body").animate({
                scrollTop: $(window).height() + "px"
            }, 500)
        })
    },
    resize: function() {
        if ($hh = home.header.height(), $wh = $(window).height(), $bh = home.banner.width(), $ah = 1 - $hh / $wh, $anim_w = home.anim.width(), home.wh_elements.css("height", $wh), !home.landmark.length) {
            var e = $(document).find(".home").length;
            0 == e && home.anim.height(100 * $ah + "%"), home.planes.length && ($ih = home.img.height(), $bot_pos = $ih + 50, $hh + 100 > home.img.offset().top && ($bot_pos = $ih), home.planes.css({
                bottom: $bot_pos + "px"
            })), home.eye.length ? ($img_h = home.img.height(), home.eye.find("svg").css({
                height: $img_h + "px",
                width: $img_h + "px",
                marginLeft: -.5 * $img_h
            }).end().fadeIn()) : $("#birds").length && ($(".b2").css("left", .6 * $bh + "px"), $(".b1").css("left", .5 * $bh + "px")), window.setTimeout(function() {
                home.img.css("marginLeft", ($anim_w - home.img.width()) / 2 + "px"), home.city_svg.addClass("loaded")
            }, 0)
        }
    }
};
$(function() {
    home.init()
});

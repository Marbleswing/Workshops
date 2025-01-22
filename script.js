class Constants {
    static get menu_main() {
        return "menu-main";
    }
    static get menu_trekking() {
        return "menu-trekking";
    }
}

function menu_switch(menu) {
    if ($("#" + menu).length == 0) {
        menu = Constants.menu-main;
    }

    let shown = $(".menu").filter(":visible")

    if (shown.length && shown[0].id == menu) {
        return;
    }
    if (shown.length) {
        shown.hide("slow", function() {
            $("#" + menu).show("slow");
        });
    } else {
        $("#" + menu).show("slow");
    }
}



$(document).ready(function() {
    $("#ws-trekking").on("click", function() {
        menu_switch("menu-trekking");
    });
    $("#book-trekking").on("click", function() {
        menu_switch("menu-trekking-book");
    });
    $("#back-trekking").on("click", function() {
        menu_switch("menu-trekking");
    });

    $("#ws-shear").on("click", function() {
        menu_switch("menu-shear");
    });
    $("#book-shear").on("click", function() {
        menu_switch("menu-shear-book");
    });
    $("#back-shear").on("click", function() {
        menu_switch("menu-shear");
    });

    $("#ws-felt").on("click", function() {
        menu_switch("menu-felt");
    });
    $("#book-felt").on("click", function() {
        menu_switch("menu-felt-book");
    });
    $("#back-felt").on("click", function() {
        menu_switch("menu-felt");
    });


    $(".book").on("click", function() {
        let element = $(this).parent();
        $(element).addClass('booked');
        $('#message-booked').fadeIn(500).delay(3000).fadeOut(500);
    });
    $(".debook").on("click", function() {
        let element = $(this).parent();
        $(element).removeClass('booked');
        $('#message-debooked').fadeIn(500).delay(2000).fadeOut(500);
    });
    
    $(".back_main").on("click", function() {
        menu_switch("menu-main");
    });
    $('.termin').each(function(index, element) {
        if(Math.random() < 0.25){
            $(element).addClass("disable");
        }
    });
    menu_switch("menu-main");
});
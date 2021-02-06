$(function () {
    $("#main").css("background", "rgba(0,0,0,.8)");
});

let canvas = $("#main")[0],
    w = $("html").width(),
    h = $("html").height();
canvas.style.width = w;
canvas.style.height = h;
canvas.width = w;
canvas.height = h;
let ctx = canvas.getContext("2d");

function initos() {}

function view() {
    ctx.clearRect(0, 0, w, h);
    ctx.font = "15px Consolas";
    ctx.path(function (ctx) {
        ctx.fillStyle = "rgba(255,255,255,.3)";
        ctx.roundRect((w - osdatas.bottom.w) * .5, h - 20 - osdatas.bottom.h, osdatas.bottom.w, osdatas.bottom.h, 15);
        ctx.fill();
    });
    ctx.fillStyle = "#FFF";
    ctx.fillText(`(${mx}, ${my}) ::${mousedown}`, 5, h - 5);
    applyToView(ctx);
    osdatas.bottom.w += ( w * .7 - osdatas.bottom.w) * .05;
    osdatas.bottom.h += ( 80 - osdatas.bottom.h) * .05;
}

let osdatas = {
    bottom: {
        w: 0,
        h: 0,
        runs: []
    }
};

initos();

let main = new Window(500, 300);

main.main = function (ctx) {
    ctx.fillText("I'm a window! ", 5, 20);
}
main.mount();

let mx,
    my,
    click = false,
    host = false;
    mousedown = false;

window.setInterval(function () {
    w = $("html").width();
    h = $("html").height();
    canvas.style.width = w;
    canvas.style.height = h;
    canvas.width = w;
    canvas.height = h;
    view();
    click = false;
}, 0);
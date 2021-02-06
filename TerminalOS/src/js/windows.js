function Window(w, h) {
    let wd = new cw;
    wd.w = w;
    wd.h = h;
    return wd;
}

function applyToView(ctx) {
    for (let i = 0; i < indexes.length;i++) {
        windows[indexes[i]].main.applyto(windows[indexes[i]].x, windows[indexes[i]].y, ctx);
    }
}

class cw {
    wini;
    mx;
    my;
    lx;
    ly;
    host;
    w = 450;
    h = 300;
    visual = false;
    canmove = true;
    canzoom = true;
    main = function (ctx) {};

    mount () {
        windows.push({main: this, x: 0, y: 0});
        this.wini = windows.length - 1;
        indexes.push(this.wini);
    }
    delete () {
        if (this.wini) {
            indexes.splice(indexes.indexOf(this.wini), 1);
            windows.splice(this.wini, 1);
        }
    }
    in (x0, y0, dx, dy) {
        if (this.mx > x0 && this.mx < x0 + dx)
            if (this.my > y0 && this.my < y0 + dy)
                return true;
        return false;
    }
    applyto (x, y, ctx) {
        this.mx = mx - x;
        this.my = my - y;
        let vw = this.w,
            vh = this.h;
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = "rgba(255,255,255,.9)";
        ctx.roundRect(0, 0, vw, vh, 5);
        ctx.fill();
        ctx.clip();
        ctx.beginPath();
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, vw, 20);
        ctx.closePath();
        ctx.beginPath();
        if (this.in(5, 5, 10, 10)) ctx.fillStyle = "#C44";
        else ctx.fillStyle = "#E44";
        ctx.arc(10, 10, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        if (this.in(20, 5, 10, 10)) ctx.fillStyle = "#CC4";
        else ctx.fillStyle = "#EE4";
        ctx.arc(25, 10, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        if (this.in(35, 5, 10, 10)) ctx.fillStyle = "#4C4";
        else ctx.fillStyle = "#4E4";
        ctx.arc(40, 10, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.save();
        ctx.translate(0, 20);
        ctx.rect(0, 0, vw, vh - 20);
        ctx.clip();
        ctx.fillStyle = "#000";
        this.main(ctx);
        ctx.restore();
        ctx.closePath();
        ctx.restore();

        if (mousedown) {
            if (this.in(45, 0, vw - 45, 20)) {
                this.host = true;
            }
        } else {
            this.lx = mx;
            this.ly = my;
            this.host = false;
        }
        if (this.host) {
            windows[this.wini].x += mx - this.lx;
            windows[this.wini].y += my - this.ly;
            this.lx = mx;
            this.ly = my;
        }
    }
}

let windows = [],
    indexes = [];
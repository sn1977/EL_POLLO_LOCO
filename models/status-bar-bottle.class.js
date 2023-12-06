class StatusBarBottle extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    
    amountBottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setAmountBottles(0);
    }

    setAmountBottles(amountBottles) {
        this.amountBottles = amountBottles; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.amountBottles == 100) {
            return 5;
        } else if (this.amountBottles >= 80) {
            return 4;
        } else if (this.amountBottles >= 60) {
            return 3;
        } else if (this.amountBottles >= 40) {
            return 2;
        } else if (this.amountBottles >= 20) {
            return 1;
        } else
            return 0;
    }
}
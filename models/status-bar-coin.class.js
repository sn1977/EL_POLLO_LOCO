class StatusBarCoin extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    amountCoins = 0;
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setAmountCoins();
    }

    setAmountCoins(amountCoins) {
        this.amountCoins = amountCoins;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.amountCoins == 100) {
            return 5;
        } else if (this.amountCoins > 80) {
            return 4;
        } else if (this.amountCoins > 60) {
            return 3;
        } else if (this.amountCoins > 40) {
            return 2;
        } else if (this.amountCoins > 20) {
            return 1;
        } else
            return 0;
    }
}
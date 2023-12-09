class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.collisionsEnemies();
        this.collisionsCoins();
        this.collisionsBottles();
    }

    collisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    // collisionsCoins() {
    //     // Ein temporäres Array, um die Indizes der Münzen zu speichern, die entfernt werden sollen
    //     let coinsToRemove = [];
    //
    //     // Überprüfen Sie jede Münze auf Kollision
    //     this.level.coins.forEach((coin, index) => {
    //         if (this.character.isColliding(coin)) {
    //             this.character.collect();
    //             this.statusBarCoin.setAmountCoins(this.character.collectingObject);
    //
    //             // Speichern Sie den Index der Münze, die entfernt werden soll
    //             coinsToRemove.push(index);
    //         }
    //     });
    //
    //     // Entfernen Sie die Münzen, die kollidiert sind, in umgekehrter Reihenfolge
    //     for (let i = coinsToRemove.length - 1; i >= 0; i--) {
    //         this.level.coins.splice(coinsToRemove[i], 1);
    //     }
    // }
    //
    // collisionsBottles() {
    //     // Ein temporäres Array, um die Indizes der Flaschen zu speichern, die entfernt werden sollen
    //     let bottlesToRemove = [];
    //
    //     // Überprüfen Sie jede Münze auf Kollision
    //     this.level.bottles.forEach((bottle, index) => {
    //         if (this.character.isColliding(bottle)) {
    //             this.character.collect();
    //             this.statusBarBottle.setAmountBottles(this.character.collectingObject);
    //
    //             // Speichern Sie den Index der Münze, die entfernt werden soll
    //             bottlesToRemove.push(index);
    //         }
    //     });
    //
    //     // Entfernen Sie die Flaschen, die kollidiert sind, in umgekehrter Reihenfolge
    //     for (let i = bottlesToRemove.length - 1; i >= 0; i--) {
    //         this.level.bottles.splice(bottlesToRemove[i], 1);
    //     }
    // }

    collisionsWithObjects(objects, statusBar, updateStatusBar) {
        let objectsToRemove = [];

        objects.forEach((object, index) => {
            if (this.character.isColliding(object)) {
                this.character.collect();
                updateStatusBar.call(statusBar, this.character.collectingObject); // Verwenden des übergebenen statusBar-Objekts
                // updateStatusBar(this.character.collectingObject);
                // this.statusBarCoin.setAmountCoins.call(this.statusBarCoin, this.character.collectingObject);
                // this.statusBarBottle.setAmountBottles(this.character.collectingObject);
                objects.splice(index);
                // objectsToRemove.push(index);
            }
        });

        // for (let i = objectsToRemove.length - 1; i >= 0; i--) {
        //     objects.splice(objectsToRemove[i], 1);
        // }
    }

    collisionsCoins() {
        this.collisionsWithObjects(
            this.level.coins,
            this.statusBarCoin,
            this.statusBarCoin.setAmountCoins
        );
    }

    collisionsBottles() {
        this.collisionsWithObjects(
            this.level.bottles,
            this.statusBarBottle, // Übergeben des statusBarBottles Objekts
            this.statusBarBottle.setAmountBottles
        );
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottle.amountBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.setAmountBottles(this.statusBarBottle.amountBottles - 10); // Reduzieren der Anzahl der Flaschen
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        this.ctx.stroke();
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
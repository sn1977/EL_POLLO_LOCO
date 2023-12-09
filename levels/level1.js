// const level1 = new Level(
//     [
//         new Chicken(),
//         new Chicken(),
//         new Chicken(),
//         new Endboss()
//     ],
//     [
//         new Cloud()
//     ],
//     [
//         new BackgroundObject('img/5_background/layers/air.png', -719),
//         new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
//         new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
//         new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
//
//         new BackgroundObject('img/5_background/layers/air.png', 0),
//         new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
//         new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
//         new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
//         new BackgroundObject('img/5_background/layers/air.png', 719),
//         new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
//         new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
//         new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
//
//         new BackgroundObject('img/5_background/layers/air.png', 719*2),
//         new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
//         new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
//         new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
//         new BackgroundObject('img/5_background/layers/air.png', 719*3),
//         new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
//         new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
//         new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3)
//     ]
// );

const layers = [
    'air.png',
    '3_third_layer/2.png',
    '2_second_layer/2.png',
    '1_first_layer/2.png',
    'air.png',
    '3_third_layer/1.png',
    '2_second_layer/1.png',
    '1_first_layer/1.png'
];

const backgroundObjects = [];
const repeats = 4; // Wie oft das gesamte Muster wiederholt werden soll
const xIncrement = 719; // Verschiebung auf der x-Achse für jede Wiederholung

for (let repeat = 0; repeat < repeats; repeat++) {
    for (let i = 0; i < layers.length; i++) {
        const xPosition = repeat * xIncrement * 2 + (i >= layers.length / 2 ? xIncrement : 0);
        const imagePath = `img/5_background/layers/${layers[i]}`;
        backgroundObjects.push(new BackgroundObject(imagePath, xPosition));
    }
}

const coins = [];
for (let i = 0; i < 15; i++) {
    coins.push(new Coin());
}

const bottles = [];
for (let i = 0; i < 20; i++) {
    bottles.push(new Bottle());
}

const level1 = new Level(
    [ new Endboss()],
    [new Cloud()],
    backgroundObjects,
    coins,
    bottles
);


namespace SpriteKind {
    export const Boss = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.pewPew.play()
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . 4 4 2 2 2 4 4 . . . . . 
        . . . 2 2 2 2 1 2 2 2 2 . . . . 
        . 4 2 1 1 2 1 2 1 2 1 1 2 4 . . 
        4 4 2 1 2 1 1 2 1 1 2 1 2 4 4 . 
        . . 2 2 1 2 1 2 1 2 1 2 2 . . . 
        . . 2 2 1 1 2 2 2 1 1 2 2 . . . 
        . . . 2 1 2 . . . 2 1 2 . . . . 
        . . . . 2 . . . . . 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Spaceship1, 0, -70)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    BossLife += -1
    sprite.destroy(effects.halo, 500)
    if (BossLife == 0) {
        otherSprite.destroy(effects.halo, 500)
        info.stopCountdown()
        info.changeScoreBy(10)
    }
})
info.onCountdownEnd(function () {
    game.over(false, effects.slash)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
})
info.onLifeZero(function () {
    pause(500)
    Spaceship1.destroy()
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    pause(500)
    game.over(false, effects.slash)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy(effects.spray, 200)
    info.changeScoreBy(1)
})
let Astroid: Sprite = null
let BOSSY: Sprite = null
let BossLife = 0
let projectile: Sprite = null
let Spaceship1: Sprite = null
info.setLife(3)
info.setScore(0)
Spaceship1 = sprites.create(img`
    . . . . . . . 2 . . . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . 2 1 1 8 8 1 1 2 . . . . 
    . . . 2 2 1 1 8 8 1 1 2 2 . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . 2 1 1 1 1 1 1 2 . . . . 
    . . . 2 2 . 1 1 1 1 . 2 2 . . . 
    . . . 2 . . . . . . . . 2 . . . 
    . . 2 2 . . . . . . . . 2 2 . . 
    . . 2 . . . . . . . . . . 2 . . 
    `, SpriteKind.Player)
controller.moveSprite(Spaceship1, 100, 0)
Spaceship1.setFlag(SpriteFlag.StayInScreen, true)
Spaceship1.setPosition(75, 105)
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffdfffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffdfffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffdffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffff
    fffdfffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffff1fffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffdffffdffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffdffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffdfffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffdffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffdffffffffffdffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffff
    ffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffdfffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffdffffffffdfffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffddffffdfffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffdfffffdfffffffffffffffff
    ffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1dfffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffdffffffffffffffffffffffffffdffffffffffdffffffffffffffffffffffffffffffff
    fffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffdfffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffdfffffffffffffffffffffffffffdfffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffff
    ffffffffffdfffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffdffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffdfffffffffffffff1ffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffdfffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffdffffffffffffffffffffffffffffffff1fffffffffdffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffdfffffffffffffffffffffffffffffdfffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffdffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffdffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffff
    ffffffffdffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffff
    fffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffdfffffffffffffffffffdffffffffffffffffdfffffffffffdfffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffff
    ffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffff1ffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffdffffdfffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
game.onUpdate(function () {
    if (BOSSY.top > 0) {
        BOSSY.top = 0
        BOSSY.vx = 20
        BOSSY.vy = 0
    }
    if (BOSSY.right > scene.screenWidth()) {
        BOSSY.vx = -20
    } else if (BOSSY.left < 0) {
        BOSSY.vx = 20
    }
})
game.onUpdate(function () {
    if (info.score() == 75) {
        game.over(true, effects.smiles)
    }
})
game.onUpdate(function () {
    if (info.score() == 75) {
        game.over(true, effects.smiles)
    }
})
game.onUpdateInterval(1000, function () {
    Astroid = sprites.create(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, SpriteKind.Enemy)
    Astroid.setPosition(randint(0, scene.screenWidth()), 0)
    Astroid.ay = 100
})
game.onUpdateInterval(20000, function () {
    BOSSY = sprites.create(img`
        ..........bbbaaaaaabbb..........
        ..........bbbaaaaaafbb..........
        ..........ebbaaaaaccfb..........
        ..........ebbaaaaaacfb..........
        ..........bebaaaaaabeb..........
        ..........bffaaaaaabbe..........
        .......888bccaaaaaabbe888.......
        ......8868bbcb6666bbbb8688......
        ......8668bbfb6666bbbb8668......
        ...8888888.bbb6666bbb.8888888...
        ...868...888bbbbbbcf888...868...
        .88888...868bebbbccf868...88888.
        8868.....888bbbbbffb888.....8688
        8688..888...bbebbbeb...888..8868
        888...868...bffbbbbb...868...888
        .888..888....ccfbeb....888..888.
        .868...888....cfbb....888...868.
        .868...868....bbbb....868...868.
        .868...868....bbbb....868...868.
        .868...868...cccccc...868...868.
        .888...868cbccbccbccbc868...888.
        ..ccc..888..cbbccbbc..888..ccc..
        ..cbc...ccc..ccbbcc..ccc...cbc..
        ..cbc...cbc...cccc...cbc...cbc..
        ..cbc...cbc..ccbbcc..cbc...cbc..
        ..cbc...cbc..ccbbcc..cbc...cbc..
        ..cac...cbc...cccc...cbc...cac..
        ........cbc..........cbc........
        ........cac..........cac........
        ................................
        ................................
        ................................
        `, SpriteKind.Boss)
    BossLife = 15
    BOSSY.y = -16
    BOSSY.vy = 20
    info.startCountdown(15)
})

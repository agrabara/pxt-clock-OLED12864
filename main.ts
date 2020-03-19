// Zegar czasu rzeczywistego oparty na RTS1302 (modul zegara)
// i wyswietlacz OLED 128x64 po I2C

input.onButtonPressed(Button.A, function () {
    //ustawienie jednorazowe daty i godziny
    clock.DateTime(
        2020,
        3,
        19,
        4,
        10,
        48,
        30
    )
    basic.showIcon(IconNames.Heart)
})
let sekunda = 0
let minuta = 0
let godzina = 0
let day = 0
let month = 0
let week = ""
let oldweek = 0
let clock: DS1302.DS1302RTC = null
OLED12864_I2C.init(60)
OLED12864_I2C.off()
OLED12864_I2C.showString(0, 0, "Hello!")
OLED12864_I2C.on()
basic.pause(2000)
OLED12864_I2C.showString(0, 1, "Realtime")
OLED12864_I2C.showString(0, 2, "Clock")
basic.pause(2000)
OLED12864_I2C.clear()
//
// podlaczenie:
// P13 - CLK
// P14 - DAT
// P15 - RST
clock = DS1302.create(DigitalPin.P13, DigitalPin.P14, DigitalPin.P15)
// inicjalizacja zmiennej dzien tygodnia - unikamy mrugania
oldweek = clock.getWeekday()
basic.forever(function () {
    led.plot(2, 1)
    led.plot(2, 3)
    OLED12864_I2C.showNumber(0, 0, clock.getYear())
    OLED12864_I2C.showString(4, 0, "-")
    month = clock.getMonth()
    if (month > 9) {
        OLED12864_I2C.showNumber(5, 0, month)
    } else {
        OLED12864_I2C.showString(5, 0, "0")
        OLED12864_I2C.showNumber(6, 0, month)
    }
    OLED12864_I2C.showString(7, 0, "-")
    day = clock.getDay()
    if (day > 9) {
        OLED12864_I2C.showNumber(8, 0, day)
    } else {
        OLED12864_I2C.showString(8, 0, "0")
        OLED12864_I2C.showNumber(9, 0, day)
    }

    // tylko jak się zmienia dzień tygodnia to go "czyścimy"
    if (oldweek != clock.getWeekday()) {
        OLED12864_I2C.showString(0, 1, "           ")
        oldweek = clock.getWeekday()
    }

    switch (oldweek) {
        case 1: week = "Poniedzialek";
        case 2: week = "Wtorek";
        case 3: week = "Sroda";
        case 4: week = "Czwartek";
        case 5: week = "Piatek";
        case 6: week = "Sobota";
        case 7: week = "Niedziela";
    }
    OLED12864_I2C.showString(0, 1, week)

    godzina = clock.getHour()
    if (godzina > 9) {
        OLED12864_I2C.showNumber(0, 2, godzina)
    } else {
        OLED12864_I2C.showString(0, 2, "0")
        OLED12864_I2C.showNumber(1, 2, godzina)
    }
    OLED12864_I2C.showString(2, 2, ":")
    minuta = clock.getMinute()
    if (minuta > 9) {
        OLED12864_I2C.showNumber(3, 2, minuta)
    } else {
        OLED12864_I2C.showString(3, 2, "0")
        OLED12864_I2C.showNumber(4, 2, minuta)
    }
    OLED12864_I2C.showString(5, 2, ":")
    sekunda = clock.getSecond()
    if (sekunda > 9) {
        OLED12864_I2C.showNumber(6, 2, sekunda)
    } else {
        OLED12864_I2C.showString(6, 2, "0")
        OLED12864_I2C.showNumber(7, 2, sekunda)
    }
    led.unplot(2, 1)
    led.unplot(2, 3)
    //basic.pause(500)
})
 
const dayBox = document.getElementById('day_box');

// Generate Hours Rows
for (let index = 0; index < 25; index++) {
    let element = index
    if (index == 24 ) {
        element = '00'
    }
    if (index < 10) {
        element = `0${index}`
    }
    const row = document.createElement('div')
    row.classList.add('row');
    row.innerHTML = `
        <div class="time_stamp">
            <h1>${element}:00</h1><div class="bar"></div></div>
            <div class="event_box"></div>
        </div>`;
    dayBox.appendChild(row)
}

let events = [
    {'date':'15-12-2022','name':'Porany Trening','start':'2','duration':'1.50','color':'#ba2534','repet_destinition':'everyday'},
    {'date':'15-12-2022','name':'Rozmowa o pracę','start':'4','duration':'2','color':'#42f566','repet_destinition':'everyday'},
    {'date':'15-12-2022','name':'Zajęcia z j. angielskiego','start':'6','duration':'1','color':'#a116c4','repet_destinition':'everyday'},
    {'date':'15-12-2022','name':'Test Event','start':'12','duration':'1','color':'#a116c4','repet_destinition':'everyday'},
]

// Generate Events For Rows
function CreateEvents() {
    events.forEach((e) => {
        // console.warn(e.start, e.duration);
        const start = Math.floor(e.start)
        let cont
        const box = document.createElement('div')
        let val = e.start.split('.');
        let durVal = e.duration.split('.');
        let dziel
        // 
        if (val[1] == undefined) { val[1] = '00' }
    
        const testLenght = val[1].length;
        if (testLenght == 1) { 
            dziel = 10 
        } else if (testLenght == 2) { 
            dziel = 100
        } else if (testLenght == 3) {
            dziel = 1000
        }
        // 
        if (e.start % 2 != 0) {
            // 
            const fromTop = val[1] / dziel;
            console.log(fromTop)
            // console.warn(fromTop);
            box.style.transform = `translateY(calc(calc(75px / 2 - .5px) + ${fromTop * 75}px)) `
        }
        // START AND END DISPLAY
        let Shour, Sminute, Ehour, Eminute
    
        // CALCULATE START
        if (val[0].length == 2) {
            Shour = val[0]
        } else {
            Shour = '0'+val[0]
        }
        if (val[1].length == 2) {
            const x = Math.floor(val[1]/dziel*60)
            x.toString()
            if (x.toString().length==1) {
                Sminute = '0'+x
            } else {
                Sminute = x
            }
        } else {
            const x = val[1]
            Sminute = '0'+x
        }
        // CALCULATE END
        if (durVal[1] == undefined) { durVal[1] = '00'}
        // 
        if (durVal[0].length == 2) {
            Ehour = Shour+durVal[0]
        } else {
            Ehour = parseInt(Shour)+parseInt(durVal[0])
            if(Ehour.toString().length == 1) {
                Ehour = '0'+Ehour
            }
        }
        if (durVal[1].length == 2) {
            const x = Math.floor(durVal[1]/dziel*60)
            if (x.toString().length==1) {
                Eminute = parseInt(Sminute)+parseInt(x)
                if(Eminute.toString().length == 1) {
                    Eminute = '0'+Eminute
                }
            } else {
                Eminute = parseInt(Sminute)+parseInt(x)
    
            }
        } else {
            const x = durVal[1]
            Eminute = '0'+x
        }
    
        console.warn(`START: ${Shour}:${Sminute}`);
        console.warn(`END: ${Ehour}:${Eminute}`);
        cont = `<h1 class="title">${e.name}</h1><p class="description">${Shour}:${Sminute} - ${Ehour}:${Eminute}</p><i class="bi bi-three-dots event_settings"></i>`

        box.innerHTML = cont
        box.style.setProperty('--badge_color',e.color)
        box.classList.add('event')
        box.style.height = `${e.duration * 100}%`
        // 
        document.getElementById('day_box').children[start+1].children[1].appendChild(box)
    })
}
CreateEvents()



function DisplayActualTime() {
    // SET TIME STAMP POSITION
    const t = new Date()
    const rowSize = 75
    // console.warn(t.getHours(), t.getMinutes());
    document.getElementById('time_stamp').style.top = `${t.getHours()*rowSize + t.getMinutes()*(rowSize/60)}px`
    let h, m
    if (t.getHours() < 10 ) { h = `0${t.getHours()}` } else { h = t.getHours() }
    if (t.getMinutes() < 10 ) { m = `0${t.getMinutes()}` } else { m = t.getMinutes() }
    
    document.getElementById('time_stamp').children[0].innerHTML = `${h}:${m}`
    // SET ACTUAL DAY

    const weekDay = t.getDay()
    const days = ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela']
    const months = ['Styczeń','Luty','Marzec','Kwiecien','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']


    // document.getElementById('date_information').childNodes[1].innerText = `${days[weekDay-1]}, ${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()}`
}
const updateInterval = setInterval(DisplayActualTime, 500)  // Tworzenie interwału
DisplayActualTime()

var a_day, a_month, a_year, a_week
var change_week = 0
var backup_change_week = 0
var month_change = 0
const topMenu = document.querySelector('#top_box')

let DateName = true
// True = 2022 / False = 22
let YearFormat = true
let SliceNum
if (YearFormat) { SliceNum = 0 } else { SliceNum = 2}

function GetActualData() {
    const boxes = document.querySelectorAll('.day_card')
    for (let index = 0; index < 7; index++) {
        const w0 = new Date()
        const w1 = new Date(w0.getFullYear(),w0.getMonth(),w0.getDate()+change_week)
        const firstDay5 = new Date(w1.setDate(w1.getDate() - w1.getDay() + 1))
        const t = firstDay5.getDate()+index
        w1.setDate(t)
        boxes[index].setAttribute('day_num',w1.getDate())
        boxes[index].setAttribute('month_num',w1.getMonth()+1)
        boxes[index].setAttribute('year_num',w1.getFullYear())
        boxes[index].children[2].innerText = `${w1.getDate()}`    
    }
    const actual = new Date()
    const date = new Date(actual.getFullYear(),actual.getMonth(),actual.getDate()+parseInt(change_week))
    // 
    a_day = date.getDate()
    a_month = date.getMonth() + 1   
    a_year = date.getFullYear()   
    // Set first and last day of week
    const WeekFirstDay = new Date(date.setDate(date.getDate() - date.getDay() + 1))
    const WeekLastDay  = new Date(date.setDate(date.getDate() - date.getDay() + 7))
    // Wyświetlanie aktualnego tygodnia, miesiąca i roku
    if (DateName) {
        // NAZWA MIESIĄCA        
        document.querySelector('#display_week').innerHTML = `${WeekFirstDay.getDate()} ${GetMonth(WeekFirstDay.getMonth()+1)} ${WeekFirstDay.getFullYear().toString().slice(SliceNum)} - ${WeekLastDay.getDate()} ${GetMonth(WeekLastDay.getMonth()+1)} ${WeekLastDay.getFullYear().toString().slice(SliceNum)}`
    } else {
        // NUMER MIESIĄCA
        document.querySelector('#display_week').innerHTML = `${WeekFirstDay.getDate()}.${WeekFirstDay.getMonth()+1}.${WeekFirstDay.getFullYear().toString().slice(SliceNum)} - ${WeekLastDay.getDate()}.${WeekLastDay.getMonth()+1}.${WeekLastDay.getFullYear().toString().slice(SliceNum)}`
    }
}
GetActualData()

function GetMonth(x) {
    const monthName = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
    return monthName[x-1]
}

// Poprzedni tydzien
document.querySelector('#left_week').addEventListener('click',(e) => {
    backup_change_week = change_week
    change_week -= 7
    GetActualData()
})
// Następny tydzien
document.querySelector('#right_week').addEventListener('click',(e) => {
    backup_change_week = change_week
    change_week += 7
    GetActualData()
})

document.querySelectorAll('.day_card').forEach((b) => {
    b.addEventListener('click',(e) => {
        console.warn(`${e.target.getAttribute('day_num')}_${e.target.getAttribute('month_num')}_${e.target.getAttribute('year_num')}`);
    })
})

function reportWindowSize() {
    const topMenu = document.querySelector('#top_box')
    // const bottomMenu = document.querySelector('#navigation')
    // document.querySelector('#day_box').style.height = `calc(100vh - ${topMenu.offsetHeight}px - ${bottomMenu.offsetHeight}px + 30px)`
    document.querySelector('#day_box').style.height = `calc(100vh - ${topMenu.offsetHeight}px + 25px)`
}
reportWindowSize()
window.onresize = reportWindowSize;
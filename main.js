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
    {'id':323232,'date':'11-12-2022','name':'Porany Trening','start':'2','duration':'1.50','color':'#ba2534','repet_destinition':'1'},
    {'id':323233,'date':'15-12-2022','name':'Porany Trening','start':'14.50','duration':'1.50','color':'#ba2534','repet_destinition':'everyday'},
    {'id':323234,'date':'15-12-2022','name':'Rozmowa o pracę','start':'4','duration':'2','color':'#42f566','repet_destinition':'everyday'},
    {'id':323235,'date':'15-12-2022','name':'Zajęcia z j. angielskiego','start':'6','duration':'1','color':'#a116c4','repet_destinition':'everyday'},
    {'id':323236,'date':'15-12-2022','name':'Test Event','start':'12','duration':'1','color':'#a116c4','repet_destinition':'everyday'},
    {'id':323237,'date':'16-12-2022','name':'Test Event','start':'13','duration':'1','color':'#a116c4','repet_destinition':'everyday'},
]

// Generate Events For Rows
function CreateEvents(e) {
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
            // console.log(fromTop)
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

        
        if (durVal[0].length == 2) {
            Ehour = Shour+durVal[0]
        } else {
            Ehour = parseInt(Shour)+parseInt(durVal[0])
            if(Ehour.toString().length == 1) {
                if (Eminute >= 60) { 
                    Eminute = Eminute-60
                    if (Eminute == 0) { Eminute = '00'}
                    const t = Ehour+1
                    Ehour = '0'+t
                } else {
                    Ehour = '0'+Ehour
                }
            }
        }
        // console.warn(`START: ${Shour}:${Sminute}`);
        // console.warn(`END: ${Ehour}:${Eminute}`);
        cont = `<h1 class="title">${e.name}</h1><p class="description">${Shour}:${Sminute} - ${Ehour}:${Eminute}</p><i class="bi bi-three-dots event_settings" onclick="removeEvent(this)"></i>`

        box.innerHTML = cont
        box.style.setProperty('--badge_color',e.color)
        box.classList.add('event')
        box.setAttribute('db_id',e.id)
        box.style.height = `${e.duration * 100}%`
        // 
        document.getElementById('day_box').children[start+1].children[1].appendChild(box)
}


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
    reportWindowSize()
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
        const firstDay5 = getFirstDayOfWeek(w1)
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
    const WeekFirstDay = getFirstDayOfWeek(date)
    const WeekLastDay  = new Date(WeekFirstDay);
    WeekLastDay.setDate(WeekLastDay.getDate() + 6);
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

function getFirstDayOfWeek(d) {
    // 👇️ clone date object, so we don't mutate it
    const date = new Date(d);
    const day = date.getDay(); // 👉️ get day of week
    // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function GetMonth(x) {
    const monthName = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
    return monthName[x-1]
}

// Poprzedni tydzien
document.querySelector('#left_week').addEventListener('click',(e) => {
    backup_change_week = change_week
    change_week -= 7
    OnChangeWeek()
})
// Następny tydzien
document.querySelector('#right_week').addEventListener('click',(e) => {
    backup_change_week = change_week
    change_week += 7
    OnChangeWeek()
})
// Restartowanie do aktualnej daty
document.querySelector('#date_information').addEventListener('click', SetDeafultDate)
function SetDeafultDate() {
    backup_change_week = change_week
    change_week = 0
    // 
    const t = new Date()
    document.querySelectorAll('.event_box').forEach((e) => {
        e.innerHTML = ``
    })
    GetActualData()
    // Ustawianie aktalnej daty jako wybrana
    // console.warn(t.getDate(),t.getMonth()+1,t.getFullYear());
    document.head.setAttribute('selected_day',t.getDate())
    document.head.setAttribute('selected_month',t.getMonth()+1)
    document.head.setAttribute('selected_year',t.getFullYear())
    // Ustawianie [ active ] dla odpowiedniej karty dnia
    document.querySelectorAll('.day_card').forEach((b) => {
        if (b.getAttribute('day_num') == t.getDate() && b.getAttribute('month_num') == t.getMonth()+1 && b.getAttribute('year_num') == t.getFullYear()) {
            b.classList.add('active')
        } else {
            b.classList.remove('active')
        }
    })
    OnChangeWeek()
}
SetDeafultDate()
// Klikanie w kartę dnia
document.querySelectorAll('.day_card').forEach((b) => {
    // Dodawanie eventu dla wszystkich przycisków
    b.addEventListener('click',(e) => {
        //! DEV - Wyświetlanie w konsoli
        // console.warn(`${e.target.getAttribute('day_num')}_${e.target.getAttribute('month_num')}_${e.target.getAttribute('year_num')}`);
        // Ustawianie atrybutów dla head 
        document.head.setAttribute('selected_day',e.target.getAttribute('day_num'))
        document.head.setAttribute('selected_month',e.target.getAttribute('month_num'))
        document.head.setAttribute('selected_year',e.target.getAttribute('year_num'))
        // Usuwanie klasy dla wszystkich przycisków
        document.querySelectorAll('.day_card').forEach((b) => {
            b.classList.remove('active')
        })
        // Dodawanie klasy dla tylko jednego przycisku
        e.target.classList.add('active')
        document.querySelectorAll('.event_box').forEach((e) => {
            e.innerHTML = ``
        })
        GetEventsToDate()
    })
})
// Dodawanie nowego wydarzenia
document.querySelector('#add_event').addEventListener('click',(e) => {
    // console.warn('Add new event');
    document.querySelector('#view_add_event').style.display = 'block'
    label_event_start_time.style.color = 'black'
    label_event_start_time.style.fontWeight = '400'
    // 
    label_event_date.style.color = 'black'
    label_event_date.style.fontWeight = '400'
})
document.querySelectorAll('.exit_event').forEach((b) => {
    b.addEventListener('click',(e) => {
        document.querySelector('#view_add_event').style.display = 'none'
    })
})
// INPUTS
const input_event_name = document.querySelector('#input_event_name')
const input_event_description = document.querySelector('#input_event_description')
const input_event_date = document.querySelector('#input_event_date')
const input_event_start_time = document.querySelector('#input_event_start_time')
const input_event_duration = document.querySelector('#input_event_duration')
const input_event_color = document.querySelector('#input_event_color')
// LABELS
const label_event_name = document.querySelector('#label_event_name')
const label_event_description = document.querySelector('#label_event_description')
const label_event_date = document.querySelector('#label_event_date')
const label_event_start_time = document.querySelector('#label_event_start_time')
const label_event_duration = document.querySelector('#label_event_duration')
const label_event_color = document.querySelector('#label_event_color')
document.querySelector('#event_add').addEventListener('click', (e) => {
    let bad = 0
    // DATE
    if (input_event_date.value == '') {
        label_event_date.style.color = 'red'
        label_event_date.style.fontWeight = '600'
        bad = 1
    }
    // START
    if (input_event_start_time.value == '') {
        label_event_start_time.style.color = 'red'
        label_event_start_time.style.fontWeight = '600'
        bad = 1
    }
    if (bad == 1) { return }
    // Dodanie
    let nameVal = input_event_name.value
    let dateVal = ConverYear(input_event_date.value)
    let startVal = convertTimeToDecimal(input_event_start_time.value)
    let durationVal = convertTimeToDecimal(input_event_duration.value)
    if (nameVal == '') { nameVal = 'Brak Nazwy' }
    if (convertTimeToDecimal(input_event_duration.value) == 'NaN') { durationVal = '1' }

    const toAdd = {
        'id':Date.now(),
        'date':dateVal,
        'name':nameVal,
        'start':startVal,
        'duration':durationVal,
        'color':input_event_color.value,
        'repet_destinition':'everyday'
    }
    events.push(toAdd)
    document.querySelector('#view_add_event').style.display = 'none'
    const headDate = `${document.head.getAttribute('selected_day')}-${document.head.getAttribute('selected_month')}-${document.head.getAttribute('selected_year')}`
    // JESLI WYBRANY DZIEN = DNIU DO KTÓREGO DODAJE SIE EVENT ZAŁADUJ WYADARZENIA
    if (headDate == dateVal) {
        document.querySelectorAll('.event_box').forEach((e) => {
            e.innerHTML = ``
        })
        GetEventsToDate()
    }
})

function reportWindowSize() {
    const topMenu = document.querySelector('#top_box')
    const bottomMenu = document.querySelector('#navigation')
    // console.warn(1);
    // document.querySelector('#day_box').style.height = `calc(100vh - ${topMenu.offsetHeight}px - ${bottomMenu.offsetHeight}px + 30px)`
    document.querySelector('#day_box').style.height = `calc(100% - ${topMenu.offsetHeight}px - ${bottomMenu.offsetHeight}px + 25px)`
}
window.addEventListener('resize', reportWindowSize)
reportWindowSize()

function OnChangeWeek() {
    GetActualData()
    const element = document.querySelector('.active');
    document.head.setAttribute('selected_day',element.getAttribute('day_num'))
    document.head.setAttribute('selected_month',element.getAttribute('month_num'))
    document.head.setAttribute('selected_year',element.getAttribute('year_num'))
    GetEventsToDate()
}

function View() {
    const t = new Date()
    document.head.setAttribute('selected_day',t.getDate())
    document.head.setAttribute('selected_month',t.getMonth()+1)
    document.head.setAttribute('selected_year',t.getFullYear())
}
View()

function GetEventsToDate() {
    document.querySelectorAll('.event_box').forEach((e) => {
        e.innerHTML = ``
    })
    const toCreate = [];
    const selected_data = `${document.head.getAttribute('selected_day')}-${document.head.getAttribute('selected_month')}-${document.head.getAttribute('selected_year')}`
    // console.warn(selected_data);
    let test1 = events.filter(b => b.date == selected_data).forEach((e) => {
        // if(e.repet_destinition != 1) {
        // } 
        toCreate.push(e)
    });

    // let test2 = events.filter(b => b.repet_destinition == 1).forEach((c) => {
    //     toCreate.forEach((t) => {
    //         if(t.id == c.id) {
    //             console.log('Wydarzenie juz jest pobrane');
    //         } else {
    //             toCreate.push(c)
    //         }
    //     })

    // });

    console.warn(toCreate);
    toCreate.forEach((b) => {
        CreateEvents(b)
    })
}

function ConverYear(date) {
    const date_split = date.split('-')
    return `${date_split[2]}-${date_split[1]}-${date_split[0]}`
}

function convertTimeToDecimal(time) {
    // Zamień ciąg znaków z godziną na tablicę liczb, rozdzielając je po dwukropku
    var timeParts = time.split(":");
    // Pobierz godzinę i minuty z tablicy liczb
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);    
    // Oblicz liczbę zmiennoprzecinkową dla podanej godziny
    var decimalTime = hours + minutes / 60;
    // Zwróć liczbę zmiennoprzecinkową
    if(minutes.toString().charAt(0) != 0) {
        // minutes = minutes.toString()+'0'
        const t = decimalTime+'0'; 
        // return t.slice(0, t.length-6)
        return roundToTwoDecimalPlaces(t)
    } else {
        const t = decimalTime;
        // return t.slice(0, t.length-6)
        return roundToTwoDecimalPlaces(t)
    }
}

function roundToTwoDecimalPlaces(number) {
    // Zaokrąglij podaną liczbę do dwóch miejsc po przecinku
    var roundedNumber = Math.round(number * 100) / 100;
    // Zwróć zaokrągloną liczbę
    return roundedNumber.toString();
}

// LOAD
window.addEventListener('load', (event) => {
    console.log(JSON.parse(localStorage.getItem('events')));
    events = JSON.parse(localStorage.getItem('events'))
    SetDeafultDate()
});
// UNLOAD
window.addEventListener("beforeunload", (event) => {
    localStorage.setItem('events',JSON.stringify(events))
});


function removeEvent(e) {
    const id = e.parentNode.getAttribute('db_id')
    console.warn(id);
    // let test = events.filter(b => b.date == selected_data).forEach((e) => {}
    const records = events
    var updatedRecords = [];

    // Dla każdego rekordu w tablicy records...
    for (var i = 0; i < records.length; i++) {
        var record = records[i];
      // Jeśli wartość dla klucza 'id' nie jest równa 'iles', dodaj rekord do nowej tablicy
        if (record.id != id) {
            updatedRecords.push(record);
        }
    }
    // Zwróć nową tablicę zawierającą wszystkie rekordy, które chcemy zachować
    events = updatedRecords
    document.querySelectorAll('.event_box').forEach((e) => {
        e.innerHTML = ``
    })
    GetEventsToDate()
}
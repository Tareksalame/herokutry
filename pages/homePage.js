const costumer =  localStorage.getItem("costumer");
const parseCostumer = JSON.parse(costumer);

const welcomeDiv = document.getElementById('welcomeDiv');
const costumerName = document.createElement('h1');
costumerName.innerHTML = parseCostumer.name 
const choosePlease = document.createElement('h3');
choosePlease.innerHTML = 'اختر التاريخ والساعة الملائمة بالنسبة لك'

choosePlease.style.margin = 0
costumerName.style.marginTop = 0
welcomeDiv.appendChild(costumerName);
welcomeDiv.appendChild(choosePlease);


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
let timesStart = document.getElementById('times');
let option1 = document.createElement('option')
option1.innerHTML = 'اختر تاريخًا'
timesStart.appendChild(option1)

const times = ()=>
{
    let date = document.getElementById('start').value;
    let theTimes = document.getElementById('times');
    removeAllChildNodes(theTimes);
    let clock = []
    for(let i = 8 ; i < 21 ; i++)
    {
        for(let j = 0 ; j < 4 ; j++)
        {
            if(i < 10)
            {
                if(j == 0)
                {
                    clock.push( '0' + i.toString() + ':' + '00')
                }
                else if
                (j == 1)
                {
                    clock.push( '0' + i.toString() + ':' + '15')
                }
                else if
                (j == 2)
                {
                    clock.push( '0' + i.toString() + ':' + '30')
                }
                else if
                (j == 3)
                {
                    clock.push( '0' + i.toString() + ':' + '45')
                }
            }else if (i >= 10)
            {
                if(j == 0)
                {
                    clock.push(i.toString() + ':' + '00')
                }
                else if
                (j == 1)
                {
                    clock.push(i.toString() + ':' + '15')
                }
                else if
                (j == 2)
                {
                    clock.push(i.toString() + ':' + '30')
                }
                else if
                (j == 3)
                {
                    clock.push(i.toString() + ':' + '45')
                }
            }
        }
    }
    fetch('/times' , 
    {
        headers:{
            "Content-Type": "application/json"
        },
        method:'post',
        body:JSON.stringify({
            date:date
        })
    }).then((res)=>{return res.json()}).then((data)=>
    {
        console.log(data)
        let timeArr = data.map((val)=>
        {
            return val.time
        })
        for(let i = 0 ; i < timeArr.length ; i++)
        {
            for(let j = 0 ; j < clock.length ; j++)
            {
                if(timeArr[i] == clock[j])
                {
                    clock.splice(j,1);
                }
            }
        }
        return clock.map((val)=>
        {
            let option = document.createElement('option')
            option.value = val
            option.innerHTML = val
            theTimes.appendChild(option)
        })
    })
}
let dateTimeSection = document.getElementById('dateTime');
const myQueues = ()=>
{
    let name = parseCostumer.name
    let phoneNumber = parseCostumer.phoneNumber
    fetch('/myQueues' , 
    {
        headers:{
            "Content-Type": "application/json"
        },
        method:'post',
        body:JSON.stringify({
            name:name,
            phoneNumber:phoneNumber
        })
    }).then((res)=>{return res.json()}).then((data)=>{
        let costumerQueues = JSON.stringify(data)
        localStorage.setItem("myQueues",costumerQueues);
        let costumerName = JSON.stringify(parseCostumer)
        localStorage.setItem("costumerName",costumerName);
        window.location.href = "/myQueues";

    }).catch((err)=>{console.log(err)})
}



const exit = ()=>
{
    window.location.href = '/'
}

const dateTime = ()=>
{
    let date = document.getElementById('start').value;
    let time = document.getElementById('times').value;

    let name = parseCostumer.name
    let phoneNumber = parseCostumer.phoneNumber
        fetch('/done',
        {
            headers:{
                "Content-Type": "application/json"
            },
            method:'post',
            body:JSON.stringify({
                name: name,
                phoneNumber:phoneNumber,
                date:date,
                time:time
            })
        }).then((res)=>{return res.json()}).then((data)=>
        {
            if(data == null)
            {
                alert('تم التسجيل بنجاح')    
            }
            else
            {
                alert('الدور محجوز الرجاء اختيار دور اخر')
            }
        })
}

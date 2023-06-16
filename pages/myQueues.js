const costumer =  localStorage.getItem("myQueues");
const Queues = JSON.parse(costumer);
console.log(Queues)
const costumerName = localStorage.getItem("costumerName")
// console.log(costumerName)
const theName = JSON.parse(costumerName);
console.log(theName)

const welcomeDiv = document.getElementById('welcomeDiv');
const newName = document.createElement('h1');
newName.innerHTML = theName.name
welcomeDiv.appendChild(newName);

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
const back = ()=>
{
    window.location.href = "/barber"
}
const exit = ()=>
{
    window.location.href = '/'
}

const dateTimeSection = document.getElementById('dateTime')
const h1 = document.createElement('h3')
h1.innerHTML = 'دورك القادم / المرة الاخيرة التي كنت فيها عندنا'
dateTimeSection.appendChild(h1)

const lastQueue = ()=>
{
    let result = Queues.filter((val,idx)=>
    {
        if(idx == Queues.length - 1)
        {
            return val
        }
        else if (Queues.length <= 0)
        {
            throw 'لا يوجد لديك ادوار مسجلة عندنا'
        }
    })
    return result
}
const lastQueueh2 = document.createElement('h2');
try
{
    lastQueueh2.innerHTML = lastQueue()[0].date + '  ' + ' '   + lastQueue()[0].time
    dateTimeSection.appendChild(lastQueueh2)
}
catch(err)
{
    lastQueueh2.innerHTML = 'لا يوجد لديك ادوار مسجلة عندنا'
    dateTimeSection.appendChild(lastQueueh2)
}
console.log(lastQueue())

const cancel = ()=>
{
    let name = lastQueue()[0].name
    let phoneNumber = lastQueue()[0].phoneNumber
    let date = lastQueue()[0].date
    let time = lastQueue()[0].time
    // console.log(name)
    // console.log(phoneNumber)
    // console.log(date)
    // console.log(time)
    fetch('/deleted',
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
            
            let name = theName.name
            let phoneNumber = theName.phoneNumber
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
                lastQueueh2.innerHTML = 'تم الغاء دورك بنجاح'
                dateTimeSection.appendChild(lastQueueh2)
            
                }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
}

const queue = ()=>
{
    let select = document.getElementById('queue');
    return Queues.map((val)=>
    {
        let option = document.createElement('option');
        option.innerHTML = val.date + ' ' + ' ' + val.time
        select.appendChild(option) 
    })
}
queue()

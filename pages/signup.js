let flag = localStorage.getItem("flag")
let flagJson = JSON.parse(flag)

console.log(flagJson)

let alert1 = document.getElementById('alert')

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>
    {
        if(entry.isIntersecting)
        {
            entry.target.classList.add('show')
        }else
        {
            entry.target.classList.remove('show')
        }
    })
});

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el)=>{observer.observe(el)})
// const flagTurnLang = ()=>
// {
//     let have = document.getElementById('have')
//     if(flagJson == false)
//     {
//         have.innerHTML = 'عندك حساب ؟ '
//     }
//     else
//     {
//         have.innerHTML = 'Already have registered?'
//     }
// }
// flagTurnLang()
const signup = ()=>
{
    let name = document.getElementById('name').value
    let phoneNumber = document.getElementById('phoneNumber').value
    if(phoneNumber.length <= 9)
    {
        alert('الرقم يجب ان يكون 10 ارقام')
    }
    else
    {
        fetch('/signup',
        {
            headers:{
                "Content-Type": "application/json"
            },
            method:'post',
            body:JSON.stringify({
                name: name,
                phoneNumber:phoneNumber
            })
        }).then((res)=>{return res.json()}).then((data)=>
        {
            if(data == null)
            {
                // const costumer = {name : name , phoneNumber : phoneNumber}
                // localStorage.setItem("costumer",costumer)
                window.location.href = "/";
            }
            else
            {
                removeAllChildNodes(alert1)
                let h4 = document.createElement('h4');
                // h4.setAttribute('alert','id')
                h4.innerHTML = "الاسم والرقم مسجلان"
                h4.setAttribute('id' , 'h4alert')
                h4.style.color = 'red'
                alert1.appendChild(h4)
            }
        })
    }
}
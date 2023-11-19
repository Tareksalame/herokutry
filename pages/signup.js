let flag = localStorage.getItem("flag")
let flagJson = JSON.parse(flag)

console.log(flagJson)
let alert1 = document.getElementById('alert')
let inputDiv = document.getElementById('inputDiv')

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


const checkFunction = (dataCode,InputCode,information)=>
{
    console.log(dataCode)
    console.log(InputCode)
    console.log(information)

    if(dataCode == InputCode)
    {
        fetch('/register',
        {
            headers:{
                "Content-Type": "application/json"
            },
            method:'post',
            body:JSON.stringify({
                name: information.name,
                email:information.email,
                phoneNumber:information.phoneNumber
            })
        }).then((res)=>{return res.json()}).then((data)=>
        {
            if(data == true)
            {
                window.location.href = "/";
            }
            else
            {
                alert('Please Try Again')
            }
        })
    }
    else
    {
        alert('The Code that you entered is false')
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
    let email = document.getElementById('email').value
    let phoneNumber = document.getElementById('phoneNumber').value
    let information = {name : name,email:email,phoneNumber:phoneNumber}
    if(phoneNumber.length <= 9)
    {
        alert('الرقم يجب ان يكون 10 ارقام')
    }
    else if(email.indexOf('@') == -1)
    {
        alert('email is not correct')
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
                email:email,
                phoneNumber:phoneNumber
            })
        }).then((res)=>{return res.json()}).then((data)=>
        {
            if(data == null)
            {
                // const costumer = {name : name , phoneNumber : phoneNumber}
                // localStorage.setItem("costumer",costumer)
                removeAllChildNodes(alert1)
                let h4 = document.createElement('h4');
                h4.innerHTML = ('This User Already Signed Up')
                h4.setAttribute('id' , 'h4alert')
                h4.style.color = 'red'
                alert1.appendChild(h4)
                // window.location.href = "/";
            }
            else if(data == 'email used')
            {
                alert('This Email Already Used')
            }
            else
            {
                // removeAllChildNodes(inputDiv)
                let divAlert = document.createElement('div');
                divAlert.setAttribute('id','divAlertClass');
                divAlert.style.position = 'absolute'
                divAlert.style.width = '300px'
                divAlert.style.height = '300px'
                divAlert.style.display = 'flex'
                divAlert.style.flexDirection = 'column'
                divAlert.style.justifyContent = 'center'
                divAlert.style.alignItems = 'center'
                divAlert.style.border = '3px solid black'
                divAlert.style.borderRadius = '10px'
                divAlert.style.background = 'white'
                let exit = document.createElement('button');
                exit.innerHTML = 'X'
                exit.addEventListener('click', ()=>{divAlert.style.display = 'none'})
                let title = document.createElement('h4');
                title.innerHTML = ("Please Enter The Code That We Sent To Your Email")
                let codeInput = document.createElement('input');
                codeInput.setAttribute('id','codeInput')
                let codeSubmit = document.createElement('button');
                codeSubmit.innerHTML = 'Submit Code'
                divAlert.appendChild(exit)
                divAlert.appendChild(title)
                divAlert.appendChild(codeInput)
                divAlert.appendChild(codeSubmit)
                inputDiv.appendChild(divAlert)
                // InputCode = document.getElementById('codeInput').value
                codeSubmit.addEventListener('click' , ()=>{checkFunction(data,document.getElementById('codeInput').value,information)})
            }
        })
    }
}


// position: absolute;
//     width: 200px;
//     height: 200px;
//     border-radius: 4px;
//     border: 3px solid black;
//     box-shadow: 0 6px 10px rgba(0,0,0,.14), 0 1px
//     4px rgba(0,0,0,.28);
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
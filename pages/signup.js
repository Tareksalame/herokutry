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

    if(dataCode == InputCode)
    {
        fetch('/register',
        {
            headers:{
                "Content-Type": "application/json"
            },
            method:'post',
            body:JSON.stringify({
                name: information.name.toLowerCase(),
                email: information.email.toLowerCase(),
                phoneNumber: information.phoneNumber.toLowerCase()
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
                name: name.toLowerCase(),
                email:email.toLowerCase(),
                phoneNumber:phoneNumber.toLowerCase()
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
                // ------------------------- Div Alert + Div Alert Style ------------------------ //
                let divAlert = document.createElement('div');
                divAlert.setAttribute('id','divAlertClass');
                divAlert.style.position = 'absolute'
                divAlert.style.boxShadow = '0 6px 10px rgba(0,0,0,.14), 0 1px'
                divAlert.style.width = '300px'
                divAlert.style.height = '350px'
                divAlert.style.display = 'flex'
                divAlert.style.flexDirection = 'column'
                divAlert.style.justifyContent = 'center'
                divAlert.style.alignItems = 'center'
                divAlert.style.border = '5px solid rgb(17, 16, 38)'
                divAlert.style.borderRadius = '10px'
                divAlert.style.background = 'white'
                divAlert.style.animationName = 'animationAler'
                divAlert.style.animationDuration = '2s'
                // ---------------------Exit Button + Event + Style-------------------------//
                let exit = document.createElement('button');
                exit.innerHTML = 'X'
                exit.style.border = '3px solid rgb(17, 16, 38)'
                exit.style.background = 'none'
                exit.style.color = 'rgb(17, 16, 38)'
                exit.style.borderRadius = '50px'
                exit.style.height = '40px'
                exit.style.width = '40px'
                exit.style.fontWeight = '900'
                exit.style.fontSize = '20px'
                exit.addEventListener('click', ()=>{divAlert.style.display = 'none'})
                // ---------------------Title Of The Alert Div -----------------------//
                let title = document.createElement('h3');
                title.innerHTML = ("A Code Has Been Sent to your Email")
                // ---------------- Input Title---------------- //
                let InputTitle = document.createElement('h4');
                InputTitle.innerHTML = ("Enter the code :")
                InputTitle.style.marginBottom = '0px'
                // ------------------Input For Entering The Code -------------------//
                let codeInput = document.createElement('input');
                codeInput.setAttribute('id','codeInput')
                codeInput.style.marginBottom = '30px'
                codeInput.style.width = '220'
                codeInput.style.height = '30px'
                codeInput.style.fontSize = '18px'
                codeInput.style.border = '3px solid rgb(17, 16, 38)'
                codeInput.style.borderRadius = '10px'
                codeInput.style.color = 'rgb(17, 16, 38)'
                codeInput.style.fontWeight = '900'
                codeInput.style.paddingLeft = '5px'
                // codeInput.style
                // codeInput.style
                // -----------------Code Submit Button ----------------------//
                let codeSubmit = document.createElement('button');
                codeSubmit.innerHTML = 'Submit Code'
                codeSubmit.style.backgroundColor = 'white';
                codeSubmit.style.color = 'rgb(17, 16, 38)';
                codeSubmit.style.fontWeight = '900'
                codeSubmit.style.width = '150px'
                codeSubmit.style.height = '40px'
                codeSubmit.style.fontSize = '15px'
                codeSubmit.style.borderRadius = '10px'
                codeSubmit.style.border = '3px solid rgb(17, 16, 38)'
                // -----------------------Div Alert Children Appending -----------------------//
                divAlert.appendChild(exit)
                divAlert.appendChild(title)
                divAlert.appendChild(InputTitle)
                divAlert.appendChild(codeInput)
                divAlert.appendChild(codeSubmit)
                inputDiv.appendChild(divAlert)
                // -----------------------Event for Code Submitting ---------------------------//
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
let alert1 = document.getElementById('alert')

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
// let flag = false
// let flags = ()=>
// {
    
//     let submit = document.getElementById('submit')
//     let dont = document.getElementById('dont')
//     let signup = document.getElementById('signup')
//     let phone = document.getElementById('phone')
//     let names = document.getElementById('name')
//     if(flag == true)
//     {
//         submit.innerHTML = 'تسجيل الدخول'
//         dont.innerHTML = 'لم تسجل بعد ؟ '
//         signup.innerHTML = 'سجل الان من هنا'
//         phone.setAttribute('placeholder' , 'رقم الهاتف')
//         names.setAttribute('placeholder' , 'الاسم')
//     }
//     else
//     {
//         submit.innerHTML = 'Sign In'
//         dont.innerHTML = 'did not signed yet ?'
//         signup.innerHTML = 'Click here to sign up'
//         phone.setAttribute('placeholder' , 'Phone Number')
//         names.setAttribute('placeholder' , 'Full Name') 
//     }
// }
// let flagTurnLang = ()=>
// {
//     let lang = document.getElementById('lang').value
//     if(lang == 'eng')
//     {
//         flags()
//         return flag = false
//     }
//     else
//     {
//         flags
//        return flag = true
//     }
// }
// let flagTurnLang = ()=>
// {
//     let lang = document.getElementById('lang').value
//     let submit = document.getElementById('submit')
//     let dont = document.getElementById('dont')
//     let signup = document.getElementById('signup')
//     let phone = document.getElementById('phone');
//     let name = document.getElementById('name')
//     if(lang == 'arabic')
//     {
//         submit.innerHTML = 'تسجيل الدخول'
//         dont.innerHTML = 'لم تسجل بعد ؟ '
//         signup.innerHTML = 'سجل الان من هنا'
//         phone.setAttribute('placeholder' , 'رقم الهاتف')
//         name.setAttribute('placeholder' , 'الاسم')
//     }
//     else
//     {
//         flag = true
//         submit.innerHTML = 'Sign In'
//         dont.innerHTML = 'did not signed yet ?'
//         signup.innerHTML = 'Click here to sign up'
//         phone.setAttribute('placeholder' , 'Phone Number')
//         name.setAttribute('placeholder' , 'Full Name') 
//     }
//     localStorage.setItem("flag",flag)
// }




const signin = ()=>
{
    let name = document.getElementById('name').value
    let phoneNumber = document.getElementById('phone').value
    fetch('/',
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
        removeAllChildNodes(alert1)
        let h4 = document.createElement('h4');
        if(data == null)
        {
            
                h4.innerHTML = "الاسم والرقم غير مسجلان"
                h4.setAttribute('id','h4alert')
                h4.style.color = 'red'
                alert1.appendChild(h4)
        }
        else if (data.name == 'admin' && data.phoneNumber == 12345)
        {
            window.location.href = "/Admin";
        }
        else
        {
            let costumer = JSON.stringify(data)
            console.log(costumer)
            localStorage.setItem("costumer",costumer)
            window.location.href = "/barber";
        }
        
    }).catch((err)=>{console.log('error')})
}
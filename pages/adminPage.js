function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const deleteFunc = (val)=>
{
    console.log(val)
    let todayPosts = document.getElementById('todaysPost');

    fetch('/deleted',
        {
            headers:{
                "Content-Type": "application/json"
            },
            method:'post',
            body:JSON.stringify({
                name: val.name,
                phoneNumber:val.phoneNumber,
                date:val.date,
                time:val.time
            })
        }).then((res)=>{return res.json()}).then((data)=>
        {
            removeAllChildNodes(todayPosts)
        }
    )}
const times = ()=>
{
    let date = document.getElementById('start').value;
    let todayPosts = document.getElementById('todaysPost');
    removeAllChildNodes(todayPosts);

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
        let newArr = ()=>
        {
                for(let i = 0 ; i < data.length ; i++)
                {
                        for(let j = 0 ; j < data.length ; j++)
                        {
                                if(Number(data[i].time.substring(0,2)) < Number(data[j].time.substring(0,2)))
                                {
                                    let temp = data[i]
                                    data[i] = data[j]
                                    data[j] = temp
                                }
                                else if (Number(data[i].time.substring(0,2)) == Number(data[j].time.substring(0,2)))
                                {
                                    if(Number(data[i].time.substring(3,5)) < Number(data[j].time.substring(3,5)))
                                    {
                                        let temp = data[i]
                                        data[i] = data[j]
                                        data[j] = temp
                                    }
                                }
                        }
                }
                return data
        }
        newArr()
            return data.map((val,idx)=>
            {
            // console.log(data)
            let post = document.createElement('div')
            post.setAttribute('id','post')
            let postName = document.createElement('h3')
            let postDate = document.createElement('h3')
            let postTime = document.createElement('h3')
            let postNumber = document.createElement('h3')
            let deleteButton = document.createElement('button')
            deleteButton.innerHTML = 'الغاء الدور'
            deleteButton.setAttribute('id' , 'cancelButton')
            deleteButton.addEventListener('click',()=>{deleteFunc(val)})
            postName.innerHTML = val.name;
            postDate.innerHTML = val.date;
            postTime.innerHTML = val.time;
            postNumber.innerHTML = val.phoneNumber
            post.appendChild(postName);
            post.appendChild(postDate);
            post.appendChild(postTime);
            post.appendChild(postNumber);
            post.appendChild(deleteButton)
            todayPosts.appendChild(post);
        }) 
    })
}
const exit = ()=>
{
    window.location.href = '/'
}

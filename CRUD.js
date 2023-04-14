let id = 'no';
selectData();
// localStorage.clear();

function getCrudData(){
    let arr = JSON.parse(localStorage.getItem('crud'));
    return arr;
}

function setCrudData(arr){
    localStorage.setItem('crud',JSON.stringify(arr));
}

function addData(){
    document.getElementById('msg').innerHTML = '';
    let name = document.getElementById('name').value; 
    if(name == ''){
        document.getElementById('msg').innerHTML = 'Please enter your name...';
    }
    else{
        // let box = document.getElementById('box');
        // let list = document.createElement('li');
        // list.textContent = name;
        // box.appendChild(list);

        if(id == 'no'){
            let arr = getCrudData();
            
            if(arr==null){
                let data = [name];
                setCrudData(data);
            }
            else{
                arr.push(name);
                setCrudData(arr);
            }
            document.getElementById('msg').innerHTML = 'Data added...';
        }
        else{        // else part for edit data 
            let arr = getCrudData();
            arr[id] = name;
            setCrudData(arr); 
            document.getElementById('msg').innerHTML = 'Data updated...';

        }

        setTimeout(() => {
            location.reload();
        },1000);
        
        document.getElementById('name').value = '';
        selectData();
    }
    
}

let clearMsg = document.getElementById('name');
clearMsg.addEventListener('click',() =>{
    document.getElementById('msg').innerHTML = ''
});

// let editBtn = document.getElementById('edit');
// editBtn.addEventListener('click', () => {
    //     document.getElementById('add').value = 'Update';
    // })
    
    // let updateBtn = document.getElementById('add');
    // updateBtn.addEventListener('click', () => {
        //     document.getElementById('add').value = 'ADD'
        // })
        
function selectData(){
    let arr = getCrudData()
    
    if(arr != null){
        let table = '';
        let sr_no = 1;
        for(let i in arr){
            table = table + `<tr>
                             <td>${sr_no}</td>
                             <td>${arr[i]}</td>
                             <td> <a href="javascript:void(0)" class="data" onclick="editData(${i})">Edit</a> &nbsp </td>
                             <td> <a href="javascript:void(0)" class="data del" onclick="deleteData(${i})">Delete</a> </td>
                             </tr>`;
            sr_no++;
        }
        document.getElementById('root').innerHTML = table;
    }
    
}

function deleteData(rid){
    let arr = getCrudData();
    arr.splice(rid,1);
    setCrudData(arr);
    selectData();
    document.getElementById('msg').innerHTML = 'Data deleted...';
    setTimeout(() => {
        document.getElementById('msg').innerHTML = '';
    },1000);

}

function editData(rid){
    id = rid
    let arr = getCrudData();
    document.getElementById('name').value = arr[rid];
    document.getElementById('msg').innerHTML = 'Data modifying...';
    
}

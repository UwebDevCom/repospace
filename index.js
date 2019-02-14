
document.getElementById('btnUser').addEventListener('click',commitBuildLink);
var now = moment();

function commitBuildLink(e){
    document.querySelector('.imgLoader').setAttribute('src','https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif');
    e.preventDefault();
    let owner = document.querySelector('#owner').value;
    let reposi = document.querySelector('#repos').value;
    loadCommits(owner,reposi);
}

function loadCommits(owner,reposi){
    let fetchData = `https://api.github.com/repos/${owner}/${reposi}/commits`; 
 fetch(fetchData)
 .then(data=>data.json())
 .then(rawData=> render(newData(rawData)))
 .catch(err=>console.log(err));
}


function newData(rawData){
    return rawData.reduce((newArr,{commit,author ,committer})=>{
      newArr.push({
          message: commit.message.substr(0,50) + '...',
          avaterUrl: committer.avatar_url,
          name: commit.author.name,
          nikname: author.login,
          date: commit.author.date,
          id: commit.tree.sha,

      })
      return newArr;
    },[]);
}

function renderElements({message, avaterUrl, name, nikname, date ,id})
{
    let element = document.createElement('div');
    element.classList.add('commit');
    element.innerHTML = `
    <div class="table-list-cell ${id}">
    </div>
    <div class="commit-meta">
    <div class="url-avatar meta">
    <img src="${avaterUrl}" alt="${name}" />
    </div>
    <hr class="line" />
    <div class="login-name meta">
    <p class="login-nikname">${nikname}</p>
    </div>
    <div class="date-meta meta">
    <p class="short-date">
    ${moment(date, "YYYYMMDD").fromNow()}
    </p>
    <p class="commit-title">${message}</p><span class="title-cell-read-more"></span>
    </div>
    </div>
    `;
    return element;
}






function render(commits) { 
    document.querySelector('.imgLoader').remove();
    commits.forEach(commit=>{
    document.querySelector('section').appendChild(renderElements(commit));
});
}





/*
function getThem(){
    
    document.querySelector(".userList").innerHTML='<img src="https://media.giphy.com/media/cZDRRGVuNMLOo/giphy.gif" />';
fetch(fetchData)
.then((response)=>{return response.json();
})
.then((data)=>{
    data= data.slice(0,6);
    console.log(data);
    let placed = document.querySelector('.userList');
    let alll = data.reduce((acc,{commit,author})=>{
        let xx = document.createElement('DIV');
       
        xx.classList.add('details');
        xx.innerHTML = `
        name: ${commit.author.name}
        <br/>
        avater: <img class="avImg" src="${author.avatar_url}" alt="" />
        age: ${commit.message}
        `; 
        acc += xx.outerHTML;
        return acc
    },'');
    placed.innerHTML = alll;
    document.getElementById("btnUser").disabled = true;   
})
.catch(err=>console.log(err))
   
}
*/


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
    return rawData.reduce((newArr,{commit,author ,committer,parents})=>{
      newArr.push({
          message: commit.message.substr(0,50) + '...',
          avaterUrl: committer.avatar_url,
          name: commit.author.name,
          nikname: author.login,
          date: commit.author.date,
          id: commit.tree.sha,
          sha: parents[0].sha.substr(0,6),
          html_url:parents[0].html_url,
          verification:commit.verification.verified,

      })
      return newArr;
    },[]);
}

function renderElements({message, avaterUrl, name, nikname, date ,id,sha,html_url,verification})
{
    let verif = verification ? '<summary class="signed-commit-badge signed-commit-badge-large verified" aria-label="View commit signature" aria-haspopup="true"><span>Verified</span></summary>': '';
    let element = document.createElement('div');
    element.classList.add('commit');
    element.innerHTML = `
    <div class="table-list-cell ${id}">
    </div>
    <div class="commit-meta">
    <p class="commit-title">${message}</p><span class="title-cell-read-more"></span>
    <div class="details-meta-commit">
    <div class="url-avatar meta" onmouseleave="fuckThatMouseEvent()">
    <div class="when-hover">
    <div class="info-hover-main">
    <img src="${avaterUrl}" alt="${name}" />
    <p class="hover-name">${name}</p>
    <p class="hover-nikname">${nikname}</p>
    <p class="hover-description">
    Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.
    <p>
    <div class="hover-location">
    <img class="img-location-hover" src="https://image.flaticon.com/icons/png/512/67/67347.png" alt="#" />
    <span>London, UK</span>
    </div>
    </div>
    <div class="hover-member">
    <p>Member of Facebook, React Community, and 5 more</p>
    </div>
    </div>
    <img class="main-img-avatar" src="${avaterUrl}" alt="${name}" />
    </div>
    <div class="login-name meta">
    <p class="login-nikname">${nikname}</p>
    </div>
    <div class="date-meta meta">
    <p class="short-date">
    ${moment(date, "YYYYMMDD").fromNow()}
    </p>
    </div>
    <summary class="text-green">  
    <svg class="octicon octicon-check v-align-middle" aria-label="3 / 3 checks OK" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
    </summary>
    </div>
    </div>
    <div class="button-commit">
    ${verif}
    <clipboard-copy value="3e5556043879c9c7b98dd9edfc0e89df0366714b" aria-label="Copy the full SHA" class="btn btn-outline BtnGroup-item" tabindex="0" role="button">
      <svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg>
    </clipboard-copy>
    <a href="${html_url}" class="btn-commiter">${sha}</a>
    </div>
    `;
    return element;
}


function render(commits) { 
    document.querySelector('.imgLoader').remove();
    let lastDate =''
    function comDate(commit){
        const commitsDate = moment(commit.date).format("MMM Do YYYY");
        let comDateDiv = document.createElement('div');
        comDateDiv.classList.add('ComDateBar');
        comDateDiv.innerHTML = `<svg class="octicon octicon-git-commit" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M10.86 7c-.45-1.72-2-3-3.86-3-1.86 0-3.41 1.28-3.86 3H0v2h3.14c.45 1.72 2 3 3.86 3 1.86 0 3.41-1.28 3.86-3H14V7h-3.14zM7 10.2c-1.22 0-2.2-.98-2.2-2.2 0-1.22.98-2.2 2.2-2.2 1.22 0 2.2.98 2.2 2.2 0 1.22-.98 2.2-2.2 2.2z"></path></svg><div class="comDate"><p>${commitsDate}</p></div>`;
        return comDateDiv;
    }
    commits.forEach(commit=>{
        if (moment(commit.date).format("MMM Do YY") != lastDate) {
            document.querySelector('.commits').appendChild(comDate(commit));
        }
        document.querySelector('.commits').appendChild(renderElements(commit));
        lastDate = moment(commit.date).format("MMM Do YY");
       //console.log(lastDate);
});
function hoverAvatatImage(e)
{    
    const elementHover = e.target.parentElement.children[0];
            if (elementHover.className == "when-hover") {  
                elementHover.style.display = "block";  
            }
    
}
let timer = null;

document.querySelectorAll('.url-avatar').forEach((el)=>
{
    el.addEventListener('mouseover',function(e){
        timer = setTimeout(function(){
            hoverAvatatImage(e);
        },600);        
    });
    el.parentElement.addEventListener('mouseout',function(e){
        clearTimeout(timer);   
     });
    })
}
function fuckThatMouseEvent(){

    document.querySelectorAll('.when-hover').forEach((el)=>{
        el.style.display = 'none';
    })
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

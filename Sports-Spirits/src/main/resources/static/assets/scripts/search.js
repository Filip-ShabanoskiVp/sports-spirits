const apiKey = '6fbe9e29c5msh8b63eb96d8fc212p1fd9e6jsna0c68e516fe7';

function getTeam(searchVal){
    const url = 'https://api-football-beta.p.rapidapi.com/teams?search='+searchVal;

    var ul = document.getElementById("results");
    ul.innerText = "";

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url,options).then(res=>{
        return res.json();
    }).then(data=>{
        if(data.response.length>0){
            data.response.forEach(item=>{
                console.log(item.team.name);
                console.log(item.team.id);
                console.log(item.team.country);
                console.log("/Football/team/" + item.team.id);


                var li = document.createElement("li");
                var newTextNode = document.createTextNode(item.team.name + "(" + item.team.country + ")");
                var anchor = document.createElement('a');
                anchor.appendChild(newTextNode);
                anchor.href =  "/Football/team/" + item.team.id;
                anchor.style.textDecoration = "none";
                anchor.style.color = "white";
                li.appendChild(anchor);
                li.style.listStyle = "none"
                ul.appendChild(li);
                // document.getElementById('empty').style.display = "none";

            })
        }else {
            ul.innerText = "";

            var lista = document.createElement("li");
            lista.id = "empty";
            lista.style.color = "white";
            var node = document.createTextNode("Empty entry");
            lista.appendChild(node);
            lista.style.listStyle = "none";
            ul.appendChild(lista);

            getLeague(searchVal);
        }
    })
}

function getLeague(searchVal){

    const url = 'https://api-football-beta.p.rapidapi.com/leagues?search='+searchVal;
    var ul = document.getElementById("results");
    ul.innerText = "";

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url,options).then(res=>{
        return res.json();
    }).then(data=>{
        console.log(data);
        if(data.response.length>0) {
            data.response.forEach(item=>{

                console.log(item.league.name);
                console.log(item.league.id);
                console.log(item.league.type);
                console.log(item.country.name);
                console.log("/Football/league/" + item.league.id + "/" + item.league.type);


                var li = document.createElement("li");
                var newTextNode = document.createTextNode(item.league.name + " (" + item.country.code + ")");
                var anchor = document.createElement('a');
                anchor.appendChild(newTextNode);
                anchor.href = "/Football/league/" + item.league.id + "/" + item.league.type;
                anchor.style.textDecoration = "none";
                anchor.style.color = "white";
                li.appendChild(anchor);
                li.style.listStyle = "none"
                ul.appendChild(li);
                // document.getElementById('empty').style.display = "none";
            })
        } else {
            ul.innerText = "";

            var lista = document.createElement("li");
            lista.id = "empty";
            lista.style.color = "white";
            var node = document.createTextNode("Empty entry");
            lista.appendChild(node);
            lista.style.listStyle = "none";
            ul.appendChild(lista);
            getCoach(searchVal);

        }
    })
}

function getCoach(searchVal){
    const url = 'https://api-football-beta.p.rapidapi.com/coachs?search='+searchVal;

    var ul = document.getElementById("results");
    ul.innerText = "";

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url,options).then(res=>{
        return res.json();
    }).then(data=>{
        if(data.response.length>0){
            data.response.forEach(item=>{
                console.log(item.name);
                console.log(item.id);
                console.log("/Football/coach/" + item.id);

                var li = document.createElement("li");
                var newTextNode;
                if (item.nationality!=null) {
                    newTextNode = document.createTextNode(item.name + " (" + item.nationality + ")");
                }else {
                    newTextNode = document.createTextNode(item.name);
                }
                var anchor = document.createElement('a');
                anchor.appendChild(newTextNode);
                anchor.href = "/Football/coach/" + item.id;
                anchor.style.textDecoration = "none";
                anchor.style.color = "white";
                li.appendChild(anchor);
                li.style.listStyle = "none"
                ul.appendChild(li);
                // document.getElementById('empty').style.display = "none";
            })
        }else {
            ul.innerText = "";

            var lista = document.createElement("li");
            lista.id = "empty";
            lista.style.color = "white";
            var node = document.createTextNode("Empty entry");
            lista.appendChild(node);
            lista.style.listStyle = "none";
            ul.appendChild(lista);
        }
    })
}

function search() {
    var input, filter;

    document.getElementById('close').classList.remove("hideBtn")
    document.getElementById('close').classList.add("showBtn");

    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    getTeam(filter);
}

document.getElementById('close').onclick =function (){close()}


function close(){

    document.getElementById('results').innerText = "";

    document.getElementById('close').classList.add("hideBtn")
    document.getElementById('close').classList.remove("showBtn");
}
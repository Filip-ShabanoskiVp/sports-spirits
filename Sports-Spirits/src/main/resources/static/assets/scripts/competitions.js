function getLeagues(){
    const url = 'https://api-football-beta.p.rapidapi.com/leagues';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };
    fetch(url,options).then(res=>{
        return res.json();
    }).then(data=>{
        var leagues = document.getElementById('leagues');
        var cups = document.getElementById('cups');
        data.response.forEach(item=>{
            if(item.league.type=="League"){
                var li = document.createElement('li');
                li.style.listStyle = "none"
                var a = document.createElement('a');
                a.style.textDecoration = "none"
                a.href = "/Football/league/"+ item.league.id+"/League"
                var textNode = document.createTextNode(item.league.name + " ( " + item.country.name + " )");
                a.appendChild(textNode);
                li.appendChild(a);
                leagues.appendChild(li);
            }
            else {
                var li = document.createElement('li');
                li.style.listStyle = "none"
                var a = document.createElement('a');
                a.style.textDecoration = "none"
                a.href = "/Football/league/"+ item.league.id+"/Cup"
                var textNode = document.createTextNode(item.league.name + " ( " + item.country.name + " )");
                a.appendChild(textNode);
                li.appendChild(a);
                cups.appendChild(li);
            }
        })
    })
}
// getLeagues()
var teamId = document.getElementById('teamId').value;

function showTeam(){
    const url = 'https://api-football-beta.p.rapidapi.com/teams?id='+teamId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url,options)
        .then(res=>{
            return res.json();
        })
        .then(data=> {
            data.response.forEach(item => {
                document.getElementById('CountryName').innerText =  item.team.country;

                document.getElementById("teamImg").innerHTML = "<img src='"+item.team.logo+"' />"
                document.getElementById("teamName").innerHTML = "<h3 style='margin-top: 25px'>"+item.team.name+"</h3>";

            })
        })
}
// showTeam();

function showTeamTransfers(){

    const url = 'https://api-football-beta.p.rapidapi.com/transfers?team='+teamId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=>{
        var bodyRef = document.getElementById('teamTransfers').getElementsByTagName('tbody')[0];
        data.response.forEach(item=>{
            item.transfers.forEach(transfer=>{

                console.log(transfer.date)
                var newRow = bodyRef.insertRow();

                var newCell1 = newRow.insertCell();
                var newText1 = document.createTextNode(transfer.date);
                newCell1.appendChild(newText1);

                var newCell2 = newRow.insertCell();
                var newText2 = document.createTextNode(item.player.name);
                newCell2.appendChild(newText2);

                var newCell3 = newRow.insertCell();
                var newText3 = document.createTextNode(transfer.type);
                newCell3.appendChild(newText3);

                var newCell4 = newRow.insertCell();
                newCell4.innerHTML = "<img src='"+ transfer.teams.in.logo +"'  height='40' width='40'/>"

                var newCell5 = newRow.insertCell();
                var newText5 = document.createTextNode(transfer.teams.in.name);
                newCell5.appendChild(newText5);

                var newCell5 = newRow.insertCell();
                newCell5.innerHTML = "<img src='"+ transfer.teams.out.logo +"'  height='40' width='40'/>"

                var newCell7 = newRow.insertCell();
                var newText7 = document.createTextNode(transfer.teams.out.name);
                newCell7.appendChild(newText7);

            })
        })
    })
}
// showTeamTransfers();
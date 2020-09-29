

const form=document.getElementById('vote-form');
 console.log(form)
form.addEventListener('submit',e=>{
   
    const choice=document.querySelector('input[name=Cars]:checked').value;
    console.log(choice)
    const data={cars:choice}

fetch('http://localhost:3000/poll',{
    method:'post',
    body:JSON.stringify(data),
    headers:new Headers({
        'Content-Type':'application/json'
    })
})
.then(res=>res.json())
.then(data=>console.log(data))
.catch(err=>console.log(err))
e.preventDefault();
})
fetch('http://localhost:3000/poll')
.then(res=>res.json())
.then(data=>{

    const votes=data.votes;
    console.log(1,votes);
    const totalVotes=votes.length;
    console.log(2,totalVotes);
    const voteCounts=votes.reduce((acc,vote)=>((acc[vote.os]=(acc[vote.os]|| 0)+parseInt(vote.points)),acc))
console.log(3,voteCounts)

let   dataPoints= [
    { label: 'BMW', y: voteCounts.BMW },
    { label: 'Opel', y: voteCounts.Opel },
    { label: 'Jeep', y: voteCounts.Jeep },
    { label: 'Kia', y: voteCounts.Kia },
    { label: 'Audi', y: voteCounts.Audi },
    { label: 'Somethingelse', y: voteCounts.Somethingelse }
    
]
const chartContainer= document.querySelector('#chartContainer');
if(chartContainer){
const chart = new CanvasJS.Chart('chartContainer',
 {
    animationEnabled: true,
  
    theme: "theme1", 
    title:{
        text: "Cars Reslut"
    },
    
    data: [{
        type: "column", 
        dataPoints:dataPoints
}
    ]

})
chart.render();
Pusher.logToConsole=true
const pusher = new Pusher('6306b08bda5cf3c2eb33', {
    cluster: 'eu'
  });
  var channel = pusher.subscribe('Cars-poll');


channel.bind('Cars-vote', function(data) {
    dataPoints=dataPoints.map(x=>{
        if(x.label==data.os){
          x.y+=data.points 
          console.log(22,x)
        return x
    }else{
        return x
    }
    
    })
    chart.render();
    console.log(11,dataPoints)
  });



}


})




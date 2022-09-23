// Make tag 'h2' invisible until API execution

document.getElementsByTagName("h2")[0].style.visibility='hidden';

// Personal API Key for OpenWeatherMap API

const urlAPI = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// const apiKey = API key for using in aplication;

// Date of day

const date = new Date();

const today = date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear();

// TODO-Call to the function 'consultDataAPI'

document.getElementById('consult').addEventListener('click', consultDataAPI);

// Function 'consultDataAPI'

function consultDataAPI() {
  const zipCode = document.getElementById('zipcode').value + ',us&appid='
  getData(urlAPI, zipCode, apiKey)
  .then(function(data) {
    const feelings = document.getElementById('feelings').value
    postData('/addData', {date: today, temp: data.main.temp, content: feelings})
    updateUI()
  })
};

const getData = async (urlAPI, zipCode, apiKey)=>{
  const res = await fetch(urlAPI+zipCode+apiKey);

  try {
    
    const data = await res.json();
    return data;

  } 
  
  catch(error) {

    console.log("error", error);

  }

}

const postData = async(url='', data = {})=> {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }

}

const updateUI = async () => {
  const request = await fetch('/getData');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = 'Date: ' + allData[0].date;
    document.getElementById('temp').innerHTML = 'Temp: ' + allData[0].temp;
    document.getElementById('content').innerHTML = 'Content: ' + allData[0].content;
  } catch (error) {
    console.log('error', error)
  }
}
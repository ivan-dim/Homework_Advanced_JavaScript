document.getElementById("header").innerText = "Weather Alert App";
document.getElementById("greetingResult").innerText = "Welcome to the most accurate weather app!";

//navigation service is responsible for everything connected to the navigation of our app. This is why we keep all the properties and methods here
//we want everything that is connected to the navigation to be in one place
let navigationService = {
    navItems: document.getElementsByClassName("nav-item"),
    pages: document.getElementsByClassName("page"),
    citySearchBtn: document.getElementById("citySearchBtn"),
    citySearchInput: document.getElementById("citySearchInput"),
    activateItem: function(item){
        for(let navItem of this.navItems){
            navItem.classList.remove("active");
        }
        item.classList.add("active");
    },
    displayPage: function(index){
        for(let page of this.pages){
            page.style.display="none";
        }
        this.pages[index].style.display="block";
    },
    registerEventListeners: function(){
        for(let i=0; i<this.navItems.length; i++){
            this.navItems[i].addEventListener("click", function(){
                navigationService.activateItem(this); //this=> target of the event in our case navItems[i]
                navigationService.displayPage(i);
            });
        }
        this.citySearchBtn.addEventListener("click", function () {
            console.log(`Search input: ${navigationService.citySearchInput.value}`);
            if (navigationService.citySearchInput.value) { //it will only make the call if there is a value entered in the TEMPTEST
                weatherApiService.getWeatherData(navigationService.citySearchInput.value);
            }
        });
    }
};
navigationService.registerEventListeners(); //we need to call the function of the object to tell the listener to start listening

let weatherApiService = {
    apiKey: "d82286dccef7388ed2e5c477c1ee29cb",
    getWeatherData: async function(city){
         // fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.apiKey}`) //promise
        // .then(function(response){ //response is a complex Response that contains the content itself
        //     response.json() //promise
        //     .then(function(data){
        //         console.log(data); //here we have the js objects 
        //     })
        //     .catch(function(errorParse){
        //         console.log(errorParse);
        //     })

        // })
        // .catch(function(error){
        //     console.log(error);
        // })
        try {
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.apiKey}`;
            let response = await fetch(url); //we need to wait for the response from this fetch so that we can continue with our logic in the try block
            let data = await response.json();
            console.log(data);
            let statisticsData = statisticsService.calculateStatistics(data);
            uiService.displayStatistics(statisticsData);
            uiService.loadHourlyData(data);
            this.sortedData = data; 
        } catch (error) {
            console.log("An error occurred!", error);
        }
    }
};

let statisticsService = {
    calculateStatistics: function(data){
       // debugger
        //initial values are always set before the iteration of the elements
        // let tempSum = 0;
        // let humiditySum = 0;
        // let minTemp = data.list[0].main.temp;
        // let maxTemp = data.list[0].main.temp;
        // let minHumidiy = data.list[0].main.humidity;
        // let maxHumidiy = data.list[0].main.humidity;

        // for(let listItem of data.list){
        //     tempSum += listItem.main.temp;
        //     humiditySum += listItem.main.humidity;

        //     if(listItem.main.temp < minTemp){ //if the list item temp is smaller than the current value of minTemp, our list item temp should be the new value of minTemp
        //         minTemp = listItem.main.temp
        //     }

        //     if(listItem.main.temp > maxTemp){ //if the list item temp is larger than the current value of maxTemp, our list item temp should be the new value of maxTemp
        //         maxTemp = listItem.main.temp;
        //     }

        //     if(listItem.main.humidity < minHumidiy){
        //         minHumidiy = listItem.main.humidity;
        //     }

        //     if(listItem.main.humidity > maxHumidiy){
        //         maxHumidiy = listItem.main.humidity;
        //     }
        // }

        // let avgTemp = tempSum/data.list.length;
        // let avgHumidity = humiditySum/data.list.length;

        // let result = {
        //     averageTemperature: avgTemp,
        //     averageHumidity : avgHumidity,
        //     minTemperature: minTemp,
        //     maxTemperature: maxTemp,
        //     minHumidity: minHumidiy,
        //     maxHumidiy: maxHumidiy
        // };
        // return result;
        
        let initialValues = {
            tempSum : 0,
            humiditySum : 0,
            minTemp : data.list[0].main.temp,
            maxTemp : data.list[0].main.temp,
            minHumidiy : data.list[0].main.humidity,
            maxHumidiy : data.list[0].main.humidity,
           }
                                       //in result - initialValues is passed, and in item the current item from data.list
           let res = data.list.reduce(function(result, item){
             result.tempSum += item.main.temp;
             result.humiditySum += item.main.humidity;
   
             if(item.main.temp < result.minTemp){
               result.minTemp = item.main.temp;
             }
   
             if(item.main.temp > result.maxTemp){
               result.maxTemp = item.main.temp;
             }
   
             if(item.main.humidity < result.minHumidity){
               result.minHumidity = item.main.humidity;
             }
   
             if(item.main.humidity > result.maxHumidiy){
               result.maxHumidiy = item.main.humidity;
             }
   
             return result;
           }, initialValues);
   
           //initialValues is the object which we use as inital value for reduce
           //it is being passed in each iteration of reduce
           //in each iteration the values of the initialValues properties can change
           //at the end we have sums and mins and maxs in initialValues properties
           //initialValues is passed by reference in each iteration as the result param
           //so when we change the values of the result properties, the values of the properties of initialValues 
           //are changed and affected as well
           console.log(initialValues);
           console.log(res);
   
           //here we make an object that contains the six result values that we need for our home page
           let statisticsResult ={
               averageTemperature: initialValues.tempSum /  data.list.length,
               averageHumidity : initialValues.humiditySum / data.list.length,
               minTemperature: initialValues.minTemp,
               maxTemperature: initialValues.maxTemp,
               minHumidity: initialValues.minHumidiy,
               maxHumidiy: initialValues.maxHumidiy
           }
   
           return statisticsResult;
       }
   }
   

let aboutInfo = {
    creator: "G6",
    academy: "Qinshift Academy",
    year: 2025
};

//the uiService contains the logic about everyhing that needs to be shown on the user interface (ui)
let uiService = {
    showAboutInfo: function(){
        document.getElementById("aboutResult").innerHTML=`<h2>This app is created by ${aboutInfo.creator} from the ${aboutInfo.academy}</h2>
        <p><b>${aboutInfo.year}</b></p>`;
    },
    displayStatistics: function(statisticsData) {
        document.getElementById("statisticsResult").innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-6">AVG TEMP: ${statisticsData.averageTemperature} C</div>
                <div class="col-6">AVG HUMIDITY: ${statisticsData.averageHumidity} %</div>
            </div>
            <div class="row">
                <div class="col-6">MIN TEMP: ${statisticsData.minTemperature} C</div>
                <div class="col-6">MIN HUMIDITY: ${statisticsData.minHumidity} %</div>
            </div>
            <div class="row">
                <div class="col-6">MAX TEMP: ${statisticsData.maxTemperature} C</div>
                <div class="col-6">MAX HUMIDITY: ${statisticsData.maxHumidity} %</div>
            </div>
        </div>`;
    },
    loadHourlyData: function(data) {
        let hourlyResult = document.getElementById("hourlyTableResult");
        hourlyResult.innerHTML = "";
        hourlyResult.innerHTML = `
        <div class="sort-row">
            <button onclick="sortedData('date')">Sort by Date</button>
            <button onclick="sortedData('temp')">Sort by Temp</button>
            <button onclick="sortedData('humidity')">Sort by Humidity</button>
            <button onclick="sortedData('wind')">Sort by Wind</button>
        </div>`;
    
        for (let item of data.list) {
            hourlyResult.innerHTML += `
            <div class="row">
                <div class="col-2">
                    <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}" />
                </div>
                <div class="col-2">
                   <b> ${item.weather[0].description}</b>
                </div>
                <div class="col-2">
                   <b> ${new Date(item.dt * 1000).toDateString()}</b>
                </div>
                <div class="col-2">
                    <b>Temperature:</b> ${(item.main.temp.toFixed(2))} C (Feels like ${(item.main.feels_like.toFixed(2))} C)
                </div>
                <div class="col-2">
                    <b>Humidity:</b> ${item.main.humidity} %
                </div>
                <div class="col-2">
                    <b>Wind Speed:</b> ${item.wind.speed} km/h
                </div>
            </div>`;
        }
    }
    
    
};

let sortOrder = {
    date: true,
    temp: true,
    humidity: true,
    wind: true
};

function sortedData(TEMPTEST) {
    sortOrder[TEMPTEST] = !sortOrder[TEMPTEST]

    if (TEMPTEST == 'date') {
        weatherApiService.sortedData.list.sort((date1, date2) => sortOrder[TEMPTEST] ? date1.dt - date2.dt : date2.dt - date1.dt);
    } else if (TEMPTEST == 'temp') {
        weatherApiService.sortedData.list.sort((temp1, temp2) => sortOrder[TEMPTEST] ? temp1.main.temp - temp2.main.temp : temp2.main.temp - temp1.main.temp);
    } else if (TEMPTEST == 'humidity') {
        weatherApiService.sortedData.list.sort((humidity1, humidity2) => sortOrder[TEMPTEST] ? humidity1.main.humidity - humidity2.main.humidity : humidity2.main.humidity - humidity1.main.humidity);
    } else if (TEMPTEST == 'wind') {
        weatherApiService.sortedData.list.sort((wind1, wind2) => sortOrder[TEMPTEST] ? wind1.wind.speed - wind2.wind.speed : wind2.wind.speed - wind1.wind.speed);
    }
    
    uiService.loadHourlyData(weatherApiService.sortedData);
}



uiService.showAboutInfo();
weatherApiService.getWeatherData("Skopje");
console.log("Test");

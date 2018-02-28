/* 
 * GreenBean_JS.JS
 * 
 */
 
/******************************************************************************
 * 
 * Object Definitions
 * 
 ******************************************************************************/

/* constructor for goals_t objects */


/* global variables */
var elapsed_time;
var match_period;

/* Penalty Variables */
var penalty_auto = 0;
var technical_auto = 0;
var penalty_tele = 0;
var technical_tele = 0;

var event_stack = new Array();
var penalty_stack = new Array();

/* autonomous */

var auto_start_time;
var auto_current_time;
var auto_elapsed_time;

/* teleoperated */

var tele_start_time;
var tele_current_time;
var tele_elapsed_time;


var tele_driving = 0;
var tele_robot_block = 0;
var tele_robot_block_time = 0;

let timerID = setInterval(update_timer_display, 100);


/* end game */
var end_climb_speed = 0;

var unsubmittedData = new Array();

/******************************************************************************
 * Internal Functions
 *      These functions are to be handled internally in this .js file. Do not 
 *      call these externally.
 ******************************************************************************/

/*
 * Update Scoring Data
 */
function update_data()
{
    /* autonomous data */

    
    /* teleop data */
        
    tele_driving = document.getElementById('driving_ability').value;
    tele_robot_block = document.getElementById('robot_block').value;
    tele_robot_block_time = document.getElementById('robot_block_time').value;
        
        
    /* end data */
    end_climb_speed = document.getElementById('climb_speed').value;

    
    /* update display */
    disp_update();
}

function proccess_Period(type){
    var time = -1;
    
	switch(type){
		case 'StartAuto':
		console.log('Start Of Auto');
		auto_start_time = Date.now();
		match_period = 'auto';
        time = 0;
		break;
	
		case 'StartTeleop':
		console.log('Start of Teleop');
		tele_start_time = Date.now();
		match_period = 'tele';
        time = 0;
		break;

		case 'EndMatch':
		console.log('End of Match');
        match_end_time = Date.now() - tele_start_time;
		console.log(match_end_time);
        time = match_end_time;
        match_period = 'none';
		break;
	}
    
    if(time >= 0){
        event_stack.push([match_period, type, time/1000.0]);
        console.log(getEventsString());
    }
    
    disp_update();
	
}

function proccess_Event(type){
    var time = -1;
	switch (type){
        case 'CrossBaseline':
            console.log('Processing Baseline Cross');
            if(match_period == 'auto') {
                auto_current_time = Date.now();
                auto_elapsed_time = auto_current_time - auto_start_time;
                console.log(auto_elapsed_time);
                time = auto_elapsed_time;
            }
		
		break;
        
		case 'PickedUpCube':
            console.log('Processing Cube Picked Up');
            if(match_period == 'auto') {
                auto_current_time = Date.now();
                auto_elapsed_time = auto_current_time - auto_start_time;
                console.log(auto_elapsed_time);
                time = auto_elapsed_time;
            } else if (match_period == 'tele') {
                tele_current_time = Date.now();
                tele_elapsed_time = tele_current_time - tele_start_time;
                console.log(tele_elapsed_time);
                time = tele_elapsed_time;
            } 
		
		break;
        
		case 'DroppedCube':
            console.log('Processing Cube Dropped');
            if(match_period == 'auto') {
                auto_current_time = Date.now();
                auto_elapsed_time = auto_current_time - auto_start_time;
                console.log(auto_elapsed_time);
                time = auto_elapsed_time;
            } else if (match_period == 'tele') {
                tele_current_time = Date.now();
                tele_elapsed_time = tele_current_time - tele_start_time;
                console.log(tele_elapsed_time);
                time = tele_elapsed_time;
            } 
		
		break;
	
		case 'PlacedOnScale':
            console.log('Processing Cube Placed On Scale');

            if(match_period == 'auto') {
                auto_current_time = Date.now();
                auto_elapsed_time = auto_current_time - auto_start_time;
                console.log(auto_elapsed_time);
                time = auto_elapsed_time;
            } else if (match_period == 'tele') {
                tele_current_time = Date.now();
                tele_elapsed_time = tele_current_time - tele_start_time;
                console.log(tele_elapsed_time);
                time = tele_elapsed_time;
            }	
		
		break;
		
		case 'PlacedOnSwitch':
            console.log('Processing Cube Placed On Switch');

            if(match_period == 'auto') {
                auto_current_time = Date.now();
                auto_elapsed_time = auto_current_time - auto_start_time;
                console.log(auto_elapsed_time);
                time = auto_elapsed_time;
            } else if (match_period == 'tele') {
                tele_current_time = Date.now();
                tele_elapsed_time = tele_current_time - tele_start_time;
                console.log(tele_elapsed_time);
                time = tele_elapsed_time;
            }
		break;
		
        case 'PlacedOnOpSwitch':
            console.log('Processing Cube Placed On Opponents Switch');
            if(match_period == 'auto') {
                auto_current_time = Date.now();
                auto_elapsed_time = auto_current_time - auto_start_time;
                console.log(auto_elapsed_time);
                time = auto_elapsed_time;
            } else if (match_period == 'tele') {
                tele_current_time = Date.now();
                tele_elapsed_time = tele_current_time - tele_start_time;
                console.log(tele_elapsed_time);
                time = tele_elapsed_time;
            } 

		break;
		
		case 'PlacedInExchange':
            console.log('Processing Cube Placed In Exchange');

            if(match_period == 'auto') {
                auto_current_time = Date.now();
                auto_elapsed_time = auto_current_time - auto_start_time;
                console.log(auto_elapsed_time);
                time = auto_elapsed_time;
            } else if (match_period == 'tele') {
                tele_current_time = Date.now();
                tele_elapsed_time = tele_current_time - tele_start_time;
                console.log(tele_elapsed_time);
                time = tele_elapsed_time;
            } 				

		break;
        
        default:
            console.log('developers did something wrong' );
        break;
	}
    
    if(time >= 0){
        event_stack.push([match_period, type, time/1000.0]);
        console.log(getEventsString());
    }

    disp_update();
}

function getEventsString(){
    outputStr = "";
    
    outputStr += "{";
    event_stack.forEach(function(item,index,array){
        outputStr += "(";
        outputStr += item;
        outputStr += "),";
    });
    
    outputStr += "}";
    return outputStr;
}

function update_match_state(){
    if(match_period == 'none'){
        document.getElementById("MatchState").innerHTML = "Match State: Not Running";
    } else if (match_period == 'tele'){
        document.getElementById("MatchState").innerHTML = "Match State: Teleop";
    } else if (match_period == 'auto') {
        document.getElementById("MatchState").innerHTML = "Match State: Auto";
    }
}

function update_timer_display(){
    if(match_period == 'none'){
        document.getElementById("TimeDisp").innerHTML = "Time = 0.0";
    } else if (match_period == 'tele'){
        tele_elapsed_time = Date.now() - tele_start_time;
        document.getElementById("TimeDisp").innerHTML = "Time = " + tele_elapsed_time/1000.0;
    } else if (match_period == 'auto') {
        auto_elapsed_time = Date.now() - auto_start_time;
        document.getElementById("TimeDisp").innerHTML = "Time = " + auto_elapsed_time/1000.0;
    }
}

/* 
 * Updates the page displays
 */
function disp_update()
{
    update_match_state();
    


    
    switch(tele_driving)
    {
        case '0':
            document.getElementById("tele_driving_display").innerHTML = "Little or No Movement";
            break;
        case '1':
            document.getElementById("tele_driving_display").innerHTML = "Poor Driving";
            break;
        case '2':
            document.getElementById("tele_driving_display").innerHTML = "Good Driving";
            break;
        case '3':
            document.getElementById("tele_driving_display").innerHTML = "Exceptional Driving";
            break;
    }
    
    document.getElementById("tele_robot_block_time_display").innerHTML = tele_robot_block_time;
    switch(tele_robot_block)
    {
        case '0':
            document.getElementById("tele_robot_block_display").innerHTML = "Awful / None";
            break;
        case '1':
            document.getElementById("tele_robot_block_display").innerHTML = "Not Very Effective";
            break;
        case '2':
            document.getElementById("tele_robot_block_display").innerHTML = "Good";
            break;
        case '3':
            document.getElementById("tele_robot_block_display").innerHTML = "It's Super Effective!";
            break;
    }
        
    /* end */
    document.getElementById("end_climb_speed_display").innerHTML = end_climb_speed;

    var overallrating = document.getElementById("Overall_Rating").value;
    switch(overallrating)
    {
        case '0':
            document.getElementById("post_overallrating").innerHTML = "Do Not Pick";
            break;
        case '1':
            document.getElementById("post_overallrating").innerHTML = "Below Average";
            break;
        case '2':
            document.getElementById("post_overallrating").innerHTML = "Average";
            break;
        case '3':
            document.getElementById("post_overallrating").innerHTML = "Top Team";
            break;
    }
    
    /* penalty */
    document.getElementById("penalty_display1").innerHTML = penalty_auto;
    document.getElementById("technical_display1").innerHTML = technical_auto;
    document.getElementById("penalty_display2").innerHTML = penalty_tele;
    document.getElementById("technical_display2").innerHTML = technical_tele;
}

/*
 * Handles key presses
 */
function keyPressHandler(event) {
    var x = event.key;
    console.log("The pressed key was: " + x);
    if (x == " "){ 
        proccess_Event('PickedUpCube');
    }
    if (x == "w"){ 
        proccess_Event('PlacedOnSwitch');
    }
    if (x == "a"){ 
        proccess_Event('PlacedOnScale');
    }
    if (x == "s"){ 
        proccess_Event('PlacedOnOpSwitch');
    }
    if (x == "d"){ 
        proccess_Event('PlacedInExchange');
    }
    if (x == "1"){ 
        proccess_Period('StartAuto');
    }
    if (x == "2"){ 
        proccess_Period('StartTeleop');
    }
    if (x == "3"){ 
        proccess_Period('EndMatch');
    }
}


/*
 * Asses a penalty
 */
function new_penalty(type)
{
    var period = match_period;
    console.log('got new penalty ' + type + ' ' + period);
    switch(period)
    {
        case 'auto':
            switch(type)
            {
                case 'penalty':
                    penalty_auto++;
                    break;
                case 'technical':
                    technical_auto++;
                    break;
            }
            break;
        case 'tele':
            switch(type)
            {
                case 'penalty':
                    penalty_tele++;
                    break;
                case 'technical':
                    technical_tele++;
                    break;
            }
            break;
    }
    penalty_stack.push([type,period]);
}


function save_data()
{
    var matchData = document.getElementById("scout_name_in").value + ",";
    matchData += document.getElementById("team_number_in").value + ",";
    matchData += document.getElementById("match_number_in").value + ",";
    matchData += document.getElementById("match_type").value + ",";
	

    matchData += tele_driving + ",";
    matchData += tele_robot_block + ",";
    matchData += tele_robot_block_time + ",";

    matchData += end_climb_speed + ",";
    matchData += penalty_auto + ",";
    matchData += technical_auto + ",";
    matchData += penalty_tele + ",";
    matchData += technical_tele + ",";
    matchData += overallrating = document.getElementById("Overall_Rating").value + ",";   
    var comments = document.getElementById("Comments").value;
    comments = comments.replace(/,/g,"_"); //Get rid of commas so we don't mess up CSV
    comments = comments.replace("\n","   ");
    matchData += comments + "\n";
    var existingData = localStorage.getItem("MatchData");
    if(existingData == null)
        localStorage.setItem("MatchData",matchData);
    else
        localStorage.setItem("MatchData",existingData + matchData);
    document.getElementById("HistoryCSV").value = localStorage.getItem("MatchData");

    Server_Submit(matchData);
}

//Clears all data in the form.  
//Do not call this unless it is ok to actually clear all data.
//This only resets stuff Nick felt should be reset
function reset_form()
{
    document.getElementById("team_number_in").value = "";
    document.getElementById("match_number_in").value++;
    

	document.getElementById("startingPositionRight").checked = false;
	document.getElementById("startingPositionCenter").checked = false;
	document.getElementById("startingPositionLeft").checked = false;
    
    

    event_stack = new Array();



    tele_robot_block = 0;
    tele_robot_block_time = 0;


    document.getElementById("driving_ability").value = 0;
    document.getElementById("robot_block").value = 0;
    document.getElementById("robot_block_time").value = 0;

    end_climb_speed = 0;
    document.getElementById("climb_speed").value = 0;
    
    
    penalty_stack = new Array();
    penalty_auto = 0;
    technical_auto = 0;
    penalty_tele = 0;
    technical_tele = 0;
    document.getElementById("Overall_Rating").value = 0;
    document.getElementById("Comments").value="";
    
    
    update_data();
}


/* 
 * functions to be called from outside this .js file
 * 
 */

/*
 * Robot Climbed.
 */
            
/*
 * Penalty comitted
 */
function Penalty(type,period)
{
    new_penalty(type,period);
 
    /* update point totals */
    update_data();
}

//Undo an event
function Undo_Event(){
    event_stack.pop();
    update_data();
}

//Undo a score if possible
function Undo_Score(period)
{
    update_data();
}

//Undo a penalty if possible
function Undo_Penalty()
{
    if(penalty_stack.length > 0)
    {
        var p = penalty_stack.pop();
        var type = p[0];
        var period = p[1];
        switch(period)
        {
            case 'auto':
                switch(type)
                {
                case 'penalty':
                    penalty_auto--; break;
                case 'technical':
                    technical_auto--; break;
                }
                break;
            case 'tele':
                switch(type)
                {
                case 'penalty':
                    penalty_tele--; break;
                case 'technical':
                    technical_tele--; break;
                }
                break;
        }
    }
    update_data();
}

function Submit_Report()
{
    save_data();
    reset_form();
}

function Clear_History()
{
    if(document.getElementById("history_password").value == "Beans")
    {
        localStorage.clear();
        document.getElementById("HistoryCSV").value = "";
        $("#HistoryPass").hide(100,null);
    }
    else
    {
        document.getElementById("history_password").value = "Incorrect Password";
    }
}

function Server_Submit(matchData)
{
    var xmlhttp = new XMLHttpRequest();

    var sendData = "matchData=";
    sendData += matchData;

    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            if(xmlhttp.status == 200)
            {
                if(unsubmittedData.length > 0)
                    Server_Submit(unsubmittedData.pop());
                return;
            }
            else
            {
                alert("Error submitting data - check that server is up!");
                unsubmittedData.push(matchData);
            }
        }
    };

    xmlhttp.open("GET", "logMatches.php?" + sendData, true);
    xmlhttp.send();
}
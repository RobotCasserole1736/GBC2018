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

var cube_possessed = true;

/*counters*/
var auto_cross_baseline_counter = 0;
var auto_pick_up_cube_counter = 0;
var auto_dropped_cube_counter = 0;
var auto_placed_switch_counter = 0;
var auto_placed_scale_counter = 0;
var auto_placed_in_exchange_counter = 0;
var teleop_pick_up_cube_counter = 0;
var teleop_dropped_cube_counter = 0;
var teleop_placed_switch_counter = 0;
var teleop_placed_scale_counter = 0;
var teleop_placed_op_switch_counter = 0;
var teleop_placed_in_exchange_counter = 0;

/* Averages */
var time_to_place_scale_avg = 0;
var time_to_place_switch_avg = 0;
var time_to_place_op_switch_avg = 0;
var time_to_place_exchange_avg = 0;

/* Accumulators */
var cube_carry_time_accum = 0;

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

    updateEventStats();
    
    /* update display */
    disp_update();
}

function proccess_Period(type){
    elapsed_time = -1;
    
	switch(type){
        case 'StartAuto':
            start_auto();
		break;
	
		case 'StartTeleop':
            start_teleop();
		break;

		case 'EndMatch':
            end_match();
		break;
	}
    
    if(elapsed_time >= 0){
        event_stack.push([match_period, type, elapsed_time/1000.0]);
        console.log(getEventsString());
    }
    
    updateEventStats();
    disp_update();
    

}

function start_auto(){
    console.log('Start Of Auto');
    auto_start_time = Date.now();
    match_period = 'auto';
    elapsed_time = 0;
}

function start_teleop(){
    console.log('Start of Teleop');
    tele_start_time = Date.now();
    match_period = 'tele';
    elapsed_time = 0;
}

function end_match(){
    console.log('End of Match');
    match_end_time = Date.now() - tele_start_time;
    console.log(match_end_time);
    elapsed_time = match_end_time;
    match_period = 'none';
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
    }

    updateEventStats();
    disp_update();
}

//Simple csv of all events in stack
function getEventsString(){
    var outputStr = "";
    
    event_stack.forEach(function(item,index,array){
        outputStr += item;
        outputStr += ",";
    });
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


function updateEventStats(){
    console.log("updating match stats");    
    var has_cube = true; //Presume all robots start with cube. Even if they don't this is still an ok assumption
    var cube_ack_time = 0;
    var prev_period_cube_pos_time = 0;
    
    /* placment accumulators */
    var time_to_place_scale_accum = 0;
    var time_to_place_switch_accum = 0;
    var time_to_place_op_switch_accum = 0;
    var time_to_place_exchange_accum = 0;
    
    //Reset counters, will be repopulated.
    auto_cross_baseline_counter = 0;
	auto_pick_up_cube_counter = 0;
    auto_dropped_cube_counter = 0;
    auto_placed_scale_counter = 0;
    auto_placed_switch_counter = 0;
    auto_placed_in_exchange_counter = 0;
	
    teleop_pick_up_cube_counter = 0;
    teleop_dropped_cube_counter = 0;
    teleop_placed_scale_counter = 0;
    teleop_placed_switch_counter = 0;
    teleop_placed_op_switch_counter = 0;
    teleop_placed_in_exchange_counter = 0;
    cube_carry_time_accum = 0;
    
    event_stack.forEach(function(item,index,array){
        console.log(item);
        
        //Count up events
		if(item[0] == 'auto') {
			if(item[1] == 'CrossBaseline')
				auto_cross_baseline_counter++;
			else if(item[1] == 'PickedUpCube')
				auto_pick_up_cube_counter++;
			 else if(item[1] == 'DroppedCube')
				auto_dropped_cube_counter++;
			 else if(item[1] == 'PlacedOnScale')
				auto_placed_scale_counter++;
			 else if(item[1] == 'PlacedOnSwitch')
				auto_placed_switch_counter++;
			 else if(item[1] == 'PlacedInExchange')
				auto_placed_in_exchange_counter++;
		} else {
			if(item[1] == 'PickedUpCube')
				teleop_pick_up_cube_counter++;
			 else if(item[1] == 'DroppedCube')
				teleop_dropped_cube_counter++;
			 else if(item[1] == 'PlacedOnScale')
				teleop_placed_scale_counter++;
			 else if(item[1] == 'PlacedOnSwitch')
				teleop_placed_switch_counter++;
			 else if(item[1] == 'PlacedOnOpSwitch')
				teleop_placed_op_switch_counter++;
			 else if(item[1] == 'PlacedInExchange')
				teleop_placed_in_exchange_counter++;
		}
        
            
        //calc averages
        if(has_cube){
            if(item[1] == 'PlacedOnScale'){
                cube_carry_time_accum += (item[2] - cube_ack_time);
                time_to_place_scale_accum += (item[2] - cube_ack_time);
                time_to_place_scale_avg = time_to_place_scale_accum / (teleop_placed_scale_counter + auto_placed_scale_counter);
                has_cube = false;
            } else if(item[1] == 'PlacedOnSwitch') {
                cube_carry_time_accum += (item[2] - cube_ack_time);
                time_to_place_switch_accum += (item[2] - cube_ack_time);
                time_to_place_switch_avg = time_to_place_switch_accum / (teleop_placed_switch_counter + auto_placed_switch_counter);
                has_cube = false;
            } else if(item[1] == 'PlacedOnOpSwitch') {
                cube_carry_time_accum += (item[2] - cube_ack_time);
                time_to_place_op_switch_accum += (item[2] - cube_ack_time);
                time_to_place_op_switch_avg = time_to_place_op_switch_accum / teleop_placed_op_switch_counter;
                has_cube = false;
            } else if(item[1] == 'PlacedInExchange') {
                cube_carry_time_accum += (item[2] - cube_ack_time);
                time_to_place_exchange_accum += (item[2] - cube_ack_time);
                time_to_place_exchange_avg = time_to_place_exchange_accum / (teleop_placed_in_exchange_counter + auto_placed_in_exchange_counter);
                has_cube = false;
            } else if(item[1] == 'DroppedCube') {
                cube_carry_time_accum += (item[2] - cube_ack_time);
                has_cube = false;
            } else if(item[1] == 'StartTeleop') {
                console.log('teleop start with cube detected');
                cube_carry_time_accum += (15 - cube_ack_time);
                cube_ack_time = 0; //handle mode transition
            } else if(item[1] == 'EndMatch') {
                cube_carry_time_accum += (135 - cube_ack_time);
                cube_ack_time = 0; //handle mode transition
            }
            
        }
        
        if(item[1] == 'StartAuto') {
            has_cube = true;
            cube_carry_time_accum = 0;
            cube_ack_time = 0; //handle mode transition
        }

        //Track cube possession
        if(item[1] == 'PickedUpCube'){
            has_cube = true;
            cube_ack_time = item[2];
        }
        
        
    });
    
    //Take the final assignment of "has_cube" and send to the global variable
    if(match_period == 'none'){
        cube_possessed = true;
    } else {
        cube_possessed = has_cube;
    }
    
}
	

function update_timer_display(){

    //update timer display & handle state transitions
    if(match_period == 'none'){
        document.getElementById("TimeDisp").innerHTML = "Time = 0.0";
    } else if (match_period == 'tele'){
        tele_elapsed_time = Date.now() - tele_start_time;
        document.getElementById("TimeDisp").innerHTML = "Time = " + tele_elapsed_time/1000.0;
        if(auto_elapsed_time >= 145000){ //teleop is 2min15sec plus a bit of extra
            end_match();
            disp_update();
        }
    } else if (match_period == 'auto') {
        auto_elapsed_time = Date.now() - auto_start_time;
        document.getElementById("TimeDisp").innerHTML = "Time = " + auto_elapsed_time/1000.0;
        if(auto_elapsed_time >= 18000){ //Auto is 15 seconds, plus a bit of leway just in case the pause between is bigger.
            start_teleop();
            disp_update();
        }
    }

}

/*
 * Handles key presses
 */
function keyPressHandler(event) {
    if(document.getElementById("RobotObservations").style.display != "none"){
        var x = event.key;
        console.log("The pressed key was: " + x);
        
        if (x == " "){ 
            proccess_Event('PickedUpCube');
        }
        else if (x == "w"){ 
            proccess_Event('PlacedOnSwitch');
        }
        else if (x == "a"){ 
            proccess_Event('PlacedOnScale');
        }
        else if (x == "s"){ 
            proccess_Event('PlacedOnOpSwitch');
        }
        else if (x == "d"){ 
            proccess_Event('PlacedInExchange');
        }
        else if (x == "f"){ 
            proccess_Event('DroppedCube');
        }
        else if (x == "q"){ 
            proccess_Event('CrossBaseline');
        }
        else if (x == "z"){
            Undo_Event();
        }
        else if (x == "1"){ 
            proccess_Period('StartAuto');
        }
        else if (x == "2"){ 
            proccess_Period('StartTeleop');
        }
        else if (x == "3"){ 
            proccess_Period('EndMatch');
        }
    }
}

/* 
 * Updates the page displays
 */
function disp_update()
{
    update_match_state()
    
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

    
    /* Stats */
    document.getElementById("attp_scale").innerHTML = time_to_place_scale_avg.toFixed(3);
    document.getElementById("attp_switch").innerHTML = time_to_place_switch_avg.toFixed(3);
    document.getElementById("attp_opSwitch").innerHTML = time_to_place_op_switch_avg.toFixed(3);
    document.getElementById("attp_exchange").innerHTML = time_to_place_exchange_avg.toFixed(3);
    document.getElementById("accum_cube_carry").innerHTML = cube_carry_time_accum.toFixed(3);
    document.getElementById("has_cube_disp").innerHTML = cube_possessed;
    
    /* penalty */
    document.getElementById("penalty_display1").innerHTML = penalty_auto;
    document.getElementById("technical_display1").innerHTML = technical_auto;
    document.getElementById("penalty_display2").innerHTML = penalty_tele;
    document.getElementById("technical_display2").innerHTML = technical_tele;
    
	/*match event*/
    document.getElementById("baseLineCounter").innerHTML = auto_cross_baseline_counter;
    document.getElementById("pickedUpCubeCounter").innerHTML = teleop_pick_up_cube_counter + auto_pick_up_cube_counter;
    document.getElementById("droppedCubeCounter").innerHTML = teleop_dropped_cube_counter + auto_dropped_cube_counter;
    document.getElementById("placedOnScaleCounter").innerHTML = teleop_placed_scale_counter + auto_placed_scale_counter;
    document.getElementById("placedOnSwitchCounter").innerHTML = teleop_placed_switch_counter + auto_placed_switch_counter;
    document.getElementById("placedOnOppSwitchCounter").innerHTML = teleop_placed_op_switch_counter;
    document.getElementById("placedInExchangeCounter").innerHTML = teleop_placed_in_exchange_counter + auto_placed_in_exchange_counter;
			
	
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
    var teamnum = document.getElementById("team_number_in").value;
    
    //ensure we have a team number
    while(teamnum < 1){
        teamnum = prompt("Please enter the team number:", "0");
    }
    
    var matchData = document.getElementById("scout_name_in").value + ",";
    matchData += teamnum + ","
    matchData += document.getElementById("match_number_in").value + ",";
    matchData += document.getElementById("match_type").value + ",";
	
    matchData += document.querySelector('input[name="start_pos_sel"]:checked').value + ",";

    matchData += auto_cross_baseline_counter + ",";
    matchData += auto_pick_up_cube_counter + ",";
    matchData += auto_dropped_cube_counter + ",";
    matchData += auto_placed_switch_counter + ",";
    matchData += auto_placed_scale_counter + ",";
    matchData += auto_placed_in_exchange_counter + ",";
    matchData += teleop_pick_up_cube_counter + ",";
    matchData += teleop_dropped_cube_counter + ",";
    matchData += teleop_placed_switch_counter + ",";
    matchData += teleop_placed_scale_counter + ",";
    matchData += teleop_placed_op_switch_counter + ",";
    matchData += teleop_placed_in_exchange_counter + ",";
    matchData += time_to_place_scale_avg.toFixed(3) + ",";
    matchData += time_to_place_switch_avg.toFixed(3) + ",";
    matchData += time_to_place_op_switch_avg.toFixed(3) + ",";
    matchData += time_to_place_exchange_avg.toFixed(3) + ",";
    matchData += cube_carry_time_accum.toFixed(3) + ",";

    matchData += tele_driving + ",";
    matchData += tele_robot_block + ",";
    matchData += tele_robot_block_time + ",";
    
    matchData += end_climb_speed + ",";
    matchData += document.getElementById("platform_only").checked + ",";
    matchData += document.getElementById("bar_climb_attempt").checked + ",";
    matchData += document.getElementById("bar_climb_success").checked + ",";
    matchData += document.getElementById("lift_partner_attempt").checked + ",";
    matchData += document.getElementById("lift_partner_success").checked + ",";
    matchData += document.getElementById("lift_by_partner_attempt").checked + ",";
    matchData += document.getElementById("lift_by_partner_success").checked + ",";
    
    matchData += penalty_auto + ",";
    matchData += technical_auto + ",";
    matchData += penalty_tele + ",";
    matchData += technical_tele + ",";
    matchData += document.getElementById("died_in_match").checked + ",";
    matchData += document.getElementById("no_show").checked + ",";
    
    matchData += overallrating = document.getElementById("Overall_Rating").value + ",";     
    var comments = document.getElementById("Comments").value;
    comments = comments.replace(/,/g,"_"); //Get rid of commas so we don't mess up CSV
    comments = comments.replace("\n","   ");
    matchData += comments + ",";
    matchData += getEventsString() + "\n";
    
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
    
    document.getElementById("platform_only").checked = false;
    document.getElementById("bar_climb_attempt").checked = false;
    document.getElementById("bar_climb_success").checked = false;
    document.getElementById("lift_partner_attempt").checked = false;
    document.getElementById("lift_partner_success").checked = false;
    document.getElementById("lift_by_partner_attempt").checked = false;
    document.getElementById("lift_by_partner_success").checked = false;

    event_stack = new Array();
    
    elapsed_time = 0.0;
    match_period = 'none';
    auto_cross_baseline_counter = 0;
    auto_pick_up_cube_counter = 0;
    auto_dropped_cube_counter = 0;
    auto_placed_switch_counter = 0;
    auto_placed_scale_counter = 0;
    auto_placed_in_exchange_counter = 0;
    teleop_pick_up_cube_counter = 0;
    teleop_dropped_cube_counter = 0;
    teleop_placed_switch_counter = 0;
    teleop_placed_scale_counter = 0;
    teleop_placed_op_switch_counter = 0;
    teleop_placed_in_exchange_counter = 0;
    time_to_place_scale_avg = 0;
    time_to_place_switch_avg = 0;
    time_to_place_op_switch_avg = 0;
    time_to_place_exchange_avg = 0;
    cube_carry_time_accum = 0;

    tele_robot_block = 0;
    tele_robot_block_time = 0;

    document.getElementById("driving_ability").value = 0;
    document.getElementById("robot_block").value = 0;
    document.getElementById("robot_block_time").value = 0;
    document.getElementById("died_in_match").checked = false;
    document.getElementById("no_show").checked = false;

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
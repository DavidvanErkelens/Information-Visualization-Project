// append svg to body
var svg = d3.select("svg")
var click = false;

var conn = new WebSocket('ws://davidvanerkelens.nl:8080');


//TODO:
//multiple(series of attacks or single attack),success and suicide, claimed, individual (does the attacker belong to group or not) :boolean values
//nkil, nwound, nkillter (killed perps),nwoundte (woudned perps), propvalue (estimated costs) : int values?


//here we match the ints to strings
attacktypes = {1: 'Assassination', 2: 'Armed Assault', 3: 'Bombing/Explosion', 4: 'Hijacking', 5: 'Barricade Incident', 6: 'Kidnapping', 7: 'Facility/Infrastructure', 8: 'Unarmed Assault', 9: 'Unknown'}
targettypes = {1: 'Business', 2: 'Government', 3: 'Police', 4: 'Military', 5: 'Abortion related', 6: 'Airports/Aircraft', 7: 'Government (Diplomatic)', 8: 'Education', 9: 'Food/water supplies', 10: 'Journalist/Media', 11: 'Maritime', 12: 'NGO', 13: 'Other', 14: 'Private property', 15: 'Religious', 16: 'Telecommunication', 17: 'Terrorists', 18: 'Tourist', 19: 'Transportation', 20: 'Unknown', 21: 'Utilities', 22: 'Violent political parties'}
weaptypes = {1: 'Biological', 2: 'Chemical', 3: 'Radiological', 4: 'Nuclear', 5: 'Firearms', 6: 'Explosives', 7: 'Fake weapons', 8: 'Incendiary', 9: 'Melee', 10: 'Vehicle', 11: 'Sabotage', 12: 'Other', 13: 'Unkown'}
perpretrator = {1: 'Unknown', 2: 'Taliban', 3: 'Shining Path', 4: 'ISIL', 5: 'FMLN', 6: 'Al-Shabaab', 7: 'IRA', 8: 'FARC', 9:'NPA', 10: 'PKK', 11: 'Boko Haram', 12: 'ETA', 13: 'CPI-Maoist', 14: 'LTTE'}

//intvalues
ranges = {1: [0,5], 2: [10,15]}


//here we match filters with correct category values
stringvalues = [attacktypes, targettypes, weaptypes, perpretrator, stats]

//here we name the filters ids
filters = ['Attack type','Target type', 'Weapon type', 'Pepretrator', 'Stats'];

//this will hold all the states of the filters!
var dictionary = {0:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true},
				  1:{1:true, 2:true, 3:true, 4:true, 5:false, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true, 14:true, 15:true, 16:true, 17: true, 18:true, 19: true, 20: true, 21: true, 22: true},
				  2:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true},
				  3:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true, 14: true},
				  4:{1:true, 2:true, 3:true, 4:true, 5:true},
					"time" : {"start" : 1970, "end" : 1972},
					"number" : 5};



//initialize filtlers
loadedFilters = false
loadFilters(0);

//create menu with filter categories
function showDropdown()
{
	if(click == false)
	{
		click = true;

	dropdown = svg.append("foreignObject")
   		.attr("x", 220)
   		.attr("y", 10)
   		.append("xhtml:div")
        .style("background-color", "rgba(300, 33, 192, 1)")
        .html("<a onclick='loadFilters(0)'>"+filters[0]+"</a> <a onclick='loadFilters(1)'>"+filters[1]+"</a> <a onclick='loadFilters(2)'>"+filters[2]+"</a> <a onclick='loadFilters(3)'>"+filters[3]+"</a> <a onclick='loadFilters(4)'>"+filters[4])
	} else
	{
		click = false;
		dropdown.remove();
	}

	console.log(click);
}


//what happens when clicking on a input box
function selectFilter(id)
{
	if(dictionary[currentfilter][id] == true)
	{
		dictionary[currentfilter][id] = false;
		//dictionary[currentfilter] =
	}
	else
	{
		dictionary[currentfilter][id] = true;
	}

	updatedata();
	console.log(dictionary[currentfilter]);
}

function createBottomMenu(){
	FO3 = svg.append("foreignObject")
   		.attr("x", 10)
   		.attr("y", 305)
        .attr("width", 200)
        .attr("height", 150)
   		.append("xhtml:div")

        .style("border", "solid 1px")
        .style("border-color", "rgba(234, 242, 255, 1)")
        .style("background-color", "rgba(234, 242, 255, 0.4)")
        .style("display", "block")
        .style("height", "150px")



    		FO3.append("foreignObject")
			.style("height", "20px")
			.style("display", "block")
	        //.html("<input type='range' min='1' max='100' value='50' class='slider2' id='myRange'>")
	        .html("nKill: <input type=text' id=10 onkeyup='updateRange(this.id, this.value)' name='lastname' maxlength='3' size='1' value='"+ranges[1][0]+"'> - <input type=text' id=11 onkeyup='updateRange(this.id, this.value)' name='lastname' maxlength='3' size='1' value='"+ranges[1][1]+"'><br>nWound: <input type=text' id=20 onkeyup='updateRange(this.id, this.value)' name='lastname' maxlength='3' size='1' value='"+ranges[2][0]+"'> - <input type=text' id=21 onkeyup='updateRange(this.id, this.value)' name='lastname' maxlength='3' size='1' value='"+ranges[2][1]+"'>")
}

createBottomMenu();


function updateRange(id, value)
{

	ranges[id[0]][id[1]] = parseInt(value);
	console.log(ranges);
}


//create menu
function loadFilters(filter)
{

	//loading filters again should remove previous filters if they exist
	if(loadedFilters == true)
	{
		FO2.remove()
		FO.remove()
	}

	//this value correspsonds with the numerical value for the filter
	console.log(filter);

	//this creates the top button where you can click to select filter categories
	FO = svg.append("foreignObject")
   		.attr("x", 10)
   		.attr("y", 10)
        .attr("width", 200)
        .attr("height", 300)
   		.append("xhtml:div")
        .attr("width", 200)
        .attr("height", 300)
        .style("border", "solid 1px")
        .style("border-color","rgb(234, 242, 255)")
        .style("border-radius", "10px")

        .style("display", "block")
        .style("overflow", "hidden")
        .style("height", "35px")
       // .style("text-align", "center")
        .html("<button onclick='showDropdown()' class='dropbtn' style='border: none; width: 198px; height: 35px; font-size: 20px; color:black'>"+filters[filter]+"</button>")

        loadedFilters = true;

        currentfilter = filter;


	var arrayLength = Object.keys(dictionary[filter]).length

	//this is a placeholder for the filters
	//TODO: ADD SCROLLBAR INTO THIS PLACEHOLDER
	FO2 = svg.append("foreignObject")
   		.attr("x", 10)
   		.attr("y", 50)
        .attr("width", 200)
        .attr("height", 265)
   		.append("xhtml:div")
        .attr("width", 200)
        .attr("height", 265)
        .style("border", "solid 1px")
        .style("border-color","rgb(234, 242, 255)")
        .style("background-color", "rgba(234, 242, 255, 0.4)")


        .style("display", "block")

        .style("overflow-y","scroll")
        .style("height", "240px")
       // .style("text-align", "center")
        //.html("<button onclick='myFunction()' class='dropbtn' style='background-color: grey; border: none; width: 198px; height: 35px; font-size: 20px; color:white'>"+filters[filter]+"</button>")


	//loop over the filters and create checkboxes
	for (var i = 1; i < arrayLength+1; i++)
	{
		//get strings from the int types
		stringdict = stringvalues[filter]


		if(dictionary[filter][i] == true)
		{
		FO2.append("foreignObject")
			.style("height", "20px")
			.style("display", "block")
	        .html("<input type=checkbox class='checkmark' onclick=selectFilter(this.id) id="+i+" checked>"+stringdict[i])

		}
		else
		{
				FO2.append("foreignObject")
			.style("height", "20px")
			.style("display", "block")
	        .html("<input type=checkbox class='checkmark' onclick=selectFilter(this.id) id="+i+">"+stringdict[i])
		}
	}



	if (click == true)
	{
		click = false;
		dropdown.remove();

	}

}

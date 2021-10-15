var request = new XMLHttpRequest();

var color_codes = ["GR8", "GSK", "GEJ", "GFM", "G5J", "GB0", "GB8", "GA0", "GAN", "G4Q", "GLR", 
"GHL", "G6N", "GGH", "GGK", "GIR", "GYM", "GAZ", "GHD", "G1W", "GP5", "GBA", "GB8", "G9K", "GJW", 
"G5D", "G7C", "GSK", "GJI", "GHT", "GA0", "GLT", "GLU", "GTL", "G48", "GNK", "GHR", "GED",];

var color_names = ["Burnished Bronze Metallic", "Cherry Red Tintcoat", 
"Cinnabar Metallic", "Cinnabar Metallic", "Dark Moon Blue Metallic", "Ebony Twilight Metallic", 
"Ebony Twilight Metallic", "Emperor Blue Metallic", "Quicksilver Metallic", "Rich Garnet Metallic", 
"Rich Garnet Metallic", "Rosewood Metallic", "Sage Metallic", "Sapphire Metallic", "Sapphire Metallic", 
"Satin Steel Metallic", "Satin Steel Metallic", "Summit White", "Sunset Glow Metallic", 
"White Frost Tintcoat", "White Frost Tintcoat", "Onyx Black", "Ebony Twilight Metallic", "Satin Steel Metallic", 
"Pearl Beige Metallic", "Light Stone Metallic", "Cardinal Red", "Cayenne Red Tintcoat", "Dark Sky Metallic", 
"Marine Metallic", "Pacific Blue Metallic", "Dynamic Blue Metallic", "Midnight Blue Metallic", 
"Desert Sand Metallic", "Redwood Metallic", "Brownstone Metallic", "Forest Metallic", "Hunter Metallic",];

var trim_codes = ["5SA", "4SB", "4SA", "3SB", "3SA", "1SA", "1SL", "1SN", "1SP", "1SB", "1SD", "1SC", "1SU"];

var trim_names = ["DENALI", "AT4", "SLT", "ELEVATION", "SLE", "PRO", "ESSENCE", "PREMIUM", "AVENIR", "PREFERRED", "SELECT", "PREFERRED", "AVENIR"];

var model_codes = ["ACADIA", "TERAIN", "CANYON", "GHDCRW", "GHDREG", "GHDDBL", "GLDCRL", "GLDDLL", "GLDREL", "YKN", "YKNXL", "ENVISN", "ENCORE", "ENCRGX", "ENCLAV"];

var model_names = ["ACADIA", "TERRAIN", "CANYON", "SIERRA HD CREW", "SIERRA HD REG", "SIERRA HD DBL", 
"SIERRA 1500 CREW CAB", "SIERRA 1500 DBL", "SIERRA 1500 REG", "YUKON", "YUKON XL", "ENVISION", "ENCORE", "ENCORE GX", "ENCLAVE" ];

var f_size = [24, 24, 24, 19, 19, 19, 19, 19, 19, 24, 24, 20, 20, 20, 20];

var model_images = ["Acadia-Reservation.jpg", "Terrain-Reservation.jpg", "Canyon-Reservation.jpg", "3500-Reservation.jpg", "3500-Reservation.jpg", 
"3500-Reservation.jpg", "1500-Reservation.jpg", "1500-Reservation.jpg", "1500-Reservation.jpg", "Yukon-Reservation.jpg", "Yukon-Reservation.jpg", 
"Envision-Reservation.jpg", "Encore-Reservation.jpg", "EncoreGX-Reservation.jpg", "Enclave-Reservation.jpg"];

var key = "AIzaSyDHT-EhjdC_0xY1aXaNFyXkyypg1NUuO2I";
var sheet = "1RxSlSxOCy1eBt-fKJg2gsItZSKvad8YsktrRRA16IxI";
var g2query = '2022GMC!A:N';
var b2query = '2022BUICK!A:N';
var g1query = '2021GMC!A:N';
// var vehicle = "";


// function apiCall(sheet, vehicle){
    request.open('GET', "https://sheets.googleapis.com/v4/spreadsheets/" + sheet + "/values/" + b2query + "?key=" + key);
    request.send();
    request.onload = ()=>{
        //console.log(JSON.parse(request.response));
        var data = JSON.parse(request.response);
        //console.log(data['values'][0]);
        populateVehicles(data['values'], b2query, vehicle);
    }
// }   


function populateVehicles(data, query, vehicle) {
    // console.log("**************");
    // console.log(data.length);
    // console.log("**************");
    let MY = query.substr(0,4);
    let make = "";
    if (query.substr(4,1) == "G") {
        make = "GMC";
    } else {
        make = "BUICK";
    }
    // console.log(query.substr(4,1));
    
                    //data.length
    for (let i = 1; i < data.length; i++) {


        let model_code = data[i][12];
        let model_index = model_codes.indexOf(model_code);
        let model = "";
        model = model_names[model_index];
    
        let model_image = model_images[model_index];
        let model_fsize = f_size[model_index];

        let trim = "";
        let trim_code = data[i][11];
        let trim_index = trim_codes.indexOf(trim_code);
        trim = trim_names[trim_index];

        let msrp_code = data[i][3];
        let msrp = "";
        if (msrp_code == "W/A") {
            msrp = "TBD"
        } else {
            msrp = msrp_code.substr(0, (msrp_code.length - 3))
        }
    
        let delivery_code = data[i][6];
        let delivery_date = "";
    
        if (delivery_code == "MP") {
            delivery_date = "TBD";
        } else if (delivery_code.length > 3) {
            delivery_date = delivery_code;
        } else {
            delivery_date = "TBD";
        }
    
        let color_code = data[i][8];
        let color_pic = color_code + ".jpg";
        let color_index = color_codes.indexOf(color_code);
        let color = color_names[color_index];
    
        let vin_code = data[i][7];
        let vin = ""
        if(vin_code.length < 2) {
            vin = "TBD";
        } else {
            vin = vin_code;
        }

        let button_text = "";
        let button_link = "";

        if (delivery_date.length > 3 && vin.length > 3) {
            button_text = "View Vehicle Details";
            button_link= "https://www.westmetroauto.com/inventory/" + vin;
        } else {
            button_text = "Reserve Vehicle";
            button_link = "https://www.westmetroauto.com/contactusform/";
        }
    
        // console.log(vin);
        // console.log(color_pic);
        // console.log(color);
        // console.log(msrp);
        // console.log(delivery_date);
        // console.log(MY + " " + make + " " + model);

        let reserved_code = data[i][10];
        let reserved = "";
        console.log(reserved_code)
        if (reserved_code.length >= 1 && reserved_code != "NONE") {
        } else {
            if (vehicle == model) {
                document.getElementById("container").innerHTML +=
                    '<div class="srp_result">' + 
                    '<div class="image_div">' +
                    '<img class="vehicle_image" src="assets/' + model_image + '">' +
                    '</div>' +
                    '<div class="info">' +
                    '<h2 class="model" style="font-size:' + model_fsize + 'px">' + MY + " " + make + " " + model + " " + trim + '</h2>' +
                    '<table class="detail_table">' +
                    '<tr>' +
                    '<td>' +
                    '<p>MSRP</p>' +
                    '</td>' +
                    '<td>' +
                    '<p class="table_right">' + msrp + '</p>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>' +
                    '<p>Estimated Delivery</p>' +
                    '</td>' +
                    '<td>' +
                    '<p class="table_right">' + delivery_date + '</p>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="color_td">' +
                    '<p class="color">' + color + '</p>' +
                    '</td>' +
                    '<td class="color_img_td">' +
                    '<img class="color_img" src="assets/colors/' + color_pic + '">' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '<table class="detail_table vin_table">' +
                    '<tr>' +
                    '<td>' +
                    '<p>VIN</p>' +
                    '</td>' +
                    '<td>' +
                    '<p class="table_right">' + vin + '</p>' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '<a href="' + button_link + '"><div class="inventory_button">' + 
                    '<p>' + button_text + '</p>' +
                    '</div></a>' +
                    '</div>' +
                    '</div>';
            }
        }
    }
}


// console.log("**************");
// console.log(data['values'][0]);
// console.log("**************");
import { useState, useEffect, useRef } from "react";

// ─── WORLD CITIES DATABASE ────────────────────────────────────────────────────
// Representative cities across all countries (lat, lon, name)
const WORLD_CITIES = [
  // Afghanistan
  { country: "Afghanistan", city: "Kabul", lat: 34.52, lon: 69.18 },
  { country: "Afghanistan", city: "Kandahar", lat: 31.61, lon: 65.71 },
  { country: "Afghanistan", city: "Mazar-i-Sharif", lat: 36.71, lon: 67.11 },
  // Albania
  { country: "Albania", city: "Tirana", lat: 41.33, lon: 19.82 },
  { country: "Albania", city: "Shkodër", lat: 42.07, lon: 19.51 },
  // Algeria
  { country: "Algeria", city: "Algiers", lat: 36.74, lon: 3.06 },
  { country: "Algeria", city: "Oran", lat: 35.69, lon: -0.63 },
  { country: "Algeria", city: "Tamanrasset", lat: 22.79, lon: 5.52 },
  // Andorra
  { country: "Andorra", city: "Andorra la Vella", lat: 42.51, lon: 1.52 },
  // Angola
  { country: "Angola", city: "Luanda", lat: -8.84, lon: 13.23 },
  { country: "Angola", city: "Huambo", lat: -12.78, lon: 15.74 },
  // Argentina
  { country: "Argentina", city: "Buenos Aires", lat: -34.61, lon: -58.37 },
  { country: "Argentina", city: "Córdoba", lat: -31.42, lon: -64.18 },
  { country: "Argentina", city: "Ushuaia", lat: -54.81, lon: -68.31 },
  { country: "Argentina", city: "Mendoza", lat: -32.89, lon: -68.84 },
  // Armenia
  { country: "Armenia", city: "Yerevan", lat: 40.18, lon: 44.51 },
  // Australia
  { country: "Australia", city: "Sydney", lat: -33.87, lon: 151.21 },
  { country: "Australia", city: "Darwin", lat: -12.46, lon: 130.84 },
  { country: "Australia", city: "Melbourne", lat: -37.81, lon: 144.96 },
  { country: "Australia", city: "Alice Springs", lat: -23.70, lon: 133.88 },
  { country: "Australia", city: "Hobart", lat: -42.88, lon: 147.33 },
  // Austria
  { country: "Austria", city: "Vienna", lat: 48.21, lon: 16.37 },
  { country: "Austria", city: "Innsbruck", lat: 47.27, lon: 11.40 },
  // Azerbaijan
  { country: "Azerbaijan", city: "Baku", lat: 40.41, lon: 49.87 },
  // Bahamas
  { country: "Bahamas", city: "Nassau", lat: 25.05, lon: -77.35 },
  // Bahrain
  { country: "Bahrain", city: "Manama", lat: 26.22, lon: 50.59 },
  // Bangladesh
  { country: "Bangladesh", city: "Dhaka", lat: 23.72, lon: 90.41 },
  { country: "Bangladesh", city: "Chittagong", lat: 22.33, lon: 91.84 },
  // Belarus
  { country: "Belarus", city: "Minsk", lat: 53.90, lon: 27.57 },
  // Belgium
  { country: "Belgium", city: "Brussels", lat: 50.85, lon: 4.35 },
  { country: "Belgium", city: "Liège", lat: 50.63, lon: 5.57 },
  // Belize
  { country: "Belize", city: "Belmopan", lat: 17.25, lon: -88.77 },
  // Benin
  { country: "Benin", city: "Cotonou", lat: 6.37, lon: 2.42 },
  // Bhutan
  { country: "Bhutan", city: "Thimphu", lat: 27.47, lon: 89.64 },
  // Bolivia
  { country: "Bolivia", city: "La Paz", lat: -16.50, lon: -68.15 },
  { country: "Bolivia", city: "Santa Cruz", lat: -17.80, lon: -63.17 },
  // Bosnia and Herzegovina
  { country: "Bosnia and Herzegovina", city: "Sarajevo", lat: 43.85, lon: 18.36 },
  // Botswana
  { country: "Botswana", city: "Gaborone", lat: -24.65, lon: 25.91 },
  // Brazil
  { country: "Brazil", city: "São Paulo", lat: -23.55, lon: -46.63 },
  { country: "Brazil", city: "Rio de Janeiro", lat: -22.91, lon: -43.17 },
  { country: "Brazil", city: "Manaus", lat: -3.10, lon: -60.03 },
  { country: "Brazil", city: "Brasília", lat: -15.78, lon: -47.93 },
  { country: "Brazil", city: "Fortaleza", lat: -3.72, lon: -38.54 },
  // Brunei
  { country: "Brunei", city: "Bandar Seri Begawan", lat: 4.94, lon: 114.95 },
  // Bulgaria
  { country: "Bulgaria", city: "Sofia", lat: 42.70, lon: 23.32 },
  // Burkina Faso
  { country: "Burkina Faso", city: "Ouagadougou", lat: 12.37, lon: -1.53 },
  // Burundi
  { country: "Burundi", city: "Bujumbura", lat: -3.39, lon: 29.36 },
  // Cambodia
  { country: "Cambodia", city: "Phnom Penh", lat: 11.56, lon: 104.92 },
  // Cameroon
  { country: "Cameroon", city: "Yaoundé", lat: 3.87, lon: 11.52 },
  { country: "Cameroon", city: "Douala", lat: 4.06, lon: 9.71 },
  // Canada
  { country: "Canada", city: "Toronto", lat: 43.65, lon: -79.38 },
  { country: "Canada", city: "Vancouver", lat: 49.25, lon: -123.12 },
  { country: "Canada", city: "Yellowknife", lat: 62.45, lon: -114.38 },
  { country: "Canada", city: "Montreal", lat: 45.50, lon: -73.57 },
  { country: "Canada", city: "Calgary", lat: 51.05, lon: -114.08 },
  // Central African Republic
  { country: "Central African Republic", city: "Bangui", lat: 4.36, lon: 18.56 },
  // Chad
  { country: "Chad", city: "N'Djamena", lat: 12.11, lon: 15.04 },
  // Chile
  { country: "Chile", city: "Santiago", lat: -33.46, lon: -70.65 },
  { country: "Chile", city: "Punta Arenas", lat: -53.16, lon: -70.91 },
  { country: "Chile", city: "Antofagasta", lat: -23.65, lon: -70.40 },
  // China
  { country: "China", city: "Beijing", lat: 39.93, lon: 116.39 },
  { country: "China", city: "Shanghai", lat: 31.23, lon: 121.47 },
  { country: "China", city: "Harbin", lat: 45.75, lon: 126.64 },
  { country: "China", city: "Haikou", lat: 20.04, lon: 110.34 },
  { country: "China", city: "Urumqi", lat: 43.80, lon: 87.60 },
  { country: "China", city: "Chengdu", lat: 30.67, lon: 104.07 },
  // Colombia
  { country: "Colombia", city: "Bogotá", lat: 4.71, lon: -74.07 },
  { country: "Colombia", city: "Medellín", lat: 6.23, lon: -75.58 },
  { country: "Colombia", city: "Cartagena", lat: 10.40, lon: -75.51 },
  // Comoros
  { country: "Comoros", city: "Moroni", lat: -11.70, lon: 43.26 },
  // Congo (Republic)
  { country: "Congo", city: "Brazzaville", lat: -4.27, lon: 15.28 },
  // Congo (DRC)
  { country: "DR Congo", city: "Kinshasa", lat: -4.32, lon: 15.32 },
  { country: "DR Congo", city: "Lubumbashi", lat: -11.68, lon: 27.48 },
  // Costa Rica
  { country: "Costa Rica", city: "San José", lat: 9.93, lon: -84.08 },
  // Croatia
  { country: "Croatia", city: "Zagreb", lat: 45.81, lon: 15.98 },
  { country: "Croatia", city: "Split", lat: 43.51, lon: 16.44 },
  // Cuba
  { country: "Cuba", city: "Havana", lat: 23.13, lon: -82.38 },
  // Cyprus
  { country: "Cyprus", city: "Nicosia", lat: 35.17, lon: 33.37 },
  // Czech Republic
  { country: "Czech Republic", city: "Prague", lat: 50.09, lon: 14.42 },
  // Denmark
  { country: "Denmark", city: "Copenhagen", lat: 55.68, lon: 12.57 },
  // Djibouti
  { country: "Djibouti", city: "Djibouti City", lat: 11.59, lon: 43.15 },
  // Dominican Republic
  { country: "Dominican Republic", city: "Santo Domingo", lat: 18.48, lon: -69.95 },
  // Ecuador
  { country: "Ecuador", city: "Quito", lat: -0.23, lon: -78.52 },
  { country: "Ecuador", city: "Guayaquil", lat: -2.20, lon: -79.90 },
  // Egypt
  { country: "Egypt", city: "Cairo", lat: 30.06, lon: 31.25 },
  { country: "Egypt", city: "Aswan", lat: 24.09, lon: 32.90 },
  { country: "Egypt", city: "Alexandria", lat: 31.20, lon: 29.92 },
  // El Salvador
  { country: "El Salvador", city: "San Salvador", lat: 13.70, lon: -89.21 },
  // Equatorial Guinea
  { country: "Equatorial Guinea", city: "Malabo", lat: 3.75, lon: 8.78 },
  // Eritrea
  { country: "Eritrea", city: "Asmara", lat: 15.34, lon: 38.93 },
  // Estonia
  { country: "Estonia", city: "Tallinn", lat: 59.44, lon: 24.75 },
  // Ethiopia
  { country: "Ethiopia", city: "Addis Ababa", lat: 9.03, lon: 38.74 },
  { country: "Ethiopia", city: "Dire Dawa", lat: 9.59, lon: 41.87 },
  // Fiji
  { country: "Fiji", city: "Suva", lat: -18.14, lon: 178.44 },
  // Finland
  { country: "Finland", city: "Helsinki", lat: 60.17, lon: 24.94 },
  { country: "Finland", city: "Rovaniemi", lat: 66.50, lon: 25.73 },
  // France
  { country: "France", city: "Paris", lat: 48.85, lon: 2.35 },
  { country: "France", city: "Marseille", lat: 43.30, lon: 5.38 },
  { country: "France", city: "Lyon", lat: 45.75, lon: 4.85 },
  { country: "France", city: "Strasbourg", lat: 48.58, lon: 7.75 },
  // Gabon
  { country: "Gabon", city: "Libreville", lat: 0.39, lon: 9.45 },
  // Gambia
  { country: "Gambia", city: "Banjul", lat: 13.45, lon: -16.58 },
  // Georgia
  { country: "Georgia", city: "Tbilisi", lat: 41.69, lon: 44.83 },
  // Germany
  { country: "Germany", city: "Berlin", lat: 52.52, lon: 13.41 },
  { country: "Germany", city: "Munich", lat: 48.14, lon: 11.58 },
  { country: "Germany", city: "Hamburg", lat: 53.57, lon: 10.02 },
  { country: "Germany", city: "Cologne", lat: 50.94, lon: 6.96 },
  // Ghana
  { country: "Ghana", city: "Accra", lat: 5.56, lon: -0.20 },
  // Greece
  { country: "Greece", city: "Athens", lat: 37.98, lon: 23.73 },
  { country: "Greece", city: "Thessaloniki", lat: 40.64, lon: 22.94 },
  // Guatemala
  { country: "Guatemala", city: "Guatemala City", lat: 14.64, lon: -90.51 },
  // Guinea
  { country: "Guinea", city: "Conakry", lat: 9.54, lon: -13.68 },
  // Guinea-Bissau
  { country: "Guinea-Bissau", city: "Bissau", lat: 11.86, lon: -15.60 },
  // Guyana
  { country: "Guyana", city: "Georgetown", lat: 6.80, lon: -58.16 },
  // Haiti
  { country: "Haiti", city: "Port-au-Prince", lat: 18.54, lon: -72.34 },
  // Honduras
  { country: "Honduras", city: "Tegucigalpa", lat: 14.08, lon: -87.21 },
  // Hungary
  { country: "Hungary", city: "Budapest", lat: 47.50, lon: 19.04 },
  // Iceland
  { country: "Iceland", city: "Reykjavik", lat: 64.13, lon: -21.82 },
  { country: "Iceland", city: "Akureyri", lat: 65.68, lon: -18.10 },
  // India
  { country: "India", city: "New Delhi", lat: 28.63, lon: 77.22 },
  { country: "India", city: "Mumbai", lat: 19.08, lon: 72.88 },
  { country: "India", city: "Chennai", lat: 13.09, lon: 80.27 },
  { country: "India", city: "Kolkata", lat: 22.57, lon: 88.36 },
  { country: "India", city: "Srinagar", lat: 34.09, lon: 74.80 },
  { country: "India", city: "Jaisalmer", lat: 26.91, lon: 70.91 },
  { country: "India", city: "Leh", lat: 34.16, lon: 77.58 },
  // Indonesia
  { country: "Indonesia", city: "Jakarta", lat: -6.21, lon: 106.85 },
  { country: "Indonesia", city: "Medan", lat: 3.59, lon: 98.67 },
  { country: "Indonesia", city: "Jayapura", lat: -2.53, lon: 140.72 },
  // Iran
  { country: "Iran", city: "Tehran", lat: 35.69, lon: 51.42 },
  { country: "Iran", city: "Ahvaz", lat: 31.33, lon: 48.70 },
  { country: "Iran", city: "Tabriz", lat: 38.07, lon: 46.30 },
  // Iraq
  { country: "Iraq", city: "Baghdad", lat: 33.34, lon: 44.40 },
  { country: "Iraq", city: "Basra", lat: 30.51, lon: 47.82 },
  // Ireland
  { country: "Ireland", city: "Dublin", lat: 53.33, lon: -6.25 },
  // Israel
  { country: "Israel", city: "Tel Aviv", lat: 32.08, lon: 34.78 },
  { country: "Israel", city: "Eilat", lat: 29.56, lon: 34.95 },
  // Italy
  { country: "Italy", city: "Rome", lat: 41.90, lon: 12.50 },
  { country: "Italy", city: "Milan", lat: 45.46, lon: 9.19 },
  { country: "Italy", city: "Palermo", lat: 38.12, lon: 13.36 },
  { country: "Italy", city: "Bolzano", lat: 46.50, lon: 11.35 },
  // Ivory Coast
  { country: "Ivory Coast", city: "Abidjan", lat: 5.35, lon: -4.01 },
  // Jamaica
  { country: "Jamaica", city: "Kingston", lat: 17.99, lon: -76.79 },
  // Japan
  { country: "Japan", city: "Tokyo", lat: 35.69, lon: 139.69 },
  { country: "Japan", city: "Sapporo", lat: 43.07, lon: 141.35 },
  { country: "Japan", city: "Naha", lat: 26.21, lon: 127.68 },
  { country: "Japan", city: "Osaka", lat: 34.69, lon: 135.50 },
  // Jordan
  { country: "Jordan", city: "Amman", lat: 31.96, lon: 35.95 },
  { country: "Jordan", city: "Aqaba", lat: 29.53, lon: 35.01 },
  // Kazakhstan
  { country: "Kazakhstan", city: "Astana", lat: 51.18, lon: 71.45 },
  { country: "Kazakhstan", city: "Almaty", lat: 43.25, lon: 76.95 },
  // Kenya
  { country: "Kenya", city: "Nairobi", lat: -1.28, lon: 36.82 },
  { country: "Kenya", city: "Mombasa", lat: -4.05, lon: 39.67 },
  // Kuwait
  { country: "Kuwait", city: "Kuwait City", lat: 29.37, lon: 47.98 },
  // Kyrgyzstan
  { country: "Kyrgyzstan", city: "Bishkek", lat: 42.87, lon: 74.59 },
  // Laos
  { country: "Laos", city: "Vientiane", lat: 17.97, lon: 102.60 },
  // Latvia
  { country: "Latvia", city: "Riga", lat: 56.95, lon: 24.11 },
  // Lebanon
  { country: "Lebanon", city: "Beirut", lat: 33.89, lon: 35.50 },
  // Lesotho
  { country: "Lesotho", city: "Maseru", lat: -29.32, lon: 27.48 },
  // Liberia
  { country: "Liberia", city: "Monrovia", lat: 6.30, lon: -10.80 },
  // Libya
  { country: "Libya", city: "Tripoli", lat: 32.90, lon: 13.18 },
  { country: "Libya", city: "Sabha", lat: 27.04, lon: 14.43 },
  // Lithuania
  { country: "Lithuania", city: "Vilnius", lat: 54.69, lon: 25.28 },
  // Luxembourg
  { country: "Luxembourg", city: "Luxembourg City", lat: 49.61, lon: 6.13 },
  // Madagascar
  { country: "Madagascar", city: "Antananarivo", lat: -18.91, lon: 47.54 },
  // Malawi
  { country: "Malawi", city: "Lilongwe", lat: -13.97, lon: 33.79 },
  // Malaysia
  { country: "Malaysia", city: "Kuala Lumpur", lat: 3.15, lon: 101.69 },
  { country: "Malaysia", city: "Kota Kinabalu", lat: 5.98, lon: 116.07 },
  // Maldives
  { country: "Maldives", city: "Malé", lat: 4.17, lon: 73.51 },
  // Mali
  { country: "Mali", city: "Bamako", lat: 12.65, lon: -8.00 },
  { country: "Mali", city: "Timbuktu", lat: 16.77, lon: -3.01 },
  // Malta
  { country: "Malta", city: "Valletta", lat: 35.90, lon: 14.51 },
  // Mauritania
  { country: "Mauritania", city: "Nouakchott", lat: 18.08, lon: -15.97 },
  // Mexico
  { country: "Mexico", city: "Mexico City", lat: 19.43, lon: -99.13 },
  { country: "Mexico", city: "Guadalajara", lat: 20.67, lon: -103.35 },
  { country: "Mexico", city: "Monterrey", lat: 25.67, lon: -100.31 },
  { country: "Mexico", city: "Mexicali", lat: 32.66, lon: -115.47 },
  // Moldova
  { country: "Moldova", city: "Chișinău", lat: 47.01, lon: 28.86 },
  // Mongolia
  { country: "Mongolia", city: "Ulaanbaatar", lat: 47.91, lon: 106.89 },
  { country: "Mongolia", city: "Dalanzadgad", lat: 43.57, lon: 104.43 },
  // Montenegro
  { country: "Montenegro", city: "Podgorica", lat: 42.44, lon: 19.26 },
  // Morocco
  { country: "Morocco", city: "Rabat", lat: 34.02, lon: -6.83 },
  { country: "Morocco", city: "Marrakech", lat: 31.63, lon: -8.01 },
  { country: "Morocco", city: "Ouarzazate", lat: 30.93, lon: -6.91 },
  // Mozambique
  { country: "Mozambique", city: "Maputo", lat: -25.97, lon: 32.59 },
  // Myanmar
  { country: "Myanmar", city: "Naypyidaw", lat: 19.75, lon: 96.07 },
  { country: "Myanmar", city: "Yangon", lat: 16.87, lon: 96.19 },
  // Namibia
  { country: "Namibia", city: "Windhoek", lat: -22.56, lon: 17.08 },
  // Nepal
  { country: "Nepal", city: "Kathmandu", lat: 27.71, lon: 85.31 },
  // Netherlands
  { country: "Netherlands", city: "Amsterdam", lat: 52.37, lon: 4.90 },
  // New Zealand
  { country: "New Zealand", city: "Wellington", lat: -41.29, lon: 174.78 },
  { country: "New Zealand", city: "Auckland", lat: -36.87, lon: 174.77 },
  { country: "New Zealand", city: "Christchurch", lat: -43.53, lon: 172.64 },
  // Nicaragua
  { country: "Nicaragua", city: "Managua", lat: 12.14, lon: -86.27 },
  // Niger
  { country: "Niger", city: "Niamey", lat: 13.51, lon: 2.12 },
  { country: "Niger", city: "Agadez", lat: 16.97, lon: 7.99 },
  // Nigeria
  { country: "Nigeria", city: "Lagos", lat: 6.45, lon: 3.40 },
  { country: "Nigeria", city: "Abuja", lat: 9.07, lon: 7.48 },
  { country: "Nigeria", city: "Kano", lat: 12.00, lon: 8.52 },
  // North Korea
  { country: "North Korea", city: "Pyongyang", lat: 39.02, lon: 125.75 },
  // North Macedonia
  { country: "North Macedonia", city: "Skopje", lat: 42.00, lon: 21.43 },
  // Norway
  { country: "Norway", city: "Oslo", lat: 59.91, lon: 10.75 },
  { country: "Norway", city: "Tromsø", lat: 69.65, lon: 18.96 },
  // Oman
  { country: "Oman", city: "Muscat", lat: 23.61, lon: 58.59 },
  { country: "Oman", city: "Salalah", lat: 17.01, lon: 54.10 },
  // Pakistan
  { country: "Pakistan", city: "Islamabad", lat: 33.72, lon: 73.04 },
  { country: "Pakistan", city: "Karachi", lat: 24.86, lon: 67.01 },
  { country: "Pakistan", city: "Lahore", lat: 31.55, lon: 74.34 },
  { country: "Pakistan", city: "Jacobabad", lat: 28.28, lon: 68.44 },
  // Panama
  { country: "Panama", city: "Panama City", lat: 8.99, lon: -79.52 },
  // Papua New Guinea
  { country: "Papua New Guinea", city: "Port Moresby", lat: -9.45, lon: 147.19 },
  // Paraguay
  { country: "Paraguay", city: "Asunción", lat: -25.29, lon: -57.65 },
  // Peru
  { country: "Peru", city: "Lima", lat: -12.05, lon: -77.04 },
  { country: "Peru", city: "Cusco", lat: -13.53, lon: -71.97 },
  { country: "Peru", city: "Iquitos", lat: -3.75, lon: -73.25 },
  // Philippines
  { country: "Philippines", city: "Manila", lat: 14.60, lon: 120.98 },
  { country: "Philippines", city: "Davao", lat: 7.07, lon: 125.61 },
  // Poland
  { country: "Poland", city: "Warsaw", lat: 52.23, lon: 21.01 },
  { country: "Poland", city: "Kraków", lat: 50.06, lon: 19.94 },
  // Portugal
  { country: "Portugal", city: "Lisbon", lat: 38.72, lon: -9.14 },
  { country: "Portugal", city: "Faro", lat: 37.02, lon: -7.93 },
  // Qatar
  { country: "Qatar", city: "Doha", lat: 25.29, lon: 51.53 },
  // Romania
  { country: "Romania", city: "Bucharest", lat: 44.43, lon: 26.10 },
  // Russia
  { country: "Russia", city: "Moscow", lat: 55.75, lon: 37.62 },
  { country: "Russia", city: "Yakutsk", lat: 62.03, lon: 129.73 },
  { country: "Russia", city: "Sochi", lat: 43.60, lon: 39.73 },
  { country: "Russia", city: "Vladivostok", lat: 43.12, lon: 131.90 },
  { country: "Russia", city: "Norilsk", lat: 69.35, lon: 88.19 },
  // Rwanda
  { country: "Rwanda", city: "Kigali", lat: -1.95, lon: 30.06 },
  // Saudi Arabia
  { country: "Saudi Arabia", city: "Riyadh", lat: 24.69, lon: 46.72 },
  { country: "Saudi Arabia", city: "Jeddah", lat: 21.54, lon: 39.17 },
  { country: "Saudi Arabia", city: "Medina", lat: 24.47, lon: 39.61 },
  // Senegal
  { country: "Senegal", city: "Dakar", lat: 14.69, lon: -17.44 },
  // Serbia
  { country: "Serbia", city: "Belgrade", lat: 44.80, lon: 20.47 },
  // Sierra Leone
  { country: "Sierra Leone", city: "Freetown", lat: 8.49, lon: -13.23 },
  // Singapore
  { country: "Singapore", city: "Singapore", lat: 1.29, lon: 103.85 },
  // Slovakia
  { country: "Slovakia", city: "Bratislava", lat: 48.15, lon: 17.11 },
  // Slovenia
  { country: "Slovenia", city: "Ljubljana", lat: 46.05, lon: 14.51 },
  // Somalia
  { country: "Somalia", city: "Mogadishu", lat: 2.05, lon: 45.34 },
  // South Africa
  { country: "South Africa", city: "Johannesburg", lat: -26.20, lon: 28.04 },
  { country: "South Africa", city: "Cape Town", lat: -33.93, lon: 18.42 },
  { country: "South Africa", city: "Durban", lat: -29.86, lon: 31.03 },
  { country: "South Africa", city: "Upington", lat: -28.44, lon: 21.24 },
  // South Korea
  { country: "South Korea", city: "Seoul", lat: 37.57, lon: 126.98 },
  { country: "South Korea", city: "Busan", lat: 35.10, lon: 129.03 },
  // South Sudan
  { country: "South Sudan", city: "Juba", lat: 4.85, lon: 31.60 },
  // Spain
  { country: "Spain", city: "Madrid", lat: 40.42, lon: -3.70 },
  { country: "Spain", city: "Barcelona", lat: 41.39, lon: 2.17 },
  { country: "Spain", city: "Seville", lat: 37.39, lon: -5.99 },
  { country: "Spain", city: "Bilbao", lat: 43.26, lon: -2.93 },
  // Sri Lanka
  { country: "Sri Lanka", city: "Colombo", lat: 6.93, lon: 79.85 },
  // Sudan
  { country: "Sudan", city: "Khartoum", lat: 15.55, lon: 32.53 },
  // Sweden
  { country: "Sweden", city: "Stockholm", lat: 59.33, lon: 18.07 },
  { country: "Sweden", city: "Kiruna", lat: 67.86, lon: 20.26 },
  // Switzerland
  { country: "Switzerland", city: "Bern", lat: 46.95, lon: 7.44 },
  { country: "Switzerland", city: "Zurich", lat: 47.38, lon: 8.54 },
  // Syria
  { country: "Syria", city: "Damascus", lat: 33.51, lon: 36.29 },
  { country: "Syria", city: "Deir ez-Zor", lat: 35.33, lon: 40.14 },
  // Taiwan
  { country: "Taiwan", city: "Taipei", lat: 25.05, lon: 121.53 },
  // Tajikistan
  { country: "Tajikistan", city: "Dushanbe", lat: 38.56, lon: 68.77 },
  // Tanzania
  { country: "Tanzania", city: "Dar es Salaam", lat: -6.79, lon: 39.21 },
  { country: "Tanzania", city: "Dodoma", lat: -6.17, lon: 35.74 },
  // Thailand
  { country: "Thailand", city: "Bangkok", lat: 13.75, lon: 100.52 },
  { country: "Thailand", city: "Chiang Mai", lat: 18.79, lon: 98.98 },
  // Togo
  { country: "Togo", city: "Lomé", lat: 6.14, lon: 1.22 },
  // Trinidad and Tobago
  { country: "Trinidad and Tobago", city: "Port of Spain", lat: 10.65, lon: -61.52 },
  // Tunisia
  { country: "Tunisia", city: "Tunis", lat: 36.82, lon: 10.17 },
  { country: "Tunisia", city: "Tozeur", lat: 33.92, lon: 8.13 },
  // Turkey
  { country: "Turkey", city: "Istanbul", lat: 41.01, lon: 28.95 },
  { country: "Turkey", city: "Ankara", lat: 39.93, lon: 32.86 },
  { country: "Turkey", city: "Antalya", lat: 36.90, lon: 30.69 },
  { country: "Turkey", city: "Erzurum", lat: 39.91, lon: 41.27 },
  // Turkmenistan
  { country: "Turkmenistan", city: "Ashgabat", lat: 37.95, lon: 58.38 },
  // Uganda
  { country: "Uganda", city: "Kampala", lat: 0.32, lon: 32.58 },
  // Ukraine
  { country: "Ukraine", city: "Kyiv", lat: 50.45, lon: 30.52 },
  { country: "Ukraine", city: "Odessa", lat: 46.48, lon: 30.73 },
  // United Arab Emirates
  { country: "United Arab Emirates", city: "Dubai", lat: 25.20, lon: 55.27 },
  { country: "United Arab Emirates", city: "Abu Dhabi", lat: 24.47, lon: 54.37 },
  // United Kingdom
  { country: "United Kingdom", city: "London", lat: 51.51, lon: -0.13 },
  { country: "United Kingdom", city: "Edinburgh", lat: 55.95, lon: -3.19 },
  { country: "United Kingdom", city: "Cardiff", lat: 51.48, lon: -3.18 },
  // United States
  { country: "United States", city: "New York", lat: 40.71, lon: -74.01 },
  { country: "United States", city: "Los Angeles", lat: 34.05, lon: -118.24 },
  { country: "United States", city: "Phoenix", lat: 33.45, lon: -112.07 },
  { country: "United States", city: "Anchorage", lat: 61.22, lon: -149.90 },
  { country: "United States", city: "Miami", lat: 25.77, lon: -80.19 },
  { country: "United States", city: "Chicago", lat: 41.88, lon: -87.63 },
  { country: "United States", city: "Honolulu", lat: 21.31, lon: -157.86 },
  { country: "United States", city: "Las Vegas", lat: 36.17, lon: -115.14 },
  // Uruguay
  { country: "Uruguay", city: "Montevideo", lat: -34.90, lon: -56.17 },
  // Uzbekistan
  { country: "Uzbekistan", city: "Tashkent", lat: 41.30, lon: 69.24 },
  // Venezuela
  { country: "Venezuela", city: "Caracas", lat: 10.48, lon: -66.88 },
  { country: "Venezuela", city: "Maracaibo", lat: 10.65, lon: -71.64 },
  // Vietnam
  { country: "Vietnam", city: "Hanoi", lat: 21.03, lon: 105.85 },
  { country: "Vietnam", city: "Ho Chi Minh City", lat: 10.82, lon: 106.63 },
  // Yemen
  { country: "Yemen", city: "Sana'a", lat: 15.35, lon: 44.21 },
  { country: "Yemen", city: "Aden", lat: 12.78, lon: 45.04 },
  // Zambia
  { country: "Zambia", city: "Lusaka", lat: -15.42, lon: 28.28 },
  // Zimbabwe
  { country: "Zimbabwe", city: "Harare", lat: -17.83, lon: 31.05 },
];

const COUNTRIES = [...new Set(WORLD_CITIES.map((c) => c.country))].sort();

// Fetch temperature for a single city
async function fetchTemp(city) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m&wind_speed_unit=ms`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data?.current?.temperature_2m ?? null;
}

// Fetch all temps for a country
async function fetchCountryTemps(country) {
  const cities = WORLD_CITIES.filter((c) => c.country === country);
  const results = await Promise.all(
    cities.map(async (c) => {
      const temp = await fetchTemp(c);
      return { ...c, temp };
    })
  );
  return results.filter((r) => r.temp !== null);
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #04080f;
    color: #e8edf5;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: radial-gradient(ellipse at 20% 0%, #0d2137 0%, #04080f 60%),
                radial-gradient(ellipse at 80% 100%, #1a0a00 0%, transparent 60%);
    padding: 0 0 80px;
  }

  .hero {
    text-align: center;
    padding: 60px 20px 48px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  .hero-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #f97316;
    margin-bottom: 16px;
    opacity: 0.9;
  }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 9vw, 108px);
    line-height: 0.9;
    letter-spacing: 2px;
    background: linear-gradient(135deg, #ffffff 30%, #94b4d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
  }

  .hero-sub {
    font-size: 15px;
    color: #6b8aaa;
    max-width: 420px;
    margin: 0 auto 40px;
    line-height: 1.6;
    font-weight: 300;
  }

  /* Search */
  .search-wrapper {
    max-width: 560px;
    margin: 0 auto;
    position: relative;
  }
  .search-row {
    display: flex;
    gap: 10px;
    align-items: stretch;
  }
  .search-box {
    flex: 1;
    position: relative;
  }
  .search-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    color: #e8edf5;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    padding: 14px 18px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .search-input:focus {
    border-color: rgba(249,115,22,0.5);
    background: rgba(255,255,255,0.08);
  }
  .search-input::placeholder { color: #4a6070; }

  .dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0; right: 0;
    background: #0d1b2a;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    max-height: 240px;
    overflow-y: auto;
    z-index: 100;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  }
  .dropdown::-webkit-scrollbar { width: 4px; }
  .dropdown::-webkit-scrollbar-track { background: transparent; }
  .dropdown::-webkit-scrollbar-thumb { background: #2a4060; border-radius: 2px; }

  .dropdown-item {
    padding: 11px 18px;
    cursor: pointer;
    font-size: 14px;
    color: #9ab0c8;
    transition: background 0.15s, color 0.15s;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .dropdown-item:last-child { border-bottom: none; }
  .dropdown-item:hover, .dropdown-item.active {
    background: rgba(249,115,22,0.12);
    color: #fff;
  }
  .dropdown-item mark {
    background: none;
    color: #f97316;
    font-weight: 600;
  }

  .search-btn {
    background: linear-gradient(135deg, #f97316, #ea580c);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 14px 24px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .search-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
  .search-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Main container */
  .main {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Status / loading */
  .status {
    text-align: center;
    padding: 60px 20px;
    color: #4a6070;
    font-size: 14px;
  }
  .loader {
    display: inline-block;
    width: 36px; height: 36px;
    border: 2px solid rgba(249,115,22,0.2);
    border-top-color: #f97316;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 16px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Result cards */
  .result-header {
    display: flex;
    align-items: baseline;
    gap: 14px;
    margin-bottom: 32px;
  }
  .result-country {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    letter-spacing: 1px;
    color: #fff;
  }
  .result-updated {
    font-size: 12px;
    color: #3d5570;
    font-weight: 300;
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 600px) {
    .cards { grid-template-columns: 1fr; }
  }

  .card {
    border-radius: 20px;
    padding: 32px;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.5s ease both;
  }
  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .card-hot {
    background: linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(249,115,22,0.06) 100%);
  }
  .card-hot::before { background: linear-gradient(135deg, rgba(239,68,68,0.5), rgba(249,115,22,0.2)); }

  .card-cold {
    background: linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(6,182,212,0.06) 100%);
  }
  .card-cold::before { background: linear-gradient(135deg, rgba(59,130,246,0.5), rgba(6,182,212,0.2)); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .card:nth-child(2) { animation-delay: 0.1s; }

  .card-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 11px;
    border-radius: 20px;
    margin-bottom: 24px;
  }
  .card-hot .card-badge {
    background: rgba(239,68,68,0.2);
    color: #fca5a5;
    border: 1px solid rgba(239,68,68,0.3);
  }
  .card-cold .card-badge {
    background: rgba(59,130,246,0.2);
    color: #93c5fd;
    border: 1px solid rgba(59,130,246,0.3);
  }

  .card-temp {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 72px;
    line-height: 1;
    margin-bottom: 8px;
  }
  .card-hot .card-temp { color: #fb923c; }
  .card-cold .card-temp { color: #60a5fa; }

  .card-unit {
    font-size: 28px;
    opacity: 0.6;
  }

  .card-city {
    font-size: 20px;
    font-weight: 600;
    color: #e8edf5;
    margin-bottom: 4px;
  }
  .card-country {
    font-size: 13px;
    color: #4a6070;
    font-weight: 300;
  }

  .all-cities {
    margin-top: 32px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
    animation: fadeUp 0.5s 0.2s ease both;
  }
  .all-cities-header {
    padding: 16px 24px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #3d5570;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .city-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    font-size: 14px;
    transition: background 0.15s;
  }
  .city-row:last-child { border-bottom: none; }
  .city-row:hover { background: rgba(255,255,255,0.03); }
  .city-name { color: #9ab0c8; }
  .city-temp-hot { color: #fb923c; font-weight: 600; font-size: 15px; }
  .city-temp-cold { color: #60a5fa; font-weight: 600; font-size: 15px; }
  .city-temp-mid { color: #6b8aaa; font-weight: 500; font-size: 15px; }

  /* World overview */
  .section-divider {
    text-align: center;
    padding: 60px 20px 32px;
    position: relative;
  }
  .section-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 20px; right: 20px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  }
  .section-label {
    display: inline-block;
    background: #04080f;
    padding: 0 20px;
    position: relative;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #3d5570;
    font-weight: 600;
  }

  .tip-box {
    background: rgba(249,115,22,0.06);
    border: 1px solid rgba(249,115,22,0.15);
    border-radius: 12px;
    padding: 16px 20px;
    font-size: 13px;
    color: #7a9ab8;
    line-height: 1.6;
    margin-top: 20px;
  }
  .tip-box strong { color: #f97316; }
`;

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function App() {
  const [query, setQuery] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);

  const filtered = query.length > 0
    ? COUNTRIES.filter((c) => c.toLowerCase().includes(query.toLowerCase())).slice(0, 12)
    : COUNTRIES.slice(0, 12);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setQuery(country);
    setShowDrop(false);
    setActiveIdx(-1);
  };

  const handleSearch = async () => {
    if (!selectedCountry) return;
    setLoading(true);
    setResults(null);
    setError("");
    try {
      const temps = await fetchCountryTemps(selectedCountry);
      if (temps.length === 0) throw new Error("No data returned");
      const sorted = [...temps].sort((a, b) => b.temp - a.temp);
      const hottest = sorted[0];
      const coldest = sorted[sorted.length - 1];
      setResults({ hottest, coldest, all: sorted });
    } catch (e) {
      setError("Could not fetch temperatures. Please try again.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (!showDrop) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && filtered[activeIdx]) handleSelect(filtered[activeIdx]);
      else if (filtered.length > 0) handleSelect(filtered[0]);
    } else if (e.key === "Escape") {
      setShowDrop(false);
    }
  };

  const highlight = (text) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark>{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  const tempColor = (temp, arr) => {
    const max = Math.max(...arr.map((c) => c.temp));
    const min = Math.min(...arr.map((c) => c.temp));
    if (temp === max) return "city-temp-hot";
    if (temp === min) return "city-temp-cold";
    return "city-temp-mid";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="hero">
          <div className="hero-eyebrow">🌍 Real-time global data</div>
          <div className="hero-title">
            THERMAL<br />EXTREMES
          </div>
          <div className="hero-sub">
            Discover the hottest and coldest places in any country — updated live from weather stations worldwide.
          </div>

          <div className="search-wrapper">
            <div className="search-row">
              <div className="search-box">
                <input
                  ref={inputRef}
                  className="search-input"
                  placeholder="Search for a country…"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedCountry("");
                    setShowDrop(true);
                    setActiveIdx(-1);
                  }}
                  onFocus={() => setShowDrop(true)}
                  onBlur={() => setTimeout(() => setShowDrop(false), 150)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
                {showDrop && filtered.length > 0 && (
                  <div className="dropdown">
                    {filtered.map((c, i) => (
                      <div
                        key={c}
                        className={`dropdown-item${i === activeIdx ? " active" : ""}`}
                        onMouseDown={() => handleSelect(c)}
                      >
                        {highlight(c)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="search-btn"
                onClick={handleSearch}
                disabled={!selectedCountry || loading}
              >
                {loading ? "Fetching…" : "Analyze →"}
              </button>
            </div>
          </div>
        </div>

        <div className="main">
          {loading && (
            <div className="status">
              <div className="loader" />
              <div>Scanning {WORLD_CITIES.filter((c) => c.country === selectedCountry).length} weather stations in {selectedCountry}…</div>
            </div>
          )}

          {error && (
            <div className="status" style={{ color: "#f87171" }}>{error}</div>
          )}

          {results && !loading && (
            <>
              <div className="result-header">
                <div className="result-country">{selectedCountry}</div>
                <div className="result-updated">Live · {new Date().toLocaleTimeString()}</div>
              </div>

              <div className="cards">
                {/* HOTTEST */}
                <div className="card card-hot">
                  <div className="card-badge">🔥 Hottest</div>
                  <div className="card-temp">
                    {results.hottest.temp.toFixed(1)}<span className="card-unit">°C</span>
                  </div>
                  <div className="card-city">{results.hottest.city}</div>
                  <div className="card-country">{results.hottest.country}</div>
                </div>

                {/* COLDEST */}
                <div className="card card-cold">
                  <div className="card-badge">❄️ Coldest</div>
                  <div className="card-temp">
                    {results.coldest.temp.toFixed(1)}<span className="card-unit">°C</span>
                  </div>
                  <div className="card-city">{results.coldest.city}</div>
                  <div className="card-country">{results.coldest.country}</div>
                </div>
              </div>

              {/* All cities ranked */}
              <div className="all-cities">
                <div className="all-cities-header">All monitored cities — ranked hottest to coldest</div>
                {results.all.map((city, i) => (
                  <div className="city-row" key={city.city}>
                    <span className="city-name">
                      {i + 1}. {city.city}
                    </span>
                    <span className={tempColor(city.temp, results.all)}>
                      {city.temp.toFixed(1)} °C
                    </span>
                  </div>
                ))}
              </div>

              <div className="tip-box">
                <strong>Data source:</strong> Open-Meteo free weather API · readings are current 2m air temperature at each city's coordinates · updated every hour.
              </div>
            </>
          )}

          {!results && !loading && !error && (
            <div className="status">
              Select a country above and click <strong style={{ color: "#f97316" }}>Analyze →</strong> to see live temperature extremes.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

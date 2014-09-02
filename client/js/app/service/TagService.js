"use strict";

angular.module("playlytics")
  .service("TagService", function() {

    var tags = [
      "Acid Jazz",
      "Acoustic Blues",
      "Adult Alternative",
      "Adult Contemporary",
      "Africa",
      "Afro-Beat",
      "Afro-Pop",
      "Alternative",
      "Alternative Country",
      "Alternative Folk",
      "Alternative Music",
      "Alternative Rap",
      "Alternative Rock",
      "Alternativo & Rock Latino",
      "Ambient",
      "American Trad Rock",
      "Americana",
      "Anime",
      "Arena Rock",
      "Asia",
      "Asian Pop (J-Pop, K-pop)",
      "Australia",
      "Avant-Garde",
      "Avant-Garde Jazz",
      "Baladas y Boleros",
      "Barbershop",
      "Baroque",
      "Big Band",
      "Blue Note",
      "Bluegrass",
      "Blues",
      "Blues-Rock",
      "Bop",
      "Bossa Nova",
      "Bounce",
      "Brazilian",
      "Breakbeat",
      "British Invasion",
      "Britpop",
      "CCM",
      "Cajun",
      "Caribbean",
      "Celtic",
      "Celtic Folk",
      "Chamber Music",
      "Chant",
      "Chanukah",
      "Chicago Blues",
      "Chicano",
      "Choral",
      "Christian & Gospel",
      "Christian Metal",
      "Christian Pop",
      "Christian Rap",
      "Christian Rock",
      "Christmas",
      "Christmas: Classic",
      "Christmas: Classical",
      "Christmas: Jazz",
      "Christmas: Modern",
      "Christmas: Pop",
      "Christmas: R&B",
      "Christmas: Religious",
      "Christmas: Rock",
      "Classic",
      "Classic Blues",
      "Classic Christian",
      "Classical",
      "Classical Crossover",
      "Classical Music",
      "College Rock",
      "Comedy",
      "Conjunto",
      "Contemporary Bluegrass",
      "Contemporary Blues",
      "Contemporary Celtic",
      "Contemporary Country",
      "Contemporary Folk",
      "Contemporary Gospel",
      "Contemporary Jazz",
      "Contemporary Latin",
      "Contemporary R&B",
      "Contemporary Singer/Songwriter",
      "Cool",
      "Country",
      "Country Blues",
      "Country Gospel",
      "Country Music",
      "Crossover Jazz",
      "Crunk",
      "Dance Music",
      "Dancehall",
      "Death Metal/Black Metal",
      "Delta Blues",
      "Dirty South",
      "Disco",
      "Disney",
      "Dixieland",
      "Doo Wop",
      "Doo-wop",
      "Downtempo",
      "Drinking Songs",
      "Drone",
      "Dub",
      "Dubstep",
      "Early Music",
      "East Coast Rap",
      "Easter",
      "Easy Listening",
      "Electric Blues",
      "Electro",
      "Electronic",
      "Electronic Music",
      "Electronic Rock",
      "Electronica",
      "Enka",
      "Environmental",
      "Ethio-jazz",
      "Europe",
      "European Music (Folk / Pop)",
      "Exercise",
      "Experimental Rock",
      "Fitness & Workout",
      "Folk-Rock",
      "Foreign Cinema",
      "France",
      "French Pop",
      "Funk",
      "Fusion",
      "Gangsta Rap",
      "Garage",
      "German Folk",
      "German Pop",
      "Glam Rock",
      "Gospel",
      "Goth Rock",
      "Grunge",
      "Hair Metal",
      "Halloween",
      "Hard Bop",
      "Hard Dance",
      "Hard Rock",
      "Hardcore",
      "Hardcore Punk",
      "Hardcore Rap",
      "Hawaii",
      "Healing",
      "Hi-NRG / Eurodance",
      "High Classical",
      "Hip Hop / Rap",
      "Hip-Hop",
      "Hip-Hop/Rap",
      "Holiday",
      "Holiday: Other",
      "Honky Tonk",
      "House",
      "IDM/Experimental",
      "Impressionist",
      "Indian Pop",
      "Indie Pop",
      "Indie Rock",
      "Industrial",
      "Inspirational (incl. Gospel)",
      "Instrumental",
      "J-Pop",
      "J-Punk",
      "J-Rock",
      "J-Ska",
      "J-Synth",
      "Jackin House",
      "Jam Bands",
      "Japan",
      "Japanese Pop",
      "Jazz",
      "K-Pop",
      "Karaoke",
      "Kayokyoku",
      "Klezmer",
      "Latin Jazz",
      "Latin Music",
      "Latin Rap",
      "Latino",
      "Lounge",
      "Lullabies",
      "Mainstream Jazz",
      "March (Marching Band)",
      "Medieval",
      "Meditation",
      "Metal",
      "Middle East",
      "Minimalism",
      "Modern Composition",
      "Motown",
      "Musicals",
      "Nature",
      "Neo-Soul",
      "New Acoustic",
      "New Age",
      "New Mex",
      "New Wave",
      "North America",
      "Novelty",
      "Old School Rap",
      "Opera",
      "Orchestral",
      "Original Score",
      "Outlaw Country",
      "Polka",
      "Pop",
      "Pop (Popular music)",
      "Pop Latino",
      "Pop/Rock",
      "Praise & Worship",
      "Prog-Rock/Art Rock",
      "Progressive Rock",
      "Psychedelic",
      "Punk",
      "Qawwali",
      "Quiet Storm",
      "R&B / Soul",
      "R&B/Soul",
      "Ragtime",
      "Rap",
      "Reggae",
      "Reggaeton y Hip-Hop",
      "Regional Mexicano",
      "Relaxation",
      "Renaissance",
      "Rock",
      "Rock & Roll",
      "Rockabilly",
      "Romantic",
      "Roots Reggae",
      "Roots Rock",
      "Salsa y Tropical",
      "Shoegaze",
      "Sing-Along",
      "Singer / Songwriter (inc; Folk)",
      "Singer/Songwriter",
      "Ska",
      "Smooth Jazz",
      "Soft Rock",
      "Soul",
      "Soundtrack",
      "South Africa",
      "South America",
      "Southern Gospel",
      "Southern Rock",
      "Spoken Word",
      "Standards",
      "Standup Comedy",
      "Steampunk",
      "Stories",
      "Surf",
      "Swing",
      "TV Soundtrack",
      "Techno",
      "Teen Pop",
      "Tex-Mex",
      "Tex-Mex / Tejano",
      "Thanksgiving",
      "Trad Jazz",
      "Traditional Bluegrass",
      "Traditional Celtic",
      "Traditional Country",
      "Traditional Folk",
      "Traditional Gospel",
      "Traditional Pop",
      "Trance",
      "Travel",
      "Underground Rap",
      "Urban Cowboy",
      "Vocal",
      "Vocal Jazz",
      "Vocal Pop",
      "Wedding Music",
      "West Coast Rap",
      "World",
      "World Music / Beats",
      "Worldbeat",
      "Zydeco"
    ];

    return {

      search: function(filter) {
        return {

          // Simulating a Promise
          then: function(callback) {
            filter = filter.toLowerCase();
            // console.log( filter );
            callback( _.filter(tags, function(tag){ return tag.toLowerCase().indexOf(filter) > -1; }) );
          }

        };
      }

    };
  });
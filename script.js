
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "backyard";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  backyard: {
    title: "Location: NYC",
    character: "Me",
    text: "The sun rises over the bustling city of New York. You are on your way to an interview for your chance to pitch a movie and begin your journey into the film industry as an up and coming director. Nail this pitch and you’ll get a free plane ticket to L.A. where the magic happens. The sun rises over the bustling streets of New York City, casting a warm glow over the cityscape. You start to ride your bicycle to work, you get distracted and suddenly hit a big object.",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "CHECK WHAT YOU HIT",
        action: function () {
          pickUpItem("brass knee");
        },
        nextScene: "entrance"
      },
      {
          text: "KEEP CYCLING",
          action: function () {
            pickUpItem("brass key");
          },
          nextScene: "hallway"
      }
    ]
  },

  entrance: {
    title: "Location: APARTMENT",
    character: "Interviewee:Old Man",
    text: "Your messy but cozy apartment, you had been living here for about 8 years getting used your new environment, Yet camp, the ramblings of your neighbors had left you quite tenacious to move out",
    choices: [
      {
        text: "SHOW HIM AROUND",
        nextScene: "backyard"
      },
         {
        text: "GO TO THEATRE",
        nextScene: "Theatre"
      }
    ]
  },

  theathre: {
    title: "The Theatre",
    text: "Where it all began, you were eight years old with your parents to see the movie JAWS by up and coming director Steven Spielberg, Even through the small shutters you could see of the movie shielded by your mother’s hands, Passion had started to lit up in your eyes as in that moment you realize that these pictures on the screen would somehow captivate you for the rest of your life.",
    choices: [
      {
        text: "ASK WHAT MOVIE HE WANTS TO SEE",
        nextScene: "lockedDoor"
      },
      {
        text:"GO TO PARK",
        nextScene: "Park"
      }
    ]
  },

   Park: {
    title: "PARK",
    text: "Central Park, one of the most known tourist attractions of New York. The lakes where couples lay in the boats, Where artists draw their scope, But for me, it’s where I usually eat.",
    choices: [
      {
        text: "ASK WHAT MOVIE HE WANTS TO SEE",
        action: unlockDoor
      },
      {
        text: "GO TO MEDIA STORE",
        nextScene: "backyard"
      }
    ]

  },

  MediaStore: {
    title:"THE STORE",
    text:"Many would list a grocery store as one of the most frequent stores they go to, But for me, my survival is dependent on my mind rather than my stomach. From the many books to albums to movies, this place has it all The different minds all encased in tiny little boxes to be paid to be seen, I would buy everything in this store if I could.",
    choices:[
      {
        text:"ASK IF HE WANTS ANYTHING",
        action: unlockDoor
      },
      {
        text:"GO TO BEACH",
        action: unlockDoor
      }
    ]
  },
  Beach: {
    title:"THE BEACH",
    text:"From the girls in bikinis to men in their trunks, this place would be where you’d spend your Sundays instead of being stuck in some old church. From the touch of cold sea water onto the heated surface of your suntanned skin. The hot sand touches your bosom as your tongue devours the cold popsicle. I mean, how else would you want to spend your weekend?",
    choices:[
      {
        text:"ASK WHAT HE WANTS TO DO",
        action: unlockDoor
      },
      {
        text:"GO TO UNIVERSITY",
        action: unlockDoor
      }
    ]
  },
    University: {
    title:"THE UNIVERSITY",
    text:"Shaped like a castle for the knowledgeable, The dormitories with sleep deprived students, The classes of absent professors Universities are made to create philosophers, the best in their craft. But how can you really be a philosopher if all your knowledge is of someone else's. All I’m saying is that you’ll know more of life when you experience it than hearing someone else’s.",
    choices:[
      {
        text:"ASK IF HE WANTS TO GO IN",
        action: unlockDoor
      },
      {
        text:"GO BACK TO STREET",
        action: unlockDoor
      }
    ]
  },
  
   GOODENDING: {
    title: "GOOD ENDING",
    text: "You and Yaroslav look beyond the vast look of New York, You see the as the bustling city creates a diverse set of stories following each person they come across, The stories beyond them are endless, Just like the endless connections to be made.",
    
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}


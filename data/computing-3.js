(function () {
var G = GAME;
G.topic("Hardware tour", "🔧", "Paper 2", [
{ t: "Inside a real computer", icon: "🖥️",
  c: ["Open a desktop computer and you find the motherboard, the main circuit board that everything plugs into. The CPU sits in a socket under a heatsink and fan, RAM sticks go in long slots beside it, and expansion cards (such as a graphics card) fit into slots below.", "The power supply unit (PSU) converts mains electricity into the low voltages the components need and sends it through coloured cables. Storage drives connect to the motherboard with data cables.", "The CPU gets hot, so a heatsink spreads the heat and a fan blows it away. Without cooling the CPU slows itself down to avoid damage (thermal throttling).", "Laptops use the same parts but smaller: soldered RAM, an M.2 SSD and a single battery in place of a PSU."],
  k: "Motherboard connects it all. CPU thinks, RAM remembers now, storage remembers for good, PSU feeds power.",
  q: [["m", "Which component is the main circuit board that all other parts connect to?", "Motherboard", "Power supply unit", "Heatsink", "Optical drive", "Everything plugs into the motherboard."],
      ["m", "What is the job of the power supply unit?", "Convert mains electricity into low voltages for the components", "Store the operating system", "Cool the CPU", "Process instructions", "It supplies power."],
      ["m", "Why does a CPU have a heatsink and fan?", "To remove heat and prevent damage or slowing down", "To make the CPU faster than its clock speed", "To store data", "To connect to the network", "Heat is a by-product of processing."],
      ["m", "Where does RAM plug into a desktop motherboard?", "DIMM slots next to the CPU socket", "The power connector", "The USB port", "The heatsink", "RAM comes in sticks that fit into slots."],
      ["t", "A graphics card is an example of an expansion card.", true, "It plugs into a slot on the motherboard."],
      ["w", "What is the name of the main circuit board in a computer? (one word)", ["motherboard"], "It connects every component."]] },
{ t: "Input, output and peripherals", icon: "🖱️",
  c: ["An input device sends data into a computer (keyboard, mouse, microphone, scanner, touchscreen, sensors). An output device presents results (monitor, speakers, printer).", "A monitor is made of millions of pixels. Each pixel is made of red, green and blue sub-pixels, and mixing them gives every colour. The resolution is the number of pixels.", "A microphone turns sound waves into an analogue electrical signal; an analogue-to-digital converter samples it into binary. A speaker reverses the process.", "Embedded systems such as a Raspberry Pi or Arduino are small computers built into other devices, using sensors and actuators to control things like a washing machine or a smart thermostat."],
  k: "Input in, process, output out. Sensors are inputs; motors and screens are outputs.",
  q: [["m", "Which of these is an input device?", "Microphone", "Speaker", "Monitor", "Printer", "It sends sound data into the computer."],
      ["m", "A screen pixel is usually made from which sub-pixels?", "Red, green and blue", "Cyan, magenta and yellow", "Black and white", "Red and green only", "Mixing RGB makes every colour."],
      ["m", "What does an analogue-to-digital converter do for a microphone signal?", "Samples it into binary data", "Makes it louder", "Compresses it into a zip file", "Sends it to the speaker", "Computers can only store digital data."],
      ["t", "A Raspberry Pi is an example of a small computer used in embedded systems.", true, "Single-board computers are often built into devices."],
      ["m", "A temperature sensor in a thermostat is an example of", "an input", "an output", "storage", "a protocol", "It sends data to the processor."],
      ["m", "Increasing a screen's resolution means", "more pixels", "bigger pixels only", "less colour", "slower refresh only", "Resolution counts pixels."]] }
]);
})();

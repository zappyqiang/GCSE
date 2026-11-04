(function () {
  var K = ANIM.kit;
  GAME.explain({
    "Computational thinking": K.cycle("Computational thinking", ["Decomposition", "Pattern|recognition", "Abstraction", "Algorithm|design"], [
      "Decomposition: break a big problem into smaller, easier parts.",
      "Pattern recognition: spot similarities between the parts so you can reuse solutions.",
      "Abstraction: ignore detail that does not matter and keep what does, like the Tube map.",
      "Algorithm design: write clear step-by-step instructions, then test and improve them."]),
    "Programming constructs": K.flow("The three programming constructs", ["Sequence|one line after|another", "Selection|IF / ELSE|chooses a path", "Iteration|loops repeat|code"], [
      "Every program is built from three constructs. Sequence runs instructions in order, top to bottom.",
      "Selection tests a condition and chooses which code to run: IF ... THEN ... ELSE.",
      "Iteration repeats code. A FOR loop repeats a set number of times; a WHILE loop repeats until a condition changes."]),
    "Testing and errors": K.compare("Types of error", ["Syntax error", "Logic error"], [
      ["Breaks the rules of the language", "Runs, but gives the wrong result"],
      ["Program will not run at all", "No error message appears"],
      ["e.g. missing bracket or typo", "e.g. using + instead of *"],
      ["Found by the translator", "Found by testing with trace tables"]], [
      "Two common kinds of error. Compare how each behaves.",
      "A syntax error means the program cannot even start.",
      "A logic error lets the program run, so it is harder to notice.",
      "Examples make the difference clear.",
      "Syntax errors are reported by the translator; logic errors need testing."]),
    "Binary shifts and units": K.layers("Units of data (each is 1000 times bigger)", ["Bit: 0 or 1", "Byte: 8 bits", "Kilobyte (kB): 1000 bytes", "Megabyte (MB): 1000 kB", "Gigabyte (GB): 1000 MB", "Terabyte (TB): 1000 GB"], [
      "A bit is the smallest unit: a single 0 or 1.",
      "8 bits make a byte, enough for one character.",
      "1000 bytes make a kilobyte, a short text file.",
      "1000 kilobytes make a megabyte, a photo or an MP3.",
      "1000 megabytes make a gigabyte, a film.",
      "1000 gigabytes make a terabyte, a large hard drive."]),
    "Images, sound and compression": K.flow("Storing sound digitally", ["Sound wave|(analogue)", "Sample the|wave at set|times", "Store each|sample as|binary", "Play back|the samples"], [
      "Sound is an analogue wave that changes smoothly.",
      "The computer measures the wave's height at regular intervals. The sample rate is how many samples per second.",
      "Each sample is stored as a binary number. More bits per sample (bit depth) means better quality.",
      "Playback joins the samples to rebuild the sound. Higher sample rate and bit depth mean better quality but bigger files."]),
    "CPU and memory": K.layers("Memory hierarchy: faster at the top, bigger at the bottom", ["Registers", "Cache", "RAM", "Secondary storage"], [
      "Registers sit inside the CPU: tiny and the fastest.",
      "Cache is small, very fast memory close to the CPU for data it uses often.",
      "RAM holds programs and data in use. It is bigger but slower, and volatile.",
      "Secondary storage (SSD or hard disk) is the largest and slowest, but keeps data without power."]),
    "Storage and software": K.compare("Types of secondary storage", ["Magnetic (hard disk)", "Solid state (SSD)"], [
      ["Spinning disks and a read head", "Flash memory, no moving parts"],
      ["Cheap per gigabyte", "More expensive per gigabyte"],
      ["Slower and can be damaged by knocks", "Fast, silent and durable"],
      ["Large capacities for backups", "Great for laptops and boot drives"]], [
      "Both store data permanently. Compare how they work.",
      "Magnetic drives are cheaper for the amount of storage.",
      "SSDs are quicker and tougher because nothing moves.",
      "Choose by cost, speed, durability and portability."]),
    "Boolean logic": K.compare("Logic gates with inputs A = 1, B = 0", ["Gate", "Output"], [
      ["A AND B", "0  (both must be 1)"],
      ["A OR B", "1  (at least one is 1)"],
      ["NOT A", "0  (flips the input)"],
      ["NOT B", "1  (flips the input)"]], [
      "Take A = 1 and B = 0 and work out each gate.",
      "AND needs both inputs to be 1, so the output is 0.",
      "OR needs only one input to be 1, so the output is 1.",
      "NOT turns 1 into 0.",
      "NOT turns 0 into 1."]),
    "Networks and protocols": K.flow("A web page request", ["Your device|asks for a|web page", "DNS finds the|server's IP|address", "Request sent|as packets|by routers", "Server replies|with packets", "Packets are|reassembled|and shown"], [
      "You type a web address or click a link.",
      "The DNS server turns the domain name into an IP address.",
      "The request is split into packets. Routers send each packet towards the server, possibly by different routes.",
      "The server sends the web page back, also in packets.",
      "TCP reassembles the packets in order and your browser displays the page."]),
    "Cyber security": K.layers("Layers of defence", ["People: training and strong passwords", "Software: anti-malware and updates", "Network: firewall and encryption", "Physical: locks and access control"], [
      "Good security uses several layers, so one failure does not give attackers access.",
      "People are often the weakest link, so train them to spot phishing and use strong passwords.",
      "Software defences: anti-malware and regular updates fix known weaknesses.",
      "Network defences: a firewall filters traffic and encryption protects data.",
      "Physical security stops people reaching the hardware."], false),
    "Sorting algorithms": K.compare("Comparing sorting algorithms", ["Bubble sort", "Merge sort"], [
      ["Compare neighbours and swap", "Split in half again and again"],
      ["Repeat passes until no swaps", "Merge the sorted halves in order"],
      ["Simple to write", "More complex to write"],
      ["Slow on big lists", "Much faster on big lists"]], [
      "Both put a list in order, in very different ways.",
      "Bubble sort works by swapping; merge sort works by dividing and merging.",
      "Bubble sort is easier to code.",
      "Merge sort wins on large lists but needs extra memory."]),
    "Searching algorithms": K.bars("Binary search: items left after each check (1024 items)", [["Start", 1024], ["1", 512], ["2", 256], ["3", 128], ["4", 64], ["5", 32], ["6", 16]], [
      "A sorted list of 1024 items.",
      "Check the middle and discard half: 512 left.",
      "256 left.", "128 left.", "64 left.", "32 left.",
      "After only 6 checks just 16 items remain. Linear search could need over 1000 checks."]),
    "Data types and variables": K.compare("Choosing a data type", ["Data", "Best type"], [
      ["Age: 15", "Integer"],
      ["Price: 3.99", "Real (float)"],
      ["Name: \"Sam\"", "String"],
      ["Has a ticket: True", "Boolean"]], [
      "Choose the data type by what the data is and how you will use it.",
      "Whole numbers are integers.",
      "Numbers with decimals are real numbers.",
      "Text is a string. Phone numbers are strings too, so leading zeros are kept.",
      "Yes or no values are Booleans."]),
    "Arrays, records and files": K.compare("Array or record?", ["Array", "Record"], [
      ["Many items of one type", "Related fields of different types"],
      ["scores[0], scores[1], scores[2]", "student.name, student.age"],
      ["Accessed by an index from 0", "Accessed by a field name"],
      ["e.g. 30 test marks", "e.g. one student's details"]], [
      "Both group data, but for different jobs.",
      "Arrays hold the same type; records mix types.",
      "Arrays use numeric indexes starting at 0.",
      "Use an array for a list of marks and a record for one person."]),
    "Subroutines and robust programs": K.flow("Calling a function", ["Main program|calls the|function", "Parameters|pass values|in", "Function runs|using local|variables", "Result returned|to the caller"], [
      "A function is a named block of code that you call from the main program.",
      "Values are passed in as parameters.",
      "The function does its work. Its local variables only exist inside it.",
      "A function returns a value to the line that called it. A procedure does not return a value."])
  });
})();

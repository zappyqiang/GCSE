(function () {
var G = GAME, ri = G.ri;
G.configure({
  key: "computing", subject: "Computer Science", spec: "AQA 8525 · 2 papers", title: "Computer Science course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/computer-science-and-it/gcse/computer-science-8525", channel: "Craig'n'Dave",
  intro: "Algorithms, programming, data representation, hardware, networks and the impact of computing, with number-system practice that regenerates every time.",
  finalName: "Final assessment", sheetName: "Quick reference", sheetNote: "Paper 1 is computational thinking and programming (on a computer). Paper 2 covers theory: data, computers, networks, cyber security and impacts."
});
G.sheet = [
  { h: "Number systems", rows: [
    ["Binary place values (8 bits)", "128  64  32  16  8  4  2  1"], ["Hex digits", "0 to 9 then A=10, B=11, C=12, D=13, E=14, F=15"], ["1 byte", "8 bits"], ["1 kilobyte", "1000 bytes"], ["1 megabyte", "1000 kilobytes"], ["File size", "bits per sample × samples × time; or pixels × colour depth"], ["Image bits", "width × height × colour depth"]
  ] },
  { h: "Logic gates", rows: [
    ["AND", "Output 1 only if both inputs are 1"], ["OR", "Output 1 if either input is 1"], ["NOT", "Reverses the input"]
  ] },
  { h: "Key terms", rows: [
    ["Algorithm", "A step-by-step set of instructions"], ["Abstraction", "Removing unnecessary detail"], ["Decomposition", "Breaking a problem into parts"], ["Iteration", "Repeating a set of instructions"], ["Selection", "Choosing a path with IF"], ["Variable", "A named value that can change"], ["Constant", "A named value that cannot change"], ["Compiler", "Translates all code before running"], ["Interpreter", "Translates and runs line by line"]
  ] }
];

G.topic("Algorithms and programming", "🧠", "Paper 1", [
{ t: "Computational thinking", icon: "🧩",
  c: ["Decomposition breaks a problem into smaller parts. Abstraction removes unnecessary detail. Algorithmic thinking designs the steps.", "Algorithms can be shown with flowcharts and pseudocode.", "Decomposition makes complex problems manageable and lets teams share work.", "Abstraction is used in a map of the Tube: only stations and lines are shown."],
  k: "Break it up, strip it down, step it out.",
  q: [["m", "Removing unnecessary detail is called", "abstraction", "decomposition", "iteration", "selection", "A map ignores unimportant features."],
      ["m", "Breaking a problem into parts is", "decomposition", "abstraction", "compilation", "encryption", "Smaller parts are easier to solve."],
      ["p", "Match the symbol to flowchart meaning.", [["Oval", "Start or end"], ["Rectangle", "Process"], ["Diamond", "Decision"], ["Parallelogram", "Input or output"]]]] },

{ t: "Programming constructs", icon: "⌨️",
  c: ["Three constructs: sequence, selection (IF) and iteration (loops).", "Data types: integer, real, Boolean, character, string.", "A variable can change; a constant cannot. Use meaningful names.", "Count-controlled loops (FOR) repeat a fixed number of times; condition-controlled loops (WHILE) repeat until a condition changes."],
  k: "Sequence, selection, iteration.",
  q: [["s", "Which construct?", { "Selection": ["IF age >= 18", "ELSE"], "Iteration": ["FOR i = 1 TO 10", "WHILE x < 5"] }],
      ["m", "The data type for True or False is", "Boolean", "integer", "string", "real", "A Boolean has two values."],
      ["m", "A WHILE loop repeats", "until a condition is false", "exactly 3 times", "never", "once", "It is condition-controlled."]] },

{ t: "Searching and sorting", icon: "🔎",
  c: ["Linear search checks each item in turn. Binary search needs a sorted list and halves the search area each time.", "Bubble sort compares neighbours and swaps; it is simple but slow. Merge sort divides lists and merges them, which is faster for big lists.", "Binary search is much faster than linear on large sorted data.", "You should be able to trace an algorithm by hand."],
  k: "Binary search needs sorted data.",
  q: [["m", "Which search needs a sorted list?", "binary", "linear", "both", "neither", "It checks the middle item."],
      ["n", "How many items are left after one binary search step on 16 items (best case, halved)?", 8, "items", "Each step halves the list."],
      ["t", "Merge sort uses divide and conquer.", true, "It splits and merges."]] },

{ t: "Testing and errors", icon: "🐞",
  c: ["Syntax errors break the rules of the language. Logic errors give wrong output. Runtime errors occur while running.", "Test data types: normal, boundary (edge) and erroneous (invalid).", "Trace tables record variable values step by step.", "Defensive design includes validation, input sanitisation and authentication."],
  k: "Normal, boundary, erroneous.",
  q: [["m", "An error where the code runs but gives wrong results is a", "logic error", "syntax error", "hardware fault", "typo", "The rules are followed, but the logic is wrong."],
      ["m", "A valid age range is 0 to 120. Test data of 120 is", "boundary", "erroneous", "normal", "random", "It's on the edge."],
      ["t", "Validation checks whether data is reasonable.", true, "It does not check it is correct."]] }
]);

G.topic("Data representation", "🔢", "Paper 2", [
{ t: "Binary and hexadecimal", icon: "0️⃣",
  c: ["Computers use binary (base 2). Place values for 8 bits are 128, 64, 32, 16, 8, 4, 2, 1.", "To convert binary to denary, add the place values where there is a 1.", "Hexadecimal (base 16) uses 0 to 9 and A to F. One hex digit represents 4 bits.", "Binary addition: 1 + 1 = 10 with a carry."],
  k: "Hex is shorthand for binary: 4 bits per digit.",
  q: [function () { var n = ri(5, 250), b = n.toString(2).padStart(8, "0"); return ["n", "Convert the binary number " + b + " to denary.", n, "", "Add the place values with a 1."]; },
      function () { var n = ri(20, 255); return ["w", "Convert " + n + " to hexadecimal (capital letters).", [n.toString(16).toUpperCase()], "Divide by 16: the quotient is the first digit."]; },
      ["m", "What does the hex digit F represent in denary?", "15", "16", "10", "14", "A=10 up to F=15."]] },

{ t: "Binary shifts and units", icon: "↔️",
  c: ["A left shift multiplies by 2 for each place. A right shift divides by 2 (ignoring remainders).", "Units: bit, nibble (4 bits), byte (8 bits), kilobyte (1000 bytes), megabyte, gigabyte, terabyte.", "Character sets such as ASCII and Unicode map numbers to characters; Unicode supports more languages.", "In ASCII, A is 65 and a is 97."],
  k: "Left shift doubles, right shift halves.",
  q: [["m", "A left shift of 1 place on binary 0011 (3) gives", "6", "1", "12", "2", "It multiplies by 2."],
      ["n", "How many bytes is 2 kilobytes?", 2000, "bytes", "1 KB = 1000 bytes."],
      ["t", "Unicode can represent more characters than ASCII.", true, "It uses more bits."]] },

{ t: "Images, sound and compression", icon: "🖼️",
  c: ["Images are pixels. Colour depth is the bits per pixel. Resolution is the number of pixels.", "File size (bits) = width × height × colour depth.", "Sound is sampled: sample rate (Hz), bit depth and duration affect size and quality.", "Lossy compression removes data permanently; lossless can be perfectly restored."],
  k: "More pixels or samples means larger files.",
  q: [function () { var w = ri(2, 10) * 10, h = ri(2, 10) * 10, d = ri(1, 4) * 2; return ["n", "An image is " + w + " by " + h + " pixels with a colour depth of " + d + " bits. File size in bits?", w * h * d, "bits", "width × height × colour depth."]; },
      ["s", "Lossy or lossless?", { "Lossy": ["JPEG", "MP3"], "Lossless": ["PNG", "ZIP"] }],
      ["t", "A higher sample rate gives better sound quality but a bigger file.", true, "More samples are stored per second."]] }
]);

G.topic("Computer systems", "💻", "Paper 2", [
{ t: "CPU and memory", icon: "🧮",
  c: ["The CPU runs the fetch-decode-execute cycle. Components: ALU, control unit, registers, cache.", "RAM is volatile main memory holding programs in use. ROM is non-volatile and stores boot instructions.", "Clock speed, cores and cache size affect performance.", "Embedded systems are computers inside other devices, such as washing machines."],
  k: "Fetch, decode, execute.",
  q: [["o", "Order the cycle.", ["Fetch", "Decode", "Execute"]],
      ["m", "Which memory is volatile?", "RAM", "ROM", "SSD", "hard disk", "RAM loses data when power is off."],
      ["m", "The ALU performs", "arithmetic and logic", "storage", "display", "cooling", "ALU = arithmetic logic unit."]] },

{ t: "Storage and software", icon: "💾",
  c: ["Secondary storage keeps data permanently: magnetic (hard disk), optical (CD) and solid state (SSD).", "Factors: capacity, speed, portability, durability and cost.", "System software includes the operating system and utilities; application software does specific tasks.", "Translators: compiler, interpreter, assembler."],
  k: "Choose storage by speed, capacity and cost.",
  q: [["s", "Storage type?", { "Magnetic": ["Hard disk drive"], "Solid state": ["SSD", "USB flash drive"], "Optical": ["DVD", "Blu-ray"] }],
      ["m", "A compiler", "translates the whole program before it runs", "runs line by line", "stores files", "cools the CPU", "It makes an executable."],
      ["t", "An operating system manages hardware and software.", true, "It is system software."]] },

{ t: "Boolean logic", icon: "🔌",
  c: ["AND outputs 1 only if both inputs are 1. OR outputs 1 if at least one input is 1. NOT flips the input.", "Truth tables list all input combinations and the outputs.", "Gates can be combined into logic circuits.", "Logic underpins decisions in programs."],
  k: "AND needs both; OR needs either.",
  q: [["m", "A AND B when A=1 and B=0 gives", "0", "1", "2", "undefined", "Both must be 1."],
      ["m", "NOT 1 gives", "0", "1", "10", "2", "NOT inverts."],
      ["m", "A OR B when A=0 and B=1 gives", "1", "0", "2", "undefined", "One input is 1."]] }
]);

G.topic("Networks and security", "🌐", "Paper 2", [
{ t: "Networks and protocols", icon: "📡",
  c: ["A LAN covers a small area; a WAN covers a large area such as the internet.", "Topologies include star and bus. A star network has a central switch and is reliable.", "Protocols are rules: HTTP/HTTPS (web), FTP (files), SMTP, IMAP and POP (email), TCP/IP.", "The internet is a network of networks; DNS translates domain names into IP addresses."],
  k: "Protocols are shared rules for communication.",
  q: [["m", "Which protocol is secure web browsing?", "HTTPS", "FTP", "SMTP", "POP", "The S stands for secure."],
      ["m", "DNS converts", "domain names to IP addresses", "binary to hex", "text to images", "files to emails", "It looks up addresses."],
      ["p", "Match the protocol.", [["HTTP", "Web pages"], ["FTP", "File transfer"], ["SMTP", "Sending email"], ["TCP/IP", "Routing packets across the internet"]]]] },

{ t: "Cyber security", icon: "🔐",
  c: ["Threats: malware, phishing, brute force attacks, denial of service, SQL injection and social engineering.", "Defences: firewalls, anti-malware, strong passwords, encryption, two-factor authentication and penetration testing.", "Encryption scrambles data so only authorised users can read it.", "Human error is a big weakness."],
  k: "People are often the weakest link.",
  q: [["m", "A fake email asking for your password is", "phishing", "a firewall", "a bus network", "compression", "It tricks users."],
      ["s", "Threat or defence?", { "Threat": ["Malware", "Brute force attack"], "Defence": ["Firewall", "Two-factor authentication"] }],
      ["t", "Encryption makes data unreadable without a key.", true, "It protects confidentiality."]] }
]);

G.topic("Impacts of technology", "⚖️", "Paper 2", [
{ t: "Ethical, legal and environmental impacts", icon: "🌱",
  c: ["Ethical issues include privacy, bias in AI and the digital divide.", "UK laws: Data Protection Act 2018 (UK GDPR), Computer Misuse Act 1990, Copyright, Designs and Patents Act 1988.", "Environmental impacts include e-waste and energy use, but technology can also cut travel.", "Open source software lets users see and change the code; proprietary software does not."],
  k: "Technology brings benefits and responsibilities.",
  q: [["m", "Which law makes hacking illegal?", "Computer Misuse Act 1990", "Data Protection Act", "Copyright Act", "Human Rights Act", "It covers unauthorised access."],
      ["m", "The digital divide is the gap between", "people with and without access to technology", "two networks", "RAM and ROM", "files", "Access varies."],
      ["t", "E-waste is an environmental concern.", true, "Old devices contain toxic materials."]] }
]);
})();

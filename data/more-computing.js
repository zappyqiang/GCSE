(function () {
  const { ri, pick } = GAME;
  GAME.more({
    "Computational thinking": [
      ["m", "Hiding unnecessary detail to focus on what matters is called", "abstraction", "decomposition", "iteration", "validation", "Abstraction removes irrelevant detail."],
      ["m", "Breaking a big problem into smaller parts is", "decomposition", "abstraction", "casting", "compiling", "Decomposition makes problems manageable."],
      ["t", "Algorithmic thinking means working out step-by-step instructions to solve a problem.", true, "An algorithm is a precise sequence of steps."],
      ["m", "A London Underground map is a good example of", "abstraction", "decomposition", "encryption", "iteration", "It leaves out real distances and geography."],
      ["m", "Which is NOT part of computational thinking?", "Compression", "Abstraction", "Decomposition", "Algorithmic thinking", "Compression is a data topic."]],
    "Programming constructs": [
      ["m", "The three basic programming constructs are", "sequence, selection, iteration", "input, process, output", "read, write, delete", "if, else, print", "These control program flow."],
      ["m", "A FOR loop is best when", "you know how many repeats are needed", "you must wait for a condition", "you want to skip a line", "you need a function", "FOR counts a set number of times."],
      ["m", "Which construct is IF ... ELSE?", "Selection", "Iteration", "Sequence", "Recursion", "It chooses a path."],
      ["t", "A WHILE loop can run zero times.", true, "If the condition is false at the start, the body never runs."],
      () => { const n = ri(3, 9); return ["n", "A loop runs FOR i = 1 TO " + n + ". How many times does the body run?", n, "times", "From 1 to " + n + " inclusive."]; }],
    "Searching and sorting": [
      ["m", "Which algorithm compares neighbours and swaps them?", "Bubble sort", "Binary search", "Merge sort", "Linear search", "That is bubble sort."],
      ["t", "Binary search can be used on an unsorted list.", false, "It needs sorted data."],
      ["m", "Which search might check every item?", "Linear search", "Binary search", "Merge sort", "Bubble sort", "Linear search goes one by one."],
      ["m", "Which sort splits the list in half repeatedly?", "Merge sort", "Bubble sort", "Insertion sort", "Linear sort", "Divide and conquer."],
      ["m", "Best case for linear search is when the target is", "the first item", "the last item", "missing", "in the middle", "Only one comparison is needed."]],
    "Testing and errors": [
      ["m", "A missing closing bracket is what type of error?", "Syntax error", "Logic error", "Runtime error", "Boundary error", "The code breaks language rules."],
      ["m", "A program runs but gives wrong results. This is a", "logic error", "syntax error", "hardware fault", "network error", "The logic is wrong."],
      ["t", "Iterative testing happens during development.", true, "Parts are tested as they are written."],
      ["m", "Test data outside what the program should accept is", "erroneous data", "boundary data", "typical data", "normal data", "Erroneous data should be rejected."],
      ["m", "A divide by zero crash is a", "runtime error", "syntax error", "logic error", "design error", "It occurs while running."]],
    "Binary and hexadecimal": [
      () => { const n = ri(5, 63); return ["w", "Convert " + n + " to binary.", [n.toString(2)], "Use place values 32, 16, 8, 4, 2, 1."]; },
      () => { const n = ri(10, 255); return ["w", "Convert decimal " + n + " to hexadecimal (capital letters).", [n.toString(16).toUpperCase(), n.toString(16).toUpperCase().padStart(2, "0")], "Divide by 16: the quotient is the first digit."]; },
      () => { const n = ri(5, 63); return ["n", "Convert binary " + n.toString(2) + " to decimal.", n, "", "Add up the place values where there is a 1."]; },
      ["m", "Why is hexadecimal used?", "It is shorter and easier to read than binary", "Computers store hex", "It is faster", "It uses fewer bits", "One hex digit = 4 bits."],
      ["n", "How many bits are in one byte?", 8, "bits", "A byte is 8 bits."]],
    "Binary shifts and units": [
      () => { const n = ri(1, 15), s = ri(1, 2); return ["n", "Shift the binary number for " + n + " left by " + s + ". What is the decimal result?", n * Math.pow(2, s), "", "Each left shift doubles the value."]; },
      ["m", "A right shift by 1 does what to the value?", "Halves it (whole number)", "Doubles it", "Adds 1", "Does nothing", "Dividing by 2."],
      ["n", "How many bytes are in 1 kilobyte (using 1000)?", 1000, "bytes", "AQA uses 1000: 1 kB = 1000 B."],
      ["m", "Which is the largest unit?", "Gigabyte", "Megabyte", "Kilobyte", "Terabyte is larger", "Terabyte is bigger than a gigabyte."],
      ["n", "How many bits are in 3 bytes?", 24, "bits", "3 × 8."]],
    "Images, sound and compression": [
      () => { const w = ri(2, 10), h = ri(2, 10), d = pick([1, 2, 4, 8]); return ["n", "An image is " + w + " by " + h + " pixels with a colour depth of " + d + " bits. How many bits is the file?", w * h * d, "bits", "Width × height × colour depth."]; },
      ["m", "Increasing a sound's sample rate will", "increase quality and file size", "reduce quality", "reduce file size", "do nothing", "More samples per second."],
      ["m", "Lossy compression", "permanently removes some data", "restores all data", "increases file size", "uses encryption", "Original cannot be rebuilt exactly."],
      ["t", "Run length encoding is a lossless method.", true, "It replaces repeats with counts and loses nothing."],
      ["m", "More colours in an image needs a higher", "colour depth", "sample rate", "frequency", "bit rate of the CPU", "Colour depth is bits per pixel."]],
    "CPU and memory": [
      ["m", "Which stores the program currently running?", "RAM", "ROM", "The ALU", "A hard disk only", "Active programs are held in RAM."],
      ["t", "ROM is volatile.", false, "ROM is non-volatile."],
      ["m", "The control unit", "coordinates the fetch-decode-execute cycle", "stores files", "does the arithmetic", "cools the CPU", "It directs operations."],
      ["m", "Cache memory is", "very fast memory near the CPU", "slow permanent storage", "optical storage", "virtual memory", "It reduces waiting."],
      ["m", "Embedded systems are designed for", "a specific task", "general use", "gaming only", "networks only", "They are dedicated."]],
    "Storage and software": [
      ["m", "Which uses laser light to read data?", "Optical storage", "Magnetic storage", "Solid state", "RAM", "CDs and DVDs are optical."],
      ["t", "Solid state drives have no moving parts.", true, "They use flash memory."],
      ["m", "Which is system software?", "Operating system", "Spreadsheet", "Web browser", "Game", "It runs the computer."],
      ["m", "Which converts high-level code line by line?", "Interpreter", "Compiler", "Assembler", "Linker", "Interpreters run as they translate."],
      ["m", "Which unit would store a film?", "Gigabytes", "Bytes", "Bits", "Kilobytes", "Films are large."]],
    "Boolean logic": [
      () => { const a = ri(0, 1), b = ri(0, 1); return ["n", "A = " + a + " and B = " + b + ". What is A AND B?", a && b ? 1 : 0, "", "AND is 1 only when both are 1."]; },
      () => { const a = ri(0, 1), b = ri(0, 1); return ["n", "A = " + a + " and B = " + b + ". What is A OR B?", a || b ? 1 : 0, "", "OR is 1 if either is 1."]; },
      ["m", "The output of NOT 0 is", "1", "0", "2", "10", "NOT inverts."],
      ["t", "A truth table with two inputs has 4 rows.", true, "2² = 4."],
      ["m", "Which gate gives 1 only when both inputs are 1?", "AND", "OR", "NOT", "NOR", "AND needs both."]],
    "Networks and protocols": [
      ["m", "A router", "directs packets between networks", "stores web pages", "encrypts email", "scans for viruses", "Routers forward packets."],
      ["m", "Which protocol is used to transfer files?", "FTP", "SMTP", "DNS", "HTML", "FTP = file transfer protocol."],
      ["t", "An IP address identifies a device on a network.", true, "Packets use IP addresses."],
      ["m", "A MAC address is", "a unique hardware address of a network card", "a web address", "a password", "an email", "Assigned by the manufacturer."],
      ["m", "A benefit of a network is", "sharing files and devices", "it never fails", "needs no setup", "it removes viruses", "Sharing resources saves cost."]],
    "Cyber security": [
      ["m", "A strong password is", "long and mixed characters", "your pet's name", "123456", "your date of birth", "Length and variety make it hard to guess."],
      ["t", "Updating software can fix security flaws.", true, "Patches close vulnerabilities."],
      ["m", "A firewall", "monitors and filters network traffic", "repairs hardware", "compresses files", "speeds up the CPU", "It blocks unauthorised access."],
      ["m", "Encryption", "scrambles data so only the key holder can read it", "deletes data", "compresses data", "copies data", "It protects data."],
      ["m", "Which is an example of social engineering?", "Calling and pretending to be IT support", "Brute force", "A firewall", "A backup", "It manipulates people."]],
    "Ethical, legal and environmental impacts": [
      ["m", "The Computer Misuse Act covers", "hacking and unauthorised access", "copying music", "data storage", "email", "It makes unauthorised access illegal."],
      ["m", "The Data Protection Act / UK GDPR says personal data must be", "kept secure and used lawfully", "sold freely", "kept forever", "shared publicly", "It protects individuals."],
      ["t", "Open source software lets users see and change the code.", true, "Source code is available."],
      ["m", "An environmental issue of technology is", "e-waste", "faster internet", "bigger screens", "better graphics", "Discarded devices create toxic waste."],
      ["m", "The digital divide is the gap between", "people with and without access to technology", "two networks", "two CPUs", "RAM and ROM", "Access is unequal."]]
  });
})();

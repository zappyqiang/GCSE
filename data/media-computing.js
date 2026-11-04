/* Real hardware photographs (Wikimedia Commons), video links and extra theory animations for Computer Science.
   Photos load from commons.wikimedia.org using the file name; each photo links to its file page for author and licence. */
(function () {
  var K = ANIM.kit;
  var C = ANIM.h.COL, H = ANIM.h;
  GAME.media({
    "Inside a real computer": {
      pics: [
        ["Atx computer motherboard with cpu and fan.jpg", "A motherboard with the CPU, cooler and RAM slots", "Find the CPU socket, the RAM slots and the expansion slots."],
        ["Computer from inside 018.jpg", "Inside a desktop PC case", "Everything connects to the motherboard."],
        ["ATX computer case.jpg", "A desktop (ATX) computer case", "The case holds and protects the components."],
        ["ATX Computer power supply unit.jpg", "A power supply unit (PSU)", "Converts mains electricity to low voltages."],
        ["ATX power supply interior.jpg", "Inside a PSU", "Transformer, capacitors and a cooling fan."],
        ["NVidia GeForce 6600GT AGP with GPU 2009-01-27.jpg", "A graphics card with its GPU", "An expansion card that plugs into the motherboard."]
      ],
      vids: [["Crash Course Computer Science #7: The CPU", "https://www.youtube.com/watch?v=FZGugFqdr60", "How a CPU works, from the Crash Course series"]]
    },
    "Input, output and peripherals": {
      pics: [
        ["LCD Pixels Macro.jpg", "Zoomed in on an LCD screen", "Each pixel is built from red, green and blue parts."],
        ["USB-Microphone.jpg", "A USB microphone", "An input device that turns sound into an electrical signal."],
        ["Raspberry Pi 5 Board.jpg", "A Raspberry Pi single-board computer", "Small computers like this are used in embedded systems."],
        ["Arduino Mega 2.jpg", "An Arduino microcontroller board", "Often used to read sensors and control devices."]
      ]
    },
    "CPU and memory": {
      pics: [
        ["Intel i9-14900KF CPU.jpg", "A modern CPU (Intel Core i9)", "The processor sits in a socket on the motherboard."],
        ["RAM Module (SDRAM-DDR4).jpg", "A DDR4 RAM module", "RAM is volatile, so its data is lost when the power goes off."],
        ["BIOS@ASUS P8H67.JPG", "A BIOS ROM chip on a motherboard", "ROM holds the start-up instructions and is non-volatile."],
        ["CPU fan and heatsink.jpg", "A CPU heatsink and fan", "Keeps the CPU cool."],
        ["IBM PC Motherboard (1981).jpg", "The 1981 IBM PC motherboard", "Its Intel 8088 CPU ran at 4.77 MHz, thousands of times slower than today."]
      ],
      vids: [["Crash Course Computer Science #6: Registers and RAM", "https://www.youtube.com/watch?v=fpnE6UAfbtU", "How memory is built from logic gates"]]
    },
    "Fetch-decode-execute cycle": {
      pics: [
        ["Ic-photo-Intel--P8088--(8088-CPU).png", "An Intel 8088 CPU", "The processor in the first IBM PC. It ran the fetch-decode-execute cycle just like a modern CPU."],
        ["Intel Pentium.jpg", "An Intel Pentium CPU", "Each generation runs the same cycle faster."],
        ["Intel i7 6800k cpu.jpg", "A modern multi-core CPU", "Each core runs its own fetch-decode-execute cycle."]
      ],
      vids: [
        ["Fetch-Decode-Execute Cycle (GCSE)", "https://www.youtube.com/watch?v=wqCZu-Ct48U", "A GCSE-level walkthrough of the cycle"],
        ["FDE and registers", "https://www.youtube.com/watch?v=vKkPwTKLASQ", "How instructions and data move between memory and registers"],
        ["Crash Course Computer Science #5: The ALU", "https://www.youtube.com/watch?v=1I5ZMmrOfnA", "How computers calculate"]
      ]
    },
    "CPU performance": {
      pics: [
        ["Heatsink with heat pipes.jpg", "A heatsink with heat pipes", "Heat pipes carry heat away from a fast CPU."],
        ["Arctic Freezer 13 heatsink.jpg", "A tower CPU cooler", "A larger cooler lets a CPU run fast for longer."],
        ["Raspberry Pi 5 Board.jpg", "An embedded-style computer", "Slower and cheaper CPUs are used when low power matters."]
      ]
    },
    "Memory and storage types": {
      pics: [
        ["RAM Module (SDRAM-DDR4).jpg", "RAM: fast, volatile memory", "Holds programs and data while they are in use."],
        ["AMIBIOS ROM-Chip 1992.JPG", "A ROM chip", "Non-volatile memory that holds start-up instructions."],
        ["SAMSUNG M.2 SATA SSD PM871a 256GB.jpg", "A solid state drive (M.2)", "Secondary storage with no moving parts."],
        ["Hard disk.jpg", "A magnetic hard disk drive", "Secondary storage using spinning platters."]
      ]
    },
    "Storage and software": {
      pics: [
        ["HDD read-write head.jpg", "A hard disk read-write head", "The head floats just above the spinning platter."],
        ["Seagate ST33232A hard disk head and platters detail.jpg", "Hard disk platters and head", "Data is stored as magnetised patches on the platter."],
        ["SAMSUNG M.2 SATA SSD PM871a 256GB.jpg", "An M.2 solid state drive", "Flash memory chips store the data, with no moving parts."],
        ["Intel X25-M Solid-State Drive.jpg", "A 2.5-inch SATA SSD", "Fits in laptops and desktops in place of a hard disk."],
        ["LightScribe Optical Disc Drive.jpg", "An optical disc drive", "A laser reads pits and lands on a CD, DVD or Blu-ray."],
        ["SanDisk-Cruzer-USB-4GB-ThumbDrive.jpg", "A USB flash drive", "Portable solid state storage."]
      ],
      vids: [["Crash Course Computer Science #4: Binary", "https://www.youtube.com/watch?v=1GSjbWt0c9M", "How computers store everything as 1s and 0s"]]
    },
    "Boolean logic": {
      pics: [
        ["TI SN7400N.jpg", "A real 7400 chip", "This chip contains four NAND logic gates in a 14-pin package."],
        ["TexasInstruments 7400 chip, view and element placement.jpg", "Inside a 7400 chip", "The chip's gates are made of transistors on a tiny slice of silicon."]
      ],
      vids: [["Crash Course Computer Science #3: Boolean Logic and Logic Gates", "https://www.youtube.com/watch?v=gI-qXk7XojA", "How transistors make AND, OR and NOT gates"]]
    },
    "Networks and protocols": {
      pics: [
        ["Netgear-Nighthawk-AC1900-WiFi-Router.jpg", "A home Wi-Fi router", "Sends packets between your devices and the internet."],
        ["Network switches.jpg", "Network switches and cables", "A switch connects devices on a LAN."],
        ["Patch cable with RJ45 connector.jpg", "An Ethernet patch cable with RJ45 connector", "Twisted-pair copper cable for wired networks."],
        ["3Com 3C905B.jpg", "A network interface card (NIC)", "Lets a computer connect to a network."],
        ["Optical cable.jpg", "A fibre optic cable", "Sends data as pulses of light over long distances."]
      ],
      vids: [
        ["How Data Travels Across the Internet (Visually Explained)", "https://www.youtube.com/watch?v=VAfquj_OUNs", "Packets, routers, TCP/IP and DNS"],
        ["How the Internet ACTUALLY Works", "https://www.youtube.com/watch?v=yyyDXqe0seM", "A beginner-friendly walkthrough"]
      ]
    },
    "Network types and topologies": {
      pics: [
        ["19-inch rackmount Ethernet switches and patch panels.jpg", "Switches and patch panels in a rack", "In a star network every cable runs back to a central switch."],
        ["Linksys-Wireless-G-Router.jpg", "A wireless router", "Provides Wi-Fi for a LAN."],
        ["Fibre-optic cable in a Telstra pit.jpg", "Fibre-optic cable underground", "WANs use long-distance fibre run by telecom companies."]
      ]
    },
    "Protocols and the internet": {
      pics: [
        ["Rack001.jpg", "A server rack", "Websites and email are served from computers like these."],
        ["Datacenter Server Racks (22370909788).jpg", "Rows of server racks in a data centre", "DNS, web and email servers work together here."]
      ]
    },
    "Images, sound and compression": {
      pics: [
        ["LCD Pixels Macro.jpg", "Pixels on an LCD screen", "An image is a grid of pixels. Colour depth sets how many colours each can show."],
        ["A microphone.jpg", "A microphone", "Sound is sampled many times a second to make a digital file."]
      ]
    },
    "Ethical, legal and environmental impacts": {
      pics: [
        ["Electronic waste.jpg", "A pile of discarded electronics", "E-waste contains toxic materials and valuable metals."],
        ["Electronic waste at Agbogbloshie, Ghana.jpg", "An e-waste site in Ghana", "Much e-waste is exported to countries with weaker safeguards."],
        ["E waste bin.jpg", "An e-waste recycling bin", "Recycling recovers materials and reduces pollution."]
      ]
    },
    "Operating systems and software": {
      pics: [["Computer from inside 018.jpg", "The hardware the OS manages", "The operating system controls the CPU, memory and storage you see here."]]
    },
    "Cyber security": {
      pics: [
        ["Network switches.jpg", "Network equipment", "Firewalls and encryption protect the data that passes through hardware like this."],
        ["Rack001.jpg", "A server rack", "Physical security such as locked rooms also protects servers."]
      ]
    }
  });

  GAME.explainMore({
    "Fetch-decode-execute cycle": [K.flow("Registers in the cycle", ["PC holds the|address of the|next instruction", "Address copied|to MAR", "Instruction|fetched into|MDR", "Copied to CIR|and decoded", "Execute: ALU|uses accumulator", "PC increases|by one"], [
      "Registers are tiny, very fast stores inside the CPU. Follow one instruction through them.",
      "The program counter (PC) holds the address of the next instruction.",
      "That address is copied to the memory address register (MAR).",
      "The instruction at that address is fetched into the memory data register (MDR).",
      "It is copied to the current instruction register (CIR) and decoded by the control unit.",
      "The ALU executes it, with results held in the accumulator.",
      "The PC is incremented and the cycle repeats."])],
    "CPU and memory": [K.flow("How cache speeds things up", ["CPU needs|some data", "Check the|cache first", "Hit: data found,|use it at once", "Miss: fetch from|RAM (slower)", "Copy it into|cache for next time"], [
      "Cache is a small amount of very fast memory close to the CPU.",
      "The CPU wants a piece of data.",
      "It checks the cache first.",
      "If the data is there (a hit) it is used immediately.",
      "If not (a miss) it must be fetched from slower RAM.",
      "The data is copied into the cache so the next request is fast."])],
    "CPU performance": [K.compare("What makes a CPU faster?", ["Factor", "Effect"], [
      ["Clock speed (GHz)", "More cycles per second"],
      ["More cores", "Several instructions at the same time"],
      ["Larger cache", "Fewer slow trips to RAM"],
      ["Better cooling", "Can run fast without overheating"]], [
      "Four things affect how quickly a computer completes tasks.",
      "A higher clock speed means more fetch-decode-execute cycles each second.",
      "More cores let the CPU do several jobs at once, if the software uses them.",
      "More cache keeps useful data close to the CPU.",
      "Good cooling stops the CPU slowing itself down to avoid damage."])],
    "Memory and storage types": [K.flow("Virtual memory", ["RAM is|nearly full", "OS moves idle|data to the|hard disk", "RAM space is|freed for the|active program", "Idle data is|needed again", "Swap back:|much slower"], [
      "When RAM fills up, the computer can borrow space from secondary storage.",
      "RAM is almost full.",
      "The operating system moves data that is not in use to a file on the disk.",
      "That frees RAM for the program you are using.",
      "If the moved data is needed again...",
      "...it must be copied back, which is far slower than RAM. Too much swapping makes a computer feel slow."])],
    "Storage and software": [
      K.flow("How a hard disk stores data", ["Platters|coated with|magnetic material", "Spindle spins|the platters", "Arm moves the|read-write head|over a track", "Head magnetises|areas to write", "Head senses the|patterns to read"], [
        "A magnetic hard disk stores data as tiny magnetised areas.",
        "The platters are coated with magnetic material.",
        "A motor spins them thousands of times a minute.",
        "An arm moves the read-write head to the correct track.",
        "To write, the head changes the magnetic direction of small areas.",
        "To read, it senses the pattern of those areas and turns it into 1s and 0s."]),
      K.flow("How an optical disc stores data", ["Surface has|pits and lands", "Laser shines|on the disc", "Lands reflect|the light", "Pits scatter|the light", "Sensor reads|1s and 0s"], [
        "CDs, DVDs and Blu-ray discs use lasers.",
        "Data is stored as a spiral track of tiny dents (pits) and flat areas (lands).",
        "A laser beam is shone on the track as the disc spins.",
        "Lands reflect the light back strongly.",
        "Pits scatter it so less light returns.",
        "A sensor detects the changes in reflected light and turns them into binary."])],
    "Boolean logic": [
      K.flow("Transistors make logic gates", ["A transistor is|a tiny electronic|switch", "Two in series|make an AND gate", "Two in parallel|make an OR gate", "One that inverts|makes a NOT gate", "Billions of gates|make a CPU"], [
        "Logic gates are built from transistors on a silicon chip.",
        "A transistor works like a switch controlled by electricity.",
        "Two switches in a row both need to be on: that is AND.",
        "Two switches side by side need only one on: that is OR.",
        "A transistor arranged to flip its input makes NOT.",
        "Modern CPUs combine billions of these gates."]),
      K.compare("A half adder: adding two bits", ["Inputs A, B", "Sum (XOR) and Carry (AND)"], [
        ["0 + 0", "Sum 0, carry 0"],
        ["0 + 1", "Sum 1, carry 0"],
        ["1 + 0", "Sum 1, carry 0"],
        ["1 + 1", "Sum 0, carry 1 (binary 10)"]], [
        "Adding two single bits shows how logic gates do arithmetic.",
        "0 + 0 gives 0.", "0 + 1 gives 1.", "1 + 0 gives 1.",
        "1 + 1 gives 10 in binary: sum 0 and a carry of 1. An XOR gate makes the sum and an AND gate makes the carry."])],
    "Binary and hexadecimal": [K.flow("Binary addition with a carry", ["0 1 0 1|(5)", "+ 0 0 1 1|(3)", "1 + 1 = 10:|write 0, carry 1", "Carry along|each column", "= 1 0 0 0|(8)"], [
      "Binary addition follows simple rules: 0+0=0, 0+1=1, 1+1=10.",
      "Add the first number, 0101 (5).",
      "To the second number, 0011 (3).",
      "Start at the right. 1 + 1 = 10, so write 0 and carry 1.",
      "Continue to the left, adding any carry.",
      "The answer is 1000, which is 8. If the answer needs more bits than are available, overflow occurs."])],
    "Networks and protocols": [
      K.layers("TCP/IP layers", ["Application: HTTP, SMTP, FTP", "Transport: TCP splits data into packets", "Internet: IP addresses and routing", "Link: Ethernet and Wi-Fi to the next device"], [
        "Network communication is organised into layers, each with its own job.",
        "The application layer holds the protocols you use, like HTTP for web pages.",
        "The transport layer (TCP) splits data into packets and checks they all arrive.",
        "The internet layer (IP) adds addresses so routers can send packets the right way.",
        "The link layer moves packets over the physical connection, such as Ethernet or Wi-Fi."], false),
      K.flow("What is inside a packet?", ["Header:|source and|destination IP", "Packet number|so they can be|put in order", "Payload:|part of the data", "Error check", "Reassembled|at destination"], [
        "A packet is a small chunk of a larger message.",
        "The header carries the sender's and receiver's IP addresses.",
        "A packet number lets the receiver reorder packets that arrive out of sequence.",
        "The payload is the actual piece of data.",
        "An error check lets the receiver spot damaged packets.",
        "At the destination TCP puts the packets back in order. Missing ones are requested again."])],
    "Network types and topologies": [K.compare("Star and mesh topologies", ["Star", "Mesh"], [
      ["Every device connects to a central switch", "Devices connect to several others"],
      ["One cable fails: only that device is lost", "Traffic can take another route"],
      ["If the switch fails, the network fails", "Very reliable, no single point of failure"],
      ["Cheaper and easy to expand", "Costly: lots of cabling and setup"]], [
      "Topology is the layout of a network.",
      "In a star network, all cables run to one switch.",
      "A broken cable only affects one device.",
      "But the central switch is a single point of failure.",
      "Mesh networks are costly but very resilient."])],
    "Images, sound and compression": [
      K.flow("Run length encoding (RLE)", ["Original:|AAAABBBCC", "Count each|run of the|same item", "Store the|count and the|item", "Encoded:|4A3B2C", "Lossless: it can|be restored exactly"], [
        "Run length encoding is a simple lossless compression method.",
        "Start with data that has repeated values, such as AAAABBBCC (9 characters).",
        "Count how many times each value repeats in a row.",
        "Write the count and the value.",
        "The result 4A3B2C needs only 6 characters.",
        "Nothing is lost, so decompression gives back exactly the original."]),
      K.compare("Lossy or lossless compression?", ["Lossless", "Lossy"], [
        ["No data is lost", "Some data is permanently removed"],
        ["Original can be restored exactly", "Original cannot be restored"],
        ["e.g. PNG, ZIP, FLAC", "e.g. JPEG, MP3"],
        ["Smaller reduction in size", "Much smaller files"]], [
        "Compression makes files smaller so they use less storage and download faster.",
        "Lossless keeps all the data.",
        "Lossy removes detail people are unlikely to notice.",
        "Choose by how important perfect quality is.",
        "Lossy gives the biggest savings but cannot be undone."])],
    "Searching and sorting": [K.flow("Merge sort: 4 2 7 1", ["Split into|4 2 and 7 1", "Split again:|4  2  7  1", "Merge pairs|in order:|2 4 and 1 7", "Merge the halves|in order", "Sorted:|1 2 4 7"], [
      "Merge sort uses divide and conquer.",
      "Split the list in half.",
      "Keep splitting until each list has one item.",
      "Merge pairs back together, putting each pair in order.",
      "Merge the sorted halves, always taking the smallest front item first.",
      "The final list is sorted. It is much faster than bubble sort on big lists."])],
    "Cyber security": [
      K.flow("A phishing attack", ["Fake email|pretends to be|your bank", "Urgent message|and a link", "You click and|enter your details", "Criminal steals|your login", "Defence: check|the sender, never|click, report"], [
        "Phishing is social engineering carried out by email or text.",
        "The attacker sends a message that looks like it is from a trusted company.",
        "It says something urgent to rush you into clicking.",
        "The link goes to a fake website that records your details.",
        "The criminal uses your login or steals your money.",
        "Check the sender and the link, never enter details from an email, and report it."]),
      K.flow("SQL injection", ["A login form|asks for a|username", "Attacker types|SQL code instead", "Server runs it|as a command", "Database data|is revealed", "Defence: validate|and use prepared|statements"], [
        "SQL injection attacks a website's database through its input boxes.",
        "A web form asks for a username.",
        "The attacker types SQL commands instead of a name.",
        "If the site does not check input, the database runs the command.",
        "Private data may be shown, changed or deleted.",
        "Validation and parameterised queries stop the code being treated as a command."])],
    "Operating systems and software": [K.timeline("Multitasking: sharing the CPU", [["0 ms", "Browser|runs"], ["10 ms", "Music app|runs"], ["20 ms", "Word processor|runs"], ["30 ms", "Browser|runs again"]], [
      "A CPU core can only run one process at a time, but the operating system switches very quickly.",
      "The browser runs for a tiny time slice.",
      "The OS switches to the music player.",
      "Then to the word processor.",
      "Then back round again. It happens so fast it feels as if everything runs at once."])],
    "Ethical, legal and environmental impacts": [K.compare("Key laws for computing", ["Law", "What it protects"], [
      ["Data Protection Act 2018 / UK GDPR", "Personal data: stored fairly and securely"],
      ["Computer Misuse Act 1990", "Makes hacking and unauthorised access illegal"],
      ["Copyright, Designs and Patents Act", "Creators' work from being copied illegally"]], [
      "Three laws every GCSE student should know.",
      "Data protection law gives people rights over their personal data.",
      "The Computer Misuse Act makes unauthorised access a crime.",
      "Copyright law protects software, music and films from illegal copying."])]
  });

  GAME.explain({
    "Inside a real computer": K.layers("What plugs into what", ["Case: holds and protects everything", "Power supply unit: mains to low voltage", "Motherboard: connects everything", "CPU and RAM: process and remember now", "Storage and expansion cards: remember for good, add features"], [
      "A desktop computer is built in layers around the motherboard.",
      "The case holds and protects the parts.",
      "The PSU converts mains electricity to the low voltages parts need.",
      "The motherboard is the main circuit board that every part connects to.",
      "The CPU and RAM plug straight in: the CPU processes instructions, RAM holds what is in use.",
      "Storage drives keep data permanently and expansion cards such as a graphics card add extra features."], false),
    "Input, output and peripherals": K.flow("Input, process, output", ["Input:|keyboard, mouse,|microphone, sensor", "Process:|CPU runs the|program", "Output:|screen, speaker,|printer, motor", "Storage:|saves the result"], [
      "Every computer system follows the same basic pattern.",
      "Input devices send data in.",
      "The CPU processes the data using a program.",
      "Output devices present the result.",
      "Storage keeps data so it can be used again. A thermostat is the same: a sensor is the input, a processor decides, and a heater is the output."])
  });
})();

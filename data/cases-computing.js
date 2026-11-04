/* More "How to?" cases for Computer Science */
(function () {
  var K = ANIM.kit, D = GAME.simDefs, G = GAME;
  G.howto([
    { id: "binarycount", sector: "How computers work", icon: "🔢", title: "How can a computer store everything using just 1s and 0s?", tags: "binary hexadecimal bits bytes data representation numbers text images",
      hook: "Photos, songs, messages and games all become patterns of on/off switches. Binary is the universal language that makes it possible.",
      scene: K.flow("From a number to switches", ["Decide the value|(e.g. 13)", "Write it in|place values", "8 4 2 1:|1 1 0 1", "Each bit is a|transistor on/off", "Computers combine|bits into bytes"], ["Start with a denary number.", "Binary uses powers of two.", "13 = 8 + 4 + 1.", "Electronic switches hold the bits.", "Eight bits make a byte."]),
      steps: ["A bit is a 1 or 0; a byte is 8 bits; 1 kilobyte = 1000 bytes.", "Text uses character codes such as ASCII (A = 65).", "Images use pixels and colour depth; sound uses samples.", "Hexadecimal is a shorthand: each digit is 4 bits.", "Binary shifts left multiply by 2; right divide by 2."],
      facts: ["8 bits = 1 byte", "ASCII: A = 65, a = 97", "Hex: A=10 … F=15"], sim: D.binary, lab: "binary",
      think: [["Convert 1011 to denary.", "8 + 2 + 1 = 11."], ["Why is hex used instead of binary by programmers?", "It is shorter and easier to read."]],
      units: ["Binary and hexadecimal", "Binary shifts and units"] },
    { id: "search", sector: "Algorithms", icon: "🔎", title: "How does a search engine find one page among billions in a blink?", tags: "searching algorithm binary search linear search sorted data speed efficiency",
      hook: "If you checked every web page one by one, you would wait for years. Smart algorithms halve the problem at each step, which is why sorted data is so valuable.",
      scene: K.flow("Binary search idea", ["Look at the|middle item", "Is it the target?", "If target is bigger,|search upper half", "If smaller,|search lower half", "Repeat until|found"], ["Pick the midpoint.", "Compare with the target.", "Discard the lower half.", "Or discard the upper half.", "Each step halves the list."]),
      steps: ["Linear search checks items one by one: simple, works on unsorted data.", "Binary search needs sorted data but halves the list each time.", "For 1 million items binary search needs at most about 20 steps.", "Real search engines use indexes: like the index of a book.", "Efficiency matters: algorithms are compared by how their time grows with the size of the data."],
      facts: ["Linear: up to n steps", "Binary: about log₂ n steps", "Binary search needs sorted data"], sim: D.searchviz, lab: "sortviz",
      think: [["How many steps could binary search need for 64 items?", "Up to 6 steps (2⁶ = 64)."], ["When is linear search better?", "When the list is small or unsorted."]],
      units: ["Searching algorithms", "Sorting algorithms"] },
    { id: "secretcode", sector: "Security", icon: "🔐", title: "How do secret messages and online banking stay private?", tags: "encryption caesar cipher key brute force https security cryptography",
      hook: "Julius Caesar shifted letters to hide military messages. Today the same idea, with huge keys and complex maths, protects passwords and payments.",
      scene: K.flow("Encryption in four steps", ["Plaintext:|the readable|message", "Algorithm + key|scramble it", "Ciphertext sent|across the network", "Receiver uses the|key to decrypt", "Original message|restored"], ["Start with a readable message.", "An algorithm and key encrypt it.", "Anyone intercepting sees nonsense.", "The key reverses the process.", "The receiver reads the message."]),
      steps: ["Caesar cipher: shift every letter by a fixed amount (the key).", "There are only 25 keys, so brute force or frequency analysis cracks it easily.", "Modern encryption uses long keys: guessing them would take millions of years.", "HTTPS uses encryption to protect data between your browser and a website.", "Strong security also needs good passwords, two-factor authentication and updates."],
      facts: ["Plaintext → ciphertext", "Brute force tries every key", "HTTPS = encrypted web traffic"], sim: D.caesar, lab: "caesar",
      think: [["Why is a longer key more secure?", "There are many more combinations to try."], ["Why must the key be kept secret?", "Anyone with the key can decrypt the message."]],
      units: ["Cyber security", "Threats and prevention"] },
    { id: "packets", sector: "Networks", icon: "📦", title: "How does a video call travel across the world in a fraction of a second?", tags: "packets routers internet protocols tcp ip bandwidth latency packet switching",
      hook: "Your call is chopped into thousands of tiny packets, each finding its own route through routers, then reassembled in order at the other end.",
      scene: K.flow("A message becomes packets", ["Message is split|into packets", "Each packet gets|a header", "Routers forward|packets", "Packets may take|different routes", "Reassembled in|the right order"], ["The data is divided into small pieces.", "The header holds addresses and the packet number.", "Routers read addresses and send them onward.", "Congestion makes routes vary.", "The destination reassembles them."]),
      steps: ["Protocols (TCP/IP, HTTP, HTTPS, FTP, SMTP) are agreed rules for communicating.", "TCP checks that packets arrive and asks for lost ones to be resent.", "Bandwidth is capacity; latency is delay.", "DNS translates domain names such as bbc.co.uk into IP addresses.", "Wi-Fi and Ethernet connect devices in a LAN; the internet joins many networks."],
      facts: ["IP address identifies a device", "Packet = header + payload", "DNS = internet phone book"], sim: D.packets, lab: "packets",
      think: [["Why are packets numbered?", "So they can be put back in order even if they arrive out of order."], ["What happens to a lost packet?", "It is detected and sent again."]],
      units: ["Networks and protocols", "Protocols and the internet"] }
  ]);
})();

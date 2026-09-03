// 3D Printing Legislation Tracker — data file (single source of truth).
// Every card renders from here. To update: edit the entry, bump `verified`,
// and add a line to `updateLog`. Dates are ISO (YYYY-MM-DD).

window.TRACKER_DATA = {
    updated: "2026-09-03",

    updateLog: [
        { date: "2026-09-03", text: "The Prop Problem got its own tab — why shape detection and prop blasters can't coexist. Also new on the Blocking Technology tab: what ASTM actually is." },
        { date: "2026-09-03", text: "Tracker launched. CA AB 2047 passed the legislature Aug 31 (60–18 concurrence) and is on Governor Newsom's desk — sign or veto by end of September." }
    ],

    // Impact levels: none | watch | caution | direct
    impactKeys: [
        { key: "newPrinters", label: "Buying a new printer" },
        { key: "usedSales", label: "Selling or buying used" },
        { key: "selfBuilt", label: "Building from parts (open source)" },
        { key: "offline", label: "Running printers offline" },
        { key: "business", label: "Running a print business" }
    ],

    bills: [
        {
            id: "ca-ab2047",
            region: "us",
            place: "California",
            billNo: "AB 2047",
            name: "Firearm Printing Prevention Act",
            status: "desk",
            statusLabel: "On the Governor's desk",
            deadline: { date: "2026-09-30", label: "Newsom signs or vetoes by" },
            steps: [
                { label: "Introduced", date: "2025", done: true },
                { label: "Passed Assembly", date: "May 2026", done: true },
                { label: "Amended (gutted)", date: "Aug 17, 2026", done: true },
                { label: "Passed both chambers", date: "Aug 31, 2026", done: true },
                { label: "Governor", date: "by Sep 30, 2026", done: false },
                { label: "Operative", date: "~2030 earliest, if ever", done: false }
            ],
            summary: "The bill our meetup has tracked all summer. As passed, it makes it unlawful to sell, offer, or transfer for consideration a 3D printer in California without “firearm blocking technology” — hardware or firmware that evaluates print files and refuses firearms, illegal parts, and machine-gun conversion devices. The catch: none of it operates unless ASTM International publishes a blocking-tech standard first.",
            details: [
                "Aug 31, 2026: Assembly concurred in Senate amendments 60–18 — the final legislative vote. Now with Governor Newsom.",
                "The version that passed is the narrowed “ASTM off-ramp” bill: the Senate stripped the DOJ-standards → attestation → approved-printer-list enforcement chain.",
                "Timeline if signed: from Jul 1, 2027 the CA DOJ checks quarterly whether ASTM has published a standard. If one appears: 24 months for state regulations, then sale restrictions one year later — roughly 2030 at the earliest.",
                "Self-sunset: if ASTM publishes nothing by Jul 1, 2029, the DOJ's obligation ends. No ASTM standard exists today and ASTM is under no obligation to write one.",
                "Exemptions include printers used exclusively for entertainment-industry props and developers testing blocking technology.",
                "Sponsor: Assemblymember Rebecca Bauer-Kahan. Opposition: Josef Průša, VORON Design, Make:, Joel Telling, EFF."
            ],
            impact: {
                newPrinters: { level: "watch", text: "No change today. If signed AND ASTM publishes a standard, new printers sold in CA would eventually (roughly 2030+) need blocking tech. Nothing before then." },
                usedSales: { level: "caution", text: "“Transfer for consideration” is not limited to manufacturers — once operative, a compliant-only rule could reach used-printer sales inside California. Our reading, not settled law." },
                selfBuilt: { level: "watch", text: "The mandate attaches to the sale of a 3D printer. Buying boards, steppers, and extrusions to build your own machine likely never passes through a regulated printer sale — but watch how DOJ regulations define “3D printer.”" },
                offline: { level: "none", text: "No possession or use restriction anywhere in the bill. Printers you own, online or offline, are untouched." },
                business: { level: "watch", text: "Printing services aren't regulated — the sale of printers is. A farm buying new machines in CA after the operative date would be buying compliant ones." }
            },
            actions: [
                { label: "Tell Governor Newsom your position (official contact form)", url: "https://www.gov.ca.gov/contact/" },
                { label: "Live status — CalMatters tracker", url: "https://calmatters.digitaldemocracy.org/bills/ca_202520260ab2047" }
            ],
            sources: [
                { label: "Full bill text (leginfo)", url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260AB2047" },
                { label: "CalMatters bill tracker", url: "https://calmatters.digitaldemocracy.org/bills/ca_202520260ab2047" },
                { label: "EFF: The Dangers of California's Legislation to Censor 3D Printing", url: "https://www.eff.org/deeplinks/2026/04/dangers-californias-legislation-censor-3d-printing" },
                { label: "Joel Telling's action hub", url: "https://www.the3dprintingnerd.com/ab2047" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "ny-s9005c",
            region: "us",
            place: "New York",
            billNo: "S.9005-C / A.10005-C (FY27 budget)",
            name: "3D printer safety standards mandate",
            status: "law",
            statusLabel: "Signed into law — May 27, 2026",
            steps: [
                { label: "Proposed (Hochul, State of the State)", date: "Jan 2026", done: true },
                { label: "Passed in budget", date: "May 2026", done: true },
                { label: "Signed", date: "May 27, 2026", done: true },
                { label: "Expert working group study", date: "underway", done: false },
                { label: "Printer-sale mandate", date: "2029 or later, if feasible", done: false }
            ],
            summary: "The first law of its kind in the nation, enacted inside New York's FY2026–27 budget. It directs an expert working group to develop standards for “firearm blueprint detection algorithms,” then requires 3D printers sold in New York to carry the technology — but only after rules are written, and only if the working group finds the tech actually works.",
            details: [
                "Detection concept: analyze every design submitted for printing, compare it against a digital library of firearm parts, reject matches.",
                "Sequence: working group reports → state rules written → printer-sale requirement takes effect one year after the rules. Earliest realistic bite: 2029.",
                "Feasibility clause: the working group can shelve the mandate if it determines the scanning technology doesn't work — which is what the 3D printing industry and EFF testified.",
                "Industry reaction: “It's not going to work. It's more of a political statement than anything else” — Bill Decker, Association of 3D Printing.",
                "Context: prosecutors cite a spike in 3D-printed gun cases in NYC, including the 2024 UnitedHealthcare CEO shooting."
            ],
            impact: {
                newPrinters: { level: "watch", text: "No change today. If the working group blesses the tech and rules get written, new printers sold in NY need it — 2029 at the very earliest." },
                usedSales: { level: "watch", text: "The mandate targets printers offered for sale in New York; how it treats private used sales depends on rules not yet written." },
                selfBuilt: { level: "watch", text: "Like CA, the hook is the sale of a printer — self-built machines from parts aren't the target, pending how rules define a 3D printer." },
                offline: { level: "none", text: "No possession or use restriction. Existing machines untouched." },
                business: { level: "watch", text: "Same as buying new: future purchases in NY would be compliant machines once (if) the mandate bites." }
            },
            actions: [
                { label: "Find your NY state legislators", url: "https://www.nysenate.gov/find-my-senator" }
            ],
            sources: [
                { label: "Gov. Hochul's proposal announcement", url: "https://www.governor.ny.gov/news/keeping-new-yorkers-safe-governor-hochul-announces-nation-leading-proposals-crack-down-3d" },
                { label: "PBS NewsHour coverage", url: "https://www.pbs.org/newshour/nation/first-of-its-kind-law-in-new-york-could-block-3d-printers-from-making-guns" },
                { label: "Consumer Rights Wiki summary", url: "https://consumerrights.wiki/w/New_York_3D_printer_blocking_technology_mandate" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "wa-hb2320",
            region: "us",
            place: "Washington",
            billNo: "HB 2320",
            name: "Ghost gun manufacture & blueprint law",
            status: "law",
            statusLabel: "Signed — in force since Jul 1, 2026",
            steps: [
                { label: "Introduced", date: "Jan 2026", done: true },
                { label: "Passed House", date: "Feb 16, 2026", done: true },
                { label: "Signed (Gov. Ferguson)", date: "Mar 24, 2026", done: true },
                { label: "In force", date: "Jul 1, 2026", done: true }
            ],
            summary: "Washington took a different road than CA/NY: instead of mandating blocking tech in printers, HB 2320 makes it illegal to USE a 3D printer or CNC machine to manufacture firearms and machine-gun conversion devices without proper licensing, and regulates the digital blueprints themselves. This is live law today.",
            details: [
                "Signed by Governor Bob Ferguson on March 24, 2026; effective July 1, 2026.",
                "Targets conduct (unlicensed fabrication) and files (gun blueprints), not printer hardware.",
                "The companion bill HB 2321 — the actual printer blocking-tech mandate — stalled. See its own card.",
                "For visitors in WA: printing anything that isn't a firearm or regulated part is untouched. The law is about making guns, not owning printers."
            ],
            impact: {
                newPrinters: { level: "none", text: "No printer-sale requirements in HB 2320. Buy whatever you want." },
                usedSales: { level: "none", text: "Not regulated by this law." },
                selfBuilt: { level: "none", text: "Building printers is untouched — the law is about fabricating firearms with them." },
                offline: { level: "none", text: "No connectivity or firmware requirements." },
                business: { level: "watch", text: "Print farms in WA should know the law exists: fabricating firearm parts for customers without licensing is now explicitly illegal." }
            },
            actions: [
                { label: "Find your WA legislators", url: "https://app.leg.wa.gov/DistrictFinder/" }
            ],
            sources: [
                { label: "House Bill Report (official PDF)", url: "https://lawfilesext.leg.wa.gov/biennium/2025-26/Pdf/Bill%20Reports/House/2320-S.E%20HBR%20APH%2026.pdf" },
                { label: "GeekWire coverage", url: "https://www.geekwire.com/2026/proposals-take-aim-at-3d-printing-tech-to-strengthen-washington-state-laws-against-ghost-guns/" },
                { label: "The Register analysis", url: "https://www.theregister.com/2026/02/05/ghost_gun_legislation_3d_printing/" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "wa-hb2321",
            region: "us",
            place: "Washington",
            billNo: "HB 2321",
            name: "Printer blocking-tech mandate (companion)",
            status: "stalled",
            statusLabel: "Stalled in the legislature",
            steps: [
                { label: "Introduced", date: "Jan 2026", done: true },
                { label: "Committee", date: "2026 session", done: true },
                { label: "Stalled", date: "did not advance", done: true }
            ],
            summary: "The half of Washington's package that looked like AB 2047: every 3D printer sold in the state would need “firearm blueprint detection algorithms” that automatically identify and reject firearm print jobs, with compliance verified by the Attorney General. It did not advance — but stalled bills in this space have a habit of coming back.",
            details: [
                "Would have applied to all 3D printers sold in Washington — the hardware-mandate model.",
                "Criticism mirrored CA/NY: the detection technology doesn't meaningfully exist, and false positives hit legitimate prints (Adafruit: “bad for STEM, bad for business, bad for open source”).",
                "Watch for reintroduction in the 2027 session, especially if Newsom signs AB 2047."
            ],
            impact: {
                newPrinters: { level: "none", text: "Stalled — no effect unless revived." },
                usedSales: { level: "none", text: "Stalled — no effect unless revived." },
                selfBuilt: { level: "none", text: "Stalled — no effect unless revived." },
                offline: { level: "none", text: "Stalled — but note: an on-device detection mandate is exactly the kind of rule that collides with offline printers. Reason to watch." },
                business: { level: "none", text: "Stalled — no effect unless revived." }
            },
            actions: [
                { label: "Find your WA legislators", url: "https://app.leg.wa.gov/DistrictFinder/" }
            ],
            sources: [
                { label: "Adafruit's critique", url: "https://blog.adafruit.com/2026/01/25/washingtons-3d-printing-bills-are-bad-for-stem-bad-for-business-and-bad-for-open-source-3d-printing/" },
                { label: "GeekWire coverage", url: "https://www.geekwire.com/2026/proposals-take-aim-at-3d-printing-tech-to-strengthen-washington-state-laws-against-ghost-guns/" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "nj-files",
            region: "us",
            place: "New Jersey",
            billNo: "2018 law + 2026 file-possession law",
            name: "Manufacture ban & digital file criminalization",
            status: "law",
            statusLabel: "In force — upheld by the Third Circuit",
            steps: [
                { label: "Manufacture + code distribution banned", date: "2018", done: true },
                { label: "SCI report flags file-possession gap", date: "2024", done: true },
                { label: "Possession of gun files criminalized", date: "2026", done: true },
                { label: "Third Circuit upholds file restrictions", date: "Apr 2026", done: true }
            ],
            summary: "The strictest state regime in the country — and the one that regulates FILES, not printers. Since 2018, unlicensed people can't 3D-print firearms or distribute the code; as of 2026, merely POSSESSING digital gun-print files without a license is a fourth-degree crime (up to 18 months, up to $10,000). A federal appeals court has now upheld the file-distribution restrictions.",
            details: [
                "2018: unlicensed manufacture of firearms/receivers/magazines via 3D printer banned; distributing printable-gun computer code restricted to licensed manufacturers.",
                "2026: possession of digital instructions to 3D-print firearms criminalized for unlicensed individuals — closing the gap the State Commission of Investigation flagged.",
                "April 2026: the Third Circuit declined to revisit its ruling that the Constitution does not bar states from restricting distribution of gun-printing files — a green light other states will read carefully.",
                "Why this matters beyond NJ: it's the template for regulating the digital side (files) rather than the hardware side (printers)."
            ],
            impact: {
                newPrinters: { level: "none", text: "No printer-sale requirements — NJ regulates guns and files, not machines." },
                usedSales: { level: "none", text: "Not regulated." },
                selfBuilt: { level: "none", text: "Building printers untouched." },
                offline: { level: "none", text: "No connectivity requirements." },
                business: { level: "caution", text: "In NJ, having firearm STL/step files on a work machine is itself a crime for the unlicensed — print businesses should have a clear no-firearms-files policy." }
            },
            actions: [
                { label: "Find your NJ legislators", url: "https://www.njleg.state.nj.us/district-map" }
            ],
            sources: [
                { label: "Giffords: NJ ghost gun laws", url: "https://giffords.org/lawcenter/state-laws/ghost-guns-in-new-jersey/" },
                { label: "Third Circuit ruling coverage", url: "https://jerseyvindicator.org/2026/04/26/third-circuit-wont-revisit-ruling-upholding-new-jersey-ghost-gun-file-restrictions/" },
                { label: "Everytown Law on the decision", url: "https://everytownlaw.org/in-groundbreaking-decision-third-circuit-finds-no-constitutional-barrier-to-regulating-distribution-of-computer-files-used-to-3d-print-firearms/" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "co-hb1144",
            region: "us",
            place: "Colorado",
            billNo: "HB26-1144",
            name: "3D-printed firearm manufacture ban",
            status: "law",
            statusLabel: "Enacted 2026",
            steps: [
                { label: "Introduced", date: "2026", done: true },
                { label: "Enacted", date: "2026", done: true }
            ],
            summary: "Colorado joined the conduct-regulation states in 2026: manufacturing a firearm, unfinished frame or receiver, large-capacity magazine, or rapid-fire device with a 3D printer or CNC machine without a federal firearms license is prohibited. Like Washington — and unlike CA/NY — it regulates what you make, not the printer you buy.",
            details: [
                "Follows the WA HB 2320 model: unlicensed fabrication of firearms via 3D printer/CNC is the offense.",
                "Part of a 2026 wave — Giffords counts Colorado, New Jersey, Maine, New York, Virginia and Washington all imposing new restrictions on unserialized weapons this year."
            ],
            impact: {
                newPrinters: { level: "none", text: "No printer-sale requirements." },
                usedSales: { level: "none", text: "Not regulated." },
                selfBuilt: { level: "none", text: "Building printers untouched." },
                offline: { level: "none", text: "No connectivity requirements." },
                business: { level: "watch", text: "Same as WA: fabricating firearm parts for customers without an FFL is now explicitly illegal in CO." }
            },
            actions: [
                { label: "Find your CO legislators", url: "https://leg.colorado.gov/find-my-legislator" }
            ],
            sources: [
                { label: "Bill page (Colorado General Assembly)", url: "https://leg.colorado.gov/bills/hb26-1144" },
                { label: "Giffords 2026 Trendwatch", url: "https://giffords.org/analysis/gun-law-trendwatch-states-are-moving-forward-in-2026/" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "us-states-wave",
            region: "us",
            place: "More US states",
            billNo: "ME HB 745 · VA HB 40 · +",
            name: "The serialization wave",
            status: "law",
            statusLabel: "Various — enacted 2026",
            steps: [
                { label: "16 states with ghost-gun laws", date: "and counting", done: true }
            ],
            summary: "Beyond the headline states, 2026 brought a wave of serialization laws: Maine (HB 745) and Virginia (HB 40) now require serial numbers on all firearms including homemade ones, with Virginia also banning ghost guns that escape federal regulation. At least 16 states now have some form of 3D-printed/ghost-gun law on the books — seven added major legislation in 2026 alone.",
            details: [
                "Serialization laws don't touch printers or printing — they require homemade firearms to be serialized like commercial ones.",
                "The trend to watch: whether blocking-tech mandates (CA/NY model) or conduct-and-files laws (WA/NJ model) become the dominant template for the next wave of states.",
                "We update this card as new states move — tell us what your state is doing at the meetup or on Discord."
            ],
            impact: {
                newPrinters: { level: "none", text: "Serialization laws don't regulate printer sales anywhere yet." },
                usedSales: { level: "none", text: "Not regulated." },
                selfBuilt: { level: "none", text: "Building printers untouched everywhere so far." },
                offline: { level: "none", text: "No state requires printer connectivity today." },
                business: { level: "watch", text: "Know your state: 16+ states regulate homemade firearms; a print business should know its local line." }
            },
            actions: [
                { label: "Everytown state-law map", url: "https://everytownresearch.org/rankings/law/ghost-guns-regulated/" },
                { label: "Find your state legislators (OpenStates)", url: "https://openstates.org/find_your_legislator/" }
            ],
            sources: [
                { label: "Giffords 2026 Trendwatch", url: "https://giffords.org/analysis/gun-law-trendwatch-states-are-moving-forward-in-2026/" },
                { label: "News From The States roundup", url: "https://www.newsfromthestates.com/article/more-states-restrict-3d-printed-firearms" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "us-federal",
            region: "federal",
            place: "United States — federal",
            billNo: "UFA · GCA · H.R.4143",
            name: "The federal baseline",
            status: "law",
            statusLabel: "Standing law + one proposed bill",
            deadline: { date: "2031-03-08", label: "Undetectable Firearms Act sunsets" },
            steps: [
                { label: "Gun Control Act", date: "1968", done: true },
                { label: "Undetectable Firearms Act", date: "1988", done: true },
                { label: "ATF frame/receiver rule upheld (VanDerStok)", date: "Mar 2025", done: true },
                { label: "3D Printed Gun Safety Act (H.R.4143)", date: "proposed", done: false }
            ],
            summary: "Why states are acting alone: federal law already covers 3D-printed guns the same as any other manufacturing method, but there is NO federal rule about 3D printers themselves. Making a firearm at home for personal use is federally legal (if it's detectable and not for sale) — which is exactly the space state laws are moving into.",
            details: [
                "Undetectable Firearms Act (1988): any firearm must contain enough metal to trip standard detectors — all-plastic guns are federally illegal. Congress last renewed it to March 8, 2031.",
                "Home manufacture for personal use is legal under federal law; manufacturing for sale requires a license.",
                "March 2025: the Supreme Court (Bondi v. VanDerStok) upheld the ATF rule treating ghost-gun kits and unfinished frames as firearms — kits now need serial numbers and background checks.",
                "H.R.4143, the 3D Printed Gun Safety Act of 2025, would ban distributing digital firearm-printing files online. Proposed; not law.",
                "No federal blocking-technology mandate exists or is pending — the CA/NY model is state-only today."
            ],
            impact: {
                newPrinters: { level: "none", text: "No federal printer regulation of any kind." },
                usedSales: { level: "none", text: "Not regulated federally." },
                selfBuilt: { level: "none", text: "Building printers is untouched; building GUNS at home is legal federally only if detectable and for personal use — state law may say otherwise." },
                offline: { level: "none", text: "No federal connectivity requirements." },
                business: { level: "watch", text: "Manufacturing firearms or regulated parts for customers requires an FFL — that's long-standing federal law, 3D printer or not." }
            },
            actions: [
                { label: "Find your representative", url: "https://www.house.gov/representatives/find-your-representative" },
                { label: "Find your senators", url: "https://www.senate.gov/senators/senators-contact.htm" }
            ],
            sources: [
                { label: "H.R.4143 text (Congress.gov)", url: "https://www.congress.gov/bill/119th-congress/house-bill/4143/text" },
                { label: "NSSF explainer", url: "https://www.nssf.org/government-relations/factsheets/ghost-guns-undetectable-firearms-explained-2/" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "uk",
            region: "global",
            place: "United Kingdom",
            billNo: "Border Security Act 2025 · Firearms (3D Printing) Bill",
            name: "Manufacture ban + template possession offence",
            status: "law",
            statusLabel: "Manufacture illegal; template offence incoming",
            steps: [
                { label: "3D-printing firearms = illegal manufacture", date: "long-standing", done: true },
                { label: "Border Security, Asylum and Immigration Act", date: "2025", done: true },
                { label: "Template possession/supply offence in force", date: "pending commencement", done: false },
                { label: "Firearms (3D Printing) Bill", date: "in Parliament", done: false }
            ],
            summary: "The UK already treats 3D-printing a firearm or its components as illegal manufacture under existing firearms law. The 2025 Border Security Act goes further: possessing or supplying TEMPLATES (print files) for 3D-printed firearms becomes an offence when the provision is commenced. A dedicated Firearms (3D Printing) Bill is also before Parliament.",
            details: [
                "Manufacture: prohibited under UK firearms legislation — no license path for individuals.",
                "Files: the 2025 Act's template offence follows the NJ/Australia model — the file itself becomes contraband.",
                "Printers: no UK law regulates 3D printers or mandates blocking technology."
            ],
            impact: {
                newPrinters: { level: "none", text: "No printer regulation in the UK." },
                usedSales: { level: "none", text: "Not regulated." },
                selfBuilt: { level: "none", text: "Building printers untouched." },
                offline: { level: "none", text: "No connectivity requirements." },
                business: { level: "caution", text: "UK members/readers: firearm files on hand will soon be an offence in themselves — stricter than most US states." }
            },
            actions: [
                { label: "Track the Firearms (3D Printing) Bill", url: "https://bills.parliament.uk/bills/3877" }
            ],
            sources: [
                { label: "UK Parliament written answer (Jan 2026)", url: "https://questions-statements.parliament.uk/written-questions/detail/2026-01-07/103952/" },
                { label: "Bill page (Parliament)", url: "https://bills.parliament.uk/bills/3877" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "australia",
            region: "global",
            place: "Australia",
            billNo: "NSW s51F · SA (2026) · ACT (proposed)",
            name: "Blueprint possession offences",
            status: "law",
            statusLabel: "In force (NSW, SA); spreading",
            steps: [
                { label: "NSW: possessing gun-print files an offence", date: "2015", done: true },
                { label: "South Australia offence in force", date: "Feb 19, 2026", done: true },
                { label: "ACT amendment proposed", date: "2026", done: false }
            ],
            summary: "Australia pioneered the file-possession model a decade before the US: New South Wales made it an offence to possess digital blueprints for 3D-printing firearms back in 2015. South Australia's equivalent came into force February 19, 2026, and the ACT has a bill pending. Manufacture without a license was already criminal nationwide.",
            details: [
                "The Australian model targets files and manufacture, not printers — no blocking-tech mandates anywhere.",
                "Global precedent note: the first-ever criminal conviction for 3D-printed guns was Japan, 2014 (Yoshitomo Imura) — possession of functional printed firearms.",
                "Listed defences/exemptions exist in the SA law (e.g., authorized persons)."
            ],
            impact: {
                newPrinters: { level: "none", text: "No printer regulation." },
                usedSales: { level: "none", text: "Not regulated." },
                selfBuilt: { level: "none", text: "Building printers untouched." },
                offline: { level: "none", text: "No connectivity requirements." },
                business: { level: "caution", text: "In NSW/SA, firearm print files themselves are contraband — the strictest file rules in the English-speaking world alongside NJ and the UK." }
            },
            actions: [],
            sources: [
                { label: "Global legislation overview (Fabbaloo)", url: "https://www.fabbaloo.com/news/global-patchwork-of-3d-printing-legislation-could-stall-technology-progress" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "canada",
            region: "global",
            place: "Canada",
            billNo: "Bill C-21",
            name: "Blueprint distribution offences",
            status: "law",
            statusLabel: "Enacted (2023 firearms package)",
            steps: [
                { label: "Bill C-21 passed", date: "2023", done: true }
            ],
            summary: "Canada's C-21 firearms package created offences around possessing and distributing digital blueprints and computer data for manufacturing firearms or prohibited devices, when for the purpose of manufacturing or trafficking. Manufacture without a license was already criminal.",
            details: [
                "The offence attaches to intent (manufacturing/trafficking purposes) — narrower than the NJ/NSW flat possession bans.",
                "No printer regulation or blocking-tech mandate."
            ],
            impact: {
                newPrinters: { level: "none", text: "No printer regulation." },
                usedSales: { level: "none", text: "Not regulated." },
                selfBuilt: { level: "none", text: "Building printers untouched." },
                offline: { level: "none", text: "No connectivity requirements." },
                business: { level: "watch", text: "Firearm files + intent = offence; a no-firearms-files policy is the safe line for Canadian print businesses." }
            },
            actions: [],
            sources: [
                { label: "Global legislation overview (Fabbaloo)", url: "https://www.fabbaloo.com/news/global-patchwork-of-3d-printing-legislation-could-stall-technology-progress" }
            ],
            verified: "2026-09-03"
        },
        {
            id: "eu",
            region: "global",
            place: "European Union",
            billNo: "Directive 2021/555, Art. 17",
            name: "The regulatory gap",
            status: "proposed",
            statusLabel: "Gap acknowledged — measures anticipated",
            steps: [
                { label: "Firearms Directive recast", date: "2021", done: true },
                { label: "Art. 17 review / ghost-gun measures", date: "anticipated 2025–2026", done: false }
            ],
            summary: "Europe currently has a legal gap: firearm blueprints circulate online across jurisdictions, and member-state laws are inconsistent. EU-level measures on ghost guns and printable-firearm files are anticipated under Article 17 of the 2021 Firearms Directive — the space to watch for anyone in Europe.",
            details: [
                "Individual member states prosecute manufacture under national firearms law; the file question is where EU-wide rules are expected.",
                "No blocking-tech mandate proposed at EU level.",
                "We'll expand this card as EU measures actually appear — European readers, send us what your country is doing."
            ],
            impact: {
                newPrinters: { level: "none", text: "No EU printer regulation." },
                usedSales: { level: "none", text: "Not regulated at EU level." },
                selfBuilt: { level: "none", text: "Untouched." },
                offline: { level: "none", text: "No requirements." },
                business: { level: "watch", text: "Watch national law — the EU baseline is coming but member states differ today." }
            },
            actions: [],
            sources: [
                { label: "European Relations: Ghost Guns & Europe's Legal Blind Spots", url: "https://europeanrelations.com/phantom-firepower-ghost-guns-europes-legal-blind-spots/" },
                { label: "Global legislation overview (Fabbaloo)", url: "https://www.fabbaloo.com/news/global-patchwork-of-3d-printing-legislation-could-stall-technology-progress" }
            ],
            verified: "2026-09-03"
        }
    ],

    blockingTech: {
        intro: "Three states now name “firearm blocking technology” or “blueprint detection algorithms” in law — California (if signed), New York, and Washington's stalled HB 2321. None of them define how it should work, because the honest answer is: nothing deployed today does what the laws describe. Here is what actually exists, every approach on the table, and where each one breaks.",
        products: [
            {
                name: "Create it REAL — firmware detection",
                since: "Denmark, ~2013",
                how: "A check at the firmware/processor level, described by the company as working “a bit like an antivirus.” The model about to be printed is compared against a database of firearm-part CHARACTERISTICS — signatures, not actual gun files (they deliberately refuse to ship a library of gun models). On a match, the print job is refused.",
                reality: "Over a decade old and still not deployed on any mainstream consumer printer. Sold as an opt-in feature for schools and libraries — a parental-control tool, not a mandate-grade gatekeeper."
            },
            {
                name: "Print&Go “3D GUN'T” — file scanning",
                since: "Spain, 2024",
                how: "Software that scans incoming CAD/STL files — whether sent over a network or loaded from USB — against a database of known firearm components, and blocks matches before slicing.",
                reality: "A fleet/farm-management product for print services, not printer firmware. Database-driven, so it inherits every database-matching weakness below."
            }
        ],
        approaches: [
            {
                name: "Database / signature matching",
                how: "Compare the incoming model (its hash, geometry signature, or feature set) against a library of known firearm parts. This is what both shipping products do.",
                strengths: "Cheap to run; near-zero false positives on unmodified known files; the only approach actually deployed anywhere.",
                fails: "Only catches KNOWN files. Scale the model 3%, split the receiver into two pieces, merge it with a bracket, or design something new — the signature misses. The database also needs constant updates, which an offline printer never receives."
            },
            {
                name: "ML shape classification",
                how: "Train a machine-learning model to recognize “firearm-like” geometry — receivers, fire-control cavities, barrel profiles — rather than matching specific files.",
                strengths: "Catches novel and modified designs that database matching misses; this is what the research literature focuses on.",
                fails: "False positives are the killer: cosplay props, airsoft parts, replicas, toys, and mechanically similar parts (tubes, springs, sears) are exactly what our community prints. A classifier strict enough to matter blocks legitimate work constantly; one loose enough to be usable is trivially evaded. And it must run on a printer's microcontroller — or the mandate implies a cloud check that offline printers can't make."
            },
            {
                name: "Locked firmware + signed toolchains",
                how: "Not a detection method — the enforcement wrapper the other approaches require. The printer only runs manufacturer-signed firmware, so the detection layer can't be removed; possibly only accepts g-code from approved slicers.",
                strengths: "The only way a detection mandate survives contact with users who can flash firmware.",
                fails: "This is the open-source collision: a printer that must refuse unsigned firmware is a printer that can never run Klipper, Marlin, or anything you compiled yourself. It's the Bambu-style lock-in debate with legal force behind it. And it does nothing about the millions of printers already in the field."
            },
            {
                name: "Forensic watermarking / traceability",
                how: "Not blocking at all: identify prints after the fact. Research shows a printer's hot-end and bed leave unique micro-patterns — ballistics-style matching of a printed part back to a specific machine. Proposals also exist for deliberate embedded watermarks.",
                strengths: "Doesn't restrict anyone's printing; useful to investigators; no false-positive problem.",
                fails: "Deters nothing up front; deliberate watermarks are removed by sanding or defeated by swapping a $15 nozzle. Incidental fingerprints require having the suspect machine."
            }
        ],
        astm: {
            title: "What is ASTM, actually?",
            paras: [
                "California's whole law hangs on four letters, so it's worth knowing what they mean. ASTM International — it started in 1898 as the American Society for Testing and Materials — is one of the world's largest voluntary standards bodies. It is not a government agency. Nobody elected it, and it can't compel anyone to do anything.",
                "What it does is build technical consensus. Engineers, companies, academics, and regulators sit on committees and vote standards into existence — more than 12,000 of them so far, covering the steel in bridges, the plastic in toys, and the flammability of your mattress. It even has a committee dedicated to 3D printing: F42, which writes the standards for additive manufacturing materials and processes.",
                "Two things follow from how ASTM works. Standards take years, because committee consensus is slow by design. And ASTM only writes a standard when its members want one — it takes requests, not orders. AB 2047 handed the feasibility question to a body that answers to industry consensus, has never shown interest in a firearm-blocking standard, and is free to ignore the assignment forever. The bill's 2029 sunset clause reads like the drafters knew it."
            ]
        },
        propProblem: {
            title: "The Prop Problem",
            intro: "A lot of our members print Star Wars and Star Trek props. That makes this the false-positive question that matters most to us, so here it is in full.",
            paras: [
                "Start with the awkward fact: many famous movie blasters ARE real firearms wearing greebles. Han Solo's DL-44 is a Mauser C96 with a scope and a flash hider. The stormtrooper E-11 is a Sterling submachine gun. Boba Fett's EE-3 is a Webley flare gun. A detector that flags anything C96-shaped cannot tell your screen-accurate prop from the real thing, because at the silhouette level there is no difference to tell.",
                "And it doesn't stop at props. Members of our own meetup have run everyday part files against AI shape classifiers, and the results match what the industry testified: the false flags are endless. A replacement trigger handle for a garden hose sprayer reads as a trigger. A hollow cylinder — which describes half of all functional prints — reads as a barrel. Springs, sears, tubes, grips: ordinary mechanical geometry keeps tripping the alarm, because guns are made of ordinary mechanical geometry.",
                "There's one distinction working in our favor. A detector keyed on FUNCTION — fire-control cavities, receiver internals, the parts that make a gun a gun — would pass a solid decorative prop, since props have no working internals. A detector keyed on SHAPE flags everything on your cosplay shelf. Which kind the law means is exactly what no standard has defined, and none of these bills includes an appeal button for a wrongly blocked print.",
                "One more time for clarity: printing a prop is not a crime under any law on this tracker, and nothing pending would change that. The prop problem is a censorship-by-algorithm problem — your lawful print refused by a machine you own, with nobody to complain to. If you ever write to a lawmaker about this issue, the prop on your shelf is the most persuasive exhibit you have."
            ]
        },
        collision: [
            "Open firmware: every detection mandate implicitly requires locked firmware to be enforceable — and locked firmware is the end of Klipper/Marlin on compliant machines. The block and the freedom to modify cannot both hold.",
            "Offline printers: our machines sit in garages and basements without Wi-Fi. Any screening must therefore run entirely on-device with a frozen database — stale the day it ships — or the law quietly assumes connectivity that doesn't exist.",
            "Legitimate gun-shaped printing: cosplay props, airsoft, replicas, film/theater work. California's bill even carves out entertainment-industry props — an admission that the detector can't tell a prop from a weapon.",
            "The installed base: no mandate touches the millions of printers already sold. A determined bad actor uses an old machine; the compliance cost lands on future lawful buyers."
        ],
        standards: [
            "ASTM International (California's chosen body): no firearm-blocking standard exists, none is announced, and ASTM is under no obligation to write one. AB 2047 sunsets itself if nothing appears by July 1, 2029.",
            "New York's expert working group: established by the May 2026 law; it can shelve the state's mandate entirely if it finds the technology infeasible.",
            "Watch both — an ASTM standard appearing (or the NY group blessing an approach) is the single event that would turn these laws from conditional to real."
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const keyboard = document.querySelector('.key-container')
    const keys = [
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
        'A',
        'S',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'ENTER',
        'Z',
        'X',
        'C',
        'V',
        'B',
        'N',
        'M',
        'New Letter',
        '←',
        '↑',
        '↓',
        '→'
    ]

    const handleClick = (letter) => {
        console.log('clicked', letter)
        if (letter == 'New Letter'){
            generate();
        }
        if(letter == '←'){
            moveLeft();
            checkBoard();
        }
        if(letter == '↑'){
            moveUp(); 
            checkBoard(); 
        }
        if(letter == '↓'){
            moveDown();
            checkBoard();  
        }
        if(letter == '→'){
            moveRight(); 
            checkBoard(); 
        }
        if(letter != 'New Letter' && letter != '←' && letter != '↑' && letter != '↓' && letter != '→' ){ 
           checkLetter(letter);
           checkBoard();
        }
    } 

const width = 5
const height = 6
let squares = []
const wordList = [
    "ABOUT","ABOVE","AFTER","AGAIN","ALONE","APPLE","BEACH","BEGIN","BLACK","BRING",
    "BROWN","BUNNY","CAMEL","CANDY","CARRY","CHILD","CLEAN","CLOSE","COUNT","DADDY",
    "DREAM","DRESS","DRIVE","EIGHT","EVERY","FIGHT","FLOOR","FOUND","GHOST","GOOSE",
    "GREAT","GREEN","HAPPY","HEARD","HEART","HIPPO","HORSE","HOUSE","INDIA","JUICE",
    "KOALA","LARGE","LIGHT","LUCKY","MOMMY","MONEY","MOOSE","MOUSE","MUMMY","MUSIC",
    "NEVER","NURSE","PANDA","PAPER","PARTY","PIZZA","PLANE","PLANT","PLATE","PRICE",
    "PUPPY","QUACK","QUEEN","QUIET","RIGHT","RIVER","ROBIN","ROBOT","ROUND","SEVEN",
    "SHEEP","SKUNK","SLEEP","SMALL","SPOON","STAMP","STAND","STICK","STORE","STORY",
    "TODAY","TRAIN","TRUCK","TUMMY","UNDER","WATER","WHITE","WITCH","WOMAN","ABUSE",
    "ANKLE","ANNOY","APPLY","ARGUE","AROMA","ARROW","ASKED","ASKER","ATOMS","ALPHA",
    "ALTAR","ALTER","AMAZE","AMBER","AMPLE","ANGEL","ANGER","ANGLE","AVOID","AWAKE",
    "AWARD","AWARE","AWFUL","BAKED","BAKER","BAKES","BALLS","BANGS","BANJO","BANKS",
    "BARES","BARFS","BARKS","BARNS","BASIC","BASIL","BASIN","BASIS","BATCH","BATHS",
    "BEADS","BEADY","BEAKS","BEAKY","BEANS","BEARD","BEARS","BEAST","BEATS","BEEFY",
    "BEEPS","BEGAN","BEGUN","BEIGE","BEING","BELLS","BELLY","BELOW","BELTS","BENCH",
    "BENDS","BENDY","BERRY","BIBLE","BIKER","BIKES","BIMBO","BINGE","BINGO","BIRTH",
    "BITER","BLADE","BLAME","BLAND","BLANK","BLAST","BLEAK","BLEED","BLEEP","BLEND",
    "BLESS","BLIND","BLING","BLINK","BLIPS","BLISS","BLOAT","BLOBS","BLOGS","ANGRY",
    "BLOKE","BLOND","BLOOD","BLOWS","BLURS","BLURT","BLUSH","BOARD","BOARS","BOAST",
    "BOATS","BOGGY","BOGUS","BOLTS","BONDS","BONES","BONEY","BONGO","BOOED","BOOKS",
    "BOOST","BOOTH","BOOTS","BOOTY","BORED","BOTCH","BOWEL","BOWLS","BOXER","BOXES",
    "BRAVE","BRAVO","BRAWL","BRAWN","BRIBE","BRICK","BRIDE","BRIEF","BRINE","BRINK",
    "BROOM","BRUSH","BUCKS","BUDDY","BUGGY","BULBS","BULGE","BULKS","BULKY","BULLS",
    "BULLY","BUMPY","BUNKS","BURNT","BURPS","BURST","BUSHY","BUSTS","BUSTY","BUTCH",
    "BUYER","BUZZY","CABIN","CABLE","CACTI","CADDY","CAGED","CAGER","CAGES","CAGEY",
    "CAKED","CAKES","CAKEY","CALFS","CALLS","CALMS","CAMPS","CANAL","CANED","CANES",
    "CARAT","CARBS","CARDS","CARED","CARER","CARES","CARGO","CARTS","CARVE","CASED",
    "CASES","CASTS","CATCH","CATER","CATTY","CENTS","CHAMP","CHARM","CHASE","CHATS",
    "CHEAP","CHEAT","CHECK","CHEEK","CHEEP","CHEER","CHEFS","CHESS","CHEST","CHEWS",
    "CHEWY","CHICK","CHIEF","CHILL","CHIMP","CHINA","CHINS","CHIPS","CHIRP","CHOIR",
    "CHOKE","CHOMP","CHOPS","CHORD","CHORE","CHOSE","CIDER","CIVIL","CLAIM","CLAMP",
    "CLAMS","CLANS","CLAPS","CLAWS","CLAYS","CLEAR","CLIFF","CLIMB","CLING","CLIPS",
    "CLOAK","CLOCK","CLOGS","ACHOO","ACIDY","ACORN","ACTED","WOMEN","WRITE","ZEBRA",
    "ACTOR","ADDED","ADOPT","ADORE","ADULT","AGONY","AGREE","AIRED","ALIVE","ALONG",
    "CLONE","CLOTH","CLOTS","CLOUD","CLOVE","CLOWN","CLUBS","CLUCK","CLUED","CLUES",
    "CLUMP","CLUNG","COACH","COALS","COAST","COATS","COBRA","COCKY","COCOA","CODED",
    "CODER","CODES","COINS","COLDS","COMBO","COMBS","COMES","COMET","COMFY","COMIC",
    "CONES","COPER","COPES","CORKS","CORNS","CORNY","CRAFT","CRAMP","CRAMS","CRANE",
    "CRANK","CRAWL","CRAZY","CREAM","CREEK","CREEP","CREWS","CRIBS","CRIED","CRIER",
    "CRIES","CRIME","CRIMP","CRISP","CROOK","CROPS","CROSS","CROWD","CROWN","CROWS",
    "CRUEL","CRUMB","CRUSH","CRUST","CUBED","CUBES","CUBIC","CUMIN","CUPID","CUPPA",
    "CUPPY","CURBS","CURDS","CURED","CURER","CURES","CURLS","CURLY","CURRY","CURSE",
    "CURVE","CURVY","CUTIE","CYBER","CYCLE","DAILY","DAIRY","DAISY","DAMES","DAMPS",
    "DANCE","DANDY","DARED","DARER","DARES","DARTS","DATED","DATER","DATES","DAZED",
    "DAZES","DEALS","DEALT","DEATH","DEBIT","DEBTS","DEBUG","DEBUT","DECAY","DECKS",
    "DECOR","DECOY","DECRY","DEEDS","DELAY","DELTA","DEMON","DEMOS","DENIM","DENSE",
    "DENTS","DEPOT","DEPTH","DERBY","DESKS","DETER","DETOX","DEVIL","DEVON","DIALS",
    "DIARY","DICED","DINED","DINER","DINES","DINGO","DINGY","DINKY","DIRTY","DISCO",
    "DISCS","DISHY","DISKS","DIVAS","DIVED","DIVER","DIVES","DOCKS","DODGE","DODGY",
    "DOGGY","DOILY","DOING","DOJOS","DOLLS","DOLLY","DOPED","DOPER","DOPES","DOPEY",
    "DORKS","DORKY","DOTTY","DOUBT","DOUGH","DOZES","DRAFT","DRANK","DRAPE","DREAD",
    "DRIED","DRIER","DRIES","DRIFT","DRILL","DRINK","DRIPS","DROID","DROPS","DUDES",
    "DUKED","DUMBO","DUMMY","DUMPS","DUMPY","DUNKS","DUSTY","DUTCH","DUVET","DWARF",
    "DWEEB","DWELL","DYING","EAGER","EAGLE","EARLS","EARTH","EASED","EASES","EASLE",
    "EASTS","EATEN","EATER","EBONY","EBOOK","EDGES","EDITS","EGGED","ELBOW","ELDER",
    "ELITE","ELVES","EMBED","EMITS","EMPTY","ENDED","ENDER","ENEMY","ENJOY","ENTER",
    "EQUAL","EQUIP","ERASE","ERODE","ERROR","ERUPT","ESSAY","EXAMS","EXCEL","EXIST",
    "EXITS","EXTRA","FABLE","FACED","FACES","FACTS","FADED","FADES","FAILS","FAINT",
    "FAIRS","FAIRY","FAITH","FAKED","FAKER","FAKES","FALLS","FALSE","FAMED","FAMES",
    "FANCY","FANGS","FARED","FARER","FARES","FARMS","FARTS","FATAL","FATED","FATES",
    "FATLY","FATSO","FATTY","FAULT","FAXES","FAYRE","FEAST","FEATS","FECAL","FEELS",
    "FELON","FELTS","FENCE","FENDS","FERAL","FERRY","FETCH","FIBER","FIBRE","FIELD",
    "FIEND","FIERY","FIFTH","FIFTY","FILED","FILER","FILES","FILMS","FILTH","FINAL",
    "FINDS","FINED","FINER","FINES","FIRED","FIRES","FIRMS","FIRST","FISHY","FISTS",
    "FISTY","FIVER","FIVES","FIXED","FIXER","FIXES","FIZZY","FLAIR","FLAKE","FLAME",
    "FLAPS","FLARE","FLASH","FLASK","FLATS","FLEAS","FLESH","FLICK","FLING","FLINT",
    "FLIPS","FLIRT","FLOAT","FLOCK","FLOOD","FLOPS","FLORA","FLOSS","FLOUR","FLUFF",
    "FLUID","FLUKE","FLUNG","FLUNK","FLUSH","FLUTE","FOAMS","FOAMY","FOCAL","FOCUS",
    "FOGGY","FOLDS","FOLKS","FONTS","FOODS","FOOLS","FOOTY","FORGE","FORKS","FORMS",
    "FORTS","FORTY","FORUM","FOWLS","FRAME","FRANK","FRAUD","FREAK","FREED","FREER",
    "FREES","FRESH","FRETS","FRIAR","FRIED","FRIER","FRIES","FRISK","FROGS","FRONT",
    "FROST","FROTH","FROWN","FROZE","FRUIT","FUDGE","FUELS","FULLY","FUMED","FUMER",
    "FUMES","FUNKY","FUNNY","FUSED","FUZZY","GABBY","GAINS","GAMED","GAMER","GAMES",
    "GAMMA","GANGS","GAPED","GASPS","GATES","GAUZE","GAWPS","GAZED","GAZES","GEARS",
    "GEEKS","GEEKY","GEESE","GENES","GENIE","GENRE","GENTS","GERMS","GERMY","GETUP",
    "GHOUL","GIANT","GIFTS","GIRLS","GIRLY","GIRTH","GIVEN","GIVER","GIVES","GLAND",
    "GLARE","GLARY","GLASS","GLAZE","GLOAT","GLOBE","GLORY","GLOSS","GLOVE","GLOWS",
    "GLUED","GLUER","GLUES","GLUEY","GNOME","GOATS","GOBBY","GODLY","GOING","GOLDS",
    "GOLDY","GOLFS","GOLLY","GONGS","GOODS","GOODY","GOOEY","GOOFS","GOOFY","GOTHS",
    "GOTTA","GOWNS","GRABS","GRACE","GRADE","GRAFT","GRAIN","GRAND","GRANS","GRANT",
    "GRAPE","GRAPH","GRASP","GRASS","GRATE","GRAVE","GRAVY","GRAZE","GREED","GREEK",
    "GREET","GRIFT","GRILL","GRIME","GRIND","GRINS","GRIPE","GRIPS","GRITS","GROAN",
    "GROIN","GROOM","GROPE","GROSS","GROUP","GROWL","GROWN","GROWS","GRUBS","GRUNT",
    "GUESS","GUEST","GUIDE","GUILT","GULPS","GULPY","GUMMY","GUNKY","GUSHY","GUSTS",
    "GUSTY","GUTSY","GYPSY","HABIT","HACKS","HAILS","HAIRS","HAIRY","HALAL","HALTS",
    "HALVE","HANDS","HANDY","HARDY","HARPS","HARSH","HASTE","HASTY","HATCH","HATED",
    "HATER","HATES","HAUNT","HAVEN","HAVOC","HAWKS","HEADS","HEADY","HEALS","HEAPS",
    "HEARS","HEATS","HEAVE","HEAVY","HEDGE","HEEDS","HEELS","HEFTY","HEIST","HELLO",
    "HERBS","HERBY","HERDS","HIDER","HIDES","HIKED","HIKER","HIKES","HILLS","HILLY",
    "HINGE","HINTS","HIPPY","HIRED","HIREE","HIRER","HIRES","HISSY","HITCH","HOBBY",
    "HOIST","HOLDS","HOLED","HOLES","HOLEY","HOMES","HOMEY","HOMIE","HONKS","HOOCH",
    "HOODS","HOODY","HOOKS","HOOTS","HOPED","HOPER","HOPES","HOPPY","HORAH","HORNS",
    "HOSED","HOSES","HOSTS","HOTEL","HOTLY","HOTTY","HOUND","HOURS","HOVER","HOWDY",
    "HOWLS","HUBBY","HUFFS","HUFFY","HUGGY","HULKY","HUMAN","HUMID","HUMPS","HUNTS",
    "HURRY","HURTS","HUSKS","HYPED","HYPER","HYPES","ICING","ICONS","IDEAL","IDEAS",
    "IDIOM","IDIOT","IDOLS","IMAGE","IMPLY","INDEX","INDIE","INKED","INLAY","INLET",
    "INPUT","INSET","INTEL","INTRO","IONIC","IRONS","IRONY","ITCHY","ITEMS","JADED",
    "JADES","JAPAN","JAZZY","JEANS","JELLO","JELLY","JERKS","JESUS","JEWEL","JIFFY",
    "JIHAD","JOINS","JOINT","JOKED","JOKER","JOKES","JOLLY","JOLTS","JUDGE","JUMBO",
    "JUMPS","JUMPY","JUROR","KARMA","KEBAB","KEEPS","KICKS","KICKY","KIDDO","KIDDY",
    "KINDA","KINDS","KINGS","KINKS","KINKY","KITES","KITTY","KNEAD","KNELT","KNIFE",
    "KNOBS","KNOCK","KNOTS","KNOWN","KNOWS","KOOKS","KOOKY","LACED","LACER","LACES",
    "LABEL","LACEY","LAKES","LAMBS","LAMPS","LANDS","LANES","LANKY","LASER","LEACH",
    "LEADS","LEAFY","LEAKS","LEAKY","LEAPT","LEARN","LEASE","LEASH","LEAST","LEAVE",
    "LEDGE","LEEKS","LEFTY","LEGAL","LEMON","LENDS","LEVEL","LEVER","LICKS","LIFER",
    "LIKED","LIKEN","LIKER","LIKES","LILAC","LIMBO","LIMBS","LIMIT","LINEN","LINER",
    "LINES","LIPPY","LISPS","LISTS","LITRE","LIVED","LIVEN","LIVER","LIVES","LIVID",
    "LOBBY","LOBES","LOCAL","LOCKS","LODGE","LOFTS","LOFTY","LOGIN","LOGON","LOGOS",
    "LOLLY","LOOFA","LOOPS","LOOPY","LOOSE","LOOTS","LORDS","LORRY","LOSER","LOSES",
    "LOSSY","LOTTO","LOTUS","LOUSY","LOVED","LOVER","LOVES","LOVEY","LOWER","LOYAL",
    "LUCID","LUCKS","LUMPS","LUMPY","LUNAR","LUNGS","LURCH","LURED","LURES","LYING",
    "LYMPH","LYRIC","MACED","MACES","MACHO","MACRO","MADLY","MAFIA","MAGIC","MAGMA",
    "MAGOT","MAIDS","MAILS","MAJOR","MALES","MALTS","MALTY","MAMBA","MAMBO","MANGA",
    "MANGO","MANIA","MANIC","MANLY","MANOR","MAPLE","MARKS","MARRY","MARSH","MASKS",
    "MASON","MASTS","MATCH","MATED","MATES","MATEY","MATHS","MATTE","MAYOR","MAZES",
    "MEADS","MEALS","MEALY","MEANS","MEANT","MEATS","MEATY","MECCA","MEDAL","MEDIA",
    "MEDIC","MEETS","MELEE","MELON","MELTS","MELTY","MEMES","MENDS","MEOWS","MERCY",
    "MERGE","MERIT","MERRY","MESSY","METAL","METER","METRE","MICRO","MIGHT","MILES",
    "MILKS","MILKY","MIMED","MIMES","MIMIC","MINCE","MINCY","MINDS","MINED","MINER",
    "MINES","MINOR","MINTS","MINTY","MINUS","MIRTH","MISSY","MISTS","MISTY","MITES",
    "MOATS","MOCKS","MODAL","MODEL","MODEM","MOIST","MOLAR","MOLDS","MOLDY","MOLES",
    "MOMMA","MONKS","MOODS","MOODY","MOOED","MOONS","MOONY","MOPED","MOPER","MOPES",
    "MOPEY","MOPPY","MORAL","MORON","MORPH","MOSES","MOTEL","MOTTO","MOULD","MOUND",
    "MOUNT","MOURN","MOUTH","MOVED","MOVER","MOVES","MOVIE","MOWED","MOWER","MUCKS",
    "MUCKY","MUCUS","MUDDY","MULES","MUMPS","MUNCH","MURKY","MUSHY","MUSKY","MYTHS",
    "NACHO","NAGGY","NAILS","NAIVE","NAKED","NAMED","NAMES","NANNA","NANNY","NAPPY",
    "NASAL","NASTY","NAVAL","NAZIS","NEEDS","NEEDY","NERDS","NERDY","NERVE","NERVY",
    "NESTS","NETTY","NEWED","NEWLY","NICER","NICHE","NIFTY","NIGHT","NINJA","NINNY",
    "NIPPY","NITRO","NOBLE","NODES","NOISE","NOISY","NOOSE","NORMS","NORTH","NOSED",
    "NOSER","NOSES","NOSEY","NOTCH","NOTED","NOTER","NOTES","NOUNS","NOVEL","NUDES",
    "NUDGE","NUDIE","NUKED","NUKES","NULLS","NUMBS","OAKED","OARED","OASIS","OATHS",
    "OBESE","OBEYS","OCCUR","OCEAN","ODDLY","ODEON","ODOUR","OFTEN","OGLED","OGLER",
    "OGLES","OILED","OINKS","OLDER","OLDIE","ROARY","ROAST","ROBES","ROCKS","ROCKY",
    "OLIVE","OMEGA","OMENS","ONION","ONLAY","ONSET","OOZES","OPIUM","OPTED","OPTIC",
    "ORALS","ORBIT","ORDER","OSCAR","OTHER","OTTER","OUIJA","OUTDO","OVARY","OVENS",
    "OVERS","OVERT","OWNED","OWNER","PACED","PACER","PACES","PACTS","PADDY","PAGAN",
    "PAGED","PAGER","PAGES","PAINS","PAINT","PAIRS","PALES","PALMS","PANEL","PANES",
    "PANGS","PANIC","PANSY","PANTO","PANTS","PANTY","PARED","PARES","PARIS","PAROL",
    "PARTS","PASTA","PASTE","PASTY","PATCH","PATHS","PATIO","PATTY","PAUSE","PAVED",
    "PAVEN","PAVER","PAVES","PAWNS","PAYEE","PAYER","PEACE","PEACH","PEAKS","PEAKY",
    "PEARL","PEARS","PEDAL","PEEKS","PEELS","PEEPS","PEERS","PELTS","PENCE","PENDS",
    "PENNY","PERCH","PERKS","PERKY","PHASE","PHOTO","PIANO","PICKS","PICKY","PIECE",
    "PIGGY","PIKES","PILER","PILES","PILLS","PILOT","PIMPS","PINCH","PINED","PINES",
    "PINEY","PINGS","PINKS","PINKY","PINTS","PIPED","PIPER","PIPES","PIXEL","PIXIE",
    "PLACE","PLAIN","PLANK","PLANS","PLAYS","PLONK","PLOPS","PLOTS","PLOYS","PLUCK",
    "PLUGS","PLUMB","PLUMP","PLUMS","POACH","POEMS","POETS","POINT","POKED","POKER",
    "POKES","POKEY","POKIE","POLAR","POLED","POLER","POLES","POLEY","POLIO","POLKA",
    "POLLS","PONDS","POOCH","POOLS","POOPS","POPPY","PORCH","PORED","PORER","PORES",
    "PORKS","PORKY","PORTS","POSED","POSER","POSES","POSEY","POTTY","POUCH","POUND",
    "POURS","PRANK","PRATS","PRAWN","PRICK","PRIDE","PRIME","PRINT","PRIOR","PRISE",
    "PRISM","PRIZE","PROBE","PRODS","PROMO","PROMS","PRONE","PROOF","PROPS","PROUD",
    "PROWL","PROXY","PRUNE","PSALM","PSYCH","PSYOP","PUBES","PUBIC","PUBIS","PULLS",
    "PULPY","PULSE","PUMPS","PUNCH","PUNKS","PUNTS","PUPIL","PURED","PUREE","PURER",
    "PURES","PURGE","PURRS","PURSE","PUSHY","PUSSY","PUTTY","QUADS","QUAKE","QUART",
    "QUASH","QUEST","QUICK","QUILL","QUILT","QUITE","QUITS","QUOTE","RACED","RACER",
    "RACES","RACKS","RADAR","RADIO","RAFTS","RAGED","RAGER","RAGES","RAGGY","RAIDS",
    "RAILS","RAINS","RAINY","RAKED","RAKER","RAKES","RALLY","RAMPS","RANCH","RANDY",
    "RANGE","RANKS","RANTS","RAPID","RARES","RASPY","RATED","RATER","RATES","RATTY",
    "RAVEN","RAZOR","REACH","REACT","READY","REAKS","REALM","REAPS","REARS","REBEL",
    "REBID","RECAP","RECON","REEKS","REEKY","REELS","REFIT","REFIX","REFLY","REFRY",
    "REGAL","REHAB","REIGN","RELAX","RELAY","REMAP","REMIX","RENTS","REPAY","REPLY",
    "RESET","RESIN","RESTS","RETRO","RETRY","REUSE","RHINO","RIDER","RIDES","RIDGE",
    "RIFLE","RINDS","RINGS","RINKS","RINSE","RIOTS","RIPED","RIPEN","RIPER","RIPES",
    "RISEN","RISER","RISES","RISKS","RISKY","RIVAL","ROACH","ROADS","ROAMS","ROARS",
    "RODEO","ROGER","ROGUE","ROLLS","ROMAN","ROMEO","ROMPS","ROOMS","ROOMY","ROOST",
    "ROOTS","ROOTY","ROPED","ROPER","ROPES","ROPEY","ROSES","ROUTE","ROYAL","RUGBY",
    "RUINS","RULED","RULER","RULES","RUNNY","RUSHY","RUSTS","RUSTY","SABER","SABRE",
    "SACKS","SADLY","SAFER","SAFES","SAINT","SALAD","SALES","SALTS","SALTY","SANDS",
    "SANDY","SASSY","SATIN","SAUNA","SAVED","SAVER","SAVES","SAWED","SCABS","SCALD",
    "SCALE","SCAMP","SCAMS","SCARE","SCARF","SCARS","SCART","SCARY","SCENE","SCENT",
    "SCOLD","SCONE","SCOOP","SCOOT","SCORE","SCORN","SCOUR","SCOUT","SCOWL","SCRAM",
    "SCRAP","SCREW","SCRUB","SCRUM","SCUBA","SCUFF","SEALS","SEATS","SEEDS","SEEDY",
    "SEEKS","SEEMS","SEEPS","SEIZE","SENDS","SENSE","SERUM","SERVE","SETUP","SEWED",
    "SHACK","SHADE","SHADY","SHAFT","SHAGS","SHANK","SHAPE","SHARD","SHARE","SHARK",
    "SHARP","SHAVE","SHAWL","SHEDS","SHEER","SHEET","SHELF","SHELL","SHIFT","SHILL",
    "SHINE","SHINS","SHINY","SHIPS","SHIRT","SHOCK","SHOES","SHONE","SHOOK","SHOOT",
    "SHOPS","SHORE","SHORT","SHOTS","SHOUT","SHOVE","SHOWN","SHOWS","SHOWY","SHRED",
    "SHREW","SHRUB","SHRUG","SHUSH","SHUTS","SICKO","SIDED","SIDER","SIDES","SIEGE",
    "SIFTS","SIGHS","SIGHT","SIGNS","SILKS","SILKY","SILLY","SINCE","SINGE","SINGS",
    "SINKS","SINUS","SIREN","SISSY","SITES","SIXTH","SIXTY","SIZED","SIZES","SKIDS",
    "SKIES","SKILL","SKIMP","SKINS","SKINT","SKIPS","SKIRT","SKULL","SLABS","SLACK",
    "SLAMS","SLANG","SLAPS","SLASH","SLATE","SLATS","SLEDS","SLEEK","SLEET","SLEPT",
    "SLICE","SLICK","SLIDE","SLIME","SLIMS","SLIMY","SLING","SLIPS","SLITS","SLOBS",
    "SLOPE","SLOPS","SLOTS","SLUGS","SLUMP","SLUMS","SLUNG","SMACK","SMART","SMASH",
    "SMEAR","SMELL","SMELT","SMILE","SMIRK","SMITE","SMOKE","SNACK","SNAGS","SNAIL",
    "SNAKE","SNAPS","SNARE","SNARL","SNEAK","SNIPE","SNIPS","SNOBS","SNOOP","SNORE",
    "SNORT","SNOWS","SNUBS","SNUCK","SOAKS","SOAPS","SOAPY","SOBER","SOCKS","SODAS",
    "SOFAS","SOILS","SOILY","SOLAR","SOLES","SOLID","SOLOS","SONAR","SONGS","SONIC",
    "SONSE","SOOTH","SOOTY","SOPPY","SORTS","SOUND","SOUPS","SOUPY","SOURS","SPACE",
    "SPADE","SPAMS","SPANK","SPANS","SPARE","SPARK","SPARS","SPASM","SPATS","SPAWN",
    "SPEAR","SPECK","SPECS","SPEED","SPELL","SPELT","SPEND","SPENT","SPEWS","SPIED",
    "SPIES","SPILL","SPILT","SPINE","SPINS","SPITE","SPITS","SPLAT","SPLIT","SPOIL",
    "SPOKE","SPOOF","SPOOK","SPORE","SPORT","SPOTS","SPOUT","SPRAY","SPUDS","SQUAD",
    "SQUAT","SQUID","STABS","STACK","STAFF","STAGE","STAGS","STAIN","STAIR","STAKE",
    "STALE","STALK","STALL","STANG","STANK","STARS","START","STASH","STATE","STATS",
    "STAYS","STEAD","STEAK","STEAL","STEAM","STEEL","STEEP","STEER","STEPS","STEWS",
    "STIFF","STILL","STING","STINK","STOCK","STOKE","STOLE","STOMP","STONE","STOOD",
    "STOOL","STOOP","STOPS","STORK","STORM","STRAP","STRAW","STRIP","STROP","STUBS",
    "STUCK","STUDS","STUDY","STUFF","STUMP","STUNG","STUNK","STUNS","STUNT","STYLE",
    "SUCKS","SUCKY","SUGAR","SUITS","SULKS","SULKY","SUPER","SURED","SURGE","SUSHI",
    "SWABS","SWAMP","SWANS","SWAPS","SWARM","SWAYS","SWEAR","SWEAT","SWEEP","SWELL",
    "SWEPT","SWIFT","SWIGS","SWILL","SWIMS","SWINE","SWING","SWIPE","SWOON","SWOOP",
    "SWORD","SWORE","SWORN","SYRUP","TABOO","TACKS","TACKY","TACOS","TACTS","TAILS",
    "TAINT","TAKEN","TAKER","TAKES","TALKS","TALKY","TALLY","TAMED","TAMER","TAMES",
    "TANGO","TANGY","TANKS","TAPED","TAPES","TARDY","TARED","TARES","TAROT","TARPS",
    "TARRY","TARTS","TARTY","TASKS","TASTE","TASTY","TATTY","TAUNT","TAXED","TAXER",
    "TAXES","TAXIS","TEACH","TEARS","TEARY","TEASE","TECHS","TEDDY","TEENS","TEENY",
    "TEETH","TELLS","TELLY","TEMPO","TEMPS","TEMPT","TENDS","TENOR","TENSE","TENTH",
    "TENTS","TERMS","TESTS","TESTY","TEXAS","TEXTS","THANK","THEFT","THEME","THESE",
    "THICK","THIEF","THIGH","THINK","THIRD","THONG","THORN","THOSE","THREW","THROB",
    "THROW","THUDS","THUGS","THUMB","THUMP","THYME","TICKS","TIDAL","TIDES","TIERS",
    "TIGHT","TILED","TILES","TILLS","TIMED","TIMER","TIMES","TIMID","TINTS","TIPSY",
    "TIRED","TIRES","TITAN","TITLE","TOADS","TOAST","TOCKS","TOFFY","TOILS","TOKED",
    "TOKEN","TOKER","TOKES","TOLLS","TOMBS","TONED","TONER","TONES","TONGS","TONIC",
    "TOOLS","TOONS","TOOTH","TOOTS","TOPAZ","TOPIC","TORCH","TORSO","TOTAL","TOTEM",
    "TOTTY","TOUCH","TOUGH","TOURS","TOWED","TOWEL","TOWER","TOWIE","TOWNS","TOWNY",
    "TOXIC","TOXIN","TRACE","TRACK","TRACT","TRADE","TRAIL","TRAIT","TRASH","SPEAK",
    "TRAMP","STRAY","SUNNY","SWEET","TABLE","THERE","THING","THREE","TIGER","ABORT",
    "TRAWL","TRAYS","TREAD","TREAT","TREES","TREKS","TREND","TRIAL","TRIBE","TRICK",
    "TRIED","TRIES","TRIMS","TRIPE","TRIPS","TRODS","TROLL","TROOP","TROTS","TROUT",
    "TRULY","TRUMP","TRUNK","TRUST","TRUTH","TUBBY","TUBED","TUBES","TUCKS","TULIP",
    "TUMOR","TUNED","TUNER","TUNES","TUNIC","TURBO","TURDS","TURFS","TURNS","TUTOR",
    "TWEET","TWICE","TWIGS","TWINS","TWIRL","TWIST","TYING","TYRED","TYRES","UDDER",
    "UNARM","UNBED","UNBOX","UNCAP","UNCLE","UNCUT","UNDID","UNFIX","UNHAT","UNIFY",
    "UNION","UNITE","UNITS","UNITY","UNJAM","UNLAY","UNLID","UNLIT","UNPIN","UNSET",
    "UNTIE","UNTIL","UNZIP","UPPER","URGED","URGES","USAGE","USERS","USHER","USING",
    "USUAL","UTTER","VAGUE","VALUE","VALVE","VEGAN","VEGAS","VEGES","VEGIE","VEILS",
    "VEINS","VEINY","VENOM","VENTS","VENUE","VERBS","VERSE","VESTS","VIALS","VIBES",
    "VICAR","VICED","VICES","VIDEO","VIEWS","VIGIL","VIGOR","VILLA","VINES","VINYL",
    "VIPER","VIRAL","VIRUS","VISAS","VISIT","VISOR","VIVID","VOCAB","VOCAL","VODKA",
    "VOGUE","VOICE","VOIDS","VOLTS","VOMIT","VOTED","VOTER","VOTES","VOUCH","VOWED",
    "VOWEL","VOWER","WACKO","WADED","WAFER","WAFTS","WAGED","WAGER","WAGES","WAGGA",
    "WAGON","WAHOO","WAIST","WAITS","WAIVE","WAKED","WAKEN","WAKER","WAKES","WALKS",
    "WALLS","WALLY","WALTZ","WANDS","WANED","WANES","WANNA","WANTS","WARDS","WARKS",
    "WARMS","WARNS","WARPS","WARTS","WASPS","WASTE","WATCH","WATTS","WAVED","WAVER",
    "WAVES","WAVEY","WEAVE","WEDGE","WEEDS","WEEPS","WEIGH","WEIRD","WELDS","WELLS",
    "WELLY","WELSH","WELTS","WHACK","WHALE","WHEAT","WHEEL","WHERE","WHICH","WHILE",
    "WHIPS","WHIRL","WHISK","WHOLE","WHOSE","WICCA","WICKS","WIDEN","WIDER","WIDTH",
    "WIMPS","WINDS","WINDY","WINES","WINGS","WINKS","WIPED","WIPER","WIPES","WIRED",
    "WIRER","WIRES","WISER","WITTY","WIVES","WOMBS","WOODS","WOODY","WOOED","WOOER",
    "WOOFS","WOOFY","WOOLS","WORDS","WORKS","WORLD","WORMS","WORRY","WORSE","WORST",
    "WORTH","WOULD","WOUND","WOVEN","WOWED","WRAPS","WRATH","WRECK","WRIST","WRONG",
    "WROTE","XEROX","YACKS","YAHOO","YANKS","YARDS","YEARS","YEAST","YELLS","YELPS",
    "YOLKS","YOLKY","YONKS","YOUNG","YOURS","YOUTH","YUCKS","YUCKY","YUMMY","ZAPPY"]
let word = []
let grid = document.getElementsByClassName("grid"); 
let divs = document.getElementsByTagName("div")

function createBoard() {
    for (let i=0; i < width*height; i++){
        let square = document.createElement('div')
        square.innerHTML = ''
        gridDisplay.appendChild(square)
        squares.push(square)
    } 
    generate()
    word = wordList[Math.floor(Math.random() * wordList.length)].split('')
    word = word.map(word => word.toUpperCase());
    console.log(word)
}
createBoard()
console.log(squares)
 //random grid
  

function generate() {
      let randomNumber = Math.floor(Math.random() * 20 + 10)
       if (squares[randomNumber].innerHTML == '') {
          squares[randomNumber].innerHTML = '-'
       } else generate()
}

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    keyboard.append(buttonElement)
    buttonElement.addEventListener('click', () => handleClick(key))
})

function moveRight(){
    rightNoGreenNoGray()
    rightWithGray()
    rightWithGreen()
}

function rightNoGreenNoGray() {
    for (let i=0; i < 30; i= i+5) {
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+2].style.backgroundColor != "green" && divs[i+3].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor != "green"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 5:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    squares[i +3].innerHTML = filteredRow[3];
                    squares[i +4].innerHTML = filteredRow[4];
                    break;
                case 4:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = filteredRow[0];
                    squares[i +2].innerHTML = filteredRow[1];
                    squares[i +3].innerHTML = filteredRow[2];
                    squares[i +4].innerHTML = filteredRow[3];
                    break;
                case 3:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = filteredRow[0];
                    squares[i +3].innerHTML = filteredRow[1];
                    squares[i +4].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }   
        }
    }
}

function rightWithGray(){
    for (let i = 0; i < width*height; i = i + 5){
        if (divs[i+2].style.backgroundColor == "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor != "grey" ){
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotTwo,spotThree,spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 4:
                    squares[i +1].innerHTML = filteredRow[0];
                    squares[i +2].innerHTML = filteredRow[1];
                    squares[i +3].innerHTML = filteredRow[2];
                    squares[i +4].innerHTML = filteredRow[3];
                    break;
                case 3:
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = filteredRow[0];
                    squares[i +3].innerHTML = filteredRow[1];
                    squares[i +4].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+3].style.backgroundColor == "grey" && divs[i+4].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor != "grey" ){
            let spotThree = squares[i+2].innerHTML
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotThree,spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 3:
                    squares[i +2].innerHTML = filteredRow[0];
                    squares[i +3].innerHTML = filteredRow[1];
                    squares[i +4].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+3].style.backgroundColor == "grey" && divs[i+4].style.backgroundColor == "grey" && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor != "grey" ){
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor == "grey" && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor != "grey" ){
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row2 = [spotOne,spotTwo];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length) {
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 1].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = filteredRow2[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor == "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 3:
                    squares[i ].innerHTML = filteredRow[0];
                    squares[i + 1].innerHTML = filteredRow[1];
                    squares[i + 2].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = filteredRow[0];
                    squares[i + 2].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    squares[i + 2].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    squares[i + 2].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor == "grey" && (divs[i+5].style.backgroundColor == "grey" || divs[i+6].style.backgroundColor == "grey")){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i + 1].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor == "grey" && divs[i+5].style.backgroundColor == "grey" && divs[i+6].style.backgroundColor == "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i + 1].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+2].style.backgroundColor == "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor == "grey"){
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let row = [spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i + 1].innerHTML = filteredRow[0];
                    squares[i + 2].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 2].innerHTML = '';
                    squares[i + 3].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i + 1].innerHTML = '';
                    squares[i + 2].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor == "grey" && (divs[i+5].style.backgroundColor == "grey" || divs[i+6].style.backgroundColor == "grey")){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i + 1].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    break;
            }
        }
        if ((divs[i+2].style.backgroundColor == "grey" || divs[i+3].style.backgroundColor == "grey") && divs[i+4].style.backgroundColor == "grey" && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor != "grey" ){
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "grey" && (divs[i+3].style.backgroundColor == "grey" || divs[i+4].style.backgroundColor == "grey") && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor != "grey" ){
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }
        }
    }
}

function rightWithGreen(){
    for (let i = 0; i < width*height; i = i + 5){
        if (divs[i+2].style.backgroundColor == "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor != "green"  && divs[i+6].style.backgroundColor != "green" ){
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotTwo,spotThree,spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 4:
                    squares[i +1].innerHTML = filteredRow[0];
                    squares[i +2].innerHTML = filteredRow[1];
                    squares[i +3].innerHTML = filteredRow[2];
                    squares[i +4].innerHTML = filteredRow[3];
                    break;
                case 3:
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = filteredRow[0];
                    squares[i +3].innerHTML = filteredRow[1];
                    squares[i +4].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+3].style.backgroundColor == "green" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor != "green"  && divs[i+6].style.backgroundColor != "green" ){
            let spotThree = squares[i+2].innerHTML
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotThree,spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 3:
                    squares[i +2].innerHTML = filteredRow[0];
                    squares[i +3].innerHTML = filteredRow[1];
                    squares[i +4].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+3].style.backgroundColor == "green" && divs[i+4].style.backgroundColor == "green" && divs[i+5].style.backgroundColor != "green"  && divs[i+6].style.backgroundColor != "green" ){
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor == "green" && divs[i+5].style.backgroundColor != "green"  && divs[i+6].style.backgroundColor != "green" ){
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i +3].innerHTML = filteredRow[0];
                    squares[i +4].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row2 = [spotOne,spotTwo];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length) {
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 1].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = filteredRow2[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+3].style.backgroundColor == "green" && divs[i+4].style.backgroundColor == "green" && divs[i+5].style.backgroundColor == "green"){
            let spotFive = squares[i+4].innerHTML
            let row = [spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 1:
                    squares[i +4].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +4].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor == "green"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 3:
                    squares[i ].innerHTML = filteredRow[0];
                    squares[i + 1].innerHTML = filteredRow[1];
                    squares[i + 2].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = filteredRow[0];
                    squares[i + 2].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    squares[i + 2].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    squares[i + 2].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor == "green" && divs[i+5].style.backgroundColor == "green"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i + 1].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    break;
            }   
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor == "green"){
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let row = [spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i + 1].innerHTML = filteredRow[0];
                    squares[i + 2].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 2].innerHTML = '';
                    squares[i + 3].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i + 1].innerHTML = '';
                    squares[i + 2].innerHTML = '';
                    break;
            }  
        } 
        if (divs[i+2].style.backgroundColor != "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor == "green" && (divs[i+5].style.backgroundColor == "green" || divs[i+6].style.backgroundColor == "green")){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length) {
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i + 1].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 1].innerHTML = '';
                    break;
            }
        }
    }
}

function moveLeft(){
    leftNoGreenNoGray()
    leftWithGray()
    leftWithGreen()
}

function leftNoGreenNoGray() {
    for (let i=0; i < 30; i= i+5) {
        if (divs[i+3].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor != "green" && divs[i+6].style.backgroundColor != "grey" && divs[i+6].style.backgroundColor != "green"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let spotFour = squares[i+3].innerHTML
            let spotFive = squares[i+4].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 5:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    squares[i +3].innerHTML = filteredRow[3];
                    squares[i +4].innerHTML = filteredRow[4];
                    break;
                case 4:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    squares[i +3].innerHTML = filteredRow[3];
                    squares[i +4].innerHTML = '';
                    break;
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    squares[i +4].innerHTML = '';
                    break;
            }
        }
    }
}

function leftWithGray(){
    for (let i = 0; i < width*height; i= i+5){
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor == "grey" ){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let spotFour = squares[i+3].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 4:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    squares[i +3].innerHTML = filteredRow[3];
                    break;
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    squares[i +3].innerHTML = '';
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor == "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor == "grey" && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor != "grey" ){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    break;
            }
            let spotFour = squares[i + 3].innerHTML
            let spotFive = squares[i + 4].innerHTML
            let row2 = [spotFour,spotFive];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i + 3].innerHTML = filteredRow2[0];
                    squares[i + 4].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i + 3].innerHTML = filteredRow2[0];
                    squares[i + 4].innerHTML = '';
                    break;
                case 0:
                    squares[i + 3].innerHTML = '';
                    squares[i + 4].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "grey" && divs[i+3].style.backgroundColor == "grey" && divs[i+4].style.backgroundColor == "grey" && divs[i+5].style.backgroundColor == "grey"){  
            let spotOne = squares[i].innerHTML
            let row = [spotOne];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    break;
            }
        }
        if (divs[i+3].style.backgroundColor == "grey" && divs[i+4].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor != "grey" ){
            let spotTwo = squares[i+2].innerHTML
            let spotThree = squares[i+3].innerHTML
            let spotFour = squares[i+4].innerHTML
            let row = [spotTwo,spotThree,spotFour];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = filteredRow[1];
                    squares[i + 4].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = filteredRow[1];
                    squares[i + 4].innerHTML = '';
                    break;
                case 1:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = '';
                    squares[i + 4].innerHTML = '';
                    break;
                case 0:
                    squares[i + 2].innerHTML = '';
                    squares[i + 3].innerHTML = '';
                    squares[i + 4].innerHTML = '';
                    break;
            }
        }
        if ( divs[i+3].style.backgroundColor == "grey" && divs[i+4].style.backgroundColor != "grey" && divs[i+5].style.backgroundColor != "grey" && divs[i+6].style.backgroundColor == "grey"){
            let spotOne = squares[i + 2].innerHTML
            let spotTwo = squares[i + 3].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = '';
                    break;
                case 0:
                    squares[i + 2].innerHTML = '';
                    squares[i + 3].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "grey" && divs[i+3].style.backgroundColor != "grey" && divs[i+4].style.backgroundColor == "grey" && (divs[i+5].style.backgroundColor == "grey" || divs[i+6].style.backgroundColor == "grey")){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    break;
            }
        }
        if ((divs[i+2].style.backgroundColor != "grey" || divs[i+3].style.backgroundColor != "grey") && divs[i+4].style.backgroundColor == "grey" && divs[i+5].style.backgroundColor != "grey"  && divs[i+6].style.backgroundColor != "grey" ){
            let spotFour = squares[i + 3].innerHTML
            let spotFive = squares[i + 4].innerHTML
            let row2 = [spotFour,spotFive];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i + 3].innerHTML = filteredRow2[0];
                    squares[i + 4].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i + 3].innerHTML = filteredRow2[0];
                    squares[i + 4].innerHTML = '';
                    break;
                case 0:
                    squares[i + 3].innerHTML = '';
                    squares[i + 4].innerHTML = '';
                    break;
            }
        }
    }
}

function leftWithGreen(){
    for (let i = 0; i < width*height; i= i+5){
        if (divs[i+2].style.backgroundColor != "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor != "green"  && divs[i+6].style.backgroundColor == "green" ){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let spotFour = squares[i+3].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 4:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    squares[i +3].innerHTML = filteredRow[3];
                    break;
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    squares[i +3].innerHTML = '';
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    squares[i +3].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor == "green"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let spotThree = squares[i+2].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    squares[i +2].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    squares[i +2].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor == "green" && divs[i+5].style.backgroundColor != "green"  && divs[i+6].style.backgroundColor != "green" ){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    break;
            }
            let spotFour = squares[i + 4].innerHTML
            let spotFive = squares[i + 5].innerHTML
            let row2 = [spotFour,spotFive];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i + 4].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i + 4].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = '';
                    break;
                case 0:
                    squares[i + 4].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+3].style.backgroundColor == "green" && divs[i+4].style.backgroundColor == "green" && divs[i+5].style.backgroundColor == "green"){  
            let spotOne = squares[i].innerHTML
            let row = [spotOne];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    break;
            }
        }
        if (divs[i+3].style.backgroundColor == "green" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor != "green"  && divs[i+6].style.backgroundColor != "green" ){
            let spotTwo = squares[i+2].innerHTML
            let spotThree = squares[i+3].innerHTML
            let spotFour = squares[i+4].innerHTML
            let row = [spotTwo,spotThree,spotFour];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = filteredRow[1];
                    squares[i + 4].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = filteredRow[1];
                    squares[i + 4].innerHTML = '';
                    break;
                case 1:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = '';
                    squares[i + 4].innerHTML = '';
                    break;
                case 0:
                    squares[i + 2].innerHTML = '';
                    squares[i + 3].innerHTML = '';
                    squares[i + 4].innerHTML = '';
                    break;
            }
        }
        if (divs[i+3].style.backgroundColor == "green" && divs[i+4].style.backgroundColor != "green" && divs[i+5].style.backgroundColor != "green" && divs[i+6].style.backgroundColor == "green"){
            let spotOne = squares[i + 2].innerHTML
            let spotTwo = squares[i + 3].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 2].innerHTML = filteredRow[0];
                    squares[i + 3].innerHTML = '';
                    break;
                case 0:
                    squares[i + 2].innerHTML = '';
                    squares[i + 3].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+3].style.backgroundColor != "green" && divs[i+4].style.backgroundColor == "green" && (divs[i+5].style.backgroundColor == "green" || divs[i+6].style.backgroundColor == "green")){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+1].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +1].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +1].innerHTML = '';
                    break;
            }
        }
        if ((divs[i+2].style.backgroundColor != "green" || divs[i+3].style.backgroundColor != "green") && divs[i+4].style.backgroundColor == "green" && divs[i+5].style.backgroundColor != "green"  && divs[i+6].style.backgroundColor != "green" ){
            let spotFour = squares[i + 3].innerHTML
            let spotFive = squares[i + 4].innerHTML
            let row2 = [spotFour,spotFive];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i + 3].innerHTML = filteredRow2[0];
                    squares[i + 4].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i + 3].innerHTML = filteredRow2[0];
                    squares[i + 4].innerHTML = '';
                    break;
                case 0:
                    squares[i + 3].innerHTML = '';
                    squares[i + 4].innerHTML = '';
                    break;
            }
        }
    }
}

function moveUp(){
    upNoGreenNoGray()
    upWithGray()
}

function upNoGreenNoGray() {
    for (let i=0; i < 5; i++) {
        if (divs[i+7].style.backgroundColor != "grey" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor != "grey" && divs[i+27].style.backgroundColor != "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let spotFour = squares[i+15].innerHTML
            let spotFive = squares[i+20].innerHTML
            let spotSix = squares [i+25].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour,spotFive,spotSix];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 6:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = filteredRow[3];
                    squares[i +20].innerHTML = filteredRow[4];
                    squares[i+25].innerHTML = filteredRow[5];
                    break;
                case 5:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = filteredRow[3];
                    squares[i +20].innerHTML = filteredRow[4];
                    squares[i+25].innerHTML = '';
                    break
                case 4:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = filteredRow[3];
                    squares[i +20].innerHTML = '';
                    squares[i+25].innerHTML = '';
                    break;
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    squares[i+25].innerHTML = '';
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    squares[i+25].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    squares[i+25].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    squares[i+25].innerHTML = '';
                    break;
            }
        }
    }
}

function upWithGray(){
    for (let i=0; i < 5; i++) {
        if ( divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor != "grey" && divs[i+27].style.backgroundColor == "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let spotFour = squares[i+15].innerHTML
            let spotFive = squares[i+20].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour,spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 5:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = filteredRow[3];
                    squares[i +20].innerHTML = filteredRow[4];
                    break
                case 4:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = filteredRow[3];
                    squares[i +20].innerHTML = '';
                    break;
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor == "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let spotFour = squares[i+15].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 4:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = filteredRow[3];
                    break;
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = '';
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor != "grey" && divs[i+27].style.backgroundColor != "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    break;
            }
            let spotFive = squares[i+ 20].innerHTML
            let spotSix = squares[i+ 25].innerHTML
            let row2 = [spotFive,spotSix];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i + 20].innerHTML = filteredRow2[0];
                    squares[i + 25].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i + 20].innerHTML = filteredRow2[0];
                    squares[i + 25].innerHTML = '';
                    break;
                case 0:
                    squares[i + 20].innerHTML = '';
                    squares[i + 25].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor == "grey" && (divs[i+22].style.backgroundColor != "grey" || divs[i+27].style.backgroundColor != "grey")){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = '';
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor != "grey" && divs[i+27].style.backgroundColor != "grey"){
            let spotOne = squares[i + 15].innerHTML
            let spotTwo = squares[i + 20].innerHTML
            let spotThree = squares[i + 25].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i + 15].innerHTML = filteredRow[0];
                    squares[i + 20].innerHTML = filteredRow[1];
                    squares[i + 25].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i + 15].innerHTML = filteredRow[0];
                    squares[i + 20].innerHTML = filteredRow[1];
                    squares[i + 25].innerHTML = '';
                    break;
                case 1:
                    squares[i + 15].innerHTML = filteredRow[0];
                    squares[i + 20].innerHTML = '';
                    squares[i + 25].innerHTML = '';
                    break;
                case 0:
                    squares[i + 15].innerHTML = '';
                    squares[i + 20].innerHTML = '';
                    squares[i + 25].innerHTML = '';
                    break;
            }
            let spotFive = squares[i].innerHTML
            let spotSix = squares[i+ 5].innerHTML
            let row2 = [spotFive,spotSix];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor == "grey" && divs[i+27].style.backgroundColor != "grey"){
            let spotFive = squares[i].innerHTML
            let spotSix = squares[i+ 5].innerHTML
            let row2 = [spotFive,spotSix];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor != "grey" && divs[i+27].style.backgroundColor == "grey"){
            let spotFive = squares[i].innerHTML
            let spotSix = squares[i+ 5].innerHTML
            let row2 = [spotFive,spotSix];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
            let spotOne = squares[i + 17].innerHTML
            let spotTwo = squares[i+ 22].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i + 17].innerHTML = filteredRow[0];
                    squares[i + 22].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 17].innerHTML = filteredRow[0];
                    squares[i + 22].innerHTML = '';
                    break;
                case 0:
                    squares[i + 17].innerHTML = '';
                    squares[i + 22].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor != "grey" && divs[i+27].style.backgroundColor != "grey"){
            let spotFive = squares[i].innerHTML
            let spotSix = squares[i+ 5].innerHTML
            let row2 = [spotFive,spotSix];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
            let spotOne = squares[i + 22].innerHTML
            let spotTwo = squares[i+ 27].innerHTML
            let row = [spotOne,spotTwo];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i + 22].innerHTML = filteredRow[0];
                    squares[i + 27].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 22].innerHTML = filteredRow[0];
                    squares[i + 27].innerHTML = '';
                    break;
                case 0:
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor == "grey" && (divs[i+22].style.backgroundColor == "grey" || divs[i+27].style.backgroundColor == "grey")){
            let spotFive = squares[i].innerHTML
            let spotSix = squares[i+ 5].innerHTML
            let row2 = [spotFive,spotSix];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor == "grey" && (divs[i+17].style.backgroundColor == "grey" || divs[i+22].style.backgroundColor == "grey") && divs[i+27].style.backgroundColor == "grey"){
            let spotFive = squares[i].innerHTML
            let spotSix = squares[i+ 5].innerHTML
            let row2 = [spotFive,spotSix];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
        }
        if (divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor == "grey" && divs[i+27].style.backgroundColor == "grey"){
            let spotFive = squares[i].innerHTML
            let spotSix = squares[i+ 5].innerHTML
            let row2 = [spotFive,spotSix];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = '';
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
        }
    }
}

function moveDown (){
    downNoGreenNoGray()
    downWithGrayAndGreen()
}

function downNoGreenNoGray() {
    for (let i=0; i < 5; i++) {
        if (divs[i+2].style.backgroundColor != "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor != "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let spotFour = squares[i+15].innerHTML
            let spotFive = squares[i+20].innerHTML
            let spotSix = squares [i+25].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour,spotFive,spotSix];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 6:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = filteredRow[3];
                    squares[i +20].innerHTML = filteredRow[4];
                    squares[i+25].innerHTML = filteredRow[5];
                    break;
                case 5:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = filteredRow[0];
                    squares[i+10].innerHTML = filteredRow[1];
                    squares[i+15].innerHTML = filteredRow[2];
                    squares[i +20].innerHTML = filteredRow[3];
                    squares[i +25].innerHTML = filteredRow[4];
                    break;
                case 4:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = filteredRow[0];
                    squares[i+15].innerHTML = filteredRow[1];
                    squares[i +20].innerHTML = filteredRow[2];
                    squares[i +25].innerHTML = filteredRow[3];
                    break;
                case 3:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = '';
                    squares[i+15].innerHTML = filteredRow[0];
                    squares[i +20].innerHTML = filteredRow[1];
                    squares[i +25].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i+15].innerHTML = '';
                    squares[i+20].innerHTML = filteredRow[0];
                    squares[i +25].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    squares[i+25].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i +15].innerHTML = '';
                    squares[i +20].innerHTML = '';
                    squares[i+25].innerHTML = '';
                    break;
            }
        }
    }
}

function downWithGrayAndGreen(){
    for (let i = 0; i < 5; i++){
        if (divs[i+2].style.backgroundColor != "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor == "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let spotFour = squares[i+15].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 4:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i +10].innerHTML = filteredRow[2];
                    squares[i +15].innerHTML = filteredRow[3];
                    break;
                case 3:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = filteredRow[0];
                    squares[i+10].innerHTML = filteredRow[1];
                    squares[i+15].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = filteredRow[0];
                    squares[i+15].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = '';
                    squares[i+15].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i+15].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor != "grey"){
            let spotTwo = squares[i + 22].innerHTML
            let spotThree = squares[i + 27].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i + 22].innerHTML = filteredRow[0];
                    squares[i + 27].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = '';
                    break;
            }
            let spotFour = squares[i].innerHTML
            let spotFive = squares[i+5].innerHTML
            let spotSix = squares[i+10].innerHTML
            let row2 = [spotFour,spotFive,spotSix];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 3:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i +5].innerHTML = filteredRow2[1];
                    squares[i+10].innerHTML = filteredRow2[2];
                    break;
                case 2:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = filteredRow2[0];
                    squares[i+10].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = filteredRow2[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor != "grey"){
            let spotTwo = squares[i + 22].innerHTML
            let spotThree = squares[i + 27].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i + 22].innerHTML = filteredRow[0];
                    squares[i + 27].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = '';
                    break;
            }
            let spotFour = squares[i].innerHTML
            let spotFive = squares[i+5].innerHTML
            let row2 = [spotFour,spotFive];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = filteredRow2[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor == "grey" && (divs[i+22].style.backgroundColor == "grey" || divs[i+27].style.backgroundColor == "grey")){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i+10].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = filteredRow[0];
                    squares[i+10].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor == "grey"){
            let spotOne = squares[i].innerHTML
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i].innerHTML = filteredRow[0];
                    squares[i +5].innerHTML = filteredRow[1];
                    squares[i+10].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = filteredRow[0];
                    squares[i+10].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor != "grey"){
            let spotOne = squares[i + 17].innerHTML
            let spotTwo = squares[i + 22].innerHTML
            let spotThree = squares[i + 27].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i + 17].innerHTML = filteredRow[0];
                    squares[i + 22].innerHTML = filteredRow[1];
                    break;
                case 2:
                    squares[i + 17].innerHTML = '';
                    squares[i + 22].innerHTML = filteredRow[0];
                    squares[i + 27].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 17].innerHTML = '';
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i + 17].innerHTML = '';
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = '';
                    break;
            }
            let spotFour = squares[i].innerHTML
            let spotFive = squares[i+5].innerHTML
            let row2 = [spotFour,spotFive];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = filteredRow2[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor != "green" && divs[i+12].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor == "grey"){
            let spotFour = squares[i].innerHTML
            let spotFive = squares[i+5].innerHTML
            let row2 = [spotFour,spotFive];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i].innerHTML = filteredRow2[0];
                    squares[i + 5].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = filteredRow2[0];
                    break;
                case 0:
                    squares[i].innerHTML = '';
                    squares[i + 5].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor != "grey"){
            let spotOne = squares[i + 17].innerHTML
            let spotTwo = squares[i + 22].innerHTML
            let spotThree = squares[i + 27].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i + 17].innerHTML = filteredRow[0];
                    squares[i + 22].innerHTML = filteredRow[1];
                    squares[i + 27].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i + 17].innerHTML = '';
                    squares[i + 22].innerHTML = filteredRow[0];
                    squares[i + 27].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 17].innerHTML = '';
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i + 17].innerHTML = '';
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor != "grey"){
            let spotTwo = squares[i + 22].innerHTML
            let spotThree = squares[i + 27].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i + 22].innerHTML = filteredRow[0];
                    squares[i + 27].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = '';
                    break;
            }
            let spotFour = squares[i + 5].innerHTML
            let spotFive = squares[i + 10].innerHTML
            let row2 = [spotFour,spotFive];
            let filteredRow2 = row2.filter(row => row != '')
            switch (filteredRow2.length){
                case 2:
                    squares[i + 5].innerHTML = filteredRow2[0];
                    squares[i + 10].innerHTML = filteredRow2[1];
                    break;
                case 1:
                    squares[i + 5].innerHTML = '';
                    squares[i + 10].innerHTML = filteredRow2[0];
                    break;
                case 0:
                    squares[i + 5].innerHTML = '';
                    squares[i + 10].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor != "grey"){
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let spotFour = squares[i+15].innerHTML
            let spotFive = squares[i+20].innerHTML
            let spotOne = squares[i + 25].innerHTML
            let row = [spotOne,spotTwo,spotThree,spotFour, spotFive];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 5:
                    squares[i + 5].innerHTML = filteredRow[0];
                    squares[i + 10].innerHTML = filteredRow[1];
                    squares[i +15].innerHTML = filteredRow[2];
                    squares[i +20].innerHTML = filteredRow[3];
                    squares[i +25].innerHTML = filteredRow[4];
                    break;
                case 4:
                    squares[i+ 5].innerHTML = ''
                    squares[i +10].innerHTML = filteredRow[0];
                    squares[i +15].innerHTML = filteredRow[1];
                    squares[i +20].innerHTML = filteredRow[2];
                    squares[i +25].innerHTML = filteredRow[3];
                    break;
                case 3:
                    squares[i+ 5].innerHTML = ''
                    squares[i +10].innerHTML = ''
                    squares[i +15].innerHTML = filteredRow[0];
                    squares[i +20].innerHTML = filteredRow[1];
                    squares[i +25].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i+5].innerHTML = ''
                    squares[i +10].innerHTML = ''
                    squares[i +15].innerHTML = ''
                    squares[i +20].innerHTML = filteredRow[0];
                    squares[i +25].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +5].innerHTML = ''
                    squares[i +10].innerHTML = ''
                    squares[i +15].innerHTML = ''
                    squares[i +20].innerHTML = ''
                    squares[i +25].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +5].innerHTML = ''
                    squares[i +10].innerHTML = ''
                    squares[i +15].innerHTML = ''
                    squares[i +20].innerHTML = ''
                    squares[i +20].innerHTML = ''
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor != "grey" && divs[i+22].style.backgroundColor == "grey"){
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let spotFour = squares[i+15].innerHTML
            let row = [spotTwo,spotThree,spotFour];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 3:
                    squares[i +5].innerHTML = filteredRow[0];
                    squares[i+10].innerHTML = filteredRow[1];
                    squares[i+15].innerHTML = filteredRow[2];
                    break;
                case 2:
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = filteredRow[0];
                    squares[i+15].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = '';
                    squares[i+15].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +5].innerHTML = '';
                    squares[i +10].innerHTML = '';
                    squares[i+15].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor == "grey" && (divs[i+22].style.backgroundColor == "grey" || divs[i+27].style.backgroundColor == "grey")){
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let row = [spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i +5].innerHTML = filteredRow[0];
                    squares[i+10].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+12].style.backgroundColor != "grey" && divs[i+17].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor == "grey"){
            let spotTwo = squares[i+5].innerHTML
            let spotThree = squares[i+10].innerHTML
            let row = [spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i +5].innerHTML = filteredRow[0];
                    squares[i+10].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i +5].innerHTML = '';
                    squares[i+10].innerHTML = '';
                    break;
            }
        }
        if (divs[i+2].style.backgroundColor == "green" && divs[i+12].style.backgroundColor == "grey" && divs[i+17].style.backgroundColor == "grey" && divs[i+22].style.backgroundColor != "grey"){
            let spotTwo = squares[i + 22].innerHTML
            let spotThree = squares[i + 27].innerHTML
            let row = [spotOne,spotTwo,spotThree];
            let filteredRow = row.filter(row => row != '')
            switch (filteredRow.length){
                case 2:
                    squares[i + 22].innerHTML = filteredRow[0];
                    squares[i + 27].innerHTML = filteredRow[1];
                    break;
                case 1:
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = filteredRow[0];
                    break;
                case 0:
                    squares[i + 22].innerHTML = '';
                    squares[i + 27].innerHTML = '';
                    break;
            }
        }
    }
}

function deleteLetter(){
    for (let i = 0; i < width * height; i++) {
        if (squares[i].innerHTML != ''){
             squares[i].innerHTML = '-'
         }
    }
}

function addLetter(letter) {  
        for (let i = 0; i < width * height; i++) {
           if (squares[i].innerHTML == '-'){
                squares[i].innerHTML = letter
                let child = divs[i + 2];
                child.style.backgroundColor = "#fee08b";
            }
        }
    }
    
    function addLetterWrong(letter) {  
            for (let i = 0; i < width * height; i++) {
               if (squares[i].innerHTML == '-'){
                    squares[i].innerHTML = letter
                    let child = divs[i + 2];
                    child.style.backgroundColor = "grey";
                }
            }
        }

    function addLetterRight(letter) { 
            for (let i = 0; i < width * height; i++) {
               if (squares[i].innerHTML == '-'){
                    squares[i].innerHTML = letter
                    let child = divs[i + 2];
                    child.style.backgroundColor = "lightgreen";
                }
            }
    }

    function checkLetter(letter) {
        for (let i = 0; i < word.length; i++){
            if (letter == word[i] && (squares[i].innerHTML == '-' || squares[i+5].innerHTML == '-' || squares[i+10].innerHTML == '-' ||  squares[i+15].innerHTML == '-' ||  squares[i + 20].innerHTML == '-' ||  squares[i+25].innerHTML == '-')){
                addLetterRight(letter)
            }
        }
        for (let i = 0; i < word.length; i++){
            if (letter == word[i]){
                addLetter(letter)
            }
        }
        for (let i = 0; i < word.length; i++){
            if (letter != word[i]){
                addLetterWrong(letter)
            }
        }
    }
    
    function checkBoard(){
    for (let i = 0; i < width*height; i++){      
        for (let j = 0; j < word.length; j++){
                let child = divs[i + 2];
                if (squares[i].innerHTML != word[j] ){
                    child.style.backgroundColor = "grey";
                }
            }
        }

        for (let i = 0; i < width*height; i++){
            for (let j = 0; j < word.length; j++){
                if (squares[i].innerHTML == word[j]){
                    let child = divs[i + 2];
                    child.style.backgroundColor = "#fee08b";
                }
            }
        }

        for (let i = 0; i < width*height; i++){
            for (let j = 0; j < word.length; j++){
                if (squares[i].innerHTML == word[j] && (i == j || i == j+5 || i == j+10 || i== j+15 || i == j+20 || i == j + 25)){
                    let child = divs[i + 2];
                    child.style.backgroundColor = "lightgreen";
                }
            }
        }

        for (let i = 0; i < width*height; i++){
            for (let j = 0; j < word.length; j++){
                if (squares[i].innerHTML == word[j] && i == j){
                    let child = divs[i + 2];
                    child.style.backgroundColor = "green";
                }
            }
        }

        for (let i = 0; i < width*height; i++){
            if (squares[i].innerHTML == ''){
                let child = divs[i + 2];
                child.style.backgroundColor = "rgb(248, 196, 245)";
            }
        }
    }

   function openPopup(){
        let popup = document.getElementById("popup");
        popup.classList.add("open-popup");
    }

    function CorrectWord(){
        if(divs[2].style.backgroundColor == "green" && divs[3].style.backgroundColor == "green" && divs[4].style.backgroundColor == "green" && divs[5].style.backgroundColor == "green" && divs[6].style.backgroundColor == "green" ){
             openPopup(); 
        }

     }
    
      document.onkeydown = function(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 13: //enter
           for(let i = 0; i < width*height; i++){
             if(squares[i].innerHTML == "-"){
                 return; 
             }
           }
           generate(); 
                break;
            case 37: //left arrow
                moveLeft();
                checkBoard();
                break;
            case 38: //up arrow
                moveUp();
                checkBoard();
                break;
            case 39: //right arrow
                moveRight();
                checkBoard();           
                break;
           case 40: //down arrow
                moveDown();
                checkBoard();
                break;
            case 65: 
                checkLetter('A');
                checkBoard();  
                break; 
            case 66: 
                checkLetter('B');
                checkBoard();  
                break;  
            case 67: 
                checkLetter('C');
                checkBoard();  
                break;  
             case 68: 
                checkLetter('D');
                checkBoard();  
                break;
             case 69: 
                checkLetter('E');
                checkBoard();  
                break;  
            case 70: 
                checkLetter('F');
                checkBoard();  
                break;  
            case 71: 
                checkLetter('G');
                checkBoard();  
                break;   
            case 72: 
                checkLetter('H');
                checkBoard();  
                break;   
            case 73: 
                checkLetter('I');
                checkBoard();  
                break;  
            case 74:
                checkLetter('J');
                checkBoard(); 
                break; 
            case 75: 
                checkLetter('K');
                checkBoard();  
                break;  
            case 76: 
                checkLetter('L');
                checkBoard();  
                break;  
            case 77: 
                checkLetter('M');
                checkBoard();  
                break;  
            case 78: 
                checkLetter('N');
                checkBoard();  
                break;  
            case 79: 
                checkLetter('O');
                checkBoard();  
                break;  
             case 80: 
                checkLetter('P');
                checkBoard();  
                break;  
            case 81: 
                checkLetter('Q');
                checkBoard();  
                break;  
            case 82: 
                checkLetter('R');
                checkBoard();  
                break; 
            case 83: 
                checkLetter('S');
                checkBoard();  
                break;  
            case 84: 
                checkLetter('T');
                checkBoard();  
                break;
            case 85: 
                checkLetter('U');
                checkBoard(); 
                break;   
            case 86: 
                checkLetter('V');  
                break; 
            case 87: 
                checkLetter('W');
                checkBoard();  
                break; 
            case 88: 
                checkLetter('X');
                checkBoard();  
                break; 
            case 89: 
                checkLetter('Y');
                checkBoard();  
                break; 
            case 90: 
                checkLetter('Z');
                checkBoard();  
                break; 
          case 8:
                deleteLetter(); 
                break;  
                
        }
        CorrectWord(); 
    }

})
SCENARIOS.push(
scenario('international-flight','International flight','Travel','A calm, source-backed pre-flight checklist for documents, baggage, airport timing and arrival.',['airport','flight','passport','visa','luggage','international'],[
  group('Before booking',['Check passport validity for your destination','Check visa or electronic travel authorization requirements','Review airline baggage limits before paying'],['Assume passport validity rules are the same everywhere','Book a connection without checking transit-entry requirements'],['Passport details exactly as shown on the document'],['Country-specific entry rules can change']),
  group('24–48 hours before',['Check in online when available','Confirm terminal, departure time and transport plan','Download or screenshot boarding pass and booking details'],['Put a power bank or spare lithium battery in checked baggage'],['Passport','Phone charger','Power bank in carry-on','Medication and essential prescriptions'],['Schedule or gate changes','Weather or disruption notices']),
  group('At the airport',['Arrive with enough time for bag drop, security and border control','Keep passport and valuables in hand luggage'],['Leave documents or essential medication in checked baggage','Wait until security to reorganize liquids/electronics'],['Boarding pass','Baggage receipt'],['Final gate changes','Local rules on liquids and restricted items'])
],['intlTravel','tsaPower','faaPack'],true),

scenario('domestic-flight','Domestic flight','Travel','The simple airport checklist: timing, ID, carry-on, gate changes and common mistakes.',['airport','domestic','flight','carry on'],[
  group('Before leaving',['Check in and verify terminal','Check the airline’s current baggage policy','Charge your phone'],['Assume yesterday’s terminal or gate is still correct'],['Accepted ID','Boarding pass','Wallet','Charger'],['Traffic and airport queues']),
  group('Packing',['Keep power banks and spare lithium batteries in carry-on','Put essential medication in hand luggage'],['Pack prohibited items without checking security rules','Overpack beyond your purchased allowance'],['Headphones','Water bottle to fill after security'],['Gate-checking of carry-on bags — remove spare batteries if required']),
  group('At the airport',['Recheck the gate after security','Keep valuables with you'],['Arrive at the last minute'],[],['Boarding time is earlier than departure time'])
],['tsaPower','faaPack'],true),

scenario('first-trip-abroad','First trip abroad','Travel','A first-timer’s guide to documents, money, connectivity, local rules and backups.',['travel abroad','first time','passport','foreign country'],[
  group('Before booking',['Check passport validity and entry rules','Check whether a visa or travel authorization is required','Review destination travel advisories and local laws'],['Assume visa-free means no paperwork at all'],['Passport number and emergency contact details'],['Transit-country rules']),
  group('Before departure',['Save offline copies of bookings and important documents','Tell someone your itinerary','Set up a working payment method and a backup'],['Carry all money and cards in one place','Rely only on airport Wi‑Fi'],['Passport','Cards/cash','Medication','Travel insurance details','Local accommodation address'],['Roaming charges','Common tourist scams','Local customs that differ from home']),
  group('On arrival',['Use official transport channels when practical','Confirm your accommodation address before leaving the airport'],['Hand your passport to unofficial helpers'],['Local emergency numbers'],['Unexpected fees or unofficial taxi approaches'])
],['intlTravel','cisaTravel'],true),

scenario('road-trip','Road trip','Travel','Vehicle, route and emergency preparation before a long drive.',['drive','car','road trip','long drive','vehicle'],[
  group('Vehicle check',['Check tire pressure and visible tire damage','Check lights and key fluid levels','Check for open safety recalls','Fuel or charge the vehicle before departure'],['Start a long trip with a known warning light or unsafe tire'],['Spare tire or mobility kit','Jack/tools if your vehicle uses them'],['Extreme heat or weather can change route and vehicle needs']),
  group('Pack',['Carry water, phone charging and a basic emergency kit','Download an offline map or route backup'],['Put every essential item in an inaccessible packed trunk'],['First aid kit','Flashlight','Reflective triangle','Jumper cables','Water'],['Long stretches without fuel/charging']),
  group('On the road',['Share your route if travelling remotely','Take breaks before fatigue becomes severe'],['Drive drowsy','Use the phone while driving'],[],['Road closures','Weather and visibility'])
],['nhtsaRoad','readyCar'],true),

scenario('rental-car-pickup','Rental car pickup','Travel','Avoid surprise fees, document existing damage and understand what you are accepting.',['rent car','rental','vehicle pickup'],[
  group('Before pickup',['Compare the total price, not only the headline daily rate','Review fuel, mileage, toll and return rules','Check what insurance coverage you already have'],['Assume every optional add-on is required'],['Driver licence','Booking confirmation','Accepted payment card'],['Security deposits or card holds','Extra-driver and young-driver fees']),
  group('At pickup',['Photograph or video existing damage before leaving','Confirm fuel or battery level','Check tires and obvious warning lights','Ask how tolls are billed'],['Sign without understanding damage or fuel terms'],['Rental agreement and roadside assistance contact'],['Damage not recorded on the contract']),
  group('Return',['Refuel or recharge according to the agreement','Take final photos and keep the return receipt'],['Leave without proof of return condition'],[],['After-hours return procedures'])
],['rentalCar'],true),

scenario('hotel-checkin','Hotel check-in','Travel','A practical arrival checklist for booking details, deposits, room condition and checkout surprises.',['hotel','check in','accommodation'],[
  group('Before arrival',['Confirm booking dates, room type and included benefits','Save the hotel address and booking reference'],['Assume early check-in or late checkout is included'],['Photo ID','Payment card','Booking confirmation'],['Local taxes, deposits or resort fees']),
  group('At check-in',['Ask what deposit or card hold is being placed','Confirm breakfast, Wi‑Fi and checkout time','Check the room promptly for major issues'],['Use the minibar or paid services without checking charges'],['Room number stored privately'],['Pre-authorizations can take time to release']),
  group('Before checkout',['Review the bill before leaving','Collect valuables from safe, outlets and bathroom'],['Leave keys, documents or chargers behind'],['Receipt'],['Unexpected minibar or service charges'])
],[],false),

scenario('travel-with-children','Flying with children','Travel','Reduce airport stress with documents, food, comfort items and backup plans.',['kids','children','family flight','baby flight'],[
  group('Before travel',['Check child document and consent requirements for your route','Choose seats early when possible','Pack a small delay kit'],['Assume one parent can always travel internationally with a child without extra documents'],['Child passport/ID as required','Medication','Snacks','Change of clothes','Comfort item'],['Country-specific consent documentation']),
  group('Airport',['Allow more time than when travelling alone','Keep child essentials in carry-on'],['Check all child essentials into the hold'],['Wipes','Empty refillable bottle','Small entertainment'],['Gate changes and long walks']),
  group('Boarding',['Use priority/family boarding only if it actually helps your family'],['Rush to board if extra cabin time will make things harder'],[],['Stroller gate-check process varies by airline'])
],['intlTravel'],false),

scenario('business-trip','Business trip','Travel','Keep work, travel documents, presentation material and backup connectivity under control.',['work travel','business flight','conference travel'],[
  group('Before booking',['Check visa/work-entry requirements for the destination','Keep meetings and travel time realistic'],['Book a connection that leaves no recovery margin before a key meeting'],['Passport','Meeting addresses','Company contacts'],['Entry rules may differ for business activity']),
  group('Before departure',['Download presentation files locally','Carry a second way to access critical documents','Confirm roaming or eSIM'],['Put your only laptop charger or presentation copy in checked baggage'],['Laptop','Charger','Adapters','Business cards if useful'],['Public Wi‑Fi and device security']),
  group('Arrival',['Reconfirm meeting time zone and location','Test key files before the meeting'],['Assume hotel Wi‑Fi will be reliable enough for a critical call'],[],['Local transport delays'])
],['intlTravel','cisaTravel'],false),

scenario('job-interview','Job interview','Work','Prepare the facts, your examples, logistics and the questions you should ask.',['career','interview','job','hiring'],[
  group('The day before',['Research the employer, role and interviewers','Prepare a 30–60 second summary of your experience','Choose 3–5 examples showing relevant results','Prepare questions you genuinely want answered'],['Memorize long scripted answers word-for-word'],['Resume/CV copies if relevant','Portfolio or work samples','Notebook and pen'],['Unclear job scope or reporting line']),
  group('Before leaving',['Confirm time, location and contact person','Plan to arrive a little early'],['Arrive so early that you create pressure for the interviewer','Experiment with unfamiliar clothes or tech on interview day'],['Phone on silent','Names and titles'],['Traffic, parking or building access']),
  group('During',['Answer with specific examples and outcomes','Ask clarifying questions when needed'],['Criticize previous employers','Interrupt or bluff knowledge you do not have'],[],['Questions that reveal unclear expectations or role changes'])
],['dolInterview'],true),

scenario('video-interview','Video interview','Work','Camera, audio, environment and interview preparation for a remote interview.',['remote interview','zoom','teams','video call'],[
  group('Before',['Test camera, microphone and internet','Open the meeting link early enough to handle updates','Set a clean, quiet background','Prepare examples and questions'],['Depend on an untested headset or browser'],['Charger','Backup phone hotspot if available','CV and notes nearby'],['Software updates or login problems']),
  group('During',['Look toward the camera when speaking','Keep notes short enough that you stay present'],['Read answers from another screen','Let notifications pop up during the call'],[],['Audio delay — leave room before interrupting']),
  group('After',['Send a concise thank-you when appropriate'],['Send repeated follow-ups immediately'],[],[])
],['dolInterview'],false),

scenario('first-day-new-job','First day at a new job','Work','Arrive ready without overloading yourself: access, people, expectations and notes.',['new job','first day','onboarding'],[
  group('Before',['Confirm start time, location and dress expectations','Know your manager’s name and contact details','Review any onboarding documents sent in advance'],['Assume laptop, access badge or parking is automatically ready'],['ID or documents requested by HR','Notebook','Charger'],['Building access and parking rules']),
  group('During',['Write down names, systems and recurring meetings','Ask how success will be measured in the first weeks','Clarify immediate priorities'],['Try to redesign processes on day one','Pretend you understand acronyms you do not know'],[],['Conflicting priorities from different people']),
  group('End of day',['Confirm what you should do next and when'],['Leave with unresolved access blockers without telling anyone'],[],[])
],[],false)
);

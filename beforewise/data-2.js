SCENARIOS.push(
scenario('presentation','Giving a presentation','Work','Content, room, backup files and delivery checks for a professional presentation.',['present','presentation','speech','slides'],[
  group('Before',['Define the one decision or message the audience should leave with','Rehearse the opening, transitions and ending','Check time and trim before adding more','Test slides on the actual device when possible'],['Fill slides with paragraphs you plan to read'],['Local copy of slides','PDF backup','Adapter/charger','Water'],['Font, video or aspect-ratio issues']),
  group('Room check',['Test display, audio and clicker','Know where you will stand and how questions will work'],['Start without verifying the first slide is visible'],[],['Room lighting and microphone issues']),
  group('Delivery',['Pause and make eye contact','State the ask or conclusion clearly'],['Rush because the first few minutes felt slow','Apologize repeatedly for minor issues'],[],['Running over time'])
],[],true),

scenario('salary-negotiation','Salary negotiation','Work','Prepare your target, total package and questions before discussing compensation.',['salary','offer','compensation','negotiate'],[
  group('Before',['Know your preferred number and minimum acceptable outcome','Review the whole package, not only base salary','List your strongest role-specific evidence'],['Negotiate without understanding the role scope','Invent competing offers or false numbers'],['Written offer if one exists','Questions about bonus, benefits and review cycle'],['One-time bonus masking a weak recurring package']),
  group('Conversation',['Ask for time to review if needed','Use clear, calm reasons tied to role and market value'],['Make threats you are not willing to follow through on','Accept or reject under artificial pressure'],[],['Changes to title, location or responsibilities']),
  group('After',['Get agreed changes in writing'],['Rely on verbal promises only'],[],[])
],[],false),

scenario('important-meeting','Important work meeting','Work','Walk in knowing the purpose, decisions, facts and follow-up.',['meeting','work','client meeting'],[
  group('Before',['Write the desired outcome in one sentence','Read the latest relevant material','Know which decisions need to be made','Prepare the numbers or evidence likely to be challenged'],['Invite people without a clear role','Open with background that everyone already knows'],['Agenda','Key files','Decision points'],['Missing decision-maker']),
  group('During',['Capture owners and dates for actions','Separate decisions from discussion'],['Let unresolved points disappear into “we’ll follow up”'],[],['Scope changes or new assumptions']),
  group('After',['Send concise decisions and actions'],['Send a transcript instead of useful outcomes'],[],[])
],[],false),

scenario('conference-attendee','Conference or trade show','Work','Make the event useful: meetings, navigation, battery, contacts and follow-up.',['conference','expo','trade show','event'],[
  group('Before',['Choose the sessions and people that matter most','Pre-book important meetings where possible','Download the event map/app'],['Try to attend everything'],['Badge/registration','Power bank','Comfortable shoes','Business cards if useful'],['Venue distances and schedule changes']),
  group('During',['Write one-line notes after useful conversations','Leave buffer between distant sessions'],['Collect contacts with no context for why they matter'],[],['Phone battery and weak venue connectivity']),
  group('After',['Follow up with the few highest-value contacts within a reasonable time'],['Send generic copy-paste messages to everyone'],[],[])
],[],false),

scenario('moving-home','Moving home','Home & Life','A staged checklist from sorting and utilities through moving day and address changes.',['move house','moving','new home','relocation'],[
  group('2–4 weeks before',['Book movers or transport','Sort what to move, sell, donate or discard','Arrange utilities/internet for the new home','Start address-change list'],['Pack documents, keys or valuables into unidentified boxes'],['Lease/ownership documents','Mover contact details'],['Mover cancellation terms','Elevator/loading restrictions']),
  group('Packing',['Label boxes by room and priority','Create a first-night box'],['Pack cleaning supplies and tools you still need too early'],['Medication','Chargers','Basic toiletries','Bedding','Kettle/coffee essentials if useful'],['Fragile items without protection']),
  group('Moving day',['Photograph meter readings and property condition','Keep keys and important documents with you','Do a final room-by-room check'],['Hand over access before confirming everything is out'],['Phone charger','Water','Payment/receipts'],['Damage documentation']),
  group('After',['Update important addresses and accounts','Test utilities and locks'],['Use unofficial paid address-change services without checking'],[],['Mail still going to the old address'])
],['changeAddress'],true),

scenario('apartment-viewing','Viewing a rental apartment','Home & Life','Inspect the place, building, costs and contract questions before committing.',['rent','apartment','flat','viewing','lease'],[
  group('Before',['Confirm total monthly cost and deposit','Prepare questions about utilities, parking, maintenance and notice period'],['Transfer a deposit before verifying the property and counterparty'],['ID only if genuinely needed for access/application','Notes or camera'],['Fake rental listings and urgency pressure']),
  group('During',['Check water pressure, visible leaks, windows, locks and air conditioning','Check phone signal and practical noise levels','Ask what is included and what you must maintain'],['Focus only on décor and ignore defects'],[],['Mould, water damage, pests or unsafe electrical signs']),
  group('Before signing',['Read the actual lease and inventory','Photograph condition at handover'],['Rely on promises that are not reflected in writing'],[],['Fees or clauses that differ from the listing'])
],['scamFTC'],true),

scenario('leave-home-vacation','Leaving home for vacation','Home & Life','Secure the home, reduce avoidable damage and return to something pleasant.',['vacation home','leave house','holiday home prep'],[
  group('Day before',['Pause deliveries if needed','Empty food likely to spoil','Charge or test key security devices'],['Post detailed public travel dates if home security is a concern'],['Keys for trusted contact if appropriate','Emergency contact details'],['Water leaks or appliances']),
  group('Before leaving',['Lock doors/windows','Turn off unnecessary appliances','Set climate control appropriately for your location','Take out rubbish','Check taps and toilets'],['Turn off systems that must remain on for safety or property protection'],['Passport/wallet/phone — final pocket check'],['Local weather while away']),
  group('Away',['Keep an eye on critical home alerts if you use them'],['Ignore an alarm because you assume it is false'],[],[])
],[],false),

scenario('home-emergency-kit','Build a home emergency kit','Home & Life','A practical baseline kit for outages, disruptions and evacuation.',['emergency','kit','disaster','power outage'],[
  group('Core supplies',['Store water and non-perishable food','Include flashlight and spare power/charging','Include first aid supplies','Keep copies of key contact and household information'],['Assume the kit is finished forever'],['Medication needs','Radio if appropriate','Hygiene items','Cash in small denominations if useful'],['Needs differ for children, older adults, pets and local hazards']),
  group('Maintain',['Review expiry dates periodically','Keep the kit accessible'],['Store all emergency supplies somewhere difficult to reach during an outage'],[],['Battery self-discharge','Seasonal hazard changes']),
  group('Plan',['Agree a household communication and meeting plan'],['Rely only on one person’s phone for every contact'],['Local emergency alerts enabled'],[])
],['readyKit'],true),

scenario('hosting-guests','Hosting overnight guests','Home & Life','The small practical details that make guests comfortable without overdoing it.',['guest','hosting','overnight'],[
  group('Before',['Confirm arrival time and dietary needs','Prepare clean bedding and towels','Clear enough bathroom and storage space'],['Plan every minute of the visit without asking guests'],['Wi‑Fi details','Spare key or access instructions if appropriate'],['Parking or building access']),
  group('Arrival',['Show bathroom, water, Wi‑Fi and basic house logistics','Tell them anything important about locks, pets or alarms'],['Give a long house-rules lecture for trivial preferences'],[],['Temperature and sleeping comfort']),
  group('During',['Give guests some unstructured time'],['Assume they want to be entertained continuously'],[],[])
],[],false),

scenario('used-car','Buying a used car','Buying & Money','Check identity, history, recalls, inspection, test drive and written terms before paying.',['car purchase','second hand car','used vehicle'],[
  group('Before viewing',['Research the specific model and realistic market price','Ask for VIN/vehicle identification details','Check available vehicle history and open recalls'],['Send a large deposit before verifying the car and seller'],['Licence','Notes','Independent inspection contact'],['Salvage/accident history','Price that is far below market without a clear reason']),
  group('At the car',['Match VIN on car and documents','Inspect in daylight','Test major electrical features and air conditioning','Take a proper test drive','Get an independent mechanical inspection for a significant purchase'],['Let a clean exterior replace inspection','Accept “no time for inspection” pressure'],[],['Uneven tire wear, warning lights, leaks, inconsistent panel gaps']),
  group('Before payment',['Confirm ownership/authority to sell','Read the written sale terms and warranty status','Keep copies of payment and transfer records'],['Rely on spoken promises that are absent from paperwork','Pay before the agreed transfer process is clear'],['Final price including fees'],['Outstanding finance/lien or local transfer requirements'])
],['usedCarFTC','recalls'],true),

scenario('online-marketplace','Buying from an online marketplace','Buying & Money','Reduce scam risk before paying a stranger or unfamiliar seller.',['marketplace','online shopping','seller','scam'],[
  group('Before paying',['Check seller history and item details','Reverse-check unusually cheap offers by searching the product/seller plus “scam” or “complaint”','Use platform-protected payment where available'],['Move off-platform just because the seller asks','Pay by gift card, crypto or unusual transfer because of urgency'],['Screenshots of listing and conversation'],['Pressure to act immediately','Copied photos or inconsistent item details']),
  group('Meetup',['Use a safe public meeting place for local exchanges','Inspect and test the item before final payment when possible'],['Carry unnecessary cash to an isolated meeting'],['Charged phone'],['Last-minute location changes']),
  group('After',['Keep receipt/payment proof until satisfied'],['Delete the conversation immediately'],[],[])
],['onlineShopping','scamFTC'],true)
);

SCENARIOS.push(
scenario('concert','Concert or festival','Events & Social','Tickets, venue rules, battery, weather, transport and a safe exit plan.',['concert','festival','music','event'],[
  group('Before',['Confirm ticket is in the correct account/app','Check venue bag and prohibited-item rules','Plan transport both ways','Check weather for outdoor venues'],['Buy resale tickets from an unverified source without protection'],['ID if required','Charged phone','Power bank if allowed','Ear protection if you want it'],['Venue-specific bag rules']),
  group('Arrival',['Screenshot ticket only if the venue permits static codes','Set a meetup point with friends'],['Depend on mobile signal for every detail'],[],['Crowded entrances and weak data service']),
  group('Leaving',['Leave enough battery for transport','Use the agreed meetup point if separated'],['Accept an unsafe ride just to leave quickly'],[],['Surge pricing and road closures'])
],[],false),

scenario('hospital-visit','Visiting someone in hospital','Events & Social','A respectful practical checklist that leaves medical decisions to the care team.',['hospital','visit','patient','friend'],[
  group('Before',['Check visiting hours and ward rules','Ask the patient or family whether a visit is welcome','Keep the visit flexible and short if they are tired'],['Visit when you are unwell or infectious','Bring food, flowers or gifts without checking restrictions'],['Patient’s ward/room details','A simple supportive message'],['Isolation or visitor limits can change']),
  group('During',['Clean your hands as instructed','Follow staff directions and privacy rules','Let the patient rest'],['Ask the patient to explain private medical details','Offer unrequested medical advice as fact'],[],['Procedures or rounds may interrupt the visit']),
  group('Leaving',['Take your belongings and keep noise low'],['Post photos or health updates without permission'],[],[])
],[],false),

scenario('school-trip','Preparing a child for a school trip','Family','Documents, medication handover, clothing, contact details and a child-friendly packing check.',['school trip','child','kids','excursion'],[
  group('Before',['Read the school’s instructions carefully','Return consent/payment forms on time','Tell staff about relevant allergies or medication through the school’s required process'],['Put medication in a child’s bag if the school requires staff-controlled handover'],['Emergency contact details','Required ID/forms'],['School-specific medication and device rules']),
  group('Pack',['Label important belongings','Pack clothing for the actual weather and activity','Keep the bag manageable for the child'],['Pack expensive items the child does not need'],['Water','Sun/rain protection','Simple snack if allowed'],['Items prohibited by the school/venue']),
  group('Morning',['Confirm pickup time and location','Do a final essentials check'],['Arrive after the group departure time'],[],[])
],[],false),

scenario('babysitter-handover','Leaving a child with a babysitter','Family','Give the sitter the information they need without creating a confusing manual.',['babysitter','childcare','sitter','kids'],[
  group('Before',['Confirm exact start/end time and payment','Explain routines, allergies and house safety basics','Show where essential supplies are'],['Assume the sitter knows your child’s routines or house layout'],['Your contact details','Backup trusted contact','Home address','Relevant medical/emergency information'],['Pets, alarms, locked doors or pool access']),
  group('Handover',['Explain bedtime/food boundaries clearly','Show how to reach you and when to call'],['Leave without confirming the sitter understands key safety information'],[],['Unclear screen-time or visitor rules']),
  group('Return',['Pay as agreed and ask how things went'],['Interrogate the child or sitter over tiny deviations from routine'],[],[])
],[],false),

scenario('camping','Camping trip','Travel','Weather, shelter, water, fire rules, navigation and a clean return.',['camp','tent','outdoors','weekend'],[
  group('Before',['Check forecast and site rules','Tell someone where you are going','Test tent and critical gear before leaving','Plan safe drinking water'],['Assume you can make a fire anywhere'],['Shelter/sleep system','Water','Food','First aid kit','Lighting','Power/charging'],['Fire restrictions, flash floods or extreme temperatures']),
  group('At camp',['Set up before dark when possible','Store food appropriately for the location','Keep the site tidy'],['Leave food or rubbish attracting animals'],[],['Wind direction and changing weather']),
  group('Leaving',['Pack out rubbish and check the site','Fully extinguish permitted fires'],['Leave a fire or hot coals unattended'],[],[])
],[],false),

scenario('online-payment-scam','Unexpected payment request','Digital','A quick pause checklist for urgent calls, messages and “protect your money” scams.',['scam','payment','gift card','crypto','fraud'],[
  group('Pause',['Stop and independently verify who contacted you','Use a known official number or app to contact the organisation directly'],['Move money to “protect it” because a caller told you to','Pay a stranger by gift card, crypto or cash courier','Share one-time verification codes'],['Original account statement or official app'],['Threats of arrest, account closure or extreme urgency']),
  group('Verify',['Tell a trusted person before making a large unusual payment'],['Stay on the phone while withdrawing or transferring money'],[],['Caller ID can be spoofed']),
  group('If you paid',['Contact the payment provider immediately and report fraud through official channels'],['Keep sending more money to recover the first payment'],[],[])
],['scamFTC'],true),

scenario('vehicle-sale','Selling your car','Buying & Money','Prepare records, remove personal data and complete a safe documented handover.',['sell car','vehicle sale','buyer'],[
  group('Before listing',['Gather maintenance and ownership records you can legally share','Know your minimum price and transfer process','Remove personal items from the car'],['Publish documents showing unnecessary personal information'],['Vehicle documents required locally','Spare keys'],['Scam buyers asking for unusual payment steps']),
  group('Before handover',['Remove saved home addresses, garage codes, contacts and paired phones from the infotainment system','Confirm payment method is genuine','Document vehicle condition'],['Hand over keys before payment/transfer conditions are satisfied'],['Signed sale/transfer records'],['Fake payment confirmations']),
  group('After',['Keep copies of sale records and complete any local seller notification'],['Assume the buyer will complete every required transfer step for you'],[],[])
],['scamFTC'],false),

scenario('new-appliance','Receiving a major appliance','Home & Life','Delivery access, condition, installation, warranty and first-use checks.',['fridge','washer','appliance','delivery'],[
  group('Before delivery',['Measure doors, lifts and final placement space','Confirm delivery includes stairs, unpacking or installation if needed','Clear the route'],['Assume installers will modify plumbing/electrical connections outside their scope'],['Order number','Building access instructions'],['Delivery window and access restrictions']),
  group('At delivery',['Inspect for visible damage before the team leaves','Confirm model number matches the order','Photograph damage immediately'],['Sign “received in good condition” without looking'],['Packaging if return policy requires it','Receipt'],['Dents hidden by packaging']),
  group('First use',['Follow manufacturer setup instructions','Register warranty if useful'],['Ignore unusual leaks, burning smells or error codes'],[],['Return-window deadlines'])
],[],false),

scenario('important-document-signing','Signing an important document','Home & Life','Slow down, identify obligations, missing pages and changes before you sign.',['contract','sign','agreement','document'],[
  group('Before',['Read the complete final version, including attachments','Identify dates, money, obligations, termination and renewal terms','Compare the final copy with what you negotiated'],['Sign a blank or incomplete page','Let urgency replace reading'],['Your own copy of the final document'],['Auto-renewal, penalties, personal guarantees or broad authority clauses']),
  group('Questions',['Ask about anything you do not understand','Get material promises reflected in the written document'],['Rely on “don’t worry about that clause” as a substitute for clarification'],[],['Different language versions that do not match']),
  group('After',['Keep the signed copy somewhere retrievable'],['Lose the only copy or receipt'],[],[])
],[],false),

scenario('doctor-appointment','Preparing for a routine doctor appointment','Home & Life','A non-diagnostic preparation list for making the appointment more useful.',['doctor','appointment','clinic','health visit'],[
  group('Before',['Write down the main reason for the visit and key questions','Bring an accurate medication list','Note relevant symptom timing or measurements you already have'],['Stop or change prescribed medication just to “prepare” unless instructed by your care team'],['ID/insurance details if required','Medication list','Prior records requested by the clinic'],['Special fasting or preparation instructions from the clinic']),
  group('During',['Be clear about what changed and when','Ask what the next step is and when to follow up'],['Hide medication or supplement use because you think it is unimportant'],[],['New tests or instructions you do not understand']),
  group('After',['Save the plan, prescriptions and follow-up date'],['Rely on memory for complex instructions'],[],[])
],[],false)
);

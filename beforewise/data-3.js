SCENARIOS.push(
scenario('electronics-purchase','Buying expensive electronics','Buying & Money','Check exact model, warranty, return terms and condition before committing.',['laptop','phone','tv','electronics','buy'],[
  group('Before',['Compare exact model numbers, not just product names','Check warranty and return window','Confirm included accessories'],['Buy based only on a large discount percentage'],['Required ports/features list'],['Region-locked features or warranty limitations']),
  group('At purchase',['Inspect sealed/open-box condition','Verify serial/model details if relevant'],['Discard packaging before you know the product works'],['Receipt and warranty proof'],['Restocking fees']),
  group('First setup',['Test core functions during the return window','Install updates from official channels'],['Load sensitive data before confirming the device is trustworthy and functional'],[],['Dead pixels, battery issues, missing accessories'])
],[],false),

scenario('sell-old-phone','Selling or trading in your old phone','Digital','Back up, transfer access, unlink accounts and erase personal data before handover.',['sell phone','trade in','old phone','factory reset'],[
  group('Before erase',['Back up important data','Move authenticator access and recovery methods to the new device','Unpair watches/accessories and unlink accounts as required'],['Factory-reset before confirming your important data and account access transferred'],['Account recovery codes where applicable','SIM/eSIM transfer plan'],['Authenticator lockout']),
  group('Erase',['Sign out/unlink the device where required','Factory-reset the device using the manufacturer’s official process','Remove physical SIM and memory card if applicable'],['Assume deleting photos one-by-one removes everything'],[],['Activation locks or device-management profiles']),
  group('Before handover',['Confirm the device starts in clean setup mode','Record trade-in/shipping proof'],['Hand over while still logged into email, banking or cloud accounts'],[],['Scam trade-in instructions'])
],['sellPhone','phoneUpgrade'],true),

scenario('new-phone','Setting up a new phone','Digital','Secure the device before it becomes the key to your accounts.',['new phone','setup','security','mobile'],[
  group('Core setup',['Install system updates','Set a strong device lock','Enable device-finding and remote lock/erase features','Back up the phone','Enable MFA on important accounts'],['Reuse a weak device PIN because it is easy to type in public'],['Account recovery methods','Authenticator app transfer'],['Fake setup links or phishing messages']),
  group('Privacy',['Review app permissions as you install','Turn off unnecessary access to contacts, photos, microphone or location'],['Approve every permission request automatically'],[],['Apps asking for access unrelated to their function']),
  group('Finish',['Test calls, data, banking and authenticator access before wiping your old phone'],['Erase the old phone before verifying the migration'],[],[])
],['phoneUpgrade','cisaMfa'],true),

scenario('public-wifi','Using public Wi‑Fi while travelling','Digital','A short security checklist for airports, hotels and cafés.',['wifi','airport wifi','hotel wifi','cyber'],[
  group('Before connecting',['Use mobile data for sensitive tasks when practical','Confirm the real network name with the venue if unsure','Keep device software up to date'],['Join lookalike networks just because they have strong signal'],['Charged phone and mobile data fallback'],['Fake hotspots']),
  group('Connected',['Prefer encrypted websites/services','Disable sharing features you do not need'],['Do sensitive banking or account recovery on an untrusted network if you can avoid it','Leave Bluetooth on when you do not need it'],[],['Phishing captive portals']),
  group('After',['Forget networks you do not want to auto-join later'],['Assume public charging ports and Wi‑Fi are automatically trustworthy'],[],[])
],['cisaTravel'],false),

scenario('subscription-signup','Signing up for a subscription','Buying & Money','Know the real recurring price, trial end, cancellation method and renewal terms.',['subscription','free trial','recurring payment'],[
  group('Before',['Check the recurring price after any trial','Check billing frequency and renewal date','Read how cancellation actually works','Compare annual and monthly total cost'],['Enter payment details before understanding when charges begin'],['Screenshot or email of the offer terms'],['Introductory pricing that changes later']),
  group('After signup',['Save the renewal date if the cost matters','Verify the first charge matches the offer'],['Assume deleting the app cancels the subscription'],['Cancellation instructions'],['Automatic renewal'])
],[],false),

scenario('umrah','Going for Umrah','Saudi & GCC','A Saudi-source-backed preparation checklist for permit, travel documents, practical items and current health guidance.',['umrah','makkah','nusuk','saudi','pilgrimage'],[
  group('Before booking',['Use official Nusuk/Ministry channels for current Umrah services and permits','Check current visa/entry eligibility for your nationality and travel method','Review current Saudi Ministry of Health requirements before travel'],['Rely on old social posts for current permit, visa or health rules'],['Passport/ID as applicable','Nusuk account/access'],['Seasonal rule and access changes']),
  group('Before travel',['Confirm Umrah permit status where required','Choose comfortable footwear and practical clothing for travel outside ihram requirements','Plan transport and accommodation close enough for your needs'],['Carry unnecessary heavy items during crowded movement'],['Phone charger/power bank','Water bottle where permitted','Medication','Hotel details'],['Heat, crowding and long walking distances']),
  group('In Makkah',['Keep your phone and essential documents secure','Follow official crowd-flow instructions and designated access'],['Block walkways or move against crowd-control directions'],[],['Crowding and temporary access restrictions'])
],['umrahPermit','nusuk','pilgrimHealth'],true),

scenario('saudi-visit','First trip to Saudi Arabia','Saudi & GCC','Entry, local logistics, payments, connectivity and respectful preparation for a first visit.',['saudi','riyadh','jeddah','tourist','gcc'],[
  group('Before travel',['Check current visa/entry requirements on official Saudi sources','Save accommodation address in English and Arabic if helpful','Plan mobile connectivity and airport transport'],['Assume entry rules from a previous visit are unchanged'],['Passport','Visa/eVisa details if applicable','Hotel booking','Payment card'],['Seasonal heat and regional travel distances']),
  group('On arrival',['Use official airport transport options or a known ride service','Keep digital and offline copies of key booking details'],['Exchange all money at the first counter without comparing if rates matter'],[],['Prayer-time or event-related operating-hour changes']),
  group('During',['Dress and behave respectfully for the setting','Plan outdoor activities around heat'],['Underestimate driving distances between cities'],[],['Local rules differ by venue and activity'])
],['saudiVisa'],true),

scenario('desert-drive','Desert or remote-area drive','Saudi & GCC','Preparation for heat, distance, route uncertainty and recovery needs.',['desert','offroad','remote drive','saudi'],[
  group('Before',['Check weather and route conditions','Tell someone your route and expected return','Start with enough fuel/charge plus a margin','Check tires including spare'],['Go alone into unfamiliar remote terrain without a recovery plan','Rely on one navigation app with no offline backup'],['Plenty of drinking water','Phone/power banks','First aid kit','Recovery tools appropriate to your vehicle','Offline map'],['Flash floods, sand conditions and heat']),
  group('Vehicle',['Know your vehicle’s limitations','Carry a usable spare or repair solution'],['Reduce tire pressure or attempt recovery techniques you do not understand safely'],[],['No mobile coverage']),
  group('During',['Turn back early if conditions exceed your plan'],['Continue deeper because you are embarrassed to stop'],[],['Sunset and temperature changes'])
],['readyCar'],true),

scenario('wedding-guest','Going to a wedding','Events & Social','Be prepared for timing, dress, gift, transport and local etiquette.',['wedding','guest','party'],[
  group('Before',['Confirm venue, date and start time','Check dress code and cultural expectations','Plan transport home','RSVP by the requested date'],['Assume “formal” means the same thing in every culture or venue'],['Invitation details','Gift/card if appropriate'],['Parking and late-night transport']),
  group('At the event',['Keep your phone discreet during key moments','Follow photography rules requested by the couple'],['Post private moments before the couple if they asked guests not to'],[],['Long gaps between ceremony and reception']),
  group('Leaving',['Collect coat, gifts and valuables','Arrange a safe ride if needed'],['Drive if you are not fit to drive'],[],[])
],[],false),

scenario('first-date','First date','Events & Social','A simple checklist for safety, presence and avoiding avoidable awkwardness.',['date','first date','social'],[
  group('Before',['Choose a public place you both know','Confirm time and location','Tell a trusted person where you are if that makes you more comfortable','Plan your own way home'],['Share sensitive personal information before trust exists','Create a complicated high-pressure plan'],['Charged phone','Payment method'],['Last-minute location changes']),
  group('During',['Be curious and listen','Respect boundaries and a clear no'],['Spend the date on your phone','Push for personal information, alcohol or physical contact'],[],['Controlling or disrespectful behaviour']),
  group('After',['Be clear and kind about whether you want to meet again'],['Ghost if a simple safe message will do'],[],[])
],[],false),

scenario('hosting-dinner','Hosting dinner','Events & Social','Menu, timing, dietary needs, seating and a calm last hour before guests arrive.',['dinner','hosting','meal','guests'],[
  group('Plan',['Ask about allergies or dietary restrictions','Choose a menu you can mostly prepare ahead','Plan fridge/oven space and serving dishes'],['Try several complicated recipes for the first time'],['Drinks','Ice','Serving utensils','Takeaway containers if useful'],['One dish needing all your attention at arrival time']),
  group('One hour before',['Clear kitchen work surfaces','Set table and drinks','Finish anything that can wait safely'],['Leave bathroom or entrance cleanup until guests arrive'],[],['Food-safety holding times']),
  group('Guests arrive',['Serve something simple while finishing final steps'],['Apologize constantly for small imperfections'],[],[])
],[],false)
);

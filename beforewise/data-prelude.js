const SOURCE_LIBRARY = {
  tsaPower: {title:'TSA — Power banks', url:'https://www.tsa.gov/travel/security-screening/whatcanibring/items/power-banks', org:'Transportation Security Administration'},
  faaPack: {title:'FAA — PackSafe for passengers', url:'https://www.faa.gov/hazmat/packsafe', org:'Federal Aviation Administration'},
  intlTravel: {title:'International Travel Checklist', url:'https://travel.state.gov/en/international-travel/planning/checklist.html', org:'U.S. Department of State'},
  dolInterview: {title:'Interview Tips', url:'https://www.dol.gov/general/jobs/interview-tips', org:'U.S. Department of Labor'},
  nhtsaRoad: {title:'Summer Driving & Road Trip Tips', url:'https://www.nhtsa.gov/summer-driving-tips', org:'NHTSA'},
  readyCar: {title:'Car emergency preparedness', url:'https://www.ready.gov/car', org:'Ready.gov / FEMA'},
  readyKit: {title:'Build an Emergency Kit', url:'https://www.ready.gov/kit', org:'Ready.gov / FEMA'},
  usedCarFTC: {title:'Buying a Used Car From a Dealer', url:'https://consumer.ftc.gov/articles/buying-used-car-dealer', org:'Federal Trade Commission'},
  recalls: {title:'Check for Vehicle Recalls', url:'https://www.nhtsa.gov/recalls', org:'NHTSA'},
  rentalCar: {title:'Renting a Car', url:'https://consumer.ftc.gov/articles/renting-car', org:'Federal Trade Commission'},
  changeAddress: {title:'How to change your address', url:'https://www.usa.gov/change-address', org:'USAGov'},
  onlineShopping: {title:'Online Shopping', url:'https://consumer.ftc.gov/articles/online-shopping', org:'Federal Trade Commission'},
  sellPhone: {title:'Remove personal information before getting rid of your phone', url:'https://consumer.ftc.gov/articles/how-remove-your-personal-information-you-get-rid-your-phone', org:'Federal Trade Commission'},
  phoneUpgrade: {title:'What to know before you upgrade your phone', url:'https://consumer.ftc.gov/consumer-alerts/2025/01/what-know-you-upgrade-your-phone-how-protect-your-new-one', org:'Federal Trade Commission'},
  cisaMfa: {title:'More than a Password — MFA', url:'https://www.cisa.gov/MFA', org:'CISA'},
  cisaTravel: {title:'Traveling with personal internet-enabled devices', url:'https://www.cisa.gov/news-events/news/holiday-traveling-personal-internet-enabled-devices', org:'CISA'},
  umrahPermit: {title:'Umrah Permit Application', url:'https://haj.gov.sa/en/E-Services/Umrah-Permit-Application', org:'Saudi Ministry of Hajj and Umrah'},
  nusuk: {title:'Nusuk Umrah — Official Platform', url:'https://umrah.nusuk.sa/', org:'Saudi Ministry of Hajj and Umrah'},
  saudiVisa: {title:'Saudi tourist visa regulations', url:'https://www.visitsaudi.com/en/plan-your-trip/visa-regulations', org:'Visit Saudi'},
  pilgrimHealth: {title:'Pilgrim Health', url:'https://www.moh.gov.sa/en/healthawareness/pilgrims-health/pages/default.aspx', org:'Saudi Ministry of Health'},
  scamFTC: {title:'FTC Scam Alerts', url:'https://consumer.ftc.gov/scams', org:'Federal Trade Commission'}
};

function group(stage, dos=[], donts=[], remembers=[], watches=[]){
  const make=(type,arr)=>arr.map(text=>({text,type,stage}));
  return [...make('do',dos),...make('dont',donts),...make('remember',remembers),...make('watch',watches)];
}

function scenario(id,title,category,description,keywords,groups,sources=[],featured=false){
  return {id,title,category,description,keywords,items:groups.flat(),sources:sources.map(k=>SOURCE_LIBRARY[k]),featured};
}

const SCENARIOS = [];

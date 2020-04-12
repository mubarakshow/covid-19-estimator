const covid19ImpactEstimator = (data) => {
  let input = data
  let { periodType, timeToElapse, reportedCases, population, totalHospitalBeds } = input;

  
  // Challenge 1
  let currentlyInfectedNormal = reportedCases * 10;
  let currentlyInfectedSevere = reportedCases * 50;

  const checkRequestedTime = () => {
    let daysValue; 
    if (periodType == 'weeks') {
      daysValue = timeToElapse * 7;
    } else if (periodType == 'months') {
      daysValue = timeToElapse * 30;
    } else {
      daysValue = timeToElapse;
    }
    
    return daysValue;
  }

  let getInfectionsByRequestedTimeNormal = (currentlyInfected) => currentlyInfected * (2 ** Math.floor(checkRequestedTime()/3))

  let infectionsByRequestedTimeNormal = getInfectionsByRequestedTimeNormal(currentlyInfectedNormal);
  let infectionsByRequestedTimeSevere = getInfectionsByRequestedTimeNormal(currentlyInfectedSevere);
  
  // Challenge 2
  let getSevereCaseByRequestedTime = (infectionsByRequestedTime) => infectionsByRequestedTime * (15/100)
  let severeCaseByRequestedTimeNormal = getSevereCaseByRequestedTime(infectionsByRequestedTimeNormal)
  let severeCaseByRequestedTimeSevere = getSevereCaseByRequestedTime(infectionsByRequestedTimeSevere) 

  
  // get number of beds
  let getHospitalBedsByRequestedTime = () =>  {
    // 1. get total hospital beds (THB)
  }
  // 2. get 90% if the THB
  // 3. 

  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedNormal,
      infectionsByRequestedTime: getInfectionsByRequestedTimeNormal(currentlyInfectedNormal),
      severeCaseByRequestedTime: severeCaseByRequestedTimeNormal,
      hospitalBedsByRequestedTime: '',
      casesForICUByRequestedTime: '',
      casesForVentilatorsByRequestedTime: '', 
      dollarsInFlight: ''
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: getInfectionsByRequestedTimeNormal(currentlyInfectedSevere),
      severeCaseByRequestedTime: severeCaseByRequestedTimeSevere,
      hospitalBedsByRequestedTime: '',
      casesForICUByRequestedTime: '',
      casesForVentilatorsByRequestedTime: '', 
      dollarsInFlight: ''
    } 
  }
};

export default covid19ImpactEstimator;

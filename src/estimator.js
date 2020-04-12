const covid19ImpactEstimator = (data) => {
  const input = data;
  const { periodType, timeToElapse, reportedCases } = input;
  // Challenge 1
  const currentlyInfectedNormal = reportedCases * 10;
  const currentlyInfectedSevere = reportedCases * 50;
  const checkRequestedTime = () => {
    let daysValue; 
    if (periodType === 'weeks') {
      daysValue = timeToElapse * 7;
    } else if (periodType == 'months') {
      daysValue = timeToElapse * 30;
    } else {
      daysValue = timeToElapse;
    }
    return daysValue;
  }

  const getInfectionsByRequestedTimeNormal = (currentlyInfected) => currentlyInfected * (2 ** Math.floor(checkRequestedTime()/3));

  const infectionsByRequestedTimeNormal = getInfectionsByRequestedTimeNormal(currentlyInfectedNormal);
  const infectionsByRequestedTimeSevere = getInfectionsByRequestedTimeNormal(currentlyInfectedSevere);
  
  // Challenge 2
  const getSevereCaseByRequestedTime = (infectionsByRequestedTime) => infectionsByRequestedTime * (15/100);
  const severeCaseByRequestedTimeNormal = getSevereCaseByRequestedTime(infectionsByRequestedTimeNormal);
  const severeCaseByRequestedTimeSevere = getSevereCaseByRequestedTime(infectionsByRequestedTimeSevere);

  
  // get number of beds
  // let getHospitalBedsByRequestedTime = () =>  {
  //   // 1. get total hospital beds (THB)
  // }
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
  };
};

export default covid19ImpactEstimator;

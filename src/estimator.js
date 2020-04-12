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
    } else if (periodType === 'months') {
      daysValue = timeToElapse * 30;
    } else {
      daysValue = timeToElapse;
    }
    return daysValue;
  };

  const getInfectionsByRequestedTimeNormal = (currentlyInfected) => {
    return currentlyInfected * (2 ** Math.floor(checkRequestedTime() / 3));
  }
  const infectionsByRT_N = getInfectionsByRequestedTimeNormal(currentlyInfectedNormal);
  const infectionsByRT_S = getInfectionsByRequestedTimeNormal(currentlyInfectedSevere);
  // Challenge 2
  const getSevereCaseByRequestedTime = (infectionsByRT) => infectionsByRT * (15 / 100);
  const severeCaseByRT_N = getSevereCaseByRequestedTime(infectionsByRT_N);
  const severeCaseByRT_S = getSevereCaseByRequestedTime(infectionsByRT_S);
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
      infectionsByRequestedTime: infectionsByRT_N,
      severeCaseByRequestedTime: severeCaseByRT_N,
      hospitalBedsByRequestedTime: '',
      casesForICUByRequestedTime: '',
      casesForVentilatorsByRequestedTime: '', 
      dollarsInFlight: ''
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsByRT_S,
      severeCaseByRequestedTime: severeCaseByRT_S,
      hospitalBedsByRequestedTime: '',
      casesForICUByRequestedTime: '',
      casesForVentilatorsByRequestedTime: '', 
      dollarsInFlight: ''
    } 
  };
};

export default covid19ImpactEstimator;
